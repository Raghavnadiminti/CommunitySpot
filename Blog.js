import React, { useEffect } from 'react';
import { useState } from 'react';
import './Blog.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Box from './CommunitieBox';
import communitypic from './community.jpg'
import Cookies from 'js-cookie';



export default function Integrate(){
 let name= Cookies.get('username')
     if(name) {  return(

                    <Integrate1/>
        )
    }
    else{
        return(
            <></>
        )
    }
}











function Integrate1(){

return(
    <div className='Bdy'>
    <div className="navbar">  
    <div>
        <b id="page-name">Community Spot</b> </div>
        <Link to="/explore"><button className="navbtn">EXPLORE</button></Link>
        </div>  
    <Home ></Home>
    </div>
)
}
function CreateButton(title,createdBy,about){

    return (
        <>
        <button>
                 <p className="title">{title}</p>
                 <p className="About">{about}</p>
        </button>
        
        </>
    )
}
function AskInput(){
    const[data,setData]=useState({title:"",about:""})
    
    let newdata={...data}
    
       function HandleChange(e){
        if(e.target.id=="Title"){
            newdata.title=e.target.value

        }
        else{
            newdata.about=e.target.value
        }
           setData(newdata)
       }
       function HandleClick(){
        axios.post('http://localhost:8000/',{data},{withCredentials:true})
       }
      

    return(
        <>
        <div className="Input">

        <label>  Enter Title</label> <input  className="InptTitle" onChange={(e)=>{HandleChange(e)}} id="Title"></input>
        <label >   Description  </label> <input className="InptTitle" onChange={(e)=>{HandleChange(e)}} id="about"></input>
        <br></br>
       <button onClick={HandleClick} className="Create">CREATE</button>


       </div>
        
        
        
        
        </>
    )
}

function Home(){
const [see,setSee]=useState(false)
const [comunities,setCommunities]=useState({title:"",about:""})
const [joined,setJoined]=useState(["eyy"])
useEffect(()=>{
    axios.get("http://localhost:8000/",{withCredentials:true}).then((res=>{setCommunities(res.data)}))
   
    console.log("hii",comunities)
   },[see])
   useEffect(()=>{
    axios.get("http://localhost:8000/join",{withCredentials:true}).then((res)=>{console.log(setJoined(res.data.joined))})
    console.log("joined",joined)
   },[])
   let history=useNavigate();
   function HandleClick(key){
        
    let  url=`/:${key}`
    history(url)
    
  }
    return (<>
        <div className="Title-Bar1">

        <h2 className="yours-Community">Your's communities</h2>

                 <button className="create-btn" onClick={()=>{
                    setSee(true) }} >CREATE COMMUNITY</button>  
                     {see?<>
                        <button onClick={()=>{setSee(false)}} className="close">CLOSE</button>
                     <AskInput/></>:<> </>}

                  <Box coms={comunities} />

                   
                    
                  
                


                </div>
                <h2 className='Joined-Communities'>Joined-Communities</h2>
                &nbsp;&nbsp;&nbsp;   <div>{joined.map((key,value)=>(
                                 <div id="BOx" onClick={()=>{HandleClick(key)}}>
        
                                 <div className="Box-container">
                                  <img src={communitypic} className='Image' />
                                     <div className='box-Title' >{key}</div>
                                     
                         
                                 </div>
                              
                                 
                                 
                                 </div>
                ))}</div>

    
    </>)
}

