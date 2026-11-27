---
title: "Wordpress Answer: Build a one-page navigation within a non-one-page tthemeâ€šÃ„Â¶"
slug: "wordpress-answer-build-a-one-page-navigation-within-a-non-one-page-tthemea%c2%b6"
date: "2019-03-02"
excerpt: "## Original question: [Build a one-page navigation within a non-one-page tthemeâ€šÃ„Â¶](http://Wordpress.StackExchange.com/q/330458) * * * ## My answer: You can do exactly what you suggest. You do not need to create a separate menu or chang"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Build a one-page navigation within a non-one-page tthemeâ€šÃ„Â¶](http://Wordpress.StackExchange.com/q/330458)

* * *

## My answer:

You can do exactly what you suggest. You do not need to create a separate menu or change the php of a page template.

If you add IDs like you suggested as anchors, then your menu items can just specifically target those IDs via the # sign.

To control the link to this degree, you will need to add "Custom links" instead of just selecting the page from the list.

Example Page: (domain.com/about-us/)

Item on example page : `<h2 id="history">History</h2>`

Menu item: Custom link pointed to domain.com/about-us/#history
