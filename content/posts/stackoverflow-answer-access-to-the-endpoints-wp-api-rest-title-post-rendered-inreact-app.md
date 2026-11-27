---
title: "StackOverflow Answer: access to the endpoints wp api rest title post rendered inreact app"
slug: "stackoverflow-answer-access-to-the-endpoints-wp-api-rest-title-post-rendered-inreact-app"
date: "2020-01-22"
excerpt: "## Original question: [access to the endpoints wp api rest title post rendered inreact app](http://StackOverflow.com/q/59850755) * * * ## My answer: In principle, what you have shown should work. The response of that WP API endpoint does in"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [access to the endpoints wp api rest title post rendered inreact app](http://StackOverflow.com/q/59850755)

* * *

## My answer:

In principle, what you have shown should work. The response of that WP API endpoint does include:

```
"title": {
    "rendered": "Your post's title"
},
```

This is backed up by your console.log output.

You haven't shown your default state, where your console.log output is written, or where you are trying to access the full path (i.e. `{this.state.item.title.rendered}`), but it sounds like you are doing at least the full path part in the render function.

Assuming so, I believe what you have is a timing issue. The render function may run as many times as it needs to (i.e. when the component updates). The first time it runs, your state does _not_ have the title property yet, as your HTTP request is not yet complete. It's undefined, and when you try to access a child property of undefined, you get that error.

The difference with your earlier console statement is you aren't trying to access a property of undefined. You are just outputting the state's value itself (i.e., undefined). And one **very tricky thing about the console** is that it's not a historical record. A value that a console.log shows can change...say from 'undefined' to the value that gets set there later, title property and all. It all happens so fast that you don't see this.

It's best to keep in mind that the render() function may run over and over again, and your JSX needs to be written in such a way that it accounts for the possible states you expect. Here, you can expect that initially your state for "item" does not have all the properties that it will have later.

You could instead write something like,

```
{this.state.item.title ? this.state.item.title.rendered : 'Loading...'} 
```

Or whatever else you'd like to write there (or leave it blank, etc.). So you are first checking to see if title has a truthy value (_not_ undefined), and if so, accessing the child's property. A common pattern is to use this form:

```
{this.state.item.title && (<h1>{this.state.item.title.rendered}</h1>)}
```

Here the difference is we are relying on JavaScript's return value for &&, which will be the second item's value. If the first item is falsy, it doesn't even look at the second part, so it doesn't complain.

Or, you may try to take a step back and track a separate variable in state for your loading process. Something like `dataReady`, which you would set to true once you receive the HTTP request back. Then, your render code looks a bit cleaner:

```
{this.state.dataReady && (
    <h1>{this.state.item.title.rendered}</h1>
    <h2>(some other stuff</h2>
)}
```

For more information, I recommend you read about [conditional rendering](https://reactjs.org/docs/conditional-rendering.html).
