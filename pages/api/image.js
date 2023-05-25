const axios = require('axios');

const getImage = async (searchTerm, googleCSEKey, googleCSEID) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: googleCSEKey,
                cx: googleCSEID,
                q: searchTerm,
                searchType: 'image',
                num: 1,
                safe: 'high',
            }
        });
        return response.data.items[0].link;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default async (req, res) => {
    const { figureName } = req.body;
    const googleCSEKey = req.headers['google-cse-key'] || process.env.GOOGLE_CSE_API_KEY;
    const googleCSEID = req.headers['google-cse-id'] || process.env.GOOGLE_CSE_ID;
    if (googleCSEKey && googleCSEID) {
        try {
            const imageUrl = await getImage(figureName, googleCSEKey, googleCSEID);
            res.status(200).json({ imageUrl: imageUrl });
        } catch (err) {
            console.error("Error fetching image: ", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(200).json({ imageUrl: null }); // Return null if image fetching is not set up
    }
};