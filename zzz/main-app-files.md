# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./src/env.js                         | 14       | 37       | 49        |
|  2    | ./src/app/index.html                 | 18       | 37       | 129       |
|  3    | ./src/app/app.js                     | 2        | 2        | 6         |
|  4    | ./src/app/assets/css/styles.css      | 5        | 10       | 19        |
|  5    | ./src/app/layouts/main.html          | 13       | 19       | 57        |
|  6    | ./src/fx/boot.js                     | 11       | 56       | 98        |
|       | Total                                | 63       | 161      | 358       |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 63
- Total Words: 161
- Total AI Tokens: 358

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
        Hello
    </page-fx>

    <slot="body">
</body>
</html>
```

## File: src/app/app.js
```js
import "@fx/boot.js";

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

## File: src/fx/boot.js
```js
import "@fx/DOM.js";

import { AudioFx } from "@fx/lit/audio-fx.js";
import { PageFx } from "@fx/lit/page-fx.js";
import { ColumnFx } from "@fx/lit/column-fx.js";
import { SectionFx } from "@fx/lit/section-fx.js";
import { TextFx } from "@fx/lit/text-fx.js";
import { HeadingFx } from "@fx/lit/heading-fx.js";
import { ImageFx } from "@fx/lit/image-fx.js?test";
import { LinkFx } from "@fx/lit/link-fx.js";
import { VideoFx } from "@fx/lit/video-fx.js";
```


