---
title: Things I did right (and wrong) making this site in 2019
slug: things-i-did-right-and-wrong-making-this-site-in-2019
date: 2025-06-14
excerpt: "I made this Vue.js view of a headless WordPress backend in 2019. 6
  years later, what would I do differently? ## What I did right First, let me
  say a few things that I am still happy with: 1. The minimalistic style still
  works. If my brand i"
image: /img/uploads/pab-tmdesigned.png
tags: null
draft: false
---
I made this Vue.js view of a headless WordPress backend in 2019. 6 years later, what would I do differently?

## What I did right

First, let me say a few things that I am still happy with:

1.  The minimalistic style still works. If my brand is being a developer, I don't need flashy style. But I think the simplicity is clean and understated and does the content a favor. I stand behind it 6 years later, which in the world of design isn't half bad.
2.  The use of Vue as a PWA (progressive web app) on top of a WP backend still seems to me a solid choice. For a 1-person site, I don't need to waste time recreating the wheel. Vue is so light that this feels like a great use for it.
3.  The emphasis on content and the simple pages about who I am still serve the needs of the site well.
4.  The AWS deployment is right-sized for the site. It uses the services well without overkill, and has been faithfully chugging along with about a $6 a month expenditure for 6 years.
5.  The layout is appropriately responsive for multiple viewports and devices.

## What I didn't do right

The PWA portion took up a lot of time. It was a fun experiment for me, but is definitely overkill for this site, except as a proof of ability. However, there's a few parts I didn't get right.

1.  The page numbering is 0-indexed, which isn't appropriate for user facing content. I'd never let that pass a merge request today and am surprised I didn't catch it in 2019.
    1.  This is pretty easy to fix. It's just getting the code and offsets right. A key here was creating a getter in the store to isolate the logic for loading posts.
2.  The scroll position of posts does not reset when navigating through them. It's all the same page with different content, but that doesn't matter to the user. It should scroll up on a new article rendering.
    1.  Super easy. A simple JS call to scroll to position 0 whenever the page content changes.
3.  The caching of the site content is overaggressive. If you load the list of posts, and a new one is added, you don't see it even after a hard refresh.
    1.  I really thought this was the service worker configuration, since it is designed to serve content from a local cache. As it turns out, it was the actual browser cache. The WordPress API defaulted to a max-age of a day, so changing that to not allow caching fixed it right up!
4.  The header meta tags are not updating appropriately for each article. If you link directly to one, it should pull the title and description and image from that post in particular, not the site as a whole.
    1.  This should be easier than it is. Because crawlers don't run (much) JavaScript, the meta has to be on the page when it's first loaded. An appropriate approach is server-side rendering, or pre-rendering. A simple workaround for a site from 2019 that I don't want to spend much time with is to add a few lines of PHP into the index file that directly queries the WordPress API for the title, description, and image of the slug in the URL.
5.  I wouldn't design the custom API endpoint the same way today. I created a summary endpoint that returned meta for all the posts, which I found helpful in designing the local storage of the service worker. It was a way around the limitation that the service worker is just caching all requests that it sees, so it will only cache specific queries. However, this isn't the most scalable solution and the real issue is that using an off-the-shelf service worker is just never going to do everything I'd want it to.

## Service worker limitations

Let's break that last point down a bit. Here is a physical architecture diagram of viewing a page of results in the archive, as it exists today:

![](https://tmdesigned.com/wp/wp-content/uploads/2025/06/pab-tmdesigned-1024x678.png)

Each HTTP request is brokered through the service worker, which allows it to cache responses and, when necessary, serve the content locally. But it has no awareness of the shape of the data or how requests relate to each other. It's elegant in one sense and dumb in another.

This means that it will cache the response for `posts?page=1` and `posts?page=2` and `posts?page=1&search=javascript` separately. There's nothing wrong with this when caching for performance, but when caching for _availability_ (i.e. offline access) it doesn't do much for the user.

If we really wanted to allow a good offline experience that included fetching results, I think we'd want to bring some of the searching logic down into the service worker (or application) layer.

### Duplicated state

And while we have this nice architecture diagram, let me point out that there is a duplication of state. In fact, the state of posts exists in 3 places: in the WordPress backend, in the service worker cache, and in the Vuex state store (which uses rxjs). If we brought some of the data logic into the service worker, I'd also want to get rid of the Vue store. It'd be a simpler design with less potential for consistency issues and bugs in general.

## Updated site

If you view the site now, you shouldn't actually see these issues. :)
