# Components System

The C6GE engine uses an Entity-Component-System (ECS) architecture powered by the EnTT library. This document outlines the key components available in the engine.

## Core Components

### MeshComponent

The [`MeshComponent`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Components/MeshComponent.h) represents a 3D mesh with OpenGL buffer objects.

**Key Features:**
- Stores OpenGL handles (VAO, VBO, EBO) for rendering
- Manages vertex count for draw calls
- Properly cleans up GPU resources on destruction
- Supports creation from ModelComponent
- Provides utility functions for creating common shapes (triangle, quad, cube, etc.)

**Usage Example:**
```cpp
// Create a new object
C6GE::CreateObject("cube");

// Add a mesh component (cube)
C6GE::AddComponent<C6GE::MeshComponent>("cube", C6GE::CreateCube());
```

### ModelComponent

The [`ModelComponent`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Components/ModelComponent.h) represents a 3D model loaded from a file.

**Key Features:**
- Stores multiple meshes for complex models
- Manages textures associated with the model
- Supports loading models via Assimp library

**Usage Example:**
```cpp
// Create a new object
C6GE::CreateObject("model");

// Load and add a model component
C6GE::ModelComponent* modelPtr = C6GE::LoadModel("path/to/model.fbx");
C6GE::AddComponent<C6GE::MeshComponent>("model", modelPtr);
```

### TextureComponent

The [`TextureComponent`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Components/TextureComponent.h) represents a texture for rendering.

**Key Features:**
- Stores OpenGL texture ID
- Simple interface for texture management

**Usage Example:**
```cpp
// Create a new object
C6GE::CreateObject("textured_object");

// Add a texture component
unsigned int textureID = LoadTextureFromFile("texture.png", "textures/");
C6GE::AddComponent<C6GE::TextureComponent>("textured_object", textureID);
```

### Other Components

The engine also includes these additional components:

- **CameraComponent**: Manages camera properties and view/projection matrices
- **LightComponent**: Defines light properties for scene illumination
- **ShaderComponent**: Manages shader programs for rendering
- **TransformComponent**: Handles position, rotation, and scale
- **ScaleComponent**: Specifically manages scaling operations
- **SpecularTextureComponent**: Handles specular maps for materials

## Working with Components

Components are managed through the global EnTT registry. The engine provides helper functions to add and retrieve components:

```cpp
// Add a component to an object
C6GE::AddComponent<ComponentType>("object_name", constructor_args...);

// Get a component from an object
ComponentType* component = C6GE::GetComponent<ComponentType>("object_name");
```

## Rendering System Integration

The rendering system in C6GE works with these components to render objects. The main rendering function `RenderObject()` uses components to determine how to render each object, checking for:

- Shader components for material properties
- Mesh components for geometry
- Texture components for surface appearance
- Transform components for positioning

This component-based approach allows for flexible object composition and efficient rendering.