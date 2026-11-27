---
title: "StackOverflow Answer: React render <img> tag"
slug: "stackoverflow-answer-react-render-tag"
date: "2020-02-13"
excerpt: "## Original question: [React render tag](http://StackOverflow.com/q/60197402) * * * ## My answer: ``` ReactDOM.render( Icon , document.getElementById(\"icon_tip_div\")); ``` You don't put content in an `img`, even just with normal HTML."
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React render  tag](http://StackOverflow.com/q/60197402)

* * *

## My answer:

```
ReactDOM.render(<div className="divcss5">
   <img src={'/auto_merge_deployment.png'}
         alt="Auto Merge Deployment"
         align="bottom"
         id="auto_merge_deployment"
         style={style} />
    <br></br>
    <p><i className="fa fa-spinner fa-spin fa-3x fa-fw"
           style={{fontSize: "1.73em"}}
    ></i>Icon</p>
</div>, document.getElementById("icon_tip_div"));
```

You don't put content in an `img`, even just with normal HTML.
