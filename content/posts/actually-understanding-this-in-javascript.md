---
title: "Actually understanding \"this\" in JavaScript"
slug: "actually-understanding-this-in-javascript"
date: "2017-05-08"
excerpt: "Many of us have taken a try-and-see approach to using \"this\"Â in JavaScript. But, there comes a time when a developer says, \"No more guesses, I need to know how that really works.\" I hope I encourage some others to take that leap with \"this"
image: "/img/uploads/2017/05/thiscodeexample.jpg"
tags:
  - "JavaScript"
draft: false
---
Many of us have taken a try-and-see approach to using "this"Â in JavaScript. But, there comes a time when a developer says, "No more guesses, I need to know how that really works." I hope I encourage some others to take that leap with "this"! "This" is confusing because it can't easily be learned from context.Â You can see it used in a dozen code examples,Â _think_ you know how it works, and be completely wrong. Its functionality skirts right next to how you might expect it to work, but with aÂ "kinda understand it" approach the floor will vanishÂ beneath your feet when you least expect it. In short... "This" does **not** simply:

*   Refer to the current scope, function, object
*   Refer to the encompassing scope, function, or object
*   Refer to the context ofÂ where a function was declared

"This" **does**:

*   Depend on where **and how** a function is called

## Default implementation

The most basic case of "this" occurs when no other situation applies. In this case, "this" refer to the context from which the current scope was called. Generally that's going to be Window for JavaScript run in a browser. \[code language="javascript"\] function country(name){ console.log("In country func, this: ",this); //Window this.designation = name; //Added to Window identify(); } function identify(){ console.log("In identify func, this: ",this); //Window console.log("I am",this.designation); //I am the United States } country('the United States'); \[/code\]In this example it looks like we were trying to add a "designation" to the country function. But it really just got added to the Window variable. So this is really dangerous because it _looks_ like it worked! But it only works because both country() and identify() are both referring to Window. The property isn't stored within context of the country() function. Let's say that you read ahead, and you found out that using the "new" method of calling a function would set "this" to that function. You'd be right, but you still might get thrown under the bus by this first rule. \[code language="javascript"\] function country(name){ console.log("In country func, this: ",this); //country this.designation = name; //Added to country identify(); } function identify(){ console.log("In identify func, this: ",this); //Window console.log("I am",this.designation); //I am undefined } var a = new country('the United States'); \[/code\]See what's changed? We've called country() with new, and in fact "this" is now "country" inside of the country function. But it doesn't carry over, and when we call identify() "this" is back to Window again, which doesn't have a designation and returns undefined.

## First Exception: Explicit Binding

However, there are a fewÂ cases where this default behavior is trumped. We can actually be a little clearer with the JavaScript engine and just tell it what we want "this" to be. To do this, we instead call the function with the .call() or .apply() or .bind() techniques. \[code language="javascript"\] this.level = 0; //added to global object var fuelTank = { level : 0 //added to fuelTank object } function fill(){ this.level = 100; //who should I fill depends on 'this' } fill.call(fuelTank); //oh, 'this' is going to be the fuelTank console.log(fuelTank.level); //100 \[/code\]The .call() method, which is a part of any function we create by default, accepts as its first argument a binding context. In our example here, it tells our fill() function to use the fuelTank's level variable instead of the global level variable. We can use this method to get the desired behavior we had with the first example. In other words, we're going to explicitly say that we're referring to the country's designation. \[code language="javascript"\] function country(name){ console.log("In country func, this: ",this); //country this.designation = name; //Added to country identify.call(this); } function identify(){ console.log("In identify func, this: ",this); //country console.log("I am",this.designation); //I am the United States } var a = new country('the United States'); \[/code\]The console correctly reads out, "I am the United States", and THIS time it's because designation lives in the country, not the global Window object.

## Second Exception: Owner object (implicit binding)

The second, and stronger, exception is if the function has an implicitly bound owner. The closest implicit owner takes priority over the call-stack and even over explicitly bound contexts. \[code language="javascript"\] var spaceShuttle = { name : 'Endeavor', report: function() { console.log("This is ",this.name," checking in."); } }; functionÂ radioTest(){ this.name = "VX-2000 Radio Test Protocol"; spaceShuttle.report(); } var testAlpha = new radioTest(); \[/code\]When the report() function is called,Â you might think "this.name" refers to the radioTest's variable of that name. After all, that's _where_ report() was called and we even used the "new" keyword to give radioTest it's own "this". However, since report() isÂ ownedÂ by spaceShuttle, that takes priority and the reportÂ will output, "This is Endeavor checking in." (I'd be willing to wager that this special case is what skews developers' understanding of how "this" works.Â SeeÂ enough examples like this one, and you might think "this" always refers to the current object. Also see enough examples of the default case, and your understanding might grow to "Well, sometimes 'this' depends on where it was called." Like a child learning to speak, you begin to use grammar correctly without understanding the rules. ButÂ as a father of 3, I will tell you kids also say a lot of stupid stuff.)

### But...not as boundÂ as you might think

Implicit bindings can be overwritten if a function loses its owner. This may seem like a strange scenario until we remember thatÂ in JavaScript objects are notÂ duplicated asÂ easily as you might think. If a "copy" of an object (which is really the same object) is called and the owner isn't being used to do so, the function will execute but "this" will not be based on implicit binding. Consider this example: \[code language="javascript"\] var selfDestructModule = { safetySwitch : true, toggleSafety : toggleButton, }; function toggleButton(myButton){ this.safetySwitch = !(this.safetySwitch); } var backupModule = selfDestructModule; backupModule.toggleSafety(); console.log(selfDestructModule.safetySwitch); // false! \[/code\]What's happened here? The selfDestructModule and the backupModuleÂ are not duplicates. They are the exact same object. When the backup module turns offÂ safety switch, the selfDestructModule'sÂ is now off too -- because they're the same. This affects our discussion because even though we might call a function with an explicit owner, once it's copied we don't have a clear owner any more. \[code language="javascript"\] var selfDestructModule = { safetySwitch : true, toggleSafety : toggleButton, initiate : overloadReactor }; function toggleButton(myButton){ this.safetySwitch = !(this.safetySwitch); } function overloadReactor(){ if(this.safetySwitch == false){ console.log("BOOM"); } } selfDestructModule.toggleSafety(); //safetySwitch = false var quickBoomButton = selfDestructModule.initiate; //"shortcut" quickBoomButton(); //FAIL selfDestructModule.initiate(); //BOOM \[/code\]Here we tried to create a shortcut to the self destruct's initiate function, just by making a copy of it. Like we saw in the previous example, this set quickBoomButton to the exact same function: overloadReactor (and not just a duplicate of it). That part worked perfectly. BUT, "this" is now different because the owner of overloadReactor is no longer explicit. "This" falls back to the standard behavior, and since quickBoomButton was called in the global scope, it would be set to the global scope (i.e. "window"). The way around this quirky seeming behavior is to "harden" such calls by using an intermediary function that makes the owner explicit.

### HardenedÂ Binding

To our previous code, we could add an intermediary function like this one: \[code language="javascript"\] function initiateSelfDestruct(){ overloadReactor.call(selfDestructModule); } \[/code\]If our spaceship object had its initiate property pointed to this function instead, our shortcut above would actually work, because our intermediary function is making the binding explicit.

## Bringing it all together

There are a few other cases (constructor classes, and arrow functions) but these examples cover the majority of confusing cases. In short:

1.  The default binding context is based onÂ the context of where the function was called
2.  If the .call() or .apply() method is used (explicit binding), the contextÂ steals the show
3.  If there is aÂ clear owner (implicit binding), that owner's context takes priority

For a more thorough read, I'd suggest checking out Kyle Simpson's short but packed book, [You Don't Know JS: this and Object Prototypes](https://www.amazon.com/You-Dont-Know-JS-Prototypes/dp/1491904151/ref=sr_1_2?ie=UTF8&qid=1494208049&sr=8-2&keywords=you+don%27t+know+js). It goes into much greater depth, and while I don't personally care for the classic foo / bar examples, if you can get through them you'll be at the end of the road to success with "this"!
