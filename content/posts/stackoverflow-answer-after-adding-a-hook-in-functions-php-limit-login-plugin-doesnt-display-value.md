---
title: "StackOverflow Answer: After adding a hook in functions.php, limit login plugin doesn't display value"
slug: "stackoverflow-answer-after-adding-a-hook-in-functions-php-limit-login-plugin-doesnt-display-value"
date: "2020-01-27"
excerpt: "## Original question: [After adding a hook in functions.php, limit login plugin doesn't display value](http://StackOverflow.com/q/59929802) * * * ## My answer: First, the `create_function()` function is deprecated. You could try it like thi"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [After adding a hook in functions.php, limit login plugin doesn't display value](http://StackOverflow.com/q/59929802)

* * *

## My answer:

First, the `create_function()` function is deprecated. You could try it like this:

```
function my_login_errors_function(){
    return 'Error: Wrong Username or Password';
}
add_filter('login_errors', 'my_login_errors_function');
```

However, this doesn't fix the main problem, which is that your function will change _every_ login error text to the string we are returning.

Filters are like machines on a conveyor belt, receiving something and passing something along to the next step. But the way your function is written, it's a machine that completely disregards what comes in, and always spits out the same thing.

If you want to only replace a particular login error message, you would first have to check the existing text (the input to your filter machine) to see if it matched the one you want to replace, and then and only then would you return something else (otherwise returning the original argument's value).

```
function my_login_errors_function( $error ){
    if( $error === 'The error message I want to replace' ){
         return 'Error: Wrong Username or Password';
    }
    return $error;
}
add_filter( 'login_errors', 'my_login_errors_function' );
```

Likely what's happening is that plugin is using a login error to display the count, but since your function is overwriting _every_ error message, that count is getting overwritten.
