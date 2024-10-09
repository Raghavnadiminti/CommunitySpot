const express=require('express')
const bodyParser = require('body-parser');
const app=express()
const cors = require('cors');
const mong=require('mongoose')

const cookie=require('cookie-parser')
const http=require('http')

app.use(express.json());
app.use(cookie())
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials:true
}));

const db=  mong.createConnection("mongodb://localhost:27017/")
const user=mong.createConnection("mongodb://localhost:27017/users")
  const scheema=new mong.Schema({
    usename:String,
    title:String,
    about:String,
    msgs:[{
      username: String,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }],
    joined:[String],
   
  })


  const Communities=db.model('comn',scheema)

async function update(title,usename,flag){
      
      console.log('updating...',usename,title)
       if(flag=="Joined"){ 
        const userCollection=user.collection('users')
       userCollection.updateOne({nam:usename},{$push:{joined:title}})
       Communities.updateOne({title:title},{$push:{joined:usename}})
     
      }
     else if(flag=="Find"){
      const userCollection=user.collection('users')
    
     const result = await  userCollection.findOne({nam:usename})
     return result 
          
      }
      else{
          const userCollection=user.collection('users')
         console.log('hii')
        const result = await  userCollection.updateOne({nam:usename},{$push:{created:title}})
        return result 
      }
     

      
}
 function find(usename){

  const userCollection=user.collection('users')
  console.log('hii')
 const result =   userCollection.findOne({nam:usename})
 return result
            
}

  app.post('/',async (req,res)=>{
    console.log(req.body)
    const title=req.body.data.title 
    const about=req.body.data.about
    let usename=req.cookies.username
    console.log(usename)
     const Community=new Communities({
          usename:usename,
          title:title,
          about:about
     });
     let k=await Communities.findOne({title:title})
 if(!k){ await  update(title,usename,"Created")
     Community.save()
    res.send(true)
 }
 else{
        res.send(false)
 }
  })


  app.get('/',async (req,res)=>{
   const usename=req.cookies.username
    let k= await Communities.find({usename:usename})
    res.send(k)
  })



app.get('/explore',async (req,res)=>{
          let search=req.query.s ;
          console.log(search)
          let k=await Communities.find({
            $or: [
              { title: { $regex: search, $options: 'i' } },
             
            ]
          })
         
          res.send(k)     
})


app.post('/prev',async (req,res)=>{
  const {title}=req.body;
  console.log("previs",req.body)
 let k=await Communities.findOne({title:title})
 if(k){
   res.send(k.msgs)
 }
})
app.post('/members',async (req,res)=>{
  const {title}=req.body;
  console.log("previs",req.body)
 let k=await Communities.findOne({title:title})
 if(k){
   res.send(k.joined)
 }
})
app.post('/join',async (req,res)=>{
  const title=req.body.title 
  const about=req.body.about
  let usename=req.cookies.username 
   update(title,usename,"Joined")
   res.send(true)
})
app.get('/join',async (req,res)=>{
  let usename=req.cookies.username
  let m=await find(usename) 
  console.log("heyy",m)
  res.send(m) 

})
app.get('/getDetails',async (req,res)=>{
   
  const title="ntng"

  let usename=req.cookies.username 
  const m= await update(title,usename,"Find")
  console.log(m)
   res.send(m)



})
app.post('/leave',async (req,res)=>{
         const {title,username}=req.body;
        let k= await Communities.find({title:title})
        if(k.usename==username){
           Communities.deleteOne({title:title})
           const userCollection=user.collection('users')
           userCollection.updateOne({nam:username},{$pull:{created:title}})
        }
        else{
         const userCollection=user.collection('users')
         userCollection.updateOne({nam:username},{$pull:{joined:title}})
         Communities.updateOne({title:title},{$pull:{joined:username}})
        }
})

const server=http.createServer(app)

module.exports={server,Communities};
