---
sidebar_position: 1
---

# API Routes

Every CodeGame game server must implement the following few routes. The following is also available as a [Swagger file](/openapi/game-server-openapi-v0.7.yaml).

## GET /api/info
### Description
Get information about the game server.
### Responses
#### 200
**Content-Type:** `application/json`

**Schema:**

```yaml
type: object
required:
  - name
  - cg_version
properties:
  name:
    description: The name of the game.
    type: string
  cg_version:
    description:
      The version of the CodeGame protocol spec that the
      server uses.
    type: string
  display_name:
    description: Pretty version of the name.
    type: string
  description:
    description: A short description of the game.
    type: string
  version:
    description: The game's version.
    type: string
  repository_url:
    description: The URL to the server's source code.
    type: string
```

## GET /api/events
### Description
Get the CGE file for the server.
### Responses
#### 200
**Content-Type:** `text/plain`

## GET /api/debug
### Description
Upgrade to a WebSocket connection that receives debug information about the server.
### Responses
#### 101
**Description:** Switch to WebSocket Protocol.

## GET /api/games
### Description
Get the number of private games and a map of public games.
### Responses
#### 200
**Content-Type:** `application/json`

```yaml
type: object
required:
  - private
  - public
properties:
  private:
    description: The number of private games.
    type: number
  public:
    description: A list of public games.
    type: array
    items:
      type: object
      required:
        - id
        - players
      properties:
        id:
          description: The game ID.
          type: string
        players:
          description: The number of players in the game.
          type: number
```

## POST /api/games
### Description
Create a new game.
### Request
**Content-Type:** `application/json`

**Schema:**

```yaml
type: object
properties:
  public:
    description: Whether the game should be listed publicly
    type: boolean
  protected:
    description: Whether the game should be protected by a join secret.
    type: boolean
  config:
    description: The configuration options to be used. (schema is game specific)
    type: object
    additionalProperties: true
```
### Responses
#### 201
**Description:** Created

**Schema:**

```yaml
type: object
required:
  - game_id
properties:
  game_id:
    description: The game ID.
    type: string
  join_secret:
    description: The join secret of the game. (required if protected == true)
    type: string
```
#### 403
**Description:** Unable to create a new game due to config limit.
#### 500
**Description:** Unable to create a new game due to technical limit.

## GET /api/games/{game_id}
### Description
Get the details of a given game by its ID.
### Responses
#### 200
**Content-Type:** `application/json`

**Schema:**

```yaml
type: object
required:
  - id
  - players
  - protected
properties:
  id:
    description: The game ID.
    type: string
  players:
    description: The number of players in the game.
    type: integer
  protected:
    description: Whether the game is protected by a join secret.
    type: boolean
  config:
    description: The configuration options being used.
    type: object
    additionalProperties: true
```
#### 404
**Description:** Unable to find game.

## GET /api/games/{game_id}/spectate
### Description
Upgrade to a spectator WebSocket connection.
### Responses
#### 101
**Description:** Switch to WebSocket Protocol.
#### 403
**Description:** Socket count limit reached.
#### 404
**Description:** Unable to find game.

## GET /api/games/{game_id}/debug
### Description
Upgrade to a WebSocket connection that receives debug information about a game.
### Responses
#### 101
**Description:** Switch to WebSocket Protocol.

## GET /api/games/{game_id}/players
### Description
Get the players in a game.
### Responses
#### 200
**Content-Type:** application/json

**Schema:**

```yaml
type: object
required:
  - players
properties:
  players:
    description: The IDs of all players mapped to their usernames.
    type: object
    additionalProperties: true
```
#### 404
**Description:** Unable to find game.

### POST /api/games/{game_id}/players
#### Description
Create a new player.
### Request
**Content-Type:** application/json

**Schema:**

```yaml
type: object
required:
  - username
properties:
  username:
    description: The username to give to the new player.
    type: string
  join_secret:
    description: The join secret of the game (if it's protected).
    type: string
```
### Responses
#### 201
**Content-Type:** application/json

**Schema:**

```yaml
type: object
required:
  - player_id
  - secret
properties:
  player_id:
    description: The player ID.
    type: string
  player_secret:
    description: The secret required to connect to and debug the player.
    type: string
```
#### 400
**Description:** Incomplete Request. The username was likely not provided.
#### 401
**Description:** Incorrect join secret provided.
#### 403
**Description:** Unable to create a new player due to config limit.
#### 404
**Description:** Unable to find game.
#### 500
**Description:** Unable to create a new player due to an unknown internal error.

## GET /api/games/{game_id}/players/{player_id}
### Description
Get the username of a player in a game.
### Responses
#### 200
**Content-Type:** application/json

**Schema:**

```yaml
type: object
required:
  - username
properties:
  username:
    description: The username of the player.
    type: string
```
#### 404
**Description:** Unable to find game or player.

## GET /api/games/{game_id}/connect
### Description
Upgrade to a WebSocket connection linked to a player.
### Parameters
| Name          | Located in | Description        | Required | Schema |
| ------------- | ---------- | ------------------ | -------- | ------ |
| player_id     | query      | The player id.     | Yes      | string |
| player_secret | query      | The player secret. | Yes      | string |

### Responses
#### 101
**Description:** Switch to WebSocket Protocol.
#### 403
**Description:** Incorrect secret or socket count limit reached.
#### 404
**Description:** Unable to find game.

## GET /api/games/{game_id}/players/{player_id}/debug
### Description
Upgrade to a WebSocket connection that receives debug information about a player.
### Parameters
| Name   | Located in | Description        | Required | Schema |
| ------ | ---------- | ------------------ | -------- | ------ |
| secret | query      | The player secret. | Yes      | string |

### Responses
#### 101
**Description:** Switch to WebSocket Protocol.
#### 403
**Description:** Incorrect secret or socket count limit reached.
#### 404
**Description:** Unable to find game.
