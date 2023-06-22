// In ApiKeyForm.js
import React, { useState } from 'react';

function ApiKeyForm({ onApiKeySubmit }) {
    const [openaiKey, setOpenaiKey] = useState('');
    const [isFreeVersion, setIsFreeVersion] = useState(false);
    const [googleCSEKey, setGoogleCSEKey] = useState('');
    const [googleCSEID, setGoogleCSEID] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onApiKeySubmit({ googleCSEKey, googleCSEID, openaiKey, isFreeVersion });
    };

    return (
        <div className="apiForm">
            <p>To enter the application, you can choose the "free version" (GPT 3.5) or enter your OpenAI key to use GPT 4 model.</p>
            <p>If you do not own a GPT-4 API key from OpenAI, you can apply to the waitlist located <a href="https://openai.com/waitlist/gpt-4-api">here</a>.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Use free version:
                    <input type="checkbox" checked={isFreeVersion} onChange={(e) => setIsFreeVersion(e.target.checked)} />
                </label>

                {!isFreeVersion && (
                    <label>
                        (required for GPT-4 model-) OpenAI API Key:
                        <input type="text" value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)} required />
                    </label>
                )}
                <p>If you would like images generated, submit your Google Programmable Search Engine API and ID (can be created <a href="https://developers.google.com/custom-search/docs/paid_element">here</a>).</p>
                <label>
                    (optional-) Google CSE API Key:
                    <input type="text" value={googleCSEKey} onChange={(e) => setGoogleCSEKey(e.target.value)} />
                </label>
                <label>
                    (optional-) Google CSE ID:
                    <input type="text" value={googleCSEID} onChange={(e) => setGoogleCSEID(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default ApiKeyForm;
