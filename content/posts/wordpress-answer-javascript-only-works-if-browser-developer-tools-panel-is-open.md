---
title: "Wordpress Answer: Javascript only works if browser Developer Tools panel is open"
slug: "wordpress-answer-javascript-only-works-if-browser-developer-tools-panel-is-open"
date: "2019-02-15"
excerpt: "## Original question: [Javascript only works if browser Developer Tools panel is open](http://Wordpress.StackExchange.com/q/328826) * * * ## My answer: This is really more of a JavaScript question than a WordPress question. You just happen "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Javascript only works if browser Developer Tools panel is open](http://Wordpress.StackExchange.com/q/328826)

* * *

## My answer:

This is really more of a JavaScript question than a WordPress question. You just happen to be running it on a WordPress hook. In the future you will have better luck posting this type of question on StackOverflow.

However, I will note that document.querySelectorAll is not a live updating list. When you call it, it queries the DOM and then it's done. And since it's the first line in your init() function, before you have added any "fodder" classes, it's going to return nothing. In other words, first do addClass(), _then_ do the query selector for them.
