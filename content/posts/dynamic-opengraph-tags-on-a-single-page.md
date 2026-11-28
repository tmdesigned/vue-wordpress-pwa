---
title: "Dynamic meta tags on a single page"
slug: "dynamic-opengraph-tags-on-a-single-page"
date: "2017-04-08"
excerpt: "Setting up good meta tags is important if you expect your visitors to share your content on Facebook and other social media, and if your site is actively encouraging such sharing (i.e. providing share links) then configuring these tags is a"
image: "/img/uploads/2017/04/opengraph.jpg"
tags:
  - "PHP"
  - "HTML5 / CSS3"
draft: false
---
Setting up good meta tags is important if you expect your visitors to share your content on Facebook and other social media, and if your site is actively encouraging such sharing (i.e. providing share links) then configuring these tags is an absolute must. If your content is separated cleanly into pages it is generally not a problem to do this. Each page's meta tags will relate directly to the content. However, if you have multiple pieces of content on a single page, each with its own share button, you'll run into problems. With AJAX content this is actually a common scenario. What Open Graph tags should be on such a page? (Remember: if it's just a list _linking_ to content, you would have each button send the item's individual URL and put the respective meta tags there, instead.) Assuming you want each share button to show information about that particular item on social media, and not just information about the list as a whole, you'll have two hurdles to overcome:

1.  A page can have only one set of meta tags
2.  Meta tags have to be present at very beginning of the page load (i.e. before JavaSript runs)

Each of these hurdles has a solution, and they work well together. To handle the first, we can simulate separate URLs for each item with URL parameters. We would set our share buttons to pass along these URLs. For instance:

```html
<a href="http://www.facebook.com/sharer.php?u=http://www.yourdomain.com/recipebox/?openrecipe=Pulled%20Pork%20Sandwiches" target="_blank">Share on Facebook</a>
```

(You'd probably want that to open up a popup instead, or to use Facebook's actual button generator instead of their simplified sharer.php code.) Social media sites like Facebook will treat URLs like this as separate pages altogether. We can then adjust the meta tags based on the URL, and we'll effectively have one page masquerading as many. The second challenge seems trickier than it really is. By the time client-side scripting is running, it's already too late to set the meta tags. Even if it weren't, some web scrapers won't execute it anyways. So the dynamic setup of our meta tags must already be complete by the time the page is served. For PHP, it might look something like this:

```php
if(isset($_GET['openrecipe'])){
  // prevent SQL injection since variable coming from URL
  $query = mysql_real_escape_string($_GET['openrecipe']);

  //Query database for specific recipe content based on URL parameter
  $results_raw = mysql_query("SELECT * FROM recipes WHERE (`title` LIKE '%".$query."%')") or die(mysql_error());

  //mysql_fetch_array returns first row if not in loop
  $results = mysql_fetch_array($results_raw);

  //Grab this recipe's important data for meta tags
  $thumbnail = $results['featured_image'];
  $title = $results['title'];
  $desc = $results['summary'];

  //Output the dynamic meta content
  echo '<meta property="og:title" content="' . $title . ' - My Recipe Site">';
  echo '<meta property="og:image" content="' . $thumbnail . '">';
  echo '<meta property="og:description" content="' . $desc . '">';
}
```

Later in our code, we would want to use the same URL parameter to show that particular item to the user, as well. If you haven't figured it out by now, we've effectively implementing a permalink system for dynamic content. The end result is that with the URL parameter, both social media crawlers and your end users are directly served particular content on a single, dynamic page.
