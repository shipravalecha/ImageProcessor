const fs = require('fs');

if (process.argv.length < 4) {
    console.error('Usage: node server.js <image_path> <transform_operation> [transform_params]');
    process.exit(1);
}

const args = process.argv.slice(2);
const imagePath = args[0];
const transformArgs = {};

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
      transformArgs["resize"] = [width, height]
    }
    if(arg == "--rotate") {
      transformArgs["rotate"] = [args[i + 1]]
      i = i + 2
    }
    if(arg == "--flip") {
      transformArgs["flip"] = []
      i = i + 1
    }
  } 
  else {
    console.error("Invalid argument!!")
    break
  }
}

console.log("args list");
console.log(transformArgs);

console.log("imageData");
console.log(imageData);

performOperation(imageData, transformArgs);