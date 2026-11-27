---
title: "StackOverflow Answer: How to re-submit a jquery ajax event from global catchers?"
slug: "stackoverflow-answer-how-to-re-submit-a-jquery-ajax-event-from-global-catchers"
date: "2020-02-21"
excerpt: "## Original question: [How to re-submit a jquery ajax event from global catchers?](http://StackOverflow.com/q/60308680) * * * ## My answer: Instead of tying into the `ajaxError` function, how do you feel about just handling the error right "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to re-submit a jquery ajax event from global catchers?](http://StackOverflow.com/q/60308680)

* * *

## My answer:

Instead of tying into the `ajaxError` function, how do you feel about just handling the error right where you make the AJAX request? There is a built in `error` callback you can use, and that way you'd still have easy scope access to the original request so as to resend it.

```
const getToken = () => 'Bearer 123';

const sendRequestWithResend = (url, options) => {
  let existingErrorFunction = options.error;
  options.error= function(XMLHttpRequest, textStatus, errorThrown) {
    if(existingErrorFunction){
      existingErrorFunction(XMLHttpRequest, textStatus, errorThrown);
    }
    //resend request with header token, if header wasn't set
    if(options.headers && options.headers.Authorization){
      return; //token was already set
    }else{
      if(!options.headers){
        options.headers = {};
      }
      options.headers.Authorization = getToken();
      sendRequestWithResend(url,options);
    }
  }
  $.ajax(url,options);
}

sendRequestWithResend('https://notarealdomainforthisexample.com',{});
```

Here, I've created a wrapper function for your AJAX calls. It automatically adds an error handler (while preserving any existing error handling function) that retries the request (calling the same function recursively) with the bearer token (unless it already had a token -- important to prevent an infinite loop).
