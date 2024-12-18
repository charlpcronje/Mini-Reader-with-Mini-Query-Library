<prompt>
1. Have a look at the files below, specifically the boot file so that you understand how the system gets initialized.
2. Then have a look at FX and how it created dynamic objects with the following syntax
  - Direct Access: `$.path.to.object`
  - Resolving the path: `$('path.to.object')`
  - With get() Method: `$('path.to').get('object.and.further')`
3. Set values and adding more child nodes with set and direct access and with the val() method
4.  Then have a look at the DOM class, it is like JQuery in a way, it is mainly to select dom elements
5. So then you will se in the boot.js files how there is selector factory of a kind so choose which selector is needed depending on the path
6. Then there is also domPlugin and a litPlugin.

What I'm hoping to achieve with the plugins, the DOM class, and the FX class, is to be able to have a dynamic object path, and then in any one of those dynamic objects, I want to be able to use the $ character again, to then select a DOM node, and then it must create a dynamic objects of that DOM node and its children, then I want to be able to access them with the plugins then access them with Lit's lifecycle methods, and add reactivity to them with Lit's reactivity. So maybe wrapping those elements then with Lit, so that I can use the reactivity and the lifecycle methods. And then when I create, then I also want to be able to, on the Lit property that gets added to any dynamic object that is of type DOM, if I add the correct properties to that, then that element, that Lit property, must then automatically become a DOM element, and it must be a child of the parent node. So that in effect, I want to be able to use the dynamic objects and the DOM interchangeably, to interact with the DOM, where if there is Lit element in the dynamic object, they automatically become HTML objects in the great hierarchy, as they have been selected from the DOM.


<plan>
  1. Next step is to create a login screen /admin/login route
     1. I installed @lit-labs/router for routing
  2. Please create Web Components for the input fields, form, Panel, Alerts and whatever else the login system might need. I want to implement JWT Authentication There is no users table yet in Maria DB so also give me the SQL statements to create the table and the user, add column email, password, id, created_at, updated_at, reset_token, salt, and reset_token_expires_at.
  3. Please utilize FX class effectively, use $ that will be available when you import @fx/boot.js. Make sure to use DOM also via $ and also make sure to use the plugins or modify them if they need more functionality. You will find all the files attached to the project and especially in lib-system-files.md. So not work around these features that I built,use them where ever you can for whatever you can.
</plan> 

</prompt>





