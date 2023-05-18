const axios = require('axios');

const getImage = async (searchTerm) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: process.env.GOOGLE_CSE_API_KEY,
                cx: process.env.GOOGLE_CSE_ID,
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
    const imageUrl = await getImage(figureName);
    res.status(200).json({ imageUrl: imageUrl }); // making sure it returns an object with a key 'imageUrl'
};
