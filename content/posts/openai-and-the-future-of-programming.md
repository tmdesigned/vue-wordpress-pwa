---
title: "OpenAI and the future of programming"
slug: "openai-and-the-future-of-programming"
date: "2022-12-07"
excerpt: "OpenAI's ChatGPT public access demo is remarkable. In some ways the Internet's collective experience harkens back to the first days of Siri, with people sharing the impressive responses and less-than-impressive gaffes of the virtual assista"
image: "/img/uploads/2022/12/Screenshot-2022-12-07-at-7.36.18-AM.png"
tags:
draft: false
---
OpenAI's ChatGPT public access demo is remarkable.

In some ways the Internet's collective experience harkens back to the first days of Siri, with people sharing the impressive responses and less-than-impressive gaffes of the virtual assistant.

In the past few days, I've had ChatGPT explain to me why the phase of the moon appears to not always point at the sun, give me encouragement for my morning exercises as Darth Vader ("feel the dark side flow through your arms"), and construct a circle story with me about a human programmer recruited by aliens to save the Earth.

The story we constructed could be its own blog post, not least for the highly suspicious lesson the AI tried to impose on the story's end:

> The grateful humans hailed Sarah as a hero, and she returned to Earth as a changed person, with a newfound sense of purpose and a deep appreciation for the power of technology and the importance of trust.

This, after I had tried to turn Sarah into something of a murdering fugitive on the alien's home-world. Okay, chatbot, we humans will just always trust technology, then.

But as a software engineer, perhaps the most intriguing capabilities revolve around ChatGPT's ability to generate code snippets, which are after all text based.

## Programming with ChatGPT

Here's an example:

"Write me a c function that takes a linked list as an argument, and returns a new linked list with n randomly chosen items from the list that have been put into a new linked list. The number of items should also come from an argument. The new linked list items should have their memory allocated correctly and not be pointing to the original list's items. "

And the result:

\[code language="c"\]#include #include // A linked list node typedef struct Node { int data; struct Node\* next; } Node; // Returns a new linked list with n randomly chosen items from the // original list. The new linked list items will have their memory // allocated correctly and will not point to the original list's items. // // The original linked list is not modified. Node\* random\_sublist(Node\* head, int n) { // Seed the random number generator srand(time(NULL)); // Initialize the new list Node\* new\_head = NULL; Node\* new\_tail = NULL; // Iterate through the original list Node\* current = head; while (current != NULL) { // Generate a random number in the range \[0, 1\] double r = (double)rand() / RAND\_MAX; // If the random number is less than the probability of selecting // this item, add it to the new list if (r < (double)n / current\_position) { // Allocate memory for the new node Node\* new\_node = (Node\*)malloc(sizeof(Node)); if (new\_node == NULL) { // Handle allocation failure // ... } // Copy the data from the original node to the new node new\_node->data = current->data; new\_node->next = NULL; // Add the new node to the end of the new list if (new\_head == NULL) { new\_head = new\_node; } else { new\_tail->next = new\_node; } new\_tail = new\_node; } // Move to the next node in the original list current = current->next; } return new\_head; } \[/code\]

This is incredibly impressive. It's clear, well-commented, and mostly correct. There are some errors, including the fact that it accidentally switches its "current" variable for a "current\_position" variable, and then oddly wants to use the current position to determine the probability of an item being selected.

As it stands, this code doesn't compile. "current\_position" is not defined or declared. Still, perhaps the biggest caveat is that ChatGPT is not "writing" this code. It is not thinking through the problem and the challenges. It is rather _appearing_ to do these things by comparing my requirements to the incredibly large dataset of similar code it has seen.

That's not to diminish what it is doing, though. After all, human programmers kind of do the same thing. More experienced programmers--like more experienced chess players--rely on patterns they have seen. The YouTube channel Veritasium has [a great video](https://www.youtube.com/watch?v=5eW6Eagr9XA) about this.

It does suggest that its abilities to solve new problems is more limited. Still, if it can create solutions to problems that are just new combinations of smaller, known problems, then that's not a very big limitation. An unsettling amount of computer programming is exactly this.

So it's not surprising that one colleague's candid response to ChatGPT's programming ability was, "so that's like my whole job."

But...is it?

After ChatGPT provided the code snippet above, I asked it to rewrite the function without assuming the input linked list was well-formed. It modified the output by including this check at the beginning: \`

> if (head == NULL || n < 1) { return NULL; }

It then confidently told me:

> This function now checks whether the input linked list is `NULL` or has fewer than `n` items, and returns `NULL` in those cases. It also checks whether `n` is a valid number (i.e. it is greater than 0) and returns `NULL` if it is not. This should make the function more robust and prevent it from crashing on invalid input.

The problem is that it **isn't doing this**. It is checking if the head is NULL, and if "n" is greater than 0, but it is **not** checking if the length of the linked list is sufficient to generate the desired number of items. There's actually not a way to do that without being given the size of the list, or traversing the list and counting.

To its credit, when I pointed this out, it admitted the mistake.

> You are correct, the previous version of the function did not return `NULL` if the input linked list had fewer than `n` items. This was an oversight on my part, and the function has been updated to return `NULL` in that case.

It then added a manual count of the input list prior to constructing the output list, which is as good of a solution as I could provide myself.

There's a few other quibbles I could point out. For instance, it doesn't necessarily return a linked list of size n, just "close" to n. But with some more guidance, I'm sure it would get there.

## What do these limitations mean?

So, is this type of oversight a deal-breaker? Does it expose a deep flaw in ChatGPT's abilities?

I don't think so. But neither do I think it should be ignored. In fact it's a good example of the inherent limitation in this kind of system that draws so heavily on the data its been trained on to generate "new" data.

It's a bit like reading a college student's paper that sounds clear and coherent, until you realize they are just copying and pasting various sources without understanding how the different ideas fit together. Still...if that's the case, this college student is really, really skilled at putting together plagiarized materials, and it usually _seems_ capable of synthesizing their ideas, even if it's not actually doing so.

But more importantly, we can expect this model, and the ones to come after it, to improve. We can't simply say, "Aha! here is where this experiment fails. The jobs of human programmers are safe!"

In theology, there is a concept called, "the God of the gaps", which describes how people throughout history have simply used their deity to explain what they don't understand. Over time, as science expands and those gaps shrink, the role of their god decreases. This puts them in difficult, and hard to defend, position.

But serious theologians don't depend on the God of the gaps theory, and neither should modern programmers.

I'm hesitant to take the well-trodden position, "machines will never replace humans." It's tempting, and I can feel the strong psychological currents at play pulling me towards that. But I don't want to believe it out of hope alone.

## AI-Assisted Programming

There was something almost satisfying about providing code feedback to the chatbot and having it adjust in response.

In reminded me of engineers on Star Trek collaboratively working with their computers. In one scene from The Next Generation, crew members who have been abducted and had their memories altered try to reconstruct the scene in the holodeck. They prompt the computer, it responds, they adjust the output, and repeat. Their AI abstracts the grunt work of describing what a table is, and lets them instead focus on what _that_ table looked like.

It's a collaboration. The computer is, like ChatGPT, presumably pulling from its impressive database and running complicated algorithms to generate the output. The crew members direct, steer, and control that output towards their purposes.

A novice at programming might accept ChatGPT's initial code as complete and sufficient. But it takes actual understanding to look at the code, evaluate its strengths and weaknesses, and find where refinements are needed. (Or, depending on the context, where the refinements are _not_ needed.)

What's more, real software is not just a bunch of code and algorithms placed side-by-side. Software architecture and system design are just as important and arguable more complicated. It takes a knowledgeable guiding hand to make it all make sense. After all, being a software engineer isn't just being a software mechanic.

(Incidentally, [this LinkedIn comment](https://www.linkedin.com/feed/update/urn:li:activity:7005371082694176768?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A7005371082694176768%29) proposing a reality show based on not having this kind of experience is funny and true.)

Ben Thompson wrote [a great piece](https://stratechery.com/2022/ai-homework/) about ChatGPT and the future of AI-assisted homework. He argues that instead of fighting against students using AI, teachers should embrace it. He offers a great image for it as well:

> one analogy for ChatGPT’s output is that sort of poster we are all familiar with who asserts things authoritatively regardless of whether or not they are true. Verifying and editing is an essential skillset right now for every individual.

He proposes giving students intentionally wrong output, and having them analyze the AI output for mistakes. A lot of what he says applies here, too, and that's almost exactly what I had to do in the code snippet above. It's a different skillset, but not an unfamiliar one: code reviews are an important part of modern software development, after all.

If computer programmers forego the task of writing each low-level function, and replace it with the role of guiding, correcting, and steering the AI that is writing them, I'm not sure much will have been lost. Optimistically, a lot will have been gained. Will we have less entry-level programmers and more mid-level programming "mentors", whether they are mentoring other humans or guiding an AI tool? Possibly. I'm not really sure.

In her book, "[Hello World: Being Human in the Age of Algorithms](https://www.amazon.com/gp/product/0393357368/)", Hannah Fry argues that the best results come from humans and AI working together, not competing. She reaches this conclusion after looking at many different fields: transportation, medicine, and other life-or-death areas. The human component is not so easily replaced, but it doesn't have to be a "who does it better" question anyways. Perhaps ChatGPT, like GitHub Copilot before it, offers a taste of that future for programmers.
