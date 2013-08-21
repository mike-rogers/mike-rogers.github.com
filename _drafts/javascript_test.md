---
layout: post
title: "Coding JavaScript Can Almost Be Made Bearable"
category: 
tags: []
---
{% include JB/setup %}

## JavaScript? More like... NOT... vaScript
So listen. I'm not a huge fan of JavaScript. I dislike the lack of namespaces, the lack of a decent (for certain values of "decent") standard library, the general wonkiness of the `this` keyword, the way expressions can fail silently, bizarre scoping rules, and the general lack of safety I feel when I personally code in it.

But not anymore!

Well, I mean, all the points but the last one are still valid. But thanks to **INTERNET LEARNING™** I now feel more prepared to write solid, well structured code.

<p class="aside"><strong>Aside</strong>: Though a lot of this post can be applied to node.js, it totally shouldn't be. Using node.js has been linked to low glial cell counts in field mice<sup class="citation">[<span>citation needed</span>]</sup>.</p>

## The Missing Link

For me, all it took was a way to run tests within the browser.

There are a few different testing frameworks that run in a browser. Of those, I checked out:

* [Jasmine](http://pivotal.github.io/jasmine/) ([GitHub](https://github.com/pivotal/jasmine))
* [Mocha](http://visionmedia.github.io/mocha/) ([GitHub](https://github.com/visionmedia/mocha))

<p class="aside"><strong>Aside</strong>: When researching JavaScript testing frameworks you should bear in mind that a spouse may be watching you and ask "who is 'Jasmine' and why do you have so many tabs open about her?". Your spouse may or may not appreciate your need for JavaScript testing frameworks.</p>

The two frameworks each had their plusses and minuses. I've created a handy table to outline why I chose Mocha over Jasmine completely independently and without any input from my wife.

| Question | Jasmine | Mocha |
| - | - | - |
| Has a decent DSL for describing tests | Yes | Yes |
| Has `before` and `after` hooks per test | Yes | Yes |
| Has `before` and `after` hooks per group of tests | No | Yes |
| Has expressive assertion DSL | Yes | No |
| Has ANY assertion DSL | Uh, yes? | STILL NO |
| Wow. Like, *no* `assert` function? | I do. | :-( |
| Has PLUGGABLE assertion DSL? | No | YES! That I **DO** have! |
| But seriously, no assertions by default? | Well, **I** do... | :-( |
| All right, how about test doubles? | Got those! | Well... |
| *Seriously*? No test doubles either? | :-D | Well... |
| Is it at least simple to integrate into a browser? | Of course! | Define "simple" |
| ... SIMPLE. You know, "not difficult"? | Look, he's sweating! | A few lines, yeah, but order counts! |
| Hmmm. Well, will my wife approve? | No. | She **loves** mochas! |

You can see why Mocha is the clear winner. *cough*.

I genuinely like Mocha's extensibility. Despite the lack of `assert` function you can get something working with an extra line of code. You can choose from a few [pre-existing assertion DSLs](http://visionmedia.github.io/mocha/#assertions) as well. For reference, here's the function I'm using:

{% highlight javascript %}
var assert = function(passed, message) {
    /* fill this in */
};
{% endhighlight %}

## Mocha, you say? What about test doubles?

Mocha integrates pretty well with a project called [Sinon.JS](http://sinonjs.org) ([GitHub](https://github.com/cjohansen/Sinon.JS)). You can do everything in Sinon that you can do with Jasmine's test doubles, and Sinon is slightly more friendly. I feel like the tests come out looking nicer, too.

