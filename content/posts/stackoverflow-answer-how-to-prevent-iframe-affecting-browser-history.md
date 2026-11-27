---
title: "StackOverflow Answer: How to prevent iframe affecting browser history"
slug: "stackoverflow-answer-how-to-prevent-iframe-affecting-browser-history"
date: "2018-05-05"
excerpt: "## Original question: [How to prevent iframe affecting browser history](http://StackOverflow.com/q/27341498) * * * ## My answer: I think there is something else in your code that we're not seeing, because .contentWindow.location.replace wor"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to prevent iframe affecting browser history](http://StackOverflow.com/q/27341498)

* * *

## My answer:

I think there is something else in your code that we're not seeing, because .contentWindow.location.replace works in my testing.

[https://codepen.io/tmdesigned/pen/WJEqON](https://codepen.io/tmdesigned/pen/WJEqON)

I also tried that on a blank html page outside of codePen, thinking the codepen editor was affecting the outcome. It continued to work.

I've pasted it as a snippet below for the code, although I don't think SO allows iFrames to work.

```
$( 'html' ).on( 'click', '.change-iframe', function() {
    $( '#dynamic-iframe' )[0].contentWindow.location.replace( $( this ).data( 'src' ) );
});
```

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<iframe id="dynamic-iframe" width="560" height="315" src="https://www.youtube.com/embed/XlqoPpLMdwY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> 

<div>
    <button class="change-iframe" data-src="https://www.youtube.com/embed/0RIrdFfy9t4">Another</button>
    <button class="change-iframe" data-src="https://www.youtube.com/embed/QMQbAoTLJX8">Another</button>
    <button class="change-iframe" data-src="https://www.youtube.com/embed/wppBd-52LT0">Another</button>
</div>
```
