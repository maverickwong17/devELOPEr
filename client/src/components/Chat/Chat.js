import React, { useState, useEffect } from "react";
// import { Picker } from "emoji-mart";
// import DarkModeToggle from "react-dark-mode-toggle";
import { usePubNub } from "pubnub-react";
import {
    usePresence,
    UserEntity,
    TypingIndicator,
    // Picker,
    //   Themes,
    MessageList,
    MessageInput,
    MessageEnvelope,
    MemberList,
    Chat,
    ChannelList,
    ChannelEntity,
} from "@pubnub/react-chat-components";

import "./Chat.css";
// import "emoji-mart/css/emoji-mart.css";
// import { ReactComponent as PeopleGroup } from "./icons/people-group.svg";

/**
 * In this simple application, data about users, channels and sample welcome messages are
 * statically loaded from JSON files. In most cases users and channels data will be provided from an
 * external source or loaded from PubNub Objects storage with custom hooks included in the package.
 * Sample messages are fully optional.
 * */
import rawUsers from "../../data/chat-data/users.json";
import rawMessages from "../../data/chat-data/messages.json";
import directChannels from "../../data/chat-data/direct.json";
// import socialChannels from "../../data/chat-data/social.json";

const users = rawUsers;
// const socialChannelList = socialChannels;
const directChannelList = directChannels;
const allChannelIds = [...directChannelList].map((c) => c.id);

function DevChat() {
    const pubnub = usePubNub(); //usePubNub is only used here to get current user info (as it's randomly selected)
    // const [theme, setTheme] = useState<Themes>("light");
    const [showMembers, setShowMembers] = useState(false);
    const [showChannels, setShowChannels] = useState(true);
    // const [welcomeMessages, setWelcomeMessages] = useState({ channel: string, MessageEnvelope });
    const [presenceData] = usePresence({ channels: allChannelIds }); // usePresence is one of the custom hooks provided by Chat Components
    const [currentChannel, setCurrentChannel] = useState(directChannelList[0]);

    const presentUUIDs = presenceData[currentChannel.id]?.occupants?.map((o) => o.uuid);
    const presentUsers = users.filter((u) => presentUUIDs?.includes(u.id));
    const currentUser = users.find((u) => u.id === pubnub.getUUID());

    /** Prepare welcome messages for each channel injecting current user info into some of them */
    useEffect(() => {
        const messages = {};
        [...rawMessages].forEach((message) => {
            // console.log(message)
            if (!messages.hasOwnProperty(message.channel)) messages[message.channel] = [];
            if (message.uuid === "current_user" && currentUser?.id) message.uuid = currentUser?.id;
            messages[message.channel].push(message);
        });
        // console.log(messages)
        //   setWelcomeMessages(messages);
    }, [currentUser]);


    const startChat = () => {
        // let test =
         pubnub.publish({
            channel: "testing",
            message: {
                type: 'challenge',
                payload: {
                    action: 'request',
                    uuid: "myFirstUser",
                    target: "user_142da3c419804a82a3057cedc86acaa6"
                }
            }
        }, function (status, response) {
            console.log(status)
            console.log(response)
        }
        )
        // console.log(test)
    };

    // const currentChannel = "devELOPEr one";
    const theme = "dark";

    /** Rendered markup is a mixture of PubNub Chat Components (Chat, ChannelList, MessageList,
     * MessageInput, MemberList) and some elements to display additional information and to handle
     * custom behaviors (dark mode, showing/hiding panels, responsive design) */
    return (
        <div className='app-simple'>
            {/* Be sure to wrap Chat component in PubNubProvider from pubnub-react package.
        In this case it's done in the index.tsx file */}
            <Chat users={users} currentChannel={currentChannel.id} channels={allChannelIds} theme={theme}>
                <div className={`channels ${showChannels && "shown"}`}>
                    <div className="user">
                        {currentUser?.profileUrl && <img src={currentUser?.profileUrl} alt="User avatar " />}
                        <h4>
                            {currentUser?.name}{" "}
                            <span className="close" onClick={() => setShowChannels(false)}>
                                ✕
                            </span>
                        </h4>
                    </div>
                    {/* <h4>Channels</h4>
                    <div>
                        <ChannelList
                            channels={socialChannelList}
                            onChannelSwitched={(channel) => setCurrentChannel(channel)}
                        />
                    </div> */}
                    <h4>Direct Chats</h4>
                    <div>
                        <ChannelList className='pn-channel-list pn-channel pn-channel--active pn-channel--hover'
                            channels={directChannelList}
                            onChannelSwitched={(channel) => setCurrentChannel(channel)}
                        />
                    </div>
                    {/* <div className="toggle">
                        <span>Dark Mode</span>
                        <DarkModeToggle
                            size={50}
                            checked={theme === "dark"}
                            onChange={(isDark) => (isDark ? setTheme("dark") : setTheme("light"))}
                        />
                    </div> */}
                </div>

                <div className="chat">
                    <div
                        className={`people ${showMembers ? "active" : ""}`}
                        onClick={() => setShowMembers(!showMembers)}
                    >
                        <span>{presenceData[currentChannel.id]?.occupancy || 0}</span>
                        <i className="material-icons-outlined">people</i>
                    </div>

                    <div className="info">
                        <span className="hamburger" onClick={() => setShowChannels(true)}>
                            ☰
                        </span>
                        <h4>{currentChannel.name}</h4>
                        <small>{currentChannel.description}</small>
                        <hr />
                    </div>
                    <MessageList
                        fetchMessages={10}
                    //   welcomeMessages={welcomeMessages[currentChannel.id]}
                    //   enableReactions
                    //   reactionsPicker={<Picker />}
                    >
                        <TypingIndicator showAsMessage />
                    </MessageList>
                    <hr />
                    <MessageInput typingIndicator onSend={(e) => (console.log(e.text))} />
                </div>

                <div className={`members ${showMembers && "shown"}`}>
                    <h4>
                        Online Users
                        <span className="close" onClick={() => setShowMembers(false)}>
                            ✕
                        </span>
                    </h4>
                    <MemberList members={presentUsers} />
                </div>
                <div>
                    <button onClick={() => startChat()}>New Chat</button>
                </div>
            </Chat>
        </div>
    );
}

export default DevChat;



// import React, { useState, useEffect } from 'react';
// import PubNub from 'pubnub';
// import { usePubNub } from 'pubnub-react';
// import './Chat.css';

// function Chat() {
//     const pubnub = usePubNub();
//     const [channels] = useState(['devELOPEr chat']);
//     const [messages, addMessage] = useState([]);
//     const [message, setMessage] = useState('');

//     const handleMessage = event => {
//         const message = event.message;
//         if (typeof message === 'string' || message.hasOwnProperty('text')) {
//             const text = message.text || message;
//             addMessage(messages => [...messages, text]);
//         }
//     };

//     const sendMessage = message => {
//         if (message) {
//             pubnub
//                 .publish({ channel: channels[0], message })
//                 .then(() => setMessage(''));
//         }
//     };

//     useEffect(() => {
//         pubnub.addListener({ message: handleMessage });
//         pubnub.subscribe({ channels });
//     }, [pubnub, channels]);

//     return (
//         <div className="pageStyles">
//             <div className="chatStyles">
//                 <div className="headerStyles">devELOPER chat</div>
//                 <div className="listStyles">
//                     {messages.map((message, index) => {
//                         return (
//                             <div key={`message-${index}`} className="messageStyles">
//                                 {message}
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="footerStyles">
//                     <input
//                         type="text"
//                         className="inputStyles"
//                         placeholder="Type your message"
//                         value={message}
//                         onKeyPress={e => {
//                             if (e.key !== 'Enter') return;
//                             sendMessage(message);
//                         }}
//                         onChange={e => setMessage(e.target.value)}
//                     />
//                     <button
//                         className="buttonStyles"
//                         onClick={e => {
//                             e.preventDefault();
//                             sendMessage(message);
//                         }}
//                     >
//                         Send Message
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;