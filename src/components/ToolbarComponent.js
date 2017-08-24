import React from 'react';

export default function ToolbarComponent({ messages, selectedMessageCount }) {
  let unreadMessages = messages.filter(message => !message.read);
  let numberUnread = unreadMessages.length;

  let disabled = '';
  if (selectedMessageCount > 0) {
    disabled = '';
  } else {
    disabled = 'disabled';
  }

  let checkedState = '';
  if (messages.length === selectedMessageCount) {
    checkedState = 'fa fa-check-square-o';
  } else if (messages.length > 0 && messages.length < selectedMessageCount) {
    checkedState = 'fa fa-minus-square-o';
  } else {
    checkedState = 'fa fa-square-o';
  }
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numberUnread}</span>
          unread messages
        </p>

        <button className="btn btn-danger">
          <i className="fa fa-plus" />
        </button>

        <button className="btn btn-default">
          <i className={`${checkedState}`} />
        </button>

        <button className="btn btn-default" disabled={`${disabled}`}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={`${disabled}`}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={`${disabled}`}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={`${disabled}`}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={`${disabled}`}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
