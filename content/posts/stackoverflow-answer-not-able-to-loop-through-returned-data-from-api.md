---
title: "StackOverflow Answer: Not able to loop through returned data from api"
slug: "stackoverflow-answer-not-able-to-loop-through-returned-data-from-api"
date: "2020-03-01"
excerpt: "## Original question: [Not able to loop through returned data from api](http://StackOverflow.com/q/60478424) * * * ## My answer: Your `coordResults` array starts empty, then after you receive the result back from the fetch, it has several r"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Not able to loop through returned data from api](http://StackOverflow.com/q/60478424)

* * *

## My answer:

Your `coordResults` array starts empty, then after you receive the result back from the fetch, it has several results pushed into it.

However, when you are looping through it, that is happening outside of the context of the asyncronous (fetch), so it is still empty at that point.

The reason the console log shows it as _not_ being empty is because console.log is not static. If you output an object, and that object later gets updated, so does the console.log output. It's misleading, but that's how it works.

If you move your second for loop up into the `.then()` chain, you'll see it output as expected.
