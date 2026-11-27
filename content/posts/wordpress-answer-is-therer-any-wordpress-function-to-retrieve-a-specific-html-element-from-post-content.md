---
title: "Wordpress Answer: is therer any wordpress function to retrieve a specific html element from post content"
slug: "wordpress-answer-is-therer-any-wordpress-function-to-retrieve-a-specific-html-element-from-post-content"
date: "2019-02-16"
excerpt: "## Original question: [is therer any wordpress function to retrieve a specific html element from post content](http://Wordpress.StackExchange.com/q/328871) * * * ## My answer: You can try extracting the content of the first H1 tag from your"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [is therer any wordpress function to retrieve a specific html element from post content](http://Wordpress.StackExchange.com/q/328871)

* * *

## My answer:

You can try extracting the content of the first H1 tag from your post.

```
function get_first_h1(){

    //Get filtered content of post
    ob_start();
    the_content();
    $content = ob_get_clean();

    //Define matching pattern: content of h1 tags
    $h1_pattern = "~<h1>(.*)</h1>~";

    //Variable to hold results
    $header_matches = array();

    //Search content for pattern
    preg_match( $h1_pattern, $content, $header_matches );

    //First match will be 2nd item in array (first is entire content, if any matches)
    if ( count( $header_matches ) > 1 ){
        return $header_matches[1];
    }

    //Fallback: return post title
    return get_the_title();

}
```

Notes:

*   That function should be saved in functions.php, a custom plugin, or a file included in one of those
*   Result of that function may be echoed out or used as part of another function , i.e. echo get\_first\_h1();
*   That function, as written, must be used within a WordPress Loop

**Personally,** I like @Jacob Peattie's suggestion above better. Create a custom field to store the extra title field you want. I am providing this solution in case you must do it this way, i.e. you have 1,000's of posts and don't want to go set the title fields.
