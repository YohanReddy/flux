// // messageList.js

// import React from 'react';
// import Message from './message';
// import TypingIndicator from './typingIndicator';

// const MessageList = ({ messages, typingMessage }) => (
//   <ul id="messages">
//     {messages.map((message, index) => (
//       <Message key={index} message={message} />
//     ))}
//     {typingMessage && <TypingIndicator typingMessage={typingMessage} />} {/* Render TypingIndicator if typingMessage is present */}
//   </ul>
// );

// export default MessageList;


import React from 'react';
import Message from './message'; // Assuming the correct path to the Message component
import TypingIndicator from './typingIndicator'; // Assuming the correct path to the TypingIndicator component



const MessageList = ({ messages, typingMessage }) => (
  <div className="flex min-h-[70dvh] max-h-[70dvh] text-white overflow-auto">
        <ul className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {typingMessage && <TypingIndicator typingMessage={typingMessage} />}
        </ul>
  </div>
);

export default MessageList;
