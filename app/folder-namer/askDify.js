const FormData = require('form-data');
const http = require('http');
const axios = require("axios");
const { exec } = require('child_process');

const fs = require('fs');
const path = require('path');

const API_HOST = '192.168.100.202';
const API_PATH = '/v1/chat-messages';
const API_KEY = 'app-oNLncwOFIZ0rO2sxH237amkd'; // Replace with your actual API key

const API_URL = `http://${API_HOST}/v1/files/upload`; // 替換為你的 Workflow ID

function uploadFileWithCurl(filePath, apiKey, user) {
  return new Promise((resolve, reject) => {
    const command = `curl -X POST 'http://192.168.100.202/v1/files/upload' \\
      --header 'Authorization: Bearer ${apiKey}' \\
      --form 'file=@${filePath};type=image/jpg' \\
      --form 'user=${user}'`;

    console.log(command)

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing curl command: ${error}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`curl command stderr: ${stderr}`);
      }
      try {
        const result = JSON.parse(stdout); // Attempt to parse JSON response
        resolve(result);
      } catch (parseError) {
        console.log(`curl command stdout: ${stdout}`); //if not json, print the output.
        resolve(stdout); // Resolve with the raw output if parsing fails
      }
    });
  });
}

async function askDify(context) {
  const filePath = path.join(__dirname, 'img.jpg');
  return uploadFileWithCurl(filePath, API_KEY, 'abc-123')
}

module.exports = askDify