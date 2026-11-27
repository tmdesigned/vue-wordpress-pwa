---
title: "Wordpress Answer: Exclude certain template from wp_list_pages"
slug: "wordpress-answer-exclude-certain-template-from-wp_list_pages"
date: "2019-04-26"
excerpt: "## Original question: [Exclude certain template from wp\\_list\\_pages](http://Wordpress.StackExchange.com/q/336402) * * * ## My answer: For children pages to show, the `'hierarchical' => 0` option must also be set in your get\\_pages() functi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Exclude certain template from wp\_list\_pages](http://Wordpress.StackExchange.com/q/336402)

* * *

## My answer:

For children pages to show, the `'hierarchical' => 0` option must also be set in your get\_pages() function.

I copied your code and initially had the same results (it returned no pages). Adding in the hierarchical setting set to 0 made it return the 2 pages I had set to that template, which could then be excluded. It then output all the other children except for those 2, as I think you wanted.

Credit for solution: [Older Stack Overflow answer](https://stackoverflow.com/questions/46094460/wp-page-template-returns-empty-array-in-get-pages)
