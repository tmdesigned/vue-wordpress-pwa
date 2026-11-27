---
title: "Wordpress Answer: Can I clone plugin folder to another directory so that I don't have to reinstall them?"
slug: "wordpress-answer-can-i-clone-plugin-folder-to-another-directory-so-that-i-dont-have-to-reinstall-them"
date: "2019-03-24"
excerpt: "## Original question: [Can I clone plugin folder to another directory so that I don't have to reinstall them?](http://Wordpress.StackExchange.com/q/332471) * * * ## My answer: Sure you can copy the folders and their contents over. A few cav"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Can I clone plugin folder to another directory so that I don't have to reinstall them?](http://Wordpress.StackExchange.com/q/332471)

* * *

## My answer:

Sure you can copy the folders and their contents over. A few caveats:

*   they will start as deactivated
*   their database records will not be copied over automatically. Some paid plugins store the license key in the database.
*   there may be compatibility issues if your new site is on a different version of WordPress, PHP, etc., Especially since you said the site is a couple of years old and you haven't touched it in a while

Personally I would rather try to fix what you have and then go from there. "Can't be fixed" is subjective. If you reinstall the core WordPress files, network deactivate the plugins, and network-wide deactivate non-core themes, you still can't get into the subsites' dashboards?
