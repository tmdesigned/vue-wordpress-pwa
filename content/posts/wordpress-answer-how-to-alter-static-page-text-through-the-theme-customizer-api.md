---
title: "Wordpress Answer: How to alter static Page text through the Theme Customizer API"
slug: "wordpress-answer-how-to-alter-static-page-text-through-the-theme-customizer-api"
date: "2019-03-01"
excerpt: "## Original question: [How to alter static Page text through the Theme Customizer API](http://Wordpress.StackExchange.com/q/330310) * * * ## My answer: You could put that kind of thing in the Customizer, but I wouldn't. It's probably too mu"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to alter static Page text through the Theme Customizer API](http://Wordpress.StackExchange.com/q/330310)

* * *

## My answer:

You could put that kind of thing in the Customizer, but I wouldn't. It's probably too much content for there, which is really designed for site-wide settings, not content on individual pages.

## Meta fields on the page using a plugin

A better approach is closer to what you were saying, storing meta information on individual pages. While meta boxes by default are not visually appealing, there are several meta plugins that do a good job of presenting editable fields in a friendly way. The one I use is Advanced Custom Fields (ACF). There's 3 parts:

### 1) Define your fields, groups, etc. in the Custom Fields admin menu.

You can create text fields, text areas, links, checkboxes, etc. Even better, you can create "repeater fields", i.e. allow the user to create several of a specific thing, groups, conditional logic, and more. Each field you create gets a slug by which you will reference it.

Each group you set up there you also assign to pages and posts conditionally.

### 2) On the posts you set up your group to appear, you input data into the fields by going to that post's editor page.

### 3) On the page template file (php), you reference those fields.

ACF provides a lot of great helper functions. The most simple is get\_field('\_\_\_\_'). So if you created a field called "Page Subtitle", it probably got the slug, "page\_subtitle", and on your page template you might write,

```
if ( get_field( "page_subtitle" ) ){
    echo "<h2 class='page-subtitle'>" . get_field( "page_subtitle" ) . "</h2>";
}
```

Repeater fields are a little more complex, but the ACF site has a ton of great examples.

## Developing for the future

Gutenberg was introduced in WordPress 5.0, and it replaces the content editor. If possible, it's worth seeing if you can embrace the Gutenberg mindset of letting users define the page layout using predefined blocks.

There is still a place for post meta, i.e. when you need a field for a part of a page that is not part of the main content area, but whenever you are able to use blocks instead you give your user more control over when and where layout elements appear.

There's even a new supercharged form of custom fields where you create custom fields for custom blocks!

More and more of WordPress in the near future will likely revolve around this type of approach, so this is a good time to jump in and embrace it.
