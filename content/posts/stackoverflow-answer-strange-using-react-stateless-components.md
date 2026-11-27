---
title: "StackOverflow Answer: Strange using React stateless components"
slug: "stackoverflow-answer-strange-using-react-stateless-components"
date: "2020-02-09"
excerpt: "## Original question: [Strange using React stateless components](http://StackOverflow.com/q/60131709) * * * ## My answer: In React you can either have class-based components, or function-based components (functional components). Functional "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Strange using React stateless components](http://StackOverflow.com/q/60131709)

* * *

## My answer:

In React you can either have class-based components, or function-based components (functional components).

Functional components are generally easier to test and understand, and they are lighter.

The trend in the React world is towards function-based components. This has been the case even more so in the last year or so, with the introduction of hooks (i.e. `useState`, `useEffect`, etc.) which allow you to have a light functional component, but with access to the things that gave class-based components their extra abilities.

There's nothing wrong per se with class-based components, but the trend is away from them, so I'm not surprised to hear you say you joined a project that does not use them.

You may be interested in one of the React Conf videos from 2018 that went into the introduction of hooks: [React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM) The relevant part starts at about 11:30.
