---
title: "StackOverflow Answer: WP undefined WP_CONTENT_DIR"
slug: "stackoverflow-answer-wp-undefined-wp_content_dir"
date: "2020-02-21"
excerpt: "## Original question: [WP undefined WP\\_CONTENT\\_DIR](http://StackOverflow.com/q/60328601) * * * ## My answer: `WP_CONTENT_DIR` is a constant that WordPress sets up for you during its initialization sequence. If you are directly accessing a"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [WP undefined WP\_CONTENT\_DIR](http://StackOverflow.com/q/60328601)

* * *

## My answer:

`WP_CONTENT_DIR` is a constant that WordPress sets up for you during its initialization sequence.

If you are directly accessing a PHP file via AJAX, then likely WordPress is not initialized there, so the constant is undefined, and PHP assumes you must have meant to type a string there instead, leading to the error message.

When you load a file via AJAX, it kicks off a brand new PHP process. If WordPress isn't loaded for that, it can't know things that WordPress knows.

This is why AJAX requests that require access to WordPress resources are designed to be handled in a special way by WordPress. You send requests to a specific URL that WordPress makes available, along with a specified action, and then you define what that action does with a function. Since requests made to _this_ URL include starting up WordPress, you have access to whatever you need from WordPress there.

[https://codex.wordpress.org/AJAX\_in\_Plugins](https://codex.wordpress.org/AJAX_in_Plugins)
