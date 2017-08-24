import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({ messages, selectedMessageIds }) {
  if (!messages) return <h4>"No Messages"</h4>;

  return (
    <div>
      {messages.map(message => <MessageComponent message={message} selected={selectedMessageIds} key={message.id} />)}
    </div>
  );
}

//message.selected will eventually break and needs a refactor
