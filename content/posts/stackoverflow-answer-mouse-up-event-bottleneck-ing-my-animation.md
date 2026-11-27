---
title: "StackOverflow Answer: Mouse Up event bottleneck-ing my animation?"
slug: "stackoverflow-answer-mouse-up-event-bottleneck-ing-my-animation"
date: "2017-09-27"
excerpt: "## Original question: [Mouse Up event bottleneck-ing my animation?](http://StackOverflow.com/q/46449128) * * * ## My answer: I have a modal window gallery coded by hand, and the performance when loading and unloading the modal is very slow "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Mouse Up event bottleneck-ing my animation?](http://StackOverflow.com/q/46449128)

* * *

## My answer:

I have a modal window gallery coded by hand, and the performance when loading and unloading the modal is very slow (down to 1-2 FPS) which is very noticeable. That's without transitions; just setting display to none.

I did a performance review, and that's what leads me to my question. When closing the modal, it took 500ms to hide, of which 300ms is "Other". The only other I can find is the Mouse Up event.

Should this take that long (i.e. run the duration of the script it triggers)? Any other ideas what the bottleneck could be if Scripting, Rendering, and Painting is not the issue judging by their times?[![enter image description here](https://i.stack.imgur.com/VlnEl.jpg)](https://i.stack.imgur.com/VlnEl.jpg)
