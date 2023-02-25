module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Image Processing API",
    "version": "0.1.0",
    "description": "API for processing images using gRPC."
  },
  "basePath": "/",
  "schemes": [
    "https"
  ],
  "consumes": [
    "application/grpc"
  ],
  "produces": [
    "application/grpc"
  ],
  "paths": {
    "/imageprocessor.ImageProcessor/resize": {
      "post": {
        "tags": [
          "Image Processing"
        ],
        "summary": "Resize an image.",
        "description": "Resize an image to a specified width and height.",
        "operationId": "resizeImage",
        "consumes": [
          "application/grpc"
        ],
        "produces": [
          "application/grpc"
        ],
        "parameters": [
          {
            "name": "request",
            "in": "body",
            "description": "Resize request message.",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ResizeRequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Image resized successfully.",
            "schema": {
              "$ref": "#/definitions/ResizeResponse"
            }
          },
          "400": {
            "description": "Invalid request format."
          },
          "404": {
            "description": "Image not found."
          },
          "500": {
            "description": "Internal server error."
          }
        }
      }
    },
    "/imageprocessor.ImageProcessor/rotateAnyAngle": {
      "post": {
        "tags": [
          "Image Processing"
        ],
        "summary": "Rotate an image.",
        "description": "Rotate an image by a specified angle.",
        "operationId": "rotateImage",
        "consumes": [
          "application/grpc"
        ],
        "produces": [
          "application/grpc"
        ],
        "parameters": [
          {
            "name": "request",
            "in": "body",
            "description": "Rotate request message.",
            "required": true,
            "schema": {
              "$ref": "#/definitions/RotateRequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Image rotated successfully.",
            "schema": {
              "$ref": "#/definitions/RotateResponse"
            }
          },
          "400": {
            "description": "Invalid request format."
          },
          "404": {
            "description": "Image not found."
          },
          "500": {
            "description": "Internal server error."
          }
        }
      }
    }
  }
}