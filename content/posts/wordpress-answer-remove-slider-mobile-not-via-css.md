---
title: "Wordpress Answer: remove slider mobile not via css"
slug: "wordpress-answer-remove-slider-mobile-not-via-css"
date: "2019-04-07"
excerpt: "## Original question: [remove slider mobile not via css](http://Wordpress.StackExchange.com/q/333714) * * * ## My answer: This is one of those problems that seems like it should have a simple solution, but really doesn't. There are options,"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [remove slider mobile not via css](http://Wordpress.StackExchange.com/q/333714)

* * *

## My answer:

This is one of those problems that seems like it should have a simple solution, but really doesn't. There are options, they're just not easy.

At least, from what I can see.

CSS is the best approach to detecting browser width IMO. In fact, you really can't detect browser width from PHP. You can with JavaScript but that's where the complexities come in.

Even if you could detect browser width in PHP, you wouldn't want to. What if they made their browser bigger (i.e. rotated their device)? PHP is gone by that point, and can't add it back anymore.

There is a [clever technique](https://www.swimburger.net/blog/web/web-performance-prevent-wasteful-hidden-image-requests) I read about where you use the new HTML5 image srcset to still serve an image at mobile resolution, but a very small one. However since you're using a slider, which I presume means a plug-in, you probably don't have that flexibility.

That leaves you with JavaScript. You could remove the images if the browser width is small, but you'd need to keep watching the viewport width in case it changed, and be ready to put them back. Probably better, only load them when needed (i.e. lazy load). It's possible your slider, or an alternative, would just natively give you that functionality.
