---
title: "StackOverflow Answer: CSV Standard - Multiple Tables"
slug: "stackoverflow-answer-csv-standard-multiple-tables"
date: "2020-03-13"
excerpt: "## Original question: [CSV Standard - Multiple Tables](http://StackOverflow.com/q/60662784) * * * ## My answer: You are correct. There is no universal accepted standard. The definition is written to suggest that each file contains one table"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [CSV Standard - Multiple Tables](http://StackOverflow.com/q/60662784)

* * *

## My answer:

You are correct. There is no universal accepted standard. The definition is written to suggest that each file contains one table, and this is by far the most common practice.

There's technically nothing stopping you from having more than one table, using a format you decide on and implement and keep consistent. For instance, you could parse the file yourself and use a line with 5 hyphens to designate a separate table.

However I wouldn't recommend this. It goes against the common practice, and you will eliminate the possibility of using existing CSV libraries to help you.
