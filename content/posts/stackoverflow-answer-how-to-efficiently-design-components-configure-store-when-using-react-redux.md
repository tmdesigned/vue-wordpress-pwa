---
title: "StackOverflow Answer: How to efficiently design components / configure store when using react-redux"
slug: "stackoverflow-answer-how-to-efficiently-design-components-configure-store-when-using-react-redux"
date: "2020-02-21"
excerpt: "## Original question: [How to efficiently design components / configure store when using react-redux](http://StackOverflow.com/q/60224525) * * * ## My answer: I was interested in your question, and checked back a few times hoping someone wo"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to efficiently design components / configure store when using react-redux](http://StackOverflow.com/q/60224525)

* * *

## My answer:

I was interested in your question, and checked back a few times hoping someone would answer and I could get a deeper understanding of how this works. But that didn't happen, so I did some investigation and set up a code sandbox to illustrate exactly what you asked.

[https://codesandbox.io/s/spring-thunder-xbj5z](https://codesandbox.io/s/spring-thunder-xbj5z)

There you will find a simple React + Redux application with 3 components (A,B, and C) each relying on a different reducer (reducerA, reducerB, and reducerC) and able to trigger an action that updates their reducer (actionA, actionB, and actionC).

You'll see a `console.log` statement in each component's render method, making it clear when each component is re-rendered.

Play around a bit, and you'll discover that the components are _already_ intelligently re-rendering only when the redux state they care about is updated--not whenever any part of the store is updated.

In other words, it actually doesn't work like what you suggested ("if I update the store with data only relevant to component A, then B, C will also be re-rendered."). Of course, there are a lot of ways that these other components could re-render, but in the most basic example here, they don't.

Cool, huh?
