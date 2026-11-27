---
title: "StackOverflow Answer: Cloning Rows of a table"
slug: "stackoverflow-answer-cloning-rows-of-a-table"
date: "2020-01-24"
excerpt: "## Original question: [Cloning Rows of a table](http://StackOverflow.com/q/59894862) * * * ## My answer: A ` ` with no type= property specified is by default a \"submit\" type button. That's why you'll often see the odd-looking ` `. This is l"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Cloning Rows of a table](http://StackOverflow.com/q/59894862)

* * *

## My answer:

A `<button>` with no type= property specified is by default a "submit" type button. That's why you'll often see the odd-looking `<button type="button">`. This is likely why your page is refreshing, although you _usually_ see that behavior when the button is inside of a form. Perhaps that form tag is just not visible in your HTML excerpt.

As @Rory McCrossan mentioned, you have one event handler, presumably tied to a high level item in your HTML (DOM), and then inside of it you are using a switch statement to determine what was actually clicked. If you don't have a good reason for this, it makes more sense to tie the event handlers to the specific elements they relate to. The way you have it may _work_ but you're making but it's a lot less clean, more error-prone, and harder to work with this way.

If it were me, I'd set it up like this for your DOM:

```
 <th><button type="button" class="js-add-row">Add Row</button></th>
```

Then in your JS:

```
var rowCount = 1;
$( '.js-add-row' ).on('click', function(){
    const template = `<tr class="row-${rowCount}"> ... </tr>`;
    $( this ).closest( 'table' ).find( 'tbody' ).append(template);
    rowCount++;
});
```

Obviously you'd want to put in your whole template there. Instead of storing the template in JS, you could just clone the row that's out there, but that only works if you don't want to let the user delete all the rows. Or, sometimes people will store this template in the DOM but hidden so that it's not a real row. Or as a data- element on one of the table elements. The best practice may depend on your use-case.

The `$( this ).closest( 'table' ).find( 'tbody' )` part allows this to be more reusable. It's literally saying, from where this button was clicked, find the table it's inside of, then grab the tbody tag. You could have multiple tables with their own add buttons, and this would still work (in that case, the template would either need to be the same, or cloned from that first row).

You can see the advantage here of isolating this event handler. You have a clean function for doing this one thing. It's easy to find, easy to modify, easy to expand and copy.

Demo: [JSFiddle](https://jsfiddle.net/2p1x0jsg/2/)
