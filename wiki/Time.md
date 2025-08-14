# Time System

The Time system in C6GE provides functionality for tracking time and calculating frame deltas. It's implemented in the [`DeltaTime.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Time/DeltaTime.h) file.

## Overview

The Time system is contained within the `C6GE` namespace and provides:

- Delta time calculation for frame-rate independent movement and animations
- Access to the current application time

## Key Functions

The system is implemented as a static class `DeltaTime` with two main functions:

### `deltaTime()`

Calculates and returns the time elapsed since the last call to this function. This is particularly useful for frame-rate independent movement and animations.

```cpp
double dt = C6GE::DeltaTime::deltaTime();
// Move an object based on delta time
position += velocity * dt;
```

### `GetTime()`

Returns the current time in seconds since the application started.

```cpp
double currentTime = C6GE::DeltaTime::GetTime();
// Use current time for timing events
if (currentTime > nextEventTime) {
    // Trigger event
}
```

## Implementation Details

The Time system uses GLFW's `glfwGetTime()` function to access the high-resolution timer. The `deltaTime()` function maintains a static variable to track the last time it was called, allowing it to calculate the elapsed time between calls.

## Integration with Engine

The Time system is typically used in the game loop to:

- Update physics and movement at a consistent rate regardless of frame rate
- Animate objects smoothly
- Time events and triggers
- Measure performance

By using delta time for movement and animations, the game will run at the same speed regardless of the frame rate, ensuring consistent gameplay across different hardware.