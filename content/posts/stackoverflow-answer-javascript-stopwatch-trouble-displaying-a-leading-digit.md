---
title: "StackOverflow Answer: JavaScript Stopwatch - Trouble Displaying a Leading Digit"
slug: "stackoverflow-answer-javascript-stopwatch-trouble-displaying-a-leading-digit"
date: "2018-08-30"
excerpt: "## Original question: [JavaScript Stopwatch - Trouble Displaying a Leading Digit](http://StackOverflow.com/q/52085830) * * * ## My answer: When you do \"0\" + minutes (and seconds, and hours) those variables get automatically converted into a"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [JavaScript Stopwatch - Trouble Displaying a Leading Digit](http://StackOverflow.com/q/52085830)

* * *

## My answer:

When you do "0" + minutes (and seconds, and hours) those variables get automatically converted into a string, consisting of two characters, a zero and something else.

Since the variables carry through each iteration, the next time you are adding another "0" character to the beginning of the string, and so-on.

The reason it's not happening to seconds is because you are converting seconds BACK to an int at the beginning of the loop when you do seconds++. So it becomes a string, then an int, then a string, etc.

To see this in action, try this snippet:

```
var test = 1;
console.log( typeof test );  //outputs "number"
test = "0" + test;
console.log( typeof test ); //outputs "string"
test++;
console.log( typeof test); //outputs number
```

My suggestion would be to separate counting units from display units. See if minutes is less than 10, and if so set outputMinutes to "0" + minutes. Do the same for seconds and hours. Then you just change the outputMinutes, outputSeconds, and outputHours each time, while the actual minutes, seconds, and hours variables remain as integers.
