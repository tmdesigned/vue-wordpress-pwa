---
title: "StackOverflow Answer: Strange result when speed testing Math() in Firefox"
slug: "stackoverflow-answer-strange-result-when-speed-testing-math-in-firefox"
date: "2020-02-17"
excerpt: "## Original question: [Strange result when speed testing Math() in Firefox](http://StackOverflow.com/q/60262050) * * * ## My answer: It's actually the order you are running the tests, I believe. First of all, the results aren't that dramati"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Strange result when speed testing Math() in Firefox](http://StackOverflow.com/q/60262050)

* * *

## My answer:

It's actually the order you are running the tests, I believe.

First of all, the results aren't that dramatic for me. In Chrome they're almost identical, and in Firefox I see a small--but consistent--increase in time on your iteration test. Usually it's around 5-15ms longer, but it's consistent, so I'll give it to you that it's real.

If you add a `Math.floor()` to the iteration test, you'll _still_ see higher numbers here.

But if you move the iteration test to the end, like this:

```
let arrNumbers = makeNrArray(loopSize);
testRoundingSpeed(arrNumbers)

arrNumbers = makeNrArray(loopSize);
testCeilingSpeed(arrNumbers);

arrNumbers = makeNrArray(loopSize);
testFlooringSpeed(arrNumbers);

arrNumbers = makeNrArray(loopSize);
testItterationSpeed(arrNumbers);
```

Then you'll see the `testItterationSpeed` result go down to the range of the others, while the `testRoundingSpeed` will go up.

I suspect it has something to do with the allocation of memory, since the subsequent results use the same variable (well, the same `let`). I don't know the details. Regardless, it is less about what you are doing and more about when.
