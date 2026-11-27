---
title: "Wordpress Answer: load more button in plugin"
slug: "wordpress-answer-load-more-button-in-plugin"
date: "2019-02-10"
excerpt: "## Original question: [load more button in plugin](http://Wordpress.StackExchange.com/q/328256) * * * ## My answer: If you want it to work like a true \"load more\" button, then you are going to have to let the posts load in groups without th"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [load more button in plugin](http://Wordpress.StackExchange.com/q/328256)

* * *

## My answer:

If you want it to work like a true "load more" button, then you are going to have to let the posts load in groups without the user changing pages. This means you have to use an AJAX method. This is much more complicated than the WordPress loop you have right now.

Overall it works like this, with your code split into 2 parts:

**A. Code that displays results**

1.  Request up to 10 results via AJAX (or another number)
2.  When they load, show them on the screen.
3.  If there are more results available, show a "load more" button
4.  If the user hits load more, go back to step 1

**B. Code that fetches results**

1.  Look at which results were requested (which page)
2.  Echo out the results

So your code that does **A.** above and your code that does **B.** above live in different places.

The **A** code is more or less what you have in the cryptoevent\_addform function you wrote. It would be very different from what you have, but basically that is handling the _front-end_. The main difference is instead of getting the posts via WP\_QUERY and PHP, it would be getting them via a JavaScript AJAX request, through the the WordPress AJAX system, to your **B** code.

The **B** code handles the _back-end_. It can also live in your plugin, but would need to be registered through the WordPress AJAX API.

Why do we have to do this? The normal flow of a page is (1) Backend (PHP/mySQL/etc), then (2) Frontend (HTML/JavaScript/etc.). But here we have to flip the order. You are letting a user (front-end) fetch posts from your database (back-end), without them having to reload a page. So to flip the order, we have to separate your code into the 2 parts and then use AJAX to start the page flow over.

You'll want to look at how to structure a WordPress AJAX call, which is more than we can cover in a Stack Exchange answer. [See the documentation.](https://codex.wordpress.org/AJAX_in_Plugins)
