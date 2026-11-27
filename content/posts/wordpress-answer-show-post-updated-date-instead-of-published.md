---
title: "Wordpress Answer: Show post updated date instead of published"
slug: "wordpress-answer-show-post-updated-date-instead-of-published"
date: "2019-03-28"
excerpt: "## Original question: [Show post updated date instead of published](http://Wordpress.StackExchange.com/q/332781) * * * ## My answer: get\\_the\\_modified\\_date should do what you're looking for. I am guessing that perhaps you are struggling a"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Show post updated date instead of published](http://Wordpress.StackExchange.com/q/332781)

* * *

## My answer:

get\_the\_modified\_date should do what you're looking for. I am guessing that perhaps you are struggling a bit with the sprintf syntax.

```
 $date = sprintf( '<span>' . __( 'Posted', 'theme' ) . ' <a href="%3$s"><time class="entry-date" datetime="%1$s">%2$s</time></a></span>',
    esc_attr( get_the_date( 'c' ) ),
    esc_html( time_ago() ),
    esc_html( get_day_link( get_the_date('Y'), get_the_date('m'), get_the_date('d') ) )
  );
```

Let's break it down:

# sprintf argument 1 - the string with placeholders

`sprintf( '<span>' . __( 'Posted', 'theme' ) . ' <a href="%3$s"><time class="entry-date" datetime="%1$s">%2$s</time></a></span>',`

This is the main string that will be built. It has 3 placeholders. However, they are in a non-traditional order.

1.  The link (`<a href=%3$s`) has a placeholder for variable #3, a string.
2.  The datetime attribute (`datetime=%1$s`), which is part of the HTML time element that makes the time machine-readable (useful for advanced features, and if the time element contains more than just the actual time), has a placeholder for variable #1, a string.
3.  And finally the displayed time (`>%2$s</time>`) is looking for variable #2, a string.

# sprintf arguments 2,3, and 4 - the values

Those 3 variables are provided in the following function arguments (again, not in the order they are used):

```
esc_attr( get_the_date( 'c' ) ),
esc_html( time_ago() ),
esc_html( get_day_link( get_the_date('Y'), get_the_date('m'), get_the_date('d') ) )
```

The **first**, which is feeding into that datetime= attribute, is getting the post's published date and outputting it in the 'c' format, which is a standard date format that looks like 20019-03-27T15:19:21+00:00.

The **second**, which is the displayed time, is referencing a function I don't recognized, called time\_ago().

The **third**, which is being used for the link href=, is generating the link based off of the post's published date.

So, to properly change the date and still use that function, we should adjust all 3 parameters.

```
$date = sprintf( '<span>' . __( 'Posted', 'theme' ) . ' <a href="%3$s"><time class="entry-date" datetime="%1$s">%2$s</time></a></span>',
    esc_attr( get_the_modified_date( 'c' ) ),
    esc_html( get_the_modified_date(),
    esc_url( get_day_link( get_the_modified_date('Y'), get_the_modified_date('m'), get_the_modified_date('d') ) )
  );
```

_Note I changed the 3rd parameter to esc\_url since it is a URL that is being generated, and that the display of the output date can be adjusted by passing in PHP date formatting options, such as get\_the\_modified\_date( 'm-d-Y' )_

Finally, all of this is getting stored in your $date variable as HTML, so make sure to actually echo it to the page before you're done.
