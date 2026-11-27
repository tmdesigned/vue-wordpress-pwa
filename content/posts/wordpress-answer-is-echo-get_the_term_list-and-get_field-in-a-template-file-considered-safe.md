---
title: "Wordpress Answer: Is echo get_the_term_list and get_field in a template file considered safe?"
slug: "wordpress-answer-is-echo-get_the_term_list-and-get_field-in-a-template-file-considered-safe"
date: "2019-03-23"
excerpt: "## Original question: [Is echo get\\_the\\_term\\_list and get\\_field in a template file considered safe?](http://Wordpress.StackExchange.com/q/332382) * * * ## My answer: Well I typed up an answer yesterday then deleted it, hoping that someon"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Is echo get\_the\_term\_list and get\_field in a template file considered safe?](http://Wordpress.StackExchange.com/q/332382)

* * *

## My answer:

Well I typed up an answer yesterday then deleted it, hoping that someone more confident in their answer would come along. But I will at least share my understanding.

...which is, that all content being put into the page should be sanitized, and as lately as possible. This means you want to use those functions (i.e. esc\_html) right when you are outputting. Because of this "as late as possible" principle, WordPress does not (**Edit:** always) pre-escape for you (which would increase the odds for accidental double escaping).

**Edit:** per our discussion in the comments and further research, get\_the\_term\_list is one of WordPress' pre-escaped functions, and doesn't need to be further escaped. As it is escaped through the use of a filter hook, there are technically safer ways to do it at a later point (i.e. using get\_the\_terms and then manually outputting with proper escaping). However, the built-in escaping is safe enough that the core themes rely on it, so it's probably sufficient.

Neither does ACF sanitize output for you. In fact the only comment about it I could find from their developer was an oddly ambiguous one saying something to the effect of we don't, maybe WordPress does.

I have generally not used those functions for get\_field, because the danger doesn't make intuitive sense to me when I am not accepting input from the frontend. But I have also learned that there are both hackers and security researchers smarter than me, so I try to defer to the accepted wisdom, which again is to go ahead and escape. So, I will do so now.

If you're overescaping, you'll probably notice because the data will get messed up. If you're underescaping, you won't know until your hacked. So...err on the side of too much.

That's my 2 cents.
