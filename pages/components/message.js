import React from 'react';

function Message({ message, sender }) {
    return (
        <div style={{ textAlign: sender === 'user' ? 'right' : 'left' }}>
            <p>{message}</p>
        </div>
    );
}

export default Message;
