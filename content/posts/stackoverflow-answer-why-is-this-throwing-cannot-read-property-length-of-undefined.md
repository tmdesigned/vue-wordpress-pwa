---
title: "StackOverflow Answer: Why is this throwing \"Cannot read property 'length' of undefined\"?"
slug: "stackoverflow-answer-why-is-this-throwing-cannot-read-property-length-of-undefined"
date: "2020-01-27"
excerpt: "## Original question: [Why is this throwing \"Cannot read property 'length' of undefined\"?](http://StackOverflow.com/q/59922867) * * * ## My answer: I believe the problem is in your clone function: ``` let selector = $closestOperation.clone("
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why is this throwing "Cannot read property 'length' of undefined"?](http://StackOverflow.com/q/59922867)

* * *

## My answer:

I believe the problem is in your clone function:

```
let selector = $closestOperation.clone()
.insertAfter($closestOperation).attr("id", "operation-" + cloneIndex)
.find("*")
.each(function() {
  let id = this.id || "";
  let match = id.match(regex) || [];
  if (match.length == 3) {
    this.id = match[1] + '-' + (cloneIndex);
  }
});
// ...
bindToSelector(selector);
```

When you run the .find("\*"), your selector is becoming a large array of 10 items. Each of these is then getting sent to your selector function and bound to the event handler.

When you change the value, these items are run through your `buildSelect` function, but don't match anything, since you were only expecting the select element to be sent through it. Thus the default value of `{}` gets returned. This empty object does NOT have the value "operationValues" which you try to access with `result['operationValues']`, so it is undefined and therefore has no length.
