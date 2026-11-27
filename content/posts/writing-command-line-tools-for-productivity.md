---
title: "Writing command line tools for productivity"
slug: "writing-command-line-tools-for-productivity"
date: "2019-02-16"
excerpt: "Those who are new to advanced computer usage, whether IT, systems, coding, or another field, are often surprised that so much is done on the command line. (This is only offset, perhaps, by the stereotype of hackers watching reams of text fl"
image: "/img/uploads/2019/04/cogs-gears-machine-159275.jpg"
tags:
  - "JavaScript"
  - "Workflow"
draft: false
---
Those who are new to advanced computer usage, whether IT, systems, coding, or another field, are often surprised that so much is done on the command line. (This is only offset, perhaps, by the stereotype of hackers watching reams of text fly by.) Why are text-based interfaces popular amongst advanced users, and what can we gain by creating our own such tools?

## Why the command line

While a text interface seems less efficient ("I can't just click?"), it's actually _more_ so, in many circumstances, for those who know how to use them. It cuts out the clutter because the interface no longer has to **show** every option. It also cuts out the mouse movements and clicking, which is slower than typing. But most importantly, a command line tool allows _direct access_ to what it does. I don't have to find items, navigating through menus and wizards and such. I just type the command for what I want to do. Of course, that presupposes you know the command and its syntax. Most command line tools include help pages, but the learning curve is still quite steep. Additionally, it's much easier to have a program replicate human input via text. In other words, I can automate code to run a certain set of text based commands far more easily than I can automate code to click around the screen with the mouse cursor. In a nutshell, then, it's about efficiency. And, when the tools are meant to run automatically (i.e. on the top of every hour), it's about automation.

## Writing our own tools

The real fun for me is writing my own tools to automate tasks. There's a hidden benefit of command line tools in that you don't have to spend time crafting interfaces, creating graphical assets, or even compiling advanced code. Many command line tools (at least home brewed ones) are simple scripts. How easy is it? I wrote my first one when I was 10. This was the 90s, the age of DOS, and it was a simple "batch" file. Batch files just ran down the code from top to bottom, but there were quite complex programs. Mine? Not so much. I'm pretty sure it asked for a number and then printed a set of predefined insults that many times. Now I mostly write tools in bash, so they have a Linux flavor but run on Windows using different command line shells. Bash doesn't feel as...elegant as say, JavaScript or C. But it works, and it's easy and powerful. Here are a few of the most useful ones I've written for work:

### Daily Archive

I wrote this on my second day of work at my current job, having had a similar Mac based script at my old job. 5 minutes before the end ofy work day, it pulls all the loose files from my desktop, downloads, and documents folders and sorts them into a local archive folder. It sorts them into subfolders by year, month, and day. This let's me use those areas as "scratch" or working directories, as many people do, but without them cluttering up over time. When I want to retrieve something that I thought was temporary, it's easy to find by estimating what day it was archived and looking in that days folder. It's so easy I'm embarrassed to share it as a favorite, but it has served me faithfully every day for the last 3 years.

### Githelper

When I was pushing my team to adopt version control, and git in particular, GitHub was ruled out for the cost to teams. Instead, I created a homemade solution which was a glorified remote server. To allow our team to use the same server without conflict and confusion and with consistency, I created an interactive tool that handled the creation, cloning, and management of remote repositories while enforcing some basic organization (i.e. indexed by client). I used a rudimentary menu system, and if I were going to create it again I'd switch to single input commands. But it still works great and I use it every day.

### Gitwordpress

When I pull down a site's files to make a change, I pull them _all_ down and make a commit to capture any remote changes. I prefer tracking changes to plugins and themes separately, from each other and from other file differences. For instance, the WordPress code files that differ with each release. The gitwordpress tool I created automatically adds and commits these changes separately. WordPress is consistent with what files may change - wp-includes/, wp-admin/, and loose files in the root directory aside from wp-config and any server files like .htaccess. Because of this, the tool can reliably separate out the changes and commit them independently of each other. Running this tool is the first step I do when working on an existing site's files.

## Next up: node.js

Node is JavaScript that runs indepently of a web site, i.e. on a server. It can also be run directly on the command line, which means you can create complex JavaScript tools that affect your filesystem. After digging around in 10up's wp-local-docker project, I'm excited to write my next tool using this tech. Since I write tools based on need, I am waiting for the right opportunity. However, the automation and deployment of my teams starter theme is a real candidate.
