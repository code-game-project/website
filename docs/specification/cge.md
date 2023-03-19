---
sidebar_position: 3
---

# CodeGame Events Language

At its base CodeGame is a language agnostic protocol. But every game needs to create its own types for commands, events and other data.
These types somehow need to be represented in the programming language of the client. Providing type definitions for every officially supported programming language for
every game would be a huge maintanance hurdle.

That's why CodeGame provides the *CodeGame Events Language* or *CGE* for short. It allows game developers to create one file
containing the types defined by the game instead of one for every supported language.
[cg-gen-events](https://github.com/code-game-project/cg-gen-events) takes these *CGE* files as input and generates type definitions for every supported programming language.

## The language

*CGE* files always end with the `.cge` file extension.

Every *CGE* file must begin with these two meta fields. They specify the name of the game and the *CGE* version to use:

```cge
name my_game
version 0.5
```

Every identifier in *CGE* (game name, event and command names, types names, property names, …) must be written in lower *snake_case*. Capital letters are not allowed.
Identifiers are only allowed to consist of a small set of characters: `a`-`z`,`0`-`9`,`_`. The first character must not be a digit.

### Commands and events

To define new commands or events use the `command` or `event` keywords respectively:

```cge
// defines a new command
command my_command {
  // properties
}

// defines a new event
event my_event {
  // properties
}
```

### Properties

Definitions can (and most of the time will) include properties. They will be generated as fields of a struct or class.
Properties are separated by a comma and always have to specify their type:

```
... {
  <property-name>: <type>,
  <property-name>: <type>
}
```

Examples:

```cge
command move {
  delta_x: number,
  delta_y: number
}

event player_killed {
  name: string,
  time: number
}
```

#### Available types

You can use the following primitive types:

| Name | Description |
| ---- | ----------- |
| `string` | string of UTF-8 compatible characters |
| `bool` | boolean |
| `int` / `int32` | 32-bit signed integer |
| `int64` | 64-bit signed integer |
| `float32` | 32-bit signed floating point number |
| `float` / `float64` | 64-bit signed floating point number |

Lists and maps are also available:

| Name | Description |
| ---- | ----------- |
| `map<generic>` | a map mapping keys of type `string` to values of type `generic` |
| `list<generic>` | a list of values of type `generic` |

*generic* can be replaced by any other type including another `map` or `list`, e.g. `map<list<string>>` (a map of lists of strings).

### Custom types

To represent more complex data *CGE* allows you to define your own types similar to structs or objects in other languages:

```cge
type my_type {
  // properties
}
```

`my_type` can now be used everywhere where a type is expected, e.g.:

```cge
event my_event {
  some_property: list<my_type>
}
```

Definition order does not matter. You can reference a type before its definition.

Sometimes you only need a type in one specific place. To make your *CGE* file more readable you can define it directly where you need it. The previous example could be rewritten as:

```cge
event my_event {
  some_property: list<type my_type {
    // properties
  }>
}
```

:::caution Important
This inline definition syntax does not change scope in any way. Semantically there is no difference between the two previously mentioned examples.
Nothing is stopping you from doing the following:

```cge
event my_event {
  some_property: list<type my_type {
    // properties
  }>
}

type some_type {
  // note: `my_type` can still be used here even though it was defined using the inline syntax
  some_property: my_type
}
```
:::

#### Enums

Sometimes some properties need to contain one of a finite amount of possible values like a property storing the current weekday. This can easily be achieved using *enums*:

```cge
enum day {
  monday, tuesday, wednesday, thursday, friday, saturday, sunday
}

event my_event {
  // a string, which can only take the values of 'monday', 'tuesday', …, 'saturday', 'sunday'
  current_day: day
}
```

### Config

On creation every CodeGame game can accept a config object, which may contain some properties that alter some aspects of the game. The structure of these objects can be defined using the `config` keyword:

```cge
config {
  // properties
}
```

A CGE file must only contain *one* config definition.

### Comments

All comments in *CGE* are doc comments. Therefore comments are only allowed above `config`, `command`, `event`, `type`, `enum` or propertiy definitions and above the name meta field.
They can be written as line comments (`// ...`) or block comments (`/* ... */`).

Example:
```cge
/*
mulit-line block comment
describing the game
*/
name my_game
version 0.5

// line comment documenting `my_command`
command my_command {}

// line comment documenting `my_event`
event my_event {
  /* block comment documenting `some_property` */
  some_property: string
}

/* block comment documenting `my_enum` */
enum my_enum {
  // line comment documenting `monday`
  monday,
  tuesday,
  wednesday
}

// this comment is not allowed and will raise a compile time error because it does not document anything
```

## Editor support

We provide extensions for [VS Code](https://github.com/code-game-project/vscode-codegame) and [Vim](https://github.com/code-game-project/vim-codegame).

## Example CGE file of [Connect 4](https://github.com/code-game-project/connect-four) v0.2

```cge
name connect_four
version 0.4

config {
	// The width of the game grid. min = 3, default = 7
	width: int,
	// The height of the game grid. min = 3, default = 6
	height: int,
	// The number of discs, which form a winning line. min = 2, default = 4
	win_length: int,
	// The rule variation to use. default: original
	variation: variation
}

// The `drop_disc` command can be sent to drop a disc into the game grid. Only allowed when it is the current player's turn.
command drop_disc {
	// 0 <= column < config.width
	column: int
}

// The `pop_out` command can be sent to remove a disc of your color from the bottom of the grid. Only available if config.variation = pop_out.
command pop_out {
	// 0 <= column < config.width
	column: int
}

// The `start` event is sent to all players when the game begins.
event start {
	// A map of player IDs mapped to their respective disc colors.
	colors: map<color>
}

// The game grid.
event grid {
	// The cells of the grid as columns (left to right) inside of rows (top to bottom).
	cells: list<list<cell>>
}

// The 'invalid_action' event notifies the player that their action was not allowed.
event invalid_action {
	// The message containing details on what the player did wrong.
	message: string
}

// The `turn` event is sent to all players when it is the next player's turn.
event turn {
	// The sign of the player whose turn it is now.
	color: color
}

event game_over {
	// The color of the winner.
	winner_color: color,
	// The four cells which form a line.
	winning_line: list<cell>
}

// A cell on the game grid.
type cell {
	row: int,
	column: int,
	color: color
}

// A disc color.
enum color {
	// No color. Used for empty cells.
	none,
	// A drops the first disc.
	a,
	// B drops the second disc.
	b
}

enum variation {
	// The original Connect 4 game.
	original,
	// Instead of dropping a disc into a grid a player may choose to remove a disc of their own color from the bottom.
	pop_out
}
```
