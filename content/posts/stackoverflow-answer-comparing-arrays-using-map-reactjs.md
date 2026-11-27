---
title: "StackOverflow Answer: Comparing Arrays using .map (ReactJS)"
slug: "stackoverflow-answer-comparing-arrays-using-map-reactjs"
date: "2021-01-26"
excerpt: "## Original question: [Comparing Arrays using .map (ReactJS)](https://stackoverflow.com/questions/65899043/comparing-arrays-using-map-reactjs) * * * ## My answer: You are correct in where the problem lies: `course.courseUrl === courseList.C"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Comparing Arrays using .map (ReactJS)](https://stackoverflow.com/questions/65899043/comparing-arrays-using-map-reactjs)

* * *

## My answer:

You are correct in where the problem lies: `course.courseUrl === courseList.CourseCode` In this caseÂ `course`Â is a single item from a list, with a propertyÂ `courseUrl`. That's fine. ButÂ `courseList`Â is an array of items,Â **each of which**Â has aÂ `CourseCode`Â property. The Array itself does not (although, interestingly, it could). It seems like what you are trying to do is pull the full course data (from courses) but filtered to only the ones the user has. In this case, you have to loop through one list, looking through the other list for each item. What you want isÂ `filter`Â (or, more powerfully,Â `reduce`) but probably notÂ `map`. `const filteredCourses = availableCourses.filter( availableCourse => studentsCourses.some( studentsCourse => studentsCourse.id === availableCourse.id ) );` You'll notice I renamed the variables to make it clear which of the two lists is being used at each part. The outer functionÂ `filter`Â will return a new array containing only those items that return 'true' in the callback function. The inner callback functionÂ `some`Â loops through another array (the student's enrolled courses) and returns true if it findsÂ _any_Â that match the given condition. So in English, "Filter this list of all the courses, giving me back only the courses that have a matching ID in the list of the student's enrolled courses."
