// import React,{ useState } from "react";
// import {useNavigate} from "react-router-dom";
// export default function Register(){
//     const [userName,setUserName]=useState("");
//     const [email,setEmail]=useState("");
//     const [phno,setPhno]=useState("");
//     const [password,setPassword]=useState("");
//     return (
//         <div className="center">
//         <div className="container">
//             <h2>Register</h2><br/><br/><br/>
//             <label>Username : </label>
//             <input type="text" id="username" onChange={(e)=>setUserName(e.target.value)} /><br/>
//             <label>Password : </label>
//             <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} /><br/>
//             <label>Phone Number : </label>
//             <input type="text" id="phno" onChange={(e)=>setPhno(e.target.value)} /><br/>
//             <label>Password : </label>
//             <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} /><br/>
//             <button>Register</button>
//         </div>
//         </div>
//     )
// }
import React,{ useState } from "react";
// import {useNavigate} from "react-router-dom";

export default function Register(){
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [phno,setPhno]=useState("");
    const [password,setPassword]=useState("");
    async function handleRegister(){
        const m=document.getElementById("message");
        if(!userName||!email||!phno||!password){
            m.style.color="red";
            m.innerHTML="Empty Feilds!!";
            return;
        }
        const response=await fetch("http://localhost:5000/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({uname:userName,uphno:phno,uemail:email,upassword:password})
        });
        const {message,status,uid}=await response.json();
        console.log("m:",message," s:",status, " uid: ",uid);
        m.style.color=(status)?"green":"red";
        m.innerHTML=message;
        if(status){
            window.localStorage.setItem("user_id",uid);
            window.location.replace("/home");
        }
    }
    return (
        <div className="center">
            <div className="container">
                <h2>Register</h2><br/><br/><br/>
                <label>Username : </label>
                <input type="text" id="username" onChange={(e)=>setUserName(e.target.value)} /  ><br/>
                <label>Email : </label>
                <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} /><br/>
                <label>Mobile Number : </label>
                <input type="text" id="phno" onChange={(e)=>setPhno(e.target.value)} /><br/>
                <label>Password : </label>
                <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} /><br/>
                <p id="message"></p><br/>
                <button onClick={handleRegister}>Register</button>  
            </div>
        </div>
    )
}