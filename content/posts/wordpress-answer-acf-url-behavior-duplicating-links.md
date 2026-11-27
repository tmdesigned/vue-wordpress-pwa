---
title: "Wordpress Answer: ACF URL behavior, duplicating links"
slug: "wordpress-answer-acf-url-behavior-duplicating-links"
date: "2019-03-22"
excerpt: "## Original question: [ACF URL behavior, duplicating links](http://Wordpress.StackExchange.com/q/332297) * * * ## My answer: It's actually an HTML issue, not an ACF one. You can't have nested \"a\" tags. If you do, browsers try to rationalize"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [ACF URL behavior, duplicating links](http://Wordpress.StackExchange.com/q/332297)

* * *

## My answer:

It's actually an HTML issue, not an ACF one.

You can't have nested "a" tags.

If you do, browsers try to rationalize things by closing them for you and generally making a mess of what you were trying to do.

You probably don't need the inner one anyways, the whole element is going to be clickable.
