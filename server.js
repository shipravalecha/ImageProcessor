const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const sharp = require('sharp');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;

const server = new grpc.Server();
server.addService(imageprocessor.ImageProcessor.service, {
  flip: flip,
  resize: resize,
  grayscale: grayscale,
  thumbnail: thumbnail,
  rotateAnyAngle: rotateAnyAngle,
  rotateLeft: rotateLeft,
  rotateRight: rotateRight
});

function flip(call, callback) {
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

function resize(call, callback) {
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

function grayscale(call, callback) {
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

function thumbnail(call, callback) {
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

function rotateAnyAngle(call, callback) {
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

function rotateLeft(call, callback) {
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

function rotateRight(call, callback) {
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

server.bind('127.0.0.1:2001', grpc.ServerCredentials.createInsecure());
server.start();
console.log("Server started, listening: 127.0.0.1:2001");
