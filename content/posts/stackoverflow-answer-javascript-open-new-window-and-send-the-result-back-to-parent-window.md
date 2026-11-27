---
title: "StackOverflow Answer: Javascript: Open new window and send the result back to parent window"
slug: "stackoverflow-answer-javascript-open-new-window-and-send-the-result-back-to-parent-window"
date: "2020-02-02"
excerpt: "## Original question: [Javascript: Open new window and send the result back to parent window](http://StackOverflow.com/q/60028236) * * * ## My answer: There is a relationship between the browser windows that is maintained. In the child wind"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Javascript: Open new window and send the result back to parent window](http://StackOverflow.com/q/60028236)

* * *

## My answer:

There is a relationship between the browser windows that is maintained. In the child window (the popup), for instance, you can send a message to the window that created it

```
window.opener.postMessage("a message");
```

How this is implemented can vary, but the basic answer to your question is that your browser is just keeping track of the windows relationship and allowing messages (i.e. commands, tokens, etc.) to be passed between them.

[Mozzila postMessage reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
