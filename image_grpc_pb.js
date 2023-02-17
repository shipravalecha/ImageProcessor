// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var image_pb = require('./image_pb.js');

function serialize_imageprocessor_FlipRequest(arg) {
  if (!(arg instanceof image_pb.FlipRequest)) {
    throw new Error('Expected argument of type imageprocessor.FlipRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_FlipRequest(buffer_arg) {
  return image_pb.FlipRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_imageprocessor_Image(arg) {
  if (!(arg instanceof image_pb.Image)) {
    throw new Error('Expected argument of type imageprocessor.Image');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_Image(buffer_arg) {
  return image_pb.Image.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImageProcessorService = exports.ImageProcessorService = {
  flip: {
    path: '/imageprocessor.ImageProcessor/flip',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.FlipRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_FlipRequest,
    requestDeserialize: deserialize_imageprocessor_FlipRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
};

exports.ImageProcessorClient = grpc.makeGenericClientConstructor(ImageProcessorService);
