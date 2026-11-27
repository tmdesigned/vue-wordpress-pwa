---
title: "StackOverflow Answer: Is creating a table to store one single row sign of bad programming?"
slug: "stackoverflow-answer-is-creating-a-table-to-store-one-single-row-sign-of-bad-programming"
date: "2020-01-28"
excerpt: "## Original question: [Is creating a table to store one single row sign of bad programming?](http://StackOverflow.com/q/59939872) * * * ## My answer: If your question is really just, \"is it a bad design practice to use a database (**edit**:"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Is creating a table to store one single row sign of bad programming?](http://StackOverflow.com/q/59939872)

* * *

## My answer:

If your question is really just, "is it a bad design practice to use a database (**edit**: or database table) to hold only one piece--or a few pieces--of data", I would say probably not. Databases are a place to hold data, and they very easily scale. You might at some point need to hold more data, and in the future a lot more data, and databases do that very efficiently.

Is it overkill for a single piece of data? Probably, but I doubt you'd end up just storing that one piece there. If it's just one user (you) you don't need a database, but rather secure credentials or an application that only you can access. But assuming it's not just for you, you'll probably find a lot of other things that are helpful to store there.

However, the question you didn't really ask but should be more interested in, is _can_ you do this securely? The answer there is a lot more dubious. Even very well-designed, complex user access systems have vulnerabilities. It is difficult to account for all of the common vulnerabilities and design flaws. How will you handle password encryption? Brute force attack denial? Attacks that use the variance in the _response time_ of your database to different passwords to hone in on the password?

I'm not a security expert, but I know enough to know that, and to leave security related systems to those who specialize in them. I suggest you do the same.

If you absolutely need to have a user-authentication process, use a system that already exists. It's not that hard, and a lot more secure, to tie into an authentication system. If you don't absolutely need to, and this is all just for you or one other user, just avoid the security problem and don't develop it as a public system that you log into over the application.

**Edit:** Rereading your question, you already have a database but are asking about an additional table in it. My answer holds -- it's not a bad practice, but storing of a password in it is still very risky if you don't know what you're doing.
