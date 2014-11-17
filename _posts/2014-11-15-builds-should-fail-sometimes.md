---
layout: post
title: "Builds should fail sometimes"
category: 
tags: []
---

## Inception: Mike is dumb

"Well, you don't want your builds to succeed __all__ the time..."

I remember hearing that for the first time a year or two ago and thinking to myself "that's probably one of those counter-intuitive truths that make a lot of sense in the context of Agile. This guy is probably some kind of Process Jedi. Best not to question him and simply internalize that nugget of wisdom."

This post might as well be called "why Mike is stupid". 

The value of failing builds was recently solidified for me thanks to a simple comment by [Ryan Clarke](https://twitter.com/RyanSClarke) in an SEP book club. I don't remember exactly what he said (sorry, Ryan!), but it was the catalyst for an epiphany on my part (thanks, Ryan!).

The output of the epiphany was... a _thought experiment_ (dramatic music).

## Thought experiment: perfect builds

In this thought experiment we'll assume the consequence of a failing build is the destruction of mankind. Let us further assume that you have diligently broken up your stories into chunks that take about "one smerg" to finish, where "smerg" is an arbitrary unit of time.

All right, so you've finished development on your first story. That build better not break, or there won't even be enough people to create a cautionary movie to be run as a Lifetime Movie of the Week.

So we start tacking process at the end of development:

* Several different code reviews (1 smerg per review, 4 reviews)
* Several different environments that mimic the build environment as closely as possible (1.5 smergs per environment, 4 environments)
* Several signoffs (0.5 smergs per signoff, 4 signoffs)
* A dedicated Merge Lieutenant (1 smerg)
* Finally entrusting the actual push to a grizzled ex-military Integration Engineer who doesn't smoke cigars as much as he chews them, who then presses the button to send the code into the repository to be consumed by the build machine (0.01 smergs. His recklessness is why he was discharged in the first place)

All told, we've got a 1-smerg story that took 14.01 smergs.

Honestly, I'd be comfortable if that ballooned to 25 smergs, or 100 smergs. I'm pretty fond of existence. They serve waffles there sometimes, which is pretty baller.

## Thought experiment part two: slightly less consequence

Same process, same story breakdown, but now the consequence for a failing build is: you have to stop working for 0.8 smergs to fix the build. We also separate the 200-story backlog into two 100-story piles: one for Team A, one for Team B.

Team A has internalized the edict "builds must not break". They churn through their 100-story backlog at a rate of 14.01 smergs per story, the build light ever green, ending at 1401 total smergs. Because the build never fails, they are happy that they are Doing Right, and no questions are asked.

Team B has a single person who understands the value of the failing build. After the first iteration of work (let's say 5 stories, or 65.05 smergs) she noticed the build has never broken.

"The build has been green for five stories. Should we remove some process?" The others on Team B agree to back down to 1 code review but keep everything else the same.

Five stories later (50.05 smergs) the build light still has never been red. The team decides that maybe they only need one mimic environment and one sign-off.

Five stories later (25.05 smergs) the build light _still_ has never been red. The team decides that maybe the mimic environments and signoffs can be forgotten altogether, and let's get rid of the Merge Lieutenant. Also the Integration Engineer, because he's starting to frighten the interns.

Five stories later (10 smergs) the build has failed 10 times (8 smergs). The team has a retrospective to discuss causes of failure, and it's determined that messy merges are wreaking havoc now that they're moving a little more quickly. They bring back in the Merge Lieutenant.

Five stories later (15 smergs) the build has failed 2 times (1.6 smergs). The team considers the process at a 'sweet spot' and continues forward at a rate of 16.6 smergs per 5 stories.

At the end of their 100 stories, Teams A and B have taken:

* Team A: 100 stories, 1401 smergs
* Team B: 100 stories, 440.35 smergs

That's a lot fewer smergs.

## Thesis statement (better late than never)

**Failure rate can be a wonderful barometer if the consequences of failure aren't too great**.

In this case, the build failure rate indicated to Team B that they could safely shed some process and start delivering more quickly.

## But but but process! And regulation!

Yes, yes. Those are things too! Sometimes you need or otherwise require those things. We're not talking about that. We're talking about build lights never failing and why that's a missed learning opportunity.

If you've trimmed as much fat as you can while still satisfying your client's need for certain artifacts but are still never failing builds, maybe you're just awesome. Or maybe it's time to have a discussion with your client about the value of moving faster versus the value of the artifacts _in their current form_. I don't know, man. I just write words sometimes.

## In conclusion

Here are a couple of questions everyone on the team should know the answers to:

* What are the consequences of a failing build?
* If the consequences of a failing build are "too high", how else can we measure 'enough process'?

And a good topic for further discussion:

* Where else are we not learning because we don't allow ourselves to fail?

Process Jedi, man. They always know what's up.
