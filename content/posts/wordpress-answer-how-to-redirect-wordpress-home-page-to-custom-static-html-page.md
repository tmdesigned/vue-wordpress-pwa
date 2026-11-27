---
title: "Wordpress Answer: How to redirect Wordpress home page to custom static HTML page"
slug: "wordpress-answer-how-to-redirect-wordpress-home-page-to-custom-static-html-page"
date: "2019-03-09"
excerpt: "## Original question: [How to redirect Wordpress home page to custom static HTML page](http://Wordpress.StackExchange.com/q/331121) * * * ## My answer: WordPress relies on all WordPress requests being routed to index.php, which kicks off th"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to redirect Wordpress home page to custom static HTML page](http://Wordpress.StackExchange.com/q/331121)

* * *

## My answer:

WordPress relies on all WordPress requests being routed to index.php, which kicks off the whole WordPress lifecycle and then serves up the proper page, content, etc. (This is true for everything except requests to other real, existing files, like images and external pages that don't need WordPress.)

If you want your custom page to be the home page of your site, but live within WordPress (which is usually the case), then you need to operate within WordPress's world. That means you don't just stick a file in your directory, and you certainly don't replace WordPress's index.php file.

Instead, you create a page template and a page within WordPress to use it. Basically:

1.  Create a page in WordPress
2.  On your WordPress dashboard, go to Settings -> Reading and for Front Page choose the page you created
3.  In your site's directory, name your file front-page.php
4.  In front-page.php, at a minimum, put the PHP calls to get\_header() before your content, and get\_footer() after your content

With those steps, WordPress will capture all requests to your home page, and serve the page you created (in step 1) using the template you created (in steps 3 & 4). You can then go further and store front page content (i.e. content, meta data, etc.) on that WordPress page, and pull it into your page template dynamically.
