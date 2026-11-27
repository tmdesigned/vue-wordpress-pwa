---
title: "Wordpress Answer: Blogs got Deleted automatically"
slug: "wordpress-answer-blogs-got-deleted-automatically"
date: "2019-01-19"
excerpt: "## Original question: [Blogs got Deleted automatically](http://Wordpress.StackExchange.com/q/326059) * * * ## My answer: I assume you mean blog _posts_ and not blogs which usually refers to all posts together. Anyways, it sounds like a data"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Blogs got Deleted automatically](http://Wordpress.StackExchange.com/q/326059)

* * *

## My answer:

I assume you mean blog _posts_ and not blogs which usually refers to all posts together.

Anyways, it sounds like a database issue, not a WordPress issue. WordPress will not automatically delete posts.

You either have some bad acting code on your site (like a plugin that's doing far too much), or much more likely, your site's database (or the posts table) was restored to an earlier date or emptied entirely.

Since you are still able to log in, we can rule out that your database is gone or that the entire database is reset. It may still be the wp\_posts table which holds your posts.

You should restore your most recent database backup and go from there. If you are not making database/site backups, you (a) need to start and (b) should contact your host, because many (most?) web hosts make automatic backups and may be able to retrieve a recent one for you.

Do that today -- time is of the essence -- because generally automatic backups are only kept for a limited amount of time.
