const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({extended: true}));

app.get('/home', (req, res) => {
    res.send("Image processor")
});

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});