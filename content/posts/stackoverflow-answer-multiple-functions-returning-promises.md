---
title: "StackOverflow Answer: Multiple functions returning promises"
slug: "stackoverflow-answer-multiple-functions-returning-promises"
date: "2018-11-02"
excerpt: "## Original question: [Multiple functions returning promises](http://StackOverflow.com/q/53120080) * * * ## My answer: I have an HTTP helper that returns a promise for each request. Sometimes those requests depend on each other. I am confus"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Multiple functions returning promises](http://StackOverflow.com/q/53120080)

* * *

## My answer:

I have an HTTP helper that returns a promise for each request. Sometimes those requests depend on each other. I am confusing myself into coding what I think are anti-patterns for this.

Normally when chaining promises you use `.then()`

```
function giveMeASimplePromise(){
     return new Promise( function(resolve, reject){
          setTimeout( function(){
               console.log("I'm finishing a promise.");
               resolve();
          }, 3000 );
     });
}

giveMeASimplePromise().then( giveMeASimplePromise ).then( giveMeASimplePromise );

//prints 'I'm finishing a promise' 3 times spaced 3 seconds apart
```

But I am getting confused if there is a promise _within_ one of those promises that needs to be part of the chain.

This is coming up for me because I have an HTTP helper function that returns a promise with each request. A couple of those requests depend on each other. And the whole process needs to return a promise to keep everything async.

```
function login( credentials ){
    //outer promise that's returned and either needs to resolve or reject based
    // on complete login cycle
    return new Promise( function(resolve, reject){
        //inner promise checking for username/password match. can be rejected 
        // for several reasons.
        var checkCredentials = httpHelper.checkCredentials( credentials );
        checkCredentials.then( function(result){
            if ( result.credentialsMatch ){
                //another inner promise checking for privilege levels. never rejects.
                var checkPrivileges = httpHelper.getPrivileges( result.userID ); 
                getPrivileges.then( function(result) ){
                    if( result.privilege > 0 ){
                        //want this to resolve the entire chain
                        resolve();
                    }else{
                        //want this to reject the entire chain
                        reject('You do not have sufficient privileges.');
                    }
                }
            }else{
                reject('Incorrect username and/or password.');
            }
        }).catch( function(reason){
            reject( reason );
        });
    });
}

var credentials = { ... };
var loginResult = login( credentials ).then( function(value){
    console.log('Logged in successfully.');
}).catch( function(reason){
    console.log('Could not log in: ', reason);
})
```

That's an anti-pattern, right? It feels wrong.
