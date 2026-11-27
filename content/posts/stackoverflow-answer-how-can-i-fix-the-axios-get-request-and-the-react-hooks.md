---
title: "StackOverflow Answer: How can I fix the Axios get request and the React Hooks?"
slug: "stackoverflow-answer-how-can-i-fix-the-axios-get-request-and-the-react-hooks"
date: "2021-01-24"
excerpt: "## Original question: [https://stackoverflow.com/questions/65870417/how-can-i-fix-the-axios-get-request-and-the-react-hooks/](https://stackoverflow.com/questions/65870417/how-can-i-fix-the-axios-get-request-and-the-react-hooks/) * * * ## My"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [https://stackoverflow.com/questions/65870417/how-can-i-fix-the-axios-get-request-and-the-react-hooks/](https://stackoverflow.com/questions/65870417/how-can-i-fix-the-axios-get-request-and-the-react-hooks/)

* * *

## My answer:

I think your code is a little over-engineered, and doesn't properly handle the asynchronous nature of the request. What I typically do is return the fetch or axios object so that the calling component can wait for the response and handle it when it's ready. [Forked example](https://codesandbox.io/s/gender-detector-forked-86eqr?file=/src/components/Container.jsx) As you can see, I've removed a couple of pieces from your Container.jsx component (which might need a different name fwiw). Instead of setting a flag for the form being ready to submit, I just have the button directly calling theÂ `fetchNameData`Â function. TheÂ `checkGender`Â function from your utilities function now directly returns the axios object, which is a promise. TheÂ `fetchNameData`Â function is async so it can wait for the results from this promise.
