---
title: "Wordpress Answer: Mutiple Select only POSTing 1 value"
slug: "wordpress-answer-mutiple-select-only-posting-1-value"
date: "2019-03-27"
excerpt: "## Original question: [Mutiple Select only POSTing 1 value](http://Wordpress.StackExchange.com/q/332687) * * * ## My answer: Try adding square brackets after the select element's name: ``` ```"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Mutiple Select only POSTing 1 value](http://Wordpress.StackExchange.com/q/332687)

* * *

## My answer:

Try adding square brackets after the select element's name:

```
<select multiple size="6" name="product_ids[]"> 
```
