const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const port = 8080;

app.use(bodyparser.urlencoded({extended: true}));

app.get('/home', (req, res) => {
    res.send("Image processor");
});

app.listen(port, () => {
    console.log('Server is up and running at port' , port);
});
