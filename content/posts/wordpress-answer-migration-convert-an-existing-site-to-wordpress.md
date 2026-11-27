---
title: "Wordpress Answer: Migration / convert an existing site to WordPress"
slug: "wordpress-answer-migration-convert-an-existing-site-to-wordpress"
date: "2019-02-17"
excerpt: "## Original question: [Migration / convert an existing site to WordPress](http://Wordpress.StackExchange.com/q/328962) * * * ## My answer: Since it is a custom site and database structure, there is no easy way to import your data into WordP"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Migration / convert an existing site to WordPress](http://Wordpress.StackExchange.com/q/328962)

* * *

## My answer:

Since it is a custom site and database structure, there is no easy way to import your data into WordPress.

I would suggest you instead focus on how you would accomplish the same thing within WordPress. In other words, start by pretending you don't have those 1,000's of ads, and build out your way of tracking ads in WordPress. Then, when that works, you can think through if there's any way to move some of the data.

If not, it would probably be easier to leave the old ads as-is and have the front-end run both implementations (pull from both data sources).

You _could_ build a custom plugin that allowed you to continue using the custom database structure you already have, yet give you an editing capability through WordPress. After all, WordPress is quite comfortable with mySQL.

So consider what you are hoping to gain by integrating the site with WordPress, how you would integrate it with WordPress in the first place, and then whether or not its worth bringing in your old data.
