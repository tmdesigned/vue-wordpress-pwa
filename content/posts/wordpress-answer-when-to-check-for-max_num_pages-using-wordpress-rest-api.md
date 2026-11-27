---
title: "Wordpress Answer: When to check for max_num_pages using Wordpress REST API?"
slug: "wordpress-answer-when-to-check-for-max_num_pages-using-wordpress-rest-api"
date: "2019-03-22"
excerpt: "## Original question: [When to check for max\\_num\\_pages using Wordpress REST API?](http://Wordpress.StackExchange.com/q/332328) * * * ## My answer: `pre_get_posts` does fire for REST requests. After copying your function and stepping throu"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [When to check for max\_num\_pages using Wordpress REST API?](http://Wordpress.StackExchange.com/q/332328)

* * *

## My answer:

`pre_get_posts` does fire for REST requests.

After copying your function and stepping through it, your code is actually working -- the first time. However the WP REST controller has the following bit:

```
        if ( $total_posts < 1 ) {
            // Out-of-bounds, run the query again without LIMIT for total count.
            unset( $query_args['paged'] );

            $count_query = new WP_Query();
            $count_query->query( $query_args );
            $total_posts = $count_query->found_posts;
        }
```

This re-runs the query, which in turn re-runs your function. However as you can see, it has intentionally unset the 'paged' argument, so this time when you compare `$currentPage > $lastPage` you are comparing `0 > 0` which is false, so your `post__in` argument is not set, and posts are returned. You know the rest of the story -- WordPress then catches that you can't have that page because there aren't enough posts.

You _could_ get that parameter more directly since it is part of your GET request, like:

```
    if( ! is_admin()
        && isset($_GET['page']) ) {
        $currentPage = $_GET['page'];
        $lastPage = $query->max_num_pages;
        if( $currentPage > $lastPage ) {
            $query->set('post__in', array(0));
        }
    }
```

This seemed to work, but I didn't test it thoroughly.

To be honest, you are really swimming upstream here, and I think a better solution might be to take a hint from WordPress and just build in handling for that error response. It's nicely packaged as JSON, and you will probably want to watch for other errors too anyways.

Also, I think your function should check and make sure it is only firing on REST requests. Right now as it is written it would fire on others as well.
