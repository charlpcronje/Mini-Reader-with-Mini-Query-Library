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
  - type="dom" The name of the plugin specified in the `name` of the plugin, example:
  ```js
    const litPlugin = {
       name: "lit",
       types: ["dom"], 
       ... // rest of the plugin
  ```
  - Become the type of the Dynamic Object
  - $ (the DOM plugin) and it's name should be `dom`
  - So when $.fx.dom.$("body") is called, it must wrap the body dag in a dynamic property and give it a type="dom" and it must add it as a child of `$.fx.dom` on the `nodes` property with the name attribute as set on the html element (body tag) selected, and if no name attribute is not set then it will get the tag as the name.
  - So $.fx.dom.body is the Dynamic Object that wraps the body tag and it has the following properties:
    - value
    - lit (from the litPlugin) because the lit plugin is applied to all Dynamic Objects with the type of `dom`
    - nodes: {
        header: {

        }
        content: {
            col[0]: {

            }
            col[1]: {

            }
            col[2]: {

            }
        }
        footer: {
            text: {

            }
            p: [
                
            ]
        }
    } (for it's child Dynamic Objects, but they will only be added as Dynamic Objects as they are being accessed. When aa Dynamic object is of type `dom` it's normal behavior is to select dom elements so fx.dom.body.header will select the dom element within body with the name attribute with the value of header or with the tag header.

    When there are more than one element with the same name attribute or tag, then they will be added to an array.

