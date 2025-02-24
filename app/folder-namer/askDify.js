const FormData = require('form-data');
const http = require('http');

const fs = require('fs');
const path = require('path');

const API_HOST = '192.168.100.202';
const API_PATH = '/v1/chat-messages';
const API_KEY = 'app-4q36WEjAeo8uxOHaTo61imRh'; // Replace with your actual API key

const API_URL = `http://${API_HOST}/v1/files/upload`; // 替換為你的 Workflow ID


async function askDify() {
  return new Promise((resolve, reject) => {
    const form = new FormData();

    const testInput = { question: "Node.js 如何整合 AI API?" };

    form.append('inputs', JSON.stringify({
      inputs: testInput,
      user: 'abc-123'
    }));
    form.append('file', fs.createReadStream(path.join(__dirname, 'img.jpg')));

    const options = {
        method: 'POST',
        headers: {
            ...form.getHeaders(),
            "Authorization": `Bearer ${DIFY_API_KEY}`
        }
    };

    const req = http.request(API_URL, options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                console.log("Dify Workflow Response:", parsedData);
                resolve(parsedData);
            } catch (error) {
                reject(error);
            }
        });
    })

    req.on('error', (error) => {
      console.error("Error executing workflow:", error.message);
      reject(error);
    });

    form.pipe(req);
  });
}

module.exports = askDify