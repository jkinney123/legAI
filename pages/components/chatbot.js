import React, { useState } from 'react';
import Message from './message';
import IntroHeader from './IntroHeader';
import ImageCarousel from './ImageCarousel';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [historicalFigure, setHistoricalFigure] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false)

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
            setImageLoaded(true);
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
            <ImageCarousel />
            <IntroHeader chatStarted={chatStarted} />
            <div>
                {!chatStarted ?
                    (
                        <div className="introMsg">
                            <p>Please enter the name of the historical figure you want to chat with:</p>
                        </div>
                    ) : null}
                {messages.map((message, index) => {
                    console.log('Rendering message:', message); // Log each message
                    return (
                        <Message
                            key={index}
                            message={message.text}
                            sender={message.sender}
                            image={message.image}
                            className={index === 0 ? 'initial-message' : ''}
                        />
                    )
                })}
                {isTyping ? <Message key="typing" message={`${historicalFigure} is typing`} sender='ai' className='typing-message' /> : null}
            </div>
            <div className="centered-form">
                <form onSubmit={handleSend}>
                    {!chatStarted ? (
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Enter name here"
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
                    <div className="submitbtn">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
            {imageLoaded ? (
                <div className="imgNote">
                    <p>Note** Images are sourced from Google Search Engine API</p>
                </div>
            ) : null}
        </div>
    );
}

export default ChatBox;
