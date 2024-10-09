const express=require('express')
const bodyParser = require('body-parser');
const app=express()
const cors = require('cors');
const mong=require('mongoose')
const {server,Communities}=require('./Server.js')
const cookie=require('cookie-parser') 

const socket=require('socket.io')
const http=require('http'); 
const { timeStamp } = require('console');
app.use(express.json());
app.use(cookie())
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials:true
}));

const io=socket(server,{ cors:{origin:"*",methods:['GET',"POST"]}})


io.on('connection',(socket)=>{
    console.log("user connected");
    Communities.find().then(msgs=>socket.emit('previousMessages',msgs))
     
    socket.on('newMessage',async (data)=>{
      //  console.log(data)
       const {title,username,msg} = data;
       const newmsg={
               username:username,
               message:msg,
               timme:new Date()
       }
       let k=await Communities.findOne({title:title})
       if(k){
        // console.log("k is",k)
                let p=await Communities.findOneAndUpdate(
                  {title:title},
                  {$push:{msgs:newmsg}}
                )
       } 
       io.emit('messageReceived',{title:title,username:username,message:msg,timeStamp:new Date()})

        
    })
})

server.listen(8000,()=>{console.log("io io this is io")})
