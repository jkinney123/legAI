import React, { useState } from 'react';
import Message from './message';
import IntroHeader from './IntroHeader';
import ImageCarousel from './ImageCarousel';
import ApiKeyForm from './ApiKeyForm';


function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [historicalFigure, setHistoricalFigure] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayCarousel, setDisplayCarousel] = useState(true);
    const [apiKeys, setApiKeys] = useState({
        openaiKey: process.env.OPENAI_API_KEY || '',
        googleCSEKey: process.env.GOOGLE_CSE_KEY || '',
        googleCSEID: process.env.GOOGLE_CSE_ID || ''
    });
    const [showForm, setShowForm] = useState(true);

    const handleApiKeys = (keys) => {
        console.log("Keys submitted: ", keys);
        setApiKeys(keys);
        setShowForm(false);
        // Now you can use keys.openaiKey, keys.googleCSEKey, and keys.googleCSEID in your API calls
    };

    const handleSend = async (event) => {
        event.preventDefault();

        if (!chatStarted) {
            setHistoricalFigure(newMessage);
            setIsTyping(true);
            const res = await fetch('/api/image', { // changed to POST request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Google-CSE-Key': apiKeys.googleCSEKey,
                    'Google-CSE-ID': apiKeys.googleCSEID
                },
                body: JSON.stringify({ figureName: newMessage }) // sending the figure name in the body of the request
            });
            const data = await res.json();
            const image = data.imageUrl;
            console.log(image);
            setIsTyping(false);
            setImageLoaded(true);
            setDisplayCarousel(false);
            setMessages(prevMessages => [...prevMessages, { text: `You are now speaking to ${newMessage}.`, sender: 'ai', image }]);
            setChatStarted(true);
        } else {
            setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
            setIsTyping(true);
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKeys.isFreeVersion ? process.env.OPENAI_API_KEY : apiKeys.openaiKey}`,
                    'Google-CSE-Key': apiKeys.googleCSEKey,
                    'Google-CSE-ID': apiKeys.googleCSEID
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
            {showForm ? (
                <>
                    <ImageCarousel />
                    <ApiKeyForm onApiKeySubmit={handleApiKeys} />
                </>
            ) : (
                <>
                    {displayCarousel && <ImageCarousel />}
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
                </>
            )}
        </div>
    );

}

export default ChatBox;
