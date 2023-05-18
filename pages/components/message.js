import React from 'react';

function Message({ message, sender, image }) {
    return (
        <div className={sender}>
            {image && sender === 'ai' ? <img src={image} alt="" /> : null}
            <p>{message}</p>
        </div>
    );
}

export default Message;
