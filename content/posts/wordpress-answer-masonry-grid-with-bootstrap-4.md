---
title: "Wordpress Answer: Masonry grid with bootstrap 4"
slug: "wordpress-answer-masonry-grid-with-bootstrap-4"
date: "2019-02-18"
excerpt: "## Original question: [Masonry grid with bootstrap 4](http://Wordpress.StackExchange.com/q/329080) * * * ## My answer: You are blending the Bootstrap framework and the Masonry.js library, but asking for help troubleshooting the resulting CS"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Masonry grid with bootstrap 4](http://Wordpress.StackExchange.com/q/329080)

* * *

## My answer:

You are blending the Bootstrap framework and the Masonry.js library, but asking for help troubleshooting the resulting CSS on WordPress StackExchange.

You'll have better luck on Stack Overflow :) This isn't really a WordPress question.

I will say I do notice something odd about your code which is that whatever you're trying to do with the $widths array doesn't make sense to me. When you call array\_shift, it gives you the first item of the array -- and the array is thereafter shortened. So the first time you call it you get 3, then 4, then 5, then nothing ever again, and depending on how many posts you are getting, you're calling it a lot.
