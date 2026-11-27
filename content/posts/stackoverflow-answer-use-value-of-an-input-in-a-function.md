---
title: "StackOverflow Answer: Use value of an Input in a function"
slug: "stackoverflow-answer-use-value-of-an-input-in-a-function"
date: "2020-02-14"
excerpt: "## Original question: [Use value of an Input in a function](http://StackOverflow.com/q/60225243) * * * ## My answer: Two things: `getElementsByName` is plural -- note the 's' in 'Elements'. So it doesn't just return one element, it returns "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Use value of an Input in a function](http://StackOverflow.com/q/60225243)

* * *

## My answer:

Two things:

`getElementsByName` is plural -- note the 's' in 'Elements'. So it doesn't just return one element, it returns a list, even if there's just one.

Since you are using React, you don't need to pull the value of the input that way at all. Instead, on the input itself, just add a `value` and `onChange` property, and then track the value being typed in there as state.

You already have a spot for them in your state, so just go ahead and use that. You'll track it live as they type, not just at form submission.

```
class Account extends React.Component {

    state = {
        name: '',
        content: ''
    }

    _formSubmit(e) {
        //just process your form _submission_ here           
    }

    onChangeName = (e) => {
        this.setState({
           name: e.target.value
        });
    }

    render(){
        return(
            <div className="container">
                <br></br>
                <h3 className="title">Account</h3>
                <form id="form">
                    <br></br>
                    <label>Titre</label>
                    <input type="text" name="name" placeholder="Ici le nom de l'Article" value={this.state.name} onChange={this.onChangeName} />
```
