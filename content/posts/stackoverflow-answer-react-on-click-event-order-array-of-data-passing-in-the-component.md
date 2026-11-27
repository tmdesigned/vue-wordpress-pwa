---
title: "StackOverflow Answer: React on click event order array of data passing in the component"
slug: "stackoverflow-answer-react-on-click-event-order-array-of-data-passing-in-the-component"
date: "2020-02-12"
excerpt: "## Original question: [React on click event order array of data passing in the component](http://StackOverflow.com/q/60177206) * * * ## My answer: It looks from your question that you want to let a child component (FooComponent) know that t"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React on click event order array of data passing in the component](http://StackOverflow.com/q/60177206)

* * *

## My answer:

It looks from your question that you want to let a child component (FooComponent) know that the button has been clicked so that it can process (sort) the data it has received.

There are a lot of approaches to this. For instance, you could pass a boolean property to the child component that is a flag for it to do the sorting. So the parent component tracks when the button has been clicked, and the child component just observes this (perhaps in componentDidUpdate).

This would change slightly if you are using functional components, rather than class based components, but it gives you an idea.

```
state = {
   requestSort: false
}   

requestSort = () => {
    this.setState({
        requestSort: true
    }
}

render() {
        return (
          <>
            <button id="myBtn" onClick={this.requestSort}>Click Me</button>

            <div className="myClass">
                <FooComponent requestSort={this.state.requestSort} fooData={data} />
            </div>
          </>
        )
}
```

Alternatively, since the data is being passed to the child component as well, you could have the _parent_ sort it when it is clicked. It depends on if you are doing anything else with the data (i.e. is only FooComponent the one that should have the sorted copy of the data or not).
