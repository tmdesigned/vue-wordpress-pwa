---
title: "StackOverflow Answer: How do I filter through an array list and return results that match the filter parameter?"
slug: "stackoverflow-answer-how-do-i-filter-through-an-array-list-and-return-results-that-match-the-filter-parameter"
date: "2020-02-19"
excerpt: "## Original question: [How do I filter through an array list and return results that match the filter parameter?](http://StackOverflow.com/q/60290322) * * * ## My answer: It's not _entirely_ clear what you're asking, but it seems to be that"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How do I filter through an array list and return results that match the filter parameter?](http://StackOverflow.com/q/60290322)

* * *

## My answer:

It's not _entirely_ clear what you're asking, but it seems to be that the `console.log` you have is returning a boolean, but you are expecting it to return a value, since you are trying to filter the list?

But actually, you probably _do_ want it to return a boolean where it is. It is inside of an `every` function, which itself is inside of a `filter` function. The way `every` works is each iteration should return true or false (and if there are any falses, the whole thing returns false), and the way `filter` works is for each item, if you return `true` the item is saved into the resulting array. They both expect a boolean return.

```
list.filter(        
    item => Object.entries(queryModifiers)
         .every(([filterKey, filterVal]) => {
             const compareValue = item[filterKey];
             const value = Object.values(queryKeys);
             const result = handleFilterModifier(
                        parseFloat(value),
                        compareValue,
                        filterVal
                    );
                })
        );
```

Line by line:

*   `list.filter` : filter the list
*   `item => Object.entries(queryModifiers)` : set each item in the list to `item`, and then get the key pairs of the object, `queryModifiers` (which you haven't included here, by the way)
*   `.every(([filterKey, filterVal]) => {` : return `true` or `false` (i.e. keep or discard this item) if _all_ of the `queryModifiers` key pairs sent into this function return true
*   `const compareValue = item[filterKey];` : prepare a value
*   `const value = Object.values(queryKeys);` : prepare a value
*   `const result = handleFilterModifier( ... )` : determine a true/false result

At this point `result` should be true or false, signifying whether this key/pair of `queryModifiers` passes your test, and it _should be returned_, i.e. `return result;` If _all_ of them do, then the `every` function will return true, which means this iteration of the filter function will be included in the result.

So basically:

```
const resultList = list.filter(
            item => Object.entries(queryModifiers)
                .every(([filterKey, filterVal]) => {
                    const compareValue = item[filterKey];
                    const value = Object.values(queryKeys);
                    const result = handleFilterModifier(
                        parseFloat(value),
                        compareValue,
                        filterVal
                    );
                    return result;
                })
        );
console.log(resultList);
```
