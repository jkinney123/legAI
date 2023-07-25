import React from 'react';

function Message({ message, sender, className }) {
    return (
        <div className={`message ${sender} ${className}`}>
            {sender === 'ai' && className === 'typing-message' ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="typing-text">{message}</span>
                </div>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}

export default Message;
