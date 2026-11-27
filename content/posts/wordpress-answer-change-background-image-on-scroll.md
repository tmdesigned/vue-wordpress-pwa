---
title: "Wordpress Answer: change background image on scroll"
slug: "wordpress-answer-change-background-image-on-scroll"
date: "2019-02-24"
excerpt: "## Original question: [change background image on scroll](http://Wordpress.StackExchange.com/q/329739) * * * ## My answer: Assuming the assets folder is within your theme directory, you need to send the theme directory, which you can get vi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [change background image on scroll](http://Wordpress.StackExchange.com/q/329739)

* * *

## My answer:

Assuming the assets folder is within your theme directory, you need to send the theme directory, which you can get via PHP, to your JavaScript. (If instead this is a plugin and the assets folder is in your plugin directory, a similar approach will work but the exact code sent will differ.)

In WordPress, using PHP you can find the stylesheet directory, which is your theme's root directory (even if you are using a child theme).

```
$theme_dir = wp_get_stylesheet_directory_uri();
```

This will store something like [http://www.domain.com/wp-content/themes/yourtheme/](http://www.domain.com/wp-content/themes/yourtheme/)

## If your JavaScript is directly on your page template

You can just directly write the PHP theme directory into your JavaScript right when you get it:

```
$(window).scroll(function(e){
    e.preventDefault();
    var scrollPos = $(window).scrollTop();
      if(scrollPos >= 100){
        $('#portfolio-cover').css({'backgroundImage':'url("<?php echo get_stylesheet_directory_uri(); ?>/assets/img/top-page2.jpg")'});
      }
```

This isn't the best practice, because you have one language injecting itself into another one, and it also means your JavaScript is on your page template, which is less reusable and less clean.

## If your JavaScript is in a separate file

If your JavaScript is in a separate file, i.e. background-scroll.js, you must first be loading it correctly through the WordPress enqueue system. Then you can send a variable (like your theme directory) through to it.

You'll use the $theme\_dir variable like we just created.

```
function wpse_329739_enqueue_scripts(){

    $theme_dir = get_stylesheet_directory_uri();

    wp_enqueue_script( 'background-scroll', $theme_dir . "/assets/js/background-scroll.js" );

}
add_action( 'wp_enqueue_scripts', 'wpse_329739_enqueue_scripts' );
```

The final piece is sending in the variable we created so your script can use it. To do that we pass an array of variables through the localize\_script function, even though this is just one variable.

Our code becomes:

```
function wpse_329739_enqueue_scripts(){

    $theme_dir = get_stylesheet_directory_uri();

    $variables = array(
        "theme_dir" => $theme_dir
    );

    wp_enqueue_script( 'background-scroll', $theme_dir . "/assets/js/background-scroll.js" );
    
    wp_localize_script( 'background-scroll', 'PHPVARS', $variables );

}
add_action( 'wp_enqueue_scripts', 'wpse_329739_enqueue_scripts' );
```

So we wrapped the variable (the theme directory name) into an array, and then told WordPress to pass it as a JavaScript object to our script.

In our script, we can access it by the name we provided (PHPVARS), i.e. PHPVARS.theme\_dir.

```
$(window).scroll(function(e){
    e.preventDefault();
    var scrollPos = $(window).scrollTop();
      if(scrollPos >= 100){
        $('#portfolio-cover').css({'backgroundImage':'url("' + PHPVARS.theme_dir + '/assets/img/top-page2.jpg")'});
      }
```
