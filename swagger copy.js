module.exports = {
    "openapi": "3.0.0",
    "info": {
      "title": "Image Processor",
      "description": "A simple image processor API",
      "version": "0.1.0"
    },
    "paths": {
      "/upload": {
        "post": {
          "description": "Returns a transformed image",
          "parameters": [
            {
              "in": "formData",
              "name": "image",
              "type": "file",
              "required": true,
              "description": "Input image"
            },
            {
              "in": "path",
              "name": "flip horizontal",
              "type": "file",
              "description": "Input image is flipped horizontally"
            },
            {
              "in": "path",
              "name": "flip vertical",
              "type": "file",
              "description": "Input image is flipped vertically"
            },
            {
              "in": "rotate",
              "name": "rotate right",
              "type": "file",
              "description": "Input image is rotated in right direction"
            },
            {
              "in": "rotate",
              "name": "rotate left",
              "type": "file",
              "description": "Input image is rotated in left direction"
            },
            {
              "in": "grayscale",
              "name": "grayscale",
              "type": "file",
              "description": "Input image is converted to grayscale"
            },
            {
              "in": "thumbnail",
              "name": "thumbnail",
              "type": "file",
              "description": "Thumbnail is generated from the input image"
            },
            {
              "in": "resize",
              "name": "resize",
              "type": "file",
              "description": "Input image is resized"
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "type": "string"
              }
            },
            "400": {
              "description": "Some parameters missing",
              "schema": {
                "type": "string"
              }
            },
            "500": {
              "description": "Some server failure",
              "schema": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }