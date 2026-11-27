---
title: "StackOverflow Answer: JavaScript do not allow dot as first when highlighted and inserted"
slug: "stackoverflow-answer-javascript-do-not-allow-dot-as-first-when-highlighted-and-inserted"
date: "2020-02-14"
excerpt: "## Original question: [JavaScript do not allow dot as first when highlighted and inserted](http://StackOverflow.com/q/60230175) * * * ## My answer: The reason that your `value.length==0` check isn't applying is because your previous value ("
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JavaScript do not allow dot as first when highlighted and inserted](http://StackOverflow.com/q/60230175)

* * *

## My answer:

The reason that your `value.length==0` check isn't applying is because your previous value (0) made the length 1. But you could expand this idea, and check to see if the portion being edited _starts with_ position 0.

```
if (evt.target.selectionStart === 0 && (evt.keyCode==46)) return false; 
```

This will catch both a highlighted section being edited that starts with the first position, as well as the cursor just being there.

[https://jsfiddle.net/nyzkdb81/9/](https://jsfiddle.net/nyzkdb81/9/)
