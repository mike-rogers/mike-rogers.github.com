---
layout: post
title: Mutation Testing - Totally a Thing
category: 
tags: []
---

## Mutation Testing

Mutation testing is a way to verify that your code is covered by tests.

### Oh? Go on...

"What, like code coverage?" you may ask. Or, you may say "you want me to test my tests? That's stupid. You're stupid" which are not dissimilar from my reactions to mutation testing when I first heard of it.

Or maybe you're not as vitriolic as I am. Moving on.

Let's take as an assumption that you don't want unnecessary code in your application, because every clause that isn't 100% necessary is a new vector for bugs, cruft, and misdirection. I say 'misdirection' because if you're trying to refactor a piece of code and you spend an hour trying to figure out why that particular clause is there and it turns out "no reason" you're going to feel a little lied to. I know I feel that way sometimes.

So mutation is a great way to test that things like this...

```java
if (someVariable != null && someVariable.hasValue())
```

... are necessary. Do you actually know if you need the null check? Is that something you did reflexively? That null check could mean you're not 100% sure what the contract is for the `someVariable` variable, and might warrant looking into. You may want to clarify your intent with the Java 8 `Optional<>` type.

Or not! But you can't have that discussion without catching the problem first!

### How it works

The idea is pretty simple.

A mutation is a very specific yet slight alteration of application source code. You can think of them the same way you think about Software Patterns in that each type (which is concrete and well described) can be applied in many places. For example, a mutation exists that changes the return type of a function to `void`. That mutation is run everywhere it can in your source code, at each point re-running your tests. If the test fails, that mutation is said to be 'killed' and your code is safe from that mutation. If the mutation makes it through your tests, it's said to have 'lived' and your code is not mutation-proof.

There exists a number of mutation testing libraries, each of which have their own sets of mutations. The grunt-mutation-testing plugin for JavaScript has [a nice list](https://www.npmjs.com/package/grunt-mutation-testing#available-mutations) of mutations applicable to JavaScript, and many mutations overlap between libraries/platforms/languages.

### Output

The output you get won't differ much from the code coverage tools you're used to. You'll get a percentile of 'killed mutations' versus 'total mutations' and it will be a lot lower than you'd prefer. But hold on to your pants, you don't want to use the metric wrong and start adding tests willy-nilly. Keep reading!

## My First Experience

Here's why I disliked mutation testing.

My first experience was with a .NET application written for the configuration of a medical device, so we're talking Regulatory Overhead, with I-triple-Es and FDAs and so forth. A combination of a massive, massive codebase and correspondingly huge test corpus meant that the mutation testing had to be distributed and it still took over a day.

That's a long time to wait for feedback, but if it were a valuable metric I could wait. A misconfiguration of the medical device could result in a human death. I'll take a longer feedback loop to avoid that.

But it was frustrating to me because I couldn't understand the value of the metric. It just seemed like Yet Another Measurement to abide by (although we never got so far as to add it to the process) without an explanation of how to use it properly.

My second experience was in JavaScript space, where my team was asked to adhere to 100% mutation-free code. This seemed less valuable initially because human lives weren't on the line (to be trite). Also, I [really](https://mike-rogers.github.io/2013/08/21/testing-in-javascript) [dislike](https://mike-rogers.github.io/2014/08/04/javascript-deferred-loading-migraines-and-you) [JavaScript](https://mike-rogers.github.io/2014/08/22/failed-experiment-testing-javascript) so the more I have to play in it the less comfortable I am.

So mutation testing was a hard sell for me.

## How the Community Does it

And then I reached out to the wonderful [Lisa Crispin](http://lisacrispin.com/) to see if I was doing it wrong (hint: I was). My initial concern was that the cost/benefit of practicing mutation testing was out of whack and we weren't getting the value we desired. Her response was pretty enlightening:

> My experience working with teams doing TDD over the past 15 years leads me to believe that in most cases, mutation testing would be expensive and not add much of a safety net. Of course **it depends on how good your programmers are at TDD**, but if they're poor at TDD then they might also be poor at implementing mutation testing.
>
> -- <cite>Lisa Crispin</cite> (emphesis mine)

So if you're doing TDD right, your code should be mutation-proof to begin with and your test coverage should be solid.

And from her twitter followers we heard the same thing over and over:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/jbrains">@jbrains</a> <a href="https://twitter.com/lisacrispin">@lisacrispin</a> I&#39;ve never seen a need for it. Maybe for embedded stuff hard to end to end test? But I have seen it as /helpful/.</p>&mdash; mheusser (@mheusser) <a href="https://twitter.com/mheusser/status/604060884747460608">May 28, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> Things like Jester? I never used it seriously. I do mutation testing when I don’t see a test fail first.</p>&mdash; ☕ J. B. Rainsberger (@jbrains) <a href="https://twitter.com/jbrains/status/604048069898997762">May 28, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> So far, I haven&#39;t been able to come up with a good use for it though.</p>&mdash; Prakash Murthy (@_prakash) <a href="https://twitter.com/_prakash/status/604035022689972224">May 28, 2015</a></blockquote>

... said the experts at TDD. But what about us normal humans?

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> I find it most helpful when adding tests to legacy code. Which includes the times when I&#39;ve gotten sloppy with TDD</p>&mdash; Pat Maddox (@patmaddox) <a href="https://twitter.com/patmaddox/status/604033764080001024">May 28, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/jbrains">@jbrains</a> <a href="https://twitter.com/lisacrispin">@lisacrispin</a> <a href="https://twitter.com/patmaddox">@patmaddox</a> agree. i mutation-test mostly manually and mostly cuz i&#39;m irritated. same as firing up the debugger.</p>&mdash; Michael D. Hill (@GeePawHill) <a href="https://twitter.com/GeePawHill/status/604050057604812800">May 28, 2015</a></blockquote>

So what I was seeing was that mutation testing bridges the gap between less-than-perfect TDD and really solid code. But how do you use it pragmatically?

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> It for me is the technique closing the TDD cycle.</p>&mdash; Markus Schirp (@_m_b_j_) <a href="https://twitter.com/_m_b_j_/status/604035641559621632">May 28, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> Without mutation testing a TDD cycle can add more semantics to code than the new test asked for.</p>&mdash; Markus Schirp (@_m_b_j_) <a href="https://twitter.com/_m_b_j_/status/604035759356657664">May 28, 2015</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/lisacrispin">@lisacrispin</a> It reduces the code / specification gab. Disclaimer, no silver bullet.</p>&mdash; Markus Schirp (@_m_b_j_) <a href="https://twitter.com/_m_b_j_/status/604035826650091520">May 28, 2015</a></blockquote>

"I have to try this." I said to myself, stuffing my face with buttered pop-tart.

## Personal (Better) Experience

I had some refactoring I was going to do on a [Jenkins plugin](https://github.com/mike-rogers/rally-plugin) I've been working on. It was a perfect opportunity to try to use this new tool "correctly" (for certain values of 'correctly').

I focused on [PITest](http://pitest.org/) because that's what was encouraged by Markus Schirp. I ran it initially and was not disheartened to see that my code was only 50% covered from mutation, because when I forked the repository it didn't even have a 'test' directory and I was actually proud that the coverage was so high. Go me!

PITest has a nice report that shows me which lines are not safe from mutation. I did *not* use that to back-cover those lines with tests, but instead kept in mind where the tests were weak and where they were strong.

The refactoring went over well enough, and then I looked into re-running the mutation tests. Fortunately PITest has a wonderful feature where it integrates with Maven's SCM plugin to only be exposed to files that have changed, so the rerunning of mutation only took a couple of minutes.

The generated report showed no change in coverage, which is exactly what I wanted to see. All the refactored code was covered by the existing tests.

This experience was pretty transformative. It showed me how to use the tool to gain confidence in my refactoring, and that lead to a great deal of comfort in the output.

## Conclusions

It would be so, so easy to fall into the trap of using this tool in a non-agile fashion, the way many of us have seen more traditional code coverage metrics used. It's a pretty solid metric, so mandating 100% mutation-proof code would be easy. But expensive.

I've seen that edict in practice and what I've found is that it moves the conversation away from a proactive discussion of testing and TDD and into a reactive mode of discussion. Instead of "did you consider this corner case" or "i think this refactoring would be more clean" the conversation turned to "this expression is not covered by tests", which is not helpful nor cost-effective.

If you want to build a more proactive culture then you should look into pairing with an eye for building TDD chops and applying mutation testing pragmatically. From Lisa Crispin:

> I agree with your ideas on the proactive measures. My teams have always done those things - making sure the team has plenty of time to learn and practice so they can master the practices that help build quality in.
>
> -- <cite>Lisa Crispin</cite>

So, an answer is [pairing](http://mike-rogers.github.io/2015/01/31/pairing-a-casual-chat/).

The fundamental shift for me came with the realization that a chunk of TDD as I was practicing it was unverified. In the traditional Red Green Refactor cycle, Red and Green are pretty easy. But how can you be sure you're not injecting something unnecessary during Refactor? That's a full third (or more, realistically, given the complexity of some refactorings) of your TDD cycle without a safety net!

Hence mutation testing.

If you want to learn more about mutation testing I found [this article](http://accu.org/index.php/journals/1929) pretty engaging, with plenty of decent citations, or drop me a line, or just kinda hang out the window and scream really loudly.

----

Special thanks to Lisa Crispin and the Twitterblag in general for providing such impressive insights and feedback.
