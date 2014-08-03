---
layout: post
title: "Coding JavaScript Can Almost Be Made Bearable"
category: 
tags: []
---

## JavaScript? More like... NOT... vaScript
So listen. I'm not a huge fan of JavaScript. I dislike the lack of namespaces, the lack of a decent (for certain values of "decent") standard library, the general wonkiness of the `this` keyword, the way expressions can fail silently, bizarre scoping rules, and the general lack of safety I feel when I personally code in it.

But not anymore!

Well, I mean, all the points but the last one are still valid. But thanks to **INTERNET LEARNING™** I now feel more prepared to write solid, well structured code.

<p class="aside"><strong>Aside</strong>: Though a lot of this post can be applied to node.js, it totally shouldn't be. Using node.js has been linked to low glial cell counts in field mice<sup class="citation">[<span>citation needed</span>]</sup>.</p>

## The Missing Link

For me, all it took was a way to run tests within the browser.

There are a few different testing frameworks that run in a browser. Of those, I checked out:

* [Jasmine](http://pivotal.github.io/jasmine/) ([GitHub](https://github.com/pivotal/jasmine))
* [Mocha](http://visionmedia.github.io/mocha/) ([GitHub](https://github.com/visionmedia/mocha))

<p class="aside"><strong>Aside</strong>: When researching JavaScript testing frameworks you should bear in mind that a spouse may be watching you and ask "who is 'Jasmine' and why do you have so many tabs open about her?". Your spouse may or may not appreciate your need for JavaScript testing frameworks.</p>

The two frameworks each had their plusses and minuses. I've created a handy table to outline why I chose Mocha over Jasmine completely independently and without any input from my wife.

Question | Jasmine | Mocha
- | - | -
Has a decent DSL for describing tests | Yes | Yes
Has `before` and `after` hooks per test | Yes | Yes
Has `before` and `after` hooks per group of tests | No | Yes
Has expressive assertion DSL | Yes | No
Has ANY assertion DSL | Uh, yes? | STILL NO
Wow. Like, *no* `assert` function? | I do. | :-(
Has PLUGGABLE assertion DSL? | No | YES! That I **DO** have!
But seriously, no assertions by default? | Well, **I** do... | :-(
All right, how about test doubles? | Got those! | Well...
*Seriously*? No test doubles either? | :-D | Well...
Is it at least simple to integrate into a browser? | Of course! | Define "simple"
... SIMPLE. You know, "not difficult"? | Look, he's sweating! | A few lines, yeah, but order counts!
Hmmm. Well, will my wife approve? | No. | She **loves** mochas!

You can see why Mocha is the clear winner. *cough*.

I genuinely like Mocha's extensibility. Despite the lack of `assert` function you can get something working with an extra line of code. You can choose from a few [pre-existing assertion DSLs](http://visionmedia.github.io/mocha/#assertions) as well. For reference, here's the function I'm using:

{% highlight javascript %}
var assert = function(expression, message) {
    if (!expression) throw new Error(message || 'failed');
};
{% endhighlight %}

## Mocha, you say? What about test doubles?

Mocha integrates pretty well with a project called [Sinon.JS](http://sinonjs.org) ([GitHub](https://github.com/cjohansen/Sinon.JS)). You can do everything in Sinon that you can do with Jasmine's test doubles, and Sinon is slightly more friendly. I feel like the tests come out looking nicer, too.

Here's some example code using Jasmine:
{% highlight javascript %}
describe("DisaffectedTeenager", function() {
    var implement = function(context) {
        // Jasmine has a 'skip test' mechanism you can use by changing 'describe'
        // or 'it' to 'xdescribe' or 'xit', depending on what level you want to
        // skip, but whatever you skip doesn't show up in the reports as 'not
        // yet implemented'.
        context.fail(Error('not yet implemented'));
    };

    describe("how the teenager interacts with humans", function() {
        // This is the object we'll be testing.
        var teen = new DisaffectedTeenager();

        // You can put 'beforeEach' functions in any 'describe'-level scope.
        beforeEach(function() {
           teen.getAttention();
        });

        it("should not understand references to politicians elected before 2010",
           function() {
            var response = teen.askAbout("Dan Quayle");

            // Jasmine's assertion syntax is pretty expressive.
            expect(response).toBe("Who?");
        });
    });

    describe("the teenager's level of respect for others' property",
             function() {
        // There are multiple different ways you can generate spies using
        // Jasmine. This example shows an object-based approach.
        var lawnStubFunctionNames = ["destroyWith", "lowerPropertyValue", "mow"]
        var myLawn = jasmine.createSpyObj("myLawn", lawnStubFunctionNames);
        var teen = new DisaffectedTeenager({ lawn: myLawn });

        it("should not understand how inappropriate it is to be on my lawn",
           function() {
            expect(myLawn.destroyWith)
                .toHaveBeenCalledWith(DisaffectedTeenager.prototype.Skateboard);
            expect(myLawn.lowerPropertyValue).toHaveBeenCalled();
            expect(myLawn.mow).not.toHaveBeenCalled();
        });
    });
)};
{% endhighlight %}

Here's some example code using Mocha and Sinon.JS:
{% highlight javascript %}
describe("DisaffectedTeenager", function() {
    // You can skip tests in Mocha by not passing a function to 'it'.
    // The test will still show up in the output, but it will be clearly
    // marked as 'pending'.
    describe("how the teenager interacts with humans", function() {
        // This is the object we'll be testing.
        var teen = new DisaffectedTeenager();

        // You can put 'before' or 'beforeEach' functions in any
        // 'describe'-level scope.
        before(function() {
           teen.getAttentionAndKeepIt();
        });

        it("should not understand references to politicians elected before 2010",
           function() {
            var response = teen.askAbout("Dan Quayle");

            // This is the 'assert' function you have to supply.
            assert(response === "Who?");
        });
    });

    describe("the teenager's level of respect for others' property",
             function() {
        // Sinon.JS distinguishes between:
        //  * spies - functional; simply record how they're accessed
        //  * stubs - functional; can act/react and spy
        //  * mocks - objects; can register expectations and verify
        var myLawnApi = {
            "destroyWith": function(item) { },
            "lowerPropertyValue": function() { },
            "mow": function() { }
        };

        var myLawnMock = sinon.mock(myLawnApi);
        var teen = new DisaffectedTeenager();

        it("should not understand how inappropriate it is to be on my lawn",
           function() {
            // Sinon.JS has a pretty decent assertion language.
            myLawnMock.expects("destroyWith")
                .atLeast(1)
                .withArgs(DisaffectedTeenager.prototype.Skateboard);
            myLawnMock.expects("lowerPropertyValue")
                .atLeast(1);
            myLawnMock.expects("mow").never();

            myLawnMock.verify();
        });
    });
)};
{% endhighlight %}

## What About the Runner?

The runners for both Jasmine and Mocha are pretty similar. I got tripped up slightly on the Mocha runner because it requires a `div` with an ID of `mocha`, and that element must be declared before any kind of javascript nonsense.

Here's an example runner for Jasmine:
{% highlight html %}
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>Jasmine Spec Runner</title>

    <link rel="shortcut icon" type="image/png"
          href="lib/jasmine-1.3.1/jasmine_favicon.png">
    <link rel="stylesheet" type="text/css"
          href="lib/jasmine-1.3.1/jasmine.css">
    <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine.js">
    </script>
    <script type="text/javascript" src="lib/jasmine-1.3.1/jasmine-html.js">
    </script>

    <!-- include source files here... -->
    <script type="text/javascript" src="../src/js/DisaffectedTeenager.js">
    </script>

    <!-- include spec files here... -->
    <script type="text/javascript" src="spec/DisaffectedTeenagerSpec.js">
    </script>

    <script type="text/javascript">
      (function() {
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function(spec) {
          return htmlReporter.specFilter(spec);
        };

        var currentWindowOnload = window.onload;

        window.onload = function() {
          if (currentWindowOnload) {
            currentWindowOnload();
          }
          execJasmine();
        };

        function execJasmine() {
          jasmineEnv.execute();
        }

      })();
    </script>

  </head>

  <body>
  </body>

</html>
{% endhighlight %}

And the same runner with Mocha:
{% highlight html %}
<!DOCTYPE HTML PUBLIC
	  "-//W3C//DTD HTML 4.01 Transitional//EN"
	  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>Mocha Spec Runner</title>
    <link rel="stylesheet" href="lib/mocha-1.12.0/mocha.css"/>
  </head>

  <body>
    <!-- required by mocha -->
    <div id="mocha"></div>

    <!-- include mocha files (and sinon for mocking) -->
    <script src="lib/sinon-1.7.3/sinon.js"></script>
    <script src="lib/mocha-1.12.0/mocha.js"></script>

    <!-- set up mocha for 'bdd' behavior -->
    <script>mocha.setup("bdd")</script>

    <!-- include test helpers -->
    <!-- (this is where I define 'assert' and others) -->
    <script src="js/Helpers.js"></script>

    <!-- include source files here... -->
    <script src="../src/js/DisaffectedTeenager.js"></script>

    <!-- include spec files here... -->
    <script src="spec/DisaffectedTeenagerSpec.js"></script>

    <script type="text/javascript">
      (function() {
        mocha.checkLeaks();
        mocha.run();
      })();
    </script>
  </body>
</html>
{% endhighlight %}

## Even So, I Can Only Stand So Much JavaScript

I'm not at all saying that JavaScript is an abomination of a language that should be scoured from human history. If that's your take-away, you're way off. Probably. But what I *am* saying is that, given a decent testing tool, check out all the entries that get crossed off the list of reasons never to use JavaScript:

* No concept of namespaces
* Insufficient standard library
* Unintuitive behavior of `this` keyword
* Silent failure of expressions
* <strike>Messy, untested code</strike>

**CASE CLOSED**.
