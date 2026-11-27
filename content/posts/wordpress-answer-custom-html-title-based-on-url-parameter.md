---
title: "Wordpress Answer: Custom HTML title based on URL parameter"
slug: "wordpress-answer-custom-html-title-based-on-url-parameter"
date: "2019-03-18"
excerpt: "## Original question: [Custom HTML title based on URL parameter](http://Wordpress.StackExchange.com/q/331937) * * * ## My answer: Another approach that may be a bit more opaque to your users is to look at the referrer\\_url. This is a server"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Custom HTML title based on URL parameter](http://Wordpress.StackExchange.com/q/331937)

* * *

## My answer:

Another approach that may be a bit more opaque to your users is to look at the referrer\_url. This is a server-level variable that, while not 100% reliable, is generally a good indicator of where someone was when they clicked your link.

It would _not_ work if someone copied the link and sent it to someone else.

```
function wpse331937_custom_referer_title( $title ){

    if ( wp_get_referer() ){
        $host = parse_url( wp_get_referer(), PHP_URL_HOST );

        switch ( $domain ){
            case 'google.com' : 
            case 'www.google.com' : 
                    $title = 'Hello Google Users';
                    break;
            case 'cincinnati.craigslist.org' :
                    $title = 'Hello, Cincinnati!';
                    break;
            default :
                    break;
        }
    }

    return $title;       

}
add_filter( 'the_title', 'wpse331937_custom_referer_title', 10, 1 );
```

So the big advantage here is that it's automatic, but like I said the referer is not going to capture every case.

The _other_ big benefit is you don't have to have the page title as part of the URL, which looks a bit awkward.

You could get a similar benefit but without the referer piece by using the same switch structure in another way. For instance:

```
function wpse331937_custom_title( $title ){

    if ( isset( $_GET['ref'] ) && $_GET['ref'] ){
        $ref = $_GET['ref']

        switch ( $ref){
            case 'google' : 
                    $title = 'Hello Google Users';
                    break;
            case 'cin-craig' :
                    $title = 'Hello, Cincinnati Craigslist Users!';
                    break;
            default :
                    break;
        }
    }

    return $title;       

}
add_filter( 'the_title', 'wpse331937_custom_title', 10, 1 );
```

So now your URL looks like

> www.example.com/something?ref=cin-craig

Instead of

> www.example.com/something?title=Hello,%20Cincinnati%20Craigslist%20Users!
