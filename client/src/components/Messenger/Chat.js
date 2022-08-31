import React from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Chat.css';
// import Toolbar from './Toolbar';
// import ToolbarButton from './ToolbarButton';

export default function Messenger(props) {
    return (
      <div className="messenger">


        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="content">
          <MessageList />
        </div>
      </div>
    );
}