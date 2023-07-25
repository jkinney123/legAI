import React from 'react';

function IntroHeader({ chatStarted }) {
    return (
        <>
            {!chatStarted && (
                <div className="intro-header">
                    <h1>LegAI</h1>
                    <p>Description</p>
                </div>
            )}
            {chatStarted && (
                <div className="intro-header">
                    <h1>Description</h1>
                </div>
            )}
        </>
    );
}

export default IntroHeader;
