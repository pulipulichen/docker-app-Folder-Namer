const http = require('http');

const API_HOST = '192.168.100.202';
const API_PATH = '/v1/chat-messages';
const API_KEY = 'app-4q36WEjAeo8uxOHaTo61imRh'; // Replace with your actual API key

async function askDify() {
  
  const requestData = JSON.stringify({
    // inputs: {},
    query: "What are the specs of the iPhone 13 Pro Max?",
    // response_mode: "streaming",
    // conversation_id: "",
    // user: "abc-123",
    // files: [
    //     {
    //         type: "image",
    //         transfer_method: "remote_url",
    //         url: "https://cloud.dify.ai/logo/logo-site.png"
    //     }
    // ]
  });

  console.log({requestData})

  const options = {
    hostname: API_HOST,
    port: 80, // HTTP uses port 80, change to 443 for HTTPS
    path: API_PATH,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
    }
  };



  const sendRequest = async () => {
      return new Promise((resolve, reject) => {
          const req = http.request(options, (res) => {
              res.setEncoding('utf8');
              let responseData = '';
              
              res.on('data', (chunk) => {
                console.log(chunk)
                  responseData += chunk;
              });

              res.on('end', () => {
                  console.log('Response:', responseData);
                  resolve(responseData);
              });
          });

          req.on('error', (error) => {
              console.error('Error:', error.message);
              reject(error);
          });

          req.write(requestData);
          req.end();
      });
  };

 try {
      // console.log('Request completed successfully');
      return await sendRequest();
      
  } catch (error) {
      // console.error('Request failed:', error);
      return false
  }

}

module.exports = askDify