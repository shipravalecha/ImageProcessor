const express = require('express');
const sharp = require('sharp');
const bodyparser = require('body-parser');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger")

const PORT = process.env.PORT || 8080;
const app = express();
const upload = multer;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/home', (req, res) => {
    res.send("Image processor")
});

app.post('/newPost', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    res.send({
        "name": name,
        "age": age,
        "status": "ok"
    });
});

app.post('/upload', (req, res) => {
    // sharp(req.file.buffer)
    //   .resize(500)
    //   .toBuffer()
    //   .then(data => {
    //     res.set('Content-Type', 'image/jpeg');
    //     res.send(data);
    //   })
    //   .catch(error => {
    //     res.status(500).send(error.message);
    //   });
});

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});