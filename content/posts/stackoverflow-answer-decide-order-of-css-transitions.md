---
title: "StackOverflow Answer: Decide order of CSS Transitions"
slug: "stackoverflow-answer-decide-order-of-css-transitions"
date: "2020-02-12"
excerpt: "## Original question: [Decide order of CSS Transitions](http://StackOverflow.com/q/60176713) * * * ## My answer: It sounds like what you want is for the arrow to disappear, but not to rotate back to its starting orientation as it disappears"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Decide order of CSS Transitions](http://StackOverflow.com/q/60176713)

* * *

## My answer:

It sounds like what you want is for the arrow to disappear, but not to rotate back to its starting orientation as it disappears.

Since you are handling and tracking all this with React state, you could just set those two states separately, timed .3s apart (since that is your CSS transition time).

You could do this in a number of ways. To demonstrate it, in this fork of your example I have you just setting the on/off visibility to off, and then separately, in componentDidUpdate, I have it watching for whenever it's turned off, at which point it waits 300ms (.3s) and then sets the rotate state back.

```
componentDidUpdate(oldProps, oldState) {
    if (oldState.showCaret && !this.state.showCaret) {
      //it was just hidden
      setTimeout(() => {
        this.setState({
          flipped: false
        });
      }, 300);
    }
}
```

[https://codesandbox.io/s/sparkling-pine-9igec](https://codesandbox.io/s/sparkling-pine-9igec)

**EDIT, with CSS only solution**

[https://codesandbox.io/s/pensive-wilbur-opxzf](https://codesandbox.io/s/pensive-wilbur-opxzf)

```
/* flipped taking care of rotating the img tag */
.image {
  transition: transform 0.3s linear 2s;
}
.flipped {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
```
