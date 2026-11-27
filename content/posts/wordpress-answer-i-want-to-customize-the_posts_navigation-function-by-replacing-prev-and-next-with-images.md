---
title: "Wordpress Answer: I want to customize the_posts_navigation function by replacing prev and next with images"
slug: "wordpress-answer-i-want-to-customize-the_posts_navigation-function-by-replacing-prev-and-next-with-images"
date: "2019-02-10"
excerpt: "## Original question: [I want to customize the\\_posts\\_navigation function by replacing prev and next with images](http://Wordpress.StackExchange.com/q/328276) * * * ## My answer: You can put svg text right in the prev\\_text and next\\_text."
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [I want to customize the\_posts\_navigation function by replacing prev and next with images](http://Wordpress.StackExchange.com/q/328276)

* * *

## My answer:

You can put svg text right in the prev\_text and next\_text.

To make it a little more readable here I've broken it up and prepared the SVG markup first. I am only show you the "prev" link but the "next" would work the same way.

```
$prev_label = "<span class='cover--nav-label'>" . _e('Recette pr∈š©c∈š©dente', 'marque') . "</span>";

$prev_arrow = "<svg class='icon icon-arrow-prev' role='presentation' focusable='false'><use xlink_href='" . get_template_directory_uri() . "/images/symbol-defs.svg#icon-arrow-prev'></use></svg>";

$prev_text = $prev_label . $prev_arrow;

the_post_navigation( array(
  'prev_text' => $prev_text
) );
```

Note that the\_post\_navigation will be wrapping your prev\_text (and next\_text) within the tag and applying the appropriate link target, so you don't include that part here.
