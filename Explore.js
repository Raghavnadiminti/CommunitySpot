import React, { useEffect } from "react";
import './Blog.css';
import {ButtonBox} from "./CommunitieBox";
import { useState } from "react";
import axios from "axios";
import searchicon from './search.jpeg'
export default function Explore(){
  const [data,setData]=useState({})
  const [flag,setFlag]=useState(false)
  
    function HandleChange(e){
         let String=e.target.value;
         if(String!=null && String!=undefined && String!=" "){
            setFlag(true)
         }
         else{
            setFlag(false)
         }
         axios.get(`http://localhost:8000/explore?s=${String}`).then((res)=>{setData(res.data)})
         console.log(flag)


    }
    function HandleClick(e){
      
           
    }

    return(
        <>
        <div className="exploreContainer">
            <img src={searchicon} className="searchicon"></img>
            <input className="search-bar" type="text" onChange={(e)=>{HandleChange(e)}} placeholder="SEARCH"></input>
            </div>
         {  flag? <ButtonBox coms={data} />:<></>                }


         
        
        
        </>
    )
}