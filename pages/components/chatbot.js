import React, { useState } from 'react';
import Message from './message';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [historicalFigure, setHistoricalFigure] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (event) => {
        event.preventDefault();

        if (!chatStarted) {
            setHistoricalFigure(newMessage);
            setIsTyping(true);
            const res = await fetch('/api/image', { // changed to POST request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ figureName: newMessage }) // sending the figure name in the body of the request
            });
            const data = await res.json();
            const image = data.imageUrl;
            console.log(image);
            setIsTyping(false);
            setMessages(prevMessages => [...prevMessages, { text: `You are now speaking to ${newMessage}.`, sender: 'ai', image }]);
            setChatStarted(true);
        } else {
            setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
            setIsTyping(true);
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ historicalFigure: historicalFigure, message: newMessage }),
            });
            const data = await res.json();
            console.log(data);
            setIsTyping(false);
            setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'ai', image: data.imageUrl }]);
        }

        setNewMessage('');
    };


    return (
        <div className="chat-box">
            <div>
                {!chatStarted ? (
                    <p>Please enter the name of the historical figure you want to chat with:</p>
                ) : null}
                {messages.map((message, index) => {
                    console.log('Rendering message:', message); // Log each message
                    return (
                        <Message
                            key={index}
                            message={message.text}
                            sender={message.sender}
                            image={message.image}
                        />
                    )
                })}
                {/* Add a "typing" message */}
                {isTyping ? <Message key="typing" message={`${historicalFigure} is typing...`} sender='ai' /> : null}
            </div>
            <form onSubmit={handleSend}>
                {!chatStarted ? (
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter historical figure name"
                    />
                ) : (
                    <div className="textarea-container">
                        <textarea
                            className="textarea-style"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </div>
                )}
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatBox;
