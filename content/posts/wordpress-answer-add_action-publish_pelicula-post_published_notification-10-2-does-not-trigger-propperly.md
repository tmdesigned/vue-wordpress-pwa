---
title: "Wordpress Answer: add_action( 'publish_pelicula', 'post_published_notification', 10, 2 ); does not trigger propperly"
slug: "wordpress-answer-add_action-publish_pelicula-post_published_notification-10-2-does-not-trigger-propperly"
date: "2019-03-07"
excerpt: "## Original question: [add\\_action( 'publish\\_pelicula', 'post\\_published\\_notification', 10, 2 ); does not trigger propperly](http://Wordpress.StackExchange.com/q/330962) * * * ## My answer: Since you are in a class, you need to specify th"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [add\_action( 'publish\_pelicula', 'post\_published\_notification', 10, 2 ); does not trigger propperly](http://Wordpress.StackExchange.com/q/330962)

* * *

## My answer:

Since you are in a class, you need to specify that the function you want ("post\_published\_notification") is a part of that class.

You do this by specifying the class before the function as part of an array. It would look like this:

`add_action( 'publish_pelicula', array( $this, 'post_published_notification' ), 10, 2 );`
