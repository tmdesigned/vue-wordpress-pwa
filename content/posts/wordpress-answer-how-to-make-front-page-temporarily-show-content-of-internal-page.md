---
title: "Wordpress Answer: How to make front page temporarily show content of internal page"
slug: "wordpress-answer-how-to-make-front-page-temporarily-show-content-of-internal-page"
date: "2019-03-23"
excerpt: "## Original question: [How to make front page temporarily show content of internal page](http://Wordpress.StackExchange.com/q/332387) * * * ## My answer: If you want both a posts loop and ACF fields on a page, I _believe_ you need to have a"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to make front page temporarily show content of internal page](http://Wordpress.StackExchange.com/q/332387)

* * *

## My answer:

If you want both a posts loop and ACF fields on a page, I _believe_ you need to have a real page for it, put a loop on it, and then designate that as your front page. It sounds like you already have this page set up. Select it as your front page.

You will temporarily not be using the posts page setting, so it does not need to be set to "blog". Someone is free to correct me if I'm wrong, but putting a page there mostly changes it's template hierarchy to look for home.php.
