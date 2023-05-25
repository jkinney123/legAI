// In ApiKeyForm.js
import React, { useState } from 'react';

function ApiKeyForm({ onApiKeySubmit }) {
    const [openaiKey, setOpenaiKey] = useState('');
    const [googleCSEKey, setGoogleCSEKey] = useState('');
    const [googleCSEID, setGoogleCSEID] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onApiKeySubmit({ openaiKey, googleCSEKey, googleCSEID });
    };

    return (
        <div className="apiForm">
            <p>To enter the application, please submit your Open AI GPT-4 API key below.</p>
            <p>If you would like images generated, submit your Google Programmable Search Engine API and ID (can be created <a href="https://developers.google.com/custom-search/docs/paid_element">here</a>). The Programmable Search Element API charges $5 per 1000 ad-free search element queries, although you will probably not reach this query limit and the API should remain free. This is optional, but recommended.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    (required) OpenAI API Key:
                    <input type="text" value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)} required />
                </label>
                <label>
                    (optional-image generation) Google CSE API Key:
                    <input type="text" value={googleCSEKey} onChange={(e) => setGoogleCSEKey(e.target.value)} />
                </label>
                <label>
                    (optional-image generation) Google CSE ID:
                    <input type="text" value={googleCSEID} onChange={(e) => setGoogleCSEID(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>Note * GPT-4 API is required for this application. If you do not own a GPT-4 API key from Open AI you can apply to the waitlist located <a href="https://openai.com/waitlist/gpt-4-api">here</a>.</p>
        </div>
    );
}

export default ApiKeyForm;
