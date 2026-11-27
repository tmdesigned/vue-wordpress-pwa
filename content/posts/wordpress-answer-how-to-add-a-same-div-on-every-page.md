---
title: "Wordpress Answer: How to add a same div on every page"
slug: "wordpress-answer-how-to-add-a-same-div-on-every-page"
date: "2019-02-18"
excerpt: "## Original question: [How to add a same div on every page](http://Wordpress.StackExchange.com/q/329107) * * * ## My answer: If a child theme does not have a file (i.e. page.php), WordPress looks in the parent theme for that file. That's mu"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to add a same div on every page](http://Wordpress.StackExchange.com/q/329107)

* * *

## My answer:

If a child theme does not have a file (i.e. page.php), WordPress looks in the parent theme for that file. That's much of the reason for how child themes exist - to override specific content of the parent, but not to override anything else.

So in this case you are wanting to add an additional override. You could go copy page.php from the parent to the child and then modify it as you wish; for instance, by adding a div to the bottom of it.

There are other ways to add content to each page, for instance you could tie in to the wp\_footer hook. However copying the parent theme's file you wish to modify to your child theme and making the change there is probably the most fundamental way of using child themes, and will allow you the most flexibility going forward, so that's where I would suggest doing it.
