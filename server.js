const express = require('express');
const fs = require('fs');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const app = express();


app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('This is a express app');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
