Here's the translation of the provided README.md content into English:

---

If you have some development basics, you can try making your own game adaptation for GMM.

Some game adaptation references: https://github.com/GlossMod/gmm-expands

A test example project: [Github](https://github.com/GlossMod/gmm-api/blob/master/test/src/index.ts)

Two potentially useful reference files: [Manager.ts](https://github.com/GlossMod/gmm-api/blob/master/test/src/Manager.ts) | [FileHandler.ts](https://github.com/GlossMod/gmm-api/blob/master/test/src/FileHandler.ts) (You can directly import them into your project)

## Prerequisites

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/) (Optional)

## Install Yarn and TypeScript (Skip if already installed)

In the terminal, input:
```sh
npm install -g typescript yarn
```

## Initialize the Project

Create a new folder, open it with VS Code, and in the terminal, input:
```sh
yarn init -y
yarn add @types/node typescript gmm-api -D
npx tsc --init
```

Open the `package.json` file, and add:
```json
"scripts": {
    "build": "tsc --outDir dist"
}
```

## Entry File

Create a `src/index.ts` file, and add:
```ts
import { ISupportedGames } from "gmm-api";

export const supportedGames: ISupportedGames = {

}
```

If you have the TypeScript plugin for VS Code installed, you should see error messages, and you can choose to quickly fix "Add missing properties" by selecting the quick fix option.

This will automatically add the missing properties:

![Missing Properties](https://mod.3dmgame.com/static/upload/mod/202401/MOD65af2b1994ac1.png@webp)

## Compilation/Generation

After completing your code, you can use `build` to compile:
```sh
yarn run build 
```

This will compile your `index.ts` into `index.js`, and output it to the `dist` directory.

## Installation

The latest version of GMM will create an empty folder named `Expands` in `我的文档/Gloss Mod Manager/`, you need to create a new folder inside (you can customize the name), and then you need to place the final `index.js` file inside your folder.
For example:
```sh
Expands  
└── Cyberpunk2077  
    └── index.js  
```

GMM will read the `index.js` file and automatically import and parse it. If you have other dependency files, please put them in as well, unless you have already packaged all the necessary dependencies into a single file.

> But I won't package multiple ts into one js, if you do, you can click the edit button below to write directly here.

---

This translation aims to maintain the original meaning and instructions provided in the README.md file.