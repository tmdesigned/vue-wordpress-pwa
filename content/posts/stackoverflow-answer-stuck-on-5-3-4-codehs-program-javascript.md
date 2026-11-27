---
title: "StackOverflow Answer: Stuck on 5.3.4 codeHS program (JavaScript)"
slug: "stackoverflow-answer-stuck-on-5-3-4-codehs-program-javascript"
date: "2018-02-10"
excerpt: "## Original question: [Stuck on 5.3.4 codeHS program (JavaScript)](http://StackOverflow.com/q/48712657) * * * ## My answer: Yes, automated code checkers depend on things like your function being set up just as specified. It is likely expect"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Stuck on 5.3.4 codeHS program (JavaScript)](http://StackOverflow.com/q/48712657)

* * *

## My answer:

Yes, automated code checkers depend on things like your function being set up just as specified. It is likely expecting your function to take 2 parameters, but yours wants 4, so when it sends in the values they are not getting assigned to the right variables.

Look at the values you have in your start function calls to horizontalLine. Do you notice that of the 4 given, 2 are always the same each time? Your 2nd and 4th argument are always the same, because, as the exercise prompt explains, flat lines have the same y value. So you don't need to pass them in separately because they are the same. You'll just pass it in once, but use it twice.

The prompt also specifies that the x value will always start at 0. Yet, you are passing it in every time (notice that your first parameter is always 0?). So again, you don't need to pass that in, just use it.

That's the concept, now for the implementation.

The first two lines of your function are actually doing, more or less, what they need to do. They are setting up the variables that DON'T need to be passed in. So, why are you passing them in? Just change your function definition to only send in the two parameters you're actually using!
