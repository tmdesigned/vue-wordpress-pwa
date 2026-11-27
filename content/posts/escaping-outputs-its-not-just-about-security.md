---
title: "Sanitizing inputs and escaping outputs: it's not just about security"
slug: "escaping-outputs-its-not-just-about-security"
date: "2019-04-03"
excerpt: "WordPress, now representing 33%+ of the top websites in the world, is a constant target for hackers and other malicious folk. The WordPress community does a great job of pushing updates to the core code, and even taking proactive steps to p"
image: "/img/uploads/2019/04/pexels-photo-545014.jpeg"
tags:
  - "WordPress"
draft: false
---
WordPress, now representing 33%+ of the top websites in the world, is a constant target for hackers and other malicious folk. The WordPress community does a great job of pushing updates to the core code, and even taking proactive steps to push its users towards safer server practices. But security in WordPress is only as strong as your site's weakest link. If a theme or plugin creates a vulnerability, and a bad guy is able to exploit it, chances are your entire site will be compromised.

But sanitation and escaping are not **only** about preventing attacks. More on that later.

I have been refocusing myself on applying recommended WordPress best practices for dealing with "untrusted" data. Let's first review the basics:

## Sanitizing input

Sanitizing data is about cleaning data **before** we accept it. Whenever we accept input, we have to be careful that it is sanitized. This means the content we are accepting will not mess up our existing data or open up a security hole. After all, we're allowing something in through the perimeter of our security.

![Exploits of a Mom](/img/uploads/2019/04/exploits_of_a_mom.png)

[https://xkcd.com/327/](https://xkcd.com/327/)

Sanitizing our inputs means that the data will first be filtered to prevent unwanted elements, such as injection attacks that intentionally misuse our database. WordPress provides a bunch of great, built-in sanitation functions. Among the simplest to use are:

*   [sanitize\_email()](https://codex.wordpress.org/Function_Reference/sanitize_email)
*   [sanitize\_file\_name()](https://codex.wordpress.org/Function_Reference/sanitize_file_name)
*   [sanitize\_html\_class()](https://codex.wordpress.org/Function_Reference/sanitize_html_class)
*   [sanitize\_key()](https://codex.wordpress.org/Function_Reference/sanitize_key)
*   [sanitize\_meta()](https://codex.wordpress.org/Function_Reference/sanitize_meta)
*   [sanitize\_mime\_type()](https://codex.wordpress.org/Function_Reference/sanitize_mime_type)
*   [sanitize\_option()](https://codex.wordpress.org/Function_Reference/sanitize_option)
*   [sanitize\_sql\_orderby()](https://codex.wordpress.org/Function_Reference/sanitize_sql_orderby)
*   [sanitize\_text\_field()](https://codex.wordpress.org/Function_Reference/sanitize_text_field)
*   [sanitize\_textarea\_field()](https://codex.wordpress.org/Function_Reference/sanitize_textarea_field)
*   [sanitize\_title()](https://codex.wordpress.org/Function_Reference/sanitize_title)
*   [sanitize\_title\_for\_query()](https://codex.wordpress.org/Function_Reference/sanitize_title_for_query)
*   [sanitize\_title\_with\_dashes()](https://codex.wordpress.org/Function_Reference/sanitize_title_with_dashes)
*   [sanitize\_user()](https://codex.wordpress.org/Function_Reference/sanitize_user)

(We can also use a few heavier functions, such as [wp\_kses](https://developer.wordpress.org/reference/functions/wp_kses/), to control input. WP\_KSES filters out specific unwanted HTML elements, so it's really less focused on safeguarding our database and more about looking ahead to when it will be output again. It tends to happen before hand though, since it's so expensive a process to run and we'd rather just do it once prior to saving it. Which leads us to...)

## Escaping output

Whereas sanitizing takes place before we **accept** data, escaping takes place **when we use it.** We have to escape all untrusted data in our themes, plugins, and other code. Data is not trusted when you can't completely account for its origin, such as user input, translation files, and even _the WordPress database_. (Another plugin might have an unpatched security hole, for instance.)

Escaping again filters out certain elements that can interfere and cause problems. This includes certain attacks that take place on the front end of a site, such as session hijacking of our users. Escaping is best done right at the point of output, so you can more easily tell if data has already been escaped or not (double escaping can mess up your data). As with sanitation, we have some great escaping functions:

*   [esc\_html()](https://codex.wordpress.org/Function_Reference/esc_html) 
*   [esc\_url()](https://codex.wordpress.org/Function_Reference/esc_url) 
*   [esc\_js()](https://codex.wordpress.org/Function_Reference/esc_js) 
*   [esc\_attr()](https://codex.wordpress.org/Function_Reference/esc_attr) 
*   [esc\_textarea()](https://codex.wordpress.org/Function_Reference/esc_textarea) 

And, there are even combination functions that combine some of these with the translation functions.

For instance, if we have this code pulling data from an Advanced Custom Field and that data has an apostrophe in it, we're in for some trouble:

\[code language="php"\]$title = get\_field( 'element\_title' ); //Mary's Recipe echo "![](... "$title")";\[/code\]  

But if we just add the proper escaping function, we're all set!

\[code language="php"\]$title = esc\_attr( get\_field( 'element\_title' ) ); //Mary's Recipe echo "![](... "$title")";\[/code\]  

## It's not all about security

That last example brings up an important point. I had been implementing the above elements for a long time under the impression that it was all about security. _Get off my site!_ and all that. But one day it occurred to me that I didn't understand something.

You see, many of WordPress' built-in functions are pre-escaped; the\_title, for instance. But digging through the code, I noticed the\_content() isn't. I thought I must be missing it, but I wasn't. the\_content() isn't escaped.

Surely WordPress wasn't being hypocritical, telling me to escape "all the things" but leaving escaping out of arguably its most important output function. Worse, I couldn't easily escape it without resorting to wp\_kses, which is a resource expensive function.

It led me to ask [this question](https://wordpress.stackexchange.com/questions/332740/why-escape-if-the-content-isnt) on WordPress Stack Exchange, which I phrased as, "Why escape if the\_content isn't?" I wanted to know why the rest of my output should be escaped if WordPress' own function wasn't. Once a hacker exploited something (say, an XSS attack), would it matter that my other code was safe? They'd be in the perimeter and could unlock the front door It didn't seem safe to me.

There was a great discussion in several great answers to my question, and the gist of it is that it's not all about security. It's about data conforming to our expectations. Data being used in an attribute should not break attributes. Data being used as a URL should work like a URL.

It reminds me a little of setting field restrictions for users, something I do often for custom fields. "This must be a number between 0 and 100, because I'm using it as a percentage, and I don't want you to break the code I'm writing for you." With escaping, I get to say things like, "This must not contain something that behaves like an HTML tag, and if you do, I'mma gonna take it out."

Doing this is _helpful_ from a security standpoint, but it is not the one-and-only defense. It's a piece of the security puzzle, but it's also about writing more robust, reliable code.

And, as some users pointed out, there are also several situations when a malicious user may have access to _some_ things (like a translation file) but not _all_ things (like the posts table).

## And it's not hard, anyways

WordPress makes sanitizing and escaping easy. It makes code dealing with un-trusted input safer and more reliable. Sanitizing and escaping becomes a habit, and when you look at code that isn't processed correctly, it just starts to look wrong, like code that isn't indented. It just matters a whole lot more than that.
