# Logging System

The Logging system in C6GE provides a simple interface for logging messages at different severity levels. It's implemented in the [`Log.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Logging/Log.h) and [`Log.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/Logging/Log.cpp) files.

## Overview

The Logging system is contained within the `C6GE` namespace and provides:

- Multiple log levels for different message severities
- Thread-safe logging with mutex protection
- Colored console output for better readability
- Timestamp formatting for each log message

## Log Levels

The system defines six log levels in the `LogLevel` enum:

```cpp
enum class LogLevel {
    trace,    // Blue - Detailed tracing information
    debug,    // Default - Debug-level messages
    info,     // Gray - Informational messages
    warning,  // Yellow - Warning conditions
    error,    // Red - Error conditions
    critical  // Bright Red - Critical conditions
};
```

Each log level is associated with a different color in the console output for easy visual identification.

## Usage

The system provides a single `Log()` function that takes a log level and a message:

```cpp
// Log an informational message
C6GE::Log(C6GE::LogLevel::info, "Game initialized successfully");

// Log a warning
C6GE::Log(C6GE::LogLevel::warning, "Resource not found, using default");

// Log an error
C6GE::Log(C6GE::LogLevel::error, "Failed to load texture");
```

## Implementation Details

The Logging system uses:

- A mutex to ensure thread safety when multiple threads log simultaneously
- ANSI color codes for terminal output coloring
- Platform-specific code for getting timestamps and executable paths
- Cross-platform handling for different operating systems (Windows, macOS, Linux)

Log messages are formatted with:
- A timestamp (YYYY-MM-DD HH:MM:SS)
- The log level in uppercase (e.g., "INFO", "WARNING")
- The message text

## Integration with Engine

The Logging system is used throughout the engine to report status, warnings, and errors. It's particularly important during:

- Engine initialization to report success or failure
- Resource loading to report missing or invalid resources
- Runtime errors that might affect gameplay

The system is designed to be simple to use while providing enough information for debugging and monitoring.