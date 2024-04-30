const express= require("express")
const {Server}=require("socket.io")
const http=require("http")
const path = require('path')

const app=express()
const server= http.createServer(app)
const io=new Server(server)

app.use(express.static(path.join(__dirname, 'views')));

app.get("/views/chat/index.html",(req,res)=>{
    res.sendFile("index.html",{root:path.join(__dirname,"/views/chat/")})
    
})

app.get("/",(req,res)=>{
    res.redirect("/views/chat/index.html")
})

const chatroom=io.of("/chatroom")

let socketList=[]
chatroom.on("connection",(socket)=>{
    console.log("nuevo cliente")
    socketList.push(socket)
    socket.on("disconnect",()=>{
        console.log("se fue un cliente")
        for(let i=0;i<socketList.length;i++){
            if(socket.id==socketList[i].id){
                socketList.splice(i,1)
                chatroom.emit("clients-count",socketList.length)
                break
            }
        }
    })
    
    chatroom.emit("clients-count",socketList.length)

    socket.on("mensaje",(data)=>{
        console.log(data)
        chatroom.emit("mensaje",data)
    })
    
})

let PORT =8000
server.listen(PORT,()=>{
    console.log("Escuchando en el puerto "+PORT)
})