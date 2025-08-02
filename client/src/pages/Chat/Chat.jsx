import React, { useEffect, useRef, useState } from "react";
import './Chat.css';
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats, createChat } from "../../api/CharRequest";
import { getAllUser } from "../../api/UserRequest";
import Conversation from "../../components/Conversation/Conversation";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Chatbox from "../../components/ChatBox/Chatbox";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [allUsers, setAllUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://cu-verse-socket.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send message
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Receive message
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  // Fetch all users and current user's chats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersRes = await getAllUser();
        const userChatsRes = await userChats(user._id);
        setAllUsers(allUsersRes.data.filter(u => u._id !== user._id));
        setChats(userChatsRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const checkOnlineStatus = (otherUserId) => {
    const online = onlineUsers.find(u => u.userId === otherUserId);
    return !!online;
  };

  const handleUserClick = async (otherUser) => {
    // Check if a chat already exists
    const existingChat = chats.find(chat =>
      chat.members.includes(user._id) && chat.members.includes(otherUser._id)
    );

    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      // Create a new chat if it doesn't exist
      try {
        const newChat = await createChat({ senderId: user._id, receiverId: otherUser._id });
        setChats(prev => [...prev, newChat.data]);
        setCurrentChat(newChat.data);
      } catch (error) {
        console.log("Error creating chat:", error);
      }
    }
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Start Chat</h2>
          <div className="Chat-list">
            {allUsers.map((otherUser) => (
              <div key={otherUser._id} onClick={() => handleUserClick(otherUser)}>
                <Conversation
                  data={{ members: [user._id, otherUser._id] }}
                  currentUserId={user._id}
                  online={checkOnlineStatus(otherUser._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
        <div className="navIcons">
          <Link to="../home"><img src={Home} alt="" /></Link>
          <UilSetting />
          <img src={Noti} alt="" />
          <Link to="../chat"><img src={Comment} alt="" /></Link>
        </div>

        {/* Chat Body */}
        <Chatbox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;



// import React, { useRef, useState } from "react";
// import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../../components/Coversation/Conversation";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
// import "./Chat.css";
// import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   const { user } = useSelector((state) => state.authReducer.authData);

//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receivedMessage, setReceivedMessage] = useState(null);
//   // Get the chat in chat section
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await userChats(user._id);
//         setChats(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user._id]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8800");
//     socket.current.emit("new-user-add", user._id);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, [user]);

//   // Send Message to socket server
//   useEffect(() => {
//     if (sendMessage!==null) {
//       socket.current.emit("send-message", sendMessage);}
//   }, [sendMessage]);


//   // Get the message from socket server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       console.log(data)
//       setReceivedMessage(data);
//     }

//     );
//   }, []);


//   const checkOnlineStatus = (chat) => {
//     const chatMember = chat.members.find((member) => member !== user._id);
//     const online = onlineUsers.find((user) => user.userId === chatMember);
//     return online ? true : false;
//   };

//   return (
//     <div className="Chat">
//       {/* Left Side */}
//       <div className="Left-side-chat">
//         <LogoSearch />
//         <div className="Chat-container">
//           <h2>Chats</h2>
//           <div className="Chat-list">
//             {chats.map((chat) => (
//               <div
//                 onClick={() => {
//                   setCurrentChat(chat);
//                 }}
//               >
//                 <Conversation
//                   data={chat}
//                   currentUser={user._id}
//                   online={checkOnlineStatus(chat)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="Right-side-chat">
//         <div style={{ width: "20rem", alignSelf: "flex-end" }}>
//           <NavIcons />
//         </div>
//         <ChatBox
//           chat={currentChat}
//           currentUser={user._id}
//           setSendMessage={setSendMessage}
//           receivedMessage={receivedMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chat;