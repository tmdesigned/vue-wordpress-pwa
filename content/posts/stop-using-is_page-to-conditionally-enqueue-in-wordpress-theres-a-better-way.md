---
title: "Stop using is_page to conditionally enqueue in WordPress. There's a better way!"
slug: "stop-using-is_page-to-conditionally-enqueue-in-wordpress-theres-a-better-way"
date: "2018-10-17"
excerpt: "Trivia question: What is the best way to enqueue a script or a stylesheet on a specific page in WordPress? 1. Add the assets directly into header.php or footer.php 2. Add the assets directly via the HTML of the page template 3. Enqueue the "
image: "/img/uploads/2018/10/hook-243684_1280.jpg"
tags:
draft: false
---
Trivia question: What is the best way to enqueue a script or a stylesheet on a specific page in WordPress?

1.  Add the assets directly into header.php or footer.php
2.  Add the assets directly via the HTML of the page template
3.  Enqueue the assets with wp\_enqueue\_script / wp\_enqueue\_style in functions.php
4.  Enqueue the assets as in C, but add conditions so that it only happens on certain pages
5.  Use the better, more WordPress-y way

Yes, there is a better way. A way that you will not turn back from once you understand the power of its pattern. But first, what's wrong with options A-D?

## A. Add the assets directly into header.php or footer.php

This is the easiest, but the least efficient. If you add a <script ... or <link ... tag into the header or footer file, it will load on every page. The same script may load more than once if a plugin uses the same file. You cannotÂ _not_ load it on a specific page without using a separate header or footer file.

## B. Add the assets directly via the HTML of the page template

Similar to A, with one slight advantage. It will only load on the page it's used for. Unfortunately it's not going to load in an optimal place (CSS should be loaded in header, most JavaScript should be loaded towards the end of the page to not block rendering). You still risk double-loading, and you cannotÂ not load it in some cases if you need to, at least without bending over backwards.

## C. Enqueue the assets with wp\_enqueue\_script / wp\_enqueue\_style in functions.php

Now we're getting somewhere! The WordPress way is to let WordPress handle enqueing scripts and stylesheets. You get automatic versioning, and an alias with which you can un-register an asset or specify dependencies. The best approach is to firstÂ _register_ a script and thenÂ _enqueue_ it when necessary, but that's not the point I'm making with this article. Simply enqueuing is worlds above directly importing the assets in the page templates. In its natural form, you're still loading the asset on every page. Which leads us to...

## D. Enqueue the assets as in C, but add conditions so that it only happens on certain pages

This is by far the most common solution I see posted on the Internet. You mitigate the disadvantage of C and avoid loading it on every page by adding conditions in PHP where you enqueue the file. \[code language="php"\] if( is\_front\_page() || is\_page( 35 ) || is\_page\_template( 'page-contact-us.php' ) ){ wp\_enqueue\_script( 'form-validator' ); } \[/code\] The problem here is that it starts off simple, but quickly grows more complex. Another page needs that asset? Modify the conditional statement. Duplicate the page it so that it gets a new ID? I hope you wrote your conditionals flexibly. Don't get me wrong -- this is an appropriate solution in a lot of cases. But it doesn't have to be this messy!

## E. Use the better, more WordPress-y way

What's the better, more WordPress-y way to conditionally enqueue? Hooks! Your own hooks! The easiest hooks! Don't be afraid of hooks! This pattern is the way to go. There are two pieces to it:

1\. In your page template (or widget, plugin, etc.Â  -- wherever you want to use the assets ) add a do\_action line. Seriously, just throw it in there.

\[code language="php"\]do\_action( 'application\_assets' ); \[/code\]

2\. In your functions.php file, tie into the hook you just created to enqueue the assets

\[code language="php"\]add\_action( 'application\_assets', 'enqueue\_application\_assets' ); function enqueue\_application\_assets(){ wp\_enqueue\_script( 'form-validator', ..... wp\_enqueue\_style( 'form-style', ..... wp\_enqueue\_script( 'masked-input', .... }\[/code\] What are doing here is simple, Whenever we want these assets to be used, we're telling WordPress, "Hey, right here, if anybody has any 'application\_assets' code they want to run, please do it.". What 'application\_assets' code did we tell WordPress we wanted to run? The enqueue-ing of those assets. (It technically happens in the reverse order -- first WordPress add\_actions the actions, then it do\_actions them.) _Edit: It's actually nearly as good to use a function call here, something likeÂ enqueue\_application\_assets() which you would define in your functions.php file. You know, like the name suggests. However, I tend to use the hooks pattern instead, because that way other code in other places can also tie into this action. There's not a ton of difference with the exception that a function can only live in one place, and that one place therefore must control whatever happens, whereas a hook can have unlimited functions tied to it. Either way is fine._ Let's compare it to our earlier methods:

*   Does it run on every page?
    *   No, it runs specifically on the pages we want it.
*   Can it accidentally be loaded more than once?
    *   No, WordPress only enqueues once per file, even if called twice.
*   Can we choose toÂ _not_ load it?
    *   Yes, we can hook into the same action later and un-enqueue it.
*   Can we load it in the proper places?
    *   Yes, we can load scripts in the footer and stylesheets in the header, because we're using WordPress's enqueue functions.
*   Does it tolerate changes to the pages its used on?
    *   Yes, since the "condition" to have it loaded is the presence of the do\_action, it doesn't rely on the page id, page slug, template file name, or anything else like that that might change. It's simply in the code, or not.
*   Will the conditionality grow more complex the more places we use it?
    *   No -- each place we want to use it just gets the add\_action line. If a page doesn't use it, it doesn't get the line. If it does, it does.
*   What if I REALLY want to add in a conditional statement?
    *   You still can! Right in the enqueue function we wrote.

I use this pattern all the time now, and I wish someone had shown it to me earlier. Instead I had to work it out over time, but I'm sure I'm not the only one who has. It's the kind of elegantly simple solution that is so obvious once you begin using it, you can't believe you didn't think of it before. P.S. This doesn't just apply to enqueuing assets, although that's my most common usage. You can use it for any block of code that needs to run on specific pages only.
