---
title: "Unit Testing and Test Driven Development (TDD)"
slug: "unit-testing-and-test-driven-development-tdd"
date: "2018-06-07"
excerpt: "Unit Testing allows developers to efficiently--and thoroughly--test individual pieces of their code to make sure it behaves correctly. Since most functions and snippets are written for a specific purpose, it is far too easy and tempting to "
image: "/img/uploads/2018/09/lab-217043_1280.jpg"
tags:
  - "JavaScript"
draft: false
---
Unit Testing allows developers to efficiently--and thoroughly--test individual pieces of their code to make sure it behaves correctly. Since most functions and snippets are written for a specific purpose, it is far too easy and tempting to write it "until it works" and then move along. But unless the code is tightly controlled, with varying data this isn't really good enough.

With unit testing, we subject our code to a wide gamut of possible conditions to make sure it always does just what we expect, everything we expect, and nothing but what we expect.

Test Driven Development (TDD) employs this outlook from the very beginning. Rather than taking an existing function and trying to come up with tests to see if it "holds up", we write the code iteratively, specifically to solve each of our tests. The development of a function, isNumberPrime( num ), might look like this:

//Test 1 - isNumberPrime should return a boolean value

function isNumberPrime( num ){
     return true;
}

So our first test passes, and we move on by adding other tests that break our code, fixing it as we go.

//Test 1 - isNumberPrime should return a boolean value  
//Test 2 - 3 should return true and 4 should return false

function isNumberPrime( num ){
     for( var i = num - 1; i > 1; i-- ){
          if ( num % i == 0 ){
               return false;
          }
     }
     return true;
}

This works for basic cases, but there are some obvious ones where it will completely break (i.e. negative numbers will be an infinite loop). Let's add a few more tests

//Test 1 - isNumberPrime should return a boolean value  
//Test 2 - 3 should return true and 4 should return false  
//Test 3 - negative numbers should not cause an infinite loop  
//Test 4 - 0 should return false, 1 should return true

function isNumberPrime( num ){
     if ( num < 1 ) return false;
     if ( num == 1 ) return true;
     for( var i = num - 1; i > 1; i-- ){
          if ( num % i == 0 ){
               return false;
          }
     }
     return true;
}

I added test 4 above so that our for-loop, which starts out with i at 1 less than our number, will never start out too low. That covers all integers. What about floats?

//Test 1 - isNumberPrime should return a boolean value  
//Test 2 - 3 should return true and 4 should return false  
//Test 3 - negative numbers should not cause an infinite loop  
//Test 4 - 0 should return false, 1 should return true  
//Test 5 - 3.5 should return false

function isNumberPrime( num ){
     if ( !Number.isInteger( num ) ){
          return false;
     }
     if ( num < 1 ) return false;
     if ( num == 1 ) return true;
     for( var i = num - 1; i > 1; i-- ){
          if ( num % i == 0 ){
               return false;
          }
     }
     return true;
}

I honestly thought it would already return false, but 3.5 returned true. This is because our code basically says, "For the number you gave me, keep subtracting 1, and see if that new number divides evenly into it. If you never find one that does, it is a prime number." Since none of a float's would, the code thought it was prime. We can just make sure our input is an integer.

That's a great example of what I mentioned before. I assumed my code would already work for non-integers, but it didn't. It gave a bad result, and now my code is better because I'm letting my tests drive my development.

Coming up with the tests is, of course, the challenge. You have to think of different inputs, especially inputs at the fringes, and throw everything you can at it. Here's my test suite after a bunch of other tests, none of which ended up breaking the function.

//Test 6 - 6 should return false  
//Test 7 - 200 should return false  
//Test 8 - 25 should return false  
//Test 9 - 17 should return true  
//Test 10 - 199 should return true

Everything's looking great. Now, prime numbers get really huge really fast, and I know my function is not going to handle everything. But I also know it could be a lot more efficient. Take the input, 100,000,000. My code will do hundreds of thousands of division operations to test this out. Eventually it will figure it out when it gets down to 100,000,000 / 50,000,000 and finds an even division.  Yikes. I can tell you right away it's not prime, because it's an even number!

So the second great thing about unit testing is once you have your code stable, you can begin optimizing it, a.k.a. refactoring.

//Test 11 - 100000000 should return false

function isNumberPrime( num ){
     if ( !Number.isInteger( num ) ){
          return false;
     }
     if ( num < 1 ) return false;
     if ( num == 1 ) return true;
     if ( num % 2 == 0 ) return false;
     for( var i = num - 1; i > 1; i-- ){
          if ( num % i == 0 ){
               return false;
          }
     }
     return true;
}

The total time it took my unit tests to run went from 0.7 seconds down to .001 seconds. Testing 1 billion, the change took us from 6.5 seconds down to .001 seconds. Way better, and because all of our other tests are still in place, we know we haven't messed anything up!

We could continue optimizing our code. Seeing how much a difference the i % 2 == 0 test made, I am curious about doing the same thing for odd numbers. Maybe counting UP instead of counting down will let us hit a 'fail' condition sooner. I can try out this idea, and plenty of others, without worrying about my code because at each step, I know that I haven't lost any progress.
