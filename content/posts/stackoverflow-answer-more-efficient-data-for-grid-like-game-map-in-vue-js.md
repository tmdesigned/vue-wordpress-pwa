---
title: "StackOverflow Answer: More efficient data for grid-like game map in Vue.js"
slug: "stackoverflow-answer-more-efficient-data-for-grid-like-game-map-in-vue-js"
date: "2018-08-04"
excerpt: "## Original question: [More efficient data for grid-like game map in Vue.js](http://StackOverflow.com/q/51687662) * * * ## My answer: After more research I found that using the built-in array ( \"push\" to build each row of the 2d array, and "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [More efficient data for grid-like game map in Vue.js](http://StackOverflow.com/q/51687662)

* * *

## My answer:

After more research I found that using the built-in array ( "push" to build each row of the 2d array, and "splice" to delete/add a cell (i.e. to replace it) allows Vue to track it without having to redraw the entire 2d map.
