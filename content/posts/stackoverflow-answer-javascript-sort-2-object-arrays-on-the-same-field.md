---
title: "StackOverflow Answer: JavaScript - sort 2 object arrays on the same field"
slug: "stackoverflow-answer-javascript-sort-2-object-arrays-on-the-same-field"
date: "2020-01-30"
excerpt: "## Original question: [JavaScript - sort 2 object arrays on the same field](http://StackOverflow.com/q/59989923) * * * ## My answer: ``` const output = []; sortedArray.forEach( sortedItem => { const matchingItem = unsortedArray.find( unsort"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JavaScript - sort 2 object arrays on the same field](http://StackOverflow.com/q/59989923)

* * *

## My answer:

```
const output = [];
sortedArray.forEach( sortedItem => {
    const matchingItem = unsortedArray.find( unsortedItem => unsortedItem.sortField === sortedItem.sortField );
    if(matchingItem){
      output.push(matchingItem);
    }
});
```

Since you know the second array is the order you want the items from the first array to be in, you should loop through it. Then find the matching item from the first list, and push it into your output in that order.
