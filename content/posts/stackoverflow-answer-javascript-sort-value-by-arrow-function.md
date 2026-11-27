---
title: "StackOverflow Answer: JavaScript sort value by arrow function"
slug: "stackoverflow-answer-javascript-sort-value-by-arrow-function"
date: "2020-10-28"
excerpt: "## Original question: [JavaScript sort value by arrow function](http://StackOverflow.com/q/64578465) * * * ## My answer: A negative return value means put \"a\" first. A positive return value means put \"b\" first. A zero return value means the"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JavaScript sort value by arrow function](http://StackOverflow.com/q/64578465)

* * *

## My answer:

A negative return value means put "a" first. A positive return value means put "b" first. A zero return value means they are equivalent as far as sorting goes.

This is easy to think of if you consider numbers:

`[3,1,5]`

A natural sort on that (no function provided) would be just take `a - b`. So it would first do `a:3` and `b:1`. The math then is `3-1=2`. Since `2` is positive, b (1) should come first. So after the first comparison, you'd end up with 1 being moved in front of 3.

When it later compared `3` and `5`, it would get the value `-2`. Since this is negative, a (3 in this case) comes first, so it leaves them alone.

It may be a little confusing to have "negative" mean "they are already in the right order", but that's how it was set up to operate, since you naturally sort ascending and are doing `a-b`, not `b-a` (although with a custom function, you could totally do that!). For ascending values, you would expect a negative result to mean they are in the right order, because a "lower" number minus a "higher" number will be negative (i.e. `1-3=-2`.
