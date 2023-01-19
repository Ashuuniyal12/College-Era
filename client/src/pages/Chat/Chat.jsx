import React, { useRef } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userChat } from '../../API/chatRequest';
import Conversation from '../../components/Conversation/Conversation';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client';
import { createChat } from '../../API/chatRequest';

const Chat = () => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const [chat, setChat] = useState([])
  const [currentChat , setCurrentChat] = useState(null)
  const [onlineUsers , setOnlineUsers] = useState([])
  const [sendMessage , setSendMessage] = useState(null)
  const [recieveMessage , setRecieveMessage] = useState(null)
  const socket = useRef()

  //create chat with all following users
  useEffect(() => {

    const createUserChat = async ()=>{
      try{
        const {data} = await createChat({senderId: user._id , receiverId: user.following})
        console.log("create chat " , data)
      }catch(error){
        console.log(error)
      }
    }
   createUserChat()
  }, [])


  // Get the chat in chat section
  useEffect(() => {
    const getChat = async () => {
      try {
        const { data } = await userChat(user._id)
        setChat(data)
        console.log("chat updated",data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getChat()
  }, [user])      

  //conect to socket server
 useEffect(() => {
    socket.current = io("ws://localhost:8800")
    // socket.current = io("https://collegeera.onrender.com")
    socket.current.emit("new-user-add" , user._id)
    socket.current.on("get-users", (users)=>{
      setOnlineUsers(users);
    })
  }, [user])


 // Send Message to socket server
 useEffect(() => {
  if (sendMessage!==null) {
    socket.current.emit("send-message", sendMessage);}
}, [sendMessage]);

  //recieve message from socket server
  useEffect (()=>{
    socket.current.on("recieve-message" , (data)=>{
      console.log(data);
      setRecieveMessage(data)
    })
  },[])

  const checkOnlinestatus =(chat)=>{
    const chatMember = chat.members.find((member)=>member!==user._id)
    const online = onlineUsers.find((user)=>user.userId===chatMember)
    return online ? true : false
  }

  console.log("All chats" ,chat)
  return (
    <div className="Chat relative grid gap-4">

      {/*left side */}
      <div className="Left-side-chat flex flex-col gap-4">
        <LogoSearch />
        <div className="Chat-container">
          <h1>Chats</h1>
          <div className="chat-list flex flex-col gap-4">
            {
              chat.map((chat) => (
                
                <div onClick = {()=>setCurrentChat(chat)}>
                  <Conversation data={chat} currentUser={user._id}  online = {checkOnlinestatus(chat)}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="Right-side-chat">
        <div  className='w-80 self-end'>
          <div className="NavIcon flex mt-4 flex-row justify-between">
            <Link to='../home'>
              <Icon className='icon' icon="material-symbols:home-outline-rounded" width="30" height="30" />
            </Link>
            <Icon className='icon' icon="ant-design:setting-outlined" width="30" height="30" />
            <Icon className='icon' icon="mdi:bell-notification-outline" width="30" height="30" />
            <Link to='../chat'>
              <Icon className='icon' icon="material-symbols:chat-outline" width="30" height="30" />
            </Link>
          </div>
        </div>
        {/*Caht body */}
         <ChatBox chat= {currentChat} currentUser = {user._id} setSendMessage = {setSendMessage} recieveMessage = {recieveMessage}/>
      </div>
    </div>
  )
}

export default Chat