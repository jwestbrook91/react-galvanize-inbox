import React from 'react';
import InboxPageLayout from './InboxPageLayout';
import ToolbarComponent from './ToolbarComponent';
import MessagesComponent from './MessagesComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  messages,
  selected,
  onMarkAsReadMessage,
  onStarMessage,
  onUnstarMessage,
  onSelectMessage,
  onDeselectMessage,
  onOpenComposeForm,
  composeOpen,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages,
  onSubmit,
  onCancel,
  selectedMessageCount
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolbarComponent
          messages={messages}
          selectedMessageCount={selectedMessageCount}
          onOpenComposeForm={onOpenComposeForm}
          onSelectAllMessages={onSelectAllMessages}
          onDeselectAllMessages={onDeselectAllMessages}
          onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
          onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
          onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
          onDeleteSelectedMessages={onDeleteSelectedMessages}
        />
        {composeOpen ? <ComposeFormComponent onSubmit={onSubmit} onCancel={onCancel} /> : null}
        <MessagesComponent
          messages={messages}
          selectedMessageIds={selected}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
        />
      </InboxPageLayout>
    </div>
  );
}
