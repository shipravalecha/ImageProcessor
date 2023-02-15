const sharp = require('sharp')

const resizeImage = () => {
  const resize = sharp('./images/dog2.jpeg')
  .resize(350, 260)
  .toFile(__dirname + '/processed_image/resize_dog2.jpeg')
}

resizeImage()