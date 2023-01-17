import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { addMessage, getMessages } from '../../API/messageRequest'
import { getUser } from '../../API/UserRequest'
import './ChatBox.css'

import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const scroll = useRef()

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    //fething data for header 
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        console.log(userId);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data);
            }
            catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData();
    }, [chat, currentUser])

    //fething data for messages
    useEffect(() => {
        const fetchmessage = async () => {
            try {
                const { data } = await getMessages(chat._id)
                console.log(data);
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchmessage();
    }, [chat])

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }

        //send message to socket server 
        const recieverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, recieverId })

        //send message to db
        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }

    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("recieve message in chatbox", recieveMessage);
        if (recieveMessage !== null && recieveMessage?.chatId === chat._id) {
            console.log("Data recieved in child chatbox ", recieveMessage);
            setMessages([...messages, recieveMessage])
        }
    }, [recieveMessage])


    //scroll to bottom
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div className='flex flex-row gap-2'>
                                    <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                                        process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="image of user"
                                        className="followerImage"
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                    <div className="name flex flex-col mt-2" style={{ fontSize: '0.8rem' }}>
                                        <span>{userData?.firstname} {userData?.lastname}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-2 ml-20  w-4/5 " style={{ border: '0.1px solid #ececec' }} />
                        </div>
                        {/*Chat body*/}
                        <div className="chat-body">
                            {
                                messages.map((message) => (
                                    (
                                        <>
                                            <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                                                <span>
                                                    {message.text}
                                                </span>
                                                <span>
                                                    {format(message.createdAt)}
                                                </span>
                                            </div>
                                        </>
                                    )
                                ))
                            }
                        </div>

                        {/*Chat sender*/}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button " onClick={handleSend}>Send</div>
                        </div>
                    </>
                ) : (
                    <span className='chatbox-empty-message'>Tap on a Chat to start Conversation...</span>
                )}

            </div>
        </>
    )
}

export default ChatBox