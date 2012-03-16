---
layout: post
title: "Question: iOS Development Environment"
category: question
tags: [ios question stackoverflow]
---
{% include JB/setup %}

## Prefix to a Question

I've been working for the past week or so on getting an iOS development environment set up.

When I say "development environment", what I mean is:

1. Works with the standard IDE (Xcode 4.3.1) without modification
2. Can be compiled from the command line
3. Automatic test execution (from the IDE & command line)
4. Testing metrics gathered
5. Code coverage metrics gathered
6. Easily integrate with a Continuous Integration server

I have created environments that feature all of these things (and more!) in both .NET and Java, so I was shocked to discover what a challenge it is to get the same feature-set for iOS.

Here are some highlights of the various obstacles I've faced and concessions I've made:

* Xcode will put build artifacts from your project into a special directory (`~/Library/Developer/Xcode/DerivedData`) if you build _from within the IDE_. If you try to build via the command-line (with `xcodebuild -project SomeProject.xcodeproj`) your artifacts will reside in `./build`. To have the artifacts go to the 'correct' `DerivedData` directory, you must run `xcodebuild -workspace SomeWorkspace.xcworkspace`. I posted this on [StackOverflow](http://stackoverflow.com/questions/9611736/xcode-4-3-build-directory-different-per-configuration) but nobody cares.
* Getting automated testing set up is stupidly hard. Apple has split up testing into two facets: **Logic** tests and **Application** tests.
    * **Logic** tests verify logic in your non-UI classes and not depend on any hardware. These tests can be run on a simulator.
    * **Application** tests verify that your UI is hooked up correctly and may access hardware features. These tests can *not* be run on a simulator.
* I have been unable to find a way to get testing set up without manually adding each class you want to test to the testing bundle's Compile Sources under Build Phases. This is wholly inconvenient.
* Apple switched from the GCC compiler to the LLVM compiler with Xcode 4.2, so things're a little hairy in some places. One of those places is code coverage. If you turn on code coverage in your test bundle, you'll be met with an error complaining about the lack of a couple of functions with the suffix `$UNIX2003`. You _could_ add a link to `libprofile_rt.a` or similar (I have not tested this), but that file is currently nested deeply in Xcode's package contents. I recommend just adding the `.c` code to your testing bundle, per [this StackOverflow answer](http://stackoverflow.com/a/8733416/996184).
* Because everything is glommed together for testing, the coverage metrics will include the actual testing code itself, throwing off the aggregate numbers. This is wholly inconvenient.
* If you want test or coverage metrics posted to your Continuous Integration server (I use [Jenkins](http://jenkins-ci.org/)) you're going to need some scripts to turn the GCOV and OCUnit output into Cobertura and JUnit output, respectively. I have found these guys:
    * [OCUnit2JUnit](https://github.com/ciryon/OCUnit2JUnit), a simple Ruby script to scrape the build output (from `xcodebuild`) and generate JUnit-esque XML files.
    * [gcovr](https://software.sandia.gov/trac/fast/wiki/gcovr), a Python script that directly converts LLVM's gcov files into Cobertura XML files.

Wow, look at that wall of text!

This leads me to the 'question' part:

## Question:

**REALLY?**

Getting this setup working cannot be a unique endeavor. There must be regulated iOS applications out there, applications that require testing and coverage. This has to be a _solved problem_.

Why is it so onerous to get everything automated? Is there a continuous integration server that directly works with Xcode to make this whole rigamarole I've gone through meaningless?

Since it's easier to blame Apple than my own ignorance, I will continue to seethe until someone showes me the Right Way.

_Commence seething in_

_3..._
_2..._
