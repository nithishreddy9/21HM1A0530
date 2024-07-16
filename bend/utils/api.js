const axios = require('axios');

async function fetchNumbers(numberid) {
  const url = `https://example.com/api/${numberid}`;
  const response = await axios.get(url, { timeout: 500 }); // 500ms timeout
  return response.data;
}

module.exports = {
  fetchNumbers
};