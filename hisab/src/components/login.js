import { useState } from "react";
// import {useNavigate} from "react-router-dom";
export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    async function handleLogin() {
        const m = document.getElementById("message");
        m.style.fontWeight = "bold";
        m.style.fontSize = "32px";
        if (!userName || !password) {
            m.style.color = "red";
            m.innerHTML = "Empty Feilds";
        }
        const response = await fetch("https://financial-intreset-calculation.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uname: userName, upassword: password })
        });
        console.log("Response : ", response);
        const { message, status, uid } = await response.json();
        console.log("m1:", message, " status:", status, " uid:", uid);
        if (status) {
            m.style.color = "green";
            m.innerHTML = message;
            window.localStorage.setItem("user_id", uid);
            window.location.replace("/home");
        }
        else {
            m.style.color = "red";
            m.innerHTML = message;
        }
    }
    return (
        <div className="center">
            <div className="container">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <p className="message"></p>

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}