---
title: "StackOverflow Answer: Accessing JSON Array Data in React.js/Next.js Combo"
slug: "stackoverflow-answer-accessing-json-array-data-in-react-js-next-js-combo"
date: "2020-02-13"
excerpt: "## Original question: [Accessing JSON Array Data in React.js/Next.js Combo](http://StackOverflow.com/q/60208873) * * * ## My answer: ``` class Posts extends React.Component { state = { posts: [] } componentDidMount() { this.savePosts(); } c"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Accessing JSON Array Data in React.js/Next.js Combo](http://StackOverflow.com/q/60208873)

* * *

## My answer:

```
class Posts extends React.Component {
  state = {
      posts: []
  }

  componentDidMount() {
      this.savePosts();
  }

  componentDidUpdate() {
      this.savePosts();
  }

  savePosts = () => {
      if(this.props.posts){
         //do any other processing here first if you like
         this.setState({
             posts: this.props.posts
         });
     }
  }
```

You probably don't _need_ to save the posts in state, since you could just pull them from props directly. But if you need to process or transform them somehow, it might make sense.

In either case, you just hook into the lifecycle methods to do this.

Note: This will set the state every time the component updates. Often you only want to update the state when that specific prop changes. If so, you can first compare the old and new props to see if it has changed in a way that means you want to update your state.
