---
sidebar_position: 2
---

# Creating the Project

## Discovering games

CodeGame provides many different games. All officially supported games are listed on [games.code-game.org](https://games.code-game.org).

For this guide we will choose [Number Guessing](https://github.com/code-game-project/number-guessing) because it is the simplest game available, but still includes the most important features of CodeGame.

When you have chosen a game, you will need to copy its URL. In our case it is `games.code-game.org/number-guessing`.

## Creating the project template

To create any CodeGame project, you will execute the `new` command:

```bash
codegame new
```

Next, choose _Game Client_ as the _Project type_.

Now you will be prompted to enter a name for your project. We will use `guess-client`, but you are free to use another name as long as it only contains letters, numbers, underscores or hyphens.

When prompted for the _Game server URL_ enter `games.code-game.org/number-guessing`.

Then choose your favorite programming language and enter the language specific information.

At the end, you will be asked whether you want to initialize Git, create a README or select a license.

After you've followed all of the previous steps you can open the created `./guess-client` directory in your [code editor](setup#code-editor).

## Updating the template

When a new version of the game is released the template must be updated to match its new features.

To update the client to the latest version, run:

```bash
codegame update
```

This command will update the event definitions to include new events of the new game version.

Additionally, it will update the CodeGame libraries to the latest version supported by the game.
