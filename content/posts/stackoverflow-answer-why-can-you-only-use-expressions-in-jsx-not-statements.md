---
title: "StackOverflow Answer: Why can you only use expressions in JSX, not statements?"
slug: "stackoverflow-answer-why-can-you-only-use-expressions-in-jsx-not-statements"
date: "2020-04-02"
excerpt: "## Original question: [Why can you only use expressions in JSX, not statements?](http://StackOverflow.com/q/60988649) * * * ## My answer: Let's start conceptually. What are the definitions of statement vs expression? **A statement does some"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why can you only use expressions in JSX, not statements?](http://StackOverflow.com/q/60988649)

* * *

## My answer:

Let's start conceptually. What are the definitions of statement vs expression?

**A statement does something. An expression evaluates to a value.**

JSX is meant to be built up and passed around from one segment of your code to another, eventually ending up as HTML. The name even suggests this "JavaScript to XML" conversion.

The whole point of it is to return a "value" of HTML nodes. JSX kindly allows for expressions, because those help you determine values.

Perhaps it will help to take a closer look at the difference between a ternary expression and an if/else.

If/Else

```
if(isSaturday){
   wakeUpHour = 10;
}else{
   wakeUpHour = 7;
}
```

Ternary

```
wakeUpHour = isSaturday ? 10 : 7;
```

Those both accomplish the same thing, right? But under the hood they are operating differently. In English, the if/else might read:

1.  If the value of 'isSaturday' is truthy, run the code inside the curly braces
2.  Assign the number 10 to 'wakeUpHour'
3.  Otherwise, run the code inside the next curly brace
4.  Assign the number 7 to to 'wakeUpHour'

The ternary statement also has two parts:

1.  If isSaturday is truthy, have a value of 10. Otherwise have a value 7.
2.  Assign this value to 'wakeUpHour'

We think of those as accomplishing the same thing. The key point here is that the **ternary expression itself is just a value**. It's not lines of codes. To _do something_ with that value required another part, assigning it.

In JSX, we don't want to be assigning things. We want values. So we are just taking the ternary expression (a value), not the assignment part or any other code statements.

Finally, and hopefully not to add to your confusion, I would note that you _can_ define functions in JSX.

```
const myJSX = <button onClick={ () => { return 'hello'; } }>Say hello</button>
```

Wait, what? I thought we couldn't execute lines of code. It's not executing the lines of code, it's defining them; it's rendered to:

```
var myJSX = React.createElement("button", {onClick: () => {
  return 'hello';
}}, "Say hello");
```

Compare that with trying to just throw in an if/else statement:

```
const myJSX = <span>{ if(true){ return 'hello'; } }</span>
```

Which would try to render as:

```
var myJSX = React.createElement("span", null, if(true){ return 'hello' });
```

That doesn't work, for the same reason that you can't normally pass an unencapsulated chunk of code into an argument of a function.
