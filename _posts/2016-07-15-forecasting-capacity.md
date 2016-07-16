---
layout: post
title: Forecasting Capacity
category: 
tags: []
---

I'm a Scrum Master now. Please, no, hold your applause.

Our Product Owner approached me a week or two ago and asked a fairly straightforward question: _What is the team's capacity for the upcoming PSI?_

All right, let's do this.

## Understanding the question

We're doing Scrum, sure, but we're doing [SAFe](https://en.wikipedia.org/wiki/Scaled_Agile_Framework) on top of that. From the team's point of view that means little more than that our iterations are timeboxed to two-week Sprints and those Sprints are organized into four-Sprint PSIs[^1]. A natural consequence of that division of work is that we not only plan Sprints, but we also plan PSIs.

Some Scrum teams will thoroughly examine the work coming down the pipeline and assign an abstract value of relative effort called a [Story Point]({% post_url 2015-01-24-points-ungh-what-are-they-good-for %}). The work itself is organized in a bunch of User Stories (which should have some user-facing value) and the team discusses each one in turn, understanding What Needs to be Done and Why. They then decide how much effort that is, relative to another Story they've done in the past.

At some point, through a separate process, the team comes up with a Capacity, which represents How Many Points can we do in a certain timeframe.

With these two pieces in hand (the pool of estimated User Stories and the team's Capacity) planning becomes a negotiation between the team and the Product Owner: what work can we arrange, Tetris-like, into our Sprint/PSI/whatever such that we maximize the amount of Story Points we get done[^2]?

It's that "separate process" to arrive at a Capacity I want to talk about.

## Understanding why the question is perilous

"Perilous" may be too strong a word. But whatever, this is my blog, and I want to use "perilous".

Imagine the following dialog between two house painters:

Bob
{: .dialog-speaker}

Hey, how big would you say that wall is?
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

That wall way, way over there? Like, the east wall of that yellow house?
{: .dialog-spoken}

Bob
{: .dialog-speaker}

No, the west wall of the house next to it.
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

Uh, left or right?
{: .dialog-spoken}

Bob
{: .dialog-speaker}

Uh, left?
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

Ah, okay. That wall is probably 20 square meters.
{: .dialog-spoken}

Bob
{: .dialog-speaker}

... oh, right, "Jean-Baptiste", you probably use the metric system.
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

...
{: .dialog-spoken}

Bob
{: .dialog-speaker}

Okay, 20 square meters. How much paint do we need for that?
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

In gallons?
{: .dialog-spoken}

Bob
{: .dialog-speaker}

YES, GALLONS. Lowes doesn't sell paint in Newtons or whatever.
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

Um, I usually need about 3 liters for 20 square meters, and a liter is about a quart, so maybe a gallon?
{: .dialog-spoken}

Bob
{: .dialog-speaker}

One gallon. You know, if we were real instead of an analogy we could make a company called "Hommes Painters".
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

Because we're both guys and we paint houses? And because _hommes_ is French for "guys"? And it sounds like the English word "home"?
{: .dialog-spoken}

Bob
{: .dialog-speaker}

Yes, although it's odd to say out loud.
{: .dialog-spoken}

Jean-Baptiste
{: .dialog-speaker}

That is certainly an excruciatingly clever bit of wordplay you've made there.
{: .dialog-spoken}

So these two guys have:
{: .clear}

1. An imperfect grasp of the work they're doing (which house? which wall?)
1. An imperfect idea of the measurement of the work based off their imperfect understanding (20 square meters?)
1. An imperfect notion of the requisite materials based off their imperfect measurements (20m<sup>2</sup> -> 1gal?)

Assumptions on assumptions on assumptions. And I used to do this _all the time_ in software[^3]. For example, here is a very assumptive way to calculate Capacity:

* A PSI has 4 Sprints
* A Sprint has 10 days
* A developer spends about 6 hours per day developing
* Our team has 8 people on it
* A Story Point is probably about 12 hours of developer time[^4]
* We tend to pair...

So 4 Sprints x 10 days x 6 hours x 8 developers / 12 hours per point / pairing time = 80 points in a PSI, maybe. Probably. No, I feel good about that. Let's commit to a lot of work!

Wait, what about vacation? And holidays? And sick days, conferences, training... And risk? And ...

And that's just the Capacity part of Planning, not even taking into consideration the shared understanding of the work and whether our point values are at all representative of reality.

## A better way. Like, way, way better

Why look forward when we can look _backward_?

We know what we have done in previous PSIs. I mean, like, that's recorded history. That's a thing we can see and _know_ as well as any fact. None of it is speculative. We _know_ the size of the work completed as we _know_ how long it took. And as long as our assumption about the shape of our historical data is reasonable[^5] we can forecast that work going forward. At least at that point we'll only be making _one_ assumption instead of, like, _three_.

So let's do some math! Or "maths", since the dialog above let us stretch our international muscles.

The good people at [Focused Objective](http://focusedobjective.com/) have some wonderful tools for estimating and forecasting. For the purposes of estimating PSI Capacity I chose to use their [Multiple Team Throughput Forecasting Tool](https://github.com/FocusedObjective/FocusedObjective.Resources/raw/master/Spreadsheets/Multiple%20Team%20Forecaster.xlsx), which is exceptionally straightforward:

1. Open the 'Throughput History Data' worksheet
1. Pick a column (or add your own). I chose column 'A' ("Team 1")
1. Delete all the data for that column
1. Add your own throughput data (which you get from work you've already done. That data is recorded somewhere, right? _Right_?). Simply, "how many things did you complete in iteration _n_", per row
1. When finished, open the 'Team Selection and Forecast' worksheet
1. Select your team ("Team 1") from the dropdown in E5
1. Read the results

The workbook itself is very easy to read (in my opinion), with lots of good instructions and descriptions of what you're doing and why.

Okay, back to the Product Owner!

## Back to the Product Owner!

So the PO and I sat down to talk about the results of the estimation workbook. It was actually pretty in-line with a heuristic he had been using previously. He recorded our team's PSI Capacity in whatever flesh-bound tome POs use to keep track of such things and we all went about our merry ways.

## So what changed?

Everything. Except the outcome.

**Next to no time was spent generating a reasonable estimate**. We're cutting our stories "similarly small", so [the math just kind of works out](http://martinfowler.com/bliki/StoryCounting.html). We don't have to understand as a team every piece of work for the next eight weeks in order to come up with a reasonable plan. So instead we don't estimate the work (which takes a lot of team time); we calculate Capacity from historical data and fill it with a number of similarly sized stories.

**The estimate was reproducible**. "Traditional" estimation (to me) has always seemed like a highly personal, experience-driven process. I, personally, look at a piece of work and, based on my understanding, come up with an amount of time it will take, plus or minus, with some buffer dependent on the risk and complexity of the work. Someone else goes through (I assume) something similar and comes up with a different number. I would be willing to wager I would give different estimates for the exact same work in a blind test. Contrast that with the estimate calculated from work completed. It will always be reproducible with the same inputs[^6].

**The estimate was built on the shoulders of giants**. Unlike the highly personal process I tend to use, the spreadsheet above is built on a bunch of math and research done by people way, way smarter than I am. I've read the studies and the whitepapers and the source code for the tools I use, and I understand them -- but I didn't come up with them. This research-based, higher caliber of estimation has been made accessible to anyone who can fill a few numbers into Excel.

**I feel more comfortable arguing this estimate**. As a typical developer I dislike any form of confrontation, real or imagined. I _love_ having estimates based on real data using methods created by experts. Instead of "in my opinion, this work nobody has ever done before will take exactly 6 weeks" I get to say "according to the math we can do _this_ amount of work in 6 weeks with a confidence interval of 90%". If I need to justify, I can point to white papers, research, Wikipedia articles (that I haven't edited to make myself right, for once) and I can walk someone through the math. That makes me more confident than an opinion based on experience, because my experience will always be different than someone else's -- but the math will be the same.

## So where from here?

Well, for me it's going to be a matter of talking to people to understand how well this idea holds up under scrutiny. Specifically I'd like to see someone "doing this correctly"[^7] and failing to get to a reasonable value for their estimated Capacity.

Further I'd like to write a post on _why_ this approach works, the math and research behind it. If that's something that would interest you please [send me a message of encouragement](https://twitter.com/mikerogers_). I also accept donuts.

_Even further_ I encourage you to try the spreadsheet out, if just to see the pretty graphs and numbers change when you start adding your teams' cycle times to the mix.

To wrap things up, here is an unrelated picture that I think is a capybara dressed up as Pocahontas:

<img src="{{ site.url }}/assets/images/pocabara.jpg" height="300" style="display: block; margin: 0 auto">

---

[^1]: PSI stands for "Potentially Shippable Increment" in the literature, but I assure you the actual definition of those words has no bearing on what we're doing. A PSI is really just "four Sprints" to us.
[^2]: It's actually a little more complicated than that, because the Product Owner is supposed to _prioritize_ all the work in the pipeline according to some metric (usually something non-quantifiable like "business value"). But if a team can do Stories prioritized 1st, 2nd, and 4th in a Sprint (because the 3rd is too big and the 4th is pretty small) a Product Owner may decide that's better than just getting the 1st and 2nd done.
[^3]: To quote the late, great Mitch Hedberg: "I still do, but I used to, too"
[^4]: This is bad. You _can not_ convert Story Points into hours, ever. EVER. NEVER DO THIS.
[^5]: If you want to make sure that assumption is reasonable I highly recommend reading [this whitepaper](http://focusedobjective.com/wp-content/uploads/2014/09/The-Economic-Impact-of-Software-Development-Process-Choice-Cycle-time-Analysis-and-Monte-Carlo-Simulation-Results.pdf).
[^6]: Within a tolerance. The calculations use Monte Carlo forecasting, which means there's a random component that tends to wash out in the end, but sometimes you might get ever-so-slightly different numbers (22 stories instead of 23, one time out of a hundred).
[^7]: There are a lot of assumptions behind the math, so if you aren't adjusting for those assumptions the result might not hold water. If I end up writing a post on the math behind the technique I'll be covering those assumptions. And the math.
