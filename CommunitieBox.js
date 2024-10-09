import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import './App.css'; 
import Integrate from './Blog';
import Explore from './Explore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import communitypic from './community.jpg'





export default function Box({coms}){

   
    return(<>
    <div>
      <ul>
        {Object.entries(coms).map(([key, value]) => (
          <oi key={key}>
                        <Layout coms={value}/>
          </oi>
        ))}
      </ul>
    </div>

    
    
    
    
    </>)

}
function Layout(coms){
      
      const history=useNavigate();
      function HandleClick(){
        
        let  url=`/:${coms.coms.title}`
        history(url)
        
      }
    return(
        <div id="BOx" onClick={HandleClick}>
        
        <div className="Box-container">
         <img src={communitypic} className='Image' />
            <div className='box-Title' >{coms.coms.title}</div>
            

        </div>
     
        
        
        </div>
    )
}
export function ButtonBox({coms}){
    const history=useNavigate();
    const username =Cookies.get('username')
    const [data,setData]=useState({})
    useEffect(()=>{
      axios.get('http://localhost:8000/getDetails',{withCredentials:true}).then((res)=>{setData(res.data)
         console.log(res.data)})

},[])
function check(s){
   let joined=data.joined;
   let created=data.created;
   let c=0;
   
  
   let i=0;
   if(Array.isArray(joined)&&Array.isArray(created)){
   for(i=0;i<joined.length;i++){
    if(joined[i]==s.title){
      c+=1;
    }
   }
   for(i=0;i<created.length;i++){
    if(created[i]==s.title){
      c+=1;
    }
   }
  
   }
   if(c==0){
    return true
   }
   else{
    return false
   }


}
  
    return(<>
      <div>
       
          {Object.entries(coms).map(([key, value]) => (
           
            <ul key={key}>
            <div className='BtnBox'>     {  check(value)?     <button className='join' onClick={ async ()=>{
                     await    axios.post('http://localhost:8000/join',{title:value.title,about:"join"},{withCredentials:true}).catch((err)=>{console.log(err)})
                         let url="/:"
                          url+=`${value.title}`
                          history(url)
 
                       }}> Join </button>:<div></div> }<Layout coms={value}/> </div>
            </ul>
          ))}
      
      </div>
  
      
      
      
      
      </>)
  
  }
