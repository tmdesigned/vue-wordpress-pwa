---
title: "StackOverflow Answer: php echo a javascript variable to file.txt"
slug: "stackoverflow-answer-php-echo-a-javascript-variable-to-file-txt"
date: "2020-02-01"
excerpt: "## Original question: [php echo a javascript variable to file.txt](http://StackOverflow.com/q/60017947) * * * ## My answer: It seems like what you want is for PHP to write the file with the result of the timezone variable, i.e. that it woul"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [php echo a javascript variable to file.txt](http://StackOverflow.com/q/60017947)

* * *

## My answer:

It seems like what you want is for PHP to write the file with the result of the timezone variable, i.e. that it would be a text file with the name of a timezone in it.

Probably what you are seeing is PHP writing that JavaScript line instead, i.e. `<script>document.writeln(timezone);</script>`

Right?

What's happening is PHP executes **completely** before JavaScript is run. Your first example is working because PHP executes, including the writing of a line of JavaScript, and then JavaScript executes, including that line, and you see the result.

What you are trying to do in the second example isn't possible. PHP is executing, including the writing of that line of JavaScript (to the file), and then JavaScript executes, but of course not in that text file.

Your two choices are to find a different way to get the timezone strictly in PHP, or else to get it with JavaScript and then use AJAX to trigger a _later_ run of PHP, i.e. after JavaScript has run.

**EDIT**

Your JavaScript will fetch the timezone as before. Then it will send that to a separate file that outputs it:

```
var url = '..'; // url of a php file that JUST processes the file write
$.ajax({
  type: "POST",
  url: url,
  data: {
        'timezoneToPrint' : timezone
    }
});
```

And in your other PHP file, which you have just called, you can now print it to a file

```
if($_POST['timezoneToPrint']){
   // ..write the file here, the timezone is in $_POST['timezoneToPrint']
}
```
