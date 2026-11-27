---
title: "Wordpress Answer: Setting custom canonical urls"
slug: "wordpress-answer-setting-custom-canonical-urls"
date: "2019-03-14"
excerpt: "## Original question: [Setting custom canonical urls](http://Wordpress.StackExchange.com/q/331598) * * * ## My answer: It depends on how your canonical URLs are being written to the page. In your theme's header you may find something like: "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Setting custom canonical urls](http://Wordpress.StackExchange.com/q/331598)

* * *

## My answer:

It depends on how your canonical URLs are being written to the page. In your theme's header you may find something like:

`<link rel="canonical" href="<?php echo get_permalink(); ?>">`

If you are able to edit your theme (or child theme if using a distributed theme) you can put whatever you want there instead. For instance, you could put:

`<link rel="canonical" href="<?php echo $_SERVER['REQUEST_URI']; ?>">`

$\_SERVER\['REQUEST\_URI'\] includes all of the query parameters.

(Or if you are using a plugin like Yoast, it will add the canonical link to your page for you. You should be able to filter this output. With Yoast, it is the "wpseo\_canonical" filter.)

But remember, in many cases it makes sense to not include the query parameters, for instance two pages that vary only in a ?sortby= parameter do in fact share duplicate content, and the whole point of canonical tags is to help identify duplicate content.

It might make more sense to add your parameter as a query arg and give it a rewrite rule, so that it becomes part of the more standard URL and is included by default. Instead of `primary-page?requested_id=1` it could be `primary-page/1`. It also looks a little better.

If you want to do that, there are a couple of different answers on [this related question](https://wordpress.stackexchange.com/questions/189168/custom-rewrite-with-query-vars).
