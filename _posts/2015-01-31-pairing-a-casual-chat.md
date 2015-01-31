---
layout: post
title: "Pairing: a casual chat"
category: 
tags: []
---

## Let's talk about Pair Programming

All right. You sit there, I'll sit here. We'll stare at this one screen and take turns typing. While I type, you either check your phone or badger me about missing semicolons. While you type, I'm going to solve this Rubik's cube and mindlessly hum a song from Disney's Frozen. We good?

No, we're not good.

## Let's **really** talk about Pair Programming

It seems to me like every 4-6 years a new practice shows up on my radar that is both empirically better than what I am doing at the time _and_ that I fundamentally reject as complete nonsense. Twelve or so years ago it was [automated testing](http://en.wikipedia.org/wiki/Test_automation). Six or so years ago it was [Test-Driven Development](http://en.wikipedia.org/wiki/Test-driven_development). Now we have [Pair Programming](http://en.wikipedia.org/wiki/Pair_programming).

Because I am stubborn. Well, actually it's because the guys telling me about it are usually awesome Engineers but poor marketers.

I started a new project recently, and as part of the bootstrapping effort my new teammates and I sat down and had a discussion about pairing. What is it good for? When do we use it? When do we _not_ use it? Do we have a _pairing manifesto_?

We identified the following "reasons to pair" as important to us:

* Increase in code quality
* Knowledge sharing
* Improved design
* Rapid feedback

We looked at that list for a while and thought "wow, those are really good things to get out of a tool". And then we collectively got stuck on trying to answer "when do we _not_ pair?" Look at that list! There's always a reason to pair!

## Pairing is a skill

So let's get pairing! Right? ... guys?

Remember those practices I mentioned earlier? Part of the reason I disliked them when I first encountered them is that I wasn't immediately effective even though _I thought I totally should be_. Consider the first automated test you implemented. In hindsight, was it a good test by any measure? If you're anything like me, probably not. Assuming you now have a few years of experience under your belt, could you go back and do a better job? I should hope so.

Pairing is similarly a skill, and the only way to get better it to practice. And practice. Look at all the stuff you can permute:

* Different people
* Different skill levels
* Different personalities
* Different projects
* Different technologies
* Different pairing techniques
* Different pairing configurations

Now, being a programmer, I'm understandably not very good with powers of two. But I'm pretty sure that even if you constrain each variable to two values (two people, two skill levels, etc.), that's over one hundred billion permutations. Get practicing!

### Pairing techniques

#### Vanilla[^1] Pair Programming

You have the Navigator, who approaches the work from the perspective of the Story (or task, or work item, or whatever). His or her job is to make sure that everything being implemented makes sense in the large context, and that any upcoming questions are answered (or at the very least understood). When I navigate I like to have an extra laptop or tablet up so I can quickly view whatever API documentation is necessary or look up potential solutions on [StackOverflow](http://stackoverflow.com/) if we're about to run into some choppy waters.

Then there is the Driver, whose purview is the Here and Now, working in the meat of the Story (or task, or work item, or whatever), handling the implementation. He or she should take cues from the Navigator but be One with the Code, quickly moving between files, adding and removing code as necessary. Of the two, the Driver is the one controlling the keyboard.

Every now and then, switch roles.

I wouldn't necessarily recommend this approach to someone who is new to pairing because it takes a little getting used to. I prefer this approach when my pair has a long continuous chunk of time to get work done. Driver/Navigator can have an almost lackadaisical feel to it, while still remaining focused.

#### Ping-pong Pair Programming

Ping-pong pairing is [a pretty great little technique](http://c2.com/cgi/wiki?PairProgrammingPingPongPattern). I write a failing test; you make it pass. You then write a failing test, and I make it pass. Repeat until project is done.

Ping-ponging works very well for everyday pairing, mentoring (as championed by [Matt Terry](https://twitter.com/macterry)), and generally heads-down Getting Stuff Done. I don't think I would recommend it if you're working in unfamiliar code or focusing on knowledge sharing, but Every Pair is Different.

#### Promiscuous Pair Programming

I really, really want to try [promiscuous pairing](https://agilefaq.wordpress.com/2007/11/03/what-is-promiscuous-pairing/). Every _n_ minutes (where _n_ is on the order of 20) a bell rings, indicating that the most experienced member of every pair on the team leaves the work he or she was doing and finds someone else to work with. When you sit down you had better be ready to learn, because you'll be leading that pair in another _n_ minutes.

I love this idea and will suggest it to my team when we become more comfortable with our new codebase. I've heard this method is the absolute best for knowledge sharing and productivity, but it's certainly the most intimidating in terms of logistics and team investment.

### Pairing configurations

You know, do what works for you but remember these general guidelines:

* **Pairing is exhausting**. You're focused with another person on a task for a stretch of time, and it's not uncommon to feel wrung out by the time 5:00PM rolls around. So take precautions: schedule breaks, use [pomodoro timers](http://en.wikipedia.org/wiki/Pomodoro_Technique), get up and walk around after every test -- do _something_.
* **Get your house in order**. Can you both see the monitor easily? Is it easy to share the keyboard? Do your chairs fit comfortably in the area? Are there physical concerns (my partner might be too tall to comfortably fit at my desk)? Do you have enough light? Make sure your pair is comfortable so you can get into a groove and get things done.
* **Do the prep work**. Is there some uncertainty in your story? Drill that out with a [spike](http://www.scaledagileframework.com/spikes/). Talk to your [Product Owner](http://www.mountaingoatsoftware.com/agile/scrum/product-owner) to make sure all your acceptance criteria are complete enough.

**Aside**: Also, if you're pairing remotely, you have a whole host of other concerns. The Pragmatic Programmers publish a great book on [Remote Pairing](https://pragprog.com/book/jkrp/remote-pairing) that's worth a read, and you should look at tools like [ScreenHero](http://screenhero.com/) and [Floobits](https://floobits.com/). You may also want a USB headset or something.
{: .aside}

My favorite configuration is to sit side-by-side looking at different monitors (duplicated, not extended), with two keyboards and two mice. Side-laptop for scouting on StackOverflow is optional but highly recommended. This configuration is especially nice for getting you in the habit of pointing at things with a mouse cursor so that if you have to pair remotely for whatever reason you don't waste cycles physically pointing at your code.

## How we did it

We learned very early (before we had started development) that the client was Very Dedicated to pairing. Given that we had time to configure our team's area, I sent around a questionnaire to my teammates asking their pairing preferences.

My vision was that we would have several 'pairing stations' in our team's area, with a few people giving up their 'personal desk' that we usually have in order to make room. I figured that, after the daily standup, a primary developer would grab a second developer; both would take the primary's laptop to a pairing station, plug in, and go.

Five developers out of eight indicated that they would give up their personal desk in favor of pairing stations, which was pretty encouraging. The others had more individualized roles (for example, the Product Owner) that necessitated a dedicated desk.

I also spent time researching remote pairing strategies and making recommendations to the client.

And then of course the pairing manifesto.

## A few months in

We abandoned that 'pairing stations' idea almost immediately. Each developer more or less has his or her own desk, but the desks have been set up to enable pairing. Overall, I'll put that in the 'win' column.

We're also pairing remotely with some other (client) teams on the project, which is sharing knowledge pretty effectively.

The two biggest challenges we have currently are scheduling and tooling. The client is in another timezone, so our schedules don't overlap completely. We're also working under Scrum, so there are Meetings required that take vast swaths of everyone's time. Scheduling ain't easy.

Tooling surprised me. In an effort to avoid being snarky[^2], I'll say only this: if you are committed to developing only in pairs and one of your pair is remote, then when the tool is unavailable your pair will be unable to produce any code.

Overall I've been very pleased. At any given time we have 1-3 pairs operating and collaborating, cross-talking and bickering. We've had two sprint retrospectives, and pairing was called out as a positive thing in both.

10/10 would pair again.

## Addressing the squishiness

If you made it this far, let me know. I've rewritten this post like five times to try to make it less laborious, but there's a lot to pairing, so I've written lots of words. And these are the most important:

You gotta be invested.

I've read lots of [studies](https://github.com/mike-rogers/mike-rogers.github.com/blob/master/_bibliography/pairing.bib) on pairing, and the one consistent thread is that you have to practice to see yields. One study noted that, for established pairs, the effort for a task only increases by 15% when adding a second developer. FIFTEEN PERCENT. And that's **effort**. The duration nearly halves, and the quality skyrockets.

And it's uncomfortable, initially. I spent the first 10 years of my career sitting alone in a dark room shouting angrily at my compiler because How Dare It Presume and then being privately mortified because Oh Of Course and now you want me to do that in a well lit office with _another human being_? While wearing _slacks_? Of course it's uncomfortable.

So state the problem boldly. "I'm new to pairing but I want to get better". Be gracious, especially to yourself. Give yourself room to be inefficient, and to grow.

Be hygienic. I encourage the use of Pairing Mints.

But above all, be present. Being invested doesn't mean checking your email or texting or planking or whatever you kids are doing these days[^3]. Encourage your pairing partner, and fulfill whatever role you're playing in the pair.

If I have to write the word 'pair' one more time I'm going to scream[^4].

----

[^1]: Did you know that a British equivalent of "vanilla" (meaning "plain" or "without special features") is "[bog standard](http://dictionary.cambridge.org/us/dictionary/british/bog-standard)"? I've been told the term has more of a kick to it than does "vanilla", a connotation of resigned dreariness, but I think "vanilla" could work depending on your palette.
[^2]: which, I feel, is uncharacteristic of me, but let's move on
[^3]: pls get off my lawn
[^4]: Also if I hear one more pun about pair/pear. You know who you are.
