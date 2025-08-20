import React, { useEffect, useRef } from "react";
import axios from "axios";

const WebSock = () => {
    const [messages, setMessages] = React.useState([]);
    const [value, setValue] = React.useState("");
    const socket = useRef()
    const [connected, setConnected] = React.useState(false);
    const [username, setUsername] = React.useState("");


    function connect() {
        socket.current = new WebSocket('ws://localhost:5000');
        
        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now(),
            }
            socket.current.send(JSON.stringify(message));
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
        socket.current.onclose = () => {
            console.log('Connection closed');
        }

        socket.current.onerror = (error) => {
            console.log('Connection error:', error);
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue("");
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Your name"/>
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
}

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                    <div className="messages">
                        {messages.map((mess) => (
                            <div key={mess.id} className="message">
                                {mess.event === 'connection' ? (
                                    <div>{`${mess.username} has joined the chat`}</div>
                                ) : (
                                    <div>{`${mess.username}: ${mess.message}`}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebSock;