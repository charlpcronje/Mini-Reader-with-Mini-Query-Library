# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./package.json                       | 23       | 43       | 139       |
|  2    | ./.env                               | 5        | 3        | 10        |
|  3    | ./tsconfig.json                      | 19       | 38       | 118       |
|  4    | ./README.md                          | 129      | 637      | 993       |
|  5    | ./vite.config.js                     | 43       | 162      | 314       |
|  6    | ./jest.config.js                     | 16       | 28       | 78        |
|  7    | ./src/env.js                         | 14       | 37       | 49        |
|  8    | ./src/api/tsconfig.json              | 16       | 53       | 153       |
|  9    | ./src/api/getUsers.json              | 14       | 23       | 61        |
|  10   | ./src/app/index.html                 | 18       | 29       | 103       |
|  11   | ./src/app/tsconfig.json              | 19       | 60       | 212       |
|  12   | ./src/app/app.js                     | 4        | 10       | 21        |
|  13   | ./src/app/views/layouts/main.html    | 13       | 19       | 57        |
|  14   | ./src/fx/FX.js                       | 182      | 667      | 1101      |
|  15   | ./src/fx/DOM.js                      | 228      | 655      | 1162      |
|  16   | ./src/fx/boot.js                     | 9        | 54       | 92        |
|  17   | ./src/fx/plugins/litPlugin.js        | 97       | 275      | 478       |
|  18   | ./src/fx/plugins/domPlugin.js        | 91       | 261      | 459       |
|  19   | ./src/fx/components/page-fx.js       | 123      | 315      | 628       |
|  20   | ./src/fx/components/text-fx.js       | 11       | 23       | 45        |
|  21   | ./src/fx/components/section-fx.js    | 11       | 23       | 45        |
|  22   | ./src/fx/components/row-fx.js        | 11       | 23       | 45        |
|  23   | ./src/fx/components/column-fx.js     | 11       | 23       | 45        |
|  24   | ./src/fx/components/heading-fx.js    | 12       | 23       | 45        |
|  25   | ./src/fx/components/link-fx.js       | 12       | 23       | 45        |
|  26   | ./src/fx/components/audio-fx.js      | 11       | 23       | 45        |
|  27   | ./src/fx/components/video-fx.js      | 11       | 23       | 45        |
|  28   | ./src/fx/components/image-fx.js      | 13       | 23       | 45        |
|  29   | ./src/fx/utils/debounce.js           | 28       | 99       | 159       |
|  30   | ./src/fx/utils/ErrorHandler.js       | 28       | 104      | 162       |
|  31   | ./src/fx/utils/IDBManager.js         | 119      | 365      | 687       |
|  32   | ./src/fx/utils/Logger.js             | 59       | 222      | 384       |
|  33   | ./src/fx/utils/localStorageManager.js | 67       | 197      | 335       |
|  34   | ./src/fx/docs/baseComponent.md       | 85       | 487      | 937       |
|       | Total                                | 1552     | 5050     | 9297      |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 1552
- Total Words: 5050
- Total AI Tokens: 9297

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
    "@types/node": "^22.10.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "typescript": "^5.7.2",
    "vite": "^5.4.11"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "lit": "^3.2.1",
    "zod": "^3.23.8"
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
        port: 5645, // Dev server port
        strictPort: true, // Fails if the port is already in use
        open: true, // Opens the browser automatically on start
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
    APP_PORT: 80
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
    <link rel="stylesheet" href="styles/main.css?v=1.0.1">
    <title>Mini Reader</title>
    <script type="module" src="app.js"></script>
</head>
<body>
    <page-fx name="page" title="Home">
        Hello

    </page-fx>

    <slot="body">
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
    "include": ["./**/*.ts", "./**/*.json", "./**/*.js", "../../env.ts"], // Include env.ts explicitly
    "exclude": ["node_modules", "tsconfig.json"]
}
```

## File: src/app/app.js
```js
import "@fx/boot.js";
import fx from "@fx/FX.js";
import $ from "@fx/DOM.js"

```

## File: src/app/views/layouts/main.html
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
/**
 * @fileoverview This file contains the implementation of the FX class,
 * which provides a dynamic object creation system with plugin support.
 */

import litPlugin from "@fx/plugins/litPlugin.js";
import domPlugin from "@fx/plugins/domPlugin.js";

/**
 * Represents the core of the dynamic object system.
 * @class
 */
class FX {
    /**
     * @type {FX}
     */
    static instance = null;

    /**
     * @returns {FX}
     */
    static getInstance() {
        if (!FX.instance) {
            FX.instance = new FX();
        }
        return FX.instance;
    }

    constructor() {
        /**
         * @type {Object<string, {name: string, types: string[], init: function}>}
         */
        this.plugins = {};
        this.root = this.createDynamicObject();
        this.registerPlugin(litPlugin);
        this.registerPlugin(domPlugin);
    }

    /**
     * Registers a plugin to extend the functionality of dynamic objects.
     * @param {{name: string, types: string[], init: function}} plugin - The plugin to register.
     */
    registerPlugin(plugin) {
        if (!plugin || !plugin.name || !plugin.init || !plugin.types) {
            console.error("Invalid plugin format:", plugin);
            return;
        }
        this.plugins[plugin.name] = plugin;
    }

    /**
     * Creates a new dynamic object with default properties and applies registered plugins.
     * @param {string} type - The type of the dynamic object.
     * @returns {Proxy} - The wrapped dynamic object.
     */
    createDynamicObject(type = "base") {
        const core = {
            value: null,
            type: type,
            proxy: null,
            nodes: {},
            onCreate: [],
            onReady: [],
            val: function (value) {
                if (value !== undefined) {
                    this.value = value;
                }
                return this.value;
            }
        };

        // Apply plugins
        for (const pluginName in this.plugins) {
            const plugin = this.plugins[pluginName];
            if (plugin.types.includes(type)) {
                plugin.init(core);
            }
        }

        // Execute onCreate lifecycle hooks
        core.onCreate.forEach((hook) => hook(core));

        const proxy = new Proxy(core, {
            get: (target, prop) => {
                if (prop === "value") {
                    return target.value;
                }
                if (!(prop in target)) {
                    // Dynamically initialize properties if they do not exist
                    target[prop] = this.createDynamicObject();
                    target.nodes[prop] = target[prop];
                }
                return target[prop];
            },
            set: (target, prop, value) => {
                if (prop === "value") {
                    target.value = value;
                    return true;
                }
                if (typeof value === "object" && value !== null && !(value instanceof FX)) {
                    // If value is an object literal, add its properties to the dynamic object's value
                    if (!target[prop].value) {
                        target[prop].value = {};
                    }
                    for (const key in value) {
                        target[prop].value[key] = value[key];
                    }
                    target.nodes[prop] = target[prop];
                } else {
                    // If value is not an object literal, set it to the value property
                    target[prop] = value;
                    target.nodes[prop] = target[prop];
                }
                return true;
            },
        });

        core.proxy = proxy;

        // Execute onReady lifecycle hooks
        core.onReady.forEach((hook) => hook(core));

        return proxy;
    }

    /**
     * Resolves a path to a dynamic object, creating intermediate objects if necessary.
     * @param {string} path - The path to resolve.
     * @returns {Proxy} - The dynamic object at the specified path.
     */
    resolvePath(path) {
        let current = this.root;
        const parts = path.split(".");
        for (const part of parts) {
            if (!current[part]) {
                current[part] = this.createDynamicObject();
            }
            current = current[part];
        }
        return current;
    }

    /**
     * Sets a value at a specified path.
     * @param {string} path - The path to set the value at.
     * @param {*} value - The value to set.
     */
    set(path, value) {
        const target = this.resolvePath(path);
        if (typeof value === "object" && value !== null && !(value instanceof FX)) {
            // If value is an object literal, add its properties to the dynamic object's value
            if (!target.value) {
                target.value = {};
            }
            for (const key in value) {
                target.value[key] = value[key];
            }
        } else {
            // If value is not an object literal, set it to the value property
            target.value = value;
        }
    }

    /**
     * Gets or sets the value of a dynamic object at a specified path.
     * @param {string} path - The path to get or set the value at.
     * @param {*} value - The value to set (optional).
     * @param {*} defaultValue - The default value to return if the value is not set (optional).
     * @returns {*} - The value at the specified path.
     */
    val(path, value, defaultValue) {
        const target = this.resolvePath(path);
        if (value !== undefined) {
            target.value = value;
        }
        return target.value !== null ? target.value : defaultValue;
    }
}

const fx = FX.getInstance();
export default fx;

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
window.$ = $;
export { $, DOM };


```

## File: src/fx/boot.js
```js
import { AudioFx } from "@fx/components/audio-fx.js";
import { PageFx } from "@fx/components/page-fx.js";
import { ColumnFx } from "@fx/components/column-fx.js";
import { SectionFx } from "@fx/components/section-fx.js";
import { TextFx } from "@fx/components/text-fx.js";
import { HeadingFx } from "@fx/components/heading-fx.js";
import { ImageFx } from "@fx/components/image-fx.js?test";
import { LinkFx } from "@fx/components/link-fx.js";
import { VideoFx } from "@fx/components/video-fx.js";
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
 * @property {function} apply - The function that applies the plugin to a dynamic object.
 */

/**
 * Creates a LitElement-like interface for dynamic objects.
 * @type {LitPlugin}
 */
const litPlugin = {
    name: "lit",
    types: ["dom"],
    apply: (core) => {
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

## File: src/fx/components/page-fx.js
```js
/** 
 * /src/fx/components/page-fx.js
 * @file page-fx.js - The PageFx component extending BaseComponent.
 */

import { html, css } from 'lit';
import { BaseComponent } from '@fx/components/BaseComponent.js';
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
      `;
      const headerStyle = `
        width: 100%;
        height: 200px;
        ${bgImageStyle}
        background-size: cover;
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
      return html`
        <div class="header" style="${headerStyle}"></div>
        <div class="content-container" style="${containerStyle}">
          <h1><span class="icon" style="${iconStyle}"></span> ${this.title}</h1>
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

## File: src/fx/components/text-fx.js
```js
import {LitElement, html} from 'lit';

export class TextFx extends LitElement {
    render() {
      return html`
        <div>Hello from TextFx!</div>
      `;
    }
}

customElements.define('text-fx', TextFx);
```

## File: src/fx/components/section-fx.js
```js
import {LitElement, html} from 'lit';

export class SectionFx extends LitElement {
    render() {
      return html`
        <div>Hello from SectionFx!</div>
      `;
    }
}

customElements.define('section-fx', SectionFx);
```

## File: src/fx/components/row-fx.js
```js
import {LitElement, html} from 'lit';

export class RowFx extends LitElement {
    render() {
      return html`
        <div>Hello from RowFx!</div>
      `;
    }
}

customElements.define('row-fx', RowFx);
```

## File: src/fx/components/column-fx.js
```js
import {LitElement, html} from 'lit';

export class ColumnFx extends LitElement {
    render() {
      return html`
        <div>Hello from ColumnFx!</div>
      `;
    }
}

customElements.define('column-fx', ColumnFx);
```

## File: src/fx/components/heading-fx.js
```js
import {LitElement, html} from 'lit';

export class HeadingFx extends LitElement {
    render() {
      return html`
        <div>Hello from HeadingFx!</div>
      `;
    }
}

customElements.define('heading-fx', HeadingFx);

```

## File: src/fx/components/link-fx.js
```js
import {LitElement, html} from 'lit';

export class LinkFx extends LitElement {
    render() {
      return html`
        <div>Hello from LinkFx!</div>
      `;
    }
}

customElements.define('link-fx', LinkFx);

```

## File: src/fx/components/audio-fx.js
```js
import {LitElement, html} from 'lit';

export class AudioFx extends LitElement {
    render() {
      return html`
        <div>Hello from AudioFx!</div>
      `;
    }
}

customElements.define('audio-fx', AudioFx);
```

## File: src/fx/components/video-fx.js
```js
import {LitElement, html} from 'lit';

export class VideoFx extends LitElement {
    render() {
      return html`
        <div>Hello from VideoFx!</div>
      `;
    }
}

customElements.define('video-fx', VideoFx);
```

## File: src/fx/components/image-fx.js
```js
import {LitElement, html} from 'lit';

export class ImageFx extends LitElement {
    render() {
      return html`
        <div>Hello from ImageFx!</div>
      `;
    }
}

customElements.define('image-fx', ImageFx);


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

import { ErrorHandler } from './ErrorHandler.js';

/**
 * @class LocalStorageManager
 * @classdesc Manages storing and retrieving events from local storage.
 */
export class LocalStorageManager {
  /**
   * @private
   * @static
   * @type {string}
   */
  static STORAGE_KEY = 'component_events';

  /**
   * @method saveEvent
   * @description Saves an event to local storage.
   * @param {Object} eventObj - The event object to save.
   * @param {string} userId - The current user's ID.
   * @return {void}
   */
  static saveEvent(eventObj, userId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
      data.push(eventObj);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
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
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
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


