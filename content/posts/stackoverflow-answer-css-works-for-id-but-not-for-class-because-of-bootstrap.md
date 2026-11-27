---
title: "StackOverflow Answer: CSS works for id, but not for class because of bootstrap"
slug: "stackoverflow-answer-css-works-for-id-but-not-for-class-because-of-bootstrap"
date: "2020-02-02"
excerpt: "## Original question: [CSS works for id, but not for class because of bootstrap](http://StackOverflow.com/q/60028924) * * * ## My answer: How is bootstrap overriding you? The answer is likely selector specificity, which means it has a highe"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [CSS works for id, but not for class because of bootstrap](http://StackOverflow.com/q/60028924)

* * *

## My answer:

How is bootstrap overriding you? The answer is likely selector specificity, which means it has a higher priority than your selector. But you can use the same trick and write a selector with a higher specificity than it. For the sake of demonstration:

```
 .search.search.search.search.search{ ... } 
```

now has a specificity of 0 0 5 0 instead of 0 0 1 0. The first number is inline styles (i.e. style="..."), the second is id's (i.e. id=""), the third is class, and the fourth is element (i.e. div).

When your browser decides which CSS rule(s) to apply, if two rules conflict, it uses the one with _more specificity_. So an ID selector will always beat a class selector, for instance.

If you inspect the element in question and look at what other selectors are applying rules to it, you can figure out how much specificity you need to overrule it.

[More about specificity](http://dev.to/emmabostian/css-specificity-1kca)
