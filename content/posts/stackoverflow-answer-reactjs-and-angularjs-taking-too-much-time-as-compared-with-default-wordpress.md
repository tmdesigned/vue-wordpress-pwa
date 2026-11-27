---
title: "StackOverflow Answer: ReactJs and AngularJs taking too much time as compared with default wordpress"
slug: "stackoverflow-answer-reactjs-and-angularjs-taking-too-much-time-as-compared-with-default-wordpress"
date: "2020-02-11"
excerpt: "## Original question: [ReactJs and AngularJs taking too much time as compared with default wordpress](http://StackOverflow.com/q/60166903) * * * ## My answer: A lightweight React or Angular application is likely not taking 40 seconds or 1.5"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [ReactJs and AngularJs taking too much time as compared with default wordpress](http://StackOverflow.com/q/60166903)

* * *

## My answer:

A lightweight React or Angular application is likely not taking 40 seconds or 1.5 minutes to load, or to render. I suspect what you are seeing is the network requests for those resources taking that long.

In the Network tab of your inspector, have a look at the AJAX requests you are making for those posts (the raw JSON value). It should give you a total time spent loading, and that is likely where you are seeing your delay.

Here's the thing though. You cannot have Angular, React, or any other frontend library access the WordPress posts without _some_ backend code fetching it. In the case of the WordPress API (which your URL shows you are using) -- that backend code is...wait for it...WordPress!

In other words, when you access the API, WordPress itself loads. It is designed to be a slimmed down WordPress, but it still goes through a loading cycle and then runs the same database query as on the frontend of the site.

So if, for instance, you have a plugin on your site that gets loaded and takes 30 seconds to finish, that will slow you down. It could literally be hundreds of things, and we can't see your entire WordPress installation to debug it.

You've specified to load 100 posts in your query, which is a bit heavy. Are you sure you're comparing apples to apples? In WordPress, are you loading 100 posts and their full content, like the `/posts` endpoint does in the API?

What I would suggest is doing a fresh install of WordPresss and seeing what the times are. If they are fast, slowly start adding the code (i.e. theme, plugins, posts, etc.) you have on your real site, and pay attention to when it gets slow.

For the sake of reference, I power my frontend WordPress site with Vue (a similar framework) and the WordPress API, and my posts load in well under a second. So it can be done, you just need to figure out your bottleneck.
