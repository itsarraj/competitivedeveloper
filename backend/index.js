const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('/home', (req, res) => {
    res.send('Start of great things');
});

app.listen(8000, () => {
    console.log('Running on port 8000');
});
