I want the following to work:
## Set and set and get the value property of the dynamic object
```js
$.path.to.dyn.obj = "some value";
const objVal = $.path.to.dyn.obj;
console.log(objVal)l;  // "some value";
```

##Get and set the dynamic object
set() returns the dynamic object
```
const dynObj = $.set('user.details',{
    name: "John",
    surname: "Doe"
});
console.log(dynObj); // {
    children : {
        name: "John",
        surname: "Doe"
    },
    value: null
}
```

Now with the val()
val() returns the value property of the dynamic object
```
const objVal = $.val('user.details',{
    name: "John",
    surname: "Doe"
}); returns the value property of the dynamic object
```
console.log(objVal);  // {
    name: "John",
    surname: "Doe"
}
console.log($('user.details.value')); // {
    name: "John",
    surname: "Doe"
}
console.log($('user.details.name')); // "John"
console.log($('user.details.surname')); // "Doe"
console.log($('user.details.surname.value')); // null  
Impotant distinkt
```






const dynObj = $.get('path.to.dyn.obj');
console.log(dynObj);   // Dynamic Object (Keeps a reference $get('path.to.dyn.obj'))
$.set('path.to.dyn.obj


$.resolvePath('path.to.dyn.obj').value or $.resolvePath('path.to.dyn.obj.value')
$.resolvePath('path.to.dyn.obj') == $.resolvePath('path.to.dyn.obj.value')
$.val('path.to.dyn.obj'); // "some value"
$('path.to.dyn.obj').val() // "some value"

User Object
const userObject = new User({
    name: "John",
    surname: "Doe"
});

// Object literal
const userLiteral = {
    name: "John",
    surname: "Doe"
};

// Set the value property of $.user.details

const userVal = $.val('user.details',userLiteral); //returns this
const userSet = $.set('user.details',userLiteral); //returns this
console.log(userVal.value); /* {
    name: "John",
    surname: "Doe"
};*/
console.log(userSet.value); // null
console.log(userSet.name); // John
console.log(userSet.value); // John 

$.set(user.details,userObject);
console.log(user.details.name); // John
console.log(user.details.name.value); // null
console.log(user.details.value); // User:  {
    name: "John",
    surname: "Doe"
};