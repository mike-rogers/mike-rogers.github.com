---
layout: post
title: "Pointing and you: a primer"
category: 
tags: []
---

## Points

Until very recently, story points have been magic to me.

**Aside**: I find it pretty damning that a lot of the stuff I write seems to start out declaring ignorance on a fundamental aspect of software development, even though I've been paid professionally to do __exactly that__ for **ages**. Luckily I tend to nap when I think too hard, so that line of self-critical evaluation tends to short circuit rather quickly.
{: .aside}

Seriously. You pull something out of a backlog and stare at it as a team, you produce a number (sometimes) after argument (sometimes) and then you use that number to do "stuff" and make graphs. The whole thing is surrounded in ceremony, nobody likes it, and it doesn't apply directly to shoving software out the door.

If the whole thing went away we could ship a whole lot more software. I mean, we'd have no idea _when_ it would ship, but... where was I?

## Points

Oh yes, points.

Like many things in Software Engineering, I was never formally introduced to story points. Most of the explanations I got varied between "they're like effort" and "they're like complexity" on some gradient. Most seemed to understand fundamentally that you shouldn't share the point values outside the team, but few seemed to know exactly why.

So I read a bunch of Internets (approximately 5 Gores[^1] worth) and learned a few things.

## Points are an abstraction

"Duh", you might counter. As well you should. Everyone "knows" that points represent an abstraction of ... something.

It turns out that something is [unequivocally](http://www.mountaingoatsoftware.com/blog/its-effort-not-complexity) [effort](http://www.mountaingoatsoftware.com/blog/story-points-are-still-about-effort) (those are two separate links). And it answers a question I asked my tech lead nearly four years ago, which was "how do you estimate something in hours if it takes people different amounts of time to do the same work?"

It's just like those work-rate problems you may have done in middle school, turns out.

Let's start with a known thing for comparison. I have a pretty weak game when it comes to [Fizz Buzz](http://en.wikipedia.org/wiki/Fizz_buzz). I can probably do a decent implementation in about 8 hours.

[A colleague](https://twitter.com/_swanson) of mine is an absolute Fizz Buzz badass. He can knock out a solid implementation (with automated tests) deployed to Heroku in like 2 hours.

We'll say that Fizz Buzz can be implemented in 1 unit of time (or "point", if you're feeling sassy).

## Okay. Now what?

Now we're free to make stupid extrapolations, which in my experience is what people love to do with points. My work rate is 8 hours per point. My teammate is 2 hours per point. We should be able to do 25 points a week, after some assumptions, right?

Slow down there, champ! All we've done is say "this unit of work can be done in one point". Let's look at another, larger amount of work. Like, say, implement a REST endpoint in Spring MVC that touches a database backend.

I could look at the work and think "that's totally five fizzbuzzes, and should take approximately a week". In comparison, my awesome teammate does this stuff in his sleep -- but he's thinking nearly the same thing: "that's right at five fizzbuzzes and would take me a little over a day".

_We're both right that's **5 points** how cool is that_.

Now we can start collecting data!

## Data?

Yeah, this doesn't work without actual data.

Finish up a sprint or five and take a look at how many points of work you finished, on average (per sprint). That's your [velocity](http://guide.agilealliance.org/guide/velocity.html). If you're feeling adventurous you can feel free to apply this to future work, make committments on it, or even (if your backlog supports it) estimate when your project will be done.

No, go ahead and do it. Tell your manager. It'll be awesome[^2]!

Where I'm most comfortable is taking a look at the team velocity and using it **only** as a **starting point** in two discussions: estimation and retrospective.

In estimation, look at the number. It's a nice number, isn't it? It represents an average, which implies it also has a variance (since we're not machines). Does it make sense to commit to 25 points of stories given your velocity is 25? Probably not. But you can probably come reasonably close. Use the number to drive a conversation.

You could also apply the points to a larger context, if you have enough stories pointed in your backlog. "Those 8 huge features? They'll probably take about 4 to 5 sprints", you could say.

In retrospectives, look at the number of points you finished during your latest sprint. Then look at your velocity. Are they within some reasonable variance? If so, it probably doesn't even merit discussion. "We committed to 57 points but were only able to get 55!" That doesn't seem broken to me. What if trying to fix it makes things worse? [Primum non nocere](http://en.wikipedia.org/wiki/Primum_non_nocere)!

## But what about

Trying to measure something smaller? Something more granular? Within the boundary of a sprint? You probably don't want points.

In the context of a single sprint, do you want to measure whether or not you're on track? Points may make sense, they may not. Did you pull in 10 points for this sprint[^3]? If your sprints are two weeks long, that's one point per day. But if you're off by a single point, that's 10% [above the line](http://en.wikipedia.org/wiki/Burn_down_chart). Will that make you panic? It would me. _Should_ that make you panic? Probably not.

What if you have 40 points for a 2-week sprint? A burndown may make sense here. On day 3 you've completed 11 points. That's only 2.5% above the line, which I'm comfortable dismissing. Day 4 ends and you still only have 11 points. Now we're at 12.5% and it may be time for conversations.

I don't know, man. Do what makes sense for your team.

## In the end

I feel dirty after that last section. Look at all that talk about points and percentages and lines and progress. That's all meta -- orthogonal to Getting Things Done. But at some level you have to meta if you want to have a shot at guessing _when_ Things will Get Done. And if you're getting paid to develop software, _someone_ wants to know a "when".

So be careful. Points come with baggage. Some[^4] don't like them. Some abuse them[^5]. They're an invitation to [bikeshed](http://en.wikipedia.org/wiki/Parkinson%27s_law_of_triviality). Time spent discussing and assigning points is time **not** spent on development. So go into the pointing session understanding that it's not about the points.

It's about [way more important things](https://www.youtube.com/watch?v=7PCkvCPvDXk)[^6].

----

[^1]: The [SI Unit](http://en.wikipedia.org/wiki/International_System_of_Units) for quantity of Internets, named after the [inventor of the Internet](http://en.wikipedia.org/wiki/Al_Gore_and_information_technology).
[^2]: Do not do this. It will not be awesome.
[^3]: My, what big points you have!
[^4]: Really, I assume everyone dislikes them as much as I do.
[^5]: [Some](https://twitter.com/rpherbig) even use them to make [puns](https://www.youtube.com/watch?v=VKcAYMb5uk4).
[^6]: You're welcome.
