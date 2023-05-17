import React, { useState } from 'react';
import Message from './Message';


function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [historicalFigure, setHistoricalFigure] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // Add this line

    const handleSend = async (event) => {
        event.preventDefault();

        if (!chatStarted) {
            setHistoricalFigure(newMessage);
            setMessages(prevMessages => [...prevMessages, { text: `You are now speaking to ${newMessage}.`, sender: 'ai' }]);
            setChatStarted(true);
        } else {
            // Add user's message to chat
            setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
            setIsTyping(true); // Set isTyping to true right before making the request
            // Send the user's message to the GPT-4 API
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ historicalFigure: historicalFigure, message: newMessage }),
            });
            const data = await res.json();
            setIsTyping(false); // Set isTyping to false after receiving the response
            // Add AI's response to chat
            setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'ai' }]);
        }

        // Clear the input field
        setNewMessage('');
    };

    return (
        <div className="chat-box">
            <div>
                {!chatStarted ? (
                    <p>Please enter the name of the historical figure you want to chat with:</p>
                ) : null}
                {messages.map((message, index) => (
                    <Message key={index} message={message.text} sender={message.sender} />
                ))}
                {/* Add a "typing" message */}
                {isTyping ? <Message key="typing" message={`${historicalFigure} is typing...`} sender='ai' /> : null}
            </div>
            <form onSubmit={handleSend}>
                <div className="textarea-container">
                    <textarea
                        className="textarea-style"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatBox;
