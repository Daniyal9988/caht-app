const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= 4500 ;


const users=[{}];


app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user; // to save user name with socket id as key as socket id us unique
          console.log(`${user} has joined `); 
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`}); // to broadcast the msg to everyone except the one who joined
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat, ${users[socket.id]} `}) // to send msg to the user only
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id}); /* io will send to everyone if we do socket.emit 
        it only send to the user who send the message and socket.broadcast will send the msg to everyone except 
        the user itself so we use io which sends to everyone*/
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`}); // to tell other users who left the chat
        console.log(`user left`);
    })
    socket.emit('activeUser',(users[socket.id]));
});


server.listen(port,()=>{
    console.log(`Working`);
})