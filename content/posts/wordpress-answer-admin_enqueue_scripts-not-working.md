---
title: "Wordpress Answer: admin_enqueue_scripts not working"
slug: "wordpress-answer-admin_enqueue_scripts-not-working"
date: "2019-02-24"
excerpt: "## Original question: [admin\\_enqueue\\_scripts not working](http://Wordpress.StackExchange.com/q/329730) * * * ## My answer: If you remove that conditional in the first line of the enqueue function, your scripts should load. I can't see the"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [admin\_enqueue\_scripts not working](http://Wordpress.StackExchange.com/q/329730)

* * *

## My answer:

If you remove that conditional in the first line of the enqueue function, your scripts should load. I can't see the broader context of why your function is written that way, but if you just copied it from a tutorial or something, you don't need it here.

Try:

```
<?php 
function sunset_load_admin_scripts(){ 
    wp_enqueue_media();
    wp_register_script('sunset-admin-script',get_template_directory_uri() .'/js/news_admin.js', array('jquery'), '1.0.0', true);
    wp_enqueue_script('sunset-admin-script'); 
}
add_action( 'admin_enqueue_scripts', 'sunset_load_admin_scripts' );
```

Please note admin\_enqueue\_scripts will only enqueue scripts for the back-end of your site, not the front-end. You can replace it with wp\_enqueue\_scripts if you want it to work on the frontend.
