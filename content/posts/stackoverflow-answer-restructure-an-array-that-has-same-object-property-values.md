---
title: "StackOverflow Answer: Restructure an array that has same object property values"
slug: "stackoverflow-answer-restructure-an-array-that-has-same-object-property-values"
date: "2020-02-13"
excerpt: "## Original question: [Restructure an array that has same object property values](http://StackOverflow.com/q/60208230) * * * ## My answer: ``` const array = [{label: \"Color\", content: \"red\"},{label: \"Color\", content: \"blue\"},{label: \"Brand\""
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Restructure an array that has same object property values](http://StackOverflow.com/q/60208230)

* * *

## My answer:

```
const array = [{label: "Color", content: "red"},{label: "Color", content: "blue"},{label: "Brand", content: "HI6"},{label: "Brand", content: "Zina"},{label: "Year", content: "2020"}];

const mergeProperties = array => {
  const output = [];
  array.forEach( item => {
    if(!item.hasOwnProperty('label') || !item.hasOwnProperty('content')){
        return;
    }
    const alreadyExisting = output.find( outputItem => outputItem.label === item.label );
    if(alreadyExisting){
        alreadyExisting.content.push(item.content);
    }else{
        output.push({
           label: item.label,
           content: [item.content]
        })
    }
  })
  return output;
}

console.log(mergeProperties(array));
```

[https://jsfiddle.net/fg1qjc03/](https://jsfiddle.net/fg1qjc03/)

The basic strategy is to keep track of an output array, which will be the result. As you go through each item, you check to see if that item's label has already been added to the output. If so, you just add the current item's content. If it hasn't (it's the first time), you add a whole new entry to the output (including the current item's content).
