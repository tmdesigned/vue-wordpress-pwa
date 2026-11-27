---
title: "Wordpress Answer: How to Parse an Array of Elements in Gutenberg Block"
slug: "wordpress-answer-how-to-parse-an-array-of-elements-in-gutenberg-block"
date: "2019-03-31"
excerpt: "## Original question: [How to Parse an Array of Elements in Gutenberg Block](http://Wordpress.StackExchange.com/q/333016) * * * ## My answer: When you set the attribute's source to children, it gives you DOM elements, i.e. including the wra"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [How to Parse an Array of Elements in Gutenberg Block](http://Wordpress.StackExchange.com/q/333016)

* * *

## My answer:

When you set the attribute's source to children, it gives you DOM elements, i.e. including the wrapping HTML and not just the inner text.

So the behavior you're seeing, which you probably already know, is the HTML elements getting nested inside of themselves. You're wrapping the contents in `<li>`, which gets wrapped in `<li>`, which could get wrapped in `<li>` again, and so on.

That part I'm pretty sure about. The solution below is my _understanding_ of how to do it, but having not yet done this type of attribute selector, _I haven't fully tested this_. That being said, I think what you are looking for is closer to:

```
attributes: {
  tabs: { 
    type: 'array',
    source: 'query',
    selector: 'ul.tabs',
    default: [],
    query: {
      val: {
        type: 'string',
        selector: 'li',
        source: 'text',
    },
  }
}
```

So we're creating an array of objects with one property, which comes from each children's text. Then in your save function, you have to specifically pull that new `val` property we just specified as coming from the inner text of the `li` selector:

```
save({attributes, className}) {
  const { tabs, newTab, content } = attributes;

  return (
    <div className={className}>
      <span className="data-drop" newtab={newTab}></span>
      <ul className="tabs">
      {tabs.map(tab => {
            return <li className="tab">{tab.val}</li>;
        })}
      </ul>          
    </div>
  );
}
```
