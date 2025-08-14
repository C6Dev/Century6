# Render System

The Render system in C6GE provides functionality for rendering 3D objects and scenes. It's implemented in the [`Render.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Render.h) and [`Render.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Render.cpp) files.

## Overview

The Render system is contained within the `C6GE` namespace and provides:

- Initialization of the rendering context
- Screen clearing and buffer swapping
- Object rendering with support for various components
- Stencil buffer support for effects like outlines

## Key Functions

### `InitRender()`

Initializes the rendering system, setting up OpenGL and configuring default rendering states. Returns `true` on success or `false` on failure.

```cpp
if (!C6GE::InitRender()) {
    // Handle initialization failure
}
```

### `Clear(float r, float g, float b, float a)`

Clears the screen with the specified color (RGBA values from 0.0 to 1.0).

```cpp
// Clear the screen with teal color
C6GE::Clear(0.0f, 0.8f, 0.8f, 1.0f);
```

### `Present()`

Presents the rendered frame to the window by swapping the back and front buffers.

```cpp
// After rendering all objects
C6GE::Present();
```

### `RenderObject(const std::string& name, bool useStencil = false, bool isOutlinePass = false)`

Renders an object with the given name, using its associated components (shader, mesh, texture, transform, etc.).

```cpp
// Render an object
C6GE::RenderObject("player");

// Render an object with outline effect
C6GE::RenderObject("selected_object", true, false); // First pass (fill stencil)
C6GE::RenderObject("selected_object", true, true);  // Second pass (outline)
```

## Implementation Details

The Render system uses OpenGL for rendering and integrates with the component system to access:

- `ShaderComponent` for material properties and shader programs
- `MeshComponent` for geometry data
- `TextureComponent` for surface textures
- `TransformComponent` for object positioning

The system enables depth testing, stencil testing, and face culling by default for proper 3D rendering.

## Integration with Engine

The Render system is initialized in `Engine::Init()` and used in `Engine::Update()` to render the scene each frame. It works closely with the Window system for context management and buffer swapping.

## Shader and Texture Management

The Render system works with the Shader and Texture subsystems (located in the `Shader/` and `Texture/` directories) to manage shader programs and texture resources. These subsystems provide:

- Shader loading, compilation, and linking
- Texture loading and configuration
- Uniform setting for shader parameters

## Assets

The Render system includes a collection of default assets in the `Assets/` directory:

- Shader programs (vertex and fragment shaders)
- Texture files
- 3D models

These assets can be used as a starting point for new projects or as examples for creating custom assets.