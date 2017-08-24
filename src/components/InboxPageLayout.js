import React from 'react';

export default function InboxPageLayout(props) {
  console.log(props.children);
  return (
    <div className="InboxPageLayout">
      {props.children[0]}
      {props.children[2]}
      {props.children[1]}
    </div>
  );
}
