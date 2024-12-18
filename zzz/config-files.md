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
|  7    | ./src/env.js                         | 15       | 39       | 53        |
|  8    | ./.idea/.gitignore                   | 9        | 20       | 20        |
|       | Total                                | 122      | 305      | 622       |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 122
- Total Words: 305
- Total AI Tokens: 622

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


