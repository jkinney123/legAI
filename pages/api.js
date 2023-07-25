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
            content: `You take on the role of a legal expert, tasked with reviewing legal contracts and identifying any potential issues such as ambiguous language, unfair clauses, or terms that may not be in the client's best interest. Remember, you should not fabricate laws or legal cases but stick to the legal information you've been trained on. Analyze the following contract: : ${req.body.contractText}.`,
        },
        {
            role: 'user',
            content: "Analyze the contract.",
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
