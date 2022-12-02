---
sidebar_position: 1
---

# Setup

To get started with CodeGame you will need to install the [CodeGame CLI](https://github.com/code-game-project/codegame-cli). It will automatically install
all of the additional tools when you need them.

## Code editor

You will need a code editor to write applications for CodeGame.

CodeGame officially supports [Visual Studio Code](https://code.visualstudio.com/) (_recommended for most people_) and [Neovim](https://neovim.io/) (_follow the [setup instructions](https://github.com/code-game-project/vim-codegame#installation)_).

## Installing CodeGame CLI

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="os">
  <TabItem value="windows" label="Windows">

[Download](https://github.com/code-game-project/codegame-cli/releases/latest/download/install.bat) the installer. Then execute it by double clicking `install.bat`.
A black command prompt window will pop up. A green message "_Done._" will be printed when the installation is complete.

  </TabItem>
  <TabItem value="macos" label="macOS">

Open the _Terminal_ application, paste the following command and press enter:

```bash
curl -L https://raw.githubusercontent.com/code-game-project/codegame-cli/main/install.sh | bash
```

  </TabItem>
  <TabItem value="linux" label="Linux">

Open a terminal, paste the following command and press enter:

```bash
curl -L https://raw.githubusercontent.com/code-game-project/codegame-cli/main/install.sh | bash
```

:::caution
Some linux distributions don't have `curl` installed by default. You can try this command instead:

```bash
wget -q --show-progress https://raw.githubusercontent.com/code-game-project/codegame-cli/main/install.sh -O- | bash
```

If `wget` is not installed either, you will need to install either `curl` or `wget` to use the installer. They should be included in all default repositories.
:::

  </TabItem>
</Tabs>

_Having trouble with the installation? Open an [issue](https://github.com/code-game-project/codegame-cli/issues/new) on GitHub._

## Installing language specific tools

In addition to CodeGame CLI, you will need to install language specific tools depending on the language you want to write CodeGame applications in.

To detect whether these tools are installed you can run the `doctor` command in a terminal:

```bash
codegame doctor
```

It will tell you all the needed dependencies for the different languages. Make sure all of the dependencies under your language of choice are marked green before continuing.
