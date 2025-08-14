# Engine (`Engine.cpp`)

The [`Engine.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Engine/Engine.cpp) file implements the core lifecycle of the C6GE engine. It contains three main functions within the `C6GE` namespace:

---

## `Init()`

Initializes the engine:

- Creates a window using `CreateWindow(...)` (from the `Window` module)
- Initializes the rendering system using `InitRender()` (from the `Render` module)
- Sets up input handling with `input::EnableMouseCapture(true)`
- Creates a default camera object
- Loads and compiles shaders for rendering
- Returns `true` on success or `false` on failure

---

## `Update()`

Runs the main engine loop:

- Continuously updates the window while it's open (`IsWindowOpen()`)
- Processes input events
- Updates game objects and components
- Renders the scene using the component system
- Presents the frame with `Present()`

---

## `Shutdown()`

Cleans up engine resources:

- Destroys the window via `DestroyWindow()`
- Releases any allocated resources

***

‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 

# Engine (`Engine.h`)

The [`Engine.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Engine/Engine.h) file defines the public API for the C6GE engine lifecycle.

---

## Purpose

This header exposes the core functions needed to run the engine:

- `Init()` – Initializes core systems like the window and renderer.
- `Update()` – Runs the main loop, processes events, and renders frames.
- `Shutdown()` – Cleans up and shuts down the engine properly.

---

## Design Notes

- All functions are declared inside the `C6GE` namespace.
- Uses `#pragma once` to prevent multiple inclusions.

---
