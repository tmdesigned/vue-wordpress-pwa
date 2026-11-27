---
title: "StackOverflow Answer: Why does encoding an array into json format result in an json object?"
slug: "stackoverflow-answer-why-does-encoding-an-array-into-json-format-result-in-an-json-object"
date: "2020-02-02"
excerpt: "## Original question: [Why does encoding an array into json format result in an json object?](http://StackOverflow.com/q/60022523) * * * ## My answer: You are starting with an array of 3 arrays, with the indices of 0, 1, and 2. Then you are"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why does encoding an array into json format result in an json object?](http://StackOverflow.com/q/60022523)

* * *

## My answer:

You are starting with an array of 3 arrays, with the indices of 0, 1, and 2.

Then you are deleting the first one. If you compare your 2nd and 3rd screenshots, specifically the popup portion, you'll see that what you have lost is index 0. Your array now starts with index 1.

But in JavaScript, an array **can't** start with index 1. It has to start with index 0, so PHP is encoding it as an object, instead of an array.

If you use the PHP function `array_values()` it will re-index your array and you should be good to go.
