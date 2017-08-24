import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';

storiesOf('MessageComponent', module)
  .add('Unread', () =>
    <MessageComponent
      selected={true}
      message={{
        id: 1,
        subject: "Here's a bunch of random text!",
        read: false,
        starred: false,
        labels: []
      }}
    />
  )
  .add('Read', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject: "Here's a bunch of random text!",
        read: true,
        starred: false,
        labels: []
      }}
    />
  )
  .add('Selected', () =>
    <MessageComponent
      selected={true}
      message={{
        id: 1,
        subject: "Here's a bunch of random text!",
        read: true,
        starred: false,
        checked: false,
        labels: []
      }}
    />
  )
  .add('Starred', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject: "Here's a bunch of random text!",
        read: true,
        starred: true,
        labels: []
      }}
    />
  )
  .add('With Labels', () =>
    <MessageComponent
      selected={true}
      message={{
        id: 1,
        subject: "Here's a bunch of random text!",
        read: false,
        starred: false,
        labels: ['dev', 'important']
      }}
    />
  );
