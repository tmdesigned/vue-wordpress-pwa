---
title: "StackOverflow Answer: how to hide modal with jquery?"
slug: "stackoverflow-answer-how-to-hide-modal-with-jquery"
date: "2020-02-02"
excerpt: "## Original question: [how to hide modal with jquery?](http://StackOverflow.com/q/60027935) * * * ## My answer: You didn't say what your `if` expression needs to be, so I'm not addressing that, but to hide something with jQuery you can just"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [how to hide modal with jquery?](http://StackOverflow.com/q/60027935)

* * *

## My answer:

You didn't say what your `if` expression needs to be, so I'm not addressing that, but to hide something with jQuery you can just use `.hide()` on the element you select.

`$('#inlineForm1').hide();`

Behind the scenes, this adds `style="display:none"` to the element, and the opposite, `.show()` removes this. Knowing this, you can also override the behavior with CSS or start it in one state or the other.
