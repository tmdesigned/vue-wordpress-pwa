---
title: "Wordpress Answer: PHP code in page template vs functions"
slug: "wordpress-answer-php-code-in-page-template-vs-functions"
date: "2019-04-25"
excerpt: "## Original question: [PHP code in page template vs functions](http://Wordpress.StackExchange.com/q/308372) * * * ## My answer: In spite of no 'official' answers, this question is still rather popular, so a year later I will post my solidif"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [PHP code in page template vs functions](http://Wordpress.StackExchange.com/q/308372)

* * *

## My answer:

In spite of no 'official' answers, this question is still rather popular, so a year later I will post my solidified thoughts on this.

What led to this question is the experience of code working in some places, and not in others. For instance, why was I having to wrap code within a function in functions.php instead of just putting it there loosely, while I was able to keep it loose in a template file? It felt as if there was some fundamental difference in how WordPress treats the code in different places.

But of course, that's not accurate. PHP is PHP, and WordPress is just chugging along merrily on its way, line by line.

The main difference, as I wrote in my original question and as Krzysiek and others affirmed, is the loading order. But the loading order in WordPress is everything.

A theme's functions.php is loaded, relatively speaking, _very_ early on. It's still very much in a preparatory phase. WordPress's key functions are ready, such as add\_action(), as are plugins and globals. But it's not ready for you to start _doing_ things yet. The page output isn't being written yet, the main loop isn't running, etc.

So if you put a loose line of code to do something "now" in functions.php, it's probably too early. Instead, the loose lines of code here should be preparatory in nature, i.e. "Do this later," or "Here's a constant for later," or, as the name of the file suggests, "Here's a function to run later."

Template files, on the other hand, are run relatively late. WordPress is so far along in the process of loading that it has enough information to choose the correct template file for the user's request. Almost any loose code makes sense here, because we're nearing the end of the cycle. Everything else is set up and we're already building our output.

With all this in mind, things start to come into focus. Why does a syntax error in functions.php cause a white screen of death, but a syntax error in a template file just break the page halfway through? Because functions.php is running before any output, so an error breaks things before there's anything to show, but a template file could be halfway through output.

So it does come down to sequence, but in a more profound way than I originally thought.

p.s. What has helped me understand this better over the last year are (a) a better understanding of the loading order gained from stepping through the loading sequence with xDebug, literally watching how things unfold, and (b) a deeper understanding of hooks. Since loading order is so important in WordPress, the hooks system is critical. It's like time travel for your code.
