---
title: "Wordpress Answer: Is it possible to insert text into an html tag using functions.php?"
slug: "wordpress-answer-is-it-possible-to-insert-text-into-an-html-tag-using-functions-php"
date: "2019-02-11"
excerpt: "## Original question: [Is it possible to insert text into an html tag using functions.php?](http://Wordpress.StackExchange.com/q/328323) * * * ## My answer: You asked, \"the fact that I know the CSS classes 'ought' to be enough right?\" Eh, m"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Is it possible to insert text into an html tag using functions.php?](http://Wordpress.StackExchange.com/q/328323)

* * *

## My answer:

You asked, "the fact that I know the CSS classes 'ought' to be enough right?"

Eh, maybe. But not like you think.

CSS is of course for styling. The example you gave where the class forgetmenot was set to display:none was not, as you wrote, replacing some CSS. It was overruling it, but the original was still there. This is important because it starts to show how this function was working -- it was just adding something to the page. Specifically, it was adding an additional style rule in the header section.

So if you wanted to add a style, sure, reuse the snippet. But you want to add content, which is not what CSS is for.

The caveat (the reason for the 'maybe' above) is because there is a tiny exception where CSS can produce content. That is with pseudo-elements. So you could do something like,

```
.single-post-title::before{
    content: "123"
}
```

This injects an element right before the .single-post-title class elements. However this has a very limited application. You can't put any other HTML there, only plain text (and images, interestingly enough). It's also tricky to style correctly since now you have an extra element instead of it just being part of the same one.

I think what you are wanting to do is actually have WordPress change the title of the post before it is outputted onto the page. Of course you also only want to do this for your specific Custom Post Type.

Something like:

```
function so328323_prefix_title( $title, $id = null ) {

    if ( get_post_type( $id ) == 'your_post_type' ) {
        $title = "123 " . $title;
    }

    return $title;
}
add_filter( 'the_title', 'so328323_prefix_title', 10, 2 );
```

So what we've done here is filtered the post title. We are interrupting WordPress's process of presenting the title and modifying it when we want. We receive the title and the post ID, then we check to see if the post is of the right type (you'll have to put in the correct CPT name), and if so we prefix it, before handing the title off.
