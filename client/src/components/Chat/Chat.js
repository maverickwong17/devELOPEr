import React, { useState, useEffect } from "react";
import { usePubNub } from "pubnub-react";
import {
    usePresence,
    TypingIndicator,
    MessageList,
    MessageInput,
    MemberList,
    Chat,
    ChannelList,
} from "@pubnub/react-chat-components";
import "./Chat.css";

import rawUsers from "../../data/chat-data/users.json";
import rawMessages from "../../data/chat-data/messages.json";
import directChannels from "../../data/chat-data/direct.json";

const users = rawUsers;
const directChannelList = directChannels;
const allChannelIds = [...directChannelList].map((c) => c.id);

function DevChat() {
    const pubnub = usePubNub(); 
    const [showMembers, setShowMembers] = useState(false);
    const [showChannels, setShowChannels] = useState(true);
    const [presenceData] = usePresence({ channels: allChannelIds });
    const [currentChannel, setCurrentChannel] = useState(directChannelList[0]);

    const presentUUIDs = presenceData[currentChannel.id]?.occupants?.map((o) => o.uuid);
    const presentUsers = users.filter((u) => presentUUIDs?.includes(u.id));
    const currentUser = users.find((u) => u.id === pubnub.getUUID());

    useEffect(() => {
        const messages = {};
        [...rawMessages].forEach((message) => {
            if (!messages.hasOwnProperty(message.channel)) messages[message.channel] = [];
            if (message.uuid === "current_user" && currentUser?.id) message.uuid = currentUser?.id;
            messages[message.channel].push(message);
        });
    }, [currentUser]);

    const theme = "dark";

    return (
        <div className='app-simple'>
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
                    <h4>Your DMs</h4>
                    <div>
                        <ChannelList className='pn-channel-list pn-channel pn-channel--active pn-channel--hover'
                            channels={directChannelList}
                            onChannelSwitched={(channel) => setCurrentChannel(channel)}
                        />
                    </div>
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
            </Chat>
        </div>
    );
}

export default DevChat;