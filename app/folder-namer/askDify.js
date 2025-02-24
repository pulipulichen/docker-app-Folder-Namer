const { difyCompletion, DifyCompletionCallParamsExp, setupDifyApi } = require('@aiapi/dify');

const config = {
  customHost: '192.168.195.202'
}

setupDifyApi(config);

const params = {
    query: 'Your query here',
    bearerKey: 'app-4q36WEjAeo8uxOHaTo61imRh',
    inputs: { variable1: 'value1', variable2: 'value2' },
    response_mode: 'blocking', // optional, default: 'blocking'
    user: 'Your username', // optional, a random string will be generated if not specified
    conversationId: 'Your conversation ID' // optional, a random ID will be generated if not specified
};



async function askDify() {
  const response = await difyCompletion(params);
  console.log(response);
}

module.exports = askDify