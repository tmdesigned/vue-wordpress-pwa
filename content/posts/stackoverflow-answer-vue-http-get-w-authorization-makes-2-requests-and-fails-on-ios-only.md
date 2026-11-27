---
title: "StackOverflow Answer: Vue.http.get w/ authorization - makes 2 requests and fails on iOS only"
slug: "stackoverflow-answer-vue-http-get-w-authorization-makes-2-requests-and-fails-on-ios-only"
date: "2018-11-29"
excerpt: "## Original question: [Vue.http.get w/ authorization - makes 2 requests and fails on iOS only](http://StackOverflow.com/q/53545354) * * * ## My answer: I have to make an authenticated HTTP request using a bearer token. This works flawlessly"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Vue.http.get w/ authorization - makes 2 requests and fails on iOS only](http://StackOverflow.com/q/53545354)

* * *

## My answer:

I have to make an authenticated HTTP request using a bearer token. This works flawlessly on everything I've tested...except _some_ iOS devices.

```
  fetchWithToken : function( endpoint, token ){
    return Vue.http.get( urlBase + endpoint, {
      headers : {
        Authorization : 'Bearer ' + token
      }
    });
  },
```

From what I can tell, the request is being sent twice. Note this function only gets called once (verified by debugging) but the server receives 2 requests. The first request contains the token and authorizes successfully. The second has no token and fails, returning that failure to the rest of my app.

The two HTTP requests from one call makes me think CORS preflight requests. However it is the same domain and the urlBase variable in that function above is a relative address ('/api/'), not a full URL.

Is iOS forcing CORS? And if so, why is the second request sent without the authorization header instead of the preflight request?
