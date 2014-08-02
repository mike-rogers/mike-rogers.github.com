---
layout: post
title: "Named Capture Groups are Awesome and You Can Too"
category: 
tags: []
---
{% include JB/setup %}

## Regular expressions make you a better person

I remember life before regexp. I was a below-average pattern matcher: thumbing from town to town, always wearing out my welcomes, always trying to eke out a living under the hostile scowl of the local sheriff. Occassionally I would do some inefficient pattern-matching, but only simple stuff. Even case insensitivity was out of my league. The pattern-match coffers ran dry, and I was down to my last `strcmp`.

Then I wrote my first regular expression and captured all the text. They called me The Dot-Star Kid _[ed. nobody called you that]_. Not only were the pattern-match coffers full, but they were also 'Full' and 'FULL'.

After that I would match any text I saw. I looked for ways to create more powerful expressions. I learned about non-deterministic finite automata and their creation using [Thompson's construction algorithm](http://en.wikipedia.org/wiki/Thompson%27s_construction_algorithm). I learned about look ahead and look behind; non-capture groups; possessive quantifiers!

But there was a problem.

It's one thing to write a regular expression. It's quite another to use it in a way that the code's maintainer doesn't track you down, slather you with pork drippings and leave you to the wolves. Take a look at this:

{% highlight ruby %}
matches = some_text.match(%r{
    tree\s([a-fA-F0-9]{40})\n
    ((?:parent\s[a-fA-F0-9]{40}\n)*)
    author\s([^<]*)\s<([^>]*)>\s(\d+\s[+-]\d{4})\n
    committer\s([^<]*)\s<([^>]*)>\s(\d+\s[+-]\d{4})\n\n
    (.*)
}mx)
{% endhighlight %}

This is a regular expression (and not a very good one) that matches a Git commit string, which looks something like this:

    tree b6178164f6c3fa2aa756e872bef7829448cc8161
    parent ebb04b1dbb66e5e5a8a1199c9d02c84aa7119be8
    author R. Michael Rogers <rmrogers@sep.com> 1404938671 -0400
    committer R. Michael Rogers <rmrogers@sep.com> 1404938671 -0400

    added thing to other thing, moved this thing over here #valuablecommitmessage

In order to make this even slightly maintainable you would have to add quite a few comments:

{% highlight ruby %}
    matches = some_text.match(%r{
        tree\s([a-fA-F0-9]{40})\n
        ((?:parent\s[a-fA-F0-9]{40}\n)*)
        author\s([^<]*)\s<([^>]*)>\s(\d+\s[+-]\d{4})\n
        committer\s([^<]*)\s<([^>]*)>\s(\d+\s[+-]\d{4})\n\n
        (.*)
    }mx)

    # matches[0] holds the entire matched string
    # matches[1] holds the hash for the commit's 'tree'
    # matches[2] holds the parents, form of 'parents <40-char hash>\n' per parent
    # matches[3] holds the author name
    # matches[4] holds the blah blah blah
    # THERE ARE MORE BUT I'M NOT TYPING THEM. I AM SO TIRED.

    # and then there's the actual code:
    GitAuthor.build(name: matches[3], email: matches[4], timestamp: matches[5])
    # OR WAS THAT matches[8]? WHAT DOES THAT MEAN.
{% endhighlight %}

WHAT HAVE I DONE.

## Our savior: named capture groups

The first example of capture groups I learned was this guy: `(hello|hi)`. It matches a string that contains the word "hi" or the word "hello", and will capture which word it found. The word can be retrieved usually through an indexer on some kind of matcher, like this:

{% highlight ruby %}
    text = 'hello you glorious pattern matcher'
    matcher = text.match(/(hello|hi)/)

    # matcher[0] contains the whole string that was matched,
    # in this case equal to matcher[1]
    puts matcher[1]
{% endhighlight %}

More advanced capture groups usually pile strange character combinations towards the front. If you want to have the same 'hello' or 'hi' string but don't want to capture it, you can use a non-capture group like this: `(?:hello|hi)`. That `?:` tells the regex engine to match but not capture.

{% highlight ruby %}
    text = 'hello you glorious pattern matcher'
    matcher = text.match(/(?:hello|hi)/)
    puts matcher[1].nil?
{% endhighlight %}

Named capture groups have a similar syntax. Say you want to capture 'hello' or 'hi', but you'd prefer if the maintainer didn't hunt you down. You might try this: `(?<greeting>hello|hi)`. 

{% highlight ruby %}
    text = 'hello you glorious pattern matcher'
    matcher = text.match(/(?<greeting>hello|hi)/)
    puts matcher[:greeting]
{% endhighlight %}

Feels good on the brain. Like a cool, clear brook bubbling over fine rounded pebbles.

Let's see that example again with named capture groups:

{% highlight ruby %}
    matches = some_text.match(%r{
        tree\s(?<tree>[a-fA-F0-9]{40})\n
        (?<parents>(?:parent\s[a-fA-F0-9]{40}\n)*)
        author\s
            (?<author_name>[^<]*)\s
            <(?<author_email>[^>]*)>\s
            (?<author_timestamp>\d+\s[+-]\d{4})\n
        committer\s
            (?<committer_name>[^<]*)\s
            <(?<committer_email>[^>]*)>\s
            (?<committer_timestamp>\d+\s[+-]\d{4})\n\n
        (?<comment>.*)
    }mx)

    # the actual code:
    GitAuthor.build(name: matches[:author_name],
                    email: matches[:author_email],
                    timestamp: matches[:author_timestamp])
{% endhighlight %}

Even though the regex itself could use a little cleanup, I have no trouble understanding what's going on here. Hopefully that hair-trigger sociopath who maintains the code has no trouble either. Sometimes I hear him outside my windows at night.

## Conclusion

Named capture groups. Use them. They're wonderful.
