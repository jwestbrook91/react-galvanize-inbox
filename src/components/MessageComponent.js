import React from 'react';

export default function MessageComponent({ message }) {
  let readStatus = '';

  if (!message) {
    return <h4>"No Messages"</h4>;
  }
  if (message.read === false) {
    readStatus = 'unread';
  } else {
    readStatus = 'read';
  }

  let starStatus = '';
  if (message.starred === false) {
    starStatus = 'fa-star-o';
  } else {
    starStatus = 'fa-star';
  }

  let selectStatus = '';
  let checkStatus = '';
  if (message.selected === true) {
    checkStatus = 'checked';
    selectStatus = 'selected';
  } else {
    checkStatus = '';
    selectStatus = '';
  }

  return (
    <div className={`row message ${readStatus} ${selectStatus}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={checkStatus} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${starStatus}`} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((label, i) =>
          <span className="label label-warning" key={i}>
            {label}
          </span>
        )}
        <a href="a">
          {message.subject}
        </a>
      </div>
    </div>
  );
}
