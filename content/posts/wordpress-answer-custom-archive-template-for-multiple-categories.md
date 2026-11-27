---
title: "Wordpress Answer: Custom Archive Template for Multiple Categories"
slug: "wordpress-answer-custom-archive-template-for-multiple-categories"
date: "2019-01-18"
excerpt: "## Original question: [Custom Archive Template for Multiple Categories](http://Wordpress.StackExchange.com/q/326012) * * * ## My answer: The simplest way I can think of would be to have the two categories you want to display together groupe"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Custom Archive Template for Multiple Categories](http://Wordpress.StackExchange.com/q/326012)

* * *

## My answer:

The simplest way I can think of would be to have the two categories you want to display together grouped under a parent category.

```
Parent Category
|----Child Category A
|----Child Category B
```

The file category-parent-category.php would by default show posts from both. The file category-child-category-a.php would only show from a. The file category-child-category-b.php would only show from b. The file category.php would show from all categories.

Would that do what you want?
