---
title: "Wordpress Answer: updraft plus migrator problem"
slug: "wordpress-answer-updraft-plus-migrator-problem"
date: "2019-02-24"
excerpt: "## Original question: [updraft plus migrator problem](http://Wordpress.StackExchange.com/q/329728) * * * ## My answer: Well, I'm not sure what your Walker\\_Quicklinks\\_Menu class is (presumably a plugin you are using?), but I can help you u"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [updraft plus migrator problem](http://Wordpress.StackExchange.com/q/329728)

* * *

## My answer:

Well, I'm not sure what your Walker\_Quicklinks\_Menu class is (presumably a plugin you are using?), but I can help you understand the PHP error message. I am assuming in your functions.php file you are attemping to use the Walker\_Quicklinks\_Menu class, not extend it.

> Warning: Declaration of Walker\_Quicklinks\_Menu::start\_lvl(&$output, $item, $depth = 0, $args = Array, $id = 0) should be compatible with Walker::start\_lvl(&$output, $depth = 0, $args = Array) in C:UsersUserDesktopwww.sto.dev.ccwp-contentthemesmysitefunctions.php on line 295

So bit by bit:

> Declaration of Walker\_Quicklinks\_menu::start\_level

When the "start\_level" function inside of the "Walker\_Quicklinks" class is declared...

> (&$output, $item, $depth = 0, $args = Array, $id = 0)

it receives $output and $item, and optionally a $depth number, an $args argument, and an $id number

> should be compatible with Walker::start\_lvl

and that should match the format of how you are trying to use it

> (&$output, $depth = 0, $args = Array)

when you are sending it $output, $depth, and $args

Basically in the plugin (or wherever Walker\_Quicklinks lives) that function takes 5 arguments, 3 of which are optional. **It always takes them in that exact order.**

When you are using it, you are skipping the second argument and therefore providing the third in it's place. It doesn't match.

You are also attempting to provide default values (i.e. $depth = 0, $args = Array) but you only do this when the function is defined, not when it's used. If you want to use the default values when you are using it, just leave them off.

TL;DR go into your functions.php file, and on line 295 change your function call to match what the plugin/class expects. The first parameter should be the $output, the second should be the $item, and the rest you can leave off.
