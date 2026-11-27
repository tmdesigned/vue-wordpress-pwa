---
title: "Wordpress Answer: Adding HTML to the end of every post with the Block Editor"
slug: "wordpress-answer-adding-html-to-the-end-of-every-post-with-the-block-editor"
date: "2019-02-08"
excerpt: "## Original question: [Adding HTML to the end of every post with the Block Editor](http://Wordpress.StackExchange.com/q/328018) * * * ## My answer: So from a WordPress conceptual point of view, I like the idea of it being a block better. Wi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Adding HTML to the end of every post with the Block Editor](http://Wordpress.StackExchange.com/q/328018)

* * *

## My answer:

So from a WordPress conceptual point of view, I like the idea of it being a block better. Without it being a block you have some of a post's content in the database, and some being injected here. It sounds fine for this case but would be prone to cause you headaches later down if some of your requirements changed.

That being said, I think you could do this just by looking for the last html tag in the\_content and injecting your icon's HTML in front of it. So it's a little more complicated than just appending it like you were.

To show the concept:

```
$text = "<div><p><div>text</div></p><p>text 2</p></div>";

//Find the position in the string of the last closing HTML tag, i.e. </ 
$last_tag = strrpos( $text, "</" );

//Insert your HTML at that position, with an extra argument of 0 indicating you don't want to replace any of the original, just insert
echo substr_replace( $text, '<span class="icon"></span>', $last_tag, 0 );

//Results in <div><p><div>text</div></p><p>text 2</p><span class="icon"></span></div>
```

In your case the $text variable would instead be passed into the function:

```
// Add Signature Image at End of Posts
add_filter('the_content','td_add_signature', 1);
function td_add_signature($text) {
  global $post;
  if(($post->post_type == 'post')) {
      $last_tag = strrpos( $text, "</" );
      $text = substr_replace( $text, '<span class="icon"></span>', $last_tag, 0 );
  }
  return $text;
}
```
