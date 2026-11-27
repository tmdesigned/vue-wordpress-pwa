---
title: "StackOverflow Answer: JQuery find() with depth limit two seperate lists within eachother"
slug: "stackoverflow-answer-jquery-find-with-depth-limit-two-seperate-lists-within-eachother"
date: "2020-03-05"
excerpt: "## Original question: [JQuery find() with depth limit two seperate lists within eachother](http://StackOverflow.com/q/60535927) * * * ## My answer: You can add a `.not()` function in jQuery, which modifies the original result set it retriev"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JQuery find() with depth limit two seperate lists within eachother](http://StackOverflow.com/q/60535927)

* * *

## My answer:

You can add a `.not()` function in jQuery, which modifies the original result set it retrieved so as not to include any that match the selector in `not()`.

In other words, you can specify, `$('.scaling-Accordian').not('.scaling-Accordian .scaling-Accordian')`.

Literally that would read as "Select all the elements with a class of 'scaling-Accordian' but don't include the items that match the class 'scaling-Accordian' which are children of another element with class 'scaling-Accordian'"

This way, you are telling jQuery to not include the items where that class is nested within itself.

Simplified example HTML:

```
<div class="accordian">
  <div class="anotherClass">
    <div class="accordian inner-accordian">
    </div>
  </div>
</div>
```

JavaScript:

```
console.log('Matches: ', $('.accordian').length);  //Matches: 2
console.log('Matches: ', $('.accordian').not('.accordian .accordian').length);  //Matches: 1
```
