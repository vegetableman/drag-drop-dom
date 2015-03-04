var toArray = require('to-array');
var $ = require('queryselectorall');
var EE = require('events').EventEmitter;
var inherits = require('inherits');
var attachEvents = require('attach-dom-events')
var domToString = require('dom-to-string');
var domify = require('domify');
var falsey = require('falsey');

function DragDropDom(opt) {
    if(!(this instanceof DragDropDom)) return new DragDropDom(opt);

    if(!opt) throw new Error("No options provided.");
    else if(!opt.drag) throw new Error("No drag element provided.");
    else if(!opt.drop) throw new Error("No drop element provided.");

    this.opt = opt;
    this.opt.cursor = this.opt.cursor || 'move';
    this.opt.once = this.opt.once || false;

    this.dragNodes = $(this.opt.drag);
    this.dropNodes = $(this.opt.drop);

    this.dragNodes.forEach(function(node) {
        node.setAttribute('draggable', true);
        node.style.cursor = opt.cursor;
        attachEvents(node, {
            'dragstart': this.handleDragStart.bind(this),
            'dragend': this.handleDragEnd.bind(this)
        });
    }.bind(this));

    this.dropNodes.forEach(function(node) {
        attachEvents(node, {
            'dragenter': this.handleDragEnter.bind(this),
            'dragover': this.handleDragOver.bind(this),
            'dragleave': this.handleDragLeave.bind(this),
            'drop': this.handleDrop.bind(this),
        });
    }.bind(this));
};

inherits(DragDropDom, EE);

DragDropDom.prototype.handleDragStart = function(e) {
    this.dragNode = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', domToString(this.dragNode));
    this.emit('start', e.target);
};

DragDropDom.prototype.handleDragEnter = function(e) {
    if (falsey(e.target.getAttribute('once'))
            && e.target.matches(this.opt.drop))
        this.emit('enter', this.dragNode, e.target);
};

DragDropDom.prototype.handleDragOver = function(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.dropTarget = e.target;
    e.dataTransfer.dropEffect = 'move';
    return false;
};

DragDropDom.prototype.handleDragLeave = function(e) {
    this.emit('leave', this.dragNode, this.dropTarget);
};

DragDropDom.prototype.handleDrop = function(e) {
    if (this.dropTarget.matches(this.opt.drop)
        && !this.dragNode.isEqualNode(this.dropTarget)
        && falsey(this.dropTarget.getAttribute('once')))
    {
        this.dropTarget.setAttribute('once', this.opt.once);
        this.emit('drop', domify(e.dataTransfer.getData('text/html')), this.dropTarget);
    }
};

DragDropDom.prototype.handleDragEnd = function(e) {
    this.emit('leave', this.dragNode, this.dropTarget);
};

module.exports = DragDropDom;