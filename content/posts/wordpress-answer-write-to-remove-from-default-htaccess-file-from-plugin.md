---
title: "Wordpress Answer: Write to / remove from default .htaccess file from plugin?"
slug: "wordpress-answer-write-to-remove-from-default-htaccess-file-from-plugin"
date: "2019-03-27"
excerpt: "## Original question: [Write to / remove from default .htaccess file from plugin?](http://Wordpress.StackExchange.com/q/332675) * * * ## My answer: Almost all of your code is correct. I didn't even know about the insert\\_with\\_markers funct"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Write to / remove from default .htaccess file from plugin?](http://Wordpress.StackExchange.com/q/332675)

* * *

## My answer:

Almost all of your code is correct. I didn't even know about the insert\_with\_markers function, and now I do, so thank you.

In return, I believe I have your solution.

`get_home_path()` is not defined when any of the hooks (`init`,`wp`, etc.) you mentioned are triggered. That function is defined in the admin-side "file.php", which as part of the admin dashboard side of things, has not yet loaded.

The hook `admin_init`, however, should serve you well, presuming you are making those .htaccess changes on the admin side. If not, you could either include wp-admin/includes/file.php manually, or use an alternate way of finding .htaccess, such as the constant ABSPATH (although they are not equivalent).

Using the admin\_init hook on the first function you provided, I found the rules written to my .htaccess file the next time I loaded a page on the admin side.

By the way, you might want to do a check for `current_user_can( 'edit_files' )` before allowing that code to run.
