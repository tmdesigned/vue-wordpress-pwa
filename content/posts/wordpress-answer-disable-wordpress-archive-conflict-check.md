---
title: "Wordpress Answer: Disable WordPress Archive Conflict Check"
slug: "wordpress-answer-disable-wordpress-archive-conflict-check"
date: "2019-02-17"
excerpt: "## Original question: [Disable WordPress Archive Conflict Check](http://Wordpress.StackExchange.com/q/328945) * * * ## My answer: If you read a little further down past that code you are thinking about commenting out, you will see that righ"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Disable WordPress Archive Conflict Check](http://Wordpress.StackExchange.com/q/328945)

* * *

## My answer:

If you read a little further down past that code you are thinking about commenting out, you will see that right before the function is finished it provides a hook for the result:

```
return apply_filters( 'wp_unique_post_slug', $slug, $post_ID, $post_status, $post_type, $post_parent, $original_slug );
```

This means you can override what it is doing to your slugs:

```
add_filter( 'wp_unique_post_slug', 'wpse_328945_unique_post', 11, 6 );
function wpse_328945_unique_post( $slug, $post_ID, $post_status, $post_type, $post_parent, $original_slug ){
    return $original_slug;
}
```

So we are accepting 6 arguments to get the last one, original slug, and then returning the original.

Of course this will completely bypass the unique\_slug functionality, and you may not want that. You could add to the function some more checking to see if it was of the type you are trying to preserve, and only return the original if so (otherwise return the $slug variable so as to do nothing).
