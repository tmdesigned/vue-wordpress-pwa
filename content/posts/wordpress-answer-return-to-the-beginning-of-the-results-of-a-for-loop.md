---
title: "Wordpress Answer: Return to the beginning of the results of a for loop"
slug: "wordpress-answer-return-to-the-beginning-of-the-results-of-a-for-loop"
date: "2019-02-14"
excerpt: "## Original question: [Return to the beginning of the results of a for loop](http://Wordpress.StackExchange.com/q/328696) * * * ## My answer: You can instantly access any position in an array by specifying the index. i.e. to get the first e"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Return to the beginning of the results of a for loop](http://Wordpress.StackExchange.com/q/328696)

* * *

## My answer:

You can instantly access any position in an array by specifying the index.

i.e. to get the first element of the $search\_results array:

```
$first_result = $search_results[0];
```

_Note if you're not used to working with arrays, they are "0" indexed in most languages, which means the first element's index is 0, the second is 1, etc._

This is what your loop is basically doing as well. Each time it accesses a different number directly, $search\_results\[$i\] is just putting the value of $i in the same spot as I had the 0 above.

You can **also** change the value of $i in your loop if you want to start the loop over, for instance. Adding the line:

```
$i = 0;
```

...would send you back to the beginning. However I would not recommend you work with the index of a loop until you are quite comfortable with them.
