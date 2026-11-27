---
title: "Critiquing the Agile Principles"
slug: "critiquing-the-agile-principles"
date: "2022-11-21"
excerpt: "Agile software development is widely hailed as a philosophy of creating software that better responds to reality, better reflects human developers, and better meets changing business goals. The \"agile manifesto\" is short and simple: > We ar"
image: "/img/uploads/2022/11/papers.png"
tags:
draft: false
---
Agile software development is widely hailed as a philosophy of creating software that better responds to reality, better reflects human developers, and better meets changing business goals. The "agile manifesto" is short and simple:

> We are uncovering better ways of developing  
> software by doing it and helping others do it.  
> Through this work we have come to value:  
>   
> Individuals and interactions over processes and tools  
> Working software over comprehensive documentation  
> Customer collaboration over contract negotiation  
> Responding to change over following a plan  
>   
> That is, while there is value in the items on  
> the right, we value the items on the left more.
> 
> https://agilemanifesto.org/

Expanding on this, the authors made a list of a "agile principles". Below the principles are pasted, along with some thoughts and critiques of them I have. These are drawn from experience using scrum (an agile process) and leading a team of engineers that uses it.

While we definitely don't "do agile" perfectly, I do feel that we do it well _enough_ that my critiques are fair -- or, at least, that they represent a fair assessment of how agile plays out in reality.

I **greatly respect** agile, and it is without a doubt the best software philosophy system I know. But pretending that it is perfect and not in need of reevaluation--maybe revision--would be self-contradictory. Can an agile system itself be rigid? I don't think so!

I also disagree with the notion I have come across that any critique of agile (or scrum, or any agile methodology) is simply an indicator that "you're doing it wrong". Agile was created by a group of intelligent humans, not delivered to humanity by God and inscribed on stone tablets. It's great, but it's not infallible.

So here are the principles, along with some changes I'd make.

### **Some Minor Critiques**

> Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.

My rewording of this would be, “Our highest priority is **to create value for the customer, as quickly as is responsible**.”

There are a couple of challenges here. The emphasis on early and continuous can lead to sacrificing quality, and developing for releasability is not always the right order.

There's also a hard lesson, that what customers want from software is not always what they _need_ from software, especially over the long-term. True, the software exists to serve the end-user. But part of engineering is stepping back and looking at the big picture, and part of UI/UX is stepping back and looking at the user.

Delivering **value** instead of just quick satisfaction, and leaving a bit of breathing room for responsible development, pay off in the long run.

> Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.

My only change here would be from "Welcome" to "**Allow**". We do not want to create patchwork features and incongruous software in our legitimate quest to respond to gradually refined requirements.

> Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale.

Teams and software stacks are different. What I've seen in practice is that shoehorning a project into a 2-week release cycle isn't always the best fit, and may even cause harm. I would write this as, "Deliver working software as frequently **and responsibly** as possible".

This also takes some of the burden of the initial development. Early on in the life of software, focusing strictly on releasability can be misguided.

> Business people and developers must work together daily throughout the project.

Daily interaction is helpful in some regards, but doesn't have to always involve everyone, lest it interfere with development. I might just scratch the word "daily".

> Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.

Yep.

> The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.

Face-to-face communication does not reflect the reality of distributed teams. Definitely, **synchronous** communication is vital. But quick voice calls can be very productive.

More important than this, though, is that different types of meetings have different needs. Unless meetings are moderated well, conversations often wander. They also have little staying power unless clear outputs are defined.

I'd reshape this whole point in that direction. **"Conveying information requires a shared understanding of goals and clear action items. Synchronous communication is often the most efficient method."**

> Working software is the primary measure of progress.

Working is vague. “**An increase in the software’s ability to provide value for the customer** is the primary measure of progress.”

## The Biggest Change

There's 5 more. I want to talk about one of them the most, so let's get the other 4 out of the way. These are pretty spot on;

> Continuous attention to technical excellence and good design enhances agility.

> Simplicity--the art of maximizing the amount of work not done--is essential.

> At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.

More on this one below.

> The best architectures, requirements, and designs  
> emerge from self-organizing teams.

Okay...this one does need a quick comment. Business requirements often emerge from outside the self-organizing team. So, there's that.

But more importantly:

> Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.

Humans are not machines. They cannot work indefinitely in a structure that does not allow for some flexibility or responsiveness to human nature. This is especially important as teams are made of more than one person. What works for some won't work for all, especially as the team dynamic evolves.

Even a structure that has a rhythm of work and tries to take human nature into account will itself eventually be restrictive. The context they work in will change, the _people themselves_ will change.

We've seen more of an emphasis on mental health in the software world, and this should continue to be emphasized. Continuous work, even at a sustainable pace, can lead to burnout.

Absolutely we should strive to achieve a sustainable rhythm. But we should also recognize that the rhythm itself may need to evolve. Yes, agile allows for team reflection to be more efficient. But let's give ourselves the freedom to apply that same idea to the agile principles themselves.
