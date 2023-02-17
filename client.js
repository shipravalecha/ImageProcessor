const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;

const client = new imageprocessor.ImageProcessor('localhost:2001', grpc.credentials.createInsecure());

const imageData = {
  data: fs.readFileSync('./images/dog3.jpeg'),
  format: 'jpeg',
};
// console.log(imageData.data)
const request = {
  image: imageData,
  horizontal: true,
  vertical: false,
};

client.flip(request, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  const flippedImageData = response;
  console.log("image processed");
  fs.writeFileSync('./processed_image/flipped_dog3.jpg', flippedImageData.data);
});
