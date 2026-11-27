---
title: "Clear code boundaries and event buses in JavaScript"
slug: "clear-code-boundaries-and-event-buses-in-javascript"
date: "2018-10-06"
excerpt: "Writing an application so that every piece of code can affect every other piece is like the wild west. You may be able to \"do more\" but lawlessness will result. Code written like this is difficult to debug, almost impossible to extend, and "
image: "/img/uploads/2018/10/play-stone-network-networked-interactive-163064.jpeg"
tags:
draft: false
---
Writing an application so that every piece of code can affect every other piece is like the wild west. You may be able to "do more" but lawlessness will result. Code written like this is difficult to debug, almost impossible to extend, and almost always buggy.

As code grows more complex, it becomes more critical to maintain clear boundaries between components. If your app is a chess game, then a "knight" class should not be able to stop the game timer even if it puts the opposing king in check mate. Instead, it should complete its move, the game logic controller should do a check for game ending scenarios, and then the game itself should stop the clock.

**Bad**

*   **Knight:** Moving to E4 is a legal move for me.Â 
*   **Knight:** I move to E4.
*   **Knight:** Looking at all the other pieces, I see I just check-mated the king. I rock thee!
*   **Knight:** Stop the timer. Announce the game is over. Lock all the other pieces. The war is over!

**Good**

*   **Knight:** Yes, moving to E4 is a legal move for me.
*   **Game Logic:** Okay, go ahead and move to E4.
*   **Knight:** I move to E4.
*   **Game Logic:** Looking at all the pieces, the other player is now in check mate.
*   **Game Logic:** Stop the timer. Announce the game is over. Lock all the pieces.

## The need for boundaries

Hopefully it is obvious why the second situation is better. In the first, you might end up repeating code. (Does every piece need to know how to check for check mate?) You also have a bunch of independent actors. (What if another piece is doing somethingÂ _while_ the knight is checking for mate?). It's also incredibly difficult to debug this. (When you run into a bug where check mate is being erroneously declared, how will you know where to look? Answer: You'll look over your entire application's code, because you can't be sure.)

Using Object Oriented Programming (OOP) principles helps establish the desired separation.Â It's kind of obvious a Game should have Players, Players should have Pieces, Pieces should have piece logic. And in a multi-file compiled JavaScript app, like a full-fledged framework project (i.e. Angular, React, Vue, etc.), this compartmentalization is hinted at by the very file structure.

Defining boundaries is a little less obvious for isolated JavaScript code, like the little 1-200 lines you might write to power the UI of a web page. However even here the principle can be very helpful.

## Event Buses

One helpful tool in creating boundaries in simple projects is the "event bus". An event bus is a central communications hub that processes events. It's like a bulletin board for different pieces of your code.

*   Components can "post" a message to it (i.e. "I have new data," "I was clicked," etc.)
*   Components can "subscribe" to messages (i.e. "Let me know when there's new data.").
*   Posts can also pass along payloads (i.e. "Here is my new data", "Here is my button ID") and subscriptions can receive and process that data.

That's really all there is to it, but they are wildly useful. Their functionality is especially helpful when asynchronous operations are involved, as you can't just program sequentially.Â 

## An Example Event Bus Implementation in English

Let's use as an example a search results page for flights with filters that update the results on the fly with AJAX.

*   **Central Data Repository:Â** Hey Event Bus, if you receive any "New Results Fetched" messages, pass that along to me so I can update.
*   **Search Results View:Â** Hey Event Bus, I don't care if results are fetched, but when they're completely processed I do. So if you receive any "Results Ready" messages, let me know. Oh, also I need to know when new results are being loaded so I can tell the user, so let me know if you receive any "Updating Results" messages as well.
*   **AJAX Data Fetcher Utility:**Â Hey Event Bus, if you receive any "Search Filter Changed" messages, please let me know so I can go get new data based on it.

(some time passes, then the user adjusts a search filter)

*   **Max Price Slider:**Â Hey Event Bus, I have a "Search Filter Changed" message for you because the user just updated me. My name is "Max Price" and my new value is $800.
*   **Event Bus:**Â Attention! New "Search Filter Changed" message. "Max Price" was changed to "$800".
*   **AJAX Data Fetcher Utility:Â** Thanks, Event Bus! I'm going to get new data based on that change. In the meantime, I have a "Updating Results" message for you.
*   **Event Bus:Â** Attention! New "Updating Results" message. No payload.
*   **Search Results View:Â** Thanks, Event Bus! I'm going to replace the results shown to the user with a "Loading..." message.

(the new results are fetched with AJAX, a hundred milliseconds or so pass)

*   **AJAX Data Fetcher Utility:Â** I have my new results ready. Event Bus, please post, "New Results Fetched" with data {...}.
*   **Event Bus:Â** Attention! New "New Results Fetched" message. Payload is {...}
*   **Central Data Repository:Â** Thanks! Let me process those for a second here....and....we're good! Event Bus, please post, "Results Ready" with this processed data {...}.
*   **Event Bus:Â** Attention! New "Results Ready" message. Payload is {...}.
*   **Search Results View:Â** Thanks! Let me hide the "Loading..." message and display the new results.

So on the one hand, it looks more complex because there is more "talking" between components. But this is handling a complex process that involves asynchronous data, and the different parts of our app are not tripping over each other anymore. They are respectfully handling their own business and keeping each other in the loop.Â 

## A Simple Event Bus Class

This helpful little utility class handles all the dirty work of an event bus. You simply have to use it! Credit goes to [Pierfrancesco SoffrittiÂ](https://pierfrancescosoffritti.com/) 

\[code language="javascript"\] function EventBus() { const eventCallbacksPairs = \[\]; this.subscribe = function( eventType, callback ) { const eventCallbacksPair = findEventCallbacksPair(eventType); if(eventCallbacksPair) eventCallbacksPair.callbacks.push(callback); else eventCallbacksPairs.push( new EventCallbacksPair(eventType, callback) ); } this.post = function( eventType, args ) { const eventCallbacksPair = findEventCallbacksPair(eventType); if(!eventCallbacksPair) { console.error("no subscribers for event " +eventType); return; } eventCallbacksPair.callbacks.forEach( callback => callback(args) ); } function findEventCallbacksPair(eventType) { return eventCallbacksPairs.find( eventObject => eventObject.eventType === eventType ); } function EventCallbacksPair( eventType, callback ) { this.eventType = eventType; this.callbacks = \[callback\]; } }\[/code\]
