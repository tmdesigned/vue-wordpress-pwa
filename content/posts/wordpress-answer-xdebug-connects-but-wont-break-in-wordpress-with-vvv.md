---
title: "Wordpress Answer: xdebug connects but won't break in WordPress with vvv"
slug: "wordpress-answer-xdebug-connects-but-wont-break-in-wordpress-with-vvv"
date: "2019-03-11"
excerpt: "## Original question: [xdebug connects but won't break in WordPress with vvv](http://Wordpress.StackExchange.com/q/331191) * * * ## My answer: In my case it turned out to be a path mapping issue. Adding... ``` \"pathMappings\" : { \"/srv/www\" "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [xdebug connects but won't break in WordPress with vvv](http://Wordpress.StackExchange.com/q/331191)

* * *

## My answer:

In my case it turned out to be a path mapping issue. Adding...

```
"pathMappings" : {
    "/srv/www" : "C:\Users\tmorgan\websites\local\www"
}
```

...fixed it for me. In other words, explicitly specifying how the server path related to my local file path was necessary. I did not think this was the case because xdebug was connecting to my client, but connecting is different from successful file mapping.
