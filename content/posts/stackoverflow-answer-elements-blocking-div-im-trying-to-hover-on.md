---
title: "StackOverflow Answer: Elements blocking div I'm trying to hover on?"
slug: "stackoverflow-answer-elements-blocking-div-im-trying-to-hover-on"
date: "2020-07-25"
excerpt: "## Original question: [Elements blocking div I'm trying to hover on?](http://StackOverflow.com/q/63083526) * * * ## My answer: The `mouseover` event goes to one, and only one, event handler at a time. It gives priority starting with the inn"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Elements blocking div I'm trying to hover on?](http://StackOverflow.com/q/63083526)

* * *

## My answer:

The `mouseover` event goes to one, and only one, event handler at a time. It gives priority starting with the innermost child (nested/z-index). If you move the cursor from a parent ("project") to one of its children ("title"), then the parent loses the focus of the mouseover event.

There is a similar event, `mouseenter` which _ignore_ transitions within an element. In other words, it doesn't pay attention when you move the mouse over children elements, so it in effect works from the outside in. This may work better in your case. (The converse, `mouseleave`, can be used to detect when the mouse has left.)
