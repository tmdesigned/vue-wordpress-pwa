---
title: "StackOverflow Answer: React component rerenders when sending function as props to it"
slug: "stackoverflow-answer-react-component-rerenders-when-sending-function-as-props-to-it"
date: "2020-03-05"
excerpt: "## Original question: [React component rerenders when sending function as props to it](http://StackOverflow.com/q/60548844) * * * ## My answer: When you send a function like you are, you are creating an anonymous function that is re-created"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React component rerenders when sending function as props to it](http://StackOverflow.com/q/60548844)

* * *

## My answer:

When you send a function like you are, you are creating an anonymous function that is re-created each time the parent component renders:

```
startExam={() => this.startExam()}
```

That's an anonymous function, whose whole purpose in life is to call the actual function `startExam`. It's being defined right here in the render function of the parent, so it's re-created each time. You can alternatively just send that function down itself, i.e.

```
startExam={this.startExam}
```

In this case the prop now references a stable function that is not getting recreated every time. I imagine that will fix your problem.

However, it's not entirely clear to me why it matters that the function is being recreated every time and your child component is re-rendering. The props aren't changing an infinite amount of time, but rather only when the parent is rerendering. That's usually not a problem, unless you are basing some other action to see if the previous props have changed (like with lodash, `_.isEqual(prevProps,this.props)`).
