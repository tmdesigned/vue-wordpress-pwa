---
title: "Wordpress Answer: Allow direct access to files/folders within Wordpress to replace wp-admin"
slug: "wordpress-answer-allow-direct-access-to-files-folders-within-wordpress-to-replace-wp-admin"
date: "2019-02-18"
excerpt: "## Original question: [Allow direct access to files/folders within Wordpress to replace wp-admin](http://Wordpress.StackExchange.com/q/329052) * * * ## My answer: Since you asked for recommended approaches... Why code your own custom dashbo"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Allow direct access to files/folders within Wordpress to replace wp-admin](http://Wordpress.StackExchange.com/q/329052)

* * *

## My answer:

Since you asked for recommended approaches...

Why code your own custom dashboard? What is WordPress not doing that yours would?

WordPress is 15 years old with contributions from hundreds of developers. Are you sure that your dashboard is going to be better, and worth your time (or your clients' time) to code?

I don't mean that to be rude at all. Maybe you have a valid reason that you need a custom dashboard. But it would take a lot to convince me it's a better route than just extending or modifying the WordPress one. And the first part of that convincing would be telling me what you hope to gain. What is unique about your situation?

In answer to your second question, that doesn't sound like a WordPress issue, but rather a server or file issue. Here's why:

The way WordPress works on the server is that everything is rerouted to index.php. This bootstraps the WordPress process, including the handling of rewrite rules for all other paths. The way that the requests are rerouted to WordPress is important here:

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
```

This is the standard Apache .htaccess WordPress redirect block. In English, line by line, it would read:

*   If the server can handle redirects:
*   Get ready to redirect
*   We'll be talking about the / directory
*   If the request is for index.php, great! Do nothing, we're done.
*   If the request is NOT for a real, existing file...
*   and if the request is NOT for a real, existing directory...
*   ...then redirect to index.php
*   End of code that only runs if the server can handle redirects

So the important part for your case is that, in a nutshell, requests only get redirected to WordPress if they aren't actually real files or directories. Since you said they are real files and directories, something seems to be misconfigured on your server.

Please make sure that the files are present, that their permissions are correct (For instance: directories set to 755, files set to 644), and that the path you are attempting to access them at is correct. For real files at mydomain.com/custom\_dashboard/index.php, that folder would be in the same directory as wp-content and wp-admin, but not inside either of them.
