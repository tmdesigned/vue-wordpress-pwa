---
title: "DRY WordPress Theme Development"
slug: "dry-wordpress-theme-development"
date: "2018-03-18"
excerpt: "DRY (Don't Repeat Yourself) code is a fundamental concept that encourages developers to...well, to not repeat themselves. If two chunks of code do the same thing, it should be abstracted into one chunk of code used twice. The benefits are o"
image: "/img/uploads/2018/03/dry.jpeg"
tags:
  - "PHP"
draft: false
---
DRY (Don't Repeat Yourself) code is a fundamental concept that encourages developers to...well, to not repeat themselves. If two chunks of code do the same thing, it should be abstracted into one chunk of code used twice. The benefits are obvious -- aside from saved time, you also reduce any future changes and also eliminate a lot of complexity. With WordPress theme development, writing DRY code is partially just about a mindset. Are two page templates doing almost the exact same thing? Maybe they can be pulled together and you can use post meta (or an ACF field) to distinguish them. That's a simple shift, but makes a big difference. But truly writing DRY code in WordPress themes takes more than just a willingness to reduce duplication. You also have to know of a few techniques, and be willing to roll your own when necessary.

## Template Parts

At its core, template parts are just about separating out your code into separate files and then including them in an outer page. So for instance, you might have: \[code language="php"\]//Header and wrapping classes and such up above ... get\_template\_part( 'template-parts/title' ); get\_template\_part( 'template-parts/meta-box' ); get\_template\_part( 'template-parts/article', 'blog' ); get\_template\_part( 'template-parts/comments' ); get\_template\_part( 'template-parts/call-to-action' ); ... //End wrapping classes and footer and such down below\[/code\] There are some bonus features that come with get\_template\_part. First, it works great with child themes. It will look for the file first in the child (in case it overrides the parent), and then in the parent if not present. The third item above shows a second bonus that I have yet to find particularly helpful. It will look first for article-blog.php, but if it can't find it, it will use article.php instead. (More specifically,Â the order it looks for the files would be article-blog.php (child), article-blog.php (parent), article.php (child), article.php (parent).) I don't always find that helpful -- I already know what files are going to be there, except for child themes. So that's helpful if I I want to allow child themes to be more specific than I am in my parent theme.

## Native include

Instead of get\_template\_part, you can instead opt for PHP's built-in include() function. You lose the built in parent/child theme handling, but youÂ _gainÂ_ something else. Specifically, access to the outer context's scope. With get\_template\_part, the included partial template is isolated. Consider: \[code language="php"\]//page-staff.php ... while ( $staff\_query->have\_posts() ) : $staff\_query->the\_post(); $last\_name = get\_field( 'last\_name' ); get\_template\_part( 'template-parts/staff-bio' ); endwhile; ...\[/code\] \[code language="php"\]//template-parts/staff-bio.php ... echo "My name is: $last\_name."; ...\[/code\] ThisÂ **doesn't** work. $last\_name is not defined in the partial's context. Instead you would access what you need in the template part itself: \[code language="php"\]//page-staff.php ... while ( $staff\_query->have\_posts() ) : $staff\_query->the\_post(); get\_template\_part( 'template-parts/staff-bio' ); endwhile; ...\[/code\] \[code language="php"\]//template-parts/staff-bio.php ... echo "My name is: " . get\_field( 'last\_name' ); ...\[/code\] Even though variable scope doesn't cross the get\_template\_part boundary, the current post and/or row does, so we just access what we need from within the template part. If that's not possible, you can use include instead: \[code language="php"\]include( 'template-parts/staff-bio.php' );\[/code\] then itÂ **wouldÂ** work.

### Sometimes there's a better way!

At least in this case, avoiding the get\_template\_part didn't make sense. True the variable couldn't cross the scope boundaries, but it really didn't have to. Again, that same call to get\_field() -- or **anything else that directly accesses data about the current loop itemÂ** \-- should just happen inside of the partial. That won't solve every case. If you have a reusable item, say, a callout box, then the template part has to get it's dynamic data from different places. But how is to know, "Okay, this time I get the title from X, that other time I got it from Y."? You either have to use a lot of conditionals, or create different copies of the template part that do almost the same thing. But you don't want to create multiple copies of that partial, since that flies right in the face of DRY principles. So inÂ _that_ case, it would make more sense to pull the data in the outer template file, and then include the reusable module: \[code language="php"\]//page-about.php ... $callout\_title = 'Mission Statement'; $callout\_text = get\_field( 'mission\_statement' ); include( 'template-parts/callout.php' ); ... $callout\_title = 'Our Founder'; $callout\_text = get\_field( 'owner\_biography' ); include( 'template-parts/callout.php' ); ...\[/code\] Then, of course, template-parts/callout.php just uses the current value of those two variables.Â It's not terribly hard to recreate the child-theme handling around this, either, so it's not the end of the world. I sometimes make a function called 'super\_get\_template\_part()' that let's me add in extra features like this but preserves the child-theme handling.

## Wrapped Content

All of the above techniques really revolve around inserted data. \[code language="php"\]... get\_template\_part( 'template-parts/inner' ); ...\[/code\] What if you want elements wrapped around these? Sometimes that's a simple, single div. Other times it's much more complex. So where should you put the wrapping code, in the outer template file, or the inner? If it's in the outer, then each time you want to use that inner file you have to repeat the wrapping code around it. That's not very DRY. If it's in the inner, then for any variations on the wrapping elements (say, the wrapping element sometimes needs a different class or includes a menu, but sometimes doesn't) you'll require a whole new template part. Well, that's not technically true. Like I mentioned earlier, you can use conditional statements inside of there, but that road has its limits. You can only conditionally find your way out of so many corners. You probably doÂ _not_ want to split up your template part files into multiple sections, i.e. template-parts/inner-top, template-parts/inner-content and template-parts/inner-bottom. This works, but quickly leads to overwhelming numbers of files. A better solution is to treat the problem like you would adding a shortcode. When creating a WordPress shortcode, you can either have it operate as a command: \[code language="php"\]\[call\_to\_action\]\[/code\] Or, as a tag pair (enclosing content): \[code language="php"\]\[call\_to\_action\] Get in touch today! \[/call\_to\_action\]\[/code\] The second case is what we want to look at. How do we implement that with code? \[code language="php"\]function tm\_call\_to\_action($atts = \[\], $content = null) { Â  Â  $output = "

"; Â  Â  $output .=Â  do\_shortcode( $content ); $output .= "

"; Â Â Â Â return $output; } add\_shortcode('call\_to\_action', 'tm\_call\_to\_action');\[/code\]

We take the content the user has enclosed, wrap it up, and return it. That's exactly what we want to do, but with template parts on the backend.

So in short...we add a function that takes the content, wraps it up, and outputs it.

\[code language="php"\]function callout\_box( $title, $text ){ Â  Â  Â echo "

"; Â  Â  Â echo "

# $title

"; echo "

$text

"; Â  Â  Â echo "

"; }\[/code\]

Our earlier example would look a fair bit cleaner, too:

\[code language="php"\]//page-about.php ... callout\_box( 'Mission Statement', get\_field( 'mission\_statement' ) ); ... callout\_box( 'Our Founder', get\_field( 'owner\_biography' ) ); ...\[/code\]

## Summary

When to use each of these techniques is the piece that comes with experience. Truth be told, there isn't always one right answer. The principle of DRY code is less a pass/fail standard and more an ideal to approach. In general, I find my themes using more and more template parts, with as much dynamic data as is possible and reasonable pulled from post meta. Have a neat DRY trick? Let me know!
