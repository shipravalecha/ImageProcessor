const sharp = require('sharp')

const convertTograyscale = () => {
  sharp('./images/dog1.jpeg')
  .grayscale()
  .toFile(__dirname + '/processed_image/grayscale_dog1.jpeg')
}

convertTograyscale()