# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./src/env.js                         | 15       | 39       | 53        |
|  2    | ./src/app/index.html                 | 31       | 76       | 250       |
|  3    | ./src/app/app.js                     | 3        | 7        | 26        |
|  4    | ./src/app/assets/css/styles.css      | 5        | 10       | 19        |
|  5    | ./src/app/layouts/main.html          | 13       | 19       | 57        |
|       | Total                                | 67       | 151      | 405       |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 67
- Total Words: 151
- Total AI Tokens: 405

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


