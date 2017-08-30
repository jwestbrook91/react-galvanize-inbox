import React from 'react';

export default function ToolbarComponent({
  messages,
  selectedMessageCount,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages
}) {
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

  function handleOnOpenComposeForm() {
    onOpenComposeForm();
  }
  function handleOnSelectAllMessages() {
    if (selectedMessageCount !== messages.length) onSelectAllMessages();
    else onDeselectAllMessages();
  }
  function handleOnMarkAsReadSelectedMessages() {
    if (selectedMessageCount > 0) onMarkAsReadSelectedMessages();
  }
  function handleOnMarkAsUnreadSelectedMessages() {
    if (selectedMessageCount > 0) onMarkAsUnreadSelectedMessages();
  }
  function handleOnApplyLabelSelectedMessages(event) {
    if (selectedMessageCount > 0) onApplyLabelSelectedMessages(event.target.value);
  }
  function handleAllRemoveLabel(event) {
    if (selectedMessageCount > 0) onRemoveLabelSelectedMessages(event.target.value);
  }
  function handleDeleteSelected() {
    if (selectedMessageCount > 0) onDeleteSelectedMessages();
  }
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numberUnread}</span>
          unread messages
        </p>

        <button className="btn btn-danger" onClick={handleOnOpenComposeForm}>
          <i className="fa fa-plus" />
        </button>

        <button className="btn btn-default" onClick={handleOnSelectAllMessages}>
          <i className={`${checkedState}`} />
        </button>

        <button className="btn btn-default" disabled={`${disabled}`} onClick={handleOnMarkAsReadSelectedMessages}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={`${disabled}`} onClick={handleOnMarkAsUnreadSelectedMessages}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={`${disabled}`} onClick={handleOnApplyLabelSelectedMessages}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={`${disabled}`} onClick={handleAllRemoveLabel}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={`${disabled}`} onClick={handleDeleteSelected}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
