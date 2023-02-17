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

const request = {
  image: imageData,
  horizontal: true,
  vertical: false
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

const resizeRequest = {
  image: imageData,
  width: 350,
  height: 260
};

client.resize(resizeRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  const resizedImageData = response;
  console.log("image resized");
  fs.writeFileSync('./processed_image/resized_dog3.jpg', resizedImageData.data);
});

const grayscaleRequest = {
  image: imageData
};

client.grayscale(grayscaleRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  const grayscaleImageData = response;
  console.log("image grayscaled");
  fs.writeFileSync('./processed_image/grayscaled_dog3.jpg', grayscaleImageData.data);
});

const thumbnailRequest = {
  image: imageData
};

client.thumbnail(thumbnailRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  const thumbnailImageData = response;
  console.log("image thumbnail");
  fs.writeFileSync('./processed_image/thumbnail_dog3.jpg', thumbnailImageData.data);
});

const rotateAnyAngleRequest = {
  image: imageData,
  angle: -90
};

client.rotateAnyAngle(rotateAnyAngleRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("image rotated to: " + rotateAnyAngleRequest.angle);
  const rotateImageData = response;
  fs.writeFileSync('./processed_image/rotated_Any_dog3.jpg', rotateImageData.data);
});

// const newData = {
//   data: fs.readFileSync('./images/rotatedLeft.jpg'),
//   format: 'jpeg',
// };

const rotateLeftRequest = {
  image: imageData,
};

client.rotateLeft(rotateLeftRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("image rotated Left");
  const rotateImageData = response;
  fs.writeFileSync('./processed_image/rotatedLeft.jpg', rotateImageData.data);
});

const newData = {
  data: fs.readFileSync('./images/rotatedLeft.jpg'),
  format: 'jpeg',
};
const rotateRightRequest = {
  image: newData,
};

client.rotateRight(rotateRightRequest, function(err, response) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("image rotated Right");
  const rotateImageData = response;
  fs.writeFileSync('./processed_image/rotatedRight.jpg', rotateImageData.data);
});
