

import React, { useState } from 'react';
import Message from './message';
import IntroHeader from './IntroHeader';
import ApiKeyForm from './ApiKeyForm';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [apiKeys, setApiKeys] = useState({
        openaiKey: process.env.OPENAI_API_KEY || '',
    });
    const [showForm, setShowForm] = useState(true);

    const handleApiKeys = (keys) => {
        console.log("Keys submitted: ", keys);
        setApiKeys(keys);
        setShowForm(false);
    };

    const handleSend = async (event) => {
        event.preventDefault();

        setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
        setIsTyping(true);
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKeys.isFreeVersion ? process.env.OPENAI_API_KEY : apiKeys.openaiKey}`,
            },
            body: JSON.stringify({ message: newMessage }),
        });
        const data = await res.json();
        console.log(data);
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'ai' }]);
        setNewMessage('');
    };

    return (
        <div className="chat-box">
            {showForm ? (
                <ApiKeyForm onApiKeySubmit={handleApiKeys} />
            ) : (
                <>
                    <div className="introMsg">
                        <p>Hello! I am an AI legal expert in Intellectual Property (IP) law. Ask me anything!</p>
                    </div>
                    <div>
                        {messages.map((message, index) => {
                            console.log('Rendering message:', message); // Log each message
                            return (
                                <Message
                                    key={index}
                                    message={message.text}
                                    sender={message.sender}
                                    className={index === 0 ? 'initial-message' : ''}
                                />
                            )
                        })}
                        {isTyping ? <Message key="typing" message={`LegAI is analyzing...`} sender='ai' className='typing-message' /> : null}
                    </div>
                    <div className="centered-form">
                        <form onSubmit={handleSend}>
                            <div className="textarea-container">
                                <textarea
                                    className="textarea-style"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                            </div>
                            <div className="submitbtn">
                                <button type="submit" className="submit-button">Analyze</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatBox;
