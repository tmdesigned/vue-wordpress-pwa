---
title: "CSS, The Confusing Bits -- Part 1: Introduction"
slug: "css-the-confusing-bits-part-1-introduction"
date: "2017-09-20"
excerpt: "I've always considered CSS to be the wild factor of the 4 web design \"quadrangle\" of languages. HTML is straight up structure; the browser just works its way down and the elements simply exist without much ado. JavaScript can be tricky, but"
image: "/img/uploads/2017/09/flex-ex1.jpg"
tags:
  - "HTML5 / CSS3"
draft: false
---
I've always considered CSS to be the wild factor of the 4 web design "quadrangle" of languages. HTML is straight up structure; the browser just works its way down and the elements simply exist without much ado. JavaScript can be tricky, but really follows a process and more importantly, you can observe that process one debugger step at a time. PHP (or your server side language of choice) is a bit heavier and harder to observe, but if it's not doing what you think it should, the fault lies with you.

But CSS...CSS lives in the wild. It has such capabilities, from simple layout to amazing animations, and it's _rapidly_ developing. There's even a spec for it, and you can read (in not so pleasant terms) how each of the standards should really work. But out in the wild world of multiple browsers and differing implementations, CSS behaves in unexpected ways. A lot.

An obvious example is the flexbox display model. Take a flex container and simple element:  
\[code language="css"\] .flex-container{ min-height:15em; display:flex; align-items:center; background-color:blue; } .flex-item{ height:5em; background-color:red; flex-grow:1; } \[/code\]\[code language="html5"\] <div class="main-content"> <div class="flex-container"> <div class="flex-item"> </div> </div> </div> \[/code\]

\[caption id="attachment\_549" align="aligncenter" width="640"\]![](/img/uploads/2017/09/flex-ex1-1024x167.jpg) Ex. 1 - The red flex item is centered vertically, as it should be\[/caption\]

Yet Internet Explorer, King of All CSS Bugs, renders the red bar at the top of the flex container. Is this a missing browser prefix? A justifiably different interpretation of a standard? No, this is a known IE bug. IE renders the correct height of the flex container, but cannot calculate it correctly to center its items.

\[caption id="attachment\_550" align="aligncenter" width="640"\]![](/img/uploads/2017/09/flex-ex1b-1024x166.jpg) Ex. 1b - What gives, IE?\[/caption\]

Yet, wrap the flex container in _another_ flex container (set simply with a direction of column, thus having no other layout effects) and it all works out correctly. IE can calculate a flex _grandparent's_ height, just not a parent's.

## Moving beyond bugs

So much of CSS coding consists of learning, identifying, and remembering these bugs. Even when they're not bugs so much as they are quirks or differences, it's easy to see why CSS coding seems more like an art than a science. It's like you're wrangling a semi-tame beast that sometimes forgets it's being domesticated.

So what can we do, other than write up lists and learn from quite frustrating debugging? Well, we can learn the parts that _do_ make sense better. The more we know about how CSS "thinks" under the hood, the more we'll recognize where a browser is deviating from the norm.

A better understanding of some commonly misunderstood CSS elements will go a long way in improving our coding efficiency. In this series, I'll be looking at:

1.  [Z-indexing](https://tmdesigned.com/post/css-the-confusing-bits-part-2-z-index/)
2.  [Positioning](https://tmdesigned.com/post/css-the-confusing-bits-part-3-positioning/)
3.  Width/Height (how it grows and overflows)

## 
