---
title: "Multiple word JavaScript searching"
slug: "multiple-word-javascript-searching"
date: "2017-11-01"
excerpt: "The most simple JavaScript search is: haystack.indexOf(needle) . If the result is -1, there's no match, otherwise there is. But this is not very robust. The search string (needle) must be written exactly (order, case, etc.) in the string y"
image: "/img/uploads/2017/10/seach_function.jpg"
tags:
  - "JavaScript"
  - "PHP"
draft: false
---
The most simple JavaScript search is:  haystack.indexOf(needle) . If the result is -1, there's no match, otherwise there is. But this is not very robust. The search string (needle) must be written exactly (order, case, etc.) in the string you're searching (haystack). For the [auction scraper](https://www.tmdesigned.com/project-web-scraper/), I wanted a slightly more robust search. I didn't need multiple searching operators, but I did want to search for multiple words and have it find matches even if they came in a different order. In other words, "1080p tv" should match the item "Westinghouse TV with 1080p resolution". This actually wasn't difficult to achieve:

```javascript
function filter(keywords){
  keywords = keywords.toLowerCase();
  var keywordArray = keywords.split(' ');
  if(keywordArray.length==1 && keywordArray[0].length<2){
    return;
  }
  $('.auction-item .card-title').each(function(){
    var remove = false;
    var i = 0;
    while(!remove && i<keywordArray.length){
      if($(this).text().toLowerCase().indexOf(keywordArray[i]) == -1){
        remove = true;
      }
      i++;
    }
    if(remove) {
      $(this).parent().parent().parent().hide();
    }
  });
}
```

A nice way to think of this is that we're removing the non-matches. The basic logic of this function, then is:

1.  Split the search string into separate words
2.  If there's nothing to search, quit
3.  For each item we're searching over:
    1.  Assume it's a match
    2.  Loop through each of the search keywords
        1.  If it doesn't have one of the keywords, it's no longer match
    3.  If we get through the last of the keywords, and the item hasn't failed any of these "tests", then it's a _true_ match
    4.  If it's not a true match, remove it
