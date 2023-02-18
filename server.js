const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const sharp = require('sharp');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('image.proto');
const imageprocessor = grpc.loadPackageDefinition(packageDefinition).imageprocessor;
const server = new grpc.Server();

const outputImagePath = '/Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/processedImages/output.jpg'

const imagePath = process.argv[2];
const operations = process.argv.slice(3);

const imageData = {
  data: fs.readFileSync(imagePath),
  format: 'jpeg',
};

sharp(imageData.data)
.resize({
  width: operations.includes('resize') ? 100 : null,
  height: operations.includes('resize') ? 100 : null
})
.rotate(operations.includes('rotateLeft') ? +90 : 0)
.toBuffer(function(err, data) {
  if (err) {
    console.error(err);
    callback(err, null);
    return;
  }
  const processedImage = {
    data: data,
    format: imageData.format,
  };
  const response = {
    resultImage: processedImage,
  };
  const outputImage = response.resultImage.data;
  console.log("response");
  fs.writeFileSync(outputImagePath, outputImage);
});

console.log("done");