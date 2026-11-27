---
title: "Wordpress Answer: Author Date Function not working as expected"
slug: "wordpress-answer-author-date-function-not-working-as-expected"
date: "2019-02-09"
excerpt: "## Original question: [Author Date Function not working as expected](http://Wordpress.StackExchange.com/q/328205) * * * ## My answer: Actually your function works as you described. I copied your function into a page template on my site with"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Author Date Function not working as expected](http://Wordpress.StackExchange.com/q/328205)

* * *

## My answer:

Actually your function works as you described.

I copied your function into a page template on my site without modifying it at all. I tested it with my main user, which has posted, and it said I had posted.

Then I created a dummy user that has not posted. I tested the same page and it said I had not posted. I also posted a post backdated more than 30 days, and it still said I had not posted within the last 30 days.

All of that is by design.

A couple of points to keep in mind:

*   You aren't specifying in your query which type of post is being retrieved. Are you sure that the user you are testing with hasn't posted _any_ type of post? i.e. a custom post type, a page, a contact form via a plugin, etc.
    
*   Your code is also always checking the currently logged in user. Make sure that's what you want.
