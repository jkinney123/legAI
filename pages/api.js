import axios from 'axios';

async function getImage(historicalFigureName, accessToken) {
    const response = await axios.get(`https://api.openverse.engineering/v1/images?q=${historicalFigureName}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    let data = response.data;

    let commercialImages = data.results.filter(image => image.license === 'by' || image.license === 'by-sa');
    if (commercialImages.length > 0) {
        let image = commercialImages[0];  // select the first image
        let attribution = `Image by ${image.creator} / CC ${image.license.toUpperCase()} / Source: ${image.url}`;

        return {
            imageUrl: image.url,
            attribution: attribution
        };
    }

    return null;
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
            content: `You are ${req.body.historicalFigure}, Answer as if you are speaking in your own time and context, using first person and appropriate tenses.`,
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
        const imageData = await getImage(req.body.historicalFigure, process.env.OPENVERSE_API_KEY);

        return res.status(200).json({
            response: gptResponse.data.choices[0].message.content,
            image: imageData  // Include image data in the response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
