---
title: "StackOverflow Answer: How to make JS pick a different value if it has been picked already?"
slug: "stackoverflow-answer-how-to-make-js-pick-a-different-value-if-it-has-been-picked-already"
date: "2020-03-03"
excerpt: "## Original question: [How to make JS pick a different value if it has been picked already?](http://StackOverflow.com/q/60506963) * * * ## My answer: Yes, it makes sense that if it just choosing a random item from a list, multiple times, th"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to make JS pick a different value if it has been picked already?](http://StackOverflow.com/q/60506963)

* * *

## My answer:

Yes, it makes sense that if it just choosing a random item from a list, multiple times, that it would sometimes randomly choose the same item.

What you can instead do is remove the item once it has been randomly chosen. You can make a copy of the array first if you need to access the original later.

```
const random = [...receivedArray]; //copy
const correctAnswer= random.splice(Math.floor(Math.random() * random.length),1)[0];
const guess1 = random.splice(Math.floor(Math.random() * random.length),1)[0];
const guess2 = random.splice(Math.floor(Math.random() * random.length),1)[0];
```

Splice removes and returns a specified number of items. The 2nd argument you see there is the number to remove, which in your case is 1. Splice returns an array (even of one item), so then you have to add \[0\] to access the item itself.

Since the item will be removed, it can't be guessed again! Simple!
