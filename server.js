import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json()); //ler mais sobre isso ainda;

let users = [];

server.post("/sign-up",(req,res)=>{
    users.push(req.body);
    
    res.send("OK");

});

server.listen(5000);