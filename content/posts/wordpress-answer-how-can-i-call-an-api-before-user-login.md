---
title: "Wordpress\" Answer: How can I call an api before user login"
slug: "wordpress-answer-how-can-i-call-an-api-before-user-login"
date: "2019-01-06"
excerpt: "## Original question: [How can I call an api before user login](http://Wordpress.StackExchange.com/q/324764) * * * ## My answer: I think this is just a slight mistake on your \"if\" condition ``` $result = preg_split('///','domain.com/api/use"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How can I call an api before user login](http://Wordpress.StackExchange.com/q/324764)

* * *

## My answer:

I think this is just a slight mistake on your "if" condition

```
$result = preg_split('///','domain.com/api/user/verify_phone');
var_dump($result);
```

Results in:

```
array(4) {
  [0]=>
  string(10) "domain.com"
  [1]=>
  string(3) "api"
  [2]=>
  string(4) "user"
  [3]=>
  string(12) "verify_phone"
}
```

So the result at \[1\] is "api", but you are checking for "/api/" on the fourth line of your code sample.
