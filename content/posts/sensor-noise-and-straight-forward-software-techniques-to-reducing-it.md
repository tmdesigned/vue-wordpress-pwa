---
title: "Part 1: Sensor noise and straight-forward software techniques to reducing it"
slug: "sensor-noise-and-straight-forward-software-techniques-to-reducing-it"
date: "2022-07-13"
excerpt: "Imagine a municipal stormwater system, and you want to know the water depth. You add a floating depth sensor (not too different from a toilet tank..), but it's heavily affected by the churning water. You try an ultrasonic sensor that reflec"
image: "/img/uploads/2022/07/DepthChartBlogPart1.png"
tags:
draft: false
---
Imagine a municipal stormwater system, and you want to know the water depth. You add a floating depth sensor (not too different from a toilet tank..), but it's heavily affected by the churning water. You try an ultrasonic sensor that reflects sound waves off a wide area of the water, but find it's less accurate the lower the water depth is. When you look at a graph of the data from both sensors together, you get a fair idea of the water level...but the separate, erratic readings are hard to work with and it's difficult to see if the water level is rising, falling, or just turbulent.

This case study is explored in my 2 part series on reducing sensor noise with software techniques. [Losant](https://www.linkedin.com/company/losant/) just published part 1 and part 2 comes tomorrow.

This first part walks through some simple approaches to smoothing out the unsteady sensor readings, and looks at deriving trends without getting misled by insignificant variations. The 2nd part will describe using Kalman filters to achieve the same goals and more, from a more probabilistic approach.

I hope you enjoy it!

[https://www.losant.com/blog/sensor-noise-and-straight-forward-software-techniques-to-reduce-it](https://www.losant.com/blog/sensor-noise-and-straight-forward-software-techniques-to-reduce-it)
