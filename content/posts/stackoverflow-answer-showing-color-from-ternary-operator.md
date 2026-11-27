---
title: "StackOverflow Answer: Showing color from ternary operator"
slug: "stackoverflow-answer-showing-color-from-ternary-operator"
date: "2020-08-05"
excerpt: "## Original question: [Showing color from ternary operator](http://StackOverflow.com/q/63256948) * * * ## My answer: Your code is doing exactly what you are telling it: outputting a string that says \"background-color: ... \". How would the b"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Showing color from ternary operator](http://StackOverflow.com/q/63256948)

* * *

## My answer:

Your code is doing exactly what you are telling it: outputting a string that says "background-color: ... ".

How would the browser know you want to **style** the text with that color instead of presenting those words to the user?

You need to instead specify for the browser that this is a **style** you are giving it.

Instead of

```
        $msg .= ($row['opened'] == '0') ? "background-color: #DDEDFF;" : "background-color: #000000;";
```

try something like:

```
 $color = $row['opened'] == '0' ? "#DDEDFF" : "#000000";
 $msg .= "<span style='background-color:$color'>THE TEXT YOU WANT TO COLORIZE</span>";
```

**COMPLETE EXAMPLE**

```
<?php

function getLatestMessage($opened) {

    $color = $opened ? "#DDEDFF" : "#000000";
    $msg = "<span style='background-color:$color'>THE TEXT YOU WANT TO COLORIZE</span>";
    return $msg;
}

echo getLatestMessage(true);
echo getLatestMessage(false);

?>
```
