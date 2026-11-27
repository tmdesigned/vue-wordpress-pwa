---
title: "StackOverflow Answer: JavaScript function calls are not working inside table dropdown when ReactDOMServer and innerHTML are used"
slug: "stackoverflow-answer-javascript-function-calls-are-not-working-inside-table-dropdown-when-reactdomserver-and-innerhtml-are-used"
date: "2020-02-16"
excerpt: "## Original question: [JavaScript function calls are not working inside table dropdown when ReactDOMServer and innerHTML are used](http://StackOverflow.com/q/60246367) * * * ## My answer: You are using `ReactDOMServer.renderToString` on tha"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JavaScript function calls are not working inside table dropdown when ReactDOMServer and innerHTML are used](http://StackOverflow.com/q/60246367)

* * *

## My answer:

You are using `ReactDOMServer.renderToString` on that chunk of code that includes your event listeners.

As the name suggests, `renderToString` gives you plain HTML, so the event handlers won't work as written.

Have a look at a similar question [React.js Serverside rendering and Event Handlers](https://stackoverflow.com/questions/36233309/react-js-serverside-rendering-and-event-handlers)
