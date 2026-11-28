---
title: "Fun with recursive functions"
slug: "recursive-functions"
date: "2018-02-03"
excerpt: "Most repetitive code is written iteratively, with a relatively linear and stable flow to the code. Have a huge list of data? Let's go through it one item at a time. It's linear in that it's very easy to follow it from round A, to round B, t"
image: "/img/uploads/2018/02/art-1455802_1280.jpg"
tags:
  - "JavaScript"
draft: false
---
Most repetitive code is written iteratively, with a relatively linear and stable flow to the code. Have a huge list of data? Let's go through it one item at a time. It's linear in that it's very easy to follow it from round A, to round B, to round C. And it's stable in that not much changes from round to round.

```javascript
var characters = ['Harry','Ron','Hermione'];
for ( var i = 0; i < characters.length; i++ ){
  console.log( characters[ i ] );
}
//Console output:
//Harry
//Ron
//Hermione
```

The code loops through the array, spitting out each one in turn, and then looks to the next item. When it runs out, it stops. Nothing changes each time except the counter we are using ( i ). Recursive code is usually more compact, more elegant, and WAY cooler. Simply put, it is a function (or any looping process) that calls itself. It's also hard to wrap your mind around, and has some pros and cons. Let's do the same thing as above but recursively.

```javascript
var characters = ['Harry','Ron','Hermione'];
logArray( characters );

function logArray( array ){
  if ( array.length == 0 ) return;
  console.log( array.shift() );
  logArray( array );
}
//Console output:
//Harry
//Ron
//Hermione
```

Since this is a teaching example, our recursive function is actually not more concise. But, this does the exact same thing as our earlier function, with one additional minor difference. Can you spot it? It empties the original array! That's probably a bad thing. We'll talk about that in a moment, but first let's make sure we understand what's happening.

```javascript
var characters = ['Harry','Ron','Hermione'];
logArray( characters );
```

First, we abstracted the loop into a separate function, then called the function. Good so far?

```javascript
function logArray( array ){
  if ( array.length == 0 ) return;
  console.log( array.shift() );
  logArray( array );
}
```

The function takes an array, and then let's skip over its first line for a moment. array.shift() pops off the first element of an array and returns it. Wrapped around this we are console.logging the output, so that same first item. In line 3 the function calls itself again, and we are officially recursive. The difference of course is that now our array is one item shorter because of the array.shift() call. So then we loop through the function again, this time without Harry. The check on line 1 fails a second time, because the array isn't empty. Ron gets logged, the function is called again, Hermione gets logged. After Hermione, the function is called again, but the check on line 1 passes. The array is empty, so that function ends. This null return statement echoes back through all the previous iterations, and we're done. So line 1 here is our 'base' case, and it's one of two key recursive needs. To not run indefinitely, recursive functions need to:

1.  Have data that changes in some way each time
2.  Have a base case that ends the process

## What about that side effect?

Remember, this function wiped out our original array. When we passed it to the function, we sent our original (really, a direct reference to it, but still). It was emptied one item at a time, and now there's nothing left. This is almost certainly an unwanted side effect. How can we avoid it? First, we can use a time-tested trick:

```javascript
var copy = JSON.parse( JSON.stringify( source ) );
```

We first turn our object into JSON, which is just a string of text. Then we decode that text back into an object. A new one. That's right, we're Star Trek teleporting our object into a new copy. JSON.stringify decomposes the original Shatner, and JSON.parse builds a new copy from the blueprint. The original Kirk is dead, sad to say. Or, we can use a newer method:

```javascript
var copy = Object.create( source );
```

The nice thing about this approach is that the source is actually a 'prototype' child of the original. We're not using that here, but it comes in handy in more advanced cases. So, we could create our copy before calling the function and or just build it into the function. The latter option is actually a bit complicated, because our recursive function depends on something changing from time to time, and if we're just passing copies around nothing's going to get done.

```javascript
var characters = ['Harry','Ron','Hermione'];
logArray( characters );
console.log( 'There are', characters.length, 'items left in the array.' );

function logArray( array ){
  if ( array.length == 0 ) return;
  var copy = Object.create( array );
  console.log( copy.shift() );
  logArray( copy );
}
//Console output:
//Harry
//Ron
//Hermione
//There are 3 items left in the array.
```

So we create a copy each time and then shift the item off of it instead. The bad news here is we have now created tons of extra copies. Each time we loop through the array we've made a whole new object. So now we're a bit worse off than our original, iterative approach, from a memory management perspective. The good news is that the latest JavaScript is smart enough to ditch these objects ASAP if we do things right. Prior to ES6, JavaScript couldn't handle tail calling correctly at all. With ES6, it can, but only in 'strict' mode and only when certain conditions are met. Which brings us to a final warning about recursive functions.

## Tail Considerations

As the function calls itself, we can think of it as building out a nested tree. logArray() // first time, outputs Harry ---logArray() //second time, outputs Ron ------logArray() // third time, outputs Hermione ---------logArray() // fourth time, outputs nothing ------------returns null; ---------returns that same null; ------returns still that same null; ---returns null, the original; returns once more, the same null; Null is nothing, so 'the same' null is just a concept we're using to demonstrate that the final return value is echo-ing back through up the chain. As you can see, once the function calls itself _that_ iteration is pretty much done. It doesn't have anything left to do except return, so anything inside of it can be trashed. But JavaScript won't do this for us unless we set it up correctly. Specifically, the return statement has to be the last command of the function, and it can't depend on anything else. So with recursive functions, it's important to make sure that your recursive calls are clean. In JavaScript, this is called "proper tail calling." Even something like this:

```javascript
function factorial ( n ){
  use 'strict';
  if ( n == 0 ) return 1;
  return n * factorial( n - 1 );
}
console.log( factorial( 5 ) ); //120
```

...which is the most common recursive example, factorials ( i.e. factorial(5) = 5\*4\*3\*2\*1 ), means that each iteration has to stay alive, because it has to do that n \* step AFTER all the iterations are set up. The loop here would look like: factorial( 5 ) ---factorial( 4 ) ------factorial( 3 ) ---------factorial( 2 ) ------------factorial( 1 ) ---------------factorial( 0 ) ------------------return 1; ---------------return 1 \* 1; ------------return 2 \* 1; ---------return 3 \* 2; ------return 4 \* 6; ---return 5 \* 24; In this case it's not a problem, because we are creating almost no memory each time. But if we were copying a huge object each time, we might run into problems. We could instead rewrite the factorial function to have two arguments, the running total and the next integer, so that each return statement only has to do one thing: return a value. The rule of thumb is that if a return statement has to 'do' anything other than returning, it's not a 'proper tail call' and can't be optimized.

## Advantages

The conciseness of recursive code is probably outweighed by the difficulty in understanding it. However, there are a few cases where it really makes the most sense. The factorials example above is a common one, as is 'tree' exploration. By tree I mean the association of items into parent and children branches, whether files on a hard drive or even the DOM of a web page. Your function can explore the whole tree by repeatedly calling itself at each level. Our Harry Potter is not, alas, a good recursive candidate. The iterative version is easier to understand, faster to code, and probably faster to run. At the end of the day, recursive functions:

1.  Are hard to write and understand
2.  Come with risks
3.  Offer a few niche capabilities,
4.  But are VERY fun to write :)
