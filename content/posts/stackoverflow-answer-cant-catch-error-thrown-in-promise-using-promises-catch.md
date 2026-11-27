---
title: "StackOverflow Answer: Can't catch error thrown in promise using promises 'catch'"
slug: "stackoverflow-answer-cant-catch-error-thrown-in-promise-using-promises-catch"
date: "2020-03-12"
excerpt: "## Original question: [Can't catch error thrown in promise using promises 'catch'](http://StackOverflow.com/q/60644708) * * * ## My answer: Your comment on my comment suggested the case was different from the other answer. I can't really fi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Can't catch error thrown in promise using promises 'catch'](http://StackOverflow.com/q/60644708)

* * *

## My answer:

Your comment on my comment suggested the case was different from the other answer. I can't really fit this explanation in a comment, so:

The catch block will _not_ wait for the promise to reject, actually. Try this:

```
const myPromise = new Promise(() => {
  console.log('inside of the promise');
  setTimeout(() => { console.log('inside of the timeout function'); throw new Error('ERROR') }, 1000);
}).catch(err => {
  console.log('CATCHED ', err);
});
console.log('outside of the catch block, and my promise is', myPromise);
```

You will find that the outside of the catch message is written to the console prior to the message from inside the timeout function. At that point, the promise is unresolved (pending).

When you use setTimeout, the function gets added to the end of JavaScript's queue.

**EDIT**

You can get around this issue by calling reject on the promise.

```
const myPromise = new Promise((resolve,reject) => {
  setTimeout(() => { reject('ERROR'); }, 1000);
}).catch(err => {
  console.log('CAUGHT ', err);
});
```

This is different because in this case the reject function is kept in a scope bubble (closure), so it is still able to resolve.

**EDIT 2**

I did find another question that has some discussion in the comments about this:

[JavaScript Promises - reject vs. throw](https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw)

From this, I would revise my explanation.

First, it's helpful to keep catch _blocks_ separate in your mind from the catch _function_ you chain onto a promise. Think of the promise as catching a thrown error with a built in invisible catch _block_. In handling it the promise's catch _block_ will call 'reject' which will trigger the catch _function_.

Thrown error => promise's invisible (implicit) catch block => reject() => promise's catch() function

It can't catch it, though, if the error is thrown from a different call stack, which it is with setTimeout.

Thrown error (in another call stack from setTimeout) => uncaught exception

The chain stops there, because the exception is bubbling up in a different call stack.

But YOU can still call reject, triggering the catch function, which is what the code snippet above does.

reject => promise's catch() function

It's a shorter chain of events, cutting right to the behavior you want -- the triggering of the code in the catch function.
