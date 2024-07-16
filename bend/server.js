const express = require('express');
const averageController = require('./controllers/averageController');

const app = express();
const port = 9876;

app.use(express.json());

// Route for average calculation
app.get('/numbers/:numberid', averageController.calculateAverage);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});