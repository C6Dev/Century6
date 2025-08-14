# Main Entry Point

The [Main.cpp](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Main.cpp) file serves as the entry point for the C6GE engine.

## Purpose

This file is responsible for:

- Initializing the C6GE engine using `C6GE::Init()`
- Running the main update loop with `C6GE::Update()`
- Shutting down the engine when the application exits via `C6GE::Shutdown()`
- Handling any high-level application flow

## Integration with Engine

The Main.cpp file provides a clean separation between the application entry point and the engine's internal workings. This separation allows the engine to be used in different applications without modifying its core functionality.

## Error Handling

The Main entry point also handles initialization errors by checking the return value of `C6GE::Init()` and exiting gracefully if initialization fails.