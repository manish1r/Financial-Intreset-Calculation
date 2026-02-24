import { useState } from "react";

export default function Saved() {
    let [records, setrecords] = useState([]);
    let [type, settype] = useState("");
    async function getRecords(type) {
        document.getElementById("title").textContent = type + " Saved Calculation's";
        const response = await fetch(`https://financial-intreset-calculation.onrender.com/save_${type.toLowerCase()}/${localStorage.getItem('user_id')}`);
        const result = await response.json();
        const reverse = [...result.data].reverse();
        records = [];
        setrecords(reverse);
        settype(type);
        display(reverse);
    }
    async function remove(sid) {
        const response = await fetch(`https://financial-intreset-calculation.onrender.com/remove_${type.toLowerCase()}/${sid}`, { method: "DELETE" });
        if (response.status) { alert("Record removed Sucessfully"); window.location.reload(); }
        else alert("Failed to Remove");
    }
    function display(data) {
        return (
            <>
                <h3>Total Saved Calculations: {data.length}</h3>

                {data.map((d, i) => (
                    <div key={i} className="card">
                        <p className="bill"><strong>Bill Number:</strong> {d.billno}</p>
                        <p><strong>Loan Date:</strong> {d.td}</p>
                        <p><strong>Amount:</strong> ₹{d.amount}</p>
                        <p><strong>Interest:</strong> {d.intr}</p>
                        <p><strong>Paid Date:</strong> {d.td}</p>
                        <p><strong>Paid Interest:</strong> {d.intrest}</p>
                        <p><strong>Total:</strong> {d.total}</p>

                        <button
                            className="remove-btn"
                            onClick={() => remove(d.sid)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className="center">
            <div className="container">
                <h2>Saved Calculations</h2>

                <div className="filter-buttons">
                    <button onClick={() => getRecords("Customer")}>
                        Customer
                    </button>

                    <button onClick={() => getRecords("Katha")}>
                        Katha
                    </button>
                </div>

                <div className="list">
                    {records.length === 0
                        ? <p>No Records Found</p>
                        : display(records)}
                </div>
            </div>
        </div>
    );
}