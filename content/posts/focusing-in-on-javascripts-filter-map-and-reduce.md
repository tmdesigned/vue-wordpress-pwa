---
title: "Focusing in on JavaScript's Filter, Map, and Reduce"
slug: "focusing-in-on-javascripts-filter-map-and-reduce"
date: "2019-10-27"
excerpt: "Creating applications frequently involves lists, or collections of data that we want to present to a user. For instance, I spent years making websites for property management companies. Each site was a list of pages, created by a list of us"
image: "/img/uploads/2019/10/road-nature-hand-path.jpg"
tags:
  - "JavaScript"
draft: false
---
Creating applications frequently involves lists, or collections of data that we want to present to a user.

For instance, I spent years making websites for property management companies. Each site was a list of pages, created by a list of users, frequently showing a list of cities, each with a list of properties, with their own lists of amenities, available units, rental dates...and so on.

Coders typically start out learning simple loops, like "for" and "while", to process and manipulate these lists. But modern JavaScript provides several great functions that are more powerful. Once you understand them, they're easier, too.

## Filter

When you filter a list, you are trying to eliminate items that you don't want.

```javascript
var myArray = [
  { "id": "3401341", "category": "blue", … },
  { "id": "3354541", "category": "red", … },
  { "id": "4401341", "category": "blue", … }
];
var resultArray = myArray.filter( function myCallback(item) {
  return item.category === 'blue';
});
```

So we've started with an array of 3 items, each with an id, a category, and some other properties not shown.

Filter hands each of these items in turn to the function you provide, and your function returns either true (keep this item) or false (chuck it).

More concisely, using ES6 syntax, we could write the filter line:

```javascript
const resultArray = myArray.filter( item => item.category === 'blue' );
```

That uses an arrow function for brevity, and the shortcut of automatically returning the single line's result. I've also switched it to const instead of var, since we don't want it to ever be reassigned to something else.

## Map

When you use map on a list, you're transforming each element, but keeping all of them.

```javascript
var myArray = [
  { "id": "3401341", "category": "blue", … },
  { "id": "3354541", "category": "red", … },
  { "id": "4401341", "category": "blue", … }
];
var resultArray = myArray.map( function myCallback(item) {
  item.orderProcessed = true;
  return item;
});
```

Similar to before, we have the same starting array and we write a callback function that gets used for every item in the list.

Here, we're adding an "orderProcessed" property to each item. I don't even know what this sample list is anymore. Apparently it's orders? Anyways...

Written more concisely, the last line could be:

```javascript
const resultArray = myArray.map( item => {
  return { …item, orderProcessed: true };
});
```

Here we're using the spread (...) operator, which just takes each of the properties of the object out. We shove them right back into a new object we're creating, along with the added orderProcessed property. If we accidentally wrote: return {item, orderProcessed:true} without the ..., then our final items would look like this:

```javascript
{
  { "id": "3401341", "color": "blue", … },
  "orderProcessed": true
}
```

So we don't want that nesting, we just want orderProcessed to be right alongside the other properties. The spread operator (...) strips the original properties out, and then we put them all back in together.

## Reduce

My personal favorite is the hardest to understand. Reduce is confusing, but also the most powerful.

Reduce loops through each item in the array as well. But as it does so, it passes along a value. That value can be anything, even another array or object. Each item in the original array gets sent to the function you write, along with this pass-along object. It can add to the pass-along object, modify it, _add itself to it_, etc. When its turn is over, it hands off the pass-along object to the next item in the array.

Most basic examples of reduce are around pulling some combined value out of the objects. Like this:

```javascript
var myArray = [
  { "id": "3401341", "category": "blue", "value": 3, … },
  { "id": "3354541", "category": "red", "value": 2, … },
  { "id": "4401341", "category": "blue", "value": 5, … }
];
var result = myArray.reduce( function myCallback(accumulator, item) {
  return accumulator + item.value;
}, 0);
```

This time our callback function gets 2 arguments, the accumulator (pass-along object), and then each item like before. There's also an easy-to-miss 2nd argument for the whole reduce function. See the 0 right at the end? That's the starting value for the pass-along object.

So now, our callback function's responsibility is to return the pass-along object. It can be a new one, the same one, a modified one, whatever.

The value of "result" above would be 10.

## Deeper Reduce

That example's great and all. I use reduce functions like that. But I more commonly use them to _combine_ map and filter functionalities into a single loop.

See, if I want to filter an array, but I'm not really interested in the original objects, I have to go through the array twice. First to filter out the unwanted items, then to process (or extract something from) the wanted items.

Here's an example. Using the above array, what if I want a list of all the ids with a category of blue?

I can first filter out the non-blues:

```javascript
const filteredArray = myArray.filter( item => item.category === 'blue');
```

Then I can make a new array of just the id's:

```javascript
const filteredIds = filteredArray.map( item => item.id );
```

This will give me an array like this:

```javascript
["3401341", "3354541", "4401341"]
```

That's okay. But with an array of 1,000's of items, I've now looped through them twice (or most of them, at least).

Reduce can do this job better! We just use a pass-along object that is, itself, an array.

```javascript
const filteredIds = myArray.reduce( (accumulator, item) => {
  if ( item.category === 'blue' ){
    return [...accumulator, item.id];
  }
  return accumulator;
}, []);
```

Same resulting array!

We've given our reduce a starting, empty array (\[\]). Then this pass-along object gets sent to our function, along with each item in turn.

Our function asks, "Is this item's color blue?" If so, it adds its id to the pass-along object and then sends the pass-along object to the next item.

If not, it just sends the pass-along object it received, _without adding its id to it._

Reduce can take two other arguments (for a total of 4). The third is the index of the current item, and the fourth is the array itself.

There's also a complentary reduceRight which just works the array over backwards.

## Pure Functions and Reduce

I keep referring to the item as a "pass-along" object, because that helps conceptually understand what's happening. But a big caveat here is that it's not actually the _same_ object passed along. In fact, it should be a new one each time if you need to modify it in any way.

In this example, we don't just do accumulator.push(item.id) and then return the modified accumulator. Unless we aren't changing it at all, we make a copy of the accumulator, and then pass that copy along. This is to keep our function "pure", meaning it's not changing anything outside of its own scope. If it changed the _same_ accumulator it received, then it is affecting something it received.

Non-pure functions are a lot harder to debug and reason about, at least once you get used to writing them pure. Plus, reducer functions are _supposed_ to be pure, so just do it that way to save yourself future headaches.

This makes the spread operator super useful, as it makes creating a copy of the accumulator trivial at each iteration.

## JS Array Functions

Each of these functions is powerful when used appropriately. I said Reduce is my favorite, because it is the most powerful. But it's overkill if all you need to do is filter, or map, an array.

I've also seen some arguments that a typical for loop can be faster, so some of it depends on the scale you're working with. I tend to think of for loops as faster in one particular case: when you know you'll sometimes "exit early" out of the loop. All of the array functions I've discussed on this page run through the entire array every time. But a for loop, or a while loop, can be broken out of at will (i.e. "break;"). This can save some processing time if you're just looking for a particular value, for instance.

Reduce in particular is hard to understand. It's weird to get an "accumulator" along with your item. But once you get used to it, it's equally hard to go back to not using it. So, it's absolutely worth your time!
