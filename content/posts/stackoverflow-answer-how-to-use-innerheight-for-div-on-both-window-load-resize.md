---
title: "StackOverflow Answer: How to use innerHeight for div on both window load & resize?"
slug: "stackoverflow-answer-how-to-use-innerheight-for-div-on-both-window-load-resize"
date: "2019-01-13"
excerpt: "## Original question: [How to use innerHeight for div on both window load & resize?](http://StackOverflow.com/q/54168155) * * * ## My answer: It's a little unclear exactly how you want the items aligned, but based on what you said it seems "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to use innerHeight for div on both window load & resize?](http://StackOverflow.com/q/54168155)

* * *

## My answer:

It's a little unclear exactly how you want the items aligned, but based on what you said it seems like you want the .content and the .character to be vertically center aligned with each other.

In your snippet you have both of them absolutely positioned. If that's the way you want to go, you can just ignore their margins and JavaScript in general with this little vertical centering trick applied to both:

```
top: 50%;
transform: translateY( -50% );
```

The first line says "Put the top of this element 50% of the way down the element that it's positioned based on." Since it goes by the _top_, the second line says "Scoot me back up 50% of my height." That's just the way those CSS properties work -- the "top" % is about its parent, and the translateY % is about itself.

Since both of your elements would be vertically centered in their parent, they'd be aligned.

[https://jsfiddle.net/qowxezpy/](https://jsfiddle.net/qowxezpy/)

**HOWEVER** if you don't need the elements to overlap like they do in this example (which I think looks nice and modern) there's a much easier way, using flex.

The parent would get:

```
display: flex;
align-items: center;
```

And the two children get:

```
flex-basis: 50%; //just to give them some width, since one is empty
```
