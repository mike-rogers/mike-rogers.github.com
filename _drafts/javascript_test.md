---
layout: post
title: "Coding JavaScript Can Almost Be Made Bearable"
category: 
tags: []
---
{% include JB/setup %}

## JavaScript? More like... NOT... vaScript
So listen. I'm not a huge fan of JavaScript. I dislike the lack of namespaces, the lack of a decent (for certain values of "decent") standard library, the general wonkiness of the `this` keyword, the way expressions can fail silently, and the general lack of safety I feel when I personally code in it.

But not anymore!

Well, I mean, all the points but the last one are still valid. But thanks to **INTERNET LEARNING™** I now feel more prepared to write solid, well structured code.

<p class="aside"><strong>Aside</strong>: Though a lot of this post can be applied to node.js, it totally shouldn't be. Using node.js has been linked to low glial cell counts in field mice<sup class="citation">[<span>citation needed</span>]</sup>.</p>

## The Missing Link

All it took was a way to run tests within the browser.

There are a couple of different testing frameworks that run in a browser. I checked out:

* Jasmine
* Mocha

<p class="aside"><strong>Aside</strong>: When researching JavaScript testing frameworks you should bear in mind that a spouse may be watching you and ask "who is 'Jasmine' and why do you have so many tabs open about her?". Your spouse may or may not appreciate your need for JavaScript testing frameworks.</p>

In the end I chose Mocha.