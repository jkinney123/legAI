import axios from 'axios';

const FREE_AI_MODEL = "gpt-3.5-turbo";

async function getImage(figureName) {
    try {
        const response = await axios.get(`http://localhost:3000/api/image?figure=${figureName}`);
        return response.data.imageUrl;
    } catch (error) {
        console.error("Error fetching image: ", error);
        return null;
    }
}

export default async function (req, res) {
    const openaiKey = req.headers['authorization'].split(' ')[1] || process.env.OPENAI_API_KEY;
    const isFreeVersion = openaiKey === process.env.OPENAI_API_KEY;

    if (!openaiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }

    const messages = [
        {
            role: 'system',
            content: `You are ${req.body.historicalFigure}. Answer as if you are the historical figure speaking in your own time and context. Carry on the conversation in your style and perspective, without needing to state your name in each response. Use English, first person, and appropriate tenses. Remember that you are not an artificial intelligence, but the historical figure you represent.`,
        },
        {
            role: 'user',
            content: req.body.message,
        },
    ];

    try {
        const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: isFreeVersion ? FREE_AI_MODEL : 'gpt-4',
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
        });

        // Fetch the image after the chatbot response
        let imageUrl = null;
        if (process.env.GOOGLE_CSE_API_KEY && process.env.GOOGLE_CSE_ID) {
            try {
                imageUrl = await getImage(req.body.historicalFigure);
            } catch (err) {
                console.error("Error fetching image: ", err);
                res.status(500).json({ error: err.message });
                return;
            }
        }

        return res.status(200).json({
            response: gptResponse.data.choices[0].message.content,
            imageUrl: imageUrl, // Include image data in the response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
