---
title: "StackOverflow Answer: React component not resetting state when using Object.assign()?"
slug: "stackoverflow-answer-react-component-not-resetting-state-when-using-object-assign"
date: "2020-02-14"
excerpt: "## Original question: [React component not resetting state when using Object.assign()?](http://StackOverflow.com/q/60218115) * * * ## My answer: Object.assign copies from the source (second argument) to the target (first argument). What is "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React component not resetting state when using Object.assign()?](http://StackOverflow.com/q/60218115)

* * *

## My answer:

Object.assign copies from the source (second argument) to the target (first argument).

What is your target object? The profileInitialState you declared outside of the Bio class.

In the first run through, you're modifying your 'default'. In the second run through, it uses the new default, which as you've noticed, has that filled-in headline property now.
