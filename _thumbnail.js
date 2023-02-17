const sharp = require('sharp');

const thumbnailImage = () => {
  sharp('./images/dog1.jpeg')
  .resize(300,300)
  .toFile(__dirname + '/processed_image/thumbnail.jpeg')
}

thumbnailImage()