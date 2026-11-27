---
title: "StackOverflow Answer: Enable/Disable an HTML Element With Dynamically Generated Names/Tags"
slug: "stackoverflow-answer-enable-disable-an-html-element-with-dynamically-generated-names-tags"
date: "2020-02-28"
excerpt: "## Original question: [Enable/Disable an HTML Element With Dynamically Generated Names/Tags](http://StackOverflow.com/q/60453945) * * * ## My answer: jQuery actually makes this really easy by binding `this` to whichever element triggered an"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Enable/Disable an HTML Element With Dynamically Generated Names/Tags](http://StackOverflow.com/q/60453945)

* * *

## My answer:

jQuery actually makes this really easy by binding `this` to whichever element triggered an event.

For instance, instead of writing a generic function for when that value changes, you could use jQuery to bind an event listener to them:

```
$('#myTable').on('change','.shapeSelector',function(){
    var shouldDisableInput = $(this).val() === 'sphere';
    $(this).closest('tr').find('.maxAltitudeInput').attr('disabled',shouldDisableInput);
}
```

You'll notice a few things in this snippet:

1.  The element we are binding the listener to is the table, not the individual row. That's because the row is dynamic, and we don't want to have to keep adding listeners every time we add a row. Instead we add it to the parent which is stable, but then we specify that we are interested in its children that match ".shapeSelector"
2.  The listener relies on class names, not IDs, since we want to match multiple copies of them, not just a specific one. So you'd need to add those class names or a similar way of matching more than one item
3.  Inside the callback function that runs, you'll notice a couple uses of `this`. jQuery has bound that to the element that triggered the event listener, in this case, the `<select>` control. So when we use `this`, we have to think of it from that perspective. We can get its value by `$(this).val()`, we can find its parentt with `$(this).parent()`, etc. In this case, I'm travelling up to the nearest `tr`, then from there down to that `tr`'s input that I want to disable. You'd need to adjust a little depending on your dom.
4.  Also note that `this` is a DOM element, not a jQuery result. That's why when we want to run more jQuery commands on it, we have to put it in $() again.

That's how I'd approach it. We don't have your entire code here, so you'll have to adjust a bit, but hopefully that pushes you off in the right direction.

**EDIT**

To be honest, there were a lot of naming mismatches and things that didn't line up. For instance, you were attempting to append onto a `tbody` tag, but that tag didn't exist. You were using a rowCount variable, but didn' ever set that up or increment it. The select tag sill didn't have the class name you were trying to use.

I suggest you look at your code piece by piece, ask yourself what you're telling the browser to do, and then do that instruction in your mind to make sure the computer can do it.

HTML:

```
<table class="myTable" id="myTable"><tbody></tbody></table>
```

JavaScript:

```
var rowCount = 0;

function addRow(){
   $('.myTable tbody').append(`<tr name="tableRow">
        <td> 
          <select class="shapeSelector" id="shapeSelect_${rowCount}">
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
          </select>
        </td>
        <td><input type="text" id="altitude_${rowCount}" /></td>
        <td><input class="maxAltitudeInput" type="text" id="maxAltitude_${rowCount}" disabled></td>"
        </tr>`);
   rowCount++;
}


$('.myTable').on('change','.shapeSelector',function(){
    var shouldDisableInput = $(this).val() === 'sphere';
    $(this).closest('tr').find('.maxAltitudeInput').attr('disabled',shouldDisableInput);
});

addRow();
addRow();
addRow();
```

[https://jsfiddle.net/32vnjq81/](https://jsfiddle.net/32vnjq81/)
