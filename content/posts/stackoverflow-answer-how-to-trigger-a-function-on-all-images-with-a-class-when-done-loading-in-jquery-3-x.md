---
title: "StackOverflow Answer: How to trigger a function on all images with a class when done loading in JQuery 3.X?"
slug: "stackoverflow-answer-how-to-trigger-a-function-on-all-images-with-a-class-when-done-loading-in-jquery-3-x"
date: "2020-02-11"
excerpt: "## Original question: [How to trigger a function on all images with a class when done loading in JQuery 3.X?](http://StackOverflow.com/q/60159689) * * * ## My answer: This is actually working fine. [https://codepen.io/tmdesigned/pen/NWqqXwy"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to trigger a function on all images with a class when done loading in JQuery 3.X?](http://StackOverflow.com/q/60159689)

* * *

## My answer:

This is actually working fine.

[https://codepen.io/tmdesigned/pen/NWqqXwy](https://codepen.io/tmdesigned/pen/NWqqXwy)

Probably what you are experience is conflict with the gallery library you are using. They often duplicate images in the HTML to achieve their effects. I'd suggests looking at the final output in your inspector and see if the `.next()` logic still holds.

But, to answer your question if you remove that gallery, as I did in the link above, you'll see the 'loading' image fade out (in the example, all 6 images--3 display images, 3 loading images--are the same, but you can still see the effect).

```
<script>
    $(".slideshow_image").on("load", function()¬” {
      $(this).next().fadeOut("slow");
    });
</script>
```
