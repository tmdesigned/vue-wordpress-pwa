---
title: "A* Search with Landmarks (ATL) Simulator"
slug: "a-search-with-landmarks-atl-simulator"
date: "2022-04-26"
excerpt: "In 2004 Andrew Goldberg and Chris Harrelson published a research paper entitled, \"Computing the Shortest Path: A\\* Search Meets Graph Theory\" which you can access in full [online](https://www.microsoft.com/en-us/research/wp-content/uploads/"
image: "/img/uploads/2022/04/landmarks-header.png"
tags:
draft: false
---
In 2004 Andrew Goldberg and Chris Harrelson published a research paper entitled, "Computing the Shortest Path: A\* Search Meets Graph Theory" which you can access in full [online](https://www.microsoft.com/en-us/research/wp-content/uploads/2004/07/tr-2004-24.pdf). Their work proposed a new heuristic for A\* search that relied on pre-calculating "landmarks" on a graph that could then be used with the triangle inequality to quickly find minimum distances. For this reason, they called it ATL, that is, the A\*, Triangle Inequality, Landmarks method.

There's a bit of complexity in that idea, and while their technique has become very popular, there are not many resources that explain it in simpler, less research-papery terms. Since I used this technique in the Artificial Intelligence course I took at Georgia Tech, I thought it would be worthwhile to share how it works. I created a simulator for demonstrating the approach (link towards the bottom) and will use screenshots of the simulator to explain the concept.

In the end, landmarks are not nearly as complicated as they first seem. Yet they are extremely effective -- far more-so than the more common Euclidean distance approach (or it's planetary parallel, the Haversine distance algorithm). Using landmarks effectively led my implementation to be the 2nd fastest in a cohort of ~600 submissions, beaten only by a reach-based approach that could, theoretically, also be used with landmarks.

## A\* heuristic theory review

To understand landmark heuristics, you first have to understand A\* search. There are many great resources on this, such as [this one from brilliant.org](https://brilliant.org/wiki/a-star-search/). However, the basic idea is that as we are considering how to get from some starting point (S) to some target point (T) on a graph, for each step we keep track of _both_ the cost of the path so far _and_ the estimated cost yet to come.

In other words, for each step we are considering, we say, "I know it takes me 200 units of effort to get to this next point, because I've travelled this far and I'm next to it now. I think it will take about 100 more from there. So I will assign this step that I'm thinking about a cost of 300."

This is commonly written as _f(n) = g(n) + h(n)_ where f(n) is the total cost, g(n) is the cost so far, and h(n) is the estimated cost forward.

Perhaps the most important thing to note is that in order for the a\* algorithm to find the optimal path, **the heuristic value must be optimistic**. It's totally find to underestimate that "cost from here". It's not okay at all to overestimate it.

That's worth developing an intuition about, so consider: if a heuristic overestimates a cost, it can actually block an optimal path. You might never explore down the best path because you _think_ it has too high of a cost, when in fact it doesn't.

![](/img/uploads/2022/04/blocked-path-1024x610.png)

A pessimistic estimate at Option A essentially blocks the A\* algorithm from finding the shortest path that lies beyond.

But the flip-side is not too bad. If a heuristic is overly optimistic, your worst case is that you explore a path that doesn't contain the solution. You can't hide an optimal path behind a too-optimistic heuristic barrier. It just lets your algorithm waste time exploring something needlessly. You'll go down that path and not find the answer. Oh well.

![](/img/uploads/2022/04/not-blocked-path-1024x651.png)

An overly optimistic estimate just wastes time. When it learns the actual cost beyond B is 20, it will instead continue via Option A.

Looking at the _f(n) = g(n) + h(n)_ formula, if you take it to the extreme and say "my heuristic is so optimistic that it always thinks the remaining cost is 0", then you'd get _f(n) = g(n) + 0_ which is exactly the same as uniform-cost search, the algorithm that just keeps track of the "cost so far". So it's fine, it doesn't break anything, but neither does such a heuristic help. The closer it is to the true value, the more it helps your algorithm.

Another way to think of it is that you don't want the heuristic (a guess) to outweigh the real costs. If the heuristic represents the "at least", then it _can't_ outweigh the real costs.

So, you end up wanting your heuristic to be as close to the true value as possible, but without going over. Mathematically this is referred to as "tightening the bounds" of the heuristic value; specifically we are looking for a "lower bound", or an amount that it has to _at least_ be. And the higher this "at least" value is, the more helpful the heuristic is.

That's why we relax the problem to find a heuristic, for instance, using euclidean distance for a maze. The path through the maze _can't_ be better than a straight line (euclidean distance) so we can use that safely as an "at least" value. With that we know we are not overestimating, so we aren't blocking an optimal path behind a wrongly high heuristic.

## Triangle Inequality

The other pre-requisite piece of knowledge is more simple. The triangle inequality states that when you add two sides of a triangle together, they must be longer than the third side by itself.

So, _a + b > c._ If this doesn't make intuitive sense, try to draw it out. The closest you can get is to have two sides (a and b) _almost_ in a straight line, but not quite. To connect their ends the 3rd line can't quite be longer. So for instance if side a's length is 10, and side b's is 10, then about as long as you can get for side c would be something like 19.99.

![Chart of a triangle with sides a (10m) b (10m) and c (19.99m) with City 1, 2 and 3 at the nodes.](/img/uploads/2022/04/triangle-inequality-1024x137.png)

As a and b approach a straight line, c gets longer, but it will never be longer than a + b.

Now imagine there is a city at each of the 3 dots in the image. You are trying to get from City 1 to City 2. But, let's pretend you _don't_ know that distance yet.

You know City 2 to City 3 is 10 miles, and City 1 to City 3 is 19.99 miles. What the triangle inequality tells you is:

*   a + b > c
*   a + 10 > 19.99
*   a > 19.99 - 10
*   a > 9.99

So you know that side a is at _least_ 9.99. As it happens, since we labeled it in the first image, you know that it is actually 10. But 9.99 is a really tight "lower bound" for what a has to be.

## But wait...roads aren't straight like that

It is true that roads are almost never straight like this. So you might ask something like, "What if the road between cities 1 and 2 is very straight, but the roads between 1 and 3 is very curvy?". You know what though? It doesn't matter.

All we are claiming to deduce from the triangle inequality are lower bounds, i.e. "at least" values. Since the direct distance between two cities will always be shorter than the road distance, we can say that the direct distance is an "at least" value. It's an optimistic, "relaxed case" of the reality. Which, you know, is exactly what we need for a heuristic.

## The ATL Method

This, then, is the how the ATL method works. We first select landmarks and pre-calculate their actual paths to every single other node. That's a lot of computation, and we haven't even started our actual search yet!

But this is _pre-calculation_ that we do once, and then get to reuse as many times as we want for our actual searches. (Note: it would be prohibitively expensive in both memory and time to pre-calculate _every_ node to _every other_ node.)

These pre-calculation distances -- which are not euclidean or anything, they are actual costs of real paths -- give us 2 out of 3 sides of triangles between the landmark and any 2 other nodes.

At each step of the A\* algorithm, we create abstract triangles between the node we are examining, the target node, and the landmarks we have pre-calculated.

Two sides of these triangles are already known, because the landmarks are completely pre-calculated to every other node, including the one we are examining and the target node we are trying to move towards. We use the triangle inequality to learn as much as we can about the third side. What is the largest "at least" length we can find? That's our heuristic value.

Let's look at an example using the well-known Romania graph:

![](/img/uploads/2022/04/landmarks-2-1024x725.png)

When the algorithm explores 'f', it creates an abstract triangle.

Say the algorithm is looking for the shortest path between 'a' and 'b', and we have a single pre-calculated landmark at 'v'. When the algorithm explores 's', it looks at its neighbors to add them to the frontier of nodes it is able to explore, using the cost of _\`f(n) = g(n) + h(n)_ to determine the order of which nodes to explore. To estimate the cost remaining from 'f', the node it is considering in the image above, it creates an abstract triangle between 'f', 'b' (the target), and 'v' (the landmark).

It knows the edge between (f) and (v) is 438, and the edge between (b) and (v) is 227. For it to still be a triangle, the third edge has to at least be 211. So since the third edge of the triangle is at least 211, (f) is added to the frontier with a priority of 450 (239 cost so far + 211 heuristic).

While we are drawing the triangle abstractly, the known sides do not represent geometric distance. Looking at the side between 'v' and 'b', you can see that the length of 227 is the actual cost it would take to journey between them. **This is essentially what makes landmarks so much more accurate -- they are encapsulating the actual topography of the graph as an estimate**.

## A more complex example

Now let's look at a more complex example from the simulator before I send you off to try it yourself. It uses a graph of about 3,000 major airports and the connections between them. (I created this sample by trimming and supplementing data originally provided by [https://r.neo4j.com/airports](https://r.neo4j.com/airports).)

Let's say you are traveling from SAT (San Antonio, USA) to HYD (Hyderabad, India). Instead of a single landmark, we can select many (up to 10 in the simulator).

In the image below, the dark green dots are airports we have "explored", somewhat analogous to calling the airport and asking about their flights. The light green dots are the airports we've found a flight to, but haven't yet called (so we don't know what departing flights they might have) . In other words we have added them to what we call our "frontier", but we haven't wasted any real time with them yet. The purple dots are our landmarks, and of course the stars are the two airports we are traveling between.

![Map of Earth showing path from SAT to HYD using landmarks](/img/uploads/2022/04/globe-landmarks-1024x622.png)

Using the 9 landmarks, a path from San Antonio (SAT) to Hyderabad (HYD) is quickly found.

Compare that to the following image which just uses direct distance (haversine algorithm) as the heuristic:

![](/img/uploads/2022/04/globe-haverine-1024x598.png)

The same path is found with a haversine algorithm, but many more airports are explored to find it.

This particular example may show landmarks to be more efficient, but there is a lot of variability depending on which landmarks you choose for a given source and target airports. More importantly, because airports' connections are not closely tied to their geographic distances, the nodes you'd expect to see explored aren't always the ones that are. In other words, keep in mind that this simulator is for teaching the concepts of landmarks, not to prove that landmarks are always better. I do think they generally perform better, but you won't always see it in a graph like this.

(An interesting aside: initially my dataset led to haversine outperforming landmarks every time. This was because I had _also_ used haversine to _generate_ the graph's distances between each airport, which wasn't provided in the neo4j data. So, haversine in effect knew the exact distance formula. To counteract this, a random factor was added to the dataset's distances. We'll call that a loose simulation of the many variables impacting flight time.)

With landmarks, just as before, at every step the triangle inequality is used to learn about the minimum path distance each neighboring airport must have to the target airport:

![](/img/uploads/2022/04/landmarks-animtion.gif)

The actual running speed of the algorithm is much faster than this sample shows--this is generating an animation frame for each calculation.

The ATL method in short:

*   Ahead of time, select some "landmark" nodes
*   Still ahead of time, calculate the landmark nodes' distance to every other node in the whole network
*   When finding a path between any 2 nodes, use the A\* algorithm
*   For the heuristic:
    *   Create an imaginary, abstract triangle between the source node, target node, and the landmark
    *   The pre-calculated landmark distances gives you 2 out of 3 of the triangle sides
    *   The third side must be at least as long as the other two sides' difference
    *   Do this for every landmark you pre-calculated
        *   Each triangle inequality generates a truth, i.e. "the third side must be at least \_\_\_ long"
        *   While they are all true, the longest "at least" value provides the tightest bounds and is the one we will use

## Landmarks Simulator

Ready to try it out yourself? Visit the simulator and set the options you'd like to try at the bottom, including which algorithm to use. If you choose landmarks, you will choose which airports will serve as landmarks.

A note about speed: this simulator is primarily a teaching tool. For landmarks, it takes several additional steps to record what it is doing for you to review. As such, landmarks may appear to take more time in the simulator than haversine. Real applications do not exhibit this trait, so the metric to pay attention to is the number of explored nodes, which is generally the expensive part of graph search algorithms.

Goldberg and Harrelson suggest choosing landmarks along the outside perimeter of a graph, but the globe is a sphere so you may just want to space them around the Earth.

The simulator uses a Mercator projection, and it does not do anything fancy with the lines between airports. For example, the flight from Honolulu to Sydney does not go East as the line shows. These are really graph lines, not flight paths.

After you choose landmarks, you need to allow the simulator a little bit of time to pre-calculate their distances to every other node. _Then_ you can calculate the route between two airports. Once you have calculated the route, you can either let it play through at different speeds, or step through it.

[Access the simulator here](https://tmdesigned.com/wp/demos/landmarks) (use a desktop/laptop, not a phone)

Perhaps the best way to develop an intuition on landmarks is to step slowly through a few landmark calculations, looking closely at the triangles overlaid on the map.
