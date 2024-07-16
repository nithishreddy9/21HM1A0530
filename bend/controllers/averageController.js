const axios = require('axios');
const { fetchNumbers } = require('../utils/api');

// Constants
const WINDOW_SIZE = 10;
let storedNumbers = [];

// Controller function
async function calculateAverage(req, res) {
  const { numberid } = req.params;

  try {
    // Fetch numbers from third-party server
    const response = await fetchNumbers(numberid);

    // Extract numbers from response
    const numbers = response.numbers;

    // Filter unique numbers and limit to window size
    numbers.forEach(num => {
      if (!storedNumbers.includes(num)) {
        if (storedNumbers.length >= WINDOW_SIZE) {
          storedNumbers.shift(); // Remove oldest number if window size is reached
        }
        storedNumbers.push(num);
      }
    });

    // Calculate average of current window
    const windowCurrState = storedNumbers.slice(-WINDOW_SIZE);
    const avg = calculateAverageFromArray(windowCurrState);

    // Prepare response object
    const responseObj = {
      windowPrevState: storedNumbers.slice(-2 * WINDOW_SIZE, -WINDOW_SIZE),
      windowCurrState: windowCurrState,
      numbers: numbers,
      avg: avg.toFixed(2)
    };

    // Send response
    res.json(responseObj);
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Failed to fetch numbers from server.' });
  }
}

// Helper function to calculate average
function calculateAverageFromArray(arr) {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
}

module.exports = {
  calculateAverage
};