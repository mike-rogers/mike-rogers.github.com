---
layout: post
title: "JavaScript Deferred Loading, Migraines, and You"
category: 
tags: []
---

## Impetus

It all started with [this post]({% post_url 2013-08-30-fitbit-google-charts-and-you %}).

I noticed that the page would load and display the header and then stall while it loaded the Google Charting API. "I'm sure this could be improved quite easily!" I said naively. "There's no way this problem is super complicated because JavaScript is terrible!"

Nngh.

## Deferred Loading of JavaScript

There are a few ways to get JavaScript to download in the background while your page continues to be rendered by the browser. I'll cover each individually in order of descending [Kummerspeck](http://en.wiktionary.org/wiki/Kummerspeck).

### The `async` keyword

The `async` keyword [in the `script` tag](http://www.w3schools.com/tags/att_script_async.asp) is a pretty decent enough approach if you don't need your scripts loaded in any particular order **and** don't have to do any special logic after the page loads.

Here's a basic example:

{% highlight html %}
<script type="text/javascript" src="whatever.js" async></script>
{% endhighlight %}

This will fire-and-forget the loading of the JavaScript. Someone somewhere on the Internet recommended that the script end with `andThenExecuteSomePageLoadLogic()` instead of having a callback on your page, but sometimes you don't have direct control of the source file you're loading.

### The DOM injection approach

Google Analytics and others use this approach to inject a `script` tag into the DOM and load the JavaScript asynchronously. The injection allows you to do more prep-work than just using the `async` keyword. Check out Google Analytic's implementation:

{% highlight html linenos %}
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'account-slug-here-lol']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
{% endhighlight %}

You can see on line 7 the creation of the HTML element, and it gets added to the DOM on line 9. The startup logic on lines 2-4 are voodoo to me.

So, the thing I was trying to load (and then execute logic on completion) was Google's Charting API, which it turns out writes directly to the DOM using (I think) `document.write`. This is slightly problematic, because if you use `document.write` after the page is done loading, the page will **go away** and be replaced by whatever you write, ending up with a blank page. Somewhat infuriating! But luckily [someone figured this out](http://stackoverflow.com/a/24980290/996184) and saved me from having a stroke.
{: .aside}

### JQuery to the rescue

I love JQuery except when I'm using it.

JQuery has a special function called `getScript` that is based on its `ajax` function. Its job is to [load a file and then execute it](http://api.jquery.com/jQuery.getScript/), which seems unremarkable, until you see that you can chain a `done` and `fail` function off the end of it, like this:

{% highlight html linenos %}
<script type="text/javascript">
  (function () {
    $.getScript("http://www.google.com/jsapi").done(function () {
      var callback = function () {
	    /* this is the thing i wanted to happen after jsapi was loaded */
        drawVisualization();
      };

      /* here, i have to include the callback property to avoid having
         the DOM rewritten. see the link to stackoverflow above. */
      google.load('visualization', '1', {packages: ['corechart'], callback: callback});
    });
  })();
</script>
{% endhighlight %}

You can see the `done` callback on line 3. The function defind on line 2 is executed after creation (line 13) and calls the `getScript` function, loading the Google Charting API. When that's done, `google.load` is called. When _that_'s done, `drawVisualization` is called and the pretty chart shows up.

## Nnngh

A word of caution: when googling around for solutions to this problem you may see references to `window.onload` or `statechange` event handlers. **Do not bite**. Solutions based on these events are not very cross-browser friendly, and I'm about 70% sure they directly cause cancer.

<s>Who would have thought making JavaScript work sanely would be so difficult?</s>
