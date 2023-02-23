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

I use RPC style for this application, wherein client makes request for the specific operation and that operation is implemented on the server. I use gRPC, it is a open source google RPC framework used to implement RPC calls and fit well with node.js.

For example, below is the code implementation on client and server side for resize operation using sharp node module:

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

Below are the files that are part of the application:

1. Image.proto: This file contains the format of RPC functions, the input and output of the functions. It represents the structure of the data. To compile the .proto file, protoc compiler is used that generates the code to read and write the data. It is similar to .json file that represents the structure of the data. After compiling the file, image_pb.js and image_grpc_pb.js files are generated.
2. Client.js: This is the intermediate layer between the client, who makes the requestand the server, that has all image transformation operations defined. Client.js file is implemented to create a proxy layer between the client and the server. Also, client instead of contacting the server directly, it requests the server via proxy layer.
3. Server.js: It has the definitions of all the image transformation operations like flip, resize, grayscale etc.
4. /images: It stores the input images and input request can be given to the server using the image from this directory.
5. /processed_image: It stores the output images after the transformation.

Below are the commands to run the application:

1. To compile .proto file: grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=./ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` image.proto

2. To start the server: node server.js
It will start the server and the server will be ready to listen to the client requests. It will keep on listening to the requests until the server is stopped.

3. To give input request: node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --resize 100 100
It has the input image path from the local directory and operations to be performed on the image.

Sample calls:

node client.js
node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg 
-- it gives error

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --thumbnail --thumbnail
-- it gives error because more than one thumbnail operation is provided by the client.

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --rotateLeft rotate
-- it gives error as Invalid argument!!! Provide argument with that starts with --

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --grayscale --thumbnail

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --grayscale --flip

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --resize 100 100 --rotateRight

node client.js /Users/shipravalecha/Desktop/SeattleUniversity/SoftwareArch/images/dog1.jpeg --rotateLeft --rotateRight

