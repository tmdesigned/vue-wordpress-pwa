---
title: "Passing immutable data with encrypted tokens"
slug: "passing-immutable-data-with-encrypted-tokens"
date: "2017-07-03"
excerpt: "_Update: When I first wrote this, I thought I was so clever for coming up with the concept of encrypting JSON data and using it as a token in the URL. Well, it was clever. So clever that other people had already come up with it. It's referr"
image: "/img/uploads/2017/06/token.jpg"
tags:
  - "JavaScript"
  - "PHP"
draft: false
---
_Update: When I first wrote this, I thought I was so clever for coming up with the concept of encrypting JSON data and using it as a token in the URL. Well, it was clever. So clever that other people had already come up with it. It's referred to as JSON Web Tokens (JWT) and is an industry standard._

## GET & POST Data, in general

The general rule of thumb for passing HTTP data is to use GET for retrieving data, and POST for sending it. (Cookies and session variables are not passed in the HTTP request per se.) POST is harder to manipulate, but is absolutely not hacker proof. It's actually quite easy to simulate POST requests and if a server resource is not hardened against malicious data, then malicious data will find its way in eventually.

The main difference between the two is that GET data is passed as part of the URL. This has some disadvantages (aesthetic and functional), but also a unique advantage -- the GET parameters are bookmark-able and navigable. That means a user can save the results and return later, share it on social media, or navigate back and forth by pages.

## Tangent: storing state in the hash

It's this advantage that some developers exploit to hold state. The web is a generally state-less medium, but storing state values in the URL in the same manner as GET variables works surprisingly well. With a library, like jQuery BBQ, multiple parameters can be read and written with ease without even having to deserialize the entire string.

## Back to real HTTP requests

Anyways, we tend _not_ to store even quasi-sensitive data in GET/POST requests because they're so manipulatable. We wouldn't care if a user messed with a search parameter, because wherever the form is not confined to the page we would be sanitizing the data. But for protected data, say the amount of a financial deposit, we don't really want that even remotely mutable.

But what if we _do_ want those parameters to be navigable? For instance, we might want to send the page as a link with certain values preset. So we need them in the URL, but we don't want our users messing with them.

## Case study: pre-filled employment application

Let's say you've posted a job, and received a resume from an interested candidate. They're a good fit, but you need them to fill out your standard employment agreement.

Now, you could send them a blank form, sure. But maybe your agreement has the hourly wage on it, and you don't want them thinking that's a negotiable item. Wouldn't it be better to send them a customized link, where that data is already pre-filled (and locked in place)?

## What not to do

So, you could send them a link like this:

```
 https://www.yoursite.com/forms/employment_agreement/?name=John+Doe&position=Maintenance+Technician&wage=15
```

Hopefully by now, you see the problem with this. John might try and get smart, change the wage to 20, and hope you don't notice before HR enters him in the system. Even if you caught it, it's an awkward scenario.

## A better solution: encrypted hash data

What we can instead do is the same technique, but with one extra step: encryption. We take the same data stored in the URL, and encrypt it to end up with something like:

```
 https://www.yoursite.com/forms/employment_agreement/?accessToken=5d189b2278eba41061f2f44ffc6250e2068167677274deea1f8a14360558d4e6d6c0d2b027fa8f3286eb52e700befb1d331b5ff441ad9ff042b09c6701569a
```

To be clear, we're not encrypting the data because it's top-secret and sensitive. I'm not suggesting doing this with a bank account number, but in our case, we're just encrypting the data so the user doesn't monkey around with it.

We'll use the same private key to encrypt and decrypt this token, and since the user is not privy to this key, he cannot modify or substitute the data. Changing just one character in the string will throw the entire result.

That link with the token appended could be given directly to the applicant, and the page itself will be responsible for decrypting the data, populating the form, and protecting those input fields.

## Encrypting / decrypting data

PHP comes with cryptographically strong encryption functionality, openssl, which just has to be enabled on the server. Doing so gives us access to 4 helpful functions:

*   openssl\_random\_pseudo\_bytes -- creates random bytes, useful for creating keys
*   openssl\_cipher\_iv\_length -- returns length of a given encryption method, to be used to kick off encryption method
*   openssl\_encrypt -- encrypts string
*   openssl\_decrypt -- decrypts string

You don't need a master's degree in cryptography to use these functions and set this up. With just these 4 functions, our basic flow is this:

1.  Create a private key ONE TIME, and store it securely on the server (i.e. in a hidden php variable). We useÂ **openssl\_random\_pseudo\_bytes** for this.
2.  Each time we need to create a custom token (i.e. send a custom link), we store whatever data we need in a string. JSON is a natural choice.Â I create a separate, token-generating form for this process. Here we're just using JavaScript.
3.  Before we can encrypt it, we also need something called an an initialization vector each time we want to encrypt something -- the AES encryption method mixes each chunk of the data with the previous chunk. So...the first chunk needs something random to mix with. We store that vector as well as the encrypted data, since we need it to start the unraveling process, and these two together make up the token.Â **openssl\_cipher\_iv\_lengthÂ** gets us the right length to feed toÂ **openssl\_random\_pseudo\_bytes**, which we're now using a second time.
4.  Now we encrypt it, which requires that private key and the vector we made. Here we use **openssl\_encrypt**.
5.  We save the token, and send it in a link as part of the URL.
6.  When it's fed back to us (i.e. the user clicks the link), we decrypt the string using the SAME init vector, and the SAME private key, using **openssl\_decrypt**.Â Hey, look! It's our old friend, JSON string!
7.  We do whatever we need to do with the data (i.e. JSON.parse it, then populate the form with it, etc.)
8.  If we need to submit those same values, we pass through the encrypted token to make sure the data it contains is untouched.

For a nearly-complete code example, see the link below which shows all 4 of those functions working together. The only things it doesn't show is the JSON encoding/decoding, and saving the private key for later use.

That's all there is to it! We can now generate a unique token using our special, employees-only form. Inside of that encrypted data is all of the protected information we don't want our prospective employee screwing around with. From the end-user's perspective, the applicant is just receiving a tailor-made custom link. As a bonus, if we've also used it to pre-populate his name, address, etc., he'll be even more impressed with our company for seeming like we have our HR act together.

_P.S. The limit for a URL is 4KB. So including our actual URL location, we have 4KB of encrypted data we can store. URL's are ASCII text, which is 1 byte per character. So that means our total is 4,000 characters. In my real-world case that led to this post, I stored 16 property/value pairs in a JSON object, and encrypted it came out to 800 characters including the initialization vector.Â_ 

Â   
Special thanks to:  
  
[https://blog.turret.io/the-missing-php-aes-encryption-example/](https://blog.turret.io/the-missing-php-aes-encryption-example/)
