---
title: "Debouncing a controlled, validated input in React"
slug: "debouncing-a-controlled-validated-input-in-react"
date: "2020-11-10"
excerpt: "First, a review: A **controlled input** is when an input is controlled by the component logic (i.e. JavaScript) rather than the native DOM element. A **debounced action** is when we group multiple, subsequent calls and only perform the last"
image: "/img/uploads/2020/11/balls.jpeg"
tags:
  - "JavaScript"
  - "React.js"
draft: false
---
First, a review:

A **controlled input** is when an input is controlled by the component logic (i.e. JavaScript) rather than the native DOM element.

A **debounced action** is when we group multiple, subsequent calls and only perform the last one. For instance, if we are suggesting search terms to the user, we wait until they stop typing before we query the server for suggestions. (If they are typing "star wars", we don't send requests for "s", "st", "sta", "star", "star ", "star w", "star wa", "star war", and "star wars", but rather just the final, "star wars".)

And of course, a **validated input** is one which has restrictions on the value (i.e. "must be greater than 10"). This may be passive (visual identification) or active (reject input).

When we combine these behaviors, the complexity multiplies.

## Passive vs. Active validation

With passive validation, we visually indicate that an input is invalid with something like a red border. Then we prevent form submissions until all errors are corrected. This is the preferred method for simplicity.

Active validation rejects invalid input and corrects it for the user, either reverting to a previous value or 'correcting' it to an acceptable one. This might be helpful if valid inputs are difficult to know or are obscure, such as rounding or "snapping" X and Y values into alignment with a grid on a 2D canvas.

The issue is that preventing them from entering an invalid value also prevents them from entering a "temporarily invalid" value on their way to a valid one. If only multiples of 3 are valid, and they type 2, that's invalid...unless they are about type type a 7 after it (27 = 3 x 9).

## Debouncing

Adding a debounce largely corrects this issue. Slow typing aside, a reasonable debounce value of around 700ms allows users to finish typing values before the active validation kicks in.

The trick is to always immediately update the "display value" so they can see themselves typing, but validate it once they have stopped typing for long enough. If the validation passes, we update the "real value". If it doesn't, we either revert the display value to the previous value, or correct it for them and then update both the "real value" and "display value".

## Weight Example

In this example, we allow the user to enter a value in kilograms, though our logic works with grams. (We might extend this to allow other units, and we want to keep our logic simple and clean.)

The minimum allowed value we want to allow is 2000 grams, or 2kg. So, we must allow the user to type in 12kg, but reject 1kg.

### WeightForm.jsx

```javascript
import React, { useState } from "react";
import WeightInput from "./WeightInput";

const WeightForm = () => {
  const [weightInGrams, setWeightInGrams] = useState(2000);

  const updateWeight = (val) => {
    setWeightInGrams(val);
  };

  return ( /* JSX markup was lost in the WordPress export; only the script survived */ );
};

export default WeightForm;
```

### WeightInput.jsx

```javascript
import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

const WeightInput = ({ value, min, updateWeight }) => {
  const [weightInKg, setWeightInKg] = useState(0);

  useEffect(() => {
    const weightInKg = gramsToKilograms(value);
    setWeightInKg(weightInKg);
  }, [value]);

  const debouncedUpdate = useCallback(
    _.debounce((val) => updateParent(val), 600),
    []
  );

  const kilogramsToGrams = (kilograms) => kilograms * 1000;
  const gramsToKilograms = (grams) => grams / 1000;

  const updateParent = (weightInKg) => {
    let weightInG = kilogramsToGrams(weightInKg);
    if (weightInG < min) {
      weightInG = min;
    }
    updateWeight(weightInG);
    setWeightInKg(gramsToKilograms(weightInG));
  };

  const handleChange = (e) => {
    const inputWeightInKg = e.target.value;
    setWeightInKg(inputWeightInKg);
    debouncedUpdate(inputWeightInKg);
  };

  return ( /* JSX markup was lost in the WordPress export; only the script survived */ );
};

export default WeightInput;
```

We create a debounced copy of our update function "updateParent" (here using lodash), such that it is only called once the user has finished typing. In this case, we bump their value to the minimum if they have entered too small a number. In case we had to do this, we also update the local displayed value.

The debounce function uses "useCallback" to create a single instance of the function, rather than one that would be recreated every time the function rendered. If we allowed the user to select different units, we'd need to add that unit state into the dependency array so that it would be recreated whenever the unit changed (else it would have the previous unit in its closure).

[A working sandbox of this example](https://codesandbox.io/s/controled-debounced-input-2zv8m)
