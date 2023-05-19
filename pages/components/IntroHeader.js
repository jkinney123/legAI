import React from 'react';

function IntroHeader({ chatStarted }) {
    return (
        <>
            {!chatStarted && (
                <div className="intro-header">
                    <h1>TimeTravel Chats</h1>
                    <p>Have you ever wanted to ponder the meaning of life with Socrates? Or engage in a heated debate with Galileo Galilei about the mysteries of the cosmos?</p>
                    <p>Step into a time machine of words with TimeTravel Chats! Engage in captivating conversations with historical figures and experience history firsthand. Explore the minds of visionaries, conquerors, and revolutionaries as they share their thoughts, ideals, and quirks.</p>
                </div>
            )}
            {chatStarted && (
                <div className="intro-header">
                    <h1>TimeTravel Chats</h1>
                </div>
            )}
        </>
    );
}

export default IntroHeader;
