---
title: "StackOverflow Answer: react library testing are not updating my screen"
slug: "stackoverflow-answer-react-library-testing-are-not-updating-my-screen"
date: "2020-11-29"
excerpt: "## Original question: [react library testing are not updating my screen](https://stackoverflow.com/questions/65042912/react-library-testing-are-not-updating-my-screen/) * * * ## My answer: The warning from React, \"Warning: An update to Poke"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [react library testing are not updating my screen](https://stackoverflow.com/questions/65042912/react-library-testing-are-not-updating-my-screen/)

* * *

## My answer:

The warning from React, "Warning: An update to Pokemon inside a test was not wrapped in act(...)" means that it has detected a change to your state that is not accounted for in your testing. In this case, this warning is wrapped inside of a more explanatory message saying that this problem occurred after your test. In your code, you have `await waitFor(() => userEvent.click(screen.getByRole("button")))`. However, `waitFor` is meant to be used with an assertion. In other words it is meant to wait until an expectation is true -- not until an event is fired, because the firing of an event like this isn't asynchronous (the processing of it may be, but not the firing of it.) Instead, you should just fire the event, and _then_ `waitFor` something you can test that shows the process is finished. For instance, you said "they will be awarded 10 points and it will be logged on the screen". So after your event, do a `waitFor` that looks for the message showing that they answered it correctly, which you are already doing in the next line. So try:

```
userEvent.click(screen.getByRole("button"));
await waitFor(() => {
   expect(screen.getByText(/Score: 10/)).toBeInTheDocument();
});
```

Or, even simpler, since **findBy**\* methods use `waitFor` inside:

```
userEvent.click(screen.getByRole("button"));
screen.findByText(/Score: 10/);
```

PS You can learn more about that error message and some different approaches to fix it by reading Kent Dodds article on it, [Fix the "not wrapped in act() warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)
