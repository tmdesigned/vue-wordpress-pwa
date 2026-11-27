---
title: "StackOverflow Answer: Twitter API tells me \" media type unrecognized.\" for images that always worked"
slug: "stackoverflow-answer-twitter-api-tells-me-media-type-unrecognized-for-images-that-always-worked"
date: "2020-01-22"
excerpt: "## Original question: [Twitter API tells me \" media type unrecognized.\" for images that always worked](http://StackOverflow.com/q/59858831) * * * ## My answer: Twitter's documentation states: > Ensure the POST is a multipart/form-data reque"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Twitter API tells me " media type unrecognized." for images that always worked](http://StackOverflow.com/q/59858831)

* * *

## My answer:

Twitter's documentation states:

> Ensure the POST is a multipart/form-data request. Either upload the raw binary (media parameter) of the file, or its base64-encoded contents (media\_data parameter). Use raw binary when possible, because base64 encoding results in larger file sizes

However it looks like you are uploading base64-encoded contents, while using the media parameter. Try changing the media parameter to media\_data.

It's likely a recent change or one that is only recently enforced, hence it working before for you.
