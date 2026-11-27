---
title: "StackOverflow Answer: Failed to fetch using a form"
slug: "stackoverflow-answer-failed-to-fetch-using-a-form"
date: "2020-09-24"
excerpt: "## Original question: [Failed to fetch using a form](http://StackOverflow.com/q/63998087) * * * ## My answer: Vishal is correct. This is throwing an error because you are navigating away from the page when they submit. Change your event lis"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Failed to fetch using a form](http://StackOverflow.com/q/63998087)

* * *

## My answer:

Vishal is correct. This is throwing an error because you are navigating away from the page when they submit.

Change your event listener to start like this and the problem goes away:

```
submitBtnEl.addEventListener("click", e => { 
   e.preventDefault();
```

When the user navigates away, the request is aborted, thus the error handler fires.

You can see this in action (before you fix it as above) by looking at the network tab. The request shows "cancelled", i.e. the browser cancelled the request.

It's a little confusing here, because the order of events is:

1.  User clicks the submit button
2.  The event listener you created runs
3.  Inside of it, your `fetch` fires, including the establishment of its error handler
4.  When your event listener finishes, the **default** event handler runs. Since this is a form, and the button was a 'submit' type, the default event handler is to submit the form. When no action URL is given, it presumes the handler is the same page.
5.  The browser begins the process of navigating (i.e. submitting) to the same page.
6.  The browser cancels the `fetch` request, since the user is navigating "away" from the current page.
7.  The `fetch` request, having been cancelled, has now errored, and thus the error handler fires
8.  Your `alert` runs inside the error handler, pausing the execution of the page, including the navigation

So at that point it seems like they haven't navigated yet, but the process has already started enough to have cancelled the request.
