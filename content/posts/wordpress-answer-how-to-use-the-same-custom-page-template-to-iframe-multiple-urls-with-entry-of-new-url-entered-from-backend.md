---
title: "Wordpress Answer: How to use the same custom page template to iframe multiple urls with entry of new url entered from backend"
slug: "wordpress-answer-how-to-use-the-same-custom-page-template-to-iframe-multiple-urls-with-entry-of-new-url-entered-from-backend"
date: "2019-03-04"
excerpt: "## Original question: [How to use the same custom page template to iframe multiple urls with entry of new url entered from backend](http://Wordpress.StackExchange.com/q/330544) * * * ## My answer: There are several ways to do what you want."
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to use the same custom page template to iframe multiple urls with entry of new url entered from backend](http://Wordpress.StackExchange.com/q/330544)

* * *

## My answer:

There are several ways to do what you want. Two easy ones that come to mind are post meta (probably using a plugin to make it easier) and custom shortcodes.

## Post meta

WordPress allows you to associate different pieces of "meta" data to each post. So for this approach, you create a new meta field ("iframe\_url" ?). Then on each page you just enter the meta _value_ for that meta _key_. On your page template, you reference that meta value, which will be different for each page.

You can get and set post meta without a plugin, but many developers use a plugin for this because of the added flexibility (i.e. creating complex hierarchies of data) and ease. The one I am most familiar with is Advanced Custom Fields, which is mostly functional even in the free version. There is a GUI to create fields and assign them to pages, and in your code referencing the value is as simple as `get_field( 'iframe_url' )`

## Custom shortcode

For dynamic data that lives in the content area and is also relatively simple, you can create a custom shortcode to store the url. In your post content, it might look something like:

```
[customframe url="http://myiframecontent.com"][/customframe]
```

Then in your functions.php or elsewhere, you tell WordPress what to do with that shortcode when it finds it. For instance:

```
function wpse330544_iframe_shortcode( $atts ) {
    
    $args = shortcode_atts( 
        array(
            'url'   => ''   //default value, just to show the technique
        ), 
        $atts
    );

    $url = esc_attr( $args['url'] );
     
    return "<iframe src='$url' />";
}
add_shortcode('customframe', 'wpse330544_iframe_shortcode');
```

It's really as simple as defining a function to handle the dynamic content. In that function we first extract the parameters (you have only one, "url"), then we prepare it for insert into HTML attributes safely (esc\_attr), then we return the populated, dynamic HTML, which WordPress puts in place of your shortcode.
