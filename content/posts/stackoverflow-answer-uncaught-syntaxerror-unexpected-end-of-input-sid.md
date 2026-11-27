---
title: "StackOverflow Answer: Uncaught SyntaxError: Unexpected end of input - sid"
slug: "stackoverflow-answer-uncaught-syntaxerror-unexpected-end-of-input-sid"
date: "2020-01-25"
excerpt: "## Original question: [Uncaught SyntaxError: Unexpected end of input - sid](http://StackOverflow.com/q/59908913) * * * ## My answer: The formatting of your question is a little messed up, but it appears you have two adjacent `jQuery documen"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Uncaught SyntaxError: Unexpected end of input - sid](http://StackOverflow.com/q/59908913)

* * *

## My answer:

The formatting of your question is a little messed up, but it appears you have two adjacent `jQuery document.ready` code blocks. The first one, however, is not properly terminated. If you add a `});` after the first block (i.e. right before the _second_ `jQuery(document).ready(function ($)`) then the brackets and parentheses all line up.

*   **Syntax Error**: your code syntax is messed up, i.e. you arent following the rules of the language
    
*   **Unexpected End of Input**: the syntax parser was expecting to see something closed out, that wasn't (i.e. a `}` )
