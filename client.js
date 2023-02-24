/**
 * Version: 1.0
 * Author: Shipra
 * Course: CPSC 5200 Software Architecture and Design
 * Project: Image processor using sharp, an image processing node module
 * Description: This file takes the client input which contains the image path from the local directory or from the file 
 * within the project. It reads the input image in the form of bytes and calls the appropriate image operations that are 
 * implemented on the server using gRPC. It also returns the final output image back to the user by writing the image using 
 * byte format on the specified destination folder. It is like a proxy layer between client and server so that client needs not to interact 
 * directly with the server and it also ensures the abstraction from the client.
 * 
 */

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;
const client = new imageprocessor.ImageProcessor('localhost:2001', grpc.credentials.createInsecure());

// throw error when there is incomplete command and command line arguments are less than 4
if (process.argv.length < 4) {
    console.error('Usage: node server.js <image_path> <transform_operation> [transform_params]');
    process.exit(1);
}

const args = process.argv.slice(2);
const imagePath = args[0];
const transformArgs = [];

// reading the input image as a byte stream
const imageData = {
    data: fs.readFileSync(imagePath),
    format: 'jpeg',
};

let i = 1
while(i < args.length){
  const arg = args[i];
  if(arg.startsWith("--")) {
    if(arg == "--resize") {
      let width = args[i + 1];
      let height = args[i + 2];
      i = i + 3;
      transformArgs.push({
        type: 'resize',
        width: parseInt(width),
        height: parseInt(height)
      });
    }
    if(arg == "--rotate") {
      let angle = [args[i + 1]];
      i = i + 2;
      transformArgs.push({
        type: 'rotate',
        angle: parseInt(angle)
      });
    }
    if(arg == "--flip") {
      transformArgs.push({
        type: 'flip',
      });
      i = i + 1;
    }
    if(arg == "--grayscale") {
      transformArgs.push({
        type: 'grayscale',
      });
      i = i + 1;
    }
    if(arg == "--thumbnail") {
      transformArgs.push({
        type: 'thumbnail',
      });
      i = i + 1
    }
    if(arg == "--rotateLeft") {
      transformArgs.push({
        type: 'rotateLeft',
      });
      i = i + 1
    }
    if(arg == "--rotateRight") {
      transformArgs.push({
        type: 'rotateRight',
      });
      i = i + 1
    }
  } 
  else {
    console.error("Invalid argument!!! Provide argument with that starts with --")
    process.exit(1);
  }
}

let countThumbnail = 0;
for (let op of transformArgs) {
  if (op.type == 'thumbnail') countThumbnail++;
}

// throw error when there is more than one thumbnail operation requested by the user
if (countThumbnail > 1) {
  console.error('Provide valid operation. Give just one thumbnail operation');
  process.exit(1);
}

var currentImage = imageData
var handleOperation  = () => {
  if(transformArgs.length == 0) {
    // processed everything
    const outputImagePath = '/Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/processedImages/output.jpg'
    fs.writeFileSync(outputImagePath, currentImage.data);
    console.log("image processed");
    return;
  }
  var op = transformArgs.shift()
  if(op.type == "resize") {
    const request = {
      image: currentImage,
      width: op["width"],
      height: op["height"]
    }
    client.resize(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const newImageData = {
        data: response.data,
        format: 'jpeg',
    };
    console.log("handled resize");
    currentImage = newImageData;
    handleOperation();
    });
  }
  if(op.type == "rotate") {
    const request = {
      image: currentImage,
      angle: op["angle"]
    }
    client.rotateAnyAngle(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("rotate Angle handled");
      currentImage = processedImage;
      handleOperation();
    });
  }
  if(op.type == "flip") {
    const request = {
      image: currentImage
    }
    client.flip(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("flip handled");
      currentImage = processedImage;
      handleOperation();
    });
  }
  if(op.type == "grayscale") {
    const request = {
      image: currentImage
    }
    client.grayscale(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("grayscale handled");
      currentImage = processedImage;
      handleOperation();
    });
  }
  if(op.type == "rotateLeft") {
    const request = {
      image: currentImage
    }
    client.rotateLeft(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("rotateLeft handled");
      currentImage = processedImage;
      handleOperation();
    });
  }
  if(op.type == "rotateRight") {
    const request = {
      image: currentImage
    }
    client.rotateRight(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("rotateRight handled");
      currentImage = processedImage;
      handleOperation();
    });
  }
  if(op.type == "thumbnail") {
    const request = {
      image: currentImage
    }
    client.thumbnail(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
      const processedImage = response;
      console.log("thumbnail handled");
      thumbnailReturn(processedImage);
      // currentImage = processedImage;
      handleOperation();
    });
  }
}

handleOperation();

var thumbnailReturn = (processedImage) => {
  const outputImagePath = '/Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/processedImages/thumbnail_output.jpg'
    fs.writeFileSync(outputImagePath, processedImage.data);
    console.log("thumbnail image processed");
    return;
}