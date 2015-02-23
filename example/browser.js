var ddd = require('../')({drag: '.drag', drop: '.drop'})

ddd.on('enter', function(node, target) {
    target.classList.add('highlight');
});

ddd.on('leave', function(node, target) {
    target.classList.remove('highlight');
});

ddd.on('drop', function(node, target) {
    target.appendChild(node);
});

