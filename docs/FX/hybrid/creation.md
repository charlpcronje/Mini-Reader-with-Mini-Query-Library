# Creating DOM ($) Plugin

## Prompt

Before we created `src/fx/FX.js` and a plugin for LitElement /src/fx/plugins/litPlugin.js 

Now I want to create another plugin FX from `src/fx/DOM.js`. DOM is a very basic JQuery style dom element wrapper and element selector. I want `$` to be the property being added to a Dynamic Object when the plugin is being registered.

So at the moment I can select elements with:
`$("#elementId")` with DOM, so what I want to do be able to do is from a Dynamic Object is:
- First some HTML code as an example
```html
<body name="body">
    <header name="header">
        <h1 name="heading"></h1>
    </header>
    <content name="content">
        <div name="col">

        </div>
        <div name="col">

        </div>
        <div name="col">

        </div>
    </content>
    <footer name="footer">
        <p name="text"></p>
    </footer>
</body>
```

Now I want to be able to select elements with:
```js
const body = fx.dom.$("body");
// or
const body = fx("dom").$("body");
// or
const body = fx.set("dom.body",fx.$("body"));
// or
const body = fx.val("dom.body",fx.$("body"));
```

- Here is what happens in each case and with the DOM plugin already being applied adding `$` to every Dynamic Object:

```js
import fx from '@fx/FX.js'
const body fx.dom.$("body");
```

- With the plugin applied to the Dynamic Object, the `$` property is added to the Dynamic Object.
- So `fx.dom` is a dynamic object with the following properties:
  - value
  - nodes (for it's child Dynamic Objects)
  - type="base"
  - $ (the DOM plugin)
- So by adding `$` to the Dynamic Object, it is now possible to select elements with: fx.dom.$("body"); that will select the body `tag`
- But hat will return a Dynamic Object with the following properties:
  - value
  - lit (from the litPlugin)
  - nodes (for it's child Dynamic Objects)
  - type="dom"

