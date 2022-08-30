import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import './Chat.css';

function Chat() {
    const pubnub = usePubNub();
    const [channels] = useState(['devELOPEr chat']);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');

    const handleMessage = event => {
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            const text = message.text || message;
            addMessage(messages => [...messages, text]);
        }
    };

    const sendMessage = message => {
        if (message) {
            pubnub
                .publish({ channel: channels[0], message })
                .then(() => setMessage(''));
        }
    };

    useEffect(() => {
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    return (
        <div className="pageStyles">
            <div className="chatStyles">
                <div className="headerStyles">devELOPER chat</div>
                <div className="listStyles">
                    {messages.map((message, index) => {
                        return (
                            <div key={`message-${index}`} className="messageStyles">
                                {message}
                            </div>
                        );
                    })}
                </div>
                <div className="footerStyles">
                    <input
                        type="text"
                        className="inputStyles"
                        placeholder="Type your message"
                        value={message}
                        onKeyPress={e => {
                            if (e.key !== 'Enter') return;
                            sendMessage(message);
                        }}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button
                        className="buttonStyles"
                        onClick={e => {
                            e.preventDefault();
                            sendMessage(message);
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;