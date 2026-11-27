---
title: "Wordpress Answer: Thumbnail images missing in WP media library"
slug: "wordpress-answer-thumbnail-images-missing-in-wp-media-library"
date: "2019-02-13"
excerpt: "## Original question: [Thumbnail images missing in WP media library](http://Wordpress.StackExchange.com/q/328569) * * * ## My answer: Deleting the files out of the uploads folder is almost certainly the culprit here. Your theme may have cus"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Thumbnail images missing in WP media library](http://Wordpress.StackExchange.com/q/328569)

* * *

## My answer:

Deleting the files out of the uploads folder is almost certainly the culprit here. Your theme may have custom code that affects the Media Library, but since you wrote it and you don't think there is you're probably right :) So we can assume it's the uploads folder. There is a database entry per file, and if those entries were not deleted now WordPress's database and the files don't line up.

You may get a clue as to what's happening if you inspect the missing thumbnail and see what the thumbnail URL it is is looking for is. What is the URL of the thumbnail, and does that file actually exist (verify via FTP)?

I'm not sure why it would affect **new** file uploads like you say, but since you don't have a lot of uploads anyways I would recommend starting from scratch with your uploads.

If you are able to click each of those missing thumbnails and manually delete the entry, until your media library is completely empty, do it that way.

Since there may be a database issue involved, I would _personally_ suggest then going and looking in the database to make sure there aren't any leftover "attachment" type items in your wp\_posts table. There's also some post\_meta rows for each item. It would be great to know those are gone too, but that may be a little more difficult to work through if you have a lot of other posts, and they shouldn't matter if the posts are gone.

Then upload a new file and see what happens.
