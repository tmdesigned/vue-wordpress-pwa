---
title: "StackOverflow Answer: Redux only works after forced refresh (with context/provider)"
slug: "stackoverflow-answer-redux-only-works-after-forced-refresh-with-context-provider"
date: "2020-02-13"
excerpt: "## Original question: [Redux only works after forced refresh (with context/provider)](http://StackOverflow.com/q/60195254) * * * ## My answer: With redux, you can use `mapStateToProps` to bring the value of a redux reducer into your compone"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Redux only works after forced refresh (with context/provider)](http://StackOverflow.com/q/60195254)

* * *

## My answer:

With redux, you can use `mapStateToProps` to bring the value of a redux reducer into your component. I presume you are already doing this, but if not [read up on it](https://react-redux.js.org/using-react-redux/connect-mapstate).

With that, you have access to the value and as soon as it changes your component will update. You watch this update, and if it has a new token value in it, you save it to your state.

With hooks, that would be done with `useEffect`. The second argument is watched and the function runs when it changes, so you'd put the mapped props value there.

Without hooks, you'd watch for it in `componentDidUpdate` which receives the old props as the first argument, allowing you to check `oldProps.myMappedReduxValue !== this.props.myMappedReduxValue`.
