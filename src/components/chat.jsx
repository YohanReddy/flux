import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageList from './messageList.jsx';
import MessageInputForm from './messageInputForm.jsx';
import SummarySection from './summarySection.jsx';
import { Input } from "./ui/input.tsx";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect.tsx";

const words = [
  {
    text: "Enter",
  },
  {
    text: "your",
  },
  {
    text: "username",
  },
  {
    text: "to",
  },
  {
    text: "join",
  },
  {
    text: "the",
  },
  {
    text: "CHAT.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const Chat = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [joined, setJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('https://server-realtime-chat-phqj.onrender.com');
    // socket.current = io('localhost:4000');

    socket.current.on('chat message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
      setTypingMessage('');
    });

    socket.current.on('user joined', (data) => {
      addSystemMessage(`${data.username} has joined the chat!`);
    });

    socket.current.on('typing', (data) => {
      setTypingMessage(`${data.username}: ${data.inputValue}`);
    });

    socket.current.on('disconnect', () => {
      addSystemMessage('Disconnected from server. Please refresh the page to reconnect.');
    });

    socket.current.on('connect_error', (error) => {
      addSystemMessage(`Connection error: ${error.message}`);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter a username!');
      return;
    }

    socket.current.emit('join', { username });
    setJoined(true);
  };

  const sendMessage = () => {
    if (!username) {
      alert('Please enter a username!');
      return;
    }
    if (!inputValue) {
      alert('Please enter a message!');
      return;
    }

    const msg = inputValue.trim();
    setInputValue('');
    setTypingMessage('');

    socket.current.emit('chat message', { username, message: msg });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    socket.current.emit('typing', { username, inputValue: newValue });
  };

  const addSystemMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { systemMessage: true, message }]);
  };

  return (

    <div className="flex flex-col gap-1 justify-between items-center">
      {!joined && (
        <div className='gap-5 flex flex-col' id="username-container">
          <h1 className='text-xl sm:text-3xl md:text-5xl lg:text:7xl xl:text-7xl font-mono'>Welcome!</h1>
          <TypewriterEffectSmooth words={words} />          
          <Input placeholder="Enter Username" type="text"  value={username} onChange={(e) => setUsername(e.target.value)}/>
          <button  onClick={joinChat} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Join
          </button>
        </div>
      )}

      {joined && (
        <div className='space-y-2 w-full'>
          <MessageList messages={messages} typingMessage={typingMessage} /> {/* Pass typingMessage to MessageList */}
          <SummarySection messages={messages} />
          <div className='flex gap-3 w-full'>
          <MessageInputForm sendMessage={sendMessage} handleInputChange={handleInputChange} inputValue={inputValue} />
          </div>
        </div>
      )}
    </div>

  );
};

export default Chat;
