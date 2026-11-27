---
title: "Wordpress Answer: Specific custom child theme page"
slug: "wordpress-answer-specific-custom-child-theme-page"
date: "2019-02-09"
excerpt: "## Original question: [Specific custom child theme page](http://Wordpress.StackExchange.com/q/328188) * * * ## My answer: You have the right idea. Your child theme's copy of front-page.php will take precedence over the parent theme's, with "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Specific custom child theme page](http://Wordpress.StackExchange.com/q/328188)

* * *

## My answer:

You have the right idea.

Your child theme's copy of front-page.php will take precedence over the parent theme's, with no danger of it being overwritten by updates to the theme.

You will want to make sure to also create an actual page in WordPress to represent that page, and that on the WordPress -> Settings -> Reading page in the admin interface you specify that page to use as your front page. Then that page will automatically use your front-page.php for its template (otherwise it will default to showing a page of posts, i.e. home.php).

If you run into any problems feel free to post, but you are well ahead of the average WordPress first timer and are clearly thinking carefully ahead. Good job.

Edit: By the way, I would not completely remove the get\_footer() call from that file. WordPress and other plugins have a general assumption that you're going to call the header and footer function and may use them to, for instance, add script dependencies. What you can do instead is specify a specific footer _template file_ to use, i.e. get\_footer( 'blank' ) which will look for footer-blank.php. Create the file but keep it minimal. You'll want to at least close out any open HTML elements. But you don't have to do anything else with it. The same practice goes with the header, although there you'll at least want to do some basic framing structure for your HTML.
