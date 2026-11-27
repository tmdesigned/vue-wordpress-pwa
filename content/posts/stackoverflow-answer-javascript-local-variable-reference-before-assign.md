---
title: "StackOverflow Answer: javascript-local variable reference before assign"
slug: "stackoverflow-answer-javascript-local-variable-reference-before-assign"
date: "2020-10-28"
excerpt: "## Original question: [javascript-local variable reference before assign](http://StackOverflow.com/q/64570364) * * * ## My answer: When JavaScript compiles right before your code run, it basically makes 2 passes over your code. First it goe"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [javascript-local variable reference before assign](http://StackOverflow.com/q/64570364)

* * *

## My answer:

When JavaScript compiles right before your code run, it basically makes 2 passes over your code.

First it goes through and looks at the "left hand" of the assignments, i.e. `var message`. All of these are hoisted, which means they are virtually moved to the top of their scope, in your case the function.

Then it goes through and executes your code, and this time looks at the "right hand" side of assignments, i.e. `= "inside a"`.

Because of that, when it does your `console.log`, it **already knows about the `a` you have created inside of the function**. Since this shadows the global `a` variable, the current value is "undefined" since it has not been set to "inside a" yet by the time you are doing your console log.

It's naturally confusing, which is why shadowing is discouraged.
