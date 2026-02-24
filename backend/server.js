const express=require('express');
const {Pool}=require('pg');
const cors=require('cors');
const bcrypt=require('bcryptjs');
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const PORT = process.env.PORT || 5000;

db.connect().then(() => console.log("Connected to PostgreSQL Successfully"))
.catch(err => console.error("DB Connection Error:", err));

app.post("/register", async (req, res) => {
    const { uname, uphno, uemail, upassword } = req.body;

    const q1 = "select * from users where uname=$1";
    db.query(q1, [uname], (er, res1) => {
        if (er) throw er;

        if (res1.rows.length > 0)
            return res.json({ message: "Username already Exists", status: false });

        const q = "insert into users (uname,uphno,uemail,upassword) values($1,$2,$3,$4) returning uid";
        db.query(q, [uname, uphno, uemail, upassword], (err, result) => {
            if (err) {
                console.log("Regisgter Err : ", err);
                res.json({ message: "Server Failed to Register", status: false });
                return;
            }

            if (result.rowCount > 0) {
                return res.json({
                    message: "Registered Sucessfully",
                    status: true,
                    uid: result.rows[0].uid
                });
            }
            else
                return res.json({ message: "Failed to register", status: false });
        });
    });
});

app.post("/register", async (req, res) => {
    const { uname, uphno, uemail, upassword } = req.body;

    const q1 = "select * from users where uname=$1";
    db.query(q1, [uname], (er, res1) => {
        if (er) throw er;

        if (res1.rows.length > 0)
            return res.json({ message: "Username already Exists", status: false });

        const q = "insert into users (uname,uphno,uemail,upassword) values($1,$2,$3,$4) returning uid";
        db.query(q, [uname, uphno, uemail, upassword], (err, result) => {
            if (err) {
                console.log("Regisgter Err : ", err);
                res.json({ message: "Server Failed to Register", status: false });
                return;
            }

            if (result.rowCount > 0) {
                return res.json({
                    message: "Registered Sucessfully",
                    status: true,
                    uid: result.rows[0].uid
                });
            }
            else
                return res.json({ message: "Failed to register", status: false });
        });
    });
});

app.post("/save/customer", async (req, res) => {
    const { uid, billno, td, ld, intr, amount, intrest, total } = req.body;

    const q = "insert into save_customer(uid,billno,td,ld,intr,amount,intrest,total) values($1,$2,$3,$4,$5,$6,$7,$8)";
    db.query(q, [uid, billno, td, ld, intr, amount, intrest, total], (err, result) => {
        if (err) {
            console.log("Save Err : ", err);
            res.json({ message: "Server Failed to Save", status: false });
            return;
        }

        if (result.rowCount > 0)
            return res.json({ message: "Saved Sucessfully", status: true });
        else
            return res.json({ message: "Failed to save try again", status: false });
    });
});

app.post("/save/katha", async (req, res) => {
    const { uid, billno, td, ld, intr, amount, intrest, total } = req.body;

    const q = "insert into save_katha(uid,billno,td,ld,intr,amount,intrest,total) values($1,$2,$3,$4,$5,$6,$7,$8)";
    db.query(q, [uid, billno, td, ld, intr, amount, intrest, total], (err, result) => {
        if (err) {
            console.log("Save Err : ", err);
            res.json({ message: "Server Failed to Save", status: false });
            return;
        }

        if (result.rowCount > 0)
            return res.json({ message: "Saved Sucessfully", status: true });
        else
            return res.json({ message: "Failed to save try again", status: false });
    });
});

app.get("/save_katha/:id", async (req, res) => {
    const uid = req.params.id;
    const q = "select * from save_katha where uid=$1";

    db.query(q, [uid], (err, result) => {
        if (err) {
            console.log("Save get Err : ", err);
            res.json({ message: "Server Failed to Fetch", status: false });
            return;
        }
        return res.json({ message: "Sucessfull", status: true, data: result.rows });
    });
});

app.get("/save_customer/:id", async (req, res) => {
    const uid = req.params.id;
    const q = "select * from save_customer where uid=$1";

    db.query(q, [uid], (err, result) => {
        if (err) {
            console.log("Save get Err : ", err);
            res.json({ message: "Server Failed to Fetch", status: false });
            return;
        }
        return res.json({ message: "Sucessfull", status: true, data: result.rows });
    });
});

app.delete("/remove_customer/:sid", async (req, res) => {
    const sid = req.params.sid;
    const q = "delete from save_customer where sid=$1";

    db.query(q, [sid], (err, result) => {
        if (err) {
            console.log("Delete customer Err : ", err);
            res.json({ message: "Server Failed to Delete", status: false });
            return;
        }

        if (result.rowCount > 0)
            return res.json({ message: "Sucessfull", status: true });
        else
            return res.status(505).json({ message: "UnSucessfull", status: false });
    });
});

app.delete("/remove_katha/:sid", async (req, res) => {
    const sid = req.params.sid;
    const q = "delete from save_katha where sid=$1";

    db.query(q, [sid], (err, result) => {
        if (err) {
            console.log("Delete katha Err : ", err);
            res.json({ message: "Server Failed to Delete", status: false });
            return;
        }

        if (result.rowCount > 0)
            return res.json({ message: "Sucessfull", status: true });
        else
            return res.status(505).json({ message: "UnSucessfull", status: false });
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

// create table users(uid serial primary key,uname varchar(256),uemail varchar(256),uphno varchar(256),upassword varchar(1080));
// create table save_customer(sid serial primary key,uid int,billno int,td date,ld date,intr double precision,amount double precision,intrest double precision,total double precision);
// create table save_katha(sid serial primary key,uid int,billno int,td date,ld date,intr double precision,amount double precision,intrest double precision,total double precision);
