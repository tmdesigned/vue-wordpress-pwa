---
title: "Wordpress Answer: Theme causing SSL break on chrome"
slug: "wordpress-answer-theme-causing-ssl-break-on-chrome"
date: "2019-02-08"
excerpt: "## Original question: [Theme causing SSL break on chrome](http://Wordpress.StackExchange.com/q/328003) * * * ## My answer: Google has marked matx.coderpixel.com as a phishing site. That's not your domain, of course. However you are using re"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Theme causing SSL break on chrome](http://Wordpress.StackExchange.com/q/328003)

* * *

## My answer:

Google has marked matx.coderpixel.com as a phishing site. That's not your domain, of course. However you are using resources from that site.

Specifically you are using several images from matx.coderpixel.com/wp/wp-content/uploads/2016/04, including android\_phone.jpg, cloudy\_hill.jpg, desk.jpg, keyboard.jpg, and man\_with\_ipad.jpg.

It is a bad (and unless you have the rights to use these images, illegal) practice to serve images off of someone else's site. If you choose to anyways, **one** of the risks is, apparently, that the site you are using will get Google blacklisted and your site will bear the warning as well.

TL;DR remove those images from your site.
