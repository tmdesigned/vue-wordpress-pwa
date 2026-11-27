---
title: "StackOverflow Answer: How can I prevent Chrome from loading a cached webpage when offline?"
slug: "stackoverflow-answer-how-can-i-prevent-chrome-from-loading-a-cached-webpage-when-offline"
date: "2020-04-25"
excerpt: "## Original question: [How can I prevent Chrome from loading a cached webpage when offline?](http://StackOverflow.com/q/61325883) * * * ## My answer: A very inelegant workaround is to use a CSS animation that makes an \"offline\" element appe"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How can I prevent Chrome from loading a cached webpage when offline?](http://StackOverflow.com/q/61325883)

* * *

## My answer:

A very inelegant workaround is to use a CSS animation that makes an "offline" element appear all at once after a set amount of time. With JavaScript, you can continually reset the animation, preventing it from ever showing unless/until JavaScript is no longer running to reset it.

The animation in the example below is set to 3 seconds, and uses keyframes to stay at `opacity:0` until 99% of the animation duration, at which point it changes to `opacity:1`.

In JavaScript we can reset the animation every 1-2 seconds with JavaScript by removing the class that is associated with it, forcing a reflow (by [fetching the offsetWidth](https://medium.com/better-programming/how-to-restart-a-css-animation-with-javascript-and-what-is-the-dom-reflow-a86e8b6df00f), for instance), and then adding the animation class back.

_Ideally_ we could tell Chrome on these mobile devices to not cache the page at all. The various headers we tried in the comments on the question were not respected by a mobile device running with no Internet access.

Disabling the caching would be a more appropriate solution in both concept and execution. Having a running JavaScript interval that is perpetually forcing a reflow isn't great. But, it does give the user an indication that the JavaScript engine has stopped running, which is what the situation is here.

In the example below, the "Simulate stop JS" button just clears the interval that is continuing to reset the loading animation. This is a simulation only, but has the same effect as JavaScript not running (tested on an isolated server).

```
const overlay = document.getElementById('offline-overlay');

const stopJS =  document.getElementById('stopJS');

const heartbeat = () => {
  overlay.classList.remove("animate-overlay");
  void overlay.offsetWidth; 
  overlay.classList.add("animate-overlay");
}

const heartbeatInterval = setInterval( heartbeat, 1000);

stopJS.addEventListener("click", function(){
  clearInterval(heartbeatInterval);
});
```

```
@keyframes offline {
  0%   {opacity:0;}
  99%  {opacity:0;}
  100% {opacity:1;}
}

.animate-overlay{
  animation-name: offline;
  animation-duration: 3s;
}

#offline-overlay{
  background-color: rgba(255,255,255,.9);
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  justify-content: center;
  align-items:center;
  pointer-events:none;
}

#offline-overlay span{
  font-size:300%;
  font-family: sans-serif;
  letter-spacing:5px;
  color: #888;
}
```

```
  <div id="offline-overlay" class="animate-overlay">
    <span>OFFLINE</span>
  </div>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius quam sed nulla feugiat varius. Praesent vitae mi et libero porttitor maximus. Suspendisse eu pulvinar quam. Phasellus id ante a elit faucibus cursus. Curabitur porttitor vehicula ornare. Suspendisse nec risus ex. Aenean bibendum auctor ex eget aliquet. Donec laoreet sem ut tortor viverra aliquam.</p>

<button id="stopJS">Simulate Stop JS</button>
```
