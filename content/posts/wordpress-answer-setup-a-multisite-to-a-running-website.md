---
title: "Wordpress Answer: Setup a multisite to a running website"
slug: "wordpress-answer-setup-a-multisite-to-a-running-website"
date: "2019-01-18"
excerpt: "## Original question: [Setup a multisite to a running website](http://Wordpress.StackExchange.com/q/325930) * * * ## My answer: > I enabled the multisite network on my main website ([http://example.com](http://example.com)) added subdomain "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Setup a multisite to a running website](http://Wordpress.StackExchange.com/q/325930)

* * *

## My answer:

> I enabled the multisite network on my main website ([http://example.com](http://example.com)) added subdomain ([http://pt.example.com](http://pt.example.com)) pointing to another directory. I got confused after this step. I installed a new wordpress on this directory with new database

A multisite WordPress installation shares a single copy of the WordPress files, and a single database. Each site within the network gets a separate set of tables in the database, but it's the same WordPress installation.

You should **not** create a separate folder and reinstall WordPress as you did. You should create the new "site" on the main WordPress installation and configure it (as it sounds like you did), then point your DNS for the subdomain to the same host (or virtual host) as your main WordPress installation.
