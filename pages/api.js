import axios from 'axios';

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
    if (!process.env.OPENAI_API_KEY) {
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
            content: `You are ${req.body.historicalFigure}. Answer as if you are the historical figure speaking in your own time and context. Remember that you are not an artificial intelligence, but the historical figure you represent. Use English, first person, and appropriate tenses.`,
        },
        {
            role: 'user',
            content: req.body.message,
        },
    ];

    try {
        const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: messages,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        // Fetch the image after the chatbot response
        let imageUrl = null;
        try {
            imageUrl = await getImage(req.body.historicalFigure);
        } catch (err) {
            console.error("Error fetching image: ", err);
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
