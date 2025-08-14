# Window System

The Window system in C6GE provides functionality for creating and managing the application window. It's implemented in the [`Window.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Window/Window.h) and [`Window.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Window/Window.cpp) files.

## Overview

The Window system is contained within the `C6GE` namespace and provides:

- Window creation and destruction
- Window state management
- Projection matrix management for 3D rendering

## Key Functions

### Window Management

- `CreateWindow(int width, int height, const char* title)`: Creates a new window with the specified dimensions and title. Returns `true` on success or `false` on failure.
- `UpdateWindow()`: Updates the window, processing events and swapping buffers.
- `IsWindowOpen()`: Returns `true` if the window is open, `false` otherwise.
- `DestroyWindow()`: Destroys the window and cleans up resources.
- `GetWindow()`: Returns a pointer to the underlying GLFW window.

### Projection Settings

The Window system also manages the projection settings for 3D rendering:

- `GetFOV()` / `SetFOV(float newFOV)`: Get/set the field of view (in degrees).
- `GetNearPlane()` / `SetNearPlane(float newNear)`: Get/set the near clipping plane distance.
- `GetFarPlane()` / `SetFarPlane(float newFar)`: Get/set the far clipping plane distance.
- `GetProjectionMatrix()`: Returns the current projection matrix based on the FOV, near/far planes, and window dimensions.

## Implementation Details

The Window system uses GLFW for the underlying window management. It initializes GLFW and creates a window with an OpenGL 3.3 context.

The system maintains global state for:
- The GLFW window pointer
- Field of view (default: 60.0 degrees)
- Near clipping plane (default: 0.3 units)
- Far clipping plane (default: 100.0 units)
- The projection matrix

## Integration with Engine

The Window system is initialized in `Engine::Init()` and updated in `Engine::Update()`. It provides the rendering context for the Render system and the input source for the Input system.

## Platform-Specific Considerations

The Window system includes special handling for Windows platforms to avoid naming conflicts with Windows API macros:

```cpp
#ifdef _WIN32
#undef CreateWindow
#undef GetWindow
#endif
```

This ensures that the C6GE functions don't conflict with similarly named Windows API functions.