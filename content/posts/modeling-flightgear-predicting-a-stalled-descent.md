---
title: "Modeling FlightGear: Predicting a Stalled Descent"
slug: "modeling-flightgear-predicting-a-stalled-descent"
date: "2025-05-16"
excerpt: "As part of a my job interview last year with GTRI, I was required to create a tech talk presentation. I developed a short proof of concept project that combines flight simulation, data collection, and machine learning to predict a stalled d"
image: "/img/uploads/2025/05/image-3.png"
tags:
draft: false
---
As part of a my job interview last year with GTRI, I was required to create a tech talk presentation. I developed a short proof of concept project that combines flight simulation, data collection, and machine learning to predict a stalled descent using FlightGear. In this post, Iâ€™ll follow the basic layout of the presentation I gave that walks through the project, so...this may be a bit PowerPoint-y.

## 1\. FlightGear Intro & Data Collection

FlightGear is a powerful open-source flight simulator built for a wide range of usersâ€”researchers, educators, engineers, hobbyists, and anyone interested in flight dynamics. What makes it particularly valuable for data-driven work is its flexibility and support for real-time telemetry logging.

![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfUpoPeRikB25wI9Vv9UmXzxUHvowC1WK1g67evV7kj1Y_9ZYpMjXWFw7emxzscR0S6KmUSTs3cyZOO665qbnMXxTY-yiH4rghCPrRK0ph2PplBFr2BUHCIU3-4b8wwvOBL4PVM3i0T7rSTqTay2mN8I0JPnw=s2048?key=GwJVSz3NzV3bTypwZDWmNg)

For this project, I used:

*   **FlightGear version 2020.3.19**
*   **Flight dynamics model**: JSBSim
*   **Aircraft**: Beechcraft 1900D (a 19-passenger twin-engine turboprop)
*   **Starting point**: Cincinnati/Northern Kentucky International Airport (CVG)

FlightGear allows users to define a configuration XML file at launch to control what telemetry is collected, the logging frequency, and the output format. I configured the simulator to log key flight parametersâ€”including latitude, longitude, altitude, roll, pitch, heading, and airspeedâ€”at a 10ms interval.

These logs are part of FlightGearâ€™s internal property tree and can be streamed to a CSV file. This data formed the basis for the analysis and modeling work that followed.

![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdHiIwbfFh1waVQL7JVzdPfKOg6vT9SxTohEP6urLdAqEAcsGSk0PXrLzUf_wwJTd2keb8XUimENYwjJTX32dSfTJ5w4dA8wmPc97sukoqXqOxS-ty18ZoWjXkDKslM5rMaIhN5Tw9Wph4xl1NTRi35aDIWL1A=s2048?key=GwJVSz3NzV3bTypwZDWmNg)

## 2\. Visualizing the Flight Path

Once the data was collected, the next step was to load it into a Python environment for inspection and visualization. I used a Jupyter notebook (running locally or in Google Colab) and processed the telemetry using **Pandas**.

In the 3d plot below you are seeing the actual path of the plane in 3d real space. Note that the altitude - Z - is scaled differently from the X and Y. Planes fly relatively close to the earth. This is an embarrassingly awful flight that in no way correlates to a real one -- it was intentionally chaotic and designed to contain multiple stalls.

![](/img/uploads/2025/05/image-4.png)

For visualizing flight paths and behavior over time, **Plotly** provided a convenient way to build interactive charts that made patternsâ€”such as altitude changes and trajectory deviationsâ€”easy to interpret.

This initial visual inspection helped verify data quality, assess the completeness of each flight log, and establish a sense of how stall events appear in the raw data. It also provided early hints at irregularities in the logging interval, which became a key issue later.

## 3\. Data Preprocessing

Although I specified a 10ms logging interval, the actual output was far from consistent. For example, in a test flight from CVG to Dayton (DAY), the latency varied significantly:

*   Minimum: 0.0s
*   Maximum: 0.81s
*   Mean: ~0.0099s
*   Standard deviation: ~0.0121s

This kind of irregularity matters because many machine learning modelsâ€”including recurrent neural networks (RNNs)â€”assume uniform time steps. Irregular intervals can lead to misalignment in temporal sequences, reduce model performance, and introduce misleading correlations.

![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfLBhS0JMKmLe3qRXQ89ECOFqbe_K4YBW--GJUuKdAjf8-ir9hZFMRDtHNkGHqif-dXi9mRp2XZiyWjn1kgXp8E-J-Kzs4qdUpao11hB0p8fDRGGmqRoL-r2tsU2w0IJNozSD6EC0F2oGwFCB61hEZjCOyxAw=s2048?key=GwJVSz3NzV3bTypwZDWmNg)

I used several strategies to mitigate this:

### A. Improve Logging Interval

Reducing the logging interval helped the simulator to sample more consistently, but with the obvious tradeoff of less data resolution.

### B. Reduce Resource Demand

Running the simulator at lower resolution (e.g., 800x600), disabling visual effects, and minimizing rendering quality helped improve performance and reduce variability in logging.

### C. Preprocess Data

For the logged data, I ended up using techniques like forward-filling and interpolation to standardize time intervals. These helped smooth over irregularities and maintain the temporal integrity of the data. Preprocessing data is normal, but obviously less ideal as it can bias and subtly alter the data set.

In the long term, modifying FlightGearâ€™s source code could provide more robust telemetry handling. I dove into the source code a bit and found both an easy fix (removing "catch up" entries) and a more important long term fix (using a multithreaded logging system that separates data collection from rendering and other simulator processes).

## 4\. Training a Stall Predictor

The core goal of this project was to predict when a flight was entering a **stalled descent**. A stall occurs when the aircraftâ€™s angle of attack exceeds a critical limit, causing a loss of lift. Itâ€™s not directly tied to speedâ€”rather, it depends on the combination of speed and the angle required to maintain lift. As the aircraft slows down, it needs a higher angle of attack, and thatâ€™s when stalls can happen.

![](/img/uploads/2025/05/image.png)

To build a predictor, I labeled sequences of data that showed clear signs of stall behavior. The plotly graphs made these rather obvious. I then trained a recurrent model (in TensorFlow) to detect these patterns over time.

At this point I have already standardized the data, which I've described above. I also adjusted the scale a bit.

![](/img/uploads/2025/05/image-3.png)

Note here that the labeling had two parts: first, the actual stall events (red), and second the time leading up to a stall (yellow). To help automatically identify the stalling events I used the delta in vertical speed. Then I label the previous seconds as pre-stall.

```
def label_prestall_by_vertical_speed(df):
    df = df.copy()

    # Label 'stall' events
    df['altitude_rolling_avg'] = df['altitude'].rolling(window=10).mean()
    df['vertical_speed'] = df['altitude_rolling_avg'].diff() * 100 * 60  # Change per second
    df['vertical_speed'].fillna(0, inplace=True)
    df['stall'] = df['vertical_speed'] < -4000

    # Shift upwards 15 seconds for 'prestall'
    df['prestall'] = df['stall'].shift(-1500)
    df['prestall'].fillna(False, inplace=True)
    df['prestall'] = df['prestall'] & ~df['stall']

    return df
```

I also needed to break the flight up into sequences:

```
def build_sequences(df, label_col=None):
    num_sequences = len(df) - sequence_length
    num_features = len(feature_columns)

    # Preallocate memory (standard array appending is very slow here)
    features = np.zeros((num_sequences, sequence_length, num_features), dtype=np.float32)
    labels = np.zeros(num_sequences, dtype=np.float32) if label_col else None

    for i in range(num_sequences):
        features[i] = df[feature_columns].iloc[i:i + sequence_length].values

        if label_col:
            labels[i] = df[label_col].iloc[i + sequence_length]

    return (features, labels) if label_col else features
```

And of course I need to actually build the model. I used TensorFlow and based on some reading I did (listed at bottom) I used LSTM - long short term memory - layers.

```
def build_model(X_train):
    model = Sequential()
    model.add(LSTM(25, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(LSTM(25, return_sequences=False))
    model.add(Dense(1, activation='sigmoid'))
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model
```

The training set was small but sufficient to demonstrate proof-of-concept performance. There are some obvious limitations which I'll cover in a bit. But after training the model on the training set and applying it to the test set, we have results. Almost surely overfit to the data here, but that's going to be hard to avoid with a small sample set.

```
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 lstm (LSTM)                 (None, 1000, 25)          3000      
                                                                 
 lstm_1 (LSTM)               (None, 25)                5100      
                                                                 
 dense (Dense)               (None, 1)                 26        
                                                                 
=================================================================
Total params: 8126 (31.74 KB)
Trainable params: 8126 (31.74 KB)
Non-trainable params: 0 (0.00 Byte)
_________________________________________________________________

2244/2244 [==============================] - 125s 54ms/step - loss: 0.0913 - accuracy: 0.9731 - val_loss: 0.0636 - val_accuracy: 0.9825
<keras.src.callbacks.History at 0x7cf7389954b0>
```

I also apply the trained model to a new flight to see how it does:

![](/img/uploads/2025/05/image-5.png)

Not bad! Here the trained model correctly identifies 2 pre-stall events without any pre-labelling of any kind.

## 5\. Real-Time Integration with FlightGear

Another goal might be to integrate the stall predictor back into the simulator to support real-time alerts during flight. FlightGearâ€™s flexible architecture makes this plausible. I created a lightweight Python script that could monitor ongoing telemetry, run inference using the trained model, and issue a warning if a stall pattern is detected.

![](/img/uploads/2025/05/image-2.png)

That said, there are a few technical challenges:

*   **Latency and sync**: Live integration would need tight timing coordination between the simulator and the inference system.
*   **Telemetry frequency**: Ensuring that live data is sampled consistently (same issue as before).
*   **Model optimization**: The model needs to be small and fast enough to run in real time without slowing down the simulation.

This type of integration could be useful not just for training pilots but also as part of prototyping smarter flight control systems or assistive safety tools.

Here is a video of this running on a live flight. There is an obvious induced stall that is correctly predicted around 3:15.

https://youtu.be/55Ve0gVw7uk

## Looking Ahead

Here are a few areas I see as important next steps:

*   **Telemetry consistency**: Possibly by restructuring the logging system using a multithreaded approach.
*   **Flight model realism**: Using more sophisticated or validated aircraft models for better data.
*   **Larger, more diverse datasets**: Including different aircraft, weather conditions, and flight phases. This is almost surely the biggest flaw in this proof of concept.
*   **Model improvements**: Exploring more advanced RNN variants (like GRUs or LSTMs) and work with ML/AI specialists.
*   **Stall source variety**: Looking at different types of stall. One person I showed this PoC to remarked, "I don't know that you've created a stall predictor. I think you created an intentional-stall predictor.". That's a valid point.

* * *

## References

*   Introduction â€“ FlightGear Flight Simulator. [https://www.flightgear.org/about/](https://www.flightgear.org/about/)
*   TensorFlow. Time series forecasting. [https://www.tensorflow.org/tutorials/structured\_data/time\_series](https://www.tensorflow.org/tutorials/structured_data/time_series)
*   Weerakody, P. B., Wong, K. W., Wang, G., & Ela, W. (2021). A review of irregular time series data handling with gated recurrent neural networks. _Neurocomputing, 441_, 161â€“178.
