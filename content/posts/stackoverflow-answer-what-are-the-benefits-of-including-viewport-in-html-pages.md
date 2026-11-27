---
title: "StackOverflow Answer: What are the benefits of including viewport in HTML pages?"
slug: "stackoverflow-answer-what-are-the-benefits-of-including-viewport-in-html-pages"
date: "2020-09-29"
excerpt: "## Original question: [What are the benefits of including viewport in HTML pages?](http://StackOverflow.com/q/64109497) * * * ## My answer: Essentially, web sites have become more complex as more and more different types of devices access i"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [What are the benefits of including viewport in HTML pages?](http://StackOverflow.com/q/64109497)

* * *

## My answer:

Essentially, web sites have become more complex as more and more different types of devices access it. You can no longer expect the user to have a 4:3 ratio screen, or even a 1:1 ratio between pixels on the device and CSS pixels.

Devices, for their part, can't assume a web page will be properly formatted for their type of screen.

The `viewport` meta tag acts as a bridge between all this, allowing the page to suggest to the device a few things about how the content should be shown.

For instance, the `width=device-width` instruction tells the browser, "render the width of this page as the width of your screen". In other words, don't render the page wider than the devicr and then zoom out and try to fit all of this on the screen as if it were a page that wasn't formatted for mobile devices (a behavior it would otherwise do to accommodate older, non-responsive pages that would be cut off).

So without that line, the behavior you will most likely see is the phone or small screened device displaying the page as if it were not designed for a mobile screen. It would instead render it wider and zoomed out, because it can't assume the page can accommodate the screen ratio properly.

There are other settings, such as the initial zoom, that you can use, but the line as you have it in your answer is by far the most common implementation and works well for most cases.

[W3 Reference](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
