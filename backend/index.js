const express = require('express');
const cors = require('cors');
const app = express();
let allowed = [
    'http://localhost:4000',
    'http://localhost:3001', // multiple ports allowed
    'http://localhost:3002', // multiple ports allowed
];
function options(req, res) {
    let tmp;
    let origin = req.header('Origin');
    if (allowed.indexOf(origin) > -1) {
        tmp = {
            origin: true,
            optionSuccessStatus: 200,
        };
    } else {
        tmp = {
            origin: false,
        };
    }
    res(null, tmp);
}

// const options = {
//     origin: 'http://localhost:3000',
//     useSuccessStatus: 200,
// };
app.use(cors(options));

const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
    res.send({ message: 'Start of  things' });
});
app.listen(8000, () => {
    console.log('Running on port 8000');
});
