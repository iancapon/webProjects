const express= require("express")
const {Server}=require("socket.io")
const http=require("http")
const path = require('path')

const app=express()
const server= http.createServer(app)
const io=new Server(server)

app.use(express.static(path.join(__dirname, 'public')));

app.get("/public/chat/index.html",(req,res)=>{
    res.sendFile("index.html",{root:path.join(__dirname,"/public/chat/")})
    
})



app.get("/public/chess/index.html",(req,res)=>{
    res.sendFile("index.html",{root:path.join(__dirname,"/public/chess/")})
    
})

app.get("/chess",(req,res)=>{
    res.redirect("/public/chess/index.html")
})
app.get("/chat",(req,res)=>{
    res.redirect("/public/chat/index.html")
})
app.get("/",(req,res)=>{
    res.redirect("/public/chat/index.html")
})

const chess=io.of("/chess")
let games=[]
const gStr={p1:0,p2:0}
games.push(gStr)
chess.on("connection",(socket)=>{
    console.log("nuevo jugador")
    if(games[games.length-1].p1==0 && games[games.length-1].p2==0){
        games[games.length-1].p1=socket
        socket.emit("control","white")
    }
    if(games[games.length-1].p1!=0 && games[games.length-1].p2==0){
        games[games.length-1].p2=socket
        socket.emit("control","black")
        games.push(gStr)
    }

    socket.on("jugada",(data)=>{
        for(let i =0; i< games.length;i++){
            if(socket.id==games[i].p2.id){
                games[i].p1.emit("jugada",data)
            }
            if(socket.id==games[i].p1.id){
                games[i].p2.emit("jugada",data)
            }
        }
    })
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