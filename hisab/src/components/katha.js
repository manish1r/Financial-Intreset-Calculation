import React,{ useState } from "react";

export default function Customer(){
    const [billno,setbillno]=useState();
    const [td,settd]=useState(null);
    const [ld,setld]=useState(null);
    const [intr,setintr]=useState();
    let [amount,setamount]=useState();
    let [intrest,setintrest]=useState();
    let [total,settotal]=useState();
    async function save(){
            if(billno===null||td===null||ld===null||intr===null||amount===null){
                document.getElementById("result").innerHTML="<b style='color:red;'>Please Enter Details</b>";
                return;
            }
            const response=await fetch("http://localhost:5000/save/katha",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({uid:localStorage.getItem('user_id'),billno:billno,td:td,ld:ld,intr:intr,amount:amount,intrest:intrest,total:total})
            });
            if(response.status) alert("saved sucessfully");
            else alert("Failed to save");
        }
    function calIntrest(){
        if(td===null||ld===null||intr===null||amount===null){
            document.getElementById("result").innerHTML="<b style='color:red;'>Please Enter Valid Details</b>";
            return;
        }
        const today_date=new Date(td);
        const loan_date=new Date(ld);
        let i=parseFloat(intr);
        let amt=parseFloat(amount);
        let tdd=today_date.getDate(),ldd=loan_date.getDate();
        let tdm=today_date.getMonth(),ldm=loan_date.getMonth();
        let tdy=today_date.getFullYear(),ldy=loan_date.getFullYear();
        let dd=tdd-ldd;
        let mm=tdm-ldm;
        let yy=tdy-ldy;
        let yes=true;
        if(dd<0){
            mm--;
            dd+=30;
        }
        if(mm<0){
            yy--;
            mm+=12;
        }
        if(mm===0&&yy===0) yes=false;
        intrest=0.0;
        let aamt=amt;let ddd=dd;let mmm=mm;let yyy=yy;
        if(yes){
            while(yy>0){
                let z=12*((amt/100)*i);
                intrest+=(12*((amt/100)*i));
                amt+=12*((amt/100)*i);
                //  System.out.println("in Intrest : "+intrest+" amount : "+amt+" yy="+yy+" yearly:"+z);
                console.log("in Intrest : "+intrest+" amount : "+amt+" yy="+yy+" yearly:"+z);
                yy--;
                if(yy===1&&mm===0){
                    mm=12;
                    break;
                } 
            }
            console.log("\n\nout 1 Intrest : "+intrest+" amount : "+amt+" yy="+yy+" mm="+mm+" dd="+dd);
            // System.out.println("\n\nout 1 Intrest : "+intrest+" amount : "+amt+" yy="+yy);
            if(mm>0) intrest+=((mm)*((amt/100)*i));
            if(dd>0) intrest+=(dd*(((amt/100)*i)/30));
            console.log("\n\nout 2 Intrest : "+intrest+" amount : "+amt+" yy="+yy+" mm="+mm+" dd="+dd);
            if(mm===0&&yyy===0)intrest-=((aamt/100)*i);
            else intrest-=((amt/100)*i);
        }
        console.log("\n\nout 3 Intrest : "+intrest+" amount : "+amt+" yy="+yy+" mm="+mm+" dd="+dd);
        total=intrest+aamt;
        document.getElementById("result").innerHTML=`
            <b style='color:blue;'>Details of Loan   (Daily Intrest) --></b><br><br>
            <b>The Total Days=${ddd} days ${mmm} months ${yyy} years</b><br>
            <b>Total Intrest : ${intrest.toFixed(3)}</b><br>
            <b>Total Amount to be paid : ${total.toFixed(3)}</b><br>
        `;
    }
    return (
        <div className="center">
        <div className="container">
            <h2>Welcome to Katha Intrest Calculation</h2><br/><br/><br/>
                <label><b>Bill no </b></label>
                <input type="number" id="billno" placeholder="Enter BillNO" onChange={(e)=>setbillno(e.target.value)} />
                <br/>
                <label><b>Today Date</b></label>
                <input type="date" id="todaydate" placeholder="Enter Today's Date" onChange={(e)=>settd(e.target.value)} />
                <br/>
                <label><b>Loan Approval Date</b></label>
                <input type="date" id="loandate" placeholder="Enter Loan Approved Date" onChange={(e)=>setld(e.target.value)}/>
                <br/>
                <label><b>Rate of Intrest</b></label>
                <input type="number" id="Intrest" placeholder="Enter Intrest percentage" onChange={(e)=>setintr(e.target.value)}/>
                <br/>
                <label><b>Amount</b></label>
                <input type="number" id="amount" placeholder="Enter amount approved" onChange={(e)=>setamount(e.target.value)}/>
                <br/>
                <button type="button" onClick={calIntrest}>Calculate</button>
                <button type="button" onClick={save}>Save</button>
                <br/><br/>
                <div id="result"></div> 
            <div className="row"></div>
        </div>
        </div>
    );
}