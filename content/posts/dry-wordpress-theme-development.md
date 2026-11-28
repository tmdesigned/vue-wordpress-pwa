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

At its core, template parts are just about separating out your code into separate files and then including them in an outer page. So for instance, you might have:

```php
//Header and wrapping classes and such up above
...
get_template_part( 'template-parts/title' );
get_template_part( 'template-parts/meta-box' );
get_template_part( 'template-parts/article', 'blog' );
get_template_part( 'template-parts/comments' );
get_template_part( 'template-parts/call-to-action' );
...
//End wrapping classes and footer and such down below
```

There are some bonus features that come with get\_template\_part. First, it works great with child themes. It will look for the file first in the child (in case it overrides the parent), and then in the parent if not present. The third item above shows a second bonus that I have yet to find particularly helpful. It will look first for article-blog.php, but if it can't find it, it will use article.php instead. (More specifically, the order it looks for the files would be article-blog.php (child), article-blog.php (parent), article.php (child), article.php (parent).) I don't always find that helpful -- I already know what files are going to be there, except for child themes. So that's helpful if I I want to allow child themes to be more specific than I am in my parent theme.

## Native include

Instead of get\_template\_part, you can instead opt for PHP's built-in include() function. You lose the built in parent/child theme handling, but you _gain_ something else. Specifically, access to the outer context's scope. With get\_template\_part, the included partial template is isolated. Consider:

```php
//page-staff.php
...
while ( $staff_query->have_posts() ) :
  $staff_query->the_post();
  $last_name = get_field( 'last_name' );
  get_template_part( 'template-parts/staff-bio' );
endwhile;
...
```

```php
//template-parts/staff-bio.php
...
echo "My name is: $last_name.";
...
```

This **doesn't** work. $last\_name is not defined in the partial's context. Instead you would access what you need in the template part itself:

```php
//page-staff.php
...
while ( $staff_query->have_posts() ) :
  $staff_query->the_post();
  get_template_part( 'template-parts/staff-bio' );
endwhile;
...
```

```php
//template-parts/staff-bio.php
...
echo "My name is: " . get_field( 'last_name' );
...
```

Even though variable scope doesn't cross the get\_template\_part boundary, the current post and/or row does, so we just access what we need from within the template part. If that's not possible, you can use include instead:

```php
include( 'template-parts/staff-bio.php' );
```

then it **would** work.

### Sometimes there's a better way!

At least in this case, avoiding the get\_template\_part didn't make sense. True the variable couldn't cross the scope boundaries, but it really didn't have to. Again, that same call to get\_field() -- or **anything else that directly accesses data about the current loop item** \-- should just happen inside of the partial. That won't solve every case. If you have a reusable item, say, a callout box, then the template part has to get it's dynamic data from different places. But how is to know, "Okay, this time I get the title from X, that other time I got it from Y."? You either have to use a lot of conditionals, or create different copies of the template part that do almost the same thing. But you don't want to create multiple copies of that partial, since that flies right in the face of DRY principles. So in _that_ case, it would make more sense to pull the data in the outer template file, and then include the reusable module:

```php
//page-about.php
...
$callout_title = 'Mission Statement';
$callout_text = get_field( 'mission_statement' );
include( 'template-parts/callout.php' );
...
$callout_title = 'Our Founder';
$callout_text = get_field( 'owner_biography' );
include( 'template-parts/callout.php' );
...
```

Then, of course, template-parts/callout.php just uses the current value of those two variables. It's not terribly hard to recreate the child-theme handling around this, either, so it's not the end of the world. I sometimes make a function called 'super\_get\_template\_part()' that let's me add in extra features like this but preserves the child-theme handling.

## Wrapped Content

All of the above techniques really revolve around inserted data.

```php
...
get_template_part( 'template-parts/inner' );
...
```

What if you want elements wrapped around these? Sometimes that's a simple, single div. Other times it's much more complex. So where should you put the wrapping code, in the outer template file, or the inner? If it's in the outer, then each time you want to use that inner file you have to repeat the wrapping code around it. That's not very DRY. If it's in the inner, then for any variations on the wrapping elements (say, the wrapping element sometimes needs a different class or includes a menu, but sometimes doesn't) you'll require a whole new template part. Well, that's not technically true. Like I mentioned earlier, you can use conditional statements inside of there, but that road has its limits. You can only conditionally find your way out of so many corners. You probably do _not_ want to split up your template part files into multiple sections, i.e. template-parts/inner-top, template-parts/inner-content and template-parts/inner-bottom. This works, but quickly leads to overwhelming numbers of files. A better solution is to treat the problem like you would adding a shortcode. When creating a WordPress shortcode, you can either have it operate as a command:

```php
[call_to_action]
```

Or, as a tag pair (enclosing content):

```php
[call_to_action] Get in touch today! [/call_to_action]
```

The second case is what we want to look at. How do we implement that with code?

```php
function tm_call_to_action($atts = [], $content = null) {
    $output = "<div class=\"call-to-action\">";
    $output .= do_shortcode( $content );
    $output .= "</div>";
    return $output;
}
add_shortcode('call_to_action', 'tm_call_to_action');
```

We take the content the user has enclosed, wrap it up, and return it. That's exactly what we want to do, but with template parts on the backend.

So in short...we add a function that takes the content, wraps it up, and outputs it.

```php
function callout_box( $title, $text ){
    echo "<div class=\"callout\">";
    echo "<h1>$title</h1>";
    echo "<p>$text</p>";
    echo "</div>";
}
```

Our earlier example would look a fair bit cleaner, too:

```php
//page-about.php
...
callout_box( 'Mission Statement', get_field( 'mission_statement' ) );
...
callout_box( 'Our Founder', get_field( 'owner_biography' ) );
...
```

## Summary

When to use each of these techniques is the piece that comes with experience. Truth be told, there isn't always one right answer. The principle of DRY code is less a pass/fail standard and more an ideal to approach. In general, I find my themes using more and more template parts, with as much dynamic data as is possible and reasonable pulled from post meta. Have a neat DRY trick? Let me know!
