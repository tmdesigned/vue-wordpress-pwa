---
title: "Mockup Scroller"
slug: "mockup-scroller"
date: "2017-05-30"
excerpt: "_Update 9/17/18:_ The demo below will not function as it was built when the frontend of the site was using WordPress which includes jQuery, and the current implementation of the site does not. I could include it for this page, but that seem"
image: "/img/uploads/2020/11/sologo.png"
tags:
  - "JavaScript"
  - "HTML5 / CSS3"
  - "Design"
draft: false
---
_Update 9/17/18:_ The demo below will not function as it was built when the frontend of the site was using WordPress which includes jQuery, and the current implementation of the site does not. I could include it for this page, but that seems heavy for an example. Sending design mockups to clients--and having them understand the design--is a challenge, especially for long form pages. The ratio of the mockup, usually extremely vertical, is unwieldy for non-media experts. What is the designer's best option?

1.  Send a high-resolution image -- the client may get overwhelmed or be unable to zoom out and see the full image. They may also be confused with the very narrow aspect ratio.
2.  Send a smaller image -- the client won't be able to see the fine details. Here, too, they may also be confused with by the aspect ratio.
3.  Send a quasi-responsive mockup to adjust to the client's browser--- this can be misleading with regards to the actual intended responsive behavior.
4.  Go over the design in person -- this is the best scenario, but is sometimes impossible.

Oftentimes I've sent a large image, but taken care to explain how website mockups tend to be very vertical and that they won't be seeing it as the end user will. Knowing that clients are usually very excited to skip the explanation and open up the mockup, I've never felt very comfortable with this.

![](/img/uploads/2017/05/tmdesigned-mockup-1.jpg)

$(function(){ $('.outer-mockup-container').each(function(){ setHeight(this); }); $('.outer-mockup-container').resize(function(){ setHeight(this); }); }); function setHeight(that){ console.log('called setHeight'); var thisWidth = $(that).innerWidth(); var thisAspectRatio = $(that).data('aspect-ratio'); $(that).css('height',thisWidth / thisAspectRatio + 30); } To combat this problem, I created a minimalist browser simulator that maintains a set aspect-ratio. The client can scroll up and down within the mini-browser, and actually get a sense for how the page flows. Having a set aspect-ratio also means that intentional above-the-fold design decisions can be conveyed to the client. Behind the scenes, this is simply a stacked container with the very tall mockup image being seen through a window. A little JavaScript checks and maintains the image ratio on browser resize so that it can also grow to fill the available space. At a certain resolution I've taken to hiding the simulator altogether -- I simply don't want my clients trying to view a desktop design mockup on a mobile device. A few browser design cues were given to help the clients intuitively understand what to do. For mobile mockups, a slightly modified design element on the bottom helps create the illusion of scrolling on a phone. So far the effect has been exactly what I had hoped for, and feedback has been fantastic. I've had more concrete discussions with clients about the flow of their sites, and wasted less time explaining how the design will translate into a live browser. The full code for this project is available on the [**project CodePen page**](https://codepen.io/tmdesigned/pen/MmYQvJ?editors=0110).
