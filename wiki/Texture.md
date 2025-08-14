# Texture System

The Texture system in C6GE provides functionality for loading and creating textures for rendering. It's implemented in the [`Texture.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Texture/Texture.h) and [`Texture.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Texture/Texture.cpp) files.

## Overview

The Texture system is contained within the `C6GE` namespace and provides:

- Texture loading from image files
- OpenGL texture creation and configuration
- Support for different image formats and channel counts

## Key Functions

### `LoadTexture(const std::string& path, int& widthImg, int& heightImg, int& numColCh)`

Loads an image file and returns the raw pixel data along with image dimensions and channel count.

```cpp
// Load a texture image
int width, height, channels;
unsigned char* imageData = C6GE::LoadTexture("textures/wood.png", width, height, channels);
```

### `CreateTexture(unsigned char* data, int width, int height, int channels)`

Creates an OpenGL texture from raw pixel data and returns the texture ID.

```cpp
// Create a texture from loaded image data
GLuint textureID = C6GE::CreateTexture(imageData, width, height, channels);
```

## Implementation Details

The Texture system uses the [stb_image](https://github.com/nothings/stb) library for image loading. It supports:

- Common image formats (PNG, JPEG, BMP, etc.)
- Different channel counts (grayscale, RGB, RGBA)
- Automatic mipmap generation
- Configurable texture filtering and wrapping

The system automatically determines the appropriate OpenGL format based on the number of channels in the image:
- 1 channel: GL_RED (grayscale)
- 3 channels: GL_RGB (color without alpha)
- 4 channels: GL_RGBA (color with alpha)

## Integration with Engine

The Texture system is used by the Render system to:

- Load textures for materials
- Create texture components for objects
- Bind textures during rendering

The system is designed to work with the `TextureComponent` to associate textures with specific objects in the scene.

## Usage Example

```cpp
// Load and create a texture
int width, height, channels;
unsigned char* imageData = C6GE::LoadTexture("textures/wood.png", width, height, channels);
GLuint textureID = C6GE::CreateTexture(imageData, width, height, channels);

// Create an object with the texture
C6GE::CreateObject("textured_cube");
C6GE::AddComponent<C6GE::MeshComponent>("textured_cube", C6GE::CreateCube());
C6GE::AddComponent<C6GE::TextureComponent>("textured_cube", textureID);
```