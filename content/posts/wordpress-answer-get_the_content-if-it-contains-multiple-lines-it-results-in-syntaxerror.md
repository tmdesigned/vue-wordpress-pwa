---
title: "Wordpress Answer: get_the_content if it contains multiple lines it results in SyntaxError"
slug: "wordpress-answer-get_the_content-if-it-contains-multiple-lines-it-results-in-syntaxerror"
date: "2019-02-15"
excerpt: "## Original question: [get\\_the\\_content if it contains multiple lines it results in SyntaxError](http://Wordpress.StackExchange.com/q/328749) * * * ## My answer: It sounds like you are directly echoing the php into a JavaScript variable? g"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [get\_the\_content if it contains multiple lines it results in SyntaxError](http://Wordpress.StackExchange.com/q/328749)

* * *

## My answer:

It sounds like you are directly echoing the php into a JavaScript variable? get\_the\_content makes no guarantees that the value it returns will be sanitized in the right way for a JavaScript variable.

You might try first encoding the output into JSON, and then doing that, i.e.

```
<script>
<?php
    ob_start();
    the_content();
    $content = ob_get_clean(); 
?>
var myVariable = <?php echo json_encode( $content ); ?>;
</script>
```

To be honest it may not even work. It's hacky. Dropping php into JavaScript like this is really not a recommended practice, for exactly the reason you're encountering. What this solution does is poorly imitate the proper approach for when you have PHP data (i.e. the\_content) that you need in JavaScript -- AJAX.

Your JavaScript code should ask your PHP code to nicely provide sanitized data, i.e. it should make an AJAX request back to the server and your PHP code will have the opportunity to run, sanitize, and return the data cleanly.
