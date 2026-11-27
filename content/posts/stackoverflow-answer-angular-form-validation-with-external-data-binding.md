---
title: "StackOverflow Answer: Angular form validation with external data binding"
slug: "stackoverflow-answer-angular-form-validation-with-external-data-binding"
date: "2018-02-08"
excerpt: "## Original question: [Angular form validation with external data binding](http://StackOverflow.com/q/48672788) * * * ## My answer: I have an Angular 4 form, but with the data tracked in an injected service (for reasons outside the scope of"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Angular form validation with external data binding](http://StackOverflow.com/q/48672788)

* * *

## My answer:

I have an Angular 4 form, but with the data tracked in an injected service (for reasons outside the scope of this question).

Each input looks something like...

```
<input name="..." [ngModel]='getVal(...)' (ngModelChange)='setVal(...)'>
```

...because there's extra functionality in those getters/setters.

That's working great, but I would also like to use the built-in validation. If I give my form a template reference variable...

```
<form id="..." #myForm="ngForm">
```

and look at the value of myForm, it's not tracking any of those inputs. I get that, I mean, I'm specifically telling it to track them elsewhere.

But how can I take advantage of the built in HTML5 validation? i.e. required and pattern
