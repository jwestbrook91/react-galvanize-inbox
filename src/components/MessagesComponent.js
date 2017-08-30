import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({
  messages,
  selectedMessageIds,
  onMarkAsReadMessage,
  onStarMessage,
  onUnstarMessage,
  onSelectMessage,
  onDeselectMessage
}) {
  if (!messages) return <h4>"No Messages"</h4>;

  return (
    <div>
      {messages.map(message =>
        <MessageComponent
          message={message}
          key={message.id}
          selected={selectedMessageIds.includes(message.id)}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          selectedMessageIds={selectedMessageIds}
        />
      )}
    </div>
  );
}
