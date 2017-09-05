import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import getMessages from './requests/getMessages';
import updateMessage from './requests/updateMessage';
import deleteMessage from './requests/deleteMessage';
import createMessage from './requests/createMessage';

export default class App extends Component {
  state = {
    messages: [],
    selectedMessageIds: [],
    showComposeForm: undefined,
    selectedMessageCount: 0
  };

  render() {
    return (
      <InboxPage
        messages={this.state.messages}
        selectedMessageIds={this.state.selectedMessageIds}
        showComposeForm={this.state.showComposeForm}
        selectedMessageCount={this.state.selectedMessageCount}
        onMarkAsReadMessage={this._onMarkAsReadMessage}
        onStarMessage={this._onStarMessage}
        onUnstarMessage={this._onUnstarMessage}
        onSelectMessage={this._onSelectMessage}
        onDeselectMessage={this._onDeselectMessage}
        onOpenComposeForm={this._onOpenComposeForm}
        onSelectAllMessages={this._onSelectAllMessages}
        onDeselectAllMessages={this._onDeselectAllMessages}
        onMarkAsReadSelectedMessages={this._onMarkAsReadSelectedMessages}
        onMarkAsUnreadSelectedMessages={this._onMarkAsUnreadSelectedMessages}
        onApplyLabelSelectedMessages={this._onApplyLabelSelectedMessages}
        onRemoveLabelSelectedMessages={this._onRemoveLabelSelectedMessages}
        onDeleteSelectedMessages={this._onDeleteSelectedMessages}
        onSubmit={this._onSubmit}
        onCancel={this._onCancel}
      />
    );
  }

  componentDidMount() {
    getMessages().then(messages => {
      this.setState({
        messages
      });
    });
  }

  _onMarkAsReadMessage = messageId => {
    updateMessage(messageId, 'read').then(() => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(thisMessage => thisMessage.id === messageId).read = true;
        return {
          messages: newMessages
        };
      });
    });
  };

  _onStarMessage = messageId => {
    updateMessage(messageId, 'star').then(() => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(thisMessage => thisMessage.id === messageId).starred = true;
        return {
          messages: newMessages
        };
      });
    });
  };

  _onUnstarMessage = messageId => {
    updateMessage(messageId, 'unstar').then(() => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.find(thisMessage => thisMessage.id === messageId).starred = false;
        return {
          messages: newMessages
        };
      });
    });
  };

  _onSelectMessage = messageId => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds.push(messageId);
      return {
        selectedMessageIds: newSelectedMessageIds,
        selectedMessageCount: newSelectedMessageIds.length
      };
    });
  };

  _onDeselectMessage = messageId => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      let removed = newSelectedMessageIds.indexOf(messageId);
      newSelectedMessageIds.splice(removed, 1);
      return {
        selectedMessageIds: newSelectedMessageIds,
        selectedMessageCount: newSelectedMessageIds.length
      };
    });
  };

  _onOpenComposeForm = () => {
    this.setState(prevState => {
      let newShowComposeForm = true;
      return {
        showComposeForm: newShowComposeForm
      };
    });
  };

  _onSelectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.messages.map(message => message.id);
      return {
        selectedMessageIds: newSelectedMessageIds,
        selectedMessageCount: newSelectedMessageIds.length
      };
    });
  };

  _onDeselectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = [];
      return {
        selectedMessageIds: newSelectedMessageIds,
        selectedMessageCount: newSelectedMessageIds.length
      };
    });
  };
  _onMarkAsUnreadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(message => {
      updateMessage(message, 'unread').then(() => {
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newMessages = prevState.messages.splice(0);
            let toChange = newMessages.filter(message => prevState.selectedMessageIds.includes(message.id));
            toChange.forEach(message => (message.read = false));
            return {
              messages: newMessages
            };
          }
        });
      });
    });
  };

  _onMarkAsReadSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(message => {
      updateMessage(message, 'read').then(() => {
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newMessages = prevState.messages.splice(0);
            let toChange = newMessages.filter(message => prevState.selectedMessageIds.includes(message.id));
            toChange.forEach(message => (message.read = true));
            return {
              messages: newMessages
            };
          }
        });
      });
    });
  };

  _onApplyLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(message => {
      let labels = this.state.messages.find(thisMessage => thisMessage.id === message).labels;
      if (labels.includes(label)) return;
      updateMessage(message, 'addLabel', labels, label).then(() => {
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newMessages = prevState.messages.splice(0);
            let toChange = newMessages.filter(message => prevState.selectedMessageIds.includes(message.id));
            toChange.forEach(message => {
              if (!message.labels.includes(label)) message.labels.push(label);
            });
            return {
              messages: newMessages
            };
          }
        });
      });
    });
  };

  _onRemoveLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(message => {
      let labels = this.state.messages.find(thisMessage => thisMessage.id === message).labels;
      if (!labels.includes(label)) return;
      let newLabels = labels.filter(thisLabel => thisLabel !== label);
      updateMessage(message, 'removeLabel', newLabels).then(() => {
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newMessages = prevState.messages.splice(0);
            let toChange = newMessages.filter(message => prevState.selectedMessageIds.includes(message.id));
            toChange = toChange.filter(message => message.labels.includes(label));
            toChange.forEach(message => {
              let removed = message.labels.indexOf(label);
              message.labels.splice(removed, 1);
            });
            return {
              messages: newMessages
            };
          }
        });
      });
    });
  };

  _onDeleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      deleteMessage(messageId).then(() => {
        this.setState(prevState => {
          if (prevState.selectedMessageIds.length > 0) {
            let newMessages = prevState.messages.filter(message => !prevState.selectedMessageIds.includes(message.id));
            return {
              messages: newMessages
            };
          }
        });
      });
    });
  };

  _onSubmit = (subject, body) => {
    let newMessage = {
      id: 0,
      subject: '',
      read: false,
      starred: false,
      labels: [],
      body: ''
    };
    newMessage.subject = subject;
    newMessage.body = body;
    createMessage(newMessage).then(newId => {
      newMessage.id = newId.id;
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.unshift(newMessage);
        return {
          messages: newMessages,
          showComposeForm: false
        };
      });
    });
  };

  _onCancel = () => {
    this.setState({
      showComposeForm: false
    });
  };
}
