import { useState } from "react";
// import {useNavigate} from "react-router-dom";
export default function Login(){
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    async function handleLogin(){
        const m=document.getElementById("message");
        m.style.fontWeight="bold";
        m.style.fontSize="32px";
        if(!userName||!password){
            m.style.color="red";
            m.innerHTML="Empty Feilds";
        }
        const response=await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({uname:userName,upassword:password})
        });
        console.log("Response : ",response);
        const {message,status,uid}=await response.json();
        console.log("m1:",message," status:",status," uid:",uid);
        if(status){
            m.style.color="green";
            m.innerHTML=message;
            window.localStorage.setItem("user_id",uid);
            window.location.replace("/home");
        }
        else{
            m.style.color="red";
            m.innerHTML=message;
        }
    }
    return (
        <div className="center">

        <div className="container">
            <h2>Login</h2><br/><br/><br/>
            <label>Username : </label>
            <input type="text" id="username" onChange={(e)=>setUserName(e.target.value)} /><br/>
            <label>Password : </label>
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} /><br/>
            <p id="message"></p><br/>
            <button onClick={handleLogin}>Login</button>
        </div>
        </div>
    )
}