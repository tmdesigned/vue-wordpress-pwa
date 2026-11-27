---
title: "Wordpress Answer: Filter post content in REST API"
slug: "wordpress-answer-filter-post-content-in-rest-api"
date: "2018-09-15"
excerpt: "## Original question: [Filter post content in REST API](http://Wordpress.StackExchange.com/q/314285) * * * ## My answer: I am trying to allow a plugin to modify the rendered content of posts prior to it being rendered for the WP API, or at "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Filter post content in REST API](http://Wordpress.StackExchange.com/q/314285)

* * *

## My answer:

I am trying to allow a plugin to modify the rendered content of posts prior to it being rendered for the WP API, or at least save it as a separate property on that JSON response.

For instance, imagine a plugin that changes the content of a post from

> Here is some content : foo

to

> Here is some content : bar

It's setup to use the the\_post filter to make its modifications for the frontend. But the REST api is unaffected. I have tried using the rest\_prepare\_post filter but it's (a) apparently a bad practice to modify the rendered content directly, so I'd put it as an additional property? and (b) difficult to work with -- if I so much as try to assign $data->$data\['content'\]\['rendered'\] to a variable I get the message that I am trying to convert a WP Rest response object to a string. Yet if I output that same variable to my error log, it works fine.

```
add_filter( 'rest_prepare_post', array( __CLASS__, 'beforeFilterRest' ), 0, 2 );

public static function beforeFilterRest( $data, $post ){

            $old_rendered_content = $data->$data['content']['rendered'];
            $data->$data['content']['rendered'] = preg_replace_callback(
                "/s*<pre(?:lang=["']([w-]+)[""']|line=[""'](d*)[""']|escaped=[""'](true|false)?[""']|highlight=[""']((?:d+[
```
