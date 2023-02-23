const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const sharp = require('sharp');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;
const server = new grpc.Server();

// Add all the image processing services to the addService
server.addService(imageprocessor.ImageProcessor.service, {
  flip: flip,
  resize: resize,
  grayscale: grayscale,
  thumbnail: thumbnail,
  rotateAnyAngle: rotateAnyAngle,
  rotateLeft: rotateLeft,
  rotateRight: rotateRight
});

// flip operation
function flip(call, callback) {
  console.log("FLIP called");
  const image = call.request.image;
  const horizontal = call.request.horizontal;
  const vertical = call.request.vertical;
  sharp(image.data)
    .flip(horizontal, vertical)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const flippedImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        flipped_image: flippedImageData,
      };
      callback(null, response.flipped_image);
    });
}

// resize operation
function resize(call, callback) {
  console.log("RESIZE called");
  const image = call.request.image;
  const width = call.request.width.low;
  const height = call.request.height.low;
  sharp(image.data)
    .resize(width,height)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const resizedImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        resized_image: resizedImageData,
      };
      callback(null, response.resized_image);
    });
}

// grayscale operation
function grayscale(call, callback) {
  console.log("GRAYSCALE called");
  const image = call.request.image;
  sharp(image.data)
    .grayscale()
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const grayscaleImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        grayscaled_image: grayscaleImageData,
      };
      callback(null, response.grayscaled_image);
    });
}

// thumbnail operation
function thumbnail(call, callback) {
  console.log("THUMBNAIL called");
  const image = call.request.image;
  const width = 300;
  const height = 300;
  sharp(image.data)
    .resize(width,height)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const thumbnailImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        thumbnail_image: thumbnailImageData,
      };
      callback(null, response.thumbnail_image);
    });
}

// rotateAnyAngle operation
function rotateAnyAngle(call, callback) {
  console.log("ROTATE ANY ANGLE called");
  const image = call.request.image;
  const angle = call.request.angle.low;
  sharp(image.data)
    .rotate(angle)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const rotateImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        rotate_image: rotateImageData,
      };
      callback(null, response.rotate_image);
    });
}

// rotateLeft operation
function rotateLeft(call, callback) {
  console.log("ROTATELEFT called");
  const image = call.request.image;
  const angle = -90;
  sharp(image.data)
    .rotate(angle)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const rotateImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        rotate_image: rotateImageData,
      };
      callback(null, response.rotate_image);
    });
}

// rotateRight operation
function rotateRight(call, callback) {
  console.log("ROTATERIGHT called");
  const image = call.request.image;
  const angle = +90;
  sharp(image.data)
    .rotate(angle)
    .toBuffer(function(err, data) {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
      const rotateImageData = {
        data: data,
        format: image.format,
      };
      const response = {
        rotate_image: rotateImageData,
      };
      callback(null, response.rotate_image);
    });
}

// start server running at localhost at port 2001
server.bind('127.0.0.1:2001', grpc.ServerCredentials.createInsecure());
server.start();
console.log("Server started, listening: 127.0.0.1:2001");