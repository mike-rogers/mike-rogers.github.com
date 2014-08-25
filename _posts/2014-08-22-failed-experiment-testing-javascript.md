---
layout: post
title: "Failed Experiment: Testing JavaScript with Selenium"
category: 
tags: []
---

Whenever someone hands me a project and says "go lead this" I like to pick a small thing to do differently for the sake of experimentation. On an embedded project I suggested "let's try to do [embedded TDD](http://pragprog.com/book/jgade/test-driven-development-for-embedded-c)", which worked reasonably well. I wrote a few weeks ago about the experiment of [using MarkDown for project documentation](2014-08-04-javascript-deferred-loading-migraines-and-you), which worked reasonably well.

Actually, those are the only two that I can think of that worked reasonably well.

Anyway, because I'm demonstrably human and prone to [common human biases](http://en.wikipedia.org/wiki/Rosy_retrospection) I tend to forget the experiments that failed. And that's the thing I want to write about today: an experiment that failed. Pretty spectacularly.

### Context

The project we were working on was ambitious, replacing the client's older tech stack with a shiny new one. Legacy data (and newly acquired data) would go into the main data store; web services would expose the data through well-structured APIs; and one or more front-ends would consume the APIs and allow users with certain roles access to certain data. We were in charge of developing one of the front-ends, as well as developing the backend components necessary to expose the data to our users.

The front-end we developed was JavaScript-based, of course, using [Kendo UI](http://www.telerik.com/kendo-ui). That should immediately tell you two things:

* Lots and lots of AJAX
* I hated it[^1]

I mean, like, a _lot_.

### Experiment

The question I had was a simple one: _how can we automate the tests for the user-facing components such that we minimize the execution time of the tests?_

The verification tests were written using [SpecFlow](http://www.specflow.org/) running in [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/), and we had hundreds of scenarios across dozens of features, even early in development. At one point the execution time ballooned to four hours.

A four-hour latency doesn't provide a very effective feedback loop. You can write that down if you need to.

The desire to minimize that time is what drove this experiment -- and finally we come to its name: **Let's mock out the AJAX responses for tests that didn't traverse the whole stack and exercise what we can superficially**.

### Implementation[^2]

Because the stack wasn't built to deal with this sort of dichotomy, it took a few iterations to get it to where it worked for all cases.

#### Iteration 1: JavaScript injection

Each SpecFlow scenario would describe what sort of behavior it expected from the mocked AJAX call. These expectations were codified into JavaScript and executed in the context of the page after Selenium had loaded it. Why after? Good question! Because the expectations were delivered to the page via [JQuery](http://jquery.com/)'s [`.ajax`](http://api.jquery.com/jquery.ajax/) function, so we overwrote that function and made it return our expectations.

You can probably see why this approach failed.

If we had to make an AJAX call on page load, there was no way to guarantee that the hijack would take place before the AJAX call, which would make the test stall, waiting for an AJAX response that would never come.

At this point we decided to try a different approach.

#### Iteration 2: Horrible mocking DLL

This approach is a vague memory for me as it took place during the Worst Winter in History. I vaguely recall thinking "maybe if I [garbled] external DLL I could load during [redacted] for mocking!".

After some bloodletting and chanting incantations with mostly consonants ("Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn") I realized that (and the team pointed out that) this was a stupid idea for many, many reasons (including, as I was told during editing, _we actually implemented it and it didn't work_) and I only bring it up to demonstrate that by this time we were not in our right minds.

Since this didn't work at all, we moved on to the next idea.

#### Iteration 3: Sinon and grim determination

[Sinon](http://sinonjs.org/) is a framework for creating test doubles in JavaScript. Which on the surface makes me angry[^3] because JavaScript, with its dynamic/duck typing, shouldn't need to go any great distance to create doubles, _especially_ since hardly anyone writes classes due to its horrible prototype-based object oriented syntax. But to great distances we go. Because JavaScript. Rrgh.

Anypants, here's what a scenario looked like during execution:

1. The site would be exposed via IIS Express using some nonstandard port
1. The [ASP.NET MVC](http://www.asp.net/mvc) [router](http://www.asp.net/mvc/tutorials/older-versions/controllers-and-routing/asp-net-mvc-routing-overview-cs) would be configured for 'special happy debug' mode, which would include `Sinon.js` and a special JavaScript file that contained per-scenario expectation data (hereafter known as SpecialSauce)
1. The test would execute
    1. Selenium would open a browser and hit the IIS Express instance with a special query parameter, loading Sinon and SpecialSauce
	1. The test would execute an expectation-generating function within SpecialSauce through Selenium
	1. Normal UI test stuff would happen, with Sinon intercepting the AJAX calls and returning the scenario's expecations as set up by SpecialSauce
1. End of scenario

This lead to a snowballing of complexity. To deal with multiple build environments (developer machines, test machines, continuous integration server, etc.) we had to come up with several build configurations and manage the build scripts. To deal with multiple AJAX commands per page, we had to implement a queue to handle the expected responses.

Don't get me wrong. This approach got the job done, and did decrease the amount of time it took to execute the verification tests. But, as expanded upon in the next section, we could've done better.

### Results and lessons learned

On the surface it seemed so innocent! "Mock the AJAX requests, speed up the tests".

Alas.

Here are a few takeaways:

* The verification tests had their own project context and were executed independently from the application itself. These mocked tests had to execute within the context of a Unit Test, separate from the other verification tests. Not only did this separate the tests from one another, which eventually lead to duplicated code and then an external testing code library, but the nomenclature was confusing: "verification unit tests" makes no sense.
* The complexity of the build environment increased dramatically. This made the hand-off to the next team awkward, increased the importance (and the complexity) of the documentation, and made the build environment "logistically interesting", a phrase I am going to trademark.
* I hate to generalize, but *everyone* who uses Selenium comes away with the same impression of its flakiness. You simply can't have sturdy, iron-clad tests if you use Selenium. Things fail non-deterministically.

If I had to do it again? Well, first I'd lock up the sharp implements, and then:

* Separate the testing concerns. Make sure the JavaScript is testable through [Jasmine](http://jasmine.github.io/) or something similar, leaving the verification tests to do their own thing. I may go as far as having fewer tests execute through Selenium. I reserve that right.
* Building on the previous point, Sinon has its own [fake XMLHttpRequest implementation](http://sinonjs.org/docs/#server) that would've done wonders if combined with Jasmine above.
* Follow the steps of Bob Nowadly, Rock Star, and parallelize the execution of the tests using Selenium's WebDriver and lots of hardware. He was able to get the execution time for all tests down to 20 minutes, even with the AJAX-mocking madness.

Ahhh, JavaScript. Smells like... failure.

----

### Fu&szlig;noten

[^1]: The hatred didn't really affect what I wanted to do, I just wanted to mention it explicitly.
[^2]: Due to an overwhelming need not to get sued, I am unable to present source code for the myriad implementations. However, since they were failures, why would you want the code anyway? You're a strange one.
[^3]: It also makes me angry below the surface.

"Thank you"s to Dante LaRocca and [Matt Swanson](http://www.mdswanson.com/) for proofreading.
