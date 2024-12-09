# MiniQuery Events

```js
$(document).ready(function () {
    $('#myDiv').mouseover(function () {
        console.log('Mouse over the div!');
    });

    $('#inputField').change(function () {
        console.log('Input value changed to:', $(this).val());
    });

    $('#myButton').mousedown(function () {
        console.log('Mouse down on button!');
    });

    $('#myButton').mouseup(function () {
        console.log('Mouse up on button!');
    });
});
```