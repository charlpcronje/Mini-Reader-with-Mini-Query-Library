# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./package.json                       | 18       | 31       | 94        |
|  2    | ./.env                               | 5        | 3        | 10        |
|  3    | ./env.ts                             | 12       | 29       | 64        |
|  4    | ./tsconfig.json                      | 19       | 38       | 118       |
|  5    | ./env.d.ts                           | 6        | 12       | 20        |
|  6    | ./vite.config.ts                     | 21       | 70       | 106       |
|  7    | ./src/api/tsconfig.json              | 18       | 56       | 167       |
|  8    | ./src/app/tsconfig.json              | 19       | 60       | 209       |
|  9    | ./src/app/scripts/miniQuery.ts       | 229      | 673      | 1174      |
|       | Total                                | 347      | 972      | 1962      |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 347
- Total Words: 972
- Total AI Tokens: 1962

## File: package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^22.10.1",
    "typescript": "^5.7.2",
    "vite": "^5.4.11",
    "vite-tsconfig-paths": "^5.1.4"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
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

## File: env.ts
```ts
import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    APP_HOST: z.string().url(),
    APP_PORT: z.string().regex(/^\d+$/),
    DB_NAME: z.string()
});

export const env = envSchema.parse(process.env);
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

## File: env.d.ts
```ts
export declare const env: {
    APP_HOST: string;
    APP_PORT: string;
    DB_NAME: string;
};

```

## File: vite.config.ts
```ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        tsconfigPaths() // Automatically resolves paths from tsconfig.json
    ],
    server: {
        port: 4232, // Port from your .env file (if applicable)
    },
    resolve: {
        alias: {
            '@root': '/var/www/dev/HeEPPjs', // Match your tsconfig.json paths
        },
    },
    build: {
        target: 'es2020', // Match your TypeScript target
        outDir: 'dist',   // Specify the output directory for production builds
    },
});

```

## File: src/api/tsconfig.json
```json
json
{
    "composite": true,
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "moduleResolution": "node",
        "outDir": "../../dist",                  // Compile output in the same folder
        "rootDir": "./",                 // Treat ./ as the root directory
        "baseUrl": "../../",                     // Allow relative imports from the app folder
        "paths": {
            // Optional path aliases
            "@api/*": ["./src/api/*"],
            "@root/*": ["../../*"]
        }
    },
    "include": ["./**/*.ts", "./**/*.json","./**/*.js"],
    "exclude": ["node_modules"]
}
```

## File: src/app/tsconfig.json
```json
{
    "composite": true,
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "moduleResolution": "node",
        "outDir": "./",                        // Compile output next to source files
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

## File: src/app/scripts/miniQuery.ts
```ts
// src/miniQuery.ts
import { env } from '@root/env';
console.log(env.APP_HOST);

type CSSProperty = Partial<CSSStyleDeclaration>
type EventCallback = (event: Event) => void
type MiniQueryElements = Element | NodeListOf<Element> | Element[]

/**
 * AJAX configuration type
 */
type LoadConfig = {
    base?: string
    url?: string
    type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    contentType?: 'application/json' | 'text/html' | 'text/plain'
    dataType?: 'json' | 'xml' | 'html' | 'text' | 'script' | 'jsonp'
    timeout?: number
    data?: Record<string, unknown>
    beforeSend?: () => void
    complete?: () => void
    done?: (response: unknown) => void
    fail?: (error: Error) => void
    always?: () => void
}

/**
 * Default AJAX configuration
 */
const defaultLoadConfig: LoadConfig = {
    base: env.APP_HOST,
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
}
let loadConfig = { ...defaultLoadConfig }

/**
 * MiniQuery class for DOM manipulation and AJAX
 */
class MiniQuery {
    elements: MiniQueryElements

    constructor(selector: string | Element) {
        this.elements =
            typeof selector === 'string'
                ? document.querySelectorAll(selector)
                : selector
    }

    val(value?: string): string | MiniQuery {
        if (value === undefined) {
            if (this.elements instanceof Element) {
                return (this.elements as HTMLInputElement).value || ''
            }
            return ''
        }
        this.forEachElement(el => {
            (el as HTMLInputElement).value = value
        })
        return this
    }

    css(property: keyof CSSStyleDeclaration): string;
    css(property: Partial<CSSStyleDeclaration>): MiniQuery;
    css(property: keyof CSSStyleDeclaration, value: string): MiniQuery;
    css(
        property: keyof CSSStyleDeclaration | Partial<CSSStyleDeclaration>,
        value?: string
    ): string | MiniQuery {
        if (typeof property === 'string' && value === undefined) {
            // Get a CSS property
            if (this.elements instanceof Element) {
                const computedStyle = getComputedStyle(this.elements);
                return computedStyle.getPropertyValue(property) || ''; // Fallback to empty string
            }
            throw new Error("Cannot retrieve CSS property for multiple elements");
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
                            el.style.setProperty(key, property[key] as string);
                        }
                    }
                }
            });
            return this;
        }
        throw new Error("Invalid arguments for css()");
    }
    html(content?: string): string | MiniQuery {
        if (content === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.innerHTML || ''
            }
            return ''
        }
        this.forEachElement(el => {
            el.innerHTML = content
        })
        return this
    }

    on(event: string, callback: EventCallback): MiniQuery {
        this.forEachElement(el => el.addEventListener(event, callback))
        return this
    }

    click(callback: EventCallback): MiniQuery {
        return this.on('click', callback)
    }

    change(callback: EventCallback): MiniQuery {
        return this.on('change', callback)
    }

    mouseover(callback: EventCallback): MiniQuery {
        return this.on('mouseover', callback)
    }

    mousedown(callback: EventCallback): MiniQuery {
        return this.on('mousedown', callback)
    }

    mouseup(callback: EventCallback): MiniQuery {
        return this.on('mouseup', callback)
    }

    private forEachElement(callback: (el: Element) => void): void {
        if (this.elements instanceof Element) {
            callback(this.elements)
        } else if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
            this.elements.forEach(el => callback(el))
        }
    }
}

/**
 * Factory function for creating a MiniQuery instance
 */
function $(selector: string | Element): MiniQuery {
    return new MiniQuery(selector)
}

/**
 * Configure default settings for AJAX
 */
$.loadSetup = (config: Partial<LoadConfig>): void => {
    loadConfig = { ...loadConfig, ...config }
}

/**
 * Perform AJAX requests with configurable settings
 */
$.load = async (config: Partial<LoadConfig>): Promise<unknown> => {
    const settings = { ...loadConfig, ...config }
    const headers = { 'Content-Type': settings.contentType! }

    const options: RequestInit = {
        method: settings.type,
        headers,
        body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), settings.timeout!)
    options.signal = controller.signal

    if (settings.beforeSend) settings.beforeSend()

    try {
        const response = await fetch(`${settings.base}${settings.url}`, options)
        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        let result: unknown
        switch (settings.dataType) {
            case 'json':
                result = await response.json()
                break
            case 'xml':
                result = new DOMParser().parseFromString(
                    await response.text(),
                    'application/xml'
                )
                break
            case 'html':
            case 'text':
                result = await response.text()
                break
            case 'script':
                result = await response.text().then(eval)
                break
            default:
                result = await response.text()
        }

        if (settings.done) settings.done(result)
        return result
    } catch (error) {
        if (settings.fail) settings.fail(error as Error)
        throw error
    } finally {
        if (settings.complete) settings.complete()
        if (settings.always) settings.always()
    }
}

// Expose the `$` function globally
;(window as any).$ = $

```


