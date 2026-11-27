---
title: "CSS, The Confusing Bits ”” Part 3: Positioning"
slug: "css-the-confusing-bits-part-3-positioning"
date: "2018-04-08"
excerpt: "[Part 1 - Series Introduction](https://tmdesigned.com/post/css-the-confusing-bits-part-1-introduction/) [Part 2 - Z-Index](https://tmdesigned.com/post/css-the-confusing-bits-part-2-z-index/) Part 3 - Positioning Part 4 - Height and Width * "
image: "/img/uploads/2018/04/354px-Cartesian-coordinate-system.svg_.png"
tags:
draft: false
---
[Part 1 - Series Introduction](https://tmdesigned.com/post/css-the-confusing-bits-part-1-introduction/)  
[Part 2 - Z-Index](https://tmdesigned.com/post/css-the-confusing-bits-part-2-z-index/)  
Part 3 - Positioning  
Part 4 - Height and Width

* * *

Positioning is actually not terribly complicated once you read the specs. The problem is that most people don't, because it _usually_ works just like you'd expect. When people need to deviate from normal, it's often a limited case and they can fiddle enough to get it to work. That's the trick with CSS--moving beyond individual use cases to a true understanding isn't immediately necessary, but is eventually important. Otherwise you end up scratching your head and blaming the browser.

## Positioning Modes

*   **Static** \- This is the default mode. It means that the element will be positioned normally as it falls in the box-model. More on that below.
*   **Relative** \- Starts with static, but you can adjust it from that point.
*   **Absolute** \- Taken out of the normal flow of the page, and is instead attached to a parent's box-model positioning. More below.
*   **Fixed** \- Taken out of the normal flow, but is attached to the viewport itself, meaning it won't even scroll up and down.
*   **Sticky** \- Not in use yet.

## The Box Model

We really can't dissect those positioning modes any further without understanding the box model. Here's some sample code for our discussion:

## Hello, world!

What a great example!

\*{
border: 1px dotted rgba(255,0,0,.5);
}

.fancy-text{
color: green;
text-decoration: green wavy underline;
}

As the browser gets ready to display the page, it goes through several steps. First it parses the HTML and the CSS. That's exactly what it sounds like, so we're going to skip it.

Then, it creates the **Render Tree**: "Here's every item I need to actually show the user, how all of those items relate to each other, and what CSS rules will apply to them." At this point the browser knows, for instance, that the h2 and the div.child are children of div.parent, and that they each have some style rules.

![](/img/uploads/2018/04/positioning-fig-2.jpg)

At this point, it does not know where each item will go, or how much space each item will take. That's the next phase, **reflow**. Here, it uses everything it learned to create the **box-model**.

![](/img/uploads/2018/04/positioning-fig-3.jpg)

Now it determines where every item will go, and how much space it will take.

Note the orange above, representing the default top and bottom margin on an h2 tag. It affects the spacing of other items, so it's figured out now.

Also note that the divs and h2 tag all get the full width of the rectangle, while the span only gets the width it needs. That's display: block vs display: inline at work, but the point here is the browser is already figuring how much space they'll need.

No images here, but if there were, their width and height would be blocked out as well, but not filled in with the actual image.

There are no visible styles ready other than what affects the sizing, like font-size. This is called the box-model, obviously, because it's an arrangement of boxes.

After the box model is done, the browser is ready to **paint**. This is an application of visual styles, and also the rendering of any raster content like images:

![](/img/uploads/2018/04/positioning-fig-1.jpg)The dotted red lines are actually a part of our CSS, included to keep the box model apparent for us. So the main difference from before are the red lines, and the font styling on the word, "example!".

## Positioning and the Box-Model

So let's return to positioning, which is really about the 2nd phase, the **box-model**. Positioning answers the question, how should items be positioned in the box-model?

### Position: Static

Position static is the default mode. It means that when the browser figures out the box-model, it should just leave everything as it is.

### Position: Relative

First the browser calculates how the element _would_ flow within the box-model, then other CSS rules can alter it. If there aren't any other positioning rules, there won't be a visible difference. (Although, there are a few differences.)

So if you have:

.child{
position: relative;
left: 10px;
}

It will place the item in the box model, just skooched 10px over _from_ the left.

![](/img/uploads/2018/04/positioning-fig-4.jpg)

### Position: absolute **and Position: fixed**

Absolute and fixed positioning work nearly the same way. The big change here is that they are **removed** from the main box-model. They no longer have a place in it, and they don't affect the other items in it. That's a huge change!

Stop. Let's be clear about one thing. I said they don't affect the other items in the box-model. But they **do** maintain their place in the hierarchy of the DOM. They just don't affect the positioning of the other elements.

For instance, normally the height of an element is determined by how much room its content needs. But if that content is positioned absolutely, the element ignores them. So they still have a parent-child relationship, but the parent doesn't care about the child's size.

Okay. So where in the layout of the page are they placed? Well, they're moved onto a sort of "pseudo layer." They get pushed on top (by default) of the other elements, and they can't push things around there. It's like a higher level of consciousness. And while they're there, they can be moved around.

Here's the tricky bit. With relative positioning, "top," "bottom," "left," and "right" refers to adjusting the element itself. You read "left: 20px" as, "Move this item 20px over from the left of where it was." This is called box-positioning because we are adjusting a box within the box-model.

With absolute positioning, we have the same properties (top, bottom, left, and right) but they refer to what the element is attached to, not the element itself. "Left: 20px" means, "Put this element 20px from the left edge of what it's attached to." This is called cartesian-positioning because its more like specifying coordinates. You may remember "Cartesian" from geometry. It's the name for those (x,y) graphs you used to draw curves on.

![](/img/uploads/2018/04/354px-Cartesian-coordinate-system.svg_.png)

Now, where the element goes depends on what it attaches to. In geometry we set a (0,0) point and that becomes the center of our graph. But what will this element's center be?

Well, since it's a box, it's actually easier to think about it's corners. So instead let's ask, "Where will this element's top left corner be?" We can figure out the other 3 corners using this first one and the width and height. Enter the "positioning context", aka, "the thing my element is getting attached to."

Fixed is the easiest: it attaches to the viewport, and it doesn't move. This is how we often create sticky headers, since no matter how far down the page we scroll the viewport--and anything attached to it--stays still.

.element{
position:fixed;
top:0;
left:0;
width:100%;
height:80px;
}

This creates an 80px tall bar at the top of the browser window, which will always be there regardless of scrolling. Again, the top and left properties are saying, "Put this element 0px from the top edge, and 0px from the left edge, of what it's attached to (its positioning context)."

Interestingly, we can also "stretch" elements with those properties:

.element{
position:fixed;
top:0;
left:0;
right:0;
height:80px;
}

See the difference? If the element is 0px from the left edge of it's positioning context, AND 0px from the right edge, then by definition it's stretching across.

Absolute doesn't attach to the viewport. It attaches by default to the html element, the root of the page. (Since the html element usually spans the height of all the page's context, you couldn't do the sticky-bar trick like above. It will scroll right along with the html element!)

However, unlike with fixed positioning, which always anchors to the viewport, the positioning context of absolute positioning can be changed. How? By giving one of it's ancestors position: relative. You do this even if you aren't relatively adjusting that parent's position.

Put another way, an absolutely positioned element looks **up** through it's ancestors and attaches itself to the first position: relative element it finds.

I used to think this was arbitrary, as if setting position: relative on a parent was just a wink and a nod to the browser that we want absolute items anchored on it. But it really makes sense when you think of positioning contexts. Remember, relative positioning was saying "Figure out where this would normally go, and then adjust it." If we adjusted it 300 pixels to the right, all of it's children are adjusted as well -- or you might say, they're within it's positioning context.

So the children of a relatively positioned element, including its absolutely positioned children, get adjusted as well. This is a fairly common design pattern. Want something to be absolutely positioned? Set it to absolute, and set its parent to relative.

## A final warning

With good, responsive web design, the goal is not so much to get it to "look right" but rather to know how the elements will interact--with different content, at different sizes, on different setups, etc.

One danger, for instance, is with absolutely positioned elements in particular. You have deliberately taken them out of the flow of the standard box model. That means the box model can't adjust to accommodate them. If the absolutely positioned element gets bigger than you expected, it may begin to cover up content.

Keeping the mechanisms of the box model in mind helps you recognize dangers like this. But it also helps you unlock positioning's power. Dangerous doesn't necessarily mean bad, after all.
