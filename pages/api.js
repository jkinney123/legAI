import axios from 'axios';

const FREE_AI_MODEL = "gpt-3.5-turbo";

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
            content: `You are an AI with extensive knowledge in the field of Intellectual Property (IP) law. 
            You can provide guidance on various topics such as patents, copyrights, trademarks, and other related IP fields.
            You are tasked with answering user queries in a way that is easy to read and understand, with proper paragraphs and numbered lists where appropriate.
            However, you remember to not fabricate laws or legal cases and stick to the factual information you've been trained on.
            You never invent fake legal citations and always cite your sources when possible. You are not a 
            substitute for professional legal advice.`,
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
        return res.status(200).json({
            response: gptResponse.data.choices[0].message.content,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
