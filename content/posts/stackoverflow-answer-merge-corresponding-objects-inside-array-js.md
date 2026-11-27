---
title: "StackOverflow Answer: Merge corresponding objects inside array JS"
slug: "stackoverflow-answer-merge-corresponding-objects-inside-array-js"
date: "2020-01-28"
excerpt: "## Original question: [Merge corresponding objects inside array JS](http://StackOverflow.com/q/59949470) * * * ## My answer: Here's another approach, which is not performance optimized and is less concise than the other answers, but breaks "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Merge corresponding objects inside array JS](http://StackOverflow.com/q/59949470)

* * *

## My answer:

Here's another approach, which is not performance optimized and is less concise than the other answers, but breaks the steps down to make clear what's happening.

```
const data1 = [{ id: 1, someKey1: 'someValue2'}, { id: 2, someKey2: 'someValue2' }, { id: 3, someKey3: 'someValue3' }]
const data2 = [{ uid: 1, someKey4: 'someValue4'}, { uid: 2, someKey5: 'someValue5' }]

function mergeProperties(set1, linkingProperty1, set2, linkingProperty2){

  const keys1 = set1.map( item => item[linkingProperty1] );
  const keys2 = set2.map( item => item[linkingProperty2] );
  const mergedKeys = keys1.concat(keys2);
  const filteredKeys = mergedKeys.filter( key => !!key || key === 0); //truthy or actually number 0
  const uniqueKeys = filteredKeys.filter((a, b) => filteredKeys.indexOf(a) === b);

  // now we have a complete list, with no duplicates, of all possible ids

  const mergedArray = uniqueKeys.reduce( (accumulator, key) => {
      const resultInSet1 = set1.find( item => item[linkingProperty1] === key );
      const resultInSet2 = set2.find( item => item[linkingProperty2] === key );
      let item = {};
      if(resultInSet1){
        delete resultInSet1[linkingProperty1];
        item = {...resultInSet1};
      }
      if(resultInSet2){
        delete resultInSet2[linkingProperty2];
        item = {...item, ...resultInSet2};
      }
      return [...accumulator, item];
  }, []);

  return mergedArray;
}

console.log( mergeProperties(data1,"id",data2,"uid") );
```
