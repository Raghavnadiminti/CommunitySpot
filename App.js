import React from 'react';
import Signin from './signinForm.js'
import './App.css'; 
import Integrate from './Blog';
import Explore from './Explore';
import Chat from './chat.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin/>}/> 
                 <Route path="/home" element={<Integrate/>}></Route>
               

                <Route path="/explore" element={<Explore/>}></Route>
                <Route path="/:name" element={<Chat/>}></Route>
                <Route path="/home/:name" element={<Chat/>}></Route>  
                <Route path="/explore/:name" element={<Chat/>}></Route>  

            </Routes>
        </Router>
    );
};

export default App;