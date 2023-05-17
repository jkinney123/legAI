import React from 'react';

function Message({ message, sender }) {
    return (
        <div className={`message ${sender}`}>
            <p>{message}</p>
        </div>
    );
}


export default Message;
