import React from "react";
import {Button} from "./components/ui/button";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

const App = () =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth/>}/> //from this line we get to the auth route
      <Route path="/chat" element={<Chat/>}/> //from this line we get to the chat route
      <Route path="/profile" element={<Profile/>}/> //from this line we get to the profile route
      <Route path="*" element={<Navigate to="/auth"/>} />  //this line means that we navigate to the auth route if usr put any undefined route 
    </Routes>
    </BrowserRouter>
  );
};

export default App;