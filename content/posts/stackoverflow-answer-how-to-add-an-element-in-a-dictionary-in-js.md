---
title: "StackOverflow Answer: How to add an element in a dictionary in JS?"
slug: "stackoverflow-answer-how-to-add-an-element-in-a-dictionary-in-js"
date: "2020-08-02"
excerpt: "## Original question: [How to add an element in a dictionary in JS?](http://StackOverflow.com/q/63214590) * * * ## My answer: ``` \"use strict\"; const views = {View1:\"Original entry\"}; const btn = document.getElementById(\"myBtn\") btn.addEven"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to add an element in a dictionary in JS?](http://StackOverflow.com/q/63214590)

* * *

## My answer:

```
"use strict";

const views = {View1:"Original entry"};

const btn = document.getElementById("myBtn")
btn.addEventListener("click",function(){
    let vname = prompt("What is the name of the new view?")
    views[vname] = vname + " 77"
    updateOutput("list");
})

const updateOutput = (outputContainerID) => {

 const output = document.getElementById(outputContainerID)
 if(!output){
  return;
 }
 
 let outputHTML = '';
 
 Object.keys(views).forEach( key => {
      outputHTML += `<li>${key}: ${views[key]}</li>`;
 });
 
 output.innerHTML = outputHTML;

}

updateOutput("list");
```

```
<button id="myBtn">Add</button>

<hr>

<ul id="list"></ul>
```

You need to update the output every time you add an item. To do this, move the "output stuff" into a function so you can call it every time an item is added (and once at the beginning, too).

For the example, since `localStorage` does not work well in sandboxes, I changed it to just keep your storage in a variable. But it would work the same way with `localStorage`.
