---
title: "StackOverflow Answer: currentValue.indexOf is not a function at getValueForCheckbox in Formik"
slug: "stackoverflow-answer-currentvalue-indexof-is-not-a-function-at-getvalueforcheckbox-in-formik"
date: "2020-01-22"
excerpt: "## Original question: [currentValue.indexOf is not a function at getValueForCheckbox in Formik](http://StackOverflow.com/q/59859300) * * * ## My answer: We can't see your \"data\", which would be helpful, but in short, the library you are usi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [currentValue.indexOf is not a function at getValueForCheckbox in Formik](http://StackOverflow.com/q/59859300)

* * *

## My answer:

We can't see your "data", which would be helpful, but in short, the library you are using for your form is expecting indexOf() to work on the value of the checkbox, but it is not.

Your code is written to suggest "data" has a day\_of\_week array and a periods array, and that the periods array _items_ are themselves iterable (i.e. arrays, strings, etc.) with at least one value each. When you write the \[0\] in there, you are making a promise that it has at least one value. And the form library you are using is _also_ expecting that the value will have an indexOf property, which it would automatically if it were a string or array.

I suspect that `time`, which is pointing at each item in your `periods` array, is undefined, or an empty array or string, or it is of some type where saying \[0\] on it doesn't make sense. And if it does make sense, whatever it has there (at time\[0\]) is probably undefined.
