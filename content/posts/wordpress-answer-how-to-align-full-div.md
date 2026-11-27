---
title: "Wordpress Answer: How to align full div"
slug: "wordpress-answer-how-to-align-full-div"
date: "2019-01-20"
excerpt: "## Original question: [How to align full div](http://Wordpress.StackExchange.com/q/326169) * * * ## My answer: The main issue you are running into is that you are targeting the wrong element. The parent of .un-post-scoller is what has a lim"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to align full div](http://Wordpress.StackExchange.com/q/326169)

* * *

## My answer:

The main issue you are running into is that you are targeting the wrong element. The parent of .un-post-scoller is what has a limited width aligned to the left, so you won't escape that easily.

Instead, target its parent. Unfortunately there is not a particularly clean candidate here since the parent is a generic grid system class (col-md-5). Usually you want to use the grid system's class to move things over -- in the case of Bootstrap, that would be offset-md-7 (or slightly different depending on your version and which grid system you use).

That requires modifying the actual HTML. Since you asked specifically for how to do it with CSS, you might try something like:

```
.header-overlay-scroller .col-md-5 {
    float: right;
}
```

The header-overlay-scroller is just there so that not **all** .col-md-5 classes are targeted.
