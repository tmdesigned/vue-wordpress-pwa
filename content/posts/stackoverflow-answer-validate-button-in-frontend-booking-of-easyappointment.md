---
title: "StackOverflow Answer: Validate Button in Frontend Booking of Easy!Appointment"
slug: "stackoverflow-answer-validate-button-in-frontend-booking-of-easyappointment"
date: "2020-10-29"
excerpt: "## Original question: [Validate Button in Frontend Booking of Easy!Appointment](http://StackOverflow.com/q/64588247) * * * ## My answer: Your function is not returning anything which means it is never \"truthy\". You have an asynchronous acti"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Validate Button in Frontend Booking of Easy!Appointment](http://StackOverflow.com/q/64588247)

* * *

## My answer:

Your function is not returning anything which means it is never "truthy". You have an asynchronous action in that function, i.e. the ajax call which takes time. You would not want it to freeze the browser, so it instead executes asynchronously.

You can return the promise that jQuery.ajax gives you, but that will be neither truthy nor falsy, it will be a promise which will succeed or reject. You handle those cases with `then` and `fail` respectively.

```
if ($(this).attr('data-step_index') === '3') {
  if (!_validateCustomerForm()) {
      return; // Validation failed, do not continue.
  }
  submit_otp().then( () => {
        // continue successful processing of form here
  }).fail( () => {
        jQuery('#otp_error').html('Please enter your valid code');
        $('#button-next-3').attr('disabled',true);
        $('#button-next-3').css('cursor', 'not-allowed');
        // stop processing of form 
  });
}
```

```
function submit_otp(){
  var otp=jQuery('#otp').val();
  return jQuery.ajax({
    url:'../../../Code_Verification/check_otp.php',
    type:'post',
    data:'otp='+otp,
  });
}
```

You could alternatively not return the jQuery ajax promise, and instead use the `success` and `error` callbacks there, but then they would need to either continue or stop the submitting process **there** (i.e. you'd have to pass this function what to do next in either case). It's a little weird to give this function that is supposed to check something other unrelated things that it doesn't really have the responsibility to worry about. So returning the promise and letting your validation function control the flow makes a little more sense.
