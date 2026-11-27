---
title: "StackOverflow Answer: Javascript - Lists created through user input with a sort button"
slug: "stackoverflow-answer-javascript-lists-created-through-user-input-with-a-sort-button"
date: "2018-02-28"
excerpt: "## Original question: [Javascript - Lists created through user input with a sort button](http://StackOverflow.com/q/49026667) * * * ## My answer: You just need to insert it into both lists as each word is added, i.e. where you have: ``` doc"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Javascript - Lists created through user input with a sort button](http://StackOverflow.com/q/49026667)

* * *

## My answer:

You just need to insert it into both lists as each word is added, i.e. where you have:

```
document.getElementById("sortedUL").appendChild(li);
```

you should add a second line like this:

```
document.getElementById("unsortedUL").appendChild(li.cloneNode(true));
```

The node cloning might be what you were missing if you tried it before, otherwise it would move the same element and it ends up in only one list. The 'true' argument makes a deep copy so that the text node underneath it is copied as well.

Incidentally, this whole operation would be a lot easier with jQuery, it's the kind of DOM manipulation that the library was meant for. However people jump to jQuery so quickly and it's good that you are doing it with vanilla JavaScript.
