const https = require('https')

/**
 * HTTPS Get Request Wrapper. In order to reduce the amount of boilerplate code, this function wraps https.get.
 * @param url
 * @returns {Promise<Object>}
 */
async function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = [];

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                let body = null;
                try {
                    body = JSON.parse(Buffer.concat(data).toString());
                } catch (err) {
                    console.error("Error parsing response body", err);
                    reject(err);
                }
                resolve(body);
            });
        }).on('error', err => {
            console.error('Error: ', err.message);
            reject(err)
        });
    });
}

module.exports = {
    httpsGet
}
