---
title: "StackOverflow Answer: Wordpress custom menu for each user?"
slug: "stackoverflow-answer-wordpress-custom-menu-for-each-user"
date: "2020-01-25"
excerpt: "## Original question: [Wordpress custom menu for each user?](http://StackOverflow.com/q/59908758) * * * ## My answer: This is not a built-in feature, but yes, this would be possible on a custom WordPress site (i.e. WordPress.org, not WordPr"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Wordpress custom menu for each user?](http://StackOverflow.com/q/59908758)

* * *

## My answer:

This is not a built-in feature, but yes, this would be possible on a custom WordPress site (i.e. WordPress.org, not WordPress.com), and there are a lot of different ways you could structure it.

It would not be trivial to implement, however.

My initial approach would be to have an actual WordPress menu hold all possible items, and then store user preferences as to which of the items are shown or hidden. On their user profile edit page, you could output the menu items as a checkbox list, and then store their selection as a user option. On the rest of the site, when you output the menu, you'd first pull that user option, then output the menu items manually one at a time if they have the option for that item checked.

There are of course other ways, but they would be similarly complex -- well beyond copying and pasting a code snippet, or me typing up a solution for you here.
