---
title: "StackOverflow Answer: How do I create a hyperlink inside an input text field in html?"
slug: "stackoverflow-answer-how-do-i-create-a-hyperlink-inside-an-input-text-field-in-html"
date: "2018-02-28"
excerpt: "## Original question: [How do I create a hyperlink inside an input text field in html?](http://StackOverflow.com/q/49018512) * * * ## My answer: An input field's value is stored as plain text, therefore you cannot include HTML (i.e. a link)"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How do I create a hyperlink inside an input text field in html?](http://StackOverflow.com/q/49018512)

* * *

## My answer:

An input field's value is stored as plain text, therefore you cannot include HTML (i.e. a link) and expect the HTML to be parsed and functioning.

You could simulate this behavior with JavaScript, however I would recommend against it. (You would add a click listener, your function would pull the value of the field, see if it is a valid URL, and then open up the location.)

I'm not going to write the code for this because it would be a terrible user experience. The standard behavior for an input field is that you click on it to edit the text. This is an assumption your users have, and they would therefore (a) not think to click on it because they don't expect it to be a link, and (b) click in it if they wanted to edit the text, only to be redirected and unable to edit the text.

Alternatively, you could add a small button next to the input, i.e. 'Open' or 'Test' or an external link icon.
