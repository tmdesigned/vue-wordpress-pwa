---
title: "StackOverflow Answer: Is there a way to return items from an array after a certain time using date-fns or JavaScript"
slug: "stackoverflow-answer-is-there-a-way-to-return-items-from-an-array-after-a-certain-time-using-date-fns-or-javascript"
date: "2020-07-23"
excerpt: "## Original question: [Is there a way to return items from an array after a certain time using date-fns or JavaScript](http://StackOverflow.com/q/63052744) * * * ## My answer: You can extract the 'hours' component of the date with the same "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Is there a way to return items from an array after a certain time using date-fns or JavaScript](http://StackOverflow.com/q/63052744)

* * *

## My answer:

You can extract the 'hours' component of the date with the same library's `getHours` function, and then see if the number it returns is 13 or higher. Combined with your existing usage of `isWeekend`, your filter is quite simple.

Note: This library is going to run both of those functions based on the user's current locale, while your dates are specifying a timezone. Just something to keep in mind.

```
const days = [
  { date: "Sun Jul 25 2020 15:30:00 GMT+0100 (British Summer Time)" },
  { date: "Sun Jul 25 2020 19:00:00 GMT+0100 (British Summer Time)" },
  { date: "Sat Jul 25 2020 05:00:00 GMT+0100 (British Summer Time)" },
  { date: "Sat Jul 25 2020 02:00:00 GMT+0100 (British Summer Time)" }
];

const filteredDays = days.filter((day) => {
 return dateFns.isWeekend(day.date) && dateFns.getHours(day.date) >= 13;
});

console.log(filteredDays);
```

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js"></script>
```
