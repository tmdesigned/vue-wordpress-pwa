---
title: "StackOverflow Answer: React Antd not able to get value from custom date picker"
slug: "stackoverflow-answer-react-antd-not-able-to-get-value-from-custom-date-picker"
date: "2020-02-02"
excerpt: "## Original question: [React Antd not able to get value from custom date picker](http://StackOverflow.com/q/60026509) * * * ## My answer: I've not used that library (antd), but looking at the docs for it, using that fieldDecorator adds two "
image: "/img/uploads/2020/11/sologo.png"
tags:
draft: false
---
## Original question: [React Antd not able to get value from custom date picker](http://StackOverflow.com/q/60026509)

* * *

## My answer:

I've not used that library (antd), but looking at the docs for it, using that fieldDecorator adds two properties to the component -- onChange and value.

```
  {getFieldDecorator("date-picker")(<CustomDatePicker />)}
```

So now imagine CustomDatePicker has those two properties. Value will be the value of the form item, and onChange is expecting to be called as the onChange handler of a form input.

However, in your CustomDatePicker component you aren't doing anything with either of those. Instead, you're tracking the value (and updating it with a handler) locally to that component with local state.

Instead, you should use those two properties:

```
 class CustomDatePicker extends React.Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <DatePicker
        value={this.props.value}
        format={this.state.isOpen ? ["MMDD", "MMDDYY"] : "MM/DD/YY"}
        placeholder=" -- Select Date --"
        disabledDate={d => d && d > moment(Date.now())}
        onOpenChange={status => {
          this.setState({ isOpen: status });
        }}
        onChange={this.props.onChange}
      />
    );
  }
}
```

If you want to do any initial value logic, or validation, you'll do that at the form-level component -- the one that is controlling the state.
