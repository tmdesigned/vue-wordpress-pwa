---
title: "Wordpress Answer: Javascript error when adding an item to the cart"
slug: "wordpress-answer-javascript-error-when-adding-an-item-to-the-cart"
date: "2019-02-12"
excerpt: "## Original question: [Javascript error when adding an item to the cart](http://Wordpress.StackExchange.com/q/328453) * * * ## My answer: The error I believe you are talking about when adding an item says: ``` Uncaught TypeError: $.parseHTM"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Javascript error when adding an item to the cart](http://Wordpress.StackExchange.com/q/328453)

* * *

## My answer:

The error I believe you are talking about when adding an item says:

```
Uncaught TypeError: $.parseHTML is not a function
```

Get ready to talk version numbers!

In this case $ is referring to the jQuery library.

jQuery.parseHTML was added in jQuery version 1.8. As it so happens, your site is currently using jQuery 1.7.2.

Since jQuery version numbers come up a lot with WordPress dev (imho), it's worth knowing how to check it. In your browser console, just type jQuery.fn.jquery and see what the answer is.

Caveat: sometimes people end up with multiple copies of jQuery on their site. You can try both jQuery.fn.jquery and $.fn.jquery and see if they're the same version. Even then you can't be sure you don't have multiple jQuery's.

So anyways, the issue is you have an old version of jQuery. That version of jQuery hasn't shipped with WordPress since WordPress 3.4. So either you have an old version of WordPress on the site and should upgrade it, or you (or a plugin you are using) are switching out the jQuery library in use on your site.

TL;DR update jQuery on your site, probably by updating WordPress.
