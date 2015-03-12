---
layout: post
title: "My Awesomest Bug"
category: 
tags: []
---

This post is brought to you by a conversation with Matt Terry. Remember, _there's no OG like the MCT_.
{: .aside}

Let me tell you the story about the coolest bug I've ever fixed and how I learned next to nothing from it until about two years later. Well, I mean, you don't _have_ to let me tell you. I'm going to anyway.

## The setup

We had a problem.

During the development of a wireless security system (with a lock and matching wireless gateway) we were having trouble transfering access control lists (ACLs) from one side to another. Smaller command transmissions seemed to work just fine, but the ACLs were comparatively large and seemed to choke the system. After facing this issue for months our morale was starting to be as low as the transfer success rate.

It was also kind of a personal crisis for me. I mean, this was my first gig as the Tech Lead, and if we couldn't reliably send ACLs the product just wouldn't work. "Hey, remember that time the Tech Lead couldn't overcome the Tech Problem and they had to cancel the project?" You kind of need Access Control for a lock, you know? I mean, I'm no Lock Scientist but it seems pretty important.

Suffice it to say I was personally invested in smashing this bug.

## The process

So one horrible Monday I sat down at my desk and got to work with my trusty tools:

* An oscilloscope[^1]
* A couple of USB RS-232 cables so I could debug on the devices
* A couple of commercial packet readers that grabbed traffic directly off the wireless chips
* Some Adderall
* That guy's [prosthetic leg](https://www.youtube.com/watch?v=_g85U_MjrZY){:target="_blank"}

First up was running a remote `gdb` session directly on the hardware, which got me deep in the wireless chip's library. By examining the call stack I was able to figure out exactly what the error looked like, but not what triggered it.

**Aside**: If you've never worked on embedded systems before, there are a whole lot of constraints that other systems don't have to deal with. A rather huge one is "debugging is super hard". Your systems may be black boxes[^2]. You'll typically see some erroneous behavior and have *no idea* what the software error looks like. You don't get Java- or C#-esque stack traces in C. You get core dumps _if you're lucky_.
{: .aside}

Next up was the packet sniffing. I wasn't pulling packets out of the air; they were being read directly off the wires on the SoC[^3] between its primary processor and its radio. After looking at the traces for a few hours a pattern emerged. I filed a bug with the company who designed the chip (and wrote the library) and felt good about myself.

## The false victory

Until I got the email from them that said "okay, how do we reproduce this?"

Earlier in the project we had sent them some hardware to replicate our development environment. We tried to get them updated firmware and some solid documentation on how to flash everything so they could reproduce. Due to the general complexity of our system we were never able to get them up and running on our development hardware.

What _did_ happen was I stumbled across a couple of their test applications. When you installed their library you got access to three command-line programs you could run to verify that the interface between your device's embedded processor and the wireless SoC was set up correctly. I had played with the first one a few times to verify that our cross-compile toolchain was working correctly and, once I had verified our toolchain, had promptly forgotten about them.

I shrugged, compiled them, and ran them. First one passed. Second one passed.

Third one failed.

I checked with `gdb` and the proprietary packet sniffer. It was the _same problem_.

## The less false victory

Easy reproduction! I sent updated instructions ("just run your own tests, durr!") and they had a fix within a day, and sent us a QA release a few days later. We flashed our SoCs and everything Just Worked. Hooray!

... And not a thing was learned.

## The hubris

For the next year or so I held on to this story, taking it out of its box when I had a rough day and draping it around my shoulders like a comfortable blanket. "Today's challenge may have been too much, but there was that one time I fixed a hard problem".

And sometimes you need that, as a developer. Generally, not a lot of people we're close to understand what we do. I can't show my French-speaking, Tolstoy-reading wife a particularly deft refactoring and get much beyond a "that's nice, honey", so if I can find something that I feel validates me as an Engineer I like to hang on to it.

But man, I could've gotten so much more out of it.

At the very least, "if you're going to use a 3rd-party library, try running its tests". Seems straightforward, right? I do that with Open Source projects all the time! Why didn't I extend that courtesy to this particular library?

Well...

* To program the SoCs we had to use a propritary editor which cost $6000 per seat
* To understand the wireless system at all some teammates and I had to fly halfway across the country to attend a 3-day training session, a cost for which I don't have data but couldn't have been less than $10,000
* The development kits we bought were nearly $1000 apiece
* Even after training we needed an integration specialist, a contractor whose hourly rate I could only guess

In summation, since we were being charged **very real dollars** I thought it was a safe assumption that they would **run their own tests**.

And I was wrong. And a 30-second test run could've saved months of frustration.

## The point

And we arrive at the point: cleverness is well and good, and can usually get you across the finish line, bloody and bedragged. But the real winner is wisdom[^4].

Writing prompt: what are some of the bugs you've squashed that you've collected as trophies, and what did you learn from them? After reflection, could you have learned more?

----

[^1]: [I don't actually know how to use an oscilloscope](https://i.imgflip.com/iqfrs.jpg){:target="_blank"} but I keep one at my desk to look cool.
[^2]: Sometimes they are literally black boxes.
[^3]: [System on a Chip](http://en.wikipedia.org/wiki/System_on_a_chip){:target="_blank"}, where multiple working units exist side-by-side on a single piece of silicon. In this case the radio was a separate working unit from the module's main processor, but both were on the same physical chip.
[^4]: Which I don't have a lot of. But, lucky for me, wisdom comes from making bad decisions
