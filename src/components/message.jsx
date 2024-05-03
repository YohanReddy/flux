import React from 'react';

const Message = ({ message }) => {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <li className='bg-neutral-700 text-neutral-300 p-2 rounded-md'>
      {message.systemMessage ? (
        <>{message.message} <p className='text-neutral-900 text-sm float-right'>{timestamp}</p> </>
      ) : (
        <>
          <span>{message.username}: {message.message} <p className='text-neutral-900 text-sm float-right'>{timestamp}</p> </span>
        </>
      )}
    </li>
  );
};

export default Message;
