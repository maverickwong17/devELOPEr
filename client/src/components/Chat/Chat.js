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
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import MediaQuery from "react-responsive";
import Loader from "../Loader/Loader";
import "./Chat.css";

import rawUsers from "../../data/chat-data/users.json";
import directChannels from "../../data/chat-data/direct.json";

const users = rawUsers;
const directChannelList = directChannels;
const allChannelIds = [...directChannelList].map((c) => c.id);

function DevChat() {
    const { loading, data: profile } = useQuery(QUERY_ME);
    const myprofile = profile?.me || {};
    // console.log(myprofile.profile.images[0])

    const pubnub = usePubNub();
    const [showMembers, setShowMembers] = useState(false);
    const [showChannels, setShowChannels] = useState(true);
    const [presenceData] = usePresence({ channels: allChannelIds });
    const [currentChannel, setCurrentChannel] = useState(directChannelList[0]);

    const presentUUIDs = presenceData[currentChannel.id]?.occupants?.map((o) => o.uuid);
    const presentUsers = users.filter((u) => presentUUIDs?.includes(u.id));
    const currentUser = users.find((u) => u.id === pubnub.getUUID());

    const theme = "dark";

    return (

        <div className='app-simple'>
            <Chat users={users} currentChannel={currentChannel.id} channels={allChannelIds} theme={theme}>
                <MediaQuery minWidth={700}>
                    <div className={`channels ${showChannels && "shown"}`}>
                        <div className="user">
                            {currentUser?.profileUrl && <img src={myprofile.profile.images[0]} alt="User avatar " />}
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
                </MediaQuery>

                <div className="chat pn-msg-own ::-webkit-scrollbar ::placeholder">
                    <div
                        className={`people ${showMembers ? "active" : ""}`}
                    >
                        <span>{presenceData[currentChannel.id]?.occupancy || 0}</span>
                        <i className="material-icons-outlined">online</i>
                    </div>
                    <div className="info">
                        <h4>{currentChannel.name}</h4>
                        <small>{currentChannel.description}</small>
                        <hr />
                    </div>
                    <MessageList
                        fetchMessages={10}
                    >
                        <TypingIndicator showAsMessage />
                    </MessageList>
                    {/* <hr /> */}
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