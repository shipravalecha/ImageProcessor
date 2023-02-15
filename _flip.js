const sharp = require('sharp')
const flipImage = async () => {
  await sharp('./images/dog3.jpeg')
  .flip()
  .toFile(__dirname + '/processed_image/flip_dog3.jpeg');
}
flipImage()