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

function serialize_imageprocessor_GrayScaleRequest(arg) {
  if (!(arg instanceof image_pb.GrayScaleRequest)) {
    throw new Error('Expected argument of type imageprocessor.GrayScaleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_GrayScaleRequest(buffer_arg) {
  return image_pb.GrayScaleRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_imageprocessor_ResizeRequest(arg) {
  if (!(arg instanceof image_pb.ResizeRequest)) {
    throw new Error('Expected argument of type imageprocessor.ResizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_ResizeRequest(buffer_arg) {
  return image_pb.ResizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_imageprocessor_RotateLeftRequest(arg) {
  if (!(arg instanceof image_pb.RotateLeftRequest)) {
    throw new Error('Expected argument of type imageprocessor.RotateLeftRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_RotateLeftRequest(buffer_arg) {
  return image_pb.RotateLeftRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_imageprocessor_RotateRequest(arg) {
  if (!(arg instanceof image_pb.RotateRequest)) {
    throw new Error('Expected argument of type imageprocessor.RotateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_RotateRequest(buffer_arg) {
  return image_pb.RotateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_imageprocessor_RotateRightRequest(arg) {
  if (!(arg instanceof image_pb.RotateRightRequest)) {
    throw new Error('Expected argument of type imageprocessor.RotateRightRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_RotateRightRequest(buffer_arg) {
  return image_pb.RotateRightRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_imageprocessor_ThumbnailRequest(arg) {
  if (!(arg instanceof image_pb.ThumbnailRequest)) {
    throw new Error('Expected argument of type imageprocessor.ThumbnailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_imageprocessor_ThumbnailRequest(buffer_arg) {
  return image_pb.ThumbnailRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  resize: {
    path: '/imageprocessor.ImageProcessor/resize',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.ResizeRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_ResizeRequest,
    requestDeserialize: deserialize_imageprocessor_ResizeRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
  grayscale: {
    path: '/imageprocessor.ImageProcessor/grayscale',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.GrayScaleRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_GrayScaleRequest,
    requestDeserialize: deserialize_imageprocessor_GrayScaleRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
  thumbnail: {
    path: '/imageprocessor.ImageProcessor/thumbnail',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.ThumbnailRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_ThumbnailRequest,
    requestDeserialize: deserialize_imageprocessor_ThumbnailRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
  rotateAnyAngle: {
    path: '/imageprocessor.ImageProcessor/rotateAnyAngle',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.RotateRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_RotateRequest,
    requestDeserialize: deserialize_imageprocessor_RotateRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
  rotateLeft: {
    path: '/imageprocessor.ImageProcessor/rotateLeft',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.RotateLeftRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_RotateLeftRequest,
    requestDeserialize: deserialize_imageprocessor_RotateLeftRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
  rotateRight: {
    path: '/imageprocessor.ImageProcessor/rotateRight',
    requestStream: false,
    responseStream: false,
    requestType: image_pb.RotateRightRequest,
    responseType: image_pb.Image,
    requestSerialize: serialize_imageprocessor_RotateRightRequest,
    requestDeserialize: deserialize_imageprocessor_RotateRightRequest,
    responseSerialize: serialize_imageprocessor_Image,
    responseDeserialize: deserialize_imageprocessor_Image,
  },
};

exports.ImageProcessorClient = grpc.makeGenericClientConstructor(ImageProcessorService);
