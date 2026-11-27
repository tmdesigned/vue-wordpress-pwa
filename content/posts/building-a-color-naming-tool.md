---
title: "Building a color naming tool"
slug: "building-a-color-naming-tool"
date: "2017-03-31"
excerpt: "_**Update:** [Head over to the project page to see the end-result](https://www.tmdesigned.com/color-namer/)_ There are a lot of projects that _sound_ simple, but really have all sorts of nuances once you get down to business. Developing a"
image: "/img/uploads/2017/03/hsl-graphic.jpg"
tags:
  - "JavaScript"
draft: false
---
_**Update:** [Head over to the project page to see the end-result](https://www.tmdesigned.com/color-namer/)_ There are a lot of projects that _sound_ simple, but really have all sorts of nuances once you get down to business. Developing a tool to name colors is one of those projects. Talking about colors with clients, I've found that having a _user-friendly_ name for the color reduces confusion and actually helps them settle on a choice. "Do you prefer the firebrick red, or the merlot?" The problem for designers and developers is we don't think in terms of those names, preferring the actual code colors or possibly a system like Pantone. Presumably this is why paint manufacturers have gone to the trouble of naming their swatches. Even those of us willing to "translate" to these types of names are faced with a problem. What names do we use? How do we quickly and easily find the closest names to the actual, precise color we want to use in the design? To solve this problem, we'll have to dive into the messy world of comparing colors.

## THE UNDERLYING CHALLENGE

\[caption id="attachment\_331" align="alignleft" width="300"\]![](/img/uploads/2017/03/hsl-graphic-300x285.jpg) By Jacob Rus (Own work) \[CC BY-SA 3.0, via Wikimedia Commons\[/caption\]The main question here is how do we compare colors. And before we get very far with this, let's be clear about the underlying problem that will no doubt plague us: our colors are at least 3-dimensional. Whether we use RGB or HSL, we're bringing in three separate components. How computers see and think about these components--mathematically, of course-- is different from how we perceive them. This makes finding a "similar" color rather subjective. So we'll want to strive for precise matching, but allow a little flexibility as well. Returning several choices to pick from will be helpful.

## COLOR SPACE OPTIONS

\[caption id="attachment\_292" align="alignright" width="256"\]![NES Zelda screenshot showing 255 coins](/img/uploads/2017/03/zelda.png) 255 was the maximum number of coins in Zelda for the same reason.\[/caption\] We can work with colors in several different ways. In RGB, for each of the three color dimensions we have 256 possible values. This magic number shows up all over software design, of course, simply because it is what you get with 1 byte of data (1 byte => 8 bits => 8 1's or 0's => 2^8 => 256). Accounting for zero, this comes out to a max value of 255. In the rgb() CSS syntax, rgb(255,255,255) is pure white. With 3 dimensions, we have 3 bytes (=24 bit color) for a total range of 16 million colors. However, I always prefer _thinking_ in HSL just because it's easier to move around the spectrum in your mind. We tend to say things like, "I want that color to be brighter," instead of, "I want that color to have equally more red, blue, and green," which would mean the same thing. HSL, though, uses different scales. Hue has 360 values while Saturation and Lightness are percentages. This gives us 3,600,000 values instead of 16,777,216. (By the way, CSS3 supports decimal values for the hsl() syntax, so it's not actually limited to those colors.) I daresay that working with 3.6 million colors instead of 16.7 million will be an acceptable compromise for our end-users. Since we're not likely to find a database of even 3.6 million color names, simplifying the user input to that level isn't an issue.

## THE DISTANCE BETWEEN TWO COLORS

![](/img/uploads/2017/03/comparing_two_colors-300x244.jpg)To run a comparison between two colors, each made up of 3 pieces of data, we're essentially comparing two 3-dimensional points and finding the distance between them. The shorter the distance, the more mathematically similar are the two colors. Lucky for us, that's rather simple to do. In algebra, the distance between two 2-dimensional points is d\=∈š(x2∈’x1)^2+(y2∈’y1)^2. Recognize that? It's the pythagorean theorem at work! For 3-dimensional points the equation is similar: the square root of all of the squares of the differences between coordinates added together, which is d=∈š(x2∈’x1)^2+(y2∈’y1)^2+(z2-z1)^2. We could translate this equation to our purposes for RGB or HSL. In fact, since RGB has 3 values in the same range, it would actually be a bit easier. But as I mentioned, HSL is easier to think about, and since we might end up cheating the comparison a bit to return more perceived-similar colors, we'll stick with HSL.

## NAMING THE COLOR

The last consideration before we begin coding is how we want to name the colors. Pantone is one option that gives us around 2,000 matches, including some fun ones like "Fuzzy Wuzzy Brown". Sherwin Williams has about 1,000 named colors on their site, and with names like "Heartthrob" and "Papaya" I feel like we're a bit closer. But with either of these, I'd be concerned about copyright infringement. Lucky for us, there is an [open-source list of color names](https://github.com/jonathantneal/color-names/blob/master/color-names.json) pre-packaged as a JSON file. All we'll have to handle is finding the closest match. We only have to do this once per name, so I'm not concerned about efficiency. If I were, we'd definitely want to think through how we're storing and sorting the data. We can at least convert it to HSL ahead of time to save one step, though.

## ONTO THE BUILD

We've laid out our project and thought through the biggest strategic challenges. There will be surprises, but that's where _tactics_ come into play. Let the coding begin!
