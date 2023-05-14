const express = require('express');
const cors = require('cors');
const app = express();
const options = {
    origin: 'http://localhost:3000',
    useSuccessStatus: 200,
};
app.use(cors(options));

const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
    res.send({ message: 'Start of  things' });
});
app.listen(8000, () => {
    console.log('Running on port 8000');
});
