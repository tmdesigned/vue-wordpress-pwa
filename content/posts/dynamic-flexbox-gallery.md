---
title: "Dynamic Flexbox Gallery"
slug: "dynamic-flexbox-gallery"
date: "2017-05-01"
excerpt: "Flexbox is great. You can squeeze however many items you want and it will adjust them to fit -- in one direction. Once you start wrapping though (using flex-wrap), you run into a problem. Now that it can move down to a new row, how many col"
image: "/img/uploads/2017/04/flexbox-dynamic.jpg"
tags:
  - "JavaScript"
  - "HTML5 / CSS3"
draft: false
---
Flexbox is great. You can squeeze however many items you want and it will adjust them to fit -- in one direction. Once you start wrapping though (using flex-wrap), you run into a problem. Now that it can move down to a new row, how many columns should it use before it does so? You're forced to use hard coded widths, or a flex-basis (say, 20%), to let it know how much each item should take up. This flexibility is intentional and quite helpful, but can get you into trouble. With an unknown, dynamic number of equal-sized items (i.e. thumbnails), this is a problem. With 20 items, 5 columns might be ideal. But with 200 items, 5 columns means some really narrow rectangles if you're going to fit them on the screen. To solve this problem requires a bit of JavaScript. Essentially, we can dynamically determine the number of columns based on how many items there are. More specifically, we calculate the width and height ratio of each item, and if it is ever greater than a certain ratio (say, 2:1), have our script add a new "column" by decreasing the flex-basis of every item. **[This quick example I've set up on Codepen](http://codepen.io/tmdesigned/pen/ZBgYVm)** uses a button to add images. If you were pulling from a database, you would just set or update the counter value once you know the number of items.
