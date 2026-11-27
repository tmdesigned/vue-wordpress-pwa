---
title: "StackOverflow Answer: React Native: How to render muliple images dynamically after fetching from multiple rest api's"
slug: "stackoverflow-answer-react-native-how-to-render-muliple-images-dynamically-after-fetching-from-multiple-rest-apis"
date: "2020-01-25"
excerpt: "## Original question: [React Native: How to render muliple images dynamically after fetching from multiple rest api's](http://StackOverflow.com/q/59908834) * * * ## My answer: The way to think about the render() method is that it may run re"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React Native: How to render muliple images dynamically after fetching from multiple rest api's](http://StackOverflow.com/q/59908834)

* * *

## My answer:

The way to think about the render() method is that it may run repeatedly. In most cases it is re-run every time there's a change that affects its output.

The way you have it structured, your render() function calls `{this.displayProductSection()}` which calls `this.getLineItems()` which calls `this.getProductPrimaryImage(item.product_id)` which makes the AJAX request to the WordPress API.

Since render can (and likely will) be run repeatedly, this means your request for the image is being created repeatedly.

Running an AJAX request is _not_ like displaying an image, where you put the src URL in the tag and the browser loads it once. HTML is parsed and run once, this is requesting it repeatedly.

A better pattern would be:

*   In state, track whether the remote data has been requested yet. You could do a status property with init, loading, success, error as possible strings.
*   In your componentDidMount, request the data. Change the status from init to loading.
*   When the data comes in, change the status from loading to succcess (or error, depending on the result) and store the result in state.
*   In your render function, do a conditional based on that status property. If it is loading, show a loader. If it is success, output the image based on the state you stored above.

Sometimes you aren't quite ready to fetch the remote data when the component mounts. Maybe it depends on some user input first. In that case, you could instead hook into componentDidUpdate. Check for your condition there, but since _this_ function call also run repeatedly, also check the status and only request it if it hasn't been requested yet.

In either case, notice the separation of concerns. Your render() function is doing one thing -- displaying. It's not kicking off network requests or triggering side effects. Your lifecycle methods (or functions that respond to user input) handle that stuff.
