import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InboxPage from './components/InboxPage';

let messages = [
  {
    id: 1,
    subject: 'Nigerian Prince, will pay many monies to you if helping',
    read: false,
    starred: false,
    labels: ['spam'],
    body: 'I am nigerian prince. Please to give me your bank account info.'
  },
  {
    id: 2,
    subject: 'Viagra!!!!',
    read: false,
    starred: true,
    labels: ['spam', 'personal'],
    body: 'Spam. Totally spam'
  },
  {
    id: 3,
    subject: '10 weird tips for building muscles that doctors dont want you to know',
    read: true,
    starred: false,
    labels: [],
    body: 'example body text'
  },
  {
    id: 4,
    subject: 'Personal trainers hate him',
    read: false,
    starred: false,
    labels: [],
    body: 'Hint: He takes steroids'
  },
  {
    id: 5,
    subject: 'Son, please answer my phone calls',
    read: true,
    starred: true,
    labels: ['personal'],
    body: 'You are making your mother sad :('
  },
  {
    id: 6,
    subject: 'Just Pho You: Where to Eat SF’s Best Pho',
    read: true,
    starred: false,
    labels: [],
    body: 'Great restaurants near you'
  },
  {
    id: 7,
    subject: 'Regarding your recent purchase of hair loss cream...',
    read: true,
    starred: true,
    labels: ['personal'],
    body: 'hah! You bald sucker!'
  }
];

let showComposeForm = undefined;
let selectedMessageIds = [];
let selectedMessageCount = 0;

function onMarkAsReadMessage(messageId) {
  let target = messages.find(thisMessage => thisMessage.id === messageId);
  target.read = true;
  render();
}

function onUnstarMessage(messageId) {
  let target = messages.find(thisMessage => thisMessage.id === messageId);
  target.starred = false;
  render();
}

function onStarMessage(messageId) {
  let target = messages.find(thisMessage => thisMessage.id === messageId);
  target.starred = true;
  render();
}

function onSelectMessage(messageId) {
  selectedMessageIds.push(messageId);
  selectedMessageCount = selectedMessageIds.length;
  render();
}

function onDeselectMessage(messageId) {
  let removed = selectedMessageIds.indexOf(messageId);
  selectedMessageIds.splice(removed, 1);
  selectedMessageCount = selectedMessageIds.length;
  render();
}

function onSelectAllMessages() {
  selectedMessageIds = messages.map(message => message.id);
  selectedMessageCount = selectedMessageIds.length;
  render();
}

function onDeselectAllMessages() {
  selectedMessageIds = [];
  selectedMessageCount = selectedMessageIds.length;
  render();
}

function onOpenComposeForm() {
  showComposeForm = true;
  render();
}

function onMarkAsReadSelectedMessages() {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.read = true;
    }
  });
  render();
}

function onMarkAsUnreadSelectedMessages() {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.read = false;
    }
  });
  render();
}

function onApplyLabelSelectedMessages(label) {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id) && !message.labels.includes(label)) {
      message.labels.push(label);
    }
  });
  render();
}

function onRemoveLabelSelectedMessages(label) {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.labels.forEach(l => {
        if (label === l) {
          message.labels.splice(message.labels.indexOf(label), 1);
        }
      });
    }
  });
  render();
}

function onDeleteSelectedMessages() {
  if (selectedMessageIds.length > 0) {
    let deleted = [];
    messages.forEach((message, index) => {
      if (selectedMessageIds.includes(message.id)) deleted.push(index);
    });
    deleted = deleted.sort().reverse();
    deleted.forEach(a => messages.splice(a, 1));
  }
  render();
}

function onSubmit(subject, body) {
  let newMessage = {
    id: 0,
    subject: 'str',
    read: false,
    starred: false,
    labels: [],
    body: ''
  };
  newMessage.id = messages[messages.length - 1].id + 1;
  newMessage.subject = subject;
  newMessage.body = body;
  messages.unshift(newMessage);
  showComposeForm = false;
  render();
}

function onCancel() {
  showComposeForm = false;
  render();
}
render();
function render() {
  ReactDOM.render(
    <InboxPage
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={showComposeForm}
      onMarkAsReadMessage={onMarkAsReadMessage}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onOpenComposeForm={onOpenComposeForm}
      onSelectAllMessages={onSelectAllMessages}
      onDeselectAllMessages={onDeselectAllMessages}
      onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
      onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
      onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
      onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
      onDeleteSelectedMessages={onDeleteSelectedMessages}
      onSubmit={onSubmit}
      onCancel={onCancel}
      selectedMessageCount={selectedMessageCount}
    />,
    document.getElementById('root')
  );
}
