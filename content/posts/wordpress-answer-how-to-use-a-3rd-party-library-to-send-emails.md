---
title: "Wordpress Answer: How to use a 3rd party library to send emails?"
slug: "wordpress-answer-how-to-use-a-3rd-party-library-to-send-emails"
date: "2019-02-14"
excerpt: "## Original question: [How to use a 3rd party library to send emails?](http://Wordpress.StackExchange.com/q/328681) * * * ## My answer: I think there are two decent options here. ## Let WordPress keep its mail function, but hook in once or "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to use a 3rd party library to send emails?](http://Wordpress.StackExchange.com/q/328681)

* * *

## My answer:

I think there are two decent options here.

## Let WordPress keep its mail function, but hook in once or twice

wp\_mail() has several hooks that will be helpful for you to replace the built in behavior, which is basically to use php's simple little mailer.

Here are a couple of those helpful hooks that I think you might use, since that's what you asked for:

```
//Filter the message (recipient, subject, body, etc.)

add_filter( 'wp_mail', 'your_filter_function', 11, 1);
function your_filter_function( $args ){
    //$args is an array of 'to', 'subject', 'message', 'headers', and 'attachments'
    //do whatever you want to the message
}
```

More importantly for replacing WordPress's usage of phpmailer:

```
//Runs after phpmailer is initialized, and passes the phpmailer instance by reference

add_action( 'phpmailer_init', 'your_mailer_function', 99, 1 );
function your_mailer_function( &$phpmailer ){
    //$phpmailer is a direct reference to the phpmailer instance WordPress started
    //set it to something else, i.e. an SMTP mailer object, to override
    //you may also want to configure the "from" email at this point to match the 
    //SMTP account you're using
}
```

The important part is with the second hook above, we actually get the phpmailer instance by reference (i.e. by memory address) so we can directly modify it. Immediately after that hook runs, WordPress's next code is:

```
return $phpmailer->send();
```

So if at that point you have replaced $phpmailer, it will call your object's send method instead.

## Option 2 - Replace WordPress's mail function

wp\_mail is one of WordPress's pluggable functions, which means you can completely redefine it.

The original function definition looks like this:

```
function wp_mail( $to, $subject, $message, $headers = '', $attachments = array() ) {
```

So if you redefine that and keep the same arguments, your function will be called instead.

Since WordPress only allows each of the pluggable functions (found by the way in includes/pluggable.php) to be defined once, you should wrap your replacement in a if ( !function\_exists( ... call.

## My recommendation

WordPress as a whole seems to be moving away from pluggable functions (method 2) in favor of the hooks method, which just makes more sense to me as you're only replacing the necessary pieces and keeping everything else, PLUS you get the added benefit of specifying a priority on your hooks so you have more control when more than one bit of code is modifying the default behavior. So I would suggest method 1.

## Note:

Just for a bit of a teaching moment, I didn't know these hooks 10 minutes ago. I opened up a fresh WordPress folder and searched for "function wp\_mail" to find the main code, then looked through it at the hooks that were there. After finding the ones I thought appropriate, I also downloaded a WordPress SMTP plugin and looked in the code to see which hooks they used. The one I looked at (Easy WP SMTP) used the same 2, plus a few others for some more advanced functionality. I also noticed that the function was defined in pluggable.php, which is where the functions you can directly override live.

So you may already do this, but don't be afraid to jump into WordPress core code and dig around.
