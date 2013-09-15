---
layout: post
title: "Amateur Hardware Hackery"
category: 
tags: []
---
{% include JB/setup %}

## Genesis

I've been floating projectlessly for a while, which means "too much ping pong".

One of the unfortunate consequences of working with a bunch of ping pong enthusiasts (and only one table) is that we collectively walk *dozens of steps per day* to engage in some vigorous table-tennis-ery only to find the table already in use. On such occasions, after a somber shuffle back to my desk, I have to drink eight or nine Coca-Colas to replenish the calories lost due to sheer disappointment.

**SOMETHING MUST BE DONE**.

## Solution: Over-Engineering

Let's build us some hardware.

I enjoy working close to the metal, twiddling bits at specific offsets within a known memory address to interact with any number of peripherals. On the one hand I feel part of an elite team that understands the mystery of embedded programming; on the other, more honest hand, I understand that I'm perched atop the shoulders of giants, using a century research and technological development by the greatest minds ever possessed by humans... to make an LED blink. If I didn't screw anything up this time.

There are some like-minded folk at [SEP](http://www.sep.com/sep-blog/2013/09/09/sep-ping-pong-and-pdus/), so we set about creating a solution in the over-the-top manner that only brilliant, manic engineers can manage with me in the way.

We're building a battery-powered, wireless device that attaches to or sits near the ping pong table. When someone is playing, they will flip a switch on the device (not yet designed: switch), which will wirelessly signal a base station nearby. The base station, on receiving the wireless signal, will access a RESTful API on another machine via the company intranet. The RESTful API has a process behind it connected to the internal Jabber server and will notify a multi-user chat that, hey, the table is in use.

The base station will be powered entirely by the smiling ghost of Rube Goldberg.

## Project Goals

The goals of this project are:

* Create something of use for the poor, overtaxed ping pong players.
* Learn something about:
  * Embedded Linux
  * The Raspberry Pi
  * TI's MSP430 line of embedded microprocessors
  * Low-powered devices
  * ZigBee, IEEE 802.15.4, and wireless communications
* Create comprehensive instructions, schematics, and software so that ping pong-playing engineering companies all over the world who want a similar solution (all two of them) can easily recreate our work, or at least use it to understand something about how our solution was put together.

Our GitHub page can be found [here](https://github.com/sep/ping-pong-platform), although at the time of this writing there's nothing yet committed. Eventually the instructions and software will be available in that repository.

For the schematics...

## I Got 99 Problems but a Quick-Turn PCB Manufacturer Ain't One

I've drawn up a few circuits in my day, but nothing I've done has ever been printed. I didn't really know where to start on this one. I put the word out to some friends of mine, and they pointed me to several custom PCB printers on the web.

Unfortunately, custom PCB printers typically need your schematics in a special, mysterious file format called 'Gerber'. There are many programs that will help you create Gerber files, both free and commercial. I've used a few, and they always feel clunky and awkward (clunkward?).

Then [Jon Fuller](https://twitter.com/jon_fuller) helpfully sent me a link to [circuits.io](https://www.circuits.io/), which is the single greatest site in the history of man. Seriously, look at this:

<iframe width="480" height="360" src="https://www.circuits.io/circuits/5505/embed" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="margin-bottom: 2em;"></iframe>

I've already ordered a printing of the [expansion board](https://www.circuits.io/circuits/5543) I designed for the [Raspberry Pi](http://www.newark.com/jsp/search/productdetail.jsp?sku=43W5302&COM=raspi-group). It should be here in 10 days. I can't wait to see how miserably it fails!

<p class="aside"><strong>Aside</strong>: If I were billing someone at my professional rate for the time I've spent on this project <em>just using circuits.io</em> we could've hired a high-schooler for minimum wage to sit by the table with his laptop and do the usage updates manually. <strong>For a month</strong>.</p>

Something I really like about circuits.io is that it maintains a BOM for each schematic, complete with options of where to buy. Want to get all the materials from [DigiKey](http://www.digikey.com/)? It's in the 'suppliers' dropdown.

## Conclusion (and Rallying Cry)

If you're interested in helping us or have any questions, feel free to [drop me a line](https://twitter.com/mikerogers_).

**Remember: we're not just engineers. We're Over-Engineers.**