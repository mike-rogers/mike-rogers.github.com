---
layout: post
title: "When Not to TDD"
category: 
tags: []
---

## Wait, what?

I used to hate Test Driven Development.

When I was first introducted to TDD, it was by a zealot coworker that didn't really know what he was doing. "It's great!" he yelled (he always seemed to be yelling). "You write all your tests first!" At that point in my life I had a difficult enough time writing the tests _second_, so his proposition sounded vaguely stupid and I ignored it.

Then I was taught TDD by [David Hussman](https://twitter.com/davidhussman). The lights came on. I saw that TDD was a method for writing cleaner, better organized code; testing was more of an ancillary benefit. I have been a huge proponent of TDD since that day, and my code has never been cleaner.

But!

... wait, hang on...

## Hang on?

Well, listen. I don't want it to sound like I'm down on TDD. It's a wonderful tool. An amazing, earth-shattering tool that has done nothing but improve the quality of my code and rekindle my love of programming.

But it's a tool. It's not panacea. Pragmatism shouldn't be abandoned in its favor.

Because that's the path I was going down. Every new problem and technology, my first thought was "how do I test-drive this code?"

And in some ways that's probably a good way to think. In other ways, it's dangerous and can kill a project. For example, I had an [idea](/2013/09/14/amateur-hardware-hackery/) for creating some hardware that would let us know whether the ping-pong table was in use. I started a [project](https://github.com/sep/ping-pong-platform) that would allow whomever worked on it to test-drive their code for the MSP430 Launchpad.

And it tanked. It was too heavy.

I sat down this weekend and wrote out the code to handle the ping-pong controller for Arduino, without test-driving it. Here it is:

{% highlight c %}
int switch_on = 2;
int switch_off = 3;
int debounce = 200;
volatile long lastBounce = 0;

void setup() {
  pinMode(switch_on, INPUT_PULLUP);
  pinMode(switch_off, INPUT_PULLUP);
  attachInterrupt(0, switch_triggered_cb, FALLING);
  attachInterrupt(1, switch_triggered_cb, FALLING);
  Serial.begin(9600);
}

void loop() {
  if (lastBounce != 0) {
    if (millis() - lastBounce > debounce) {
      if (digitalRead(switch_on) == LOW) {
        Serial.print("Switch on\n");
      }
      
      if (digitalRead(switch_off) == LOW) {
        Serial.print("Switch off\n");
      }
      
      lastBounce = 0;
    }
  }
}

void switch_triggered_cb() {
  lastBounce = millis();
}

{% endhighlight %}

That's it. 30 lines of prototype code written over 30 minutes. I didn't need to create a TDD context for Arduino (even though [I totally did anyway](https://github.com/mike-rogers/arduino-fade)). I just needed to sit down and Make Things Work: a switch triggers some behavior. That's all I needed.

## So you're saying...

What I'm saying is that, after 14 years of programming for money, pragmatism still wins above all things. Tools come and go, or come and stay, but that doesn't make them more than tools.

And the shinier the new tool, the harder it is not to use it.
