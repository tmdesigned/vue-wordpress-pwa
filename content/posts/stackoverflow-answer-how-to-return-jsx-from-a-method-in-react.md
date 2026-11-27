---
title: "StackOverflow Answer: How to return JSX from a method in React?"
slug: "stackoverflow-answer-how-to-return-jsx-from-a-method-in-react"
date: "2020-02-19"
excerpt: "## Original question: [How to return JSX from a method in React?](http://StackOverflow.com/q/60290836) * * * ## My answer: In JavaScript, when you write: `return {greeting}` ...what you are saying is \"return an object, with a property named"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to return JSX from a method in React?](http://StackOverflow.com/q/60290836)

* * *

## My answer:

In JavaScript, when you write:

`return {greeting}`

...what you are saying is "return an object, with a property named 'greeting', which is set to value of the variable `greeting`"

The last part of that, where the value is set, is an ES6 shortcut, essentially replacing `{ "greeting": greeting }` with `{greeting}` for brevity's sake.

In other words, you are currently returning an object with a single property, "greeting", which is basically what your error message says. What you are returning is:

```
{
    "greeting": <h1>Hello ... </h1>
}
```

What you want to return is:

```
<h1>Hello ... </h1>
```

Since your `greeting` const is valid JSX, you can just return it directly! i.e. `return greeting;`
