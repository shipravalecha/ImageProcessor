const sharp = require('sharp');

const rotateImage = () => {
  sharp('./images/dog1.jpeg')
  .rotate(90)
  .toFile(__dirname + '/processed_image/rotate_dog1.jpeg')
}

rotateImage()