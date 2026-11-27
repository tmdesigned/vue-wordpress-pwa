---
title: "StackOverflow Answer: React Props doesnt pass info to the confirmation page"
slug: "stackoverflow-answer-react-props-doesnt-pass-info-to-the-confirmation-page"
date: "2020-04-28"
excerpt: "## Original question: [React Props doesnt pass info to the confirmation page](http://StackOverflow.com/q/61478261) * * * ## My answer: Your `AdditionalInfo` component ties each of its inputs to the `handleChange` props, which was passed to "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React Props doesnt pass info to the confirmation page](http://StackOverflow.com/q/61478261)

* * *

## My answer:

Your `AdditionalInfo` component ties each of its inputs to the `handleChange` props, which was passed to it by the parent. When a field is updated, the parent learns about it.

Your `TagsInput` component stores the list of tags in its _own_ state (useState hook). It never informs the parent about any changes it has.

Later, when your parent (presumably, not shown) calls the `ConfirmationPage`, it doesn't know about the tags that were entered, but it does know about the other info because it was told about them.

Instead, track the list of tags in the parent, and pass down the current list of tags (as well as an 'addTag' and 'removeTag' handler) to the child.

**UPDATE**

I have edited your sandbox to show a working example. Note I did have to remove a lot of references to outside files to get it to compile, so in the future you may want to strip down your code to the exact question you have before posting the sandbox.

[https://codesandbox.io/s/tagger-u8fs5](https://codesandbox.io/s/tagger-u8fs5)

Some notes:

1.  It wasn't clear before how your file structure was working. Now that I see it, you don't need to actually move the state of tags. It's fine to have the TagsInput track its own state. But it **is** still true that you need to update its parent with this value. To do this, I added a `updateParent` function that is called whenever you add or remove a tag.
2.  The `handleChange` function couldn't be used for the tags, because you have it set up to look for `e.target.value` and in this case we are sending it an array of values directly, not an event with a value. I added a `handleChangeRaw` function that allows this.
3.  When you update the state of the tags (add/remove) I store the new temporary array in a constant that can then _also_ be sent to the parent. You don't want to just set it directly (i.e. with `setTags`) and then have the `updateParent` function reference that state directly, because it will be one render behind (i.e. one tag behind)
4.  On your summary page, I added a `.join(',')` to your tags output; otherwise it just tries to make a string out of the elements, which will run the words together.
5.  I'd avoid setting the value of e.target.value to "" in order to reset the input field. That's a little backwards to me (you're changing the event that was a moment in time). Instead, I have your code using the input as a "controlled" input, meaning we track its state and change it whenever we want (as when we need to reset it). This is separate from tracking the list of tags; here we are just tracking the current value of the input box.

So in summary, the missing step was indeed that your parent component was never made aware of the changes in the tags. When you have nested components (parent/child relationship) you need to carefully pass the information up and down; they don't automatically share what they know.
