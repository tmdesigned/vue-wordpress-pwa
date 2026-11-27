---
title: "A Vue.js powered, headless WordPress Progressive Web App"
slug: "a-vue-js-powered-headless-wordpress-progressive-web-app"
date: "2018-09-24"
excerpt: "It consistently blows my mind how much web developers are continually learning. It's actually one of the things I love about the field, because if I had to always do the same thing the same way, I'd get bored fast. There's always something "
image: "/img/uploads/2018/09/lighthouse-audits.jpg"
tags:
  - "JavaScript"
  - "WordPress"
draft: false
---
It consistently blows my mind how much web developers are continually learning. It's actually one of the things I love about the field, because if I had to always do the same thing the same way, I'd get bored fast. There's always something new to learn, and to learn to do better. 

If you're always doing your best work, then that means a project from 2 years ago is 2 years short of your best work. I respect the people who say that if you're not disgusted by your work from 6 months ago then you aren't improving fast enough. It's a little harsh, but I get it.

The custom WordPress theme I had created for my own site served me well, but it was time to go. I had patched it with some better practices and design changes every few months, but I wanted to do something exciting, something that pushed the edge a little bit.

I eventually settled on doing a Vue.js powered headless WordPress Progressive Web App, served through Amazon Web Services and sporting a fresh design.

## **...a Vue.js powered...**

I've made a couple of personal React projects (like this [Game of Life simulator](http://tmdesigned.com/post/game-of-life-simulator/)) and some Angular powered Single Page Apps for clients at work. But Vue.js, so simple and lightweight to get up and running, has recently been my choice for throwing together quick demos and micro-apps. 

But I hadn't done a full-scale app with it, and my blog was a perfect opportunity. With very little work, it can be set up to handle routing (i.e. for blog posts), make http requests, and use a centralized data store (Vuex).

About halfway through I really started missing Angular's Observers, particularly the BehaviorSubject I had come to rely on. At first I tried bending promises into the same pattern (you can make an externally-resolvable promise if you try hard enough), but it's really about a pattern shift and eventually the Vue.js way came together. 

It was a lot of fun, and I haven't lost any respect for Vue.js. The source of my app is [available on GitHub](https://github.com/tmdesigned/vue-wordpress-pwa/).

## ...headless WordPress implementation...

I decided to do a headless WordPress implementation, meaning WordPress would continue to power the backend of my site but would only be served to visitors through the awesome WordPress REST API. 

This went hand-in-hand with my desire to use Vue.js, as I wanted the framework to power my site, not just be incorporated into it. 

The single greatest lesson I learned here is how much I take WordPress for granted. It takes care of **so much** for you. This was driven home when creating the post archive page. "Oh of course...I can't use posts\_nav\_link()..."

On the bright side, it is **so frickin easy** to create custom API endpoints. I had to create one to serve a list of all my posts (with only the minimal information needed) since the main posts query, initially limited to 100 posts, gets large well before that.

## ...Progressive Web App...

Google spells out [minimum and exemplary requirements](https://developers.google.com/web/progressive-web-apps/checklist) for a Progressive Web App, but one thing I learned is that it's less of a certification and more of a goal, something like Calculus limits. (The limit of a project as it approaches perfection from the left is a progressive web app?)

The main goals here are to provide mobile users with an installable, user-friendly experience that is so slick it feels like an installed app. It definitely must work even when offline (achieved through Service Workers), be served over SSL, utilize history-based page routing, and have near-instant page loads and navigation.

Luckily, the VUE-CLI provides a starter for the service worker. In its current version it utilizes Google Workbox, which generates the actual service worker for you. The documentation on this implementation was extremely sparse.

I can't get over how fun it is to browse my site while offline.

## ...served through Amazon Web Services...

I don't think you really 'get' Amazon Web Services (AWS) until you start using it. Wow, there's a lot there. 

I was hosting my site before on a cheap monthly shared host (NameCheap), and while the limits and uptime were fine, the speed was so-so and it got more and more constricting as I tried to do more with it. I barely managed to get a Let's Encrypt SSL cert installed on it.

For my app to meet Progressive Web App speed requirements, I needed to move up a tier. Moving to AWS was more like shifting harbors, with a whole new world of tiers.

The site is now hosted on an EC2 instance (virtual machine). I started with a Bitnami WordPress setup, which preconfigured the server for powering WordPress. Best practices, especially relating to server settings and file ownership and permissions, are set up out of the box. 

Since both WordPress and my headless WordPress app were going to live on the same server, there was a lot of server configuration necessary for routing the right requests to the right places. Enabling the right Apache modules to optimize my app was also a new experience for me. 

After getting everything set up and running on AWS, I will simply say this: I have never appreciated the Systems folks at my day-job as much as I should have been. They've been handling so much for me. 

## ...and sporting a fresh design.

My previous custom theme featured a large hero image and strongly delineated sections. It originally featured separate sections for project and portfolio pieces, and the blog was only a piece of the whole picture. As time went on I realized the blogging was at the heart of what I'm doing here, so I wanted my design to really emphasize that.

Starting with mobile, I designed a minimalist home page with subtle UI animations, post prev/next buttons tied right into the main navigation of the site, and layouts and typography reminiscent of a magazine. Progressive Web Apps are meant to have simple, intuitive UI components similar to that of an app, so the main menu at the top would be fixed and simple.

Moving from the mobile to the desktop was relatively simple. The menu moves to the left, the prev/nexzt buttons move to either side of the screen, and the article has a little more breathing room. Continuing the magazine theme, the article page features a bold title area with a prominent feature image.

## Bring it all together

I'm obviously a bit proud of how all the pieces came together. The result is clean and simple, but also powerful under the hood. There is still some room for improvements and enhancements, and I'm planning some more posts on handling a few of the challenges that came up in the process. In particular, I would like to bring commenting and taxonomy navigation back in. But in the meantime the site is running great so far -- the featured image of this post is a screenshot of the latest Lighthouse audits I ran. The results were 98 for Performance, 100 for Progressive Web App, 100 for Accessibility, 100 for Best Practices, and 90 for SEO. That's **way** better than my old blog's results. 

Have you created a WordPress powered PWA? I'd love to hear about it!
