---
title: "StackOverflow Answer: Elements not processing event when Material-ui Popup is displayed"
slug: "stackoverflow-answer-elements-not-processing-event-when-material-ui-popup-is-displayed"
date: "2020-02-21"
excerpt: "## Original question: [Elements not processing event when Material-ui Popup is displayed](http://StackOverflow.com/q/60338167) * * * ## My answer: The `Popover` component overlays the whole screen (`position:fixed; left:0; top:0; right:0; b"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Elements not processing event when Material-ui Popup is displayed](http://StackOverflow.com/q/60338167)

* * *

## My answer:

The `Popover` component overlays the whole screen (`position:fixed; left:0; top:0; right:0; bottom:0; z-index:1300`), effectively blocking any mouse events from lower items.

You could try to circumvent this, for instance adding `pointer-events:none;` to its overlay element would allow cursor events to pass through it.

But, using a component that blocks the whole viewport just for a small menu item seems odd to me and is likely an uphill battle.

There is a similar component in the same library called `Popper`, which probably is more suited to your needs. Here you can see I've converted your `Popover` to a `Popper` and you get results a little more like what you're expecting. (Note I added some CSS to this element in the code sandbox to make it clearer.)

```
  <Popper
    open={isPopoverOpen}
    onClose={handleClose}
    anchorEl={popoverAnchorElement}
    className="popper-item"
  >
    <ListItem button>
      <ListItemText>ListItemInPopover</ListItemText>
    </ListItem>
  </Popper>
```

[https://codesandbox.io/s/keen-smoke-x8tu7](https://codesandbox.io/s/keen-smoke-x8tu7)

I will note that the documentation points out that `Popper` will not automatically close if you click away from these items, but that this can be added.

You might also look into the `MenuList` component which uses `Popper` under the hood but also handles some state for you.
