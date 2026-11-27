---
title: "StackOverflow Answer: React Redux object automatically sorts array"
slug: "stackoverflow-answer-react-redux-object-automatically-sorts-array"
date: "2020-10-27"
excerpt: "## Original question: [React Redux object automatically sorts array](http://StackOverflow.com/q/64552687) * * * ## My answer: The iteration order of objects is **usually** by the insertion order. However, for number-like keys, it is numeric"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React Redux object automatically sorts array](http://StackOverflow.com/q/64552687)

* * *

## My answer:

The iteration order of objects is **usually** by the insertion order. However, for number-like keys, it is numeric. Since your post IDs are numeric, this becomes the iteration order (i.e. lowest to higher).

You can instead create a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which guarantees insertion order.

Where you initialize the Map, instead of `items: {}` you would do `items: new Map()`. When you add an item, you would do `items.set(post.id, post)`. You can still access them directly (`items.get(3)`) and also iterate through them (`items.forEach( item => {...} )`) in the order you inserted them.

**EDIT**

Per comment below, it is not recommended to store a Map in a redux store. The link shared in the comment says its fine if you don't care about persistence and time-travel debugging, but it's a fair point. A more natural solution with that in mind, then, would be to store the results as an array (which the OP said they did not want to do).

The negative number indexing OP shared below is clever, but a little hacky. You could also just make the the indices be not number-like, i.e.

```
draft.posts[`post-${post.id}`]
```

The other option is to allow them to be sorted as they already are, but when accessing them go through them in reverse.
