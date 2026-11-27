---
title: "StackOverflow Answer: Why reorder not working after button click?"
slug: "stackoverflow-answer-why-reorder-not-working-after-button-click"
date: "2020-01-22"
excerpt: "## Original question: [Why reorder not working after button click?](http://StackOverflow.com/q/59858965) * * * ## My answer: Your parent file (App.js) has the menu data and passes it along to the child file (Header.js). What is sent, howeve"
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [Why reorder not working after button click?](http://StackOverflow.com/q/59858965)

* * *

## My answer:

Your parent file (App.js) has the menu data and passes it along to the child file (Header.js). What is sent, however, is not the original menu data, but a copy of it.

Your child file (Header.js) tries to change its value, but the original is not changed. The way React works is to continuously re-render every time there is a likely change in what would be displayed. So your change to the _copy_ of the 'open' property is lost, because a new copy is made and sent down.

What you need to do is allow the parent's copy to be modified. Generally you would do this by tracking the modifiable data in state, not as a const.

In the fork I made of your code, I kept the const but added id's to each menu item so that they can be targetted. Then I added state (useState hook) to create state based off of your const, with ability for it to be modified.

```
  const [menu, setMenu] = useState(TASK_LIST_HEADER);
  const toggleMenu = id => {
    const newMenuState = menu.map(menuItem => {
      if (menuItem.id === id) {
        menuItem.menu.open = !menuItem.menu.open;
      }
      return menuItem;
    });
    setMenu(newMenuState);
  };
```

The `toggleMenu` function takes as a parameter an id, i.e. which menu item do we want to update? Then it uses the `setMenu` part of the state hook to update the menu in state with the newly opened (or closed) menu item.

The toggleMenu function is then passed down to the child (Header) so that it can be called from there.

Working fork: [https://codesandbox.io/s/dazzling-lichterman-rgdfy](https://codesandbox.io/s/dazzling-lichterman-rgdfy)
