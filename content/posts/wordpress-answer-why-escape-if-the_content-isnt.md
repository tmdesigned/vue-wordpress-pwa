---
title: "Wordpress Answer: Why escape if the_content isnt?"
slug: "wordpress-answer-why-escape-if-the_content-isnt"
date: "2019-03-27"
excerpt: "## Original question: [Why escape if the\\_content isnt?](http://Wordpress.StackExchange.com/q/332740) * * * ## My answer: The built in function `the_content` runs through several filters, but does not escape output. It would be difficult fo"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why escape if the\_content isnt?](http://Wordpress.StackExchange.com/q/332740)

* * *

## My answer:

The built in function `the_content` runs through several filters, but does not escape output. It would be difficult for it to do so, as HTML and even some scripts must be allowed through.

When outputting, the\_content seems to run through these filters (as of 5.0):

```
add_filter( 'the_content', 'do_blocks', 9 );
add_filter( 'the_content', 'wptexturize' );
add_filter( 'the_content', 'convert_smilies', 20 );
add_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'shortcode_unautop' );
add_filter( 'the_content', 'prepend_attachment' );
add_filter( 'the_content', 'wp_make_content_images_responsive' );

(and)

add_filter( 'the_content', 'capital_P_dangit' );
add_filter( 'the_content', 'do_shortcode' );
```

It also does a simple string replace:

`$content = str_replace( ']]>', ']]&gt;', $content );`

And then get\_the\_content does a tiny bit of processing related to the "more" link and a bug with foreign languages.

None of those prevent XSS script injection, right?

When saving, the data **is** sanitized through wp\_kses\_post. But as this is an expensive process, I understand why it's not used on output.

The rule of thumb for WordPress escaping is that everything needs to be escaped, regardless of input sanitation, and as lately as possible. I've read several articles saying this, because the database is not to be considered a trusted source.

But for the reasons above, the\_content doesn't follow that. Nor do the core themes (i.e. TwentyNineteen) add additional escaping on output.

So...why is it helping anything to escape elsewhere? If I were a hacker with access to the database, wouldn't I just add my code to a post's content?
