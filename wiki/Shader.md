# Shader System

The Shader system in C6GE provides functionality for loading, compiling, and using GLSL shaders. It's implemented in the [`Shader.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Shader/Shader.h) and [`Shader.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Render/Shader/Shader.cpp) files.

## Overview

The Shader system is contained within the `C6GE` namespace and provides:

- Shader loading from files
- Shader compilation and program linking
- Uniform setting for shader parameters
- Cross-platform path handling

## Key Functions

### `LoadShader(const std::string& path)`

Loads a shader file and returns its contents as a const char*. Handles both absolute and relative paths.

```cpp
// Load a vertex shader
const char* vertexShaderSource = C6GE::LoadShader("Assets/shader.vert");
```

### `CompileShader(const char* Shader, ShaderType ShaderType)`

Compiles a shader source and returns the shader object ID. The ShaderType can be either Vertex or Fragment.

```cpp
// Compile a vertex shader
GLuint vertexShader = C6GE::CompileShader(vertexShaderSource, ShaderType::Vertex);
```

### `CreateProgram(GLuint VertexShader, GLuint FragmentShader)`

Links a vertex shader and a fragment shader into a shader program and returns the program ID.

```cpp
// Create a shader program
GLuint shaderProgram = C6GE::CreateProgram(vertexShader, fragmentShader);
```

### `UseProgram(GLuint Program)`

Activates a shader program for rendering.

```cpp
// Use a shader program
C6GE::UseProgram(shaderProgram);
```

### Uniform Setting Functions

The system provides functions for setting various types of uniform values in shaders:

```cpp
// Set a vec3 uniform
C6GE::SetShaderUniformVec3(shaderProgram, "lightColor", glm::vec3(1.0f, 1.0f, 1.0f));

// Set a float uniform
C6GE::SetShaderUniformFloat(shaderProgram, "ambientStrength", 0.1f);

// Set an int uniform
C6GE::SetShaderUniformInt(shaderProgram, "texture1", 0);
```

## Implementation Details

The Shader system uses OpenGL for shader compilation and linking. It includes:

- Cross-platform code for finding the executable directory
- Error checking and logging for shader compilation and linking
- Uniform location caching for better performance

## Integration with Engine

The Shader system is used by the Render system to:

- Load and compile shaders during engine initialization
- Create shader programs for different rendering techniques
- Set uniform values for lighting, transformations, and material properties

The system is designed to work with the `ShaderComponent` to associate shader programs with specific objects in the scene.