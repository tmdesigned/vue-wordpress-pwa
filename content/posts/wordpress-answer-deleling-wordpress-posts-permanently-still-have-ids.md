---
title: "Wordpress Answer: Deleling wordpress posts permanently still have IDs"
slug: "wordpress-answer-deleling-wordpress-posts-permanently-still-have-ids"
date: "2019-03-31"
excerpt: "## Original question: [Deleling wordpress posts permanently still have IDs](http://Wordpress.StackExchange.com/q/333023) * * * ## My answer: Even if you find a way to reset the post and pretend it didn't happen, you **shouldn't**. WordPress"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Deleling wordpress posts permanently still have IDs](http://Wordpress.StackExchange.com/q/333023)

* * *

## My answer:

Even if you find a way to reset the post and pretend it didn't happen, you **shouldn't**.

WordPress uses a relational database structure. In short, a bunch of different tables in the database point to and rely on each other. The ID value of each row, such as the post ID for posts, is particularly important for linking different rows in different tables.

For instance, the "posts" table stores basic information about each post, including the post ID. The "post\_meta" table stores additional information about posts, linked to that post ID. The "comments" table stores comments, also cross-referenced to those post IDs. The list goes on and on.

Even within that same table ("posts"), other entries such as revisions refer back to the original post ID!

So as you can see, it's a complicated web of relationships. If WordPress was designed to go back and scrub all of these links when you trash a post, then I suppose it would work. It would still be confusing and a bad user experience, like how @Loren Rosen mentioned, which is one reason WordPress doesn't do it that way.

But the fact is, WordPress will not do all that for you when you trash a post. Some of the data is, I believe, removed when the post is permanently deleted. But a lot of those other records would be not just broken, but _wrong_.

So in summary, it's not a good idea. The post IDs are usually hidden from users, unless you aren't using permalinks, so what exactly are you trying to accomplish?
