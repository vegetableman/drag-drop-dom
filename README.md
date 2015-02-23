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

## Usage

```js
require('drag-drop-dom')({options})
```

Options:

 - `drag` Node to drag (selector | node)
 - `drop` Target node to drop on (selector | node)
 - `once` Target node should support drop only once (true | false, default: true)

Events:

 -  `ddd.on('start', listener)` 
 -  `ddd.on('enter', listener)` 
 -  `ddd.on('leave', listener)` 
 -  `ddd.on('drop', listener)` 

Each listener for the events except ```start``` event has two parameters: ```node``` and ```target```. ```node``` is the current node being dragged and ```target``` is the current drop target.
