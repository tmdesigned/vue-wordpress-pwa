---
title: "Wordpress Answer: Why is an action callback function from an instance of a class always invoking the same function from an instance?"
slug: "wordpress-answer-why-is-an-action-callback-function-from-an-instance-of-a-class-always-invoking-the-same-function-from-an-instance"
date: "2019-04-02"
excerpt: "## Original question: [Why is an action callback function from an instance of a class always invoking the same function from an instance?](http://Wordpress.StackExchange.com/q/333166) * * * ## My answer: It's possible I'm misunderstanding y"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why is an action callback function from an instance of a class always invoking the same function from an instance?](http://Wordpress.StackExchange.com/q/333166)

* * *

## My answer:

It's possible I'm misunderstanding your question, but the way it is written it seems as though _every_ instance of your FilterBuilder class will _always_ get called.

Each instance of your class has in its constructor:

`add_action('wp_ajax_myfilter', array($this, 'filter_function'));`

(as well as the non-logged-in-user version)

There is no conditional here telling it when to run based on which "content type" or class instance you have. WordPress is literally being told, "Every time you get an ajax request for 'myfilter', run this instance's filter\_function function." And since there are 2 instances in your example, and thus 2 constructors, WordPress is being told that twice (once for each).

WP AJAX functions are generally written to return data and die. (Grim maybe, but true :) So if your's is written as such, only the first registered action will run.

So, in short, it is true that each of your registered hooks is tied to its respective object ($this), and that their similar names is not a hindrance. However, you haven't given WordPress or your AJAX workflow anything to know which instance it should load.
