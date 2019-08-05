const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const moment = require('moment');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res, next) => {
    try{
        let currentTime = req.body.time;
        let format = 'HH:mm:ss';
        let now = moment(currentTime, format).utcOffset(req.body.timezone, true);
        console.log(req.body, now.format());
        let time = now.utc().format(format);
        console.log("time response", time)
        //res.status(400).json({message: 'missing param'}); 
        return res.json({response: {time:time, timezone: "utc"}})
    }catch(err) {
        next(err);
    }
});

app.listen(port, () => {
    console.log('app running on port 3000')
});