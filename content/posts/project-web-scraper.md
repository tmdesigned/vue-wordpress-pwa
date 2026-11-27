---
title: "Developing a PHP based web scraper"
slug: "project-web-scraper"
date: "2017-10-20"
excerpt: "Let's say a local-based online auction service provides no search capability across separate inventories of 30-200 items each. To address this for my own use, and as a practical development exercise while on paternity leave, I created a PHP"
image: "/img/uploads/2017/10/scraper.jpg"
tags:
  - "JavaScript"
  - "PHP"
draft: false
---
Let's say a local-based online auction service provides no search capability across separate inventories of 30-200 items each. To address this for my own use, and as a practical development exercise while on paternity leave, I created a PHP powered web scraper to access the publicly available information and consolidate it into a searchable and easy-to-use database. While I only accessed publicly available information, I did not want to take advantage of their bandwidth. I implemented a local caching solution to reduce queries (to below-normal-web-browsing rates), and chose not to pull images from their CDN. The result is simply a single, searchable database of what was previously separate pages. The benefit, however, is drastically reduced searching time. The source website uses a JSON data source for the listing of _auctions_, but not of _items_. This made it easy to get a list of the auctions to poll, but not to actually scrape them. To do the latter, I had to actually scrape the DOMs. Scraping in this manner is liable to break at the slightest update of the source site, but other than using regex patterns as robustly as possible there was no alternative. I wrote the PHP portion in an object oriented fashion. A "scraper" class handles the overall action and stores resulting "auctions". Each auction is made up of some meta-data (i.e. end-time) and in turn stores "items". The interactivity of the page (AJAX calls and searching) is handled via JavaScript. In separate posts, I write a few about interesting lessons gleaned from this project, including [multi-term keyword searching](https://www.tmdesigned.com/multiple-word-javascript-searching/), the advantages of CURL requests, and $\_SESSION caching. **[The full source of this project is available on GitHub.](https://github.com/tmdesigned/FTA-Scraper)**
