---
title: "Wordpress Answer: Is the root index.php file part of the Core?"
slug: "wordpress-answer-is-the-root-index-php-file-part-of-the-core"
date: "2019-03-18"
excerpt: "## Original question: [Is the root index.php file part of the Core?](http://Wordpress.StackExchange.com/q/331981) * * * ## My answer: Yes, index.php is part of core and is liable to be overwritten. In fact, if you look at the [process to ma"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Is the root index.php file part of the Core?](http://Wordpress.StackExchange.com/q/331981)

* * *

## My answer:

Yes, index.php is part of core and is liable to be overwritten.

In fact, if you look at the [process to manually update WordPress](https://codex.wordpress.org/Updating_WordPress#Manual_Update), step 7 is:

> Upload all new loose files from the root directory of the new version to your existing WordPress root directory

That may include index.php.

You can put custom PHP code in a custom plugin or theme. If using a pre-built theme, first [create a child theme](https://developer.wordpress.org/themes/advanced-topics/child-themes/) and then put your code in that child theme's functions.php.
