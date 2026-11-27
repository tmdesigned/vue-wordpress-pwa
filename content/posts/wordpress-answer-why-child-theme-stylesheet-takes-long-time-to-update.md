---
title: "Wordpress Answer: Why child theme stylesheet takes long time to update?"
slug: "wordpress-answer-why-child-theme-stylesheet-takes-long-time-to-update"
date: "2019-03-03"
excerpt: "## Original question: [Why child theme stylesheet takes long time to update?](http://Wordpress.StackExchange.com/q/330468) * * * ## My answer: Browsers cache stylesheets to save bandwidth. In most browsers you can hold CTRL (or CMD on a mac"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why child theme stylesheet takes long time to update?](http://Wordpress.StackExchange.com/q/330468)

* * *

## My answer:

Browsers cache stylesheets to save bandwidth. In most browsers you can hold CTRL (or CMD on a mac) and click the refresh button to force it to re-download.

In Chrome, if you have the Inspector Tools open, then you can right-click the refresh button and it will show you 3 options, "Reload", "Hard Reload", and "Empty Cache and Hard Reload."

You may also have a site caching plugin installed which would need to be cleared using its controls. In this case it would not be the browser caching the .css file, but rather the server sending the cached file.
