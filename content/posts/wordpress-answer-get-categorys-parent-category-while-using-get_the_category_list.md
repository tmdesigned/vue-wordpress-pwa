---
title: "Wordpress Answer: Get category's parent category while using get_the_category_list"
slug: "wordpress-answer-get-categorys-parent-category-while-using-get_the_category_list"
date: "2019-03-17"
excerpt: "## Original question: [Get category's parent category while using get\\_the\\_category\\_list](http://Wordpress.StackExchange.com/q/331879) * * * ## My answer: get\\_the\\_category\\_list() returns a formatted list of category names, which does n"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Get category's parent category while using get\_the\_category\_list](http://Wordpress.StackExchange.com/q/331879)

* * *

## My answer:

get\_the\_category\_list() returns a formatted list of category names, which does not (as you discovered) include the IDs.

get\_the\_category(), by contrast, returns an array of WP Term objects. A WP Term object looks like this:

```
 ["term_id"]=>  //int
    ["name"]=>   //string 
    ["slug"]=>  //string 
    ["term_group"]=>  //int
    ["term_taxonomy_id"]=> //int
    ["taxonomy"]=>   //string
    ["description"]=>    //string
    ["parent"]=> //int
    ["count"]=>  // int
    ["filter"]= //string
    ["meta"]= array(0) {} //array
```

Source: [https://developer.wordpress.org/reference/classes/wp\_term/](https://developer.wordpress.org/reference/classes/wp_term/)

As you can see, you can very easily pull out both the ID and the parent ID if present.

Once you have the parent ID, you can fetch its name with get\_cat\_name( $cat\_id );
