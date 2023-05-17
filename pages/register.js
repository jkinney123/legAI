const axios = require('axios');
const qs = require('querystring');

async function registerApp() {
    try {
        const response = await axios.post('https://api.openverse.engineering/v1/auth_tokens/register/', {
            name: "Hitorical FigureBot",
            description: "Speak with any historical figure!",
            email: "joekinney53@gmail.com"
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function getToken(client_id, client_secret) {
    try {
        const response = await axios.post('https://api.openverse.engineering/v1/auth_tokens/token/', qs.stringify({
            grant_type: "client_credentials",
            client_id: client_id,
            client_secret: client_secret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// First register your app
// After you get the client_id and client_secret, comment the registerApp call and use getToken
//registerApp();
getToken("1RQmukP6yPqLDJf8jPFdvyJgfzoNyNXt1nsOr6GM", "h2LVEgJdtqFxhbHOWklxjvZiZAOUtwQ063xeBJ7C9JGPZ66ki11Qx4LohvItrsnu9VswsEzAANIMpdWNcgQT4r3IUkLJSNPXg3F2VwwwkafyUA6hO62i9VOtoWEz6JFW");
