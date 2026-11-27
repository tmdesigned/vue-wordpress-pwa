---
title: "StackOverflow Answer: Scrollable Flex-box Child issue in IE11/Edge"
slug: "stackoverflow-answer-scrollable-flex-box-child-issue-in-ie11-edge"
date: "2018-02-09"
excerpt: "## Original question: [Scrollable Flex-box Child issue in IE11/Edge](http://StackOverflow.com/q/48709343) * * * ## My answer: There is a known bug in IE where it gets confused about heights of flex items. Basically, the flex-item can't acce"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Scrollable Flex-box Child issue in IE11/Edge](http://StackOverflow.com/q/48709343)

* * *

## My answer:

There is a known bug in IE where it gets confused about heights of flex items. Basically, the flex-item can't access the parent's height to know how high to make itself. Oddly, it CAN access the height of a grand-parent. It is essentially the same as flex-bug #3 on [this commonly used list](https://github.com/philipwalton/flexbugs), although your specifics are slightly different.

The easiest workaround, in my opinion, is to add:

```
display:flex;
flex-direction:column;
```

To a div wrapped around your flex-container (in your case, around the <main> element).
