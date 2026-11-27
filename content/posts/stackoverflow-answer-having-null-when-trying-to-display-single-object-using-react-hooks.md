---
title: "StackOverflow Answer: Having null when trying to display single object using React hooks"
slug: "stackoverflow-answer-having-null-when-trying-to-display-single-object-using-react-hooks"
date: "2021-01-25"
excerpt: "## Original question: [Having null when trying to display single object using React hooks](https://stackoverflow.com/questions/65877091/having-null-when-trying-to-display-single-object-using-react-hooks) * * * ## My answer: When axios gives"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Having null when trying to display single object using React hooks](https://stackoverflow.com/questions/65877091/having-null-when-trying-to-display-single-object-using-react-hooks)

* * *

## My answer:

When axios gives you a response to a GET request, the data returned from the server is in a `data` property. This is a bit confusing in your example, because the data returned from the server also has a `data` property. So, in effect, you need to access `response.data.data`. You might adjust when you set the course details to instead have `setCourseDetails(response.data);` However, you also have some mismatched types. Your `coursedetails` starts as an array, but you then set it to an axios response, which is an object. So you'll want to change that to `useState({})` or something similar. Your JSX return value (at least, I presume it is. It's not wrapped in a return statement, but perhaps you deleted some for consciseness.) also presumes that there is always a `data` property on `coursedetails`, and a `course_name` property on that `data` property. This isn't true, for instance, at the beginning. You will want to adjust this to check for its presence, i.e. `{coursedata.data && coursedata.data.course_name ? coursedata.data : ''}` Finally, it is helpful to track the status of async requests like this. I often use a separate state for the status, i.e. `const [status,setStatus] = useState('init');` Then right before the axios request is fired, `setStatus('loading')` and then right after it is successful, `setStatus('success')`. (And, if there's an error, `setStatus('error')`. This makes it easier to show different loading states to the user.
