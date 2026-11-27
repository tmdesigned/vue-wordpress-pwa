---
title: "Wordpress Answer: Normal PHP array for exclude section of WordPress query?"
slug: "wordpress-answer-normal-php-array-for-exclude-section-of-wordpress-query"
date: "2019-04-06"
excerpt: "## Original question: [Normal PHP array for exclude section of WordPress query?](http://Wordpress.StackExchange.com/q/333600) * * * ## My answer: You're just seeing the indices (indexes). ``` 1 [1] => 2 [2] => 3 [3] => 4 ) */ ```"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Normal PHP array for exclude section of WordPress query?](http://Wordpress.StackExchange.com/q/333600)

* * *

## My answer:

You're just seeing the indices (indexes).

```
<?php

$array = array( 1,2,3,4 );
print_r( $array);

/*
outputs: 
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 4
)
*/
```
