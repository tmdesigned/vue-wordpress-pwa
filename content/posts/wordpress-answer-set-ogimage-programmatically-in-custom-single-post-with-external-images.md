---
title: "Wordpress Answer: Set og:image programmatically in custom single post with external images"
slug: "wordpress-answer-set-ogimage-programmatically-in-custom-single-post-with-external-images"
date: "2019-01-13"
excerpt: "## Original question: [Set og:image programmatically in custom single post with external images](http://Wordpress.StackExchange.com/q/325449) * * * ## My answer: You could eventually get what you said to happen but it wouldn't **work** reli"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Set og:image programmatically in custom single post with external images](http://Wordpress.StackExchange.com/q/325449)

* * *

## My answer:

You could eventually get what you said to happen but it wouldn't **work** reliably.

In other words, you could replace the tag in the header with one of your images. But by that point most scrapers (social media scrapers, and anything interested in og: tags) will have already come and gone.

So, you have to replace it before those tags get written. The good news is you can! You just have to do with PHP instead of with AJAX. The bad news is it can quickly grow complex.

So, before WordPress has written the section, you need to have already fetched your first image URL with PHP and told WordPress you would like to add something there -- your og: meta tag. Whatever you were loading with AJAX (a list of image URLs filtered by a parameter?) you'll replicate with PHP -- just whatever you need to get that first image URL. Then you write it to the header.

For example, assuming a remote source that returns a JSON array of images might look like this:

```
function so325454_add_meta_tag(){

    $images = file_get_contents('...');
    if ( !$images ){ return; } //in case file fails

    $list_of_images = @json_decode( $images );
    if ( is_null( $list_of_images ) 
    || !is_array( $list_of_images ) 
    || count( $list_of_images ) < 1 ){ return; } //no content or bad JSON or empty array

    $image = $list_of_images[0]; 
    echo "<meta property='og:image' content='$image' />";
}
add_action( 'wp_head', 'so325454_add_meta_tag' );
```

Sadly you may have to be cautious of _other_ plugins writing og tags, even the same og tags. In other words writing _your_ tag there isn't stopping any others.
