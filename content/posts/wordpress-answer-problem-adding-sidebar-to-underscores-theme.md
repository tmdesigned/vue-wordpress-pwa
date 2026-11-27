---
title: "Wordpress Answer: Problem adding sidebar to Underscores theme"
slug: "wordpress-answer-problem-adding-sidebar-to-underscores-theme"
date: "2019-04-18"
excerpt: "## Original question: [Problem adding sidebar to Underscores theme](http://Wordpress.StackExchange.com/q/334684) * * * ## My answer: Template files are _included_, not called like a function. Even though you called `get_sidebar()`, behind t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Problem adding sidebar to Underscores theme](http://Wordpress.StackExchange.com/q/334684)

* * *

## My answer:

Template files are _included_, not called like a function. Even though you called `get_sidebar()`, behind the scenes that is eventually calling `include`. So in other words, your template pages (like footer.php, page.php, and sidebar.php) are not directly within a function, so you cannot 'return' out of them, as you are attempting to do in sidebar.php.

So WordPress is progressing past that point, and then running `dynamic_sidebar( 'sidebar-1' );`. Now here's where someone else will have to jump in and tell you why it's loading the wrong widgets. I didn't think it would fallback to an active sidebar, but at least based on your code it seems to be. WordPress definitely does that with menus unless you specifically tell it not to.

But in any case, I think if you just modify your code you'll avoid the behavior entirely:

```
if ( is_active_sidebar( 'sidebar-1' ) ) :
?>

<aside id="secondary" class="widget-area">
    <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->

<?php endif; ?>
```

So all I did is use flip the check (removing the !) and then wrap the entire dynamic\_sidebar section with it (using the alternate PHP format of : and endif;)
