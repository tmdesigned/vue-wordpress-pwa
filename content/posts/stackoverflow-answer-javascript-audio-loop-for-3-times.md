---
title: "StackOverflow Answer: Javascript audio loop for 3 times"
slug: "stackoverflow-answer-javascript-audio-loop-for-3-times"
date: "2020-02-21"
excerpt: "## Original question: [Javascript audio loop for 3 times](http://StackOverflow.com/q/60340744) * * * ## My answer: The use of `setTimeout` doesn't need to be wrapped in a promise, you just need to make it so that the next play call is trigg"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Javascript audio loop for 3 times](http://StackOverflow.com/q/60340744)

* * *

## My answer:

The use of `setTimeout` doesn't need to be wrapped in a promise, you just need to make it so that the next play call is triggered _within_ the `setTimeout` callback. I would suggest doing this with a recursive function:

```
function playSound(audio, numberOfTimes = 1, delay = 3000, firstTime = true ){
    if(firstTime){
       audio.play();
    }
    setTimeout( () => {
       if(!firstTime){
           audio.play();
       }
       numberOfTimes--;
       if(numberOfTimes > 0){
         playSound(audio,numberOfTimes,delay, false);
       }
    }, delay)
  }

  function playTRexRoar() {
        var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
        playSound(audio,3,3000);
    }

  playTRexRoar();
```

**(Edit: added check for if it is the first time the clip is played, so that it can play immediately rather than waiting for the delay)**
