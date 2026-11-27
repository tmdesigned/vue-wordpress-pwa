---
title: "Wordpress Answer: Correct way to make static pages editable in wordpress"
slug: "wordpress-answer-correct-way-to-make-static-pages-editable-in-wordpress"
date: "2019-01-07"
excerpt: "## Original question: [Correct way to make static pages editable in wordpress](http://Wordpress.StackExchange.com/q/324865) * * * ## My answer: This is a little bit of a \"finding the right balance\" kind of question. You are struggling with "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Correct way to make static pages editable in wordpress](http://Wordpress.StackExchange.com/q/324865)

* * *

## My answer:

This is a little bit of a "finding the right balance" kind of question. You are struggling with the balance that all custom theme developers must work with.

At the one end of the spectrum your content area just spits out the\_content() and all of the content formatting and control is up to the user (or you, on the backend, if you are doing it for them). You put a ton of burden on the little WYSIWYG editor in WordPress (TinyMCE).

At the other end is keeping the content area HTML in your template and just letting them put in specific pieces of information on the editor.

From your question, I think you are maybe missing just that last bit. How do you let them put in the content while controlling the HTML in the page template?

There's no single right answer, but a _lot_ of developers use post meta data to do it. So if you're doing a "Meet the Staff" page with name, title, photo, and a short bio for all of the staff members, you'd set up specific custom meta fields to track _just those pieces of data_.

Then, in your page template, you inject that meta data into the right places within your HTML structure, using PHP to create loops (i.e. you repeat the HTML for each staff member).

There are some extremely helpful plugins to do that approach. Advanced Custom Fields is maybe the most common -- you define which fields go where, and accessing them on your page template is as easy as get\_field('\_\_\_\_'). The PRO version is the best deal in WordPress - $100 for all your sites, for life.

In our example, we'd create a field group that looks like this:

*   Staff Member (Repeater Field)
    *   Name (Text field)
    *   Title (Text field)
    *   Photo (Photo field, set to return ID)
    *   Bio (Textarea field)

(Field group assigned to pages that have the template, "Meet the Team".)

When editing the meet the team page, you'd see those 4 fields, and since it's a repeater you can duplicate them as many times as you want.

In your page template file (i.e. page-meet-the-team.php), you'd loop through that data.

```
//do we have any staff members?
if ( have_rows( 'staff_member' ) ):

    //loop through each staff member
    while ( have_rows( 'staff_member' ) ) : the_row();

        //pull the fields for each iteration of the loop
        $staff_name = get_sub_field( 'name' );
        $staff_title = get_sub_field( 'title' );
        $staff_photo_id = get_sub_field( 'photo' );
        $staff_bio = get_sub_field( 'bio' );

        //set up the photo if it was set
        $staff_photo = $staff_photo_id ? wp_get_attachment_img( $staff_photo_id, 'medium' ) : '';

        echo "<div class='staff-member'>";
        echo "<h3 class='staff-member__name'>$staff_name</h3>";
        echo "<h4 class='staff-member__title'>$staff_title</h4>";
        if( $staff_photo ){
            echo "<div class='staff-member__photo-container'>$staff_photo</div>";
        }
        echo "<p class='staff-member__bio'>$staff_bio</p>";
        echo "</div><!-- /.staff-member -->";

    endwhile;

endif;
```

So we've set up custom fields with ACF, used them to put in dynamic content on a page, and then looped through that data and spit it out on our page template. The end user doesn't see almost any of that -- they just open the page, and type in their content. You do the heavy lifting for them, as you should.

So all of that might be taking what you thought was a small job (throwing some HTML into a WordPress theme) and turning it into a complex one (defining fields, creating templates, etc.). You may decide it's not worth that and just keep the site more static like one of the ways you've tried. There's nothing wrong with that.

To be honest, your question is a huge part of the reason that Gutenberg was created. It gives the backend editor a ton of more flexibility for defining the content area. It might not be quite so helpful for your specific situation, because you are converting an existing static site that wasn't built around blocks like Gutenberg's.
