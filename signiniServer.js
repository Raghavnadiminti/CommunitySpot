const express = require('express')
const bodyParser = require('body-parser');
const app=express()
const cors = require('cors');
const mong=require('mongoose')
var mongoclient=mong.MongoClient
var url="mongodb://localhost:27017/users";
mong.connect(url)
const scheema=new mong.Schema({
  nam:String,
  ps:String,
  email:String,
  joined:[String],
  created:[String]
})
const User=mong.model("User",scheema)
let dataitem=[]
let port=4000;

app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
  let li=[]
app.use(express.json())
const me=new User({nam:"Raghavendra",ps:"9494772024",email:"raghavvvvavva@gmail.com",joined:[],created:[]})
me.save()
 app.post('/',async (req,res)=>{
  li.push(req.body)
  const {nam,ps,email}=req.body
  
  let k=await  User.findOne({nam:nam})
  if(k){
    
   
    res.send(false)
  }
  else{
  
  const item=new User({nam,ps,email})
  
  res.send(true)
  item.save()
  }
  
 
  

  
  })
app.post('/verify',async (req,res)=>{
  const {nam,ps}=req.body
  let k= await User.findOne({nam:nam,ps:ps})
  console.log(req.body)
  console.log(nam,ps)
  console.log(k)
  if(k){
    res.send(true)
  }
  else{
    res.send(false)
  }
})

app.listen(4000,()=>{console.log("its ur login serve")})