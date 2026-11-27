---
title: "StackOverflow Answer: Are there other options besides \"text-align:center;\" for centering things in a DIV?"
slug: "stackoverflow-answer-are-there-other-options-besides-text-aligncenter-for-centering-things-in-a-div"
date: "2018-02-08"
excerpt: "## Original question: [Are there other options besides \"text-align:center;\" for centering things in a DIV?](http://StackOverflow.com/q/48673757) * * * ## My answer: Text-align:center works on elements that are \"inline\" or \"inline-block\". Th"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Are there other options besides "text-align:center;" for centering things in a DIV?](http://StackOverflow.com/q/48673757)

* * *

## My answer:

Text-align:center works on elements that are "inline" or "inline-block". That means text, images, links, etc. that don't ask to take up as much width as they can, only what they need. Their "display" property is set to inline, and they can be centered like text would be -- hence the name, text-align.

If you want to center a non-inline element, most often 'block', now you're talking about elements that naturally want as much width as they can get. So centering them doesn't mean much, because they fill the whole thing. In this case you can do so either by setting its left and right margins to 'auto' and specifying a width, or by using a different display mode on the parent like flex.

It looks like you are part of the way towards implementing the second option. On your parent element, you DO have display flex. But flex is like a wild stallion that must be tamed. It takes some getting used to. For instance, it doesn't care much about text-align:center.

Making your parent element flex (without any other specifications) is basically saying, "Hey parent element, fit in all of your children in a row." In your case you have two children, both of which are div's, so they will go side by side.

Flex has a primary axis (by default, horizontal) and to center the items within that axis you'd use justify-content: center. Adding that to your CSS for #loginArea puts all of the children in one row, but centered.

That may be what you want. If instead you wanted the loginInstructions div to be on it's own line, you could also add: flex-wrap:wrap; to the parent, allowing it to create additional rows, and flex-basis:100% to loginInstructions, telling it to take up 100% of a flex-row.
