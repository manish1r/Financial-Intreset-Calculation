const express=require('express');
const sql=require('mysql2');
const cors=require('cors');
const bcrypt=require('bcryptjs');

const app=express();
app.use(cors());
app.use(express.json());

const db=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"manish@832#",
    database:"first"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("Connected to SQL Sucessfully");
});

app.post("/register",async(req,res)=>{
    const {uname,uphno,uemail,upassword}=req.body;
    const q1="select * from users where uname=?";
    db.query(q1,[uname],(er,res1)=>{
        if(er) throw er;
        if(res1.length>0) return res.json({message:"Username already Exists",status:false});
        const q="insert into users (uname,uphno,uemail,upassword) values(?,?,?,?)";
        db.query(q,[uname,uphno,uemail,upassword],(err,result)=>{
            if(err){
                console.log("Regisgter Err : ",err);
                res.json({message:"Server Failed to Register",status:false});
                return;
            }   
            console.log("result : ",result);
            if(result.affectedRows>0){
                return res.json({message:"Registered Sucessfully",status:true,uid:result.insertId});
            }
            else return res.json({message:"Failed to register",status:false});
        });
    })
});

app.post("/login",async(req,res)=>{
    const {uname,upassword}=req.body;
    const q="select * from users where uname=? and upassword=?";
    db.query(q,[uname,upassword],(err,result)=>{
        if(err){
            console.log("Login Err : ",err);
            res.json({message:"Server Failed to Login",status:false});
            return;
        }
        console.log("Uname: ",uname," upass:",upassword);
        console.log("Result : ",result);
        if(result.length>0){
            return res.json({message:"Login Sucessfully",status:true,uid:result[0].uid});
        }
        else return res.json({message:"Invalid credentials",status:false});
    });
});

app.post("/save/customer",async(req,res)=>{
    const{uid,billno,td,ld,intr,amount,intrest,total}=req.body;
    console.log("Saved customer : ",uid,billno,td,ld,intr,amount,intrest,total);
    const q="insert into save_customer(uid,billno,td,ld,intr,amount,intrest,total) values(?,?,?,?,?,?,?,?)";
    db.query(q,[uid,billno,td,ld,intr,amount,intrest,total],(err,result)=>{
        if(err){
            console.log("Save Err : ",err);
            res.json({message:"Server Failed to Save",status:false});
            return;
        }
        console.log("Result : ",result);
        if(result.length>0){
            return res.json({message:"Saved Sucessfully",status:true});
        }
        else return res.json({message:"Failed to save try again",status:false});
    });
});

app.post("/save/katha",async(req,res)=>{
    const{uid,billno,td,ld,intr,amount,intrest,total}=req.body;
    console.log("Saved katha : ",uid,billno,td,ld,intr,amount,intrest,total);
    const q="insert into save_katha(uid,billno,td,ld,intr,amount,intrest,total) values(?,?,?,?,?,?,?,?)";
    db.query(q,[uid,billno,td,ld,intr,amount,intrest,total],(err,result)=>{
        if(err){
            console.log("Save Err : ",err);
            res.json({message:"Server Failed to Save",status:false});
            return;
        }
        console.log("Result : ",result);
        if(result.length>0){
            return res.json({message:"Saved Sucessfully",status:true});
        }
        else return res.json({message:"Failed to save try again",status:false});
    });
});

app.get("/save_katha/:id",async(req,res)=>{
    const uid=req.params.id;
    const q="select * from save_katha where uid=?";
    db.query(q,[uid],async(err,result)=>{
        if(err){
            console.log("Save get Err : ",err);
            res.json({message:"Server Failed to Fetch",status:false});
            return;
        }
        return res.json({message:"Sucessfull",status:true,data:result});
    });
});

app.get("/save_customer/:id",async(req,res)=>{
    const uid=req.params.id;
    const q="select * from save_customer where uid=?";
    db.query(q,[uid],async(err,result)=>{
        if(err){
            console.log("Save get Err : ",err);
            res.json({message:"Server Failed to Fetch",status:false});
            return;
        }
        return res.json({message:"Sucessfull",status:true,data:result});
    });
});

app.delete("/remove_customer/:sid",async(req,res)=>{
    const sid=req.params.sid;
    const q="delete from save_customer where sid=?";
    db.query(q,[sid],(err,result)=>{
        if(err){
            console.log("Delete customer Err : ",err);
            res.json({message:"Server Failed to Delete",status:false});
            return;
        }
        if(result.affectedRows>0) return res.json({message:"Sucessfull",status:true});
        else return res.status(505).json({message:"UnSucessfull",status:false});
    })
});

app.delete("/remove_katha/:sid",async(req,res)=>{
    const sid=req.params.sid;
    const q="delete from save_katha where sid=?";
    db.query(q,[sid],(err,result)=>{
        if(err){
            console.log("Delete katha Err : ",err);
            res.json({message:"Server Failed to Delete",status:false});
            return;
        }
        if(result.affectedRows>0) return res.json({message:"Sucessfull",status:true});
        else return res.status(505).json({message:"UnSucessfull",status:false});
    })
});

app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000");
});
// create table users(uid int primary key auto_increment,uname varchar(256),uemail varchar(256),uphno varchar(256),upassword varchar(1080));
// create table save_customer(sid int primary key auto_increment,billno int,td date,ld date,intr double,amount double,intrest double,total double);
// create table save_katha(sid int primary key auto_increment,billno int,td date,ld date,intr double,amount double,intrest double,total double);