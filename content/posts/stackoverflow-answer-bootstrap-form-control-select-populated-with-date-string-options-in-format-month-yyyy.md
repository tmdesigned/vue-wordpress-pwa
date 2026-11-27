---
title: "StackOverflow Answer: Bootstrap Form.Control select populated with date string options in format 'MONTH YYYY'"
slug: "stackoverflow-answer-bootstrap-form-control-select-populated-with-date-string-options-in-format-month-yyyy"
date: "2020-03-20"
excerpt: "## Original question: [Bootstrap Form.Control select populated with date string options in format 'MONTH YYYY'](http://StackOverflow.com/q/60772487) * * * ## My answer: You'll need to also establish the current year and the current month, t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Bootstrap Form.Control select populated with date string options in format 'MONTH YYYY'](http://StackOverflow.com/q/60772487)

* * *

## My answer:

You'll need to also establish the current year and the current month, then do a loop of exactly 13 iterations, starting from the current month.

Here is a function I wrote to implement what you described. For simplicity's sake, it's not in React and doesn't use Moment (although it does use ES6).

```
const fareMon = () => {
  const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const now = new Date(); //right now
  const year = now.getFullYear(); //i.e. 2020
  const months = []; //holder for output
  let currentMonthIndex = now.getMonth(); //0-11, starting with today's month
  let yearsToAdd = 0; //for next year, the next, etc.
  for ( let i = 0; i < 13; i++ ){
    if ( currentMonthIndex === 12 ){
      //we've passed December
      currentMonthIndex = 0;
      yearsToAdd++;
    }
    let yearToUse = year + yearsToAdd;
    months.push( `${monthList[currentMonthIndex]} ${yearToUse}` );
    currentMonthIndex++;
  }

  return months;
};

console.log( fareMon() );
```

Hopefully that's enough to help you out and you can use the logic in your React app. I've added some inline comments to help explain what's happening at each step.

If you don't want to include the current month of next year, just change the for loop to be `i < 12` so that an extra month isn't included.

Working demo: [https://jsfiddle.net/4gu58pnm/2/](https://jsfiddle.net/4gu58pnm/2/)
