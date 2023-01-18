const io = require("socket.io")(process.env.PORT || 8800 , {
    cors: {
        // origin: "http://localhost:3000",
       origin : "https://collegeera.netlify.app/"
    },
})

let activeUser = []

io.on('connection', (socket) => {
    //add new user 
    socket.on('new-user-add' , (newUserId)=>{
        //if user  is not added already
        if(!activeUser.some((user)=>user.userId === newUserId))
        {
            activeUser.push({userId: newUserId , socketId: socket.id})
        }
        console.log("connected user" , activeUser)
        io.emit('get-users' , activeUser)

    })

    socket.on("disconnet",()=>{
        //remove user from active user
        activeUser = activeUser.filter((user)=>user.socketId !== socket.id)
        console.log("active user after disconnect" , activeUser)
        io.emit('get-users' , activeUser)
    })


    //send message
    socket.on('send-message' , (data)=>{
        const {recieverId }= data;
        const user = activeUser.find((user)=>user.userId === recieverId)
        console.log("Sending from socket to :", recieverId)
        console.log("Data: ", data)
        if(user)
        {
            io.to(user.socketId).emit('recieve-message' , data)
        }
    })
    
})