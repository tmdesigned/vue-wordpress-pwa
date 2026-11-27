---
title: "StackOverflow Answer: What is the best way to make a prompt into an integer in JS?"
slug: "stackoverflow-answer-what-is-the-best-way-to-make-a-prompt-into-an-integer-in-js"
date: "2020-03-17"
excerpt: "## Original question: [What is the best way to make a prompt into an integer in JS?](http://StackOverflow.com/q/60713479) * * * ## My answer: For a prompt, yes, that is pretty much what you want to do. Prompt returns a string, so you need t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [What is the best way to make a prompt into an integer in JS?](http://StackOverflow.com/q/60713479)

* * *

## My answer:

For a prompt, yes, that is pretty much what you want to do. Prompt returns a string, so you need to convert it. There are other ways, i.e. `Number(numberOne)`, but `parseInt` is fine. They have slightly different behaviors, but for your case they're mostly the same. (parseInt stops parsing at the first non-number, while Number type-casting attempts to convert the whole thing).

And kudos for figuring out the edge behavior of having one string and one int multiplied together.

In general, most developers prefer using inputs on the page rather than prompts. The problem with prompts is that they interrupt the user's control of the page. As a bonus, with inputs you can set `type=number` to give the users number controls on some devices and limit the input to actual numbers.

**Edit**

I don't ever use prompt, so I was reading up on them. One thing to look out for is if the user hits escape, it returns `null`, which may break your code. You could prevent that by just checking for it first, i.e. `if(numberOne){ ... }`
