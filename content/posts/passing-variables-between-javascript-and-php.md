---
title: "Passing variables between JavaScript and PHP"
slug: "passing-variables-between-javascript-and-php"
date: "2017-07-24"
excerpt: "JavaScript and PHP share many similarities but are fundamentally different. JavaScript code is compiled and executed by the user's browser (at least in the case of websites, although JavaScript can be run on other devices and even by the se"
image: "/img/uploads/2017/07/ajaxcall.jpg"
tags:
  - "JavaScript"
  - "PHP"
draft: false
---
JavaScript and PHP share many similarities but are fundamentally different. JavaScript code is compiled and executed by the user's browser (at least in the case of websites, although JavaScript can be run on other devices and even by the server with Node.js). PHP, however, is compiled and executed by the server. By the time the user receives the page, the PHP is _gone_. There's absolutely no trace of it on the page. This makes it ideal for secure processing of data, database interactions, user authentication, and basically anything else you don't want users to see, touch, or know about. Understanding that basic difference is fundamental, because often for a web application to work the two languages have to interact. Since one is completely done and gone before the other even starts, you have to think of things differently depending on which direction you want to go.

## From PHP to JavaScript

This is the simplest of the two directions, and there's really two different ways to go about this.

### Direct PHP to JavaScript injection

Since PHP is done before JavaScript starts, this first method essentially has PHP plop it out right in the middle of the JavaScript.

```javascript
var userIsRegistered = false;
<?php if( ...some php code here... ) echo "userIsRegistered = true;"; ?>
```

So

we have some conditional logic, but all that's happening before the page is sent to the browser. All the browser will see is:

```javascript
var userIsRegistered = false;
userIsRegistered = true;
```

Or, it won't see the second line if the conditional fails. We make sure to always declare the JavaScript variable ahead of time to account for either case. What are the cons here? Well first of all, it's a little clunky. We're mixing languages, trying to keep everything separate, and our end result is kind of funny. Second, we have a possible performance bottleneck. If ...some php code here... involves a complicated query, we're waiting.

### AJAX Requests

A little cleaner, but a lot more work, is to create a _separate_ PHP file whose sole purpose is to feed our data.What we're really doing here is messing with the timing of our scripts. Normally, it goes:

1.  PHP
2.  JavaScript

But if at some point JavaScript calls a separate PHP file, _that_ is when that PHP runs. So instead we have:

1.  PHP
2.  JavaScript
3.  PHP file called by JavaScript
4.  The rest of JavaScript from #2 above

Since JavaScript can invoke PHP, we have now call server side code from client side code. The door is wide open. We can extend this and repeat it any number of times. The example above might look a little something like this, using jQuery's helper function for AJAX requests:

```javascript
//Starting our answer as false, it will change to true if AJAX request succeeds
var userIsRegistered = false;

$.ajax('/getUserData.php',{
  //The data we send -- including both the question we're asking and info to determine the answer
  data: {
    username: myUsername,
    function: isRegistered
  },

  //What happens when we get our answer. Also, our answer will be in the 'data' variable.
  success: function(data){
    //Turn it into an object
    var result = JSON.parse(data);

    //Make sure response succeeded and didn't fail
    if(result.response == 'OK'){
      if(result.answer){
        userIsRegistered = true;
      }
    }else{
      //Response wasn't OK, so what's the deal?
      console.log(result.message);
    }
  },

  error: function(){
    //Handle AJAX connection errors
  }
});
```

```php
//separate php file

//Standard object to hold our response data
$resultObject = new stdClass();

//Start with a default of failure, will be changed to OK if request succeeds
$resultObject->response = 'Failure';

//Were we asked a question?
if(isset($_GET['function'])){

  //What question were we asked?
  switch($_GET['function']){
    case 'isRegistered':
      //Oh, we were asked if a user is registered

      //Do we have enough information?
      if(isset($_GET['username'])){
        //We have enough information, so we ARE sending back a good response
        //(We would actually likely want to make sure the connection was good first
        //before assuming this. But that's beyond the example here.)
        $resultObject->response = 'OK';

        if(is_user_registered()){
          //User was registered, so our answer is yes
          $resultObject->answer = true;
        }else{
          //User was not registered, so our answer is no
          $resultObject->answer = false;
        }
      }else{
        //We don't have enough information
        $resultObject->message = 'Username must be provided';
      }
      break;
  }
}

//Spitting out everything we're sending back
echo json_encode($resultObject);
```

This is admittedly more complex than absolutely necessary, but you'll see why. First, what exactly are we doing here? Put simply, JavaScript is asking a separate PHP file a question. We're doing this by specifying a function to run (isRegistered) and passing it some data to use to answer the question. The PHP file determines (a) What question am I being asked? (b) Do I have enough information to answer it? and (c) What is the answer? It uses a simple object to store its work, then at the end of the day outputs that object (encoded into simple text, i.e. JSON). The AJAX function of our JavaScript waits for information, which the PHP gives it by echoing out the data. It then has to interpret the response and make sure everything went as planned. You wouldn't want to just check if the result was true/false because...why was it false? So with just a small increase in complexity, we've also upped our capabilities. Now, we could instead create a file whose whole purpose is to return the answer to the question, "Is the user registered?" We might name that file, isUserRegistered.php, and all we'd have to pass it is some criteria on which it would determine the answer (like a username or email). It would return yes or no, and we'd be done. But by abstracting a layer, we get so much more. We call the file something a bit more generic (i.e. getUserData.php), and expect it to handle the answers to a lot of questions about the user. Maybe it can answer "Is the user registered?", "Can the user edit a post?", "What is the user's email address?", and a hundred other inquiries. So in addition to sending it criteria, we also send it the question we're asking (i.e. isRegistered). In exchange, it also does a bit more for us as well. It gives us an answer, but also a helpful error message if it fails. Why did it fail -- was it because a username wasn't provided? We could also build in checks to make sure a failure wasn't because of a database error, a slow server, a non-existent user, etc. So the big advantage here over the first method is the clean, separated layers of code. PHP is in a PHP file doing PHP things. JavaScript does JavaScript things. Maybe that doesn't matter to you, but it will as your application grows. It keeps things nice and neat, and it simply works better and allows for extra capabilities. Furthermore, while we're waiting for that AJAX request to complete, we can also be doing other JavaScript-y things. _Note: Each time we do an AJAX call, that's a new HTTP request. So really, we'd probably want to bundle some of these together. PHP could instead return a user object one time, with all of its capabilities clearly spelled out. But sometimes things are more dynamic, depending on user input or dealing with large datasets, and pulling things in smaller pieces makes more sense. And what's more, sometimes things aren't going in this direction at all!_

## From JavaScript to PHP

If you understand method #2 above, then you may have thought ahead and realized, "Wait a minute, JavaScript is already sending information to PHP in my AJAX request above!" That's right, we've already answered the second direction here. We sent a criteria (username) and a question (isRegistered) in our example above. We can just as easily send any other data to PHP. The important thing to think of here is that with AJAX, we are changing that 'natural' order of events from (1) PHP, (2) JavaScript to anything we want. So if JavaScript needs PHP to update something for us (like a user profile), it can send that to a helper file which doesn't run until that point. We could even use the same file and send it a different function to run (of course it would need some additional data, as well as some solid authentication protocols).

## What have we accomplished?

The great thing about the more complete method described here is that in the end, we've basically created an API. It can handle a variety of tasks, and it can handle them robustly. We can extend it, reuse it, and refine it. As our application grows, our API can grow with it. That's a scalable, robust solution!
