# Entity Component System (ECS)

The Entity Component System (ECS) in C6GE provides a flexible architecture for game object management. It's implemented in the [`Object.h`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/ECS/Object/Object.h) and [`Object.cpp`](https://github.com/C6Dev/C6GE/blob/main/C6GE/src/ECS/Object/Object.cpp) files.

## Overview

The ECS system is contained within the `C6GE` namespace and provides:

- Entity creation and management
- Component attachment and retrieval
- Name-based entity lookup

The system uses the [EnTT](https://github.com/skypjack/entt) library for the underlying ECS implementation.

## Key Components

### Global Registry

The system maintains a global registry that stores all entities and their components:

```cpp
extern entt::registry registry;
```

### Name Mapping

Entities are mapped to string names for easy lookup:

```cpp
extern std::unordered_map<std::string, entt::entity> nameToEntity;
```

## Key Functions

### `CreateObject(const std::string& name)`

Creates a new entity and associates it with the given name.

```cpp
// Create a new game object
C6GE::CreateObject("player");
```

### `GetObject(const std::string& name)`

Retrieves the entity associated with the given name.

```cpp
// Get the entity handle for an object
entt::entity playerEntity = C6GE::GetObject("player");
```

### `AddComponent<T>(const std::string& name, Args&&... args)`

Adds a component of type T to the entity with the given name.

```cpp
// Add a transform component to the player
C6GE::AddComponent<TransformComponent>("player", glm::vec3(0.0f, 0.0f, 0.0f));
```

### `GetComponent<T>(const std::string& name)`

Gets a pointer to the component of type T from the entity with the given name.

```cpp
// Get the player's transform component
TransformComponent* transform = C6GE::GetComponent<TransformComponent>("player");
```

### `GetAllObjectsWithComponent<T>()`

Gets all object names with the specified component type T.

```cpp
// Get all objects with a mesh component
std::vector<std::string> meshObjects = C6GE::GetAllObjectsWithComponent<MeshComponent>();
```

### `LogObjectInfo(entt::entity entity)`

Logs information about the specified entity, including its name if available.

```cpp
// Log information about an entity
C6GE::LogObjectInfo(playerEntity);
```

## Implementation Details

The ECS system uses EnTT for efficient component storage and retrieval. It adds a name-based lookup layer on top of EnTT's entity handles to make it easier to work with entities by name.

The system uses templates for type-safe component addition and retrieval, with runtime checks to ensure that entities exist before attempting to access them.

## Integration with Engine

The ECS system is used throughout the engine to create and manage game objects. It's particularly important for:

- Creating and managing entities in the scene
- Attaching components like transforms, meshes, and materials
- Retrieving components for rendering and updating

The component-based architecture allows for flexible object composition, where game objects can be built by combining different components as needed.