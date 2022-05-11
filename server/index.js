const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    return res.status(200).json({
        message: "Welcome to Elijah's server"
    })
})

app.post('/test', async (req, res) => {
    try {
        const splitArray = req.body.string_to_cut.split("");
        let returnString = '';
        for (let i = 2; i < splitArray.length - 1; i += 3) {
            returnString += splitArray[i]
        }
        res.status(200).json({
            return_string: returnString
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})