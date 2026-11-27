---
title: "Wordpress Answer: how to add extra GET parameters to post to url with add_rewrite_rule?"
slug: "wordpress-answer-how-to-add-extra-get-parameters-to-post-to-url-with-add_rewrite_rule"
date: "2019-03-18"
excerpt: "## Original question: [how to add extra GET parameters to post to url with add\\_rewrite\\_rule?](http://Wordpress.StackExchange.com/q/331941) * * * ## My answer: You want to use the add\\_rewrite\\_endpoint since what you are concerned with is"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [how to add extra GET parameters to post to url with add\_rewrite\_rule?](http://Wordpress.StackExchange.com/q/331941)

* * *

## My answer:

You want to use the add\_rewrite\_endpoint since what you are concerned with is at the end of the URL.

```
function wpseo331941_reader_endpoint() {
    add_rewrite_endpoint('readers', EP_PERMALINK | EP_PAGES);
}
add_action('init', 'wpseo331941_reader_endpoint', 10, 0);
```

```
//When you want to check if the 'readers' is being used
if ( false !== get_query_var('readers', false) ){
    //....
}
```

_Note that the false !== has to be present, because your query var "readers" will have an empty string as its value._
