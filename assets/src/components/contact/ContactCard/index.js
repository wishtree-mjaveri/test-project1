import React from 'react';

import UserCell from './UserCell/index';

const ChatUserList = ({ chatUsers, onSelectUser }) => (
  <div>
    {chatUsers.map((chat, index) => <UserCell key={index} chat={chat} onSelectUser={onSelectUser} />)}
  </div>
);

export default ChatUserList;
