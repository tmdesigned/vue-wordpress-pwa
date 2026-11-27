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

When axios gives you a response to a GET request, the data returned from the server is in aÂ `data`Â property. This is a bit confusing in your example, because the data returned from the server also has aÂ `data`Â property. So, in effect, you need to accessÂ `response.data.data`. You might adjust when you set the course details to instead haveÂ `setCourseDetails(response.data);` However, you also have some mismatched types. YourÂ `coursedetails`Â starts as an array, but you then set it to an axios response, which is an object. So you'll want to change that toÂ `useState({})`Â or something similar. Your JSX return value (at least, I presume it is. It's not wrapped in a return statement, but perhaps you deleted some for consciseness.) also presumes that there is always aÂ `data`Â property onÂ `coursedetails`, and aÂ `course_name`Â property on thatÂ `data`Â property. This isn't true, for instance, at the beginning. You will want to adjust this to check for its presence, i.e.Â `{coursedata.data && coursedata.data.course_name ? coursedata.data : ''}` Finally, it is helpful to track the status of async requests like this. I often use a separate state for the status, i.e.Â `const [status,setStatus] = useState('init');`Â Then right before the axios request is fired,Â `setStatus('loading')`Â and then right after it is successful,Â `setStatus('success')`. (And, if there's an error,Â `setStatus('error')`. This makes it easier to show different loading states to the user.
