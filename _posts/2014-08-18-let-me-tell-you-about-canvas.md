---
layout: post
title: Let me tell you about canvas...
category: 
tags: []
---

    <hate>

I am a hater.

My hatred is versatile. I can hate groups of things or individual things. I can hate like a strong cheese, sharp and lingering; I can hate like buttermilk, initially sour and later you'll likely need to run to the bathroom. I can probably hate like lots of dairy products -- my hatred is [galactic](http://en.wiktionary.org/wiki/galactic).

I have [hated]({% post_url 2013-08-21-testing-in-javascript %}) on JavaScript [before]({% post_url 2014-08-04-javascript-deferred-loading-migraines-and-you %}), and those bits of hatred have brought me joy. A sort of _Hassenfreude_, if you will. Because I am petty.

But today is not about hate. It is about love. Or, at least, _less_ hate, which is pretty close to love I think.

Today is about JavaScript and the HTML5 Canvas element.

### O CANVAS MY CANVAS

You may peruse the [W3 page on the Canvas element](http://www.w3schools.com/html/html5_canvas.asp) and think to yourself, "oh goodie! Gradients! Outlined fonts! Get me that and a `blink` tag and I'll teleport my site backward 15 years!" and dismiss the `canvas` element as an anachronism, or as a medium for browser-based game development. I tell you, it's way more than that.

_You can use it to draw lines_.

Have you ever wanted to draw lines in HTML, but couldn't because HTML is so out-of-date it still refers to 'hypertext'? Have you ever used the word 'hypertext' in a sentence? "Could I please have one hypertext? Two if you got 'em," you might say. Hypertext.

Anyway, drawing lines was distasteful and usually involved `div` trickery or, before that, sacrificing all of your integrity and using `table` elements to create an unholy pile of line segments and loathing.

If you overlay your `canvas` element on top of your page, _wonderful things_ happen. For example, have you ever wanted to mimic Word 2013's in-page comments? They look like this:

![Word 2013 lookin' swank]({{ site.url }}/assets/images/canvas/sample-comments.png)

Check out [this fiddle](http://jsfiddle.net/0Lo4p76d/), which uses the `canvas` element overlay to draw lines from the comment boxes to the original text. It even allows for the dashed-to-solid-line mouseover behavior exhibited by Word. Trust me, it looks way better on decent resolutions.

The code, of course, looks terrible, because writing decent JavaScript is an exercise left to the reader.

    </hate>
