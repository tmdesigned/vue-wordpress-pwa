---
title: "Revisiting React, now with Hooks--and experience"
slug: "revisiting-react-now-with-hooks"
date: "2019-07-28"
excerpt: "I first learned React in 2015, when it had been out in the Open Source world for just a couple of years. My first experience was...rocky, to say the least. It was the first full JavaScript framework I learned, which itself requires a major "
image: "/img/uploads/2019/07/react.png"
tags:
draft: false
---
I first learned React in 2015, when it had been out in the Open Source world for just a couple of years. My first experience was...rocky, to say the least. It was the first full JavaScript framework I learned, which itself requires a major thought process shift. (Far more powerful, but far easier to make mistakes.) JSX was very off-putting to me, as well. It seemed like an additional burden, and I didn't really get the benefits. (I do now--JavaScript passing around DOM code like a native object? Cool!)

Plus, Redux was confusing. It felt like an advanced topic you had to learn while standing upside-down on your head. "The...reducers...are pure functions...that define and then redefine the state and are always run for any update...because..."

I made a few demos and small projects with it, but shifted to Angular for heavy client projects and eventually Vue for lighter client projects.

And yet Gutenberg is written in React, and a few small contributions I wanted to make required me to delve back into it. Plus, the top WordPress folks were advising that the future of WordPress required developers to be JavaScript experts. So, to React I returned.

## Aside: What I wanted to contribute to Gutenberg

I had been advocating for a container block, along with many, many others, and when it came out in beta I found a few things a little clunky. I submitted a humble patch for the odd behavior of "single-child" blocks not having drag handles, which you wouldn't need in a top-level context--if it's the only block, where else can you drag it? But as it turns out, drag handles _are_ necessary when it has a parent, because you might want to drag the child out of the parent.

My "big" change was from:

\[code language="js"\] if ( isLocked || ( isFirst && isLast ) ) { \[/code\]

to:

\[code language="js"\] if ( isLocked || ( isFirst && isLast && ! rootClientId ) ) { \[/code\]

Which is admittedly minor, but reflected a lot of research and trial and error. But I found I was so rusty with React that I needed a lot of hand-holding, and so I decided I would eventually need to dive back in to better understand it.

## "We do a lot of React here at Losant"

In May, I accepted a new position with a really cool IoT platform called [Losant](https://www.losant.com). It was the final nail in the coffin for deciding to relearn React, because a lot of their client projects, I was told, were written with it. They were using the classic React + Redux paradigm, plus a lot of the newer features.

## A whole new React with Hooks

So I jumped back in, determined to give React another chance. And I was surprised to find that, in the 3-4 years since I had last used React, it had changed a lot. Okay, maybe it's not an entirely new framework, and to be honest there's still a lot more that's the same. But I could simply not believe how much it had grown.

Hooks are, I think it's safe to say, a game-changer with React. When these new features were announced at React Conf 2018, they described their apt naming. Hooks were about giving developers access to features that were there all along, but that were previously tightly controlled under the hood.

Dan Abramov's presentation really does a fantastic job of highlighting these amazing new features:

https://www.youtube.com/watch?v=dpw9EHDh2bM&t=685

In the small time I've been working with the very talented folks at Losant, I've seen some amazing things done with these hooks. It's amazing how useState, useEffect, and useContext in particular literally supercharge functional components.

## A Great React Course

I've also had the opportunity of working with the more traditional React + Redux model, which I will say I am much more comfortable with after completing Stephen Grider's [Modern React with Redux](https://www.udemy.com/react-redux/) course, which has also been updated with (brief) introductions to the hooks. Stephen has a great way of predicting what questions will come into your head while you're learning (or re-learning) React.

## A Revised Opinion

The changes to React in the last couple of years are amazing. With the addition of hooks, which really are a gamechanger, a lot of the complexities in mastering the framework are removed. My opinion on the framework is much, much brighter.

But to be honest, it was my own inexperience that colored my opinion of it in the first place.

It's probably not fair to judge a framework you don't fully understand. With a few more years of web development experience, and a great deal of more hands-on experience with the framework in particular, I now look on React with different eyes.

I _enjoy_ developing with it, and am more than excited that it has such a bright future, with web applications, WordPress, and beyond.
