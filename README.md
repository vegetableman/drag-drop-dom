#Drag-Drop-Dom

A simplified api for adding drag-drop functionality to dom nodes by specifying drag and drop targets.

##Example

```js

var ddd = require('drag-drop-dom')({drag: '.drag', drop: '.drop'})

ddd.on('enter', function(node, target) {
    target.classList.add('highlight');
});

ddd.on('leave', function(node, target) {
    target.classList.remove('highlight');
});

ddd.on('drop', function(node, target) {
    target.appendChild(node);
});

```
