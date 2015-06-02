---
layout: post
title: "The Snowman Experiment"
category: 
tags: []
---

I've always been interested in build lights. The idea that a team can, at a glance, understand the state of their continuous integration server (and know that everyone else has that shared understanding[^1]) is extremely powerful to me.

My team's setup was simple: if the build was broken, the light was red. Otherwise, the light was green.

How can we iterate on that?

## The experiment

We recognized that there were three separate questions we were asking every time we interfaced with our continuous integration server:

1. Can we push to <kbd>base application</kbd>?
1. Can we push to <kbd>our application</kbd>?
1. Should we stop what we're working on to fix a build break?

Those seem to be pretty simple questions that can be addressed by a system of three build lights. So let's iterate!



----

[^1]: Shared understanding is extraordinarily powerful. You yourself _knowing_ that someone else _knows_ something can change the state of a system. For a neat thought experiment, see [the hardest logic puzzle in the world](http://www.xkcd.com/blue_eyes.html).
