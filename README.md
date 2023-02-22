# ImageProcessor

ImageProcessor is the application that will transform the input image by applying different operations/services and return the formatted output image.
This application is responsible for following operations:

Flip horizontal and vertical
Rotate +/- n degrees
Convert to grayscale
Resize
Generate a thumbnail
Rotate left
Rotate right
 
The user will upload the image or input the image to the Image processor application via client interface. Along with the image, a user will also specify the operation/ combination of operations he wants the application to apply on the input image and output the resulting image to the user. So the application is responsible to take the input image and return the processed image to the user.

I use RPC style for this application, wherein client makes request for the specific operation and that operation is implemented on the server. For example, below is the code implementation on client and server side for resize operation using sharp node module:

Client implementation:

client.resize(request, function(error, response) {
  if (error) {
    // do something
  } else {
    // do something
  }
});

The request object can have the input image or any parameters/ arguments client has to send to the server.

Server implementation:

function imageProcess(call, callback) {
  sharp(call.request.image)
    .resize(500)
    .then(processedImage => {
      callback();
    })
    .catch(error);
}





