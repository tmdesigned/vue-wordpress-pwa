---
title: "Wordpress Answer: Delete all href attribute in Wordpress posts"
slug: "wordpress-answer-delete-all-href-attribute-in-wordpress-posts"
date: "2019-02-22"
excerpt: "## Original question: [Delete all href attribute in Wordpress posts](http://Wordpress.StackExchange.com/q/329522) * * * ## My answer: Moving comment to answer: Did you try adding a delimiter around your regex pattern? That's what the little"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Delete all href attribute in Wordpress posts](http://Wordpress.StackExchange.com/q/329522)

* * *

## My answer:

Moving comment to answer:

Did you try adding a delimiter around your regex pattern? That's what the little note on the bottom of your screenshot says. So for instance, /\]_\>(._?)</a>/ , noting the added slashes. (Since this is replacing stuff in your database, let me say, use at your own risk.)
