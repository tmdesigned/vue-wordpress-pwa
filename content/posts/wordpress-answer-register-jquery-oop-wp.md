---
title: "Wordpress Answer: Register jQuery - OOP WP"
slug: "wordpress-answer-register-jquery-oop-wp"
date: "2019-03-18"
excerpt: "## Original question: [Register jQuery - OOP WP](http://Wordpress.StackExchange.com/q/331985) * * * ## My answer: You are setting your script to be added at the wp\\_head action. jQuery, along with most other scripts, are loaded as part of t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Register jQuery - OOP WP](http://Wordpress.StackExchange.com/q/331985)

* * *

## My answer:

You are setting your script to be added at the wp\_head action. jQuery, along with most other scripts, are loaded as part of the wp\_enqueue\_scripts action. Care to guess which of those comes first? ;)

**Edit** This is actually not true. jQuery is loaded as part of wp\_default\_scripts which does take place before wp\_head

I have found this [list of the WordPress hook firing sequence](http://rachievee.com/the-wordpress-hooks-firing-sequence/) to be helpful. It shows that wp\_head comes right before wp\_enqueue\_scripts. This means when your script is running jQuery has _not_ been loaded yet.

Just change your line in your init function:

`add_action('wp_enqueue_scripts', array( $this, 'js_scripts' ));`

I would also recommend putting the script in an external file and then enqueue-ing it. That way, you can actually specify dependencies (like jQuery) as well as other options..
