---
layout: post
title: "NTLM and Proxying, Why Not"
category: 
tags: []
---

Our build times are pretty ridiculous.

I mean, for certain builds in our project the build times are okay. But the big one, the regression build, that one takes somewhere between 3 and 4 hours. You're getting one, maybe two runs of that per workday.

BETWEEN THREE AND FOUR HOURS.

Did you know Google keeps their build times in the picoseconds? Imagine the amount of time they must've spent engineering their infrastrucure to make that happen. That's an incredible amount of work to go through, considering I just made up that number.

Anyway, the reasons our build time is out of control for that project are threefold:

8. Selenium is kinda slow
8. Selenium WebDriver is kinda slow
8. Selenium WebDriver is kinda slow with iFrames

These three points are what drove me to write the [NTLM Proxy](https://github.com/mike-rogers/NtlmProxy).

But, I'm getting ahead of myself.

## The Problem

The problem begins, as it does most places, with Windows Authentication in IIS.

See, not a lot of FOSSwares support Windows Authentication (which uses a protocol called NTLM. Yes, *that* "NT"). The FOSS I'm eyeing in particular is [Phantom.JS](http://phantomjs.org/), which is a headless webstack used for testing (and probably other things). I've heard you can get speed increases up to 400% by switching from a Selenium Firefox WebDriver to the PhantomJS version.

That's still, like, 45-60 minutes per run, but it's a start!

Regardless, PhantomJS doesn't support NTLM, so I wrote this proxy thing.

## This Proxy Thing

So inside your test code you would apply something like this whenever you were fetching a URL:

{% highlight csharp %}
using (var proxy = new NtlmProxy(new Uri("http://localhost:8081/"), 3999))
{
    webDriver.Navigate().GoToUrl("http://localhost:3999/some/page.html");

    // Exercise page.html's acceptance tests
}
{% endhighlight %}

This of course passes in the credentials of the user running the test, which may not be ideal. To use a different user, check out [SimpleImpersonation](https://github.com/mj1856/SimpleImpersonation). Using this nice little package, adding impersonation to the above code looks like this:

{% highlight csharp %}
using (var proxy = new NtlmProxy(new Uri("http://localhost:8081/"), 3999))
using (Impersonation.LogonUser(domain, username, password, LogonType.Interactive))
{
    webDriver.Navigate().GoToUrl("http://localhost:3999/some/page.html");

    // Exercise page.html's acceptance tests
}
{% endhighlight %}

## The Outcome

"Cool," you may say, while admiring my beard. "You must be using this to great effect!"

Well, no, not exactly. Turns out PhantomJS chokes on iFrames. Chokes just like Guy Sportserson choked on that recent upset against that underdog team in that sports everyone watched.

Maybe someday someone will find use for this little library. Me, I eagerly await the day. I tend to stare at the GitHub 'followers' number for hours on end, because how else am I going to kill time waiting for this build to finish?
