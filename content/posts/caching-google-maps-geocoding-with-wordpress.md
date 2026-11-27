---
title: "Caching Google Maps Geocoding with Wordpress"
slug: "caching-google-maps-geocoding-with-wordpress"
date: "2017-06-11"
excerpt: "When plotting multiple pins on an embedded Google Map, each pin's latitude and longitude is used to determine the precise pin placement. These can be looked up ahead of time and hard coded, or found on the fly with a geocoding API. Google c"
image: "/img/uploads/2017/06/geocodingplugin.jpg"
tags:
  - "JavaScript"
  - "WordPress"
  - "PHP"
draft: false
---
When plotting multiple pins on an embedded Google Map, each pin's latitude and longitude is used to determine the precise pin placement. These can be looked up ahead of time and hard coded, or found on the fly with a geocoding API. Google conveniently provides such a service, however it is limited to 2,500 requests a day before it begins to charge. This seems like a high number until you are plotting maps with 100+ points on them (i.e. real estate listings). It would only take a couple dozen visitors to quickly hit that limit and break the map! An in-between option, and the best option for performance as well, is to using a geocoding API but cache the results locally. Recently geocoded addresses are fetched locally, while new (or stale) addresses query the API. Since this model is entirely reusable across different sites, it's the perfect scenario for a helper plugin. I won't paste my entire implementation here, but there are a few points worth covering.

## Plugin Work Flow

The first time I developed this plugin, I gave the front-end developers free reign in using it. There were about 10 different public methods, and most counted on the developer using good async coding practices like Promises. In reality, it led to a lot of developer headaches and troubleshooting. So I rewrote the plugin in a much-simplified module. In the end, the workflow I came up with is essentially:

**Application:Â** Hey, helper function, here are my addresses. Can you get the latitude and longitude coordinates for each of them? **Helper Plugin:Â** Sure! Let me just run through them real quick. **Application:Â** Okay...so um, when you're done, here's what I want to happen: \[...\] **Helper Plugin:Â** Okay, cool. Still working. **Application:Â** No problem, I've got other stuff I'm working on. **Helper Plugin:** Hey Application, I'm all set! I've got each and every address geocoded. **Application:Â** Cool! So uh...can I have them? **Helper Plugin:Â** Sure! Here you go. But you probably don't need this handy dictionary I'm giving you, because that stuff you told me about earlier?Â I've gone ahead and done all of that for you!

So, it turns out it's a little hard to write anthropomorphic computer dialogue when async is involved. Hopefully you get the picture, though. The idea here is that the helper plugin is taking care of all the hard work for us. If you're writing the Application, all you really see are the beginning and end of the whole process. The behind-the-scenes portion is really the meat of geocoding, and as such can take a little bit of time for large datasets. Caching the responses locallyÂ _dramatically_ speeds up the process. (You could also explore even better performance by pulling the address table down into local code at the beginning, and inserting the additions all together at the end.) One issue that comes up whenever we are dealing with APIs is that we have entered the realm of async. I've come to think the smoothest option for handling this when writing plugins for other developers is to **[implement a ready function](https://www.tmdesigned.com/demystifing-and-replicating-jquerys-ready/)**. The application developer sends over the addresses, then queues up their followup code in our plugin's ready function to run when finished.

## Behind the Scenes

So what's our helper plugin doing in between that beginning and ending? Hanging out with two of his friends, Database and API!

**Helper Plugin:Â** Whoa, Application just gave me 500 addresses to look up! I'll just take them one by one.Â Okay, this first one here...hey Database, do you know this address? **Database:Â** Yep! I learned that address just last week. Here's the coordinates! **Helper Plugin:Â** Great! I'll remember it. Now, here's the next address. **Database:Â** I know that one too! I learned it 8 months ago. **Helper Plugin:Â** Oh...gee, um, thanks, but no thanks. Let's get you an updated record. Hey API, can you geocode this address? **API:Â** Sure....let....me....get....that...for...you....here you go! **Helper Plugin:Â** Great! A little slow, but thanks! Hey Database, here's an updated record for you. I'll remember it too. Now on to the next address! **Database:Â** Sorry, I've actually NEVER seen that one. **Helper Plugin:Â** Okay, great..I'll have API get it for us.

And so on.

Hypothetically geocoded addresses shouldn't change, but they might. Roads can be renumbered or even moved, and besides, it's just a good practice to not use very stale data. I personally think a 6 month update window is a good compromise. (Come to think of it, I might go back and randomize my implementation of it +/- a few weeks. Otherwise, the initial big burst of addresses will all expire at the same time.)

## On the Front End

Since I am using my the ready() method, my code example for front end developers is rather small: \[code language="javascript"\]var retailLocationsArray = \['123 Maple Ave, Memphis TN 38117','125 Maple Ave, Memphis, TN 38117'\]; var retailLocationsGeocoder = new geocoder(retailLocationsArray); retailLocationsGeocoder.ready(function(){ var retailLocationsGeocodedDictionary = retailLocationsGeocoder.getAllResults(); for(var i=0;i<retailLocationsArray.length;i++){ var thisResult = retailLocationsGeocodedDictionary\[retailLocationsArray\[i\]\]; //Create marker or other code, using thisResult.lat and thisResult.lng } }); \[/code\] So again, we're sending in an array of addresses. We initialize a new geocoder with those addresses, and it immediately starts working on them. In the meantime, we start queuing up our followup code. When the lookups are all done, we'll fetch a dictionary of results from the geocoder and use it to plot the results on the map.

## Error Checking

Here we are dealing with APIs, dynamic data, and database lookups. Any of those individually should have good error checking; all three of them combined make the need undeniable. We can't allow a bad address (say, with an apartment number included) to throw off our entire program. But that's exactly what will happen if we don't error check.

**Application:Â** ...and the third address I want you to lookup is "222 North Maple St (on left side of street above sandwich shop), Memphis, TN 38117"... **Helper Plugin:Â** No problem. Database, have you ever heard of 222 North Maple St (on left side of street above sandwich shop)? **Database:Â** lolz, nope **Helper Plugin:Â** Okay, API, can you hook me up here? **API:Â** I AM GOOGLE, AND YOU SHALL NOT GIVE ME THIS CRAP DATA. TAKE THIS ERROR MESSAGE AND BEGONE! **Helper Plugin:Â** "Response: Denied", eh? That's a funny latitude/longitude pair. Oh well! Hey Database, here you go! **Database:Â** No, wait, what are you doing?! Â Great, thanks a lot. **Helper Plugin:Â** Hey Application, I see you wanted me to plot this on the map. Here I go! Map, please create a pin at location Response:Denied. **Map:Â** That's not a location! You know what? Just take this lousy world map and be thankful if I don't halt your JavaScript engine.

So, we can save ourselves a lot of headaches by implementing a few checks.

1.  It should go without saying that the inputs should also be protected against malicious attacks. If you use wpdb properly, that shouldn't be too difficult (wpdb->insert prevents injection attacks, and wpdb->query can be wrapped in a wpdb->prepare).
2.  When the helper plugin receives the list of addresses, presumably an array, it can filter out any non-string values and even special characters (i.e. the # in APT #).
3.  When Google's API sends back its response, error messages should be captured. At the time of writing it includes a "response" parameter that will be set to such values as "ok", "denied", etc. If one of these are found, the database can be updated with the failure but without trying to force a lat/lng result.
4.  However the helper plugin returns data to the application (I use a dictionary with the address as the key, and a result object as the value), a failure message should be conveyed for bad addresses. I simply include this in my result object: lat/lng/fetch date/success. My application can make sure each success is present before placing it on the map.

## Summary

Creating a plugin like this takes a bit of time, but knowing that it will be reused (and used by other developers) is a great encouragement to do things right. The end result is a simple module that requires very little explanation to use. On the settings page for my plugin, I have only two controls. First, a Google API key is required for all this to work so I let it be entered here. Second, for debugging purposes I've added a Reset Cache Table button to mimic a fresh install. If I add a third, it will be a single entry address tester to try out inputs and verify the response from Google. I absolutely love projects like this. The need is clear, the scope is limited, and the result is absolutely helpful.
