---
title: "StackOverflow Answer: Why is it showing undefined, if handleChange itself has values"
slug: "stackoverflow-answer-why-is-it-showing-undefined-if-handlechange-itself-has-values"
date: "2020-07-25"
excerpt: "## Original question: [Why is it showing undefined, if handleChange itself has values](http://StackOverflow.com/q/63086294) * * * ## My answer: Anytime you have a button of type \"submit\" in a form (or one that does not specifically say that"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why is it showing undefined, if handleChange itself has values](http://StackOverflow.com/q/63086294)

* * *

## My answer:

Anytime you have a button of type "submit" in a form (or one that does not specifically say that its type is NOT "submit" by specifying a type of "button"), the browser is going to view its click as the user wanting to submit the form. So the answer for your first question is simply to add `type="button"` to your continue button, instead of "submit".

You wrote a form handler override that tried to prevent the above, I don't see an obvious reason why it wasn't preventing it, actually.

Secondly, you seem to be trying to call your submit function by referencing `this.state.formFields`. However that does not exist in your state. When you update your inputs, you are using this function:

```
    // Handle fields change
    handleChange = input => e => {
        let formFields = this.setState({ [input]: e.target.value });
    }
```

That `setState` call does not return values, it is a setter. You are setting an individual piece of your state (say, "name" equal to "John Doe") And even if it did, your `formFields` would go nowhere.

Instead, in your submit function, you'll want to just pull the pieces out of state that you are interested in. For instance,

```
const valuesToSubmit =  {
    name: this.state.name,
    email: this.state.email,
}
axios.post('/api', valuesToSubmit)
...
```
