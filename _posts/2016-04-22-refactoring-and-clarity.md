---
layout: post
title: Refactoring and Clarity
category: 
tags: []
---

## TLDR

> The purpose of refactoring is to improve code clarity.

## Introduction

I refactored some code lately and I want to vent about it.

Actually, let me back up and cover a few foundational points first, because without those it's going to appear like I'm ranting. Probably because I am. But I want to at least set things up so I can plausably deny that I was ranting.

## Quickly, foundational points (and then ranting)

First, I want to share an idea that [Brian J. Ball](https://twitter.com/myotherpants) shared with me when I was new to [SEP](https://www.sep.com/):

> Source code is a letter composed to another developer that, as a side-effect, is compilable.

He told me he got the idea from somewhere but I can't find it, even after multiple minutes of Googling, so I'm attributing it to him[^1].

Second, I attended a talk at [AATC 2016](https://www.agilealliance.org/agile-alliance-technical-conference-2016/) by [Arlo Belshee](http://arlobelshee.com/) titled [Bugs are Optional](https://aatc2016.sched.org/event/5yd2/bugs-are-optional-how-to-stop-writing-them-arlo-belshee?iframe=no&w=&sidebar=no&bg=no), and Arlo brought up the point that most software defects are caused by "inconsistent whitespace". At first I balked but he went on to describe the magnitude of having a developer read code and come up with a different understanding than what is compiled.

Let me restate that for emphasis: programmers misinterpreting the intent of the previous writer is a leading cause of defects. Even if you don't buy that most defects are caused by whitespace, you can probably agree that developers misinterpreting the code is likely problematic.

Third, a thought exercise (stolen from [Tim Ottinger](http://agileotter.blogspot.com/)'s talk titled "Mind the Tricky 11/12ths" at [Agile Indy 2016](http://agileindy.org/2016/02/01/agileindy-conference-2016/)): if, at the end of a solid workday where you feel you've contributed as much as you could, your work was lost completely except for a printed patchfile, how long would it take you to retype the code you wrote that day? Tim stated that the average across various audiences was about 40 minutes. So what are you doing with the rest of your time? A lot of it is trying to understand the code in front of you.

## More foundation (please hold; rant incoming)

I also want to gripe about refactoring for a few minutes, which is tied into some other ideas like "code quality" and "technical debt". It's all a rich, horrible tapestry.

Let me give my definition of those terms, and then we can argue:

* _Code Quality_ is a measure of how quickly value can be added to a codebase
* _Technical Debt_ is an intentional decision to sacrifice some amount of Code Quality in order to deliver value more quickly in the short term
* _Refactoring_ is a collection of behavior-independent changes that improve Code Quality

I'm serious about the arguing part. If you don't like these definitions [let me know](https://twitter.com/mikerogers_).

Let me talk a bit about what's _not_ in those definitions:

* _Code Quality_ is _not_ short methods, short classes, software patterns, reduced duplication, single responsibility, 100% test coverage, passing a stringent linter, or single exit points. You can get to code quality by using some of those techniques, yes, but by themselves they can be used to obfuscate just as easily as clarify. **The name of the game is clarification**.
* _Technical Debt_ is _not_ "we finished this User Story and the code is ugly, let's go fix it". Did you intentionally decide to get work done faster? If not, it's not debt. **Technical Debt is born of discipline, not caused by a lack of it**.
* _Refactoring_ is _not_ reimplementing functionality or tweaking behavior. When I wrote "behavior-independent" above, what I meant was that the software's behavior **should not change** as a result of refactoring.

I recently heard a speaker at a conference tell an audience that Technical Debt should never be allowed. Further, you should only inform your Product Owner that the work is done once all debt has been erased. A few colleagues and I were aghast. What if there's an immovable Trade Show that the fate of your business depends on? Does Zero Technical Debt matter more than your employment? Personally I wonder if he was confusing Technical Debt with Ugly Code.
{: .aside}

## More on Code Quality

Code Quality is a hot-button topic for me. Based on behavior I've encountered, it looks like some (many?) developers think there's such a thing as Objectively Good Code, or even Objectively The Best Code. Some kind of Optimal State that every source file can be coerced into via judicious application of refactoring techniques.

I will stand up and say that there is no such thing as Objectively Good Code. Rather, it is your job as a programmer to ensure that your code is as clear as you can make it for whomever may touch it next. That's it. That's the bar.

I have been handcuffed on multiple projects, unable to write the clearest code I could, because someone put a linter in place configured to break the build if, for example, a method extended beyond 25 lines. That may seem an utterly egregious length to some, but I assure you, there is _at least one problem_ in all of Programming where a 26-line method is more clear and understandable to its target audience than any number of smaller methods. And, to a compiler, method length doesn't matter one bit (PUN NOT INTENDED. I DID NOT MEAN A PUN THERE).

But I guarantee that the linters were put in place to enforce Code Quality.

Don't get me wrong. I love linters as tools to enforce coding standards. If your community has decided that 'clear code' means having your JavaScript `var` statements clustered at the top of the method, by all means feel empowered to add that linter rule to your configuration. Just, you know, don't pedantically pile a bunch of techniques together and assume Code Quality will fall out of it. Each additional rule you enforce has the potential to inhibit clarity.
{: .aside}

What if some of your teammates don't have a solid grasp of English? What if their cultural norms are different than yours? What if they use different domain terms than you? What if their understanding of the [Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern) is different than yours, or altogether missing?

## Even more on Code Quality

Look, at this point I acknowledge I'm ranting.

If you accept my definition of Code Quality (which, if you do, you should let me know, because you're the first) you will understand that it's entirely subjective and not directly measurable or quantifiable. We tend to find secondary ways to measure it, like [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) and various [static analysis tools](https://en.wikipedia.org/wiki/Static_program_analysis), so we can assign a number to our source code and attempt to make it "better".

Once a Code Quality Metric is in place it becomes so easy to game. A stakeholder may see your Number and say "that could be higher", at which point the Metric has become more important than Clarity. Additionally, every moment you spend "removing technical debt" (eye roll) is a moment not working on things your users value.

Okay, seriously, I'm done ranting now.

## Okay, story time

All we had to do was add a chart to a report (Report A), just like we had already done to a different report (Report B) a few months ago. The reports were nearly identical in structure and behavior.

How hard could it be?

Well, it turns out "very". Report A's source code was nearly incomprehensible due to an unfortunate combination of Java 8's Stream API and the aforementioned 25-line limit for methods.

I was able to follow the original implementor's train of thought pretty easily (even though I had no idea what the code was doing). They ran into the line limit and applied a few [Extract Method](http://refactoring.com/catalog/extractMethod.html) refactorings to avoid negative attention from the linter. As they added functionality the dance became more complicated. A few dozen more extractions later and we're passing a single dependency through 7 method calls across 2 files.

In order to understand the code we had to inline all those extracted methods (and classes!) into a single 200-line method, at which point the intent of the code emerged pretty clearly. A few minor tweaks later and we had fixed the dependency issue, but we still had to contend with the linter.

This particular area of the code involved mapping one bean structure to another, which is pretty verbose and hard to break down, especially if the structure of the beans is outside of your sphere of influence. This is one of those problems where it's in the best interest of clarity to break the line limit. However, because we felt weird about challenging the linter, we ended up doing some meaningless and potentially confusing method extractions, leaving in our wake some less-than-clear code.

But that was, like, weeks ago. I barely have nightmares about it now.

## Call to action

"Interesting!" you may say. "I agree with you wholly and also you are handsome! But what can I do to make sure I'm only refactoring for clarity?"

### "Good code" is subjective

The first thing I would do is abandon the idea that there's such a thing as Objectively Good Code (assuming that concept isn't a strawman I've created). Know your audience. Are they going to understand the pattern you're using? The variable name? The domain term? Have they used [Yoda Conditions](https://en.wikipedia.org/wiki/Yoda_conditions) for so long that normal conditionals are genuinely more difficult to parse?

### Read-only refactoring

An interesting technique Arlo presented in his talk (mentioned above) is using refactoring as a tool to help understand the code while you read it[^2]. Let's say you're given a task that is going to involve changing the behavior of some area of the code. Since tools like [IntelliJ](https://www.jetbrains.com/idea/) have very trustworthy refactoring tools, you're very unlikely to introduce a defect simply by reorganizing/renaming some code.

The workflow he described was something like:

1. Apply refactorings to help you understand the code
1. Commit as often as you'd like (with the word "refactor" somewhere in your commit message)
1. Repeat steps 1 and 2 until you understand the code enough to make the change you came to do
1. Write a test (you _are_ practicing TDD, right?), watch it fail
1. Make your test pass
1. Refactor _as makes sense_
1. Commit the behavior-changing code independent of any refactoring code

If you're isolating your refactor commits and trust your tool to refactor without introducing defects, you might feel comfortable foregoing code review (if that's a thing you do) for those commits. That allows you to focus your review efforts on the stuff that really matters: the new test and subsequent behavior change.

### Most importantly...

Are you pairing? Is your code being reviewed by your team or someone on it? The single most important thing is getting out of your head and figuratively getting into your teammates' -- getting exposure to the people who work in your code. Know your audience. What is the simplest code you can write that expresses your intent? What are some shared vocabularies or shared experiences that will help make your intent more clear?

## Conclusion

Refactoring is for clarity. If you find yourself refactoring "because you found duplication" or for any other reason besides clarity, take a step back and reflect: am I leaving the code in a more understandable state than before?

Also I am super interested in feedback on this article. Feel free to [reach out to me](https://twitter.com/mikerogers_) and tell me how I need to rant less.

----

[^1]: Brian has since let me know that, in his book _Refactoring_, Martin Fowler writes "Any fool can write code that a computer can understand. Good programmers write code that humans can understand". Further, in _Structure and Interpretation of Computer Programs_, Sussman writes in the foreword: "programs must be written for people to read, and only incidentally for machines to execute".
[^2]: Incidentally, Arlo has a fantastic blog series on [naming as a process](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/) which is worth a read.
