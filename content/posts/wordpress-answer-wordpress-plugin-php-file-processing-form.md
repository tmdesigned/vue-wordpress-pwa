---
title: "Wordpress Answer: wordpress plugin php file processing form"
slug: "wordpress-answer-wordpress-plugin-php-file-processing-form"
date: "2019-03-13"
excerpt: "## Original question: [wordpress plugin php file processing form](http://Wordpress.StackExchange.com/q/331532) * * * ## My answer: The form action is the _file_ that handles the form, which you can see is the admin-post.php file in your Wor"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [wordpress plugin php file processing form](http://Wordpress.StackExchange.com/q/331532)

* * *

## My answer:

The form action is the _file_ that handles the form, which you can see is the admin-post.php file in your WordPress installation.

However what you are really looking for is the _hook_ that handles the form.

Basically, the form is getting submitted to admin-post.php, which then uses the "action" value in your form to determine what hook to trigger; in other words, what code to run. This is a common WordPress paradigm.

The hook name is generated in this format:

`admin_post_{{action}}` for logged in users, and `admin_post_nopriv_{{action}}` for non-logged in users

In your case the action is set to "check\_imported". So if you are trying to find code that is already handling these, do a search in your theme/plugins for "admin\_post\_check\_imported" and/or "admin\_post\_nopriv\_check\_imported".

They would be written as an add\_action call, connecting the hook name to some other function, like:

`add_action( 'admin_post_check_imported', 'some_function_name');`

So you would then look for the function named, "some\_function\_name", for the actual code.
