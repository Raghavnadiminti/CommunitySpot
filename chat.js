import React, { useState,useEffect } from 'react';
import Signin from './signinForm.js'
import './App.css'; 
import Integrate from './Blog';
import Explore from './Explore'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
const socket=io.connect('http://localhost:8000')



export default function Chat(){
  const username=Cookies.get('username') 
  if(username){
    return(
      <div className="ChatBody">
       
      <Chat1/>
      </div>
    )
  }
  else{
   return( <></>)
  }
}
 function Chat1(){
    const {name} =useParams();
    let name1=name.slice(1)
    const [msg,setMsg]=useState('')
    const [txtval,settxt]=useState('')
    const [displayMessages,setDisplay]=useState([])
    const username=Cookies.get('username')
const[messages,setMessages]=useState([])

    useEffect(()=>{
        axios.post("http://localhost:8000/prev",{title:name1}).then(res=>{setMessages(res.data)})
        socket.on('messageReceived',(data)=>{
            console.log("emitted")
            setMessages((prev)=>[...prev,data])
           
        })
        return () => {
            socket.off('messageReceived');
        };
      
    },[])
    useEffect(()=>{
        console.log("msgs",messages)
    },[messages])

   

     function HandleChange(e){
        let m=e.target.value;
        setMsg(m);
        settxt(m);

     }

     function HandleClick(e){
        console.log(msg)
              socket.emit('newMessage',{title:name1,username:username,msg:msg});
              settxt("")
              

     }
    
     const [data,setData]=useState({})
     useEffect(()=>{
       axios.get('http://localhost:8000/getDetails',{withCredentials:true}).then((res)=>{setData(res.data)
       })
 
 },[])
 function check(s){
    let joined=data.joined;
    let created=data.created;
    let c=0;
    
   
    let i=0;
    if(Array.isArray(joined)&&Array.isArray(created)){
    for(i=0;i<joined.length;i++){
     if(joined[i]==s){
       c+=1;
     }
    }
    for(i=0;i<created.length;i++){
     if(created[i]==s){
       c+=1;
     }
    }
   console.log(c)
    }
    if(c==0){
     return false
    }
    else{
     return true
    }
 }

    return(
      <div className="chatbody">
      <h1 align="center" className="chat-title">{name1}</h1>
      <JoinedUsers/>                                      
        <div className="chat-holder">
      
     <div>   <Chats data={messages}/> </div>
   { (check(name1)) ? <div id="inpt-cnt">   <input placeholder="lets-chat" value={txtval} onChange={(e)=>{HandleChange(e)} } className='chatInput' type="text" ></input><button onClick={(e)=>{HandleClick(e)}} className='ChatButton'>send</button></div>:<></>}
       
        </div>
        </div>
    )
}
function Chats({ data }) {
    
    const sortedMessages = data.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const username=Cookies.get('username')
    return (
      <>
        {sortedMessages.map((message, index) => (
          <div key={index} className={message.username==username?"messageContainer":"messageContainerRand"}>
            <strong  className={message.username===username?"username":"usernameRand"}>
              {message.username}</strong>
            <br />
          &nbsp;&nbsp;&nbsp;  {message.message}
            <br></br>
          </div>
        ))}
      </>
    );
  }


  function JoinedUsers(){
    const [joined,setJoined]=useState([])
    const {name} =useParams();
    const history=useNavigate();
   let username=Cookies.get('username')
    let name1=name.slice(1)
   useEffect(()=>{ axios.post("http://localhost:8000/members",{title:name1}).then(res=>{setJoined(res.data)})},[])
    console.log(joined)
     function HandleClick(){
      axios.post("http://localhost:8000/leave",{title:name1,username:username})
      history('/home')
     }
    
    return(
          <div className='joined-Container'>
          <h2 style={{color:'red'}} >Joined-Members</h2>
          <div ><ol>{joined.map((key,value)=>(
                              
                         
                              <li className={`color${value%5}`}>   <div className="NameContainer">
                                 
                                     <div className='Name' >{key}</div>
                                     
                         
                                 </div>
                                 </li>
                                 
                                 
                               
                ))}</ol></div>
          <button className='leave' onClick={HandleClick}>leave</button>
          </div>     
    )
  }