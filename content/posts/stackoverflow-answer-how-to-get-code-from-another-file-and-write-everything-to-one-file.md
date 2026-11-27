---
title: "StackOverflow Answer: How to get code from another file and write everything to one file?"
slug: "stackoverflow-answer-how-to-get-code-from-another-file-and-write-everything-to-one-file"
date: "2020-01-27"
excerpt: "## Original question: [How to get code from another file and write everything to one file?](http://StackOverflow.com/q/59930190) * * * ## My answer: The HTML ` Some regular HTML content ```"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to get code from another file and write everything to one file?](http://StackOverflow.com/q/59930190)

* * *

## My answer:

The HTML `<script src=` is going to fetch a resource and run it, from wherever you have specified in the `src` attribute. It's expecting a URL.

The `htmlspecialchars(` function is expecting a string, and will return a string.

The way you have it right now, it will take the string `"static/functions.js"` and process it.

Your question suggests you want it to operate on the contenst of the file. This is techncially possible, but the file has to be fetched first.

`htmlspecialchars( file_get_contents(__DIR__ . 'static/functions.js') )`

But that still seems odd. You want to convert all the encoded special characters in your JavaScript file to their HTML entities? Like `<` to `&lt;`? That's almost surely going to make the JavaScript invalid.

Even if it didn't ruin your JavaScript, you'd still be trying to take the _contents_ of that file and putting them in the `src` property of the `script` tag, which is expecting a URL.

Overall this seems like you need to step back and think about what exactly you're trying to accomplish.

**Edit for OP question in comments**

```
<div>
  <span>Some regular HTML content</span>
</div>
<script>
  <?php 
      // we're now in PHP, about to store some JavaScript as a string
      $js = <<<EOD
console.log("I am a JavaScript console message!");
console.log("Me too!");
EOD; // note this can't be indentend or spaced, it has to be flush left


     // we can 'echo' the JavaScript directly into the HTML
      echo $js;
  ?>
</script>
```
