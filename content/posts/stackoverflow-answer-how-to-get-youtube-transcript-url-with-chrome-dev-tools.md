---
title: "StackOverflow Answer: How to get youtube transcript url with chrome dev tools?"
slug: "stackoverflow-answer-how-to-get-youtube-transcript-url-with-chrome-dev-tools"
date: "2020-10-30"
excerpt: "## Original question: [How to get youtube transcript url with chrome dev tools?](http://StackOverflow.com/q/64606533) * * * ## My answer: Yes, it is possible. 1. Open a video in youtube (on pause, CC off) 2. Open the network tab 3. Filter t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to get youtube transcript url with chrome dev tools?](http://StackOverflow.com/q/64606533)

* * *

## My answer:

Yes, it is possible.

1.  Open a video in youtube (on pause, CC off)
2.  Open the network tab
3.  Filter the network tab to "XHR"
4.  Click the "CC" button to enable closed captionining.
5.  Look at a new entry on the network tab for an endpoint, "timedtext"

For instance:

[https://www.youtube.com/api/timedtext](https://www.youtube.com/api/timedtext)? {{...longer URL with params}}

The result will be JSON broken down by "segments".

```
"events": [ {
    "tStartMs": 1040,
    "dDurationMs": 3210,
    "segs": [ {
      "utf8": "- People like to obsessnover mechanical keyboards,"
    } ]
  }, {
    "tStartMs": 4250,
    "dDurationMs": 2440,
    "segs": [ {
      "utf8": "something about the clickiness of the keys"
    } ]
  }, {
    "tStartMs": 6690,
    "dDurationMs": 1730,
    "segs": [ {
      "utf8": "really gets them going."
    } ]
  }
]
```
