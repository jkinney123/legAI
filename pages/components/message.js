import React from 'react';

function Message({ message, sender, image }) {  // Take image as a prop
    return (
        <div className={`message ${sender}`}>
            <p>{message}</p>
            {image ? (  // If image data is provided, display it
                <div>
                    <img src={image.imageUrl} alt="" />
                    <p>{image.attribution}</p>
                </div>
            ) : null}
        </div>
    );
}

export default Message;