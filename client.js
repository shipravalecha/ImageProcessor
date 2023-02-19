const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;
const client = new imageprocessor.ImageProcessor('localhost:2001', grpc.credentials.createInsecure());

if (process.argv.length < 4) {
    console.error('Usage: node server.js <image_path> <transform_operation> [transform_params]');
    process.exit(1);
}

const args = process.argv.slice(2);
const imagePath = args[0];
const transformArgs = [];

const imageData = {
    data: fs.readFileSync(imagePath),
    format: 'jpeg',
};

let i = 1
while(i < args.length){
  const arg = args[i];
  if(arg.startsWith("--")) {
    if(arg == "--resize") {
      let width = args[i + 1]
      let height = args[i + 2]
      i = i + 3
      transformArgs.push({
        type: 'resize',
        width: parseInt(width),
        height: parseInt(height)
      });
    }
    if(arg == "--rotate") {
      let angle = [args[i + 1]]
      i = i + 2
      transformArgs.push({
        type: 'rotate',
        angle: parseInt(angle)
      });
    }
    if(arg == "--flip") {
      transformArgs.push({
        type: 'flip',
      });
      i = i + 1
    }
  } 
  else {
    console.error("Invalid argument!!")
    break
  }
}
var currentImage = imageData
var handleOperation  = () => {
  if(transformArgs.length == 0) {
    // processed everything
    const outputImagePath = '/Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/processedImages/output.jpg'
    fs.writeFileSync(outputImagePath, currentImage.data);
    console.log("image processed");
    return 
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
    console.log("handled resize")
    currentImage = newImageData
    handleOperation()
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
      console.log("rotate Angle handled")
      currentImage = processedImage
      handleOperation()
    });
  }
}

handleOperation();
// for(var key of transformArgs) {
//   if(key.type == "resize") {
//     const request = {
//       image: currentImage,
//       width: key["width"],
//       height: key["height"]
//     }
//     client.resize(request, function(err, response) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       const newImageData = {
//         data: response.data,
//         format: 'jpeg',
//     };
//     console.log("in resize")
//     console.log(newImageData)
//       currentImage = newImageData
//     });
//   }
//   if(key.type == "rotate") {
//     const request = {
//       image: currentImage,
//       angle: key["angle"]
//     }
//     client.rotateAnyAngle(request, function(err, response) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       const processedImage = response;
//       console.log("in rotate angle")
//       console.log(processedImage)
//       currentImage = response
//     });
//   }
// }
