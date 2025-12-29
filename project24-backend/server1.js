import express from "express";

const app = express();

app.get("/",(req,res)=>res.send("backend alive"));
app.get("/health", (req,res)=> res.json({ok:true}));

app.listen(5000,"0.0.0.0",() =>{
console.log("API running on http://0.0.0.0:5000");
});
