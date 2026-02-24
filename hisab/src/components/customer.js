import React, { useState } from "react";

export default function Customer() {
    const [billno, setbillno] = useState();
    const [td, settd] = useState(null);
    const [ld, setld] = useState(null);
    const [intr, setintr] = useState();
    let [amount, setamount] = useState();
    let intrest = 0.0, total = 0.0;
    async function save() {
        if (billno === null || td === null || ld === null || intr === null || amount === null) {
            document.getElementById("result").innerHTML = "<b style='color:red;'>Please Enter Details</b>";
            return;
        }
        const response = await fetch("https://financial-intreset-calculation.onrender.com/save/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: localStorage.getItem('user_id'), billno: billno, td: td, ld: ld, intr: intr, amount: amount, intrest: intrest, total: total })
        });
        if (response.status) { alert("saved sucessfully"); window.location.reload(); }
        else alert("Failed to save");
    }
    function calIntrest() {
        if (billno === null || td === null || ld === null || intr === null || amount === null) {
            document.getElementById("result").innerHTML = "<b style='color:red;'>Please Enter Valid Details</b>";
            return;
        }
        const today_date = new Date(td);
        const loan_date = new Date(ld);
        let i = parseFloat(intr);
        let amt = parseFloat(amount);
        let tdd = today_date.getDate(), ldd = loan_date.getDate();
        let tdm = today_date.getMonth(), ldm = loan_date.getMonth();
        let tdy = today_date.getFullYear(), ldy = loan_date.getFullYear();
        let dd = tdd - ldd;
        let mm = tdm - ldm;
        let yy = tdy - ldy;
        let yes = true;
        if (dd < 0) {
            mm--;
            dd += 30;
        }
        if (mm < 0) {
            yy--;
            mm += 12;
        }
        if (mm === 0 && yy === 0) yes = false;
        intrest = 0.0;
        let aamt = amt; let ddd = dd; let mmm = mm; let yyy = yy;
        if (yes) {
            while (yy > 0) {
                let z = 12 * ((amt / 100) * i);
                intrest += (12 * ((amt / 100) * i));
                amt += 12 * ((amt / 100) * i);
                //  System.out.println("in Intrest : "+intrest+" amount : "+amt+" yy="+yy+" yearly:"+z);
                console.log("in Intrest : " + intrest + " amount : " + amt + " yy=" + yy + " yearly:" + z);
                yy--;
                if (yy === 1 && mm === 0) {
                    mm = 12;
                    break;
                }
            }
            console.log("\n\nout 1 Intrest : " + intrest + " amount : " + amt + " yy=" + yy + " mm=" + mm + " dd=" + dd);
            // System.out.println("\n\nout 1 Intrest : "+intrest+" amount : "+amt+" yy="+yy);
            if (mm > 0) intrest += ((mm) * ((amt / 100) * i));
            if (dd > 0) intrest += ((amt / 100) * i);
            console.log("\n\nout 2 Intrest : " + intrest + " amount : " + amt + " yy=" + yy + " mm=" + mm + " dd=" + dd);
            if (mm === 0 && yyy === 0) intrest -= ((aamt / 100) * i);
            else intrest -= ((amt / 100) * i);
        }
        console.log("\n\nout 3 Intrest : " + intrest + " amount : " + amt + " yy=" + yy + " mm=" + mm + " dd=" + dd);
        total = intrest + aamt;
        document.getElementById("result").innerHTML = `
            <b style='color:blue;'>Details of Loan</b><br><br>
            <b>The Total Days=${ddd} days ${mmm} months ${yyy} years</b><br>
            <b>Total Intrest : ${intrest.toFixed(3)}</b><br>
            <b>Total Amount to be paid : ${total.toFixed(3)}</b><br>
        `;
    }
    return (
        <div className="center">
            <div className="container">
                <h2>Welcome to Customer Interest Calculation</h2>

                <div className="form-group">
                    <label>Bill no</label>
                    <input type="number" onChange={(e) => setbillno(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Today Date</label>
                    <input type="date" onChange={(e) => settd(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Loan Approval Date</label>
                    <input type="date" onChange={(e) => setld(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Rate of Interest</label>
                    <input type="number" onChange={(e) => setintr(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" onChange={(e) => setamount(e.target.value)} />
                </div>

                <div className="btn-group">
                    <button onClick={calIntrest}>Calculate</button>
                    <button onClick={save}>Save</button>
                </div>

                <div id="result"></div>
            </div>
        </div>
    );
}