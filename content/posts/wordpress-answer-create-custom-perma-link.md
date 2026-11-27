---
title: "Wordpress Answer: Create custom Perma link"
slug: "wordpress-answer-create-custom-perma-link"
date: "2019-02-15"
excerpt: "## Original question: [Create custom Perma link](http://Wordpress.StackExchange.com/q/328813) * * * ## My answer: You can add a rewrite rule to WordPress: ``` add_action( 'init', 'wpse_328813_rewrite' ); function wpse_328813_rewrite() { add"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Create custom Perma link](http://Wordpress.StackExchange.com/q/328813)

* * *

## My answer:

You can add a rewrite rule to WordPress:

```
add_action( 'init', 'wpse_328813_rewrite' );
function wpse_328813_rewrite()
{
    add_rewrite_rule(
        '^blog/(.+)/?$', 
        'index.php?pagename=$matches[1]',
        'top'
    );
}
```

What that is saying is, "WordPress, when someone requests a URL with "blog", followed by a slash, and then some text, maybe followed by another slash, try to load a page matching that slug. Oh, and do this before you try any of your other rewrite rules."
