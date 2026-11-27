---
title: "StackOverflow Answer: How can I await an event listener inside a function?"
slug: "stackoverflow-answer-how-can-i-await-an-event-listener-inside-a-function"
date: "2020-07-23"
excerpt: "## Original question: [How can I await an event listener inside a function?](http://StackOverflow.com/q/63044839) * * * ## My answer: You may be able to get this to work, but probably shouldn't. Having one large function that does stuff, wa"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How can I await an event listener inside a function?](http://StackOverflow.com/q/63044839)

* * *

## My answer:

You may be able to get this to work, but probably shouldn't.

Having one large function that does stuff, waits for input, and then does more stuff is cumbersome and hard to reason about.

Event listeners are there to help you with the "waiting for user input" problem without having to wrangle your code around it. By having a function start and then wait for an event listener to fire, you are kind of undoing that pattern.

In fact, many programmers consider having to create the first Promise in a chain to be an "anti-pattern", which means it goes against the grain of good practices. But the bigger problem here is how the bulk of this one big function will weigh you down in the future.

Instead, try splitting up your function. For instance:

```
function preInput(){
    //some setup tasks here
}

function postInput(){
    //some post-input tasks here
}

preInput(); // or elsewhere, depending on needs
startButton.addEventListener("click", postInput);
```

That's a lot easier to follow, and add to, in the future.
