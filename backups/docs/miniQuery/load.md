# Loading Data with miniQuery

```js
$.loadSetup({
    base: "https://example.com",
    url: "/api/default-endpoint",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    timeout: 5000,
    beforeSend: () => console.log('Sending request...'),
    complete: () => console.log('Request complete.'),
    done: (response) => console.log('Success:', response),
    fail: (error) => console.error('Failed:', error),
    always: () => console.log('Always executed.')
});

// Perform a load request
$.load({
    url: "/api/other-endpoint",
    data: { key: "value" }
}).then(response => {
    console.log("Response:", response);
});

// Set inner HTML of an element using $.load
$('#content').html($.load({
    url: "/api/html-snippet",
    dataType: "html"
}));
```