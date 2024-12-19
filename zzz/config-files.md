# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./package.json                       | 21       | 39       | 123       |
|  2    | ./.env                               | 5        | 3        | 10        |
|  3    | ./vite.config.js                     | 44       | 164      | 318       |
|  4    | ./.gitignore                         | 8        | 8        | 8         |
|  5    | ./jest.config.js                     | 16       | 28       | 78        |
|  6    | ./.babelrc                           | 4        | 4        | 12        |
|  7    | ./comp.md                            | 2996     | 9922     | 17776     |
|  8    | ./src/env.js                         | 16       | 41       | 60        |
|  9    | ./.idea/.gitignore                   | 9        | 20       | 20        |
|       | Total                                | 3119     | 10229    | 18405     |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 3119
- Total Words: 10229
- Total AI Tokens: 18405

## File: package.json
```json
{
  "scripts": {
    "dev": "npm vite --host",
    "build": "vite build",
    "serve": "vite preview",
    "test": "jest"
  },
  "devDependencies": {
    "@babel/core": "^7.26.0",
    "@babel/preset-env": "^7.26.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "vite": "^6.0.3"
  },
  "dependencies": {
    "@lit-labs/router": "^0.1.3",
    "dotenv": "^16.4.7",
    "lit": "^3.2.1"
  }
}

```

## File: .env
```
APP_HOST="https//mini.reader.webally.co.za",
APP_PORT=4232

DB_NAME="reader"

```

## File: vite.config.js
```js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
export default defineConfig({
    root: resolve(__dirname, 'src/app'), // Entry point for the app
    server: {
        host: 'mini.reader.webally.co.za',
        port: 5645, // Dev server port
        strictPort: true, // Fails if the port is already in use
        open: false // Opens the browser automatically on start
    },
    build: {
        outDir: resolve(__dirname, 'dist'), // Output directory for production
        emptyOutDir: true, // Cleans the output directory before building
    },
    resolve: {
        alias: {
            '@src': resolve(__dirname, 'src'),     // Alias '@src' to 'src'
            '@fx': resolve(__dirname, 'src/fx'),   // Alias '@fx' to 'src/fx'
            '@app': resolve(__dirname, 'src/app'), // Alias '@app' to 'src/app'
            '@api': resolve(__dirname, 'src/api')  // Alias '@api' to 'src/api'
        },
    },
    plugins: [
        {
            name: 'serve-api-mock',
            configureServer(server) {
                server.middlewares.use('/api', (req, res) => {
                    const filePath = resolve(__dirname, `src/api${req.url}`);
                    fs.access(filePath, fs.constants.F_OK, err => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Not Found');
                        } else {
                            const stream = fs.createReadStream(filePath);
                            stream.pipe(res);
                        }
                    });
                });
            },
        },
    ],
});

```

## File: .gitignore
```
node_modules
.history
.vscode
backups.zip
backups
.env
logs
.idea
```

## File: jest.config.js
```js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!lit)/",
  ],
};

module.exports = config;

```

## File: .babelrc
```
{
  "presets": ["@babel/preset-env"]
}

```

## File: comp.md
```md
# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./package.json                       | 21       | 39       | 123       |
|  2    | ./.env                               | 5        | 3        | 10        |
|  3    | ./tsconfig.json                      | 19       | 38       | 118       |
|  4    | ./README.md                          | 129      | 637      | 993       |
|  5    | ./vite.config.js                     | 44       | 164      | 318       |
|  6    | ./jest.config.js                     | 16       | 28       | 78        |
|  7    | ./src/env.js                         | 15       | 39       | 53        |
|  8    | ./src/api/tsconfig.json              | 16       | 53       | 153       |
|  9    | ./src/api/getUsers.json              | 14       | 23       | 61        |
|  10   | ./src/app/index.html                 | 31       | 76       | 250       |
|  11   | ./src/app/tsconfig.json              | 19       | 65       | 237       |
|  12   | ./src/app/app.js                     | 3        | 7        | 26        |
|  13   | ./src/app/assets/css/styles.css      | 5        | 10       | 19        |
|  14   | ./src/app/layouts/main.html          | 13       | 19       | 57        |
|  15   | ./src/fx/FX.js                       | 281      | 1298     | 1963      |
|  16   | ./src/fx/DOM.js                      | 227      | 652      | 1157      |
|  17   | ./src/fx/boot.js                     | 203      | 783      | 1497      |
|  18   | ./src/fx/plugins/litPlugin.js        | 98       | 290      | 497       |
|  19   | ./src/fx/plugins/domPlugin.js        | 91       | 261      | 459       |
|  20   | ./src/fx/utils/debounce.js           | 28       | 99       | 159       |
|  21   | ./src/fx/utils/ErrorHandler.js       | 29       | 110      | 172       |
|  22   | ./src/fx/utils/IDBManager.js         | 119      | 365      | 687       |
|  23   | ./src/fx/utils/Logger.js             | 59       | 222      | 384       |
|  24   | ./src/fx/utils/localStorageManager.js | 60       | 190      | 324       |
|  25   | ./src/fx/docs/baseComponent.md       | 85       | 487      | 937       |
|  26   | ./src/fx/lit/MediaComponent.js       | 117      | 325      | 602       |
|  27   | ./src/fx/lit/BaseComponent.js        | 409      | 1412     | 2602      |
|  28   | ./src/fx/lit/forms/input-fx.js       | 73       | 176      | 342       |
|  29   | ./src/fx/lit/sync/audio-fx.js        | 16       | 36       | 60        |
|  30   | ./src/fx/lit/sync/col-fx.js          | 54       | 121      | 206       |
|  31   | ./src/fx/lit/sync/heading-fx.js      | 55       | 133      | 255       |
|  32   | ./src/fx/lit/sync/image-fx.js        | 61       | 141      | 261       |
|  33   | ./src/fx/lit/sync/link-fx.js         | 58       | 139      | 276       |
|  34   | ./src/fx/lit/sync/page-fx.js         | 142      | 395      | 814       |
|  35   | ./src/fx/lit/sync/row-fx.js          | 57       | 133      | 248       |
|  36   | ./src/fx/lit/sync/section-fx.js      | 17       | 42       | 79        |
|  37   | ./src/fx/lit/sync/text-fx.js         | 43       | 111      | 182       |
|  38   | ./src/fx/lit/sync/video-fx.js        | 16       | 39       | 63        |
|  39   | ./src/fx/lit/ui/panel-fx.js          | 37       | 67       | 128       |
|       | Total                                | 2785     | 9228     | 16850     |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 2785
- Total Words: 9228
- Total AI Tokens: 16850

## File: package.json
```json
{
  "scripts": {
    "dev": "npm vite --host",
    "build": "vite build",
    "serve": "vite preview",
    "test": "jest"
  },
  "devDependencies": {
    "@babel/core": "^7.26.0",
    "@babel/preset-env": "^7.26.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "vite": "^6.0.3"
  },
  "dependencies": {
    "@lit-labs/router": "^0.1.3",
    "dotenv": "^16.4.7",
    "lit": "^3.2.1"
  }
}

```

## File: .env
```
APP_HOST="https//mini.reader.webally.co.za",
APP_PORT=4232

DB_NAME="reader"

```

## File: tsconfig.json
```json
{
    "files": [],
    "references": [
        { "path": "./src/api" },
        { "path": "./src/app" }
    ],
    "compilerOptions": {
        "target": "ES2020",
        "module": "ES2020",
        "strict": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "composite": true,
        "moduleResolution": "node",
        "declaration": true
    },
    "include": ["env.ts"],
    "exclude": ["dev","node_modules"]
}
```

## File: README.md
```md
# Mini Reader

Mini Reader is a cross-platform document reading system designed to synchronize reader interactions with documents to a server. This enables playback and detailed analysis of user interactions with reading material, providing valuable insights into user behavior.

---

## Features

- **Cross-Platform Compatibility**: Works seamlessly across various devices and platforms.
- **User Interaction Tracking**: Logs user actions, such as page scrolling, text highlighting, and more.
- **Server Synchronization**: Syncs user interaction data to the server for playback and analysis.
- **Custom Components**: Built with modular components for flexibility and reusability.
- **AJAX & DOM Manipulation**: Lightweight MiniQuery framework included for enhanced interactivity.

---

## File Analysis Report

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | `./tsconfig.json`                    | 19       | 60       | 212       |
|  2    | `./env.js`                           | 14       | 37       | 49        |
|  3    | `./components/page-fx.js`            | 10       | 21       | 37        |
|  4    | `./components/text-fx.js`            | 10       | 21       | 37        |
|  5    | `./components/section-fx.js`         | 10       | 21       | 37        |
|  6    | `./components/row-fx.js`             | 10       | 21       | 37        |
|  7    | `./components/column-fx.js`          | 10       | 21       | 37        |
|  8    | `./components/heading-fx.js`         | 10       | 21       | 37        |
|  9    | `./components/link-fx.js`            | 10       | 21       | 37        |
| 10    | `./components/audio-fx.js`           | 10       | 21       | 37        |
| 11    | `./components/video-fx.js`           | 10       | 21       | 37        |
| 12    | `./components/image-fx.js`           | 10       | 21       | 37        |
| 13    | `./scripts/miniQuery.js`             | 180      | 500      | 903       |
| 14    | `./scripts/ComponentLoader.js`       | 18       | 72       | 155       |
| 15    | `./scripts/app.js`                   | 1        | 0        | 0         |
|       | **Total**                            | **332**  | **879**  | **1689**  |

---

## File Descriptions

### Configuration and Environment
- **`tsconfig.json`**: TypeScript configuration file specifying project setup, file paths, and output structure.
- **`env.js`**: Defines environment settings such as application host and port.

### Components
Modular Web Components built with `Lit` for specific UI features:
- **`page-fx.js`**: A container for rendering the main page.
- **`text-fx.js`**: Displays text elements.
- **`section-fx.js`**: Represents sections of content.
- **`row-fx.js`**: Creates horizontal row layouts.
- **`column-fx.js`**: Creates vertical column layouts.
- **`heading-fx.js`**: Displays headings.
- **`link-fx.js`**: Renders clickable links.
- **`audio-fx.js`**: Embeds audio players.
- **`video-fx.js`**: Embeds video players.
- **`image-fx.js`**: Renders images.

### Scripts
- **`miniQuery.js`**: A lightweight library for DOM manipulation and AJAX, similar to jQuery.
- **`ComponentLoader.js`**: Registers custom components and defines them for use in the project.
- **`app.js`**: Placeholder for initializing the Mini Reader application.

---

## Installation

1. Clone the repository:
   ```bash
   mkdir miniReader && cd miniReader
   git clone https://github.com/charlpcronje/Mini-Reader-with-Mini-Query-Library.git .
   ```

2. Install dependencies (if applicable):
   ```bash
   npm install
   ```

---

## Usage

1. **Start the Application**:
   Run the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

2. **Customize Components**:
   Modify the component files in the `./components` directory to suit your needs.

3. **View Interaction Playback**:
   Interaction data is synced to the server and can be played back to analyze user engagement.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Future Enhancements

- **Advanced Analytics**: Provide deeper insights into user behavior with visual reports.
- **Cross-Platform Support**: Enhance compatibility with mobile and desktop platforms.
- **Real-Time Synchronization**: Improve interaction data syncing to provide real-time updates.

For more information, visit [Mini Reader Documentation](./docs/README.md).
```

## File: vite.config.js
```js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
export default defineConfig({
    root: resolve(__dirname, 'src/app'), // Entry point for the app
    server: {
        host: 'mini.reader.webally.co.za',
        port: 5645, // Dev server port
        strictPort: true, // Fails if the port is already in use
        open: false // Opens the browser automatically on start
    },
    build: {
        outDir: resolve(__dirname, 'dist'), // Output directory for production
        emptyOutDir: true, // Cleans the output directory before building
    },
    resolve: {
        alias: {
            '@src': resolve(__dirname, 'src'),     // Alias '@src' to 'src'
            '@fx': resolve(__dirname, 'src/fx'),   // Alias '@fx' to 'src/fx'
            '@app': resolve(__dirname, 'src/app'), // Alias '@app' to 'src/app'
            '@api': resolve(__dirname, 'src/api')  // Alias '@api' to 'src/api'
        },
    },
    plugins: [
        {
            name: 'serve-api-mock',
            configureServer(server) {
                server.middlewares.use('/api', (req, res) => {
                    const filePath = resolve(__dirname, `src/api${req.url}`);
                    fs.access(filePath, fs.constants.F_OK, err => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Not Found');
                        } else {
                            const stream = fs.createReadStream(filePath);
                            stream.pipe(res);
                        }
                    });
                });
            },
        },
    ],
});

```

## File: jest.config.js
```js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!lit)/",
  ],
};

module.exports = config;

```

## File: src/env.js
```js
// ./env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80,
    STORAGE_KEY: 'mini-reader-storage'
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };

```

## File: src/api/tsconfig.json
```json
{
    "composite": true,
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "moduleResolution": "node",
        "outDir": "../../dist",                  // Compile output in the same folder
        "rootDir": "../../",                 // Treat ./ as the root directory
        "baseUrl": "../../",                     // Allow relative imports from the app folder
        "paths": {
            // Optional path aliases
            "@root/*": ["./*"]
        }
    },
    "include": ["./**/*.ts", "./**/*.json","./**/*.js"],
    "exclude": ["node_modules"]
}
```

## File: src/api/getUsers.json
```json
{
    "users": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "johndoe@example.com"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "janesmith@example.com"
        }
    ]
}
```

## File: src/app/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <title>Mini Reader</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script type="module" src="app.js"></script>
</head>
<body>
    <page-fx name="page" title="Home" header-src="assets/img/headers/hello.png" style-bg-color="#121212" style-padding="40px 0px 0px 0px">
        <section-fx>
            <row-fx columns="3">
                <col-fx slot="col-1" span="2">Content for column 1 (spanning 2 columns)</col-fx>
                <col-fx slot="col-2">
                    <link-fx href="https://example.com" target="_blank" text="Visit Example"></link-fx>

                    <!-- With custom content -->
                    <link-fx href="https://example.com" target="_blank">
                        <strong>Custom Link Content</strong>
                    </link-fx>
                </col-fx>
                <col-fx slot="col-3">Content for column 3</col-fx>
            </row-fx>
        </section-fx>
    </page-fx>

    <slot name="body">test</slot>
</body>
</html>
```

## File: src/app/tsconfig.json
```json
{
    "composite": true,
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "moduleResolution": "node",
        "outDir": "../../dist",                        // Compile output next to source files
        "rootDir": "../../",                   // Ensure root directory includes env.ts
        "baseUrl": "../../",                   // Keep relative imports working
        "paths": {
            "@components/*": ["./src/app/components/*"],
            "@pages/*": ["./src/app/pages/*"],
            "@scripts/*": ["./src/app/scripts/*"],
            "@app/*": ["./src/app/*"],
            "@root/*": ["./*"]
        }
    },
    "include": ["./**/*.ts", "./**/*.json", "./**/*.js", "../../env.ts", "../fx/loader.js", "../env.js", "../fx/DOM.js", "../fx/plugins/litPlugin.js", "../FX.js"], // Include env.ts explicitly
    "exclude": ["node_modules", "tsconfig.json"]
}
```

## File: src/app/app.js
```js
import { $ } from "@fx/boot.js";

console.log($("path.to.dyn.object").val("hello"));
```

## File: src/app/assets/css/styles.css
```css
html, body {
    height: 100%;
    margin: 0;
    background-color: #191919;
}
```

## File: src/app/layouts/main.html
```html
<!-- src/app/layouts/main.html -->
<div>
    <header>
        <h1>My Application Header</h1>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <p>&copy; 2024 My Application</p>
    </footer>
</div>

```

## File: src/fx/FX.js
```js

// /src/FX.js

/**
 * A simplified FX class that supports:
 *  1. Dynamic object creation via Proxies
 *  2. Recursive decomposition of plain objects
 *  3. .val(), .get(), and .set() methods on each node
 *  4. Plugin architecture
 *  5. A usage function $(path) => dynamic object
 *
 * Updates:
 *  - We are honoring the .nodes property for child nodes. 
 *  - We no longer clear out child nodes when setting .value directly, so a node can hold both .value and .nodes.
 *  - resolvePath(path) now explicitly navigates via .nodes for each path segment, ensuring the dynamic object structure remains consistent.
 *
 * Note:
 *  - Each node is represented by a 'core' object that has { value, nodes } plus .val(), .get(), .set() methods.
 *  - The Proxy traps handle direct property access, lazy creation, and merges with .nodes.
 */

export function $(path) {
    return FX.getInstance().resolvePath(path);
}

class FX {
    static instance = null;

    /**
     * Returns the singleton FX instance, creating it if necessary.
     * @returns {FX} The FX singleton instance.
     */
    static getInstance(path = null) {
        if (!FX.instance) {
            FX.instance = new FX();
        }
        return FX.instance.resolvePath(path);
    }

    /**
     * FX constructor. Maintains a plugin registry and a root dynamic object (Proxy).
     */
    constructor() {
        if (FX.instance) {
            return FX.instance;
        }
        FX.instance = this;
        /**
         * Stores registered plugins, keyed by plugin name.
         * Plugin format: { name: string, types: string[], init: function(coreObject) }
         */
        this.plugins = {};

        /**
         * The root dynamic object. Everything is resolved from this root.
         */
        this.root = this.createDynamicObject();
    }

    /**
     * Registers a plugin to enhance dynamic objects.
     * @param {{name: string, types: string[], init: function}} plugin - Plugin to register.
     */
    registerPlugin(plugin) {
        if (!plugin || !plugin.name || !plugin.init || !plugin.types) {
            console.error("Invalid plugin format:", plugin);
            return;
        }
        this.plugins[plugin.name] = plugin;
    }

    /**
     * Creates a new dynamic object (wrapped in a Proxy).
     *  - Recursively applies any relevant plugins based on 'type'.
     *  - Provides .val(), .get(), and .set() methods on the core object.
     * @param {string} type - The type of dynamic object (defaults to "base").
     * @returns {Proxy} A proxy-wrapped dynamic object.
     */
    createDynamicObject(type = "base") {
        const self = this;

        // The internal (core) object for the dynamic node
        const core = {
            type,
            value: null,

            /**
             * A place to store child dynamic objects. This is crucial for hierarchical access.
             * e.g. node.nodes['someProp'] => child dynamic object
             */
            nodes: {},

            /**
             * Sets or gets the node's value.
             * If called with no arguments, returns this node's current value.
             * If called with an argument, sets the node's value (recursively decomposing if plain object).
             * @param {*} newVal - Optional new value.
             * @returns {*} - The current value if no arguments, otherwise the new value just set.
             */
            val(newVal) {
                if (arguments.length === 0) {
                    return this.value;
                }
                this.set(newVal);
                return this.value;
            },

            /**
             * .set() has multiple signatures:
             *  1) .set(key, value): treat 'key' as a property name and 'value' as the new value for that child node
             *  2) .set(plainObject): recursively decompose the entire object into child nodes
             *  3) .set(primitiveOrClass): store directly in this node's .value (without deleting child nodes).
             *
             * @param {*} arg1 - A plain object, a primitive, a class instance, or a string key for a child node.
             * @param {*} [arg2] - If arg1 is a string, arg2 is the new value for the child node at 'arg1'.
             * @returns {Proxy} The current node (for chaining).
             */
            set(arg1, arg2) {
                // CASE 1: .set(key, value)
                if (typeof arg1 === 'string' && arguments.length === 2) {
                    const childKey = arg1;
                    const childValue = arg2;
                    if (!this.nodes[childKey]) {
                        this.nodes[childKey] = self.createDynamicObject();
                    }
                    this.nodes[childKey].set(childValue);
                    return this;
                }

                // CASE 2: .set(plainObject)
                if (self.isPlainObject(arg1)) {
                    // Instead of clearing out nodes entirely, we can augment or overwrite child keys as needed
                    const obj = arg1;
                    for (const key in obj) {
                        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
                        if (!this.nodes[key]) {
                            this.nodes[key] = self.createDynamicObject();
                        }
                        this.nodes[key].set(obj[key]);
                    }
                    // The node itself can keep .value as is, or you might choose to null it if you want a pure container
                    return this;
                }

                // CASE 3: .set(primitiveOrClass)
                // If it's neither (key,val) nor a plain object, just store directly in .value
                // Keep existing child nodes in place (no deletion), so a node can have a direct value AND sub-nodes
                this.value = arg1;
                return this;
            },

            /**
             * Retrieves a child dynamic object by relative path from the current node (via .nodes).
             * If the path is empty or not provided, returns the current node.
             * If the path doesn't exist, returns defaultValue or undefined.
             *
             * @param {string} [path] - Relative dot-delimited path from the current node.
             * @param {*} [defaultValue] - If the path is not found, return this defaultValue instead of undefined.
             * @returns {Proxy|undefined} The resolved dynamic node or defaultValue if not found.
             */
            get(path, defaultValue) {
                if (!path) {
                    return this; // If no path, return the current node
                }
                const parts = path.split(".");
                let current = this;
                for (let i = 0; i < parts.length; i++) {
                    const key = parts[i];
                    if (!current.nodes[key]) {
                        return defaultValue !== undefined ? defaultValue : undefined;
                    }
                    current = current.nodes[key];
                }
                return current;
            }
        };

        // Apply relevant plugins
        for (const pluginName in this.plugins) {
            const plugin = this.plugins[pluginName];
            if (plugin.types.includes(type)) {
                plugin.init(core);
            }
        }

        // Return a proxy that intercepts property access and assignment
        return new Proxy(core, {
            get(target, prop) {
                // Direct hits on the core object (e.g. .val, .set, .get, .value, .nodes, .type)
                if (prop in target) {
                    return target[prop];
                }

                // Check if there's a child node in .nodes
                if (target.nodes && prop in target.nodes) {
                    const childNode = target.nodes[prop];
                    // If the child node has a non-null .value, direct property access returns that
                    if (childNode.value !== null) {
                        return childNode.value;
                    }
                    // If child node has further children, return the child node (dynamic proxy)
                    if (Object.keys(childNode.nodes).length > 0) {
                        return childNode;
                    }
                    // Otherwise, return null
                    return null;
                }

                // If none of the above, handle the “direct reference to the node itself”
                // If the node has .value, return that
                if (target.value !== null) {
                    return target.value;
                } else if (target.nodes && Object.keys(target.nodes).length > 0) {
                    return target; // Return the proxy so user can navigate further
                }
                // If there's nothing, return null
                return null;
            },
            set(target, prop, value) {
                // If setting 'value' directly, store it
                if (prop === "value") {
                    target.value = value;
                    // We do NOT clear child nodes. The node can hold both .value and .nodes simultaneously.
                    return true;
                }

                // For other properties, treat them as children in .nodes
                if (!target.nodes[prop]) {
                    target.nodes[prop] = self.createDynamicObject();
                }
                target.nodes[prop].set(value);
                return true;
            }
        });
    }

    /**
     * Resolves a path from the root dynamic object by navigating the .nodes structure.
     * If the path doesn't exist, it will lazily create it.
     * @param {string} path - Dot-delimited path.
     * @returns {Proxy} The resolved dynamic node (dynamic Proxy).
     */
    resolvePath(path) {
        if (!path) {
            return this.root; // If no path, return the root node
        }
        const parts = path.split(".");
        let current = this.root;
        for (let i = 0; i < parts.length; i++) {
            const prop = parts[i];
            // We navigate via the .nodes property
            if (!current.nodes[prop]) {
                // lazily create a new dynamic object at this node
                current.nodes[prop] = this.createDynamicObject();
            }
            current = current.nodes[prop];
        }
        return current;
    }

    /**
     * Checks if a value is a plain object.
     * @param {*} value - The value to check.
     * @returns {boolean} True if plain object, false otherwise.
     */
    isPlainObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            value.constructor === Object
        );
    }
}


const fx = function (path) {
    return FX.getInstance(path);
}
window.fx = fx;
export { FX, fx };

```

## File: src/fx/DOM.js
```js
import { env } from '@src/env.js';
console.log(env);
/**
 * Default AJAX configuration
 */
const defaultLoadConfig = {
    base: env.APP_HOST,
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
};
let loadConfig = { ...defaultLoadConfig };
/**
 * DOM class for DOM manipulation and AJAX
 */
class DOM {
    constructor(selector) {
        if (!selector) {
            throw new Error('Invalid selector: Selector cannot be null or undefined');
        }
        this.elements =
            typeof selector === 'string'
                ? document.querySelectorAll(selector)
                : selector;
    }
    val(value) {
        if (value === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.value || '';
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                const firstElement = this.elements[0];
                if (firstElement instanceof HTMLInputElement) {
                    return firstElement.value || '';
                }
            }
            return '';
        }
        this.forEachElement(el => {
            if (el instanceof HTMLInputElement) {
                el.value = value;
            }
        });
        return this;
    }

    html(content) {
        if (content === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.innerHTML || '';
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                const firstElement = this.elements[0];
                return firstElement ? firstElement.innerHTML || '' : '';
            }
            return '';
        }
        this.forEachElement(el => {
            el.innerHTML = content;
        });
        return this;
    }
    
    
    css(property, value) {
        if (typeof property === 'string' && value === undefined) {
            // Get a CSS property
            if (this.elements instanceof Element) {
                const computedStyle = getComputedStyle(this.elements);
                return computedStyle.getPropertyValue(property) || ''; // Fallback to empty string
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                // Get CSS for the first element in the collection
                const firstElement = this.elements[0];
                if (firstElement instanceof Element) {
                    const computedStyle = getComputedStyle(firstElement);
                    return computedStyle.getPropertyValue(property) || ''; // Fallback to empty string
                }
            }
            throw new Error("Cannot retrieve CSS property for the selected elements");
        }
        if (typeof property === 'string' && value !== undefined) {
            // Set a single CSS property
            this.forEachElement(el => {
                if (el instanceof HTMLElement) {
                    el.style.setProperty(property, value);
                }
            });
            return this;
        }
        if (typeof property === 'object') {
            // Set multiple CSS properties
            this.forEachElement(el => {
                if (el instanceof HTMLElement) {
                    for (const key in property) {
                        if (Object.prototype.hasOwnProperty.call(property, key)) {
                            el.style.setProperty(key, property[key]);
                        }
                    }
                }
            });
            return this;
        }
        throw new Error("Invalid arguments for css()");
    }
    
    
    on(event, callback) {
        this.forEachElement(el => el.addEventListener(event, callback));
        return this;
    }
    click(callback) {
        return this.on('click', callback);
    }
    change(callback) {
        return this.on('change', callback);
    }
    mouseover(callback) {
        return this.on('mouseover', callback);
    }
    mousedown(callback) {
        return this.on('mousedown', callback);
    }
    mouseup(callback) {
        return this.on('mouseup', callback);
    }
    forEachElement(callback) {
        if (this.elements instanceof Element) {
            callback(this.elements);
        }
        else if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
            this.elements.forEach(el => callback(el));
        }
    }
}

/**
 * Factory function for creating a DOM instance
 */
function $(selector) {
    return new DOM(selector);
}

/**
 * Configure default settings for AJAX
 */
$.loadSetup = (config) => {
    console.log(".loadSetup: config:", config);
    const validKeys = Object.keys(defaultLoadConfig);
    const filteredConfig = Object.keys(config)
        .filter(key => validKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = config[key];
            return obj;
        }, {});
    loadConfig = { ...loadConfig, ...filteredConfig }; // Merge only valid keys
};

/**
 * Retrieve current AJAX load configuration
 */
$.loadConfig = () => {
    return loadConfig;
};

/**
 * Perform AJAX requests with configurable settings
 */
$.load = async (config) => {
    const settings = { ...loadConfig, ...config };
    const headers = { 'Content-Type': settings.contentType };
    const options = {
        method: settings.type,
        headers,
        body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), settings.timeout);
    options.signal = controller.signal;
    if (settings.beforeSend)
        settings.beforeSend();
    try {
        const response = await fetch(`${settings.base}${settings.url}`, options);
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let result;
        switch (settings.dataType) {
            case 'json':
                result = await response.json();
                break;
            case 'xml':
                result = new DOMParser().parseFromString(await response.text(), 'application/xml');
                break;
            case 'html':
            case 'text':
                result = await response.text();
                break;
            case 'script':
                result = await response.text().then(eval);
                break;
            default:
                result = await response.text();
        }
        if (settings.done)
            settings.done(result);
        return result;
    }
    catch (error) {
        if (settings.fail)
            settings.fail(error);
        throw error;
    }
    finally {
        if (settings.complete)
            settings.complete();
        if (settings.always)
            settings.always();
    }
};
export { $, DOM };


```

## File: src/fx/boot.js
```js
// /src/factory.js
import '@fx/FX.js';
import "@fx/DOM.js";
import { DOM } from '@fx/DOM.js';
import { FX, fx } from '@fx/FX.js';

/***  
** Syncing Components
***/
import { AudioFx } from "@fx/lit/sync/audio-fx.js";
import { PageFx } from "@fx/lit/sync/page-fx.js";
import { SectionFx } from "@fx/lit/sync/section-fx.js";
import { RowFx } from "@fx/lit/sync/row-fx.js";
import { ColFx } from "@fx/lit/sync/col-fx.js";
import { TextFx } from "@fx/lit/sync/text-fx.js";
import { HeadingFx } from "@fx/lit/sync/heading-fx.js";
import { ImageFx } from "@fx/lit/sync/image-fx.js?test";
import { LinkFx } from "@fx/lit/sync/link-fx.js";
import { VideoFx } from "@fx/lit/sync/video-fx.js";

/***  
** Form Components
***/
import { InputFx } from "@fx/lit/forms/input-fx.js";


/***  
** UI Components
***/
import { PanelFx } from "@fx/lit/ui/panel-fx.js";

// Array of valid HTML tags for DOM element detection
const HTML_TAGS = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
    'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
    'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
    'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
    'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress',
    'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table',
    'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
    'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
];

// Regex to detect custom HTML elements (contain a hyphen "-")
const CUSTOM_ELEMENT_REGEX = /^[a-z]+-[a-z0-9-]+$/;

// Default AJAX configuration
const defaultLoadConfig = {
    base: '',
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
};

let loadConfig = { ...defaultLoadConfig };

/**
 * Unified factory function for DOM and FX functionality.
 * @param {string | Element | NodeList | Array} selector - The selector or path.
 * @returns {DOM | Proxy} - A DOM instance or FX dynamic object.
 */
function $(selector) {
    // If it's a string, decide between DOM or FX
    if (typeof selector === 'string') {
        const tagName = selector.split(/[\s#\.\[]/)[0]; // Extract tag name

        // Match against HTML_TAGS or custom element regex
        if (
            HTML_TAGS.includes(tagName) || // Standard HTML tag
            CUSTOM_ELEMENT_REGEX.test(tagName) || // Custom element
            /^[#\.]/.test(selector) // Starts with # or .
        ) {
            return new DOM(selector); // Handle as DOM instance
        }
        // Otherwise, treat as FX path
        return fx(selector);
    }

    // If it's already a DOM object (Element/NodeList/Array), wrap in DOM
    if (selector instanceof Element || selector instanceof NodeList || Array.isArray(selector)) {
        return new DOM(selector);
    }

    // Fallback: invalid input
    throw new Error('Invalid selector or path for $()');
}

// Expose explicit FX and DOM usage for clarity
$.fx = fx;
$.dom = (selector) => new DOM(selector);

// Register a DOM plugin for FX to add DOM-like methods
FX.getInstance().registerPlugin({
    name: 'DOMPlugin',
    types: ['base'], // Apply to all FX nodes
    init(node) {
        if (node.value instanceof Element) {
            // Enhance FX nodes with DOM-like methods
            node.html = (content) => {
                if (content === undefined) {
                    return node.value.innerHTML;
                }
                node.value.innerHTML = content;
                return node;
            };
            node.css = (property, value) => {
                if (value === undefined) {
                    return getComputedStyle(node.value).getPropertyValue(property);
                }
                node.value.style.setProperty(property, value);
                return node;
            };
            node.on = (event, callback) => {
                node.value.addEventListener(event, callback);
                return node;
            };
        }
    },
});

/**
 * Configure default settings for AJAX
 * @param {object} config - Partial or complete load configuration.
 */
$.loadSetup = (config) => {
    const validKeys = Object.keys(defaultLoadConfig);
    const filteredConfig = Object.keys(config)
        .filter((key) => validKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = config[key];
            return obj;
        }, {});
    loadConfig = { ...loadConfig, ...filteredConfig }; // Merge only valid keys
};

/**
 * Retrieve current AJAX load configuration
 * @returns {object} The current load configuration.
 */
$.loadConfig = () => loadConfig;

/**
 * Perform AJAX requests with configurable settings
 * @param {object} config - Configuration for the AJAX request.
 * @returns {Promise<*>} The result of the AJAX call.
 */
$.load = async (config) => {
    const settings = { ...loadConfig, ...config };
    const headers = { 'Content-Type': settings.contentType };
    const options = {
        method: settings.type,
        headers,
        body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), settings.timeout);
    options.signal = controller.signal;

    if (settings.beforeSend) settings.beforeSend();

    try {
        const response = await fetch(`${settings.base}${settings.url}`, options);
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let result;
        switch (settings.dataType) {
            case 'json':
                result = await response.json();
                break;
            case 'xml':
                result = new DOMParser().parseFromString(await response.text(), 'application/xml');
                break;
            case 'html':
            case 'text':
                result = await response.text();
                break;
            case 'script':
                result = await response.text().then(eval);
                break;
            default:
                result = await response.text();
        }
        if (settings.done) settings.done(result);
        return result;
    } catch (error) {
        if (settings.fail) settings.fail(error);
        throw error;
    } finally {
        if (settings.complete) settings.complete();
    }
};
window.$ = $;
export { $ };

```

## File: src/fx/plugins/litPlugin.js
```js
/**
 * @file src/fx/plugins/litPlugin.js
 * @alias @fx/plugins/litPlugin/js 
 * @fileoverview This file contains the implementation of the lit plugin for Systemic.
 */

/**
 * @typedef {Object} LitPlugin
 * @property {string} name - The name of the plugin.
 * @property {string[]} types - The types of dynamic objects this plugin applies to.
 * @property {function} init - The function that initializes the plugin on a dynamic object.
 * @property {function} apply - The function that applies the plugin to a dynamic object.
 */

/**
 * Creates a LitElement-like interface for dynamic objects.
 * @type {LitPlugin}
 */
const litPlugin = {
    name: "lit",
    types: ["dom"],
    init: (core) => {
        /**
         * @type {HTMLElement}
         */
        let element = null;
        core.lit = {
            /**
             * @type {Object<string, any>}
             */
            properties: {},
            /**
             * @type {function}
             */
            render: () => { },
            /**
             * @type {function}
             */
            connectedCallback: () => { },
            /**
             * @type {function}
             */
            disconnectedCallback: () => { },
            /**
             * @type {function}
             */
            attributeChangedCallback: () => { },
            /**
             * @param {string} name
             * @param {any} value
             */
            setProperty: (name, value) => {
                core.lit.properties[name] = value;
                if (element) {
                    core.lit.requestUpdate();
                }
            },
            /**
             * @returns {HTMLElement}
             */
            getElement: () => {
                return element;
            },
            /**
             * @param {HTMLElement} el
             */
            setElement: (el) => {
                element = el;
            },
            /**
             * Requests an update to the component.
             */
            requestUpdate: () => {
                if (element) {
                    // Call render and update the element
                    const template = core.lit.render();
                    if (template) {
                        element.innerHTML = template;
                    }
                }
            },
        };
        core.onCreate.push((core) => {
            core.lit.connectedCallback = () => {
                core.lit.requestUpdate();
            };
            core.lit.disconnectedCallback = () => {
                // Clean up if needed
            };
            core.lit.attributeChangedCallback = (name, oldValue, newValue) => {
                core.lit.setProperty(name, newValue);
            };
        });
    },
};

export default litPlugin;

```

## File: src/fx/plugins/domPlugin.js
```js
import { $, DOM } from '../DOM.js';

/**
 * @fileOverview DOM Plugin for FX
 * @module domPlugin
 */

/**
 * DOM Plugin for FX
 * @type {FXPlugin}
 */
const domPlugin = {
    name: "dom",
    types: ["base"],
    /**
     * Initializes the DOM plugin, adding the $ property to the Dynamic Object.
     * @param {DynamicObject} dynamicObject - The Dynamic Object to extend.
     */
    init: function (dynamicObject) {
        /**
         * Selects DOM elements and wraps them in Dynamic Objects.
         * @param {string} selector - The CSS selector to use.
         * @returns {DynamicObject} A Dynamic Object wrapping the selected element(s).
         */
        dynamicObject.$ = (selector) => {
            const dom = new DOM(selector);
            const elements = dom.elements;
            
            if (!elements) {
                return null;
            }

            const createDynamicObject = (element) => {
                const name = element.getAttribute('name') || element.tagName.toLowerCase();
                const dynamicElement = {
                    value: element,
                    nodes: {},
                    type: "dom",
                    $: dynamicObject.$,
                };
                
                // Apply lit plugin if available
                if (dynamicObject.lit) {
                    dynamicElement.lit = dynamicObject.lit;
                }
                
                return dynamicElement;
            };

            let dynamicObjectResult;

            if (elements instanceof NodeList || Array.isArray(elements)) {
                if (elements.length === 1) {
                    dynamicObjectResult = createDynamicObject(elements[0]);
                } else {
                    dynamicObjectResult = Array.from(elements).map(createDynamicObject);
                }
            } else if (elements instanceof Element) {
                 dynamicObjectResult = createDynamicObject(elements);
            } else {
                return null;
            }

            if (dynamicObject.nodes === undefined) {
                dynamicObject.nodes = {};
            }

            if (Array.isArray(dynamicObjectResult)) {
                dynamicObjectResult.forEach(dynamicElement => {
                    const name = dynamicElement.value.getAttribute('name') || dynamicElement.value.tagName.toLowerCase();
                     if (dynamicObject.nodes[name]) {
                        if (!Array.isArray(dynamicObject.nodes[name])) {
                            dynamicObject.nodes[name] = [dynamicObject.nodes[name]];
                        }
                        dynamicObject.nodes[name].push(dynamicElement);
                    } else {
                        dynamicObject.nodes[name] = dynamicElement;
                    }
                });
            } else if (dynamicObjectResult) {
                const name = dynamicObjectResult.value.getAttribute('name') || dynamicObjectResult.value.tagName.toLowerCase();
                dynamicObject.nodes[name] = dynamicObjectResult;
            }
            
            return dynamicObjectResult;
        };
    },
};

export default domPlugin;

```

## File: src/fx/utils/debounce.js
```js
/** 
 * src/app/utils/debounce.js
 * @file debounce.js - A debounce utility function.
 */

/**
 * @function debounce
 * @description Debounces a given function by a specified delay.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The time in milliseconds to wait before invoking the function.
 * @returns {Function} A debounced function.
 */
export function debounce(func, wait) {
    let timeout;
    return function debouncedFunction(...args) {
      try {
        const later = () => {
          timeout = null;
          func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      } catch (error) {
        console.error('Error in debounced function:', error);
      }
    };
  }
  
```

## File: src/fx/utils/ErrorHandler.js
```js
/** 
 * src/app/utils/ErrorHandler.js
 * @file ErrorHandler.js - A simple error handling utility.
 */

import { Logger } from './Logger.js';
import { env } from '@src/env.js';

/**
 * @class ErrorHandler
 * @classdesc A utility class for handling errors throughout the application.
 */
export class ErrorHandler {
  /**
   * @method handleError
   * @description Handles an error by logging it.
   * @param {Error} error - The error object to handle.
   * @param {string} userId - The current user's ID.
   * @return {void}
   */
  static handleError(error, userId) {
    try {
      Logger.logError('ErrorHandler.handleError', { message: error.message, stack: error.stack }, userId);
    } catch (e) {
      console.error(`User: ${userId} | Failed to log error: `, e);
    }
  }
}

```

## File: src/fx/utils/IDBManager.js
```js
/** 
 * src/app/utils/IDBManager.js
 * @file IDBManager.js - IndexedDB management utility.
 */

import { ErrorHandler } from './ErrorHandler.js';

/**
 * @class IDBManager
 * @classdesc Manages IndexedDB for storing logs and events.
 */
export class IDBManager {
  /**
   * @private
   * @static
   * @type {IDBDatabase|null}
   */
  static db = null;
  
  /**
   * @method init
   * @description Initializes the IndexedDB database for logging.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async init(userId) {
    try {
      if (this.db) return; // Already initialized

      return new Promise((resolve, reject) => {
        const request = indexedDB.open('componentLogsDB', 1);

        request.onerror = (event) => {
          ErrorHandler.handleError(new Error('IndexedDB open request error'), userId);
          reject(event);
        };

        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('logs')) {
            const store = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
            store.createIndex('event', 'event', { unique: false });
            store.createIndex('component_slug', 'component_slug', { unique: false });
            store.createIndex('user_id', 'user_id', { unique: false });
            store.createIndex('datetime', 'datetime', { unique: false });
          }
        };
      });
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }

  /**
   * @method addLog
   * @description Adds a log entry to IndexedDB.
   * @param {Object} logEntry - The log data.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async addLog(logEntry, userId) {
    try {
      if (!this.db) {
        await this.init(userId);
      }
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('logs', 'readwrite');
        const store = tx.objectStore('logs');
        const request = store.add(logEntry);

        request.onsuccess = () => {
          resolve();
        };
        request.onerror = (event) => {
          ErrorHandler.handleError(new Error('Failed to add log entry to IDB'), userId);
          reject(event);
        };
      });
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }

  /**
   * @method getAllLogs
   * @description Retrieves all log entries from IndexedDB.
   * @param {string} userId - The current user's ID.
   * @return {Promise<Array<Object>>}
   */
  static async getAllLogs(userId) {
    try {
      if (!this.db) {
        await this.init(userId);
      }
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('logs', 'readonly');
        const store = tx.objectStore('logs');
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result || []);
        };
        request.onerror = (event) => {
          ErrorHandler.handleError(new Error('Failed to get logs from IDB'), userId);
          reject(event);
        };
      });
    } catch (error) {
      ErrorHandler.handleError(error, userId);
      return [];
    }
  }
}

```

## File: src/fx/utils/Logger.js
```js
/** 
 * src/app/utils/Logger.js
 * @file Logger.js - Logging utility class.
 */

import { IDBManager } from './IDBManager.js';
import { ErrorHandler } from './ErrorHandler.js';

/**
 * @class Logger
 * @classdesc Handles logging of events and errors to console and IndexedDB.
 */
export class Logger {
  /**
   * @method logEvent
   * @description Logs an event to the console and to IndexedDB.
   * @param {string} eventName - Name of the event.
   * @param {Object} data - Additional data related to the event.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async logEvent(eventName, data, userId) {
    try {
      console.log(`User: ${userId} | Event: ${eventName}`, data);
      await IDBManager.addLog({ 
        event: eventName, 
        user_id: userId,
        datetime: new Date().toISOString(), 
        ...data
      }, userId);
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }

  /**
   * @method logError
   * @description Logs an error to the console and to IndexedDB.
   * @param {string} source - The source or method name where the error occurred.
   * @param {Object} errorData - Additional error data.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async logError(source, errorData, userId) {
    try {
      console.error(`User: ${userId} | Error in ${source}:`, errorData);
      await IDBManager.addLog({
        event: 'error',
        user_id: userId,
        datetime: new Date().toISOString(),
        source,
        error: errorData
      }, userId);
    } catch (error) {
      console.error(`User: ${userId} | Failed to log error in Logger.logError:`, error);
    }
  }
}

```

## File: src/fx/utils/localStorageManager.js
```js
/** 
 * src/app/utils/localStorageManager.js
 * @file localStorageManager.js - Manage local storage for events.
 */
import { env } from '@src/env.js';
import { ErrorHandler } from '@fx/utils/ErrorHandler.js';

/**
 * @class LocalStorageManager
 * @classdesc Manages storing and retrieving events from local storage.
 */
export class LocalStorageManager {
  /**
   * @method saveEvent
   * @description Saves an event to local storage.
   * @param {Object} eventObj - The event object to save.
   * @param {string} userId - The current user's ID.
   * @return {void}
   */
  static saveEvent(eventObj, userId) {
    try {
      const data = JSON.parse(localStorage.getItem(env.STORAGE_KEY)) || [];
      data.push(eventObj);
      localStorage.setItem(env.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }

  /**
   * @method getEvents
   * @description Retrieves all events from local storage.
   * @param {string} userId - The current user's ID.
   * @return {Array<Object>}
   */
  static getEvents(userId) {
    try {
      const data = JSON.parse(localStorage.getItem(env.STORAGE_KEY)) || [];
      return data;
    } catch (error) {
      ErrorHandler.handleError(error, userId);
      return [];
    }
  }

  /**
   * @method clearEvents
   * @description Clears all events from local storage.
   * @param {string} userId - The current user's ID.
   * @return {void}
   */
  static clearEvents(userId) {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }
}

```

## File: src/fx/docs/baseComponent.md
```md
### **`BaseComponent.js` Overview**

Refers to: `/src/fx/components/baseComponent.js`

The `BaseComponent` is a reusable base class for creating custom web components using the LitElement framework. It includes a comprehensive set of properties, lifecycle methods, and utility integrations to streamline the development of advanced, interactive, and trackable components.

---

### **Attributes**
The component defines the following customizable attributes, supporting reflection and synchronization with the DOM:

#### **User & Session Info**
- `user_id` (String): Identifies the user interacting with the component.
- `session_id` (String): Automatically generated unique session identifier.

#### **Component Metadata**
- `componentSlug` (String): Unique identifier for the component.
- `slug` (String): General-purpose identifier.
- `title` (String): Title of the component.
- `topicSlug` (String): Identifier for associated topics.
- `author` (String): Author metadata.
- `createdAt`, `publishAt`, `updatedAt` (String): Timestamps for creation, publishing, and updates.

#### **Styling**
- **Border & Shadow**: `styleBorder`, `styleShadow` (String): CSS styling for borders and shadows.
- **Background**: `styleBgColor`, `styleBgGradient` (String): Background color or gradient.
- **Font**: `styleFont`, `styleFontSize`, `styleFontWeight` (String): Font family, size, and weight.
- **Padding & Margin**: `stylePadding`, `styleMargin` (String): Padding and margin settings.
- **Width**: `styleWidth`, `styleTabletWidth`, `styleMobileWidth` (String): Width settings for desktop, tablet, and mobile layouts.
- **Gutter**: `styleGutterWidth` (String): Gutter width for spacing.

#### **Layout**
- `layoutColumns` (Number): Number of layout columns.

#### **Visibility Controls**
- `showComments`, `showInfo` (Boolean): Toggles for displaying comments and informational sections.
- `protected` (Boolean): Indicates if the component is password-protected.
- `passcode` (String): Password for accessing the protected component.

#### **API Configuration**
- `apiHost`, `apiKey`, `apiEndpoint` (String): API settings for host, authentication key, and endpoint.
- `apiInterval` (Number): API polling interval in milliseconds.
- `apiSlug` (String): API-specific identifier.

#### **Event Handlers**
- `onLoad`, `onReady`, `onScroll`, `onClose`, `onResize` (String): Event handlers for various lifecycle events.
- `debounceTime` (Number): Debouncing time for throttling events like scroll and resize.

#### **Hierarchy & Context**
- `node_id`, `parent_id`, `page_id`, `topic_id` (String): Identifiers for component relationships and hierarchy.

---

### **Key Features**
1. **Lifecycle Methods**:  
   The component integrates key LitElement lifecycle hooks:
   - `connectedCallback` and `disconnectedCallback` for DOM lifecycle management.
   - `firstUpdated` for initializing event listeners and observers.
   - `updated` for handling property changes.

2. **Event Logging**:  
   The `Logger` utility records user interactions (`click`, `mouseover`), window events (`scroll`, `resize`), and visibility changes. It tracks:
   - Timestamps since the session started.
   - Time elapsed since the last event.
   - Contextual data (e.g., event target, visibility ratio).

3. **Intersection Observer**:  
   Tracks the component’s visibility within the viewport, logging changes with fine-grained thresholds (0–100%).

4. **Error Handling**:  
   All methods include error handling with the `ErrorHandler` utility.

5. **Utility Integrations**:  
   - `IDBManager` for IndexedDB initialization.
   - `LocalStorageManager` for saving logged events locally.

6. **Default Styling**:  
   Provides basic CSS styles for layout consistency and a slot for dynamic content insertion.

---

### **Example Use Cases**
- **Trackable UI Components**: Capture user interactions for analytics or debugging.
- **Content Blocks**: Build configurable page sections with custom styling.
- **Interactive Widgets**: Develop reusable, dynamic elements like sliders, modals, or galleries.
```

## File: src/fx/lit/MediaComponent.js
```js
// File: src/fx/lit/media-component.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';
import { debounce } from '@fx/utils/debounce.js';

/**
 * @class MediaComponent
 * @classdesc Base class for media components like AudioFx and VideoFx with detailed event tracking.
 */
export class MediaComponent extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      src: { type: String, reflect: true },
      autoplay: { type: Boolean, reflect: true },
      loop: { type: Boolean, reflect: true },
      muted: { type: Boolean, reflect: true },
      controls: { type: Boolean, reflect: true },
      caption: { type: String, reflect: true }, // Media caption
    };
  }

  constructor() {
    super();
    this.src = '';
    this.autoplay = false;
    this.loop = false;
    this.muted = false;
    this.controls = true;
    this.caption = '';
    this._lastPlaybackLogTime = 0;
  }

  firstUpdated() {
    super.firstUpdated();
    this._setupMediaEventListeners();
  }

  /**
   * @private
   * @method _setupMediaEventListeners
   * @description Sets up event listeners for media-specific events and tracks playback progress.
   */
  _setupMediaEventListeners() {
    try {
      const mediaElement = this.shadowRoot.querySelector('video, audio');
      if (!mediaElement) return;

      // List of media-specific events to track
      const events = [
        'play', 'pause', 'ended', 'volumechange',
        'seeked', 'seeking', 'loadeddata', 'loadedmetadata',
      ];

      events.forEach((eventName) => {
        mediaElement.addEventListener(eventName, (e) =>
          this._logEvent(eventName, { currentTime: mediaElement.currentTime })
        );
      });

      // Debounced logging for every second of playback
      const logPlayback = debounce(() => {
        const now = Math.floor(mediaElement.currentTime);
        if (now !== this._lastPlaybackLogTime) {
          this._lastPlaybackLogTime = now;
          this._logEvent('playback-second', { currentTime: now });
        }
      }, 1000);

      mediaElement.addEventListener('timeupdate', logPlayback);
    } catch (error) {
      console.error('Error setting up media event listeners:', error);
    }
  }

  /**
   * Renders the media element.
   * @param {string} tagName - The tag name (e.g., 'audio', 'video') for the media element.
   * @returns {import('lit').TemplateResult}
   */
  renderMediaElement(tagName) {
    return html`
      <div class="media">
        <${tagName}
          .src=${this.src}
          ?autoplay=${this.autoplay}
          ?loop=${this.loop}
          ?muted=${this.muted}
          ?controls=${this.controls}
        ></${tagName}>
        ${this.caption ? html`<div class="caption">${this.caption}</div>` : ''}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .media {
          display: block;
          width: 100%;
        }
        .caption {
          font-size: 14px;
          text-align: center;
          color: gray;
          margin-top: 8px;
        }
      `,
    ];
  }
}

customElements.define('media-component', MediaComponent);

```

## File: src/fx/lit/BaseComponent.js
```js
/** 
 * /src/app/components/BaseComponent.js
 * @file BaseComponent.js - The base LitElement web component class with shared attributes and functionality.
 */

import { LitElement, html, css } from 'lit';
import { Logger } from '@fx/utils/Logger.js';
import { ErrorHandler } from '@fx/utils/ErrorHandler.js';
import { LocalStorageManager } from '@fx/utils/localStorageManager.js';
import { debounce } from '@fx/utils/debounce.js';
import { IDBManager } from '@fx/utils/IDBManager.js';

export class BaseComponent extends LitElement {
    /**
     * @static
     * @type {Object}
     * @description LitElement property definitions for attributes.
     */
    static get properties() {
        return {
            user_id: { type: String, reflect: true },
            session_id: { type: String, reflect: true },
            componentSlug: { type: String, attribute: 'component-slug', reflect: true },
            title: { type: String, reflect: true },
            slug: { type: String, reflect: true },
            topicSlug: { type: String, attribute: 'topic-slug', reflect: true },
            headerSrc: { type: String, attribute: 'header-src', reflect: true },
            iconSrc: { type: String, attribute: 'icon-src', reflect: true },
            styleBorder: { type: String, attribute: 'style-border', reflect: true },
            styleShadow: { type: String, attribute: 'style-shadow', reflect: true },
            styleBgColor: { type: String, attribute: 'style-bg-color', reflect: true },
            styleBgGradient: { type: String, attribute: 'style-bg-gradient', reflect: true },
            styleColor: { type: String, attribute: 'style-color', reflect: true },
            styleFont: { type: String, attribute: 'style-font', reflect: true },
            styleFontSize: { type: String, attribute: 'style-font-size', reflect: true },
            styleFontWeight: { type: String, attribute: 'style-font-weight', reflect: true },
            stylePadding: { type: String, attribute: 'style-padding', reflect: true },
            styleMargin: { type: String, attribute: 'style-margin', reflect: true },
            styleWidth: { type: String, attribute: 'style-width', reflect: true },
            styleGutterWidth: { type: String, attribute: 'style-gutter-width', reflect: true },
            styleTabletWidth: { type: String, attribute: 'style-tablet-width', reflect: true },
            styleMobileWidth: { type: String, attribute: 'style-mobile-width', reflect: true },
            layoutColumns: { type: Number, attribute: 'layout-columns', reflect: true },
            showComments: { type: Boolean, attribute: 'show-comments', reflect: true },
            showInfo: { type: Boolean, attribute: 'show-info', reflect: true },
            protected: { type: Boolean, reflect: true },
            passcode: { type: String, reflect: true },
            author: { type: String, reflect: true },
            createdAt: { type: String, attribute: 'created-at', reflect: true },
            publishAt: { type: String, attribute: 'publish-at', reflect: true },
            updatedAt: { type: String, attribute: 'updated-at', reflect: true },
            status: { type: String, reflect: true },
            apiHost: { type: String, attribute: 'api-host', reflect: true },
            apiKey: { type: String, attribute: 'api-key', reflect: true },
            apiEndpoint: { type: String, attribute: 'api-endpoint', reflect: true },
            apiInterval: { type: Number, attribute: 'api-interval', reflect: true },
            apiSlug: { type: String, attribute: 'api-slug', reflect: true },
            onLoad: { type: String, attribute: 'on-load', reflect: true },
            onReady: { type: String, attribute: 'on-ready', reflect: true },
            onScroll: { type: String, attribute: 'on-scroll', reflect: true },
            onClose: { type: String, attribute: 'on-close', reflect: true },
            onResize: { type: String, attribute: 'on-resize', reflect: true },
            debounceTime: { type: Number, attribute: 'debounce-time', reflect: true },
            node_id: { type: String, reflect: true, attribute: 'node_id' },
            parent_id: { type: String, reflect: true, attribute: 'parent_id' },
            page_id: { type: String, reflect: true, attribute: 'page_id' },
            topic_id: { type: String, reflect: true, attribute: 'topic_id' },
        };
    }

    /**
     * @constructor
     */
    constructor() {
        super();
        try {
            // Default values
            this.user_id = '';
            this.session_id = this._generateSessionId();
            this.componentSlug = '';
            this.title = '';
            this.slug = '';
            this.topicSlug = '';
            this.headerSrc = '';
            this.iconSrc = '';
            this.styleBorder = 'none';
            this.styleShadow = 'none';
            this.styleBgColor = '#ffffff';
            this.styleBgGradient = '';
            this.styleColor = '#000000';
            this.styleFont = 'Arial, sans-serif';
            this.styleFontSize = '16px';
            this.styleFontWeight = '400';
            this.stylePadding = '0';
            this.styleMargin = '0 auto';
            this.styleWidth = '900px';
            this.styleGutterWidth = '20px';
            this.styleTabletWidth = '100%';
            this.styleMobileWidth = '100%';
            this.layoutColumns = 1;
            this.showComments = false;
            this.showInfo = false;
            this.protected = false;
            this.passcode = '';
            this.author = '';
            this.createdAt = '';
            this.publishAt = '';
            this.updatedAt = '';
            this.status = 'draft';
            this.apiHost = '';
            this.apiKey = '';
            this.apiEndpoint = '';
            this.apiInterval = 60000;
            this.apiSlug = '';
            this.onLoad = '';
            this.onReady = '';
            this.onScroll = '';
            this.onClose = '';
            this.onResize = '';
            this.debounceTime = 300;
            this.node_id = '';
            this.parent_id = '';
            this.page_id = '';
            this.topic_id = '';

            this._visibilityRatio = 0;
            this._intersectionObserver = null;
            this._lastEventTime = performance.now();

            IDBManager.init(this.user_id);
            Logger.logEvent('BaseComponent.constructor', { message: 'Base component constructed' }, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _generateSessionId
     * @description Generates a random session ID.
     * @return {string}
     */
    _generateSessionId() {
        try {
            const sid = 'session-' + Math.random().toString(36).substr(2, 9);
            Logger.logEvent('BaseComponent._generateSessionId', { session_id: sid }, this.user_id);
            return sid;
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
            return 'session-error';
        }
    }

    /**
     * @protected
     * @method firstUpdated
     * @description Lit lifecycle method called after the component’s DOM has been updated.
     * @return {void}
     */
    firstUpdated() {
        try {
            Logger.logEvent('BaseComponent.firstUpdated', { message: 'Component first updated' }, this.user_id);
            this._setupEventListeners();
            this._setupIntersectionObserver();
            this._logVisibilityChange();
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    _setupEventListeners() {
        this.addEventListener('click', (e) => this._logEvent('click', e));
        this.addEventListener('mouseover', (e) => this._logEvent('mouseover', e));
        this.addEventListener('mouseout', (e) => this._logEvent('mouseout', e));
    }

    /**
     * @private
     * @method _setupEventListeners
     * @description Sets up event listeners for clicks, mouseovers, scroll, resize, and visibility changes.
     * @return {void}
     */
    _setupEventListeners() {
        try {
            this.addEventListener('click', (e) => this._handleEvent('click', e));
            this.addEventListener('mouseover', (e) => this._handleEvent('mouseover', e));

            const debouncedScroll = debounce(() => this._handleWindowEvent('scroll'), this.debounceTime);
            const debouncedResize = debounce(() => this._handleWindowEvent('resize'), this.debounceTime);

            window.addEventListener('scroll', debouncedScroll);
            window.addEventListener('resize', debouncedResize);

            document.addEventListener('visibilitychange', () => {
                this._handleVisibilityChange(document.visibilityState);
            });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _setupIntersectionObserver
     * @description Sets up an IntersectionObserver to track visibility of the component.
     * @return {void}
     */
    _setupIntersectionObserver() {
        try {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: Array.from({ length: 101 }, (_, i) => i / 100)
            };
            this._intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this._visibilityRatio = Math.ceil(entry.intersectionRatio * 10) * 10;
                    this._logVisibilityChange();
                });
            }, options);
            this._intersectionObserver.observe(this);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _logVisibilityChange
     * @description Logs a visibility change event.
     * @return {void}
     */
    _logVisibilityChange() {
        try {
            this._logEvent('visibilitychange', { visibility: this._visibilityRatio + '%' });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleVisibilityChange
     * @description Handles document visibility changes (tab switching).
     * @param {string} state - The current visibility state of the document.
     * @return {void}
     */
    _handleVisibilityChange(state) {
        try {
            this._logEvent('documentVisibilityChange', { state });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleEvent
     * @description Handles component-level events like click and mouseover.
     * @param {string} eventName - The name of the event.
     * @param {Event} e - The event object.
     * @return {void}
     */
    _handleEvent(eventName, e) {
        try {
            this._logEvent(eventName, { target: e.composedPath()[0].tagName });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleWindowEvent
     * @description Handles window-level events like scroll and resize.
     * @param {string} eventName - The name of the event.
     * @return {void}
     */
    _handleWindowEvent(eventName) {
        try {
            this._logEvent(eventName, {});
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _logEvent
     * @description Logs an event with the specified name and data.
     * @param {string} eventName - Name of the event.
     * @param {Object} data - Additional event data.
     * @return {void}
     */
    _logEvent(eventName, data) {
        try {
            const now = performance.now();
            const ms_since_session_start = Math.floor(now);
            const previousEventTime = this._lastEventTime;
            this._lastEventTime = now;

            const ms_since_prev_event = Math.floor(now - previousEventTime);

            const eventObj = {
                session_id: this.session_id,
                user_id: this.user_id,
                event: eventName,
                event_slug: `${eventName}_${this.componentSlug}`,
                component_id: this.componentSlug,
                component_slug: this.componentSlug,
                node_id: this.node_id,
                parent_id: this.parent_id,
                page_id: this.page_id,
                topic_id: this.topic_id,
                data: JSON.stringify(data),
                value: data.value || '',
                datetime: new Date().toISOString(),
                ms_since_session_start,
                ms_since_prev_event
            };

            LocalStorageManager.saveEvent(eventObj, this.user_id);
            Logger.logEvent(eventName, eventObj, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method updated
     * @description Lit lifecycle method called after updating properties.
     * @param {Map<string, any>} changedProps - The properties that changed.
     * @return {void}
     */
    updated(changedProps) {
        try {
            Logger.logEvent('BaseComponent.updated', { changed: Array.from(changedProps.keys()) }, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method connectedCallback
     * @description Called when the element is connected to the DOM.
     * @return {void}
     */
    connectedCallback() {
        try {
            super.connectedCallback();
            Logger.logEvent('BaseComponent.connectedCallback', {}, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method disconnectedCallback
     * @description Called when the element is disconnected from the DOM.
     * @return {void}
     */
    disconnectedCallback() {
        try {
            super.disconnectedCallback();
            if (this._intersectionObserver) {
                this._intersectionObserver.disconnect();
            }
            Logger.logEvent('BaseComponent.disconnectedCallback', {}, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method render
     * @description LitElement render method.
     * @return {import('lit').TemplateResult}
     */
    render() {
        try {
            Logger.logEvent('BaseComponent.render', {}, this.user_id);
            return html`<slot></slot>`;
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
            return html``;
        }
    }

    /**
     * @static
     * @method styles
     * @description Component's scoped styles.
     * @return {import('lit').CSSResult}
     */
    static get styles() {
        return css`f
      :host {
        display: block;
      }
    `;
    }
}

customElements.define('base-component', BaseComponent);

```

## File: src/fx/lit/forms/input-fx.js
```js
export class InputFx extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            type: { type: String },
            name: { type: String },
            value: { type: String },
            error: { type: String },
            required: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.label = '';
        this.type = 'text';
        this.name = '';
        this.value = '';
        this.error = '';
        this.required = false;
    }

    render() {
        return html`
            <div class="input-field">
                <label>${this.label}</label>
                <input type="${this.type}" name="${this.name}" .value=${this.value} @input=${this.handleInput} />
                ${this.error ? html`<div class="error">${this.error}</div>` : ''}
            </div>
        `;
    }

    handleInput(e) {
        this.value = e.target.value;
        this.validate();
    }

    validate() {
        if (this.required && !this.value) {
            this.error = `${this.label} is required.`;
        } else {
            this.error = '';
        }
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value: this.value, name: this.name, error: this.error },
        }));
    }

    static get styles() {
        return css`
            .input-field {
                margin: 10px 0;
            }
            label {
                display: block;
                margin-bottom: 5px;
                color: #fff;
            }
            input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .error {
                color: #e57373;
                font-size: 12px;
                margin-top: 5px;
            }
        `;
    }
}
customElements.define('input-fx', InputFx);
```

## File: src/fx/lit/sync/audio-fx.js
```js
// File: src/fx/lit/audio-fx.js

import { MediaComponent } from '@fx/lit/MediaComponent.js';

/**
 * @class AudioFx
 * @classdesc A custom audio player extending MediaComponent.
 */
export class AudioFx extends MediaComponent {
  render() {
    return this.renderMediaElement('audio');
  }
}

customElements.define('audio-fx', AudioFx);

```

## File: src/fx/lit/sync/col-fx.js
```js
// File: src/fx/lit/col-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class ColFx
 * @classdesc A column component designed to fit inside a RowFx grid.
 */
export class ColFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      span: { type: Number, reflect: true }, // Number of grid columns to span
    };
  }

  constructor() {
    super();
    this.span = 1; // Default span is 1 column
  }

  render() {
    return html`
      <div class="col">
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          grid-column: span var(--span, 1);
        }
        .col {
          padding: 8px;
          box-sizing: border-box;
        }
      `,
    ];
  }

  firstUpdated() {
    super.firstUpdated();
    this.style.setProperty('--span', this.span);
  }
}

customElements.define('col-fx', ColFx);

```

## File: src/fx/lit/sync/heading-fx.js
```js
import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class HeadingFx
 * @classdesc A heading component with configurable size, margins, and inherited color.
 */
export class HeadingFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      size: { type: Number, reflect: true },
      marginTop: { type: String, attribute: 'margin-top', reflect: true },
      marginBottom: { type: String, attribute: 'margin-bottom', reflect: true },
    };
  }

  constructor() {
    super();
    this.size = 1;
    this.marginTop = '0px';
    this.marginBottom = '0px';
  }

  render() {
    const headingTag = `h${Math.min(Math.max(this.size, 1), 6)}`;
    return html`
      <${headingTag}
        class="heading"
        style="
          margin-top: ${this.marginTop};
          margin-bottom: ${this.marginBottom};
          color: ${this.styleColor || 'inherit'};
        "
      >
        <slot></slot>
      </${headingTag}>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .heading {
        font-family: inherit;
        font-weight: inherit;
      }
    `;
  }
}

customElements.define('heading-fx', HeadingFx);

```

## File: src/fx/lit/sync/image-fx.js
```js
// File: src/fx/lit/image-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class ImageFx
 * @classdesc A responsive image component with optional caption support.
 */
export class ImageFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      src: { type: String, reflect: true },
      alt: { type: String, reflect: true },
      caption: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.src = '';
    this.alt = 'Image';
    this.caption = '';
  }

  render() {
    return html`
      <figure class="image-container">
        <img src="${this.src}" alt="${this.alt}" />
        ${this.caption ? html`<figcaption>${this.caption}</figcaption>` : ''}
      </figure>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .image-container {
          margin: 0;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        figcaption {
          font-size: 0.9rem;
          color: var(--style-color, #555);
          margin-top: 8px;
        }
      `,
    ];
  }
}

customElements.define('image-fx', ImageFx);

```

## File: src/fx/lit/sync/link-fx.js
```js
// File: src/fx/lit/link-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class LinkFx
 * @classdesc A customizable link component with dynamic styling.
 */
export class LinkFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      href: { type: String, reflect: true },
      target: { type: String, reflect: true }, // e.g., _blank, _self
      text: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.href = '#';
    this.target = '_self';
    this.text = 'Click here';
  }

  render() {
    return html`
      <a class="link" href="${this.href}" target="${this.target}">
        <slot>${this.text}</slot>
      </a>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .link {
          color: var(--style-color, #0077cc);
          text-decoration: none;
          font-size: var(--style-font-size, 1rem);
          font-family: var(--style-font, inherit);
          font-weight: var(--style-font-weight, normal);
          transition: color 0.3s ease;
        }

        .link:hover {
          color: var(--style-hover-color, #005fa3);
          text-decoration: underline;
        }
      `,
    ];
  }
}

customElements.define('link-fx', LinkFx);

```

## File: src/fx/lit/sync/page-fx.js
```js
/** 
 * /src/fx/components/page-fx.js
 * @file page-fx.js - The PageFx component extending BaseComponent.
 */

import { html, css } from 'lit';
import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { Logger } from '@fx/utils/Logger.js';
import { ErrorHandler } from '@fx/utils/ErrorHandler.js';

/**
 * @class PageFx
 * @classdesc A LitElement web component representing a page with a header image and icon similar to Notion.
 * Extends BaseComponent to leverage event tracking and attribute management.
 */
export class PageFx extends BaseComponent {
  constructor() {
    super();
    try {
      Logger.logEvent('PageFx.constructor', { message: 'PageFx constructed' }, this.user_id);
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
    }
  }

  /**
   * @protected
   * @method firstUpdated
   * @description Called once the element’s DOM is updated. Additional setup for PageFx.
   * @return {void}
   */
  firstUpdated() {
    try {
      super.firstUpdated();
      Logger.logEvent('PageFx.firstUpdated', { message: 'PageFx first updated' }, this.user_id);
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
    }
  }

  /**
   * @protected
   * @method render
   * @description Renders the page layout.
   * @return {import('lit').TemplateResult}
   */
  render() {
    try {
      Logger.logEvent('PageFx.render', {}, this.user_id);
      const bgImageStyle = this.headerSrc ? `background-image: url(${this.headerSrc});` : '';
      const containerStyle = `
        max-width: ${this.styleWidth};
        margin: ${this.styleMargin};
        padding: ${this.stylePadding};
        border: ${this.styleBorder};
        box-shadow: ${this.styleShadow};
        background: ${this.styleBgGradient || this.styleBgColor};
        font-family: ${this.styleFont};
        font-size: ${this.styleFontSize};
        font-weight: ${this.styleFontWeight};
        color: ${this.styleColor};
        height: 100%;
      `;
      const headerStyle = `
        width: 100%;
        height: 280px;
        ${bgImageStyle}
        background-size: contain;
        background-position: center;
      `;
      const iconStyle = `
        width: 50px;
        height: 50px;
        display: inline-block;
        vertical-align: middle;
        background-image: url(${this.iconSrc});
        background-size: cover;
        background-position: center;
      `;
      const topbar = `
        position: fixed;
        background-color: #191919;
        display: inline-block;
        width: 100%;
        color: #FFF;
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
      `;
      const h1Style = `
        margin-top: 0px;
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
        color: #FFF;

      `;
      return html`
        <div class="topbar" style="${topbar}">
            <span class="topbar-icon icon" style="${iconStyle}">
            </span>${this.title}</span>
        </div>
        <div class="header" style="${headerStyle}"></div>
        <div class="content-container" style="${containerStyle}">
            <h1 style="${h1Style}"><span class="icon" style="${iconStyle}"></span> ${this.title}</h1>
            <slot></slot>
        </div>
      `;
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
      return html``;
    }
  }

  /**
   * @static
   * @method styles
   * @description Component's scoped styles.
   * @return {import('lit').CSSResult}
   */
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      .header {
        display: block;
      }
      .content-container {
        position: relative;
      }
      h1 {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .icon {
        background-repeat: no-repeat;
      }
    `;
  }
}

customElements.define('page-fx', PageFx);

```

## File: src/fx/lit/sync/row-fx.js
```js
// File: src/fx/lit/row-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class RowFx
 * @classdesc A grid-based row container with a configurable number of columns.
 */
export class RowFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      columns: { type: Number, reflect: true }, // Number of columns
    };
  }

  constructor() {
    super();
    this.columns = 3; // Default number of columns
  }

  render() {
    const slots = Array.from({ length: this.columns }, (_, i) => html`<slot name="col-${i + 1}"></slot>`);

    return html`
      <div class="row">
        ${slots}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
        }
        .row {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(var(--columns, 3), 1fr);
        }
      `,
    ];
  }

  firstUpdated() {
    super.firstUpdated();
    this.style.setProperty('--columns', this.columns);
  }
}

customElements.define('row-fx', RowFx);

```

## File: src/fx/lit/sync/section-fx.js
```js
// Example: File: src/fx/lit/section-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html } from 'lit';

/**
 * @class SectionFx
 * @classdesc A section container extending BaseComponent.
 */
export class SectionFx extends BaseComponent {
  render() {
    return html`<section><slot></slot></section>`;
  }
}

customElements.define('section-fx', SectionFx);

```

## File: src/fx/lit/sync/text-fx.js
```js
// File: src/fx/lit/text-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class TextFx
 * @classdesc Renders Markdown to HTML using the Marked library.
 */
export class TextFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      markdown: { type: String, reflect: true }, // Input Markdown
    };
  }

  constructor() {
    super();
    this.markdown = '';
  }

  render() {
    // Use the global `marked` object loaded via CDN
    const htmlContent = window.marked ? window.marked(this.markdown || '') : '';
    return html`<div class="markdown" .innerHTML=${htmlContent}></div>`;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .markdown {
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }
      `,
    ];
  }
}

customElements.define('text-fx', TextFx);

```

## File: src/fx/lit/sync/video-fx.js
```js
// File: src/fx/lit/video-fx.js

import { MediaComponent } from '@fx/lit/MediaComponent.js';

/**
 * @class VideoFx
 * @classdesc A custom video player with enhanced tracking and captions.
 */
export class VideoFx extends MediaComponent {
  render() {
    return this.renderMediaElement('video');
  }
}

customElements.define('video-fx', VideoFx);

```

## File: src/fx/lit/ui/panel-fx.js
```js
export class PanelFx extends LitElement {
    static get properties() {
        return {
            title: { type: String },
        };
    }

    constructor() {
        super();
        this.title = '';
    }

    render() {
        return html`
            <div class="panel">
                <h2>${this.title}</h2>
                <slot></slot>
            </div>
        `;
    }

    static get styles() {
        return css`
            .panel {
                background: #333;
                color: #fff;
                border-radius: 8px;
                padding: 20px;
                margin: 10px 0;
            }
            h2 {
                margin-top: 0;
            }
        `;
    }
}
customElements.define('panel-fx', PanelFx);
```



```

## File: src/env.js
```js
// src/env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80,
    STORAGE_KEY: 'mini-reader-storage',
    CTRL_ERROR_KEY: 'e' 
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };

```

## File: .idea/.gitignore
```
# Default ignored files
/shelf/
/workspace.xml
# Editor-based HTTP Client requests
/httpRequests/
# Datasource local storage ignored files
/dataSources/
/dataSources.local.xml

```


