---
title: "StackOverflow Answer: I am having an issue with integrating an existing react component I found, into my app. \"Attempted import error:\""
slug: "stackoverflow-answer-i-am-having-an-issue-with-integrating-an-existing-react-component-i-found-into-my-app-attempted-import-error"
date: "2020-11-13"
excerpt: "## Original question: [I am having an issue with integrating an existing react component I found, into my app. \"Attempted import error:\"](http://StackOverflow.com/q/64821262) * * * ## My answer: Looking at the source for that package, it do"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [I am having an issue with integrating an existing react component I found, into my app. "Attempted import error:"](http://StackOverflow.com/q/64821262)

* * *

## My answer:

Looking at the source for that package, it does not contain a default export. It has:

`export const ReactNavbar` without the default.

Try importing the named component instead of as a default:

`import { ReactNavbar } from` instead of `import ReactNavbar from`
