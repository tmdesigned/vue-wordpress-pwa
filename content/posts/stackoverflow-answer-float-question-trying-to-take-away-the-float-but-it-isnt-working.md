---
title: "StackOverflow Answer: Float question. Trying to take away the float, but it isn't working"
slug: "stackoverflow-answer-float-question-trying-to-take-away-the-float-but-it-isnt-working"
date: "2020-07-20"
excerpt: "## Original question: [Float question. Trying to take away the float, but it isn't working](http://StackOverflow.com/q/62986831) * * * ## My answer: Inline styles always take precedence over selector based styles. You can override this with"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Float question. Trying to take away the float, but it isn't working](http://StackOverflow.com/q/62986831)

* * *

## My answer:

Inline styles always take precedence over selector based styles. You can override this with the `!important` modifier, but a much better solution is to modify the HTML and remove the inline styles in the first place.

Inline styles mean that the styles are placed directly within the HTML tag, i.e. `style=`. This has the highest "specificity" when the browser determines which CSS rules to apply when multiple rules specify conflicting things.

If you are not able to modify the DOM (HTML) then adding the `!important` flag overrides the default specificity order:

```
display: block !important;
```

However this approach tends to cause problems later on, as CSS specificity is there to _help_ you handle multiple rules applying differently to multiple elements, and you're essentially bypassing that ability.

(Also, your selector does not appear to correctly target the elements with floats. The two `div` elements do not have an easy and stable way to target them, as they have no class or ID and are in the middle of other elements. You'd want to give them a class to make targetting them with your rules easier. For now the best you could do would be something like `#contactorange .w3-container > div`, but this would very easily break or accidentally apply to other elements if you modified your HTML.)

I'd suggest reading up on CSS specificity which is not that complicated but very useful to understand: [Reference on specificity](https://www.w3schools.com/css/css_specificity.asp)
