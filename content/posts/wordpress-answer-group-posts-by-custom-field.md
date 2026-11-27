---
title: "Wordpress Answer: Group posts by custom field"
slug: "wordpress-answer-group-posts-by-custom-field"
date: "2019-02-06"
excerpt: "## Original question: [Group posts by custom field](http://Wordpress.StackExchange.com/q/327830) * * * ## My answer: You're close. You have: ``` foreach (get_child_pages(wp_get_post_parent_id(get_the_ID())) as $s) { echo ' ID) . '\">' . get_"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Group posts by custom field](http://Wordpress.StackExchange.com/q/327830)

* * *

## My answer:

You're close. You have:

```
foreach (get_child_pages(wp_get_post_parent_id(get_the_ID())) as $s) {
  echo '<li><a href="' . get_the_permalink($s->ID) . '">' . get_the_title($s->ID) . '</a></li>';
}
```

We need to add a layer above that to show the two lists. However we can't assume that the posts of one type will all come out together (i.e. all of one category, then all of the next). That means we can't just spit it all out in the order it comes in.

Here's a way utilizing a holding object to first group the posts by their value of that field:

```
//this will hold the post IDs sorted by outer groups
$list_groups = array(); 

foreach (get_child_pages(wp_get_post_parent_id(get_the_ID())) as $s) {

    //get the category of this post
    $list_category = get_post_meta( $s->ID, "type", true );

    //if this is the first post of that category, initialize the array
    if ( ! isset( $list_groups[ $list_category ] ) ){
        $list_groups[ $list_category ] = array();
    }

    //add this post ID to that category in our holding array
    $list_groups[ $list_category ][] = $s->ID;

}

//at this point we have an array ($list_groups) that has an inner array of post IDs for each category

foreach ( $list_groups as $category_name => $category_posts ){

    echo "<div class='category-group'><h2>$category_name</h2><ul>";

    foreach ( $category_posts as $category_post_id ){

        $p_permalink = get_the_permalink( $category_post_id );
        $p_title = get_the_title( $category_post_id );

        echo "<li><a href='$p_permalink'>$p_title</a></li>";

    }

    echo "</ul></div>";

}
```

So what we've done is first created a holding array that ends up looking like this:

```
$list_groups
---Product
   ---10
   ---15
   ---33
---About
   ---5
   ---12
   ---55
```

It's just an array holding arrays for each type, and in those arrays are the IDs of the posts that belong there.

Then we loop through _that_ holding array and spit them out by category.

Sidenote: your wp\_query looks to be limiting the results to just one of the two categories. I could be misreading that but if you only get one category out check it.
