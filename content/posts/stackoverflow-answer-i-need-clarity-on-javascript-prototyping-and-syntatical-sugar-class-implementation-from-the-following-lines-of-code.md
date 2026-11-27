---
title: "StackOverflow Answer: I need clarity on Javascript prototyping and syntatical (sugar) class implementation from the following lines of code"
slug: "stackoverflow-answer-i-need-clarity-on-javascript-prototyping-and-syntatical-sugar-class-implementation-from-the-following-lines-of-code"
date: "2020-09-21"
excerpt: "## Original question: [I need clarity on Javascript prototyping and syntatical (sugar) class implementation from the following lines of code](http://StackOverflow.com/q/63990882) * * * ## My answer: The way it is written, I do not believe s"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [I need clarity on Javascript prototyping and syntatical (sugar) class implementation from the following lines of code](http://StackOverflow.com/q/63990882)

* * *

## My answer:

The way it is written, I do not believe so.

If you have:

```
class Book{
  deleteMe = elem => {
    //some code here not referencing 'this'
    console.log('deleted');
  }
}

Book.deleteMe(null);
```

You will get a type error. However if you instantiate, it would work:

```
const myBook = new Book();
myBook.deleteMe(null);
```

Most likely, if you are instantiating, you wouldn't pass in an argument, but would instead reference `this`, but that's a side note.

I do not know what the browser native code does for classes under the hood, but Babel can give us an idea by transpiling it back to pre-class code. Throwing that code into Babel ES2015 (i.e. pre-class), it looks like:

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Book = function Book() {
  _classCallCheck(this, Book);

  _defineProperty(this, "deleteMe", function (elem) {
    //some code here not referencing 'this'
    console.log('deleted');
  });
};

Book.deleteMe(null);
```

So looking at the function `Book` that comes out of there, it has no properties. When you call it, it uses those helper functions to modify the object it is creating, i.e. `this` and add functions to _that_ object, but not itself. So you can't call it directly like that.

Interestingly, if you add the word `static` before the function, Babel does a neat trick and moves that `_defineProperty` call that sets up the deleteMe function _outside_ of the `Book` function. So it looks like this instead:

```
var Book = function Book() {
  _classCallCheck(this, Book);
};

_defineProperty(Book, "deleteMe", function (elem) {
  //some code here not referencing 'this'
  console.log('deleted');
});
```

So instead of adding the function `deleteMe` to `this`, it adds it to `Book`. This means the function lives on the class itself, not on its instance, which makes it callable like you wish:

`Book.deleteMe(null);`
