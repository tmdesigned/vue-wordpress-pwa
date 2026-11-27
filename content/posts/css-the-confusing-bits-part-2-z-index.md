---
title: "CSS, The Confusing Bits -- Part 2: Z-Index"
slug: "css-the-confusing-bits-part-2-z-index"
date: "2017-12-09"
excerpt: "[Part 1 - Series Introduction](https://tmdesigned.com/post/css-the-confusing-bits-part-1-introduction/) Part 2 - Z-Index [Part 3 - Positioning](https://www.tmdesigned.com/css-the-confusing-bits-part-3-positioning/) Part 4 - Height and Width"
image: "/img/uploads/2018/02/stacking_diagram.png"
tags:
  - "HTML5 / CSS3"
draft: false
---
[Part 1 - Series Introduction](https://tmdesigned.com/post/css-the-confusing-bits-part-1-introduction/)  
Part 2 - Z-Index  
[Part 3 - Positioning](https://www.tmdesigned.com/css-the-confusing-bits-part-3-positioning/)  
Part 4 - Height and Width

* * *

Z-Index is more complicated than it at first seems.Â "Oh, they're layers," you say. "Higher numbers go on top of lower ones." Like so many other things, you test it out in a limited context, itÂ _seems_ to work as you expect, and you go about your merry way with a completely wrong understanding.

Until it doesn't work anymore.

Well, to be fair, that definition isn't wrong per se, it's just incomplete. Very incomplete. So what are we missing?

Here is the technical definition of how your browser is supposed to layer elements. I've put it in a scroll-box so you don't have to read it all, just skim it. I mean seriously, the actual title of this spec is "Elaborate description of Stacking Contexts". When a technical document refers to it's description as elaborate, buckle your seatbelt.

1.  If the element is a root element:
    1.  background color of element over the entire canvas.
    2.  background image of element, over the entire canvas, anchored at the origin that would be used if it was painted for the root element.
2.  If the element is a block, list-item, or other block equivalent:
    
    1.  background color of element unless it is the root element.
    2.  background image of element unless it is the root element.
    3.  border of element.
    
    Otherwise, if the element is a block level table:
    
    1.  table backgrounds (color then image) unless it is the root element.
    2.  column group backgrounds (color then image).
    3.  column backgrounds (color then image).
    4.  row group backgrounds (color then image).
    5.  row backgrounds (color then image).
    6.  cell backgrounds (color then image).
    7.  all table borders (in tree order for separated borders).
3.  Stacking contexts formed by positioned descendants with negative z-indices (excluding 0) in z-index order (most negative first) then tree order.
4.  For all its in-flow, non-positioned, block-level descendants in tree order: If the element is a block, list-item, or other block equivalent:
    
    1.  background color of element.
    2.  background image of element.
    3.  border of element.
    
    Otherwise, the element is a table:
    
    1.  table backgrounds (color then image).
    2.  column group backgrounds (color then image).
    3.  column backgrounds (color then image).
    4.  row group backgrounds (color then image).
    5.  row backgrounds (color then image).
    6.  cell backgrounds (color then image).
    7.  all table borders (in tree order for separated borders).
5.  All non-positioned floating descendants, in tree order. For each one of these, treat the element as if it created a new stacking context, but any positioned descendants and descendants which actually create a new stacking context should be considered part of the parent stacking context, not this new one.
6.  If the element is an inline element that generates a stacking context, then:
    1.  For each line box that the element is in:
        1.  Jump toÂ [7.2.1](https://www.w3.org/TR/CSS21/zindex.html#each-box)Â for the box(es) of the element in that line box (in tree order).
7.  Otherwise: first for the element, then for all its in-flow, non-positioned, block-level descendants in tree order:
    1.  If the element is a block-level replaced element, then: the replaced content, atomically.
    2.  Otherwise, for each line box of that element:
        1.  For each box that is a child of that element, in that line box, in tree order:
            
            1.  background color of element.
            2.  background image of element.
            3.  border of element.
            4.  For inline elements:
                
                1.  For all the element's in-flow, non-positioned, inline-level children that are in this line box, and all runs of text inside the element that is on this line box, in tree order:
                    1.  If this is a run of text, then:
                        1.  any underlining affecting the text of the element, in tree order of the elements applying the underlining (such that the deepest element's underlining, if any, is painted topmost and the root element's underlining, if any, is drawn bottommost).
                        2.  any overlining affecting the text of the element, in tree order of the elements applying the overlining (such that the deepest element's overlining, if any, is painted topmost and the root element's overlining, if any, is drawn bottommost).
                        3.  the text.
                        4.  any line-through affecting the text of the element, in tree order of the elements applying the line-through (such that the deepest element's line-through, if any, is painted topmost and the root element's line-through, if any, is drawn bottommost).
                    2.  Otherwise, jump toÂ [7.2.1](https://www.w3.org/TR/CSS21/zindex.html#each-box)Â for that element.
                
                For inline-block and inline-table elements:
                
                1.  For each one of these, treat the element as if it created a new stacking context, but any positioned descendants and descendants which actually create a new stacking context should be considered part of the parent stacking context, not this new one.
                
                For inline-level replaced elements:
                
                1.  the replaced content, atomically.
            
            Some of the boxes may have been generated by line splitting or the Unicode bidirectional algorithm.
            
        2.  Optionally, the outline of the element (seeÂ [10 below](https://www.w3.org/TR/CSS21/zindex.html#outlines)).
    3.  Optionally, if the element is block-level, the outline of the element (seeÂ [10 below](https://www.w3.org/TR/CSS21/zindex.html#outlines)).
8.  All positioned descendants with 'z-index: auto' or 'z-index: 0', in tree order. For those with 'z-index: auto', treat the element as if it created a new stacking context, but any positioned descendants and descendants which actually create a new stacking context should be considered part of the parent stacking context, not this new one. For those with 'z-index: 0', treat the stacking context generated atomically.
9.  Stacking contexts formed by positioned descendants with z-indices greater than or equal to 1 in z-index order (smallest first) then tree order.
10.  Finally, implementations that do not draw outlines in steps above must draw outlines from this stacking context at this stage. (It is recommended to draw outlines in this step and not in the steps above.)https://www.w3.org/TR/CSS21/zindex.html

You don't need to go through that (I did mention that, didn't I?) There's probably just one key concept you've been missing, and I won't drag it out. There is one key element of z-indices that trips people up: stacking contexts.

## Stacking Contexts

Think of stacking contexts like groups that move up and down together. Other elements from outside the group can be below the group, or above the group, but not in-between the group--you can't be "in-between" a single thing, after all.

Z-Index stacking contexts work the same way. Each stacking context is a group, and its elements are layered in a certain order. Then, the group as a whole is layered in a certain order with other stacking contexts, and so on.

So if your page header is a stacking context (group), and your footer is a stacking context, either one or the other will be on top. You couldn't interleave elements of the footer and the header. (This does come up, by the way, especially with sticky items.)

What creates a stacking context? Turns out there are a lot of causes, which does not help confusion on the matter. The main ones are:

1.  The HTML element automatically creates one. Because of course.
2.  If an element is positioned absolute, positioned relative, or is a flex-item, AND has a specified z-index.
3.  If an element is positioned fixed.
4.  If an element is partially transparent, or has transform, filter, perspective, clip-path, or mask.

That last one often surprises people, but it makes sense. The browser has to render it off screen and it's not going to put up with z-index on top of that. (On _topÂ_ of that. Yep.)

## Z-Index Strategies

![](/img/uploads/2018/02/stacking_diagram.png)

First, if you know you are going to be dealing with z-indices (i.e. you are going to have a fixed menu, modal boxes, overlays, etc.) then it's worth the time to plan it out before structuring the DOM.Â  You don't have to know everything, just think out the groups.

Your diagram doesn't have to be as slipshod as mine, and you don't even have to draw it at all. Just give some thought toÂ _which_ layers need to be on top of which other ones, and cross-reference that in your mind with how you're structuring your DOM.

Second, if nothing else, when z-indicesÂ _don't_ behave as you think they should, think back to stacking contexts. If you can identify which elements are creating them, you'll likely be close to your solution.

Finally, there is a handy little Chrome extension called [z-context](https://chrome.google.com/webstore/detail/z-context/jigamimbjojkdgnlldajknogfgncplbh?hl=en), which simply tells you whether a selected element creates a stacking context, and if so, why. It can be useful for debugging, although you'll start to identify the causes yourself once you start paying attention.
