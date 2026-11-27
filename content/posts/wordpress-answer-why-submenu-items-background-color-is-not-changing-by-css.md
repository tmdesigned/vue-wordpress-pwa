---
title: "Wordpress Answer: Why submenu item's background color is not changing by css?"
slug: "wordpress-answer-why-submenu-items-background-color-is-not-changing-by-css"
date: "2019-03-02"
excerpt: "## Original question: [Why submenu item's background color is not changing by css?](http://Wordpress.StackExchange.com/q/330459) * * * ## My answer: CSS is a game of competing priorities. When two rules conflict, whichever one has the highe"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why submenu item's background color is not changing by css?](http://Wordpress.StackExchange.com/q/330459)

* * *

## My answer:

CSS is a game of competing priorities. When two rules conflict, whichever one has the higher specificity wins.

If you have these rules and something is not affected by it, then something else has a higher specificity.

Since you have specified the !important tag, whatever is trumping you is also using the !important tag. Then it is trumping you by also having a higher specificity in another way (or even just by coming after yours).

You need to inspect the element and find out the source of your competition, then write a rule to trump it.

The difficulty in trumping !important tags is the precise reason they are absolutely not recommended.

No one else can diagnose this further without seeing the actual page where it is happening (since you don't know where the other style rules are coming from).
