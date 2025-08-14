# Input System

The Input system in C6GE provides a simple interface for handling keyboard and mouse input. It's implemented in the [`Input.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Input/Input.h) and [`Input.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Input/Input.cpp) files.

## Overview

The Input system is contained within the `input` namespace and provides:

- Keyboard state tracking
- Mouse position and button tracking
- Mouse capture functionality

## Key Components

### Keyboard Structure

The `Keyboard` structure contains boolean fields for every key on a standard keyboard. Each field represents whether a key is currently pressed (true) or not (false).

```cpp
struct Keyboard {
    bool space;
    bool a;
    bool b;
    // ... other keys
};
```

### Mouse Structure

The `Mouse` structure tracks:

- Current X and Y position
- Previous X and Y position (for calculating deltas)
- Button states (left, right, middle)

## Usage

### Accessing Input State

The system provides global `key` and `mouse` objects that can be accessed directly:

```cpp
// Check if the W key is pressed
if (input::key.w) {
    // Move forward
}

// Check mouse position
float mouseX = input::mouse.x;
float mouseY = input::mouse.y;
```

### Mouse Capture

The system provides functions to enable or disable mouse capture, which is useful for camera control in 3D applications:

```cpp
// Enable mouse capture (hides cursor and locks it to window center)
input::EnableMouseCapture(true);

// Disable mouse capture (shows cursor and allows it to move freely)
input::EnableMouseCapture(false);
```

## Implementation Details

The Input system uses GLFW for the underlying input handling. The `Update()` function is called each frame to poll the current state of all keys and mouse buttons, updating the global state objects.

Mouse movement is tracked by calculating the delta between the current and previous positions, which is particularly useful for camera control in 3D applications.

## Integration with Engine

The Input system is typically updated as part of the main engine loop in `Engine::Update()`. It requires a valid GLFW window to function, which it obtains through the `C6GE::GetWindow()` function.