---
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Default Template

The default template provides you with enough code to join a game and start listening for events.

It exposes this functionality through a command line interface that is common to all CodeGame applications.

Every CodeGame application can be launched using `codegame run`.

## The default CLI

To create and join a new game:

```bash
codegame run create <username>
```

:::info
Add the `--public` flag to make the created game visible for everyone on the game server website, or
add the `--protected` flag to create an additional _join secret_ that is required to join the game.
:::

To join an existing game:

```bash
codegame run join <game_id> <username>
```

:::info
Add the `--spectate` flag to join the game as a spectator. Spectators receive all events from the game server but cannot send any commands and don't have a player associated to them.
:::

To reconnect to a previous session:

```bash
codegame run reconnect <username>
```

:::tip
A session is created automatically every time you join a game. You can view all of the current sessions with `codegame session list`.
Sessions allow for a smooth development experience because you can quickly reconnect to a previous game after making some code changes by using the `reconnect` command.
:::

When you are ready, you can build the project in release mode with the `build` command:

```bash
codegame build
```

## Files

`codegame new` creates several files for you:

<Tabs groupId="lang">
  <TabItem value="csharp" label="C#">

```
.
├── <project_name>.csproj
├── Program.cs                # the entry point for your application
└── <game_name>               # this directory is auto-generated and should not be edited manually
    ├── EventDefinitions.cs
    ├── Events.cs
    └── Game.cs
```

  </TabItem>
  <TabItem value="go" label="Go">

```
.
├── go.mod
├── go.sum
├── main.go                   # the entry point for your application
└── <game_name>               # this directory is auto-generated and should not be edited manually
    ├── event_definitions.go
    ├── events.go
    └── game.go
```

  </TabItem>

  <TabItem value="java" label="Java">

```
.
├── pom.xml
└── src
    └── main
        └── java
            └── <package>
                ├── App.java                   # the entry point for your application
                └── <game_name>                # this directory is auto-generated and should not be edited manually
                    ├── definitions
                    └── Game.java
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```
.
├── package.json
├── package-lock.json
└── src
    ├── index.js              # the entry point for your application
    └── <game_name>           # this directory is auto-generated and should not be edited manually
        └── game.js
```

  </TabItem>
  <TabItem value="browser" label="Browser">

```
.
├── app.js                    # the entry point for your application
├── index.html                # the HTML file to load in the browser
├── <game_name>               # this directory is auto-generated and should not be edited manually
│   └── game.js
├── package.json
└── package-lock.json
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```
.
├── package.json
├── package-lock.json
└── src
    ├── app.js                # the entry point for your application
    ├── index.html            # the HTML file to load in the browser
    └── <game_name>           # this directory is auto-generated and should not be edited manually
        └── game.js
```

  </TabItem>

</Tabs>

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

<Tabs groupId="js-runtime">

  <TabItem value="node" label="Node.js">

```
.
├── package.json
├── package-lock.json
└── src
    ├── index.ts              # the entry point for your application
    └── <game_name>           # this directory is auto-generated and should not be edited manually
        └── game.ts
```

  </TabItem>
  <TabItem value="bundler" label="Browser (bundled)">

```
.
├── package.json
├── package-lock.json
└── src
    ├── app.ts                # the entry point for your application
    ├── index.html            # the HTML file to load in the browser
    └── <game_name>           # this directory is auto-generated and should not be edited manually
        └── game.ts
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>
