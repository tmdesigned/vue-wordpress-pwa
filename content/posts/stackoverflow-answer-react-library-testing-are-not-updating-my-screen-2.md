---
title: "StackOverflow Answer: react library testing are not updating my screen"
slug: "stackoverflow-answer-react-library-testing-are-not-updating-my-screen-2"
date: "2021-01-23"
excerpt: "## Original question: [React Material-UI - styling displayed rows label in TablePagination component](https://stackoverflow.com/questions/65795991/react-material-ui-styling-displayed-rows-label-in-tablepagination-component) * * * ## My answ"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React Material-UI - styling displayed rows label in TablePagination component](https://stackoverflow.com/questions/65795991/react-material-ui-styling-displayed-rows-label-in-tablepagination-component)

* * *

## My answer:

This turns out to be mostly a CSS issue. [The example in the Material-UI docs](https://material-ui.com/components/tables/) does not have this problem, because it is _effectively_ aligning the table pagination to the **right**. Since the arrows have a consistent width (and there's nothing to their right) if you align the pagination to the right then they never move. What you have done in your example is override the spacer that is used to achieve this "right" alignment. The pagination component is set to `display: flex` and uses the default horizontal direction. The first element, the "spacer", is an empty element that comes with a default `flex-grow` property of "1", i.e. it will grow into any available extra space at a normal rate. It effectively "eats" the empty horizontal space in the footer, growing and thus pushing the other elements to the right. You have changed the spacer's `flex-grow` property to 0, so it does not eat up that extra space and the pagination components effectively align to the left, which means the pagination arrows' position depends on the widths of the components that come before it, which means that it can change depending on the page. (side note: they could have achieved almost the same effect by setting the flex container to `justify-content: flex-end`) If you do want the pagination on the left, you will need to make the items to the left of the pagination arrows a fixed with if you do not want the positions of the items to their right to adjust. For instance:

```
const StyledTablePagination = withStyles((theme) => ({
  spacer: {
    flex: "0 1 0%"
  },
  caption: {
    width: "75px"
  }
}))(TablePagination);
```
