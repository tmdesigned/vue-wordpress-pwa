---
title: "Wordpress Answer: Pass Wordpress variable to the next page"
slug: "wordpress-answer-pass-wordpress-variable-to-the-next-page"
date: "2019-03-11"
excerpt: "## Original question: [Pass Wordpress variable to the next page](http://Wordpress.StackExchange.com/q/331313) * * * ## My answer: If it is working with a literal string (\"example\") but not with the variable, we can assume that the issue is "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Pass Wordpress variable to the next page](http://Wordpress.StackExchange.com/q/331313)

* * *

## My answer:

If it is working with a literal string ("example") but not with the variable, we can assume that the issue is with your variable.

You haven't provided all of the code for that section of index.php, but as it is I do not think you can expect that variable to hold anything.

First, you are using $wp\_query. What is this variable? There is a global variable $wp\_query, but you must first bring it into scope via `global $wp_query`. Are you doing that?

Second, the `queried_object` holds information about the queried object, which can sometimes be a post, sometimes a category, etc. These have different properties, so the way you've written your code is not particularly reliable.

If you are expecting a page to be that object, it should have a WP\_Post object inside of it. That has a property called `post_name` instead of name.

A simpler way to get the post slug would be:

`$slug = get_post_field( 'post_name' );`

However, it looks like you might be trying to get a category, which does have a `name` property. But if the queried object is a page (like the front page it seems like you are using), it won't hold the category but instead the page.

If you're in the loop, I would instead use:

`$categories = get_the_category(); //this gives you an array of term objects`

You could decide if you wanted to pass just one of those categories (a post can have multiple categories) or all of them. Each item in the array would have the "name" property, which you could easily send.

In any case I hope that gets you closer to the solution you're looking for.
