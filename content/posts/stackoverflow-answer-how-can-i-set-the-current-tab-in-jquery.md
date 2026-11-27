---
title: "StackOverflow Answer: How can I set the current <li> tab in JQuery"
slug: "stackoverflow-answer-how-can-i-set-the-current-tab-in-jquery"
date: "2019-01-06"
excerpt: "## Original question: [How can I set the current](http://StackOverflow.com/q/54060922)* [tab in JQuery](http://StackOverflow.com/q/54060922) * * * ## My answer: Like you said, you do need to also specifically add the class 'current' which i"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How can I set the current](http://StackOverflow.com/q/54060922)*   [tab in JQuery](http://StackOverflow.com/q/54060922)

* * *

## My answer:

Like you said, you do need to also specifically add the class 'current' which is not in your main code sample.

You said you tried `addClass('tab-link current')` but we can't see that in the context of your whole code. You have a commented out line, but it doesn't make sense by itself because it would apply to all of the items and seems to be from an earlier iteration of your code.

How is your code to know _which_ item should get the current class, if any? Perhaps try something like this (setting the first item to current, in this case):

```
success: function (questionTypeData) {
        var len = questionTypeData.length;
        clearListItemsOf(ULId);
        for (var i = 0; i < len; i++) {
            var questionTypeId = questionTypeData[i]['questionTypeId'];
            var questionType = questionTypeData[i]['questionType'];
            var listItem = $('<li></li>').val(questionTypeId)
                            .text(questionType).addClass('tab-link').attr('data-tab',questionType);
            if ( i == 0 ){
                listItem.addClass( 'current' );
            }
            $(ULId).append(listItem);
        }
    },
```
