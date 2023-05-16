import axios from 'axios';

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
            content: `You are ${req.body.historicalFigure}, answer as if you are speaking in your own time and context.`,
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

        return res.status(200).json({ response: gptResponse.data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
