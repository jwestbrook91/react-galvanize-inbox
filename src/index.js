import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InboxPage from './components/InboxPage';

let messages = [
  {
    id: 1,
    subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    labels: [],
    body: `<div>example body text</div>`
  },
  {
    id: 2,
    subject: 'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev'],
    body: 'example body text'
  },
  {
    id: 3,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    labels: [],
    body: 'example body text'
  },
  {
    id: 4,
    subject: 'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal'],
    body: 'example body text'
  },
  {
    id: 5,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: [],
    body: 'example body text'
  },
  {
    id: 6,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal'],
    body: 'example body text'
  },
  {
    id: 7,
    subject: 'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: [],
    body: 'example body text'
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
  if (selectedMessageIds.length > 0) {
    let selectedMessages = messages.filter(message => selectedMessageIds.includes(message.id));
    selectedMessages.forEach(message => message.read == true);
  }
  render();
}

function onMarkAsUnreadSelectedMessages() {
  if (selectedMessageIds.length > 0) {
    let selectedMessages = messages.filter(message => selectedMessageIds.includes(message.id));
    selectedMessages.forEach(message => message.read == false);
  }
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
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      messages.splice(messages.indexOf(), 1);
    }
  });
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
  messages.push(newMessage);
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
