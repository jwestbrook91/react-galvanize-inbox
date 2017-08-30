import React from 'react';

export default class MessageComponent extends React.Component {
  state = {
    bodyVisible: false
  };

  handleMarkReadClick = event => {
    event.preventDefault();
    if (!this.state.bodyVisible) this.setState({ bodyVisible: true });
    if (this.state.bodyVisible) this.setState({ bodyVisible: false });
    this.props.onMarkAsReadMessage(this.props.message.id);
  };

  handleStarClick = event => {
    event.preventDefault();
    if (this.props.message.starred) {
      this.props.onUnstarMessage(this.props.message.id);
    } else {
      this.props.onStarMessage(this.props.message.id);
    }
  };

  handleSelectClick = event => {
    if (this.props.selectedMessageIds.includes(this.props.message.id)) {
      this.props.onDeselectMessage(this.props.message.id);
    } else {
      this.props.onSelectMessage(this.props.message.id);
    }
  };

  render() {
    if (!this.props.message) {
      return <h4>"No Messages"</h4>;
    }
    let readStatus = '';
    if (this.props.message.read === false) {
      readStatus = 'unread';
    } else {
      readStatus = 'read';
    }

    let starStatus = '';
    if (this.props.message.starred === false) {
      starStatus = 'fa-star-o';
    } else {
      starStatus = 'fa-star';
    }

    let selectStatus = '';
    if (this.props.selected === true) {
      selectStatus = 'selected';
    } else {
      selectStatus = '';
    }

    return (
      <div>
        <div className={`row message ${readStatus} ${selectStatus}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={!!this.props.selected} onClick={this.handleSelectClick} />
              </div>
              <div className="col-xs-2">
                <i className={`star fa ${starStatus}`} onClick={this.handleStarClick} />
              </div>
            </div>
          </div>
          <div className="col-xs-11" onClick={this.handleMarkReadClick}>
            {this.props.message.labels.map((label, i) =>
              <span className="label label-warning" key={i}>
                {label}
              </span>
            )}
            <a href="a">
              {this.props.message.subject}
            </a>
          </div>
        </div>
        {this.state.bodyVisible
          ? <div className="message-body">
              {this.props.message.body}
            </div>
          : null}
      </div>
    );
  }
}
