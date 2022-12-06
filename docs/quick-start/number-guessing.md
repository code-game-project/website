---
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Number Guessing

Now that we have a functioning template we can begin to create our player controller.

On this page you will learn how to send commands to the game server and how to receive and process events it sends back.

Should you get stuck at any point. Look at the [full code](#full-code) at the end of the page and try to find out what you did differently.
If your code is identical and it still doesn't work, please [open an issue](https://github.com/code-game-project/website/issues/new) on GitHub.

## The event flow

When creating a player controller for a game for the first time it is advisable to look at the events and commands
which are sent and received by the game server. To quickly get an overview of every event and command, use the `docs` command with the game URL:

```bash
codegame docs games.code-game.org/number-guessing
```

In this case it shows us that we can send the `guess` command to take a guess. As a response we will receive one of the three events `too_high`, `too_low` or `correct`.

## Creating the player controller

To keep it simple out guessing bot will begin at 50 and and increase or decrease the number by 1 depending on the response until the correct number is found.

### Sending commands

We will begin by sending a single guess command with the number 50.
To do that we will begin by modifiying the main entry point of the application:

<Tabs groupId="lang">
  <TabItem value="csharp" label="C#">

```csharp title="Program.cs"
namespace Program;

using NumberGuessing;

class Program
{
    // begin guessing at 50
    static int current = 50;

    // We create a Guess() method, which will be called every time we need to guess the next number.
    // It takes the game as a parameter to send the command.
    static void Guess(Game game)
    {
        // To send a command to the server use the game.Send... methods.
        // They take a command data object, which can be conveniently constructed by using the object initializer syntax like below.
        game.SendGuess(new GuessCmd
        {
            // set the fields of the command data object
            // send the current number
            Number = current
        });
    }

    static async Task Main(string[] args)
    {
		    // Game.FromArgs() provides the command line interface and creates a Game object depending on the given arguments.
        var game = await Game.FromArgs(args);

        // TODO: register event listeners

        // call Guess() once to send a single guess command with the number 50 to the server
        Guess(game);

        // game.Wait() blocks the main thread of the program until the socket disconnects from the server.
        game.Wait();
    }
}
```

  </TabItem>
  <TabItem value="go" label="Go">

```go title="main.go"
package main

import (
  	"log"

    "guess-client/numberguessing"
)

// We create a guess() function, which will be called every time we need to guess the next number.
// It takes the game as a parameter to send the command.
func guess(game *numberguessing.Game) {
  	// To send a command to the server use the game.Send... methods.
  	// They take a command data object to send along the command.
  	err := game.SendGuess(numberguessing.GuessCmdData{
    		// set the fields of the command data object
    		// send the current number
    		Number: current,
  	})
  	if err != nil {
    		log.Fatal(err)
  	}
}

func main() {
  	// numberguessing.Init() provides the command line interface and creates a Game object depending on the given arguments.
  	game, err := numberguessing.Init(numberguessing.GameConfig{})
  	if err != nil {
    		log.Fatal(err)
  	}

  	// TODO: register event listeners

  	// Call guess() once to send a single guess command with the number 50 to the server.
  	guess(game)

  	// game.Run() blocks the main goroutine of the program until the socket disconnects from the server and starts listening for events.
  	game.Run()
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```javascript title="src/index.js"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromArgv provides the command line interface and creates a Game object depending on the given arguments.
const { game } = await Game.fromArgv({}, Verbosity.WARNING);

var current = 50

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  })
}

// TODO: register event listeners

// Call guess() once to send a single guess command with the number 50 to the server.
guess()
```

  </TabItem>
  <TabItem value="browser" label="Browser">

```javascript title="app.js"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
const { game } = await Game.fromQuery({}, Verbosity.WARNING);

// begin guessing at 50
var current = 50;

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  });
}

// TODO: register event listeners

// Call guess() once to send a single guess command with the number 50 to the server.
guess();
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```javascript title="src/app.js"
import { Game, Verbosity } from './number-guessing/game';

(async () => {
  // Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
  const { game } = await Game.fromQuery({}, Verbosity.WARNING);

  var current = 50;

  // We create a guess() function, which will be called every time we need to guess the next number.
  function guess() {
    // To send a command to the server use the game.send... methods.
    // They take a command data object to send along the command.
    game.sendGuess({
      number: current
    });
  }

  // TODO: register event listeners

  guess();
})();
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```typescript title="src/index.ts"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromArgv provides the command line interface and creates a Game object depending on the given arguments.
const { game } = await Game.fromArgv({}, Verbosity.WARNING);

var current = 50

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  })
}

// TODO: register event listeners

// Call guess() once to send a single guess command with the number 50 to the server.
guess()
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```typescript title="src/app.ts"
import { Game, Verbosity } from './number-guessing/game';

(async () => {
  // Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
  const { game } = await Game.fromQuery({}, Verbosity.WARNING);

  var current = 50;

  // We create a guess() function, which will be called every time we need to guess the next number.
  function guess() {
    // To send a command to the server use the game.send... methods.
    // They take a command data object to send along the command.
    game.sendGuess({
      number: current
    });
  }

  // TODO: register event listeners

  guess();
})();
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>

The only thing missing now is the logic which selects the next number try depending on the response of the server.

### Listening for events

To call some block of code when an event is received from the server you can register event callbacks.

To listen for the three possible responses of _Number Guessing_, add the following code in place of the `//TODO: register event listeners` comment:

<Tabs groupId="lang">
  <TabItem value="csharp" label="C#">

Use the `game.On...` methods to register an event callback.

You need to supply a function (can be a closure like below), which takes an event data object as a parameter, that will be called
every time the callback is received.

Optionally, a second bool parameter can be supplied to only call the callback the first time the event is received after registering the
event listener.

```csharp title="Program.cs"
// [...]

// register a `correct` event listener
game.OnCorrect((data) =>
{
    // will be called every time the `correct` event is received
    // `data` contains the `Number` and `Tries` fields

    // print the solution
    Console.WriteLine(data.Number + " is correct. You needed " + data.Tries + " tries!");

    // exit the application
    Environment.Exit(0);
});

// register a `too_low` event listener
game.OnTooLow((data) =>
{
    // will be called every time the `too_low` event is received
    // `data` contains a `Number` field

    Console.WriteLine(data.Number + " is too low!");

    // try again with a larger number
    current++;
    Guess(game);
});

// register a `too_high` event listener
game.OnTooHigh((data) =>
{
    // will be called every time the `too_high` event is received
    // `data` contains a `Number` field

    Console.WriteLine(data.Number + " is too low!");

    // try again with a smaller number
    current--;
    Guess(game);
});

// [...]
```

  </TabItem>
  <TabItem value="go" label="Go">

Use the `game.On...` methods to register an event callback.

You need to supply a function (can be a closure like below), which takes an event data object as a parameter, that will be called
every time the callback is received.

Optionally, `Once` can be appended to the method name (e.g. `game.OnCorrectOnce`) to only call the callback the first time the event is
received after registering the event listener.

```go title="main.go"
// [...]

// register a `correct` event listener
game.OnCorrect(func(data numberguessing.CorrectEventData) {
    // will be called every time the `correct` event is received
    // `data` contains the `Number` and `Tries` fields

    // print the solution
    fmt.Println(data.Number, "is correct. You needed", data.Tries, "tries!")

    // exit the application
    os.Exit(0)
})

// register a `too_low` event listener
game.OnTooLow(func(data numberguessing.TooLowEventData) {
    // will be called every time the `too_low` event is received
    // `data` contains a `Number` field
    fmt.Println(data.Number, "is too low!")

    // try again with a larger number
    current++
    guess(game)
})

// register a `too_high` event listener
game.OnTooHigh(func(data numberguessing.TooHighEventData) {
    // will be called every time the `too_high` event is received
    // `data` contains a `Number` field
    fmt.Println(data.Number, "is too high!")

    // try again with a smaller number
    current--
    guess(game)
})

// [...]
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

Use the `game.on...` methods to register an event callback.

You need to supply a function (can be a closure like below), which takes an event data object as a parameter, that will be called
every time the callback is received.

Optionally, `Once` can be appended to the method name (e.g. `game.onCorrectOnce`) to only call the callback the first time the event is
received after registering the event listener.

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```javascript title="src/index.js"
// [...]

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // print the solution
  console.log(data.number + " is correct! You needed " + data.tries + " tries!");

  // exit the application
  process.exit();
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// [...]
```

  </TabItem>
  <TabItem value="browser" label="Browser">

```javascript title="app.js"
// [...]

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // show the solution
  alert(data.number + " is correct! You needed " + data.tries + " tries!");
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// [...]
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```javascript title="src/app.js"
// [...]

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // show the solution
  alert(data.number + " is correct! You needed " + data.tries + " tries!");
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// [...]
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

Use the `game.on...` methods to register an event callback.

You need to supply a function (can be a closure like below), which takes an event data object as a parameter, that will be called
every time the callback is received.

Optionally, `Once` can be appended to the method name (e.g. `game.onCorrectOnce`) to only call the callback the first time the event is
received after registering the event listener.

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```typescript title="src/index.ts"
// [...]

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // print the solution
  console.log(data.number + " is correct! You needed " + data.tries + " tries!");

  // exit the application
  process.exit();
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// [...]
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```typescript title="src/app.ts"
// [...]

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // show the solution
  alert(data.number + " is correct! You needed " + data.tries + " tries!");
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// [...]
```

  </TabItem>
</Tabs>

</TabItem>
</Tabs>

Now you should be able to run the application and watch your simple bot try to guess the correct number.

Example output:

```bash title="$ codegame run create user1"
Game ID: 2c65804a-e81e-4164-890e-c19f8dc40935
50 is too low!
51 is too low!
52 is too low!
53 is too low!
54 is too low!
55 is too low!
56 is too low!
57 is too low!
58 is too low!
59 is too low!
60 is too low!
61 is too low!
62 is too low!
63 is too low!
64 is too low!
65 is too low!
66 is too low!
67 is too low!
68 is too low!
69 is too low!
70 is correct. You needed 21 tries!
```

:::info Challenge
The bot currently needs a lot of tries to guess the correct number. Try to improve it by using the [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm).
:::

## Full code

In case you get stuck somewhere. Here is the complete code of the example program:

<Tabs groupId="lang">
  <TabItem value="csharp" label="C#">

```csharp title="Program.cs"
namespace Program;

using NumberGuessing;

class Program
{
    // begin guessing at 50
    static int current = 50;

    // We create a Guess() method, which will be called every time we need to guess the next number.
    // It takes the game as a parameter to send the command.
    static void Guess(Game game)
    {
        // To send a command to the server use the game.Send... methods.
        // They take a command data object, which can be conveniently constructed by using the object initializer syntax like below.
        game.SendGuess(new GuessCmd
        {
            // set the fields of the command data object
            Number = current
        });
    }

    static async Task Main(string[] args)
    {
        // Game.FromArgs() provides the command line interface and creates a Game object depending on the given arguments.
        var game = await Game.FromArgs(args);

        // Use the `game.On...` methods to register an event callback.
        // You need to supply a function (can be a closure like below), which takes an event data object as a parameter, that will be called
        // every time the callback is received.
        // Optionally, a second bool parameter can be supplied to only call the callback the first time the event is received after registering the
        // event listener.

        // register a `correct` event listener
        game.OnCorrect((data) =>
        {
            // will be called every time the `correct` event is received
            // `data` contains the `Number` and `Tries` fields

            // print the solution
            Console.WriteLine(data.Number + " is correct. You needed " + data.Tries + " tries!");

            // exit the application
            Environment.Exit(0);
        });

        // register a `too_low` event listener
        game.OnTooLow((data) =>
        {
            // will be called every time the `too_low` event is received
            // `data` contains a `Number` field

            Console.WriteLine(data.Number + " is too low!");

            // try again with a larger number.
            current++;
            Guess(game);
        });

        // register a `too_high_ event listener
        game.OnTooHigh((data) =>
        {
            // will be called every time the `too_high` event is received
            // `data` contains a `Number` field

            Console.WriteLine(data.Number + " is too low!");

            // try again with a smaller number.
            current--;
            Guess(game);
        });

        // call Guess() once to send a single guess command with the number 50 to the server
        Guess(game);

        // game.Wait() blocks the main thread of the program until the socket disconnects from the server
        game.Wait();
    }
}
```

  </TabItem>
  <TabItem value="go" label="Go">

```go title="main.go"
package main

import (
  	"fmt"
  	"log"
  	"os"

  	"guess-client/numberguessing"
)

// begin guessing at 50
var current = 50

// We create a guess() function, which will be called every time we need to guess the next number.
// It takes the game as a parameter to send the command.
func guess(game *numberguessing.Game) {
  	// To send a command to the server use the game.Send... methods.
  	// They take a command data object to send along the command.
  	err := game.SendGuess(numberguessing.GuessCmdData{
  		  // set the fields of the command data object
  		  // send the current number
  		  Number: current,
  	})
  	if err != nil {
  		  log.Fatal(err)
  	}
}

func main() {
  	// numberguessing.Init() provides the command line interface and creates a Game object depending on the given arguments.
  	game, err := numberguessing.Init(numberguessing.GameConfig{})
  	if err != nil {
    		log.Fatal(err)
  	}

  	// register a `correct` event listener
  	game.OnCorrect(func(data numberguessing.CorrectEventData) {
    		// will be called every time the `correct` event is received
    		// `data` contains the `Number` and `Tries` fields

    		// print the solution
    		fmt.Println(data.Number, "is correct. You needed", data.Tries, "tries!")

    		// exit the application
    		os.Exit(0)
  	})

  	// register a `too_low` event listener
  	game.OnTooLow(func(data numberguessing.TooLowEventData) {
    		// will be called every time the `too_low` event is received
    		// `data` contains a `Number` field
    		fmt.Println(data.Number, "is too low!")

    		// try again with a larger number
    		current++
    		guess(game)
  	})

  	// register a `too_high` event listener
  	game.OnTooHigh(func(data numberguessing.TooHighEventData) {
    		// will be called every time the `too_high` event is received
    		// `data` contains a `Number` field
    		fmt.Println(data.Number, "is too high!")

    		// try again with a smaller number
    		current--
    		guess(game)
  	})

  	// call guess() once to send a single guess command with the number 50 to the server
  	guess(game)

  	// game.Run() blocks the main goroutine of the program until the socket disconnects from the server and starts listening for events.
  	game.Run()
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```javascript title="src/index.js"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromArgv provides the command line interface and creates a Game object depending on the given arguments.
const { game } = await Game.fromArgv({}, Verbosity.WARNING);

var current = 50;

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  });
}

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // print the solution
  console.log(data.number + " is correct! You needed " + data.tries + " tries!");

  // exit the application
  process.exit();
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

guess();
```

  </TabItem>
  <TabItem value="browser" label="Browser">

```javascript title="app.js"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
const { game } = await Game.fromQuery({}, Verbosity.WARNING);

// begin guessing at 50
var current = 50;

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  });
}

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // show the solution
  alert(data.number + " is correct! You needed " + data.tries + " tries!");
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

// Call guess() once to send a single guess command with the number 50 to the server.
guess();
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```javascript title="src/app.js"
import { Game, Verbosity } from './number-guessing/game';

(async () => {
  // Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
  const { game } = await Game.fromQuery({}, Verbosity.WARNING);

  var current = 50;

  // We create a guess() function, which will be called every time we need to guess the next number.
  function guess() {
    // To send a command to the server use the game.send... methods.
    // They take a command data object to send along the command.
    game.sendGuess({
      number: current
    });
  }

  // register a `correct` event listener
  game.onCorrect((data) => {
    // will be called every time the `correct` event is received
    // `data` contains the `number` and `tries` fields

    // show the solution
    alert(data.number + " is correct! You needed " + data.tries + " tries!");
  });

  // register a `too_low` event listener
  game.onTooLow((data) => {
    // will be called every time the `too_low` event is received
    // `data` contains a `number` field
    console.log(data.number + " is too low!");

    // try again with a larger number
    current++;
    guess();
  });

  // register a `too_high` event listener
  game.onTooHigh((data) => {
    // will be called every time the `too_high` event is received
    // `data` contains a `number` field
    console.log(data.number + " is too high!");

    // try again with a smaller number
    current--;
    guess();
  });

  guess();
})();
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```typescript title="src/index.ts"
import { Game, Verbosity } from './number-guessing/game.js';

// Game.fromArgv provides the command line interface and creates a Game object depending on the given arguments.
const { game } = await Game.fromArgv({}, Verbosity.WARNING);

var current = 50;

// We create a guess() function, which will be called every time we need to guess the next number.
function guess() {
 	// To send a command to the server use the game.send... methods.
  // They take a command data object to send along the command.
  game.sendGuess({
    number: current
  });
}

// register a `correct` event listener
game.onCorrect((data) => {
  // will be called every time the `correct` event is received
  // `data` contains the `number` and `tries` fields

  // print the solution
  console.log(data.number + " is correct! You needed " + data.tries + " tries!");

  // exit the application
  process.exit();
});

// register a `too_low` event listener
game.onTooLow((data) => {
  // will be called every time the `too_low` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too low!");

  // try again with a larger number
  current++;
  guess();
});

// register a `too_high` event listener
game.onTooHigh((data) => {
  // will be called every time the `too_high` event is received
  // `data` contains a `number` field
  console.log(data.number + " is too high!");

  // try again with a smaller number
  current--;
  guess();
});

guess();
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```typescript title="src/app.ts"
import { Game, Verbosity } from './number-guessing/game';

(async () => {
  // Game.fromQuery provides the URL query interface and creates a Game object depending on the given query parameters.
  const { game } = await Game.fromQuery({}, Verbosity.WARNING);

  var current = 50;

  // We create a guess() function, which will be called every time we need to guess the next number.
  function guess() {
    // To send a command to the server use the game.send... methods.
    // They take a command data object to send along the command.
    game.sendGuess({
      number: current
    });
  }

  // register a `correct` event listener
  game.onCorrect((data) => {
    // will be called every time the `correct` event is received
    // `data` contains the `number` and `tries` fields

    // show the solution
    alert(data.number + " is correct! You needed " + data.tries + " tries!");
  });

  // register a `too_low` event listener
  game.onTooLow((data) => {
    // will be called every time the `too_low` event is received
    // `data` contains a `number` field
    console.log(data.number + " is too low!");

    // try again with a larger number
    current++;
    guess();
  });

  // register a `too_high` event listener
  game.onTooHigh((data) => {
    // will be called every time the `too_high` event is received
    // `data` contains a `number` field
    console.log(data.number + " is too high!");

    // try again with a smaller number
    current--;
    guess();
  });

  guess();
})();
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>
