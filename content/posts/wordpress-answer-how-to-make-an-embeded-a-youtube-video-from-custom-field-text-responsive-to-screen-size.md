---
title: "Wordpress Answer: How to make an embeded a Youtube video from custom field text responsive to screen size?"
slug: "wordpress-answer-how-to-make-an-embeded-a-youtube-video-from-custom-field-text-responsive-to-screen-size"
date: "2019-04-04"
excerpt: "## Original question: [How to make an embeded a Youtube video from custom field text responsive to screen size?](http://Wordpress.StackExchange.com/q/333448) * * * ## My answer: Welcome to WordPress StackExchange. This is really an HTML/CSS"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to make an embeded a Youtube video from custom field text responsive to screen size?](http://Wordpress.StackExchange.com/q/333448)

* * *

## My answer:

Welcome to WordPress StackExchange.

This is really an HTML/CSS question rather than a WordPress specific one, so you will have better luck getting a quick answer in the future by posting to another StackExchange site, such as Stack Overflow.

However, your issue should be fixed if you set a percent as the width, rather than hard coding in a value like the 500 shown in your snippet.

For instance,

```
<iframe width="100%" height="315" src="https://www.youtube.com/embed/yHfLyMAHrQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

Result: [https://jsfiddle.net/qj6o4t23/](https://jsfiddle.net/qj6o4t23/)

However, that will always fill 100% wide, so a better approach might be to have a max-width on it as well, which would mean using CSS rules instead of HTML attributes.

```
<iframe style="width:100%; max-width: 500px; height: 315px" src="https://www.youtube.com/embed/yHfLyMAHrQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

Result: [https://jsfiddle.net/qj6o4t23/1/](https://jsfiddle.net/qj6o4t23/1/)

With multiple rules like this, you're better off following the best practice of defining the styles in a CSS separately.
