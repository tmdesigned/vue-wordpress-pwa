---
title: "Wordpress Answer: Send admin new order email to logged in user as well"
slug: "wordpress-answer-send-admin-new-order-email-to-logged-in-user-as-well"
date: "2019-03-20"
excerpt: "## Original question: [Send admin new order email to logged in user as well](http://Wordpress.StackExchange.com/q/332157) * * * ## My answer: What you have makes sense, except that your variable names dont match. You have $object in your fu"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Send admin new order email to logged in user as well](http://Wordpress.StackExchange.com/q/332157)

* * *

## My answer:

What you have makes sense, except that your variable names dont match. You have $object in your function definition and in the function code you are trying to use $order.

Adjusted:

```
/* SEND ADMIN E-MAIL TO LOGGED IN USER */
/* --- */
add_filter( 'woocommerce_email_recipient_new_order', 'your_email_recipient_filter_function', 10, 2);

/* Add parents e-mail address to new order admin mail */
function your_email_recipient_filter_function($recipient, $order) {
    $user_info = get_userdata($order->user_id);
    $recipient = $recipient . ', ' . $user_info->user_email;
    return $recipient;
}
```
