import { useState } from "react";

export default function Saved(){
    let [records,setrecords]=useState([]);
    let [type,settype]=useState("");
    async function getRecords(type){
        document.getElementById("title").textContent=type+" Saved Calculation's";
        const response=await fetch(`http://localhost:5000/save_${type.toLowerCase()}/${localStorage.getItem('user_id')}`);
        const result=await response.json();
        const reverse=[...result.data].reverse();
        records=[];
        setrecords(reverse);
        settype(type);
        display(reverse);
    }
    async function remove(sid) {
        const response=await fetch(`http://localhost:5000/remove_${type.toLowerCase()}/${sid}`,{method:"DELETE"});
        if(response.status) alert("Record removed Sucessfully");
        else alert("Failed to Remove");
    }
    function display(data){
        return (
            <>
            <h3>Total Saved Calculation's are : {data.length}</h3>
            {data.map((d, i) => (
               <div key={i} className="card">
                   <p style={{color:"red"}}><strong>Bill Number:</strong> {d.billno}</p>
                   <p><strong>Loan Date:</strong> {d.td}</p>
                   <p><strong>Amount:</strong> ₹{d.amount}</p>
                   <p><strong>Interest:</strong> {d.intr}</p>
                   <p><strong>Paid Date:</strong> {d.td}</p>
                   <p><strong>Paid Interest:</strong> {d.intrest}</p>    
                   <p><strong>Total:</strong> {d.total}</p>
                   <button onClick={()=>remove(d.sid)}>Remove</button>
               </div>
           ))}
           </>
        );
    }
    return (
        <div className="center">
        <div className="container">
            <h2 id="title">Saved Calculation's</h2><br/><br/><br/>
            <div className="row">
                <button onClick={()=>getRecords("Customer")}>Customer</button><br/>
                <button onClick={()=>getRecords("Katha")}>Katha</button><br/><br/>
            </div>
            <div className="list">
                {records.length === 0 ? <p>No Records Found</p> : display(records)}
            </div>
        </div>
        </div>
    );
}