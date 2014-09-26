---
layout: post
title: "Git for Engineers, Part 1: Commits"
category: 
tags: []
---

* {: .active} [Part 1: Commits]({% post_url 2014-09-16-git-for-engineers %})
* [Part 2: The Stage]({% post_url 2014-09-26-git-for-engineers-ii %})
{: .pagination}

## Context

It took me about a year to become comfortable with Git.

Look, I'm not saying that Git is an inscrutable, demonic technology that clawed its way out of Hell to infect our lives as developers and saturate our codebase with brimstone and hate. I'm not saying that at all. Don't put words in my mouth.

What I *am* saying is that I wasn't taught Git very well. And by "taught" I mean "the stuff I read on [StackOverflow](http://stackoverflow.com/) after I already screwed everything up did little to relieve me of my ignorance". Because when I first encountered Git I had already used CVS and Subversion, and how different could it be, and what's that smell? Is that sulphur?

## Hypothesis

A few months ago I thought, "why not try separating the teaching of Git from the tools"? I mean, most articles you read on Git will explain the commands first, and then what they do, which may not sink in if your context isn't wide enough at that particular point in time.

So here's my hypothesis: _learning the fundamentals of a tool is important to our understanding and correct use of the tool_.

## Git: It's not hard if you don't listen to people

Let's start with a `commit`.

A lot of people new to Git will look at a commit and say "what's up with those stupid numbers and letters?" I know I did. I came to Git from [Subversion](https://subversion.apache.org/)[^1], which had a nice incrementing number called 'revision'. When you make a commit to revision 5 in Subversion, the next revision was 6. Super simple!

However, you commit to `5a7cff71` in Git you might get `b0432ba0`. Buh?

To understand, let's take a step back and look at how Git stores things.

## Git's object model

Let's start with hashing. Git uses the [SHA-1](http://en.wikipedia.org/wiki/SHA-1) hash function to generate a 40-character (20-byte) hash of given objects. That thing up there, `5a7cff71`? That's a hash. It's the first 8 characters of a 40-character hash of a commit object. We can usually get away with using the first 6 or 8 digits of a hash because there are not likely to be any collisions (two different objects hashing to the same value).

People will often use 'commit', 'hash' and 'SHA' interchangeably when talking about the 40-character slug: "What was the SHA where Gene replaced our business logic with pictures of his cat?" is equal to "What was the hash where Gene replaced our business logic with pictures of his cat?"[^2]

Now, what does hashing have to do with Git's object model, apart from the name of the commits? Well, Git actually stores all its objects on your file system. If you have a Git repository cloned, go look in the `.git` directory (it may be hidden). You will see a subdirectory called `objects`. This directory is basically a key/value store of the repository's objects.

So what is an object? Git has three different types of objects.

### Git blob

A `blob` is nothing more than the contents of a file. Blobs don't include filenames, location on the file system, or permissions. That information is stored elsewhere.

Git will package the file contents into a blob object, hash that object to get the filename, then store the zipped blob into the Git object store, using the hash as the key.

### Git tree

The second type of object in the Git data store is a `tree`. Trees are lists of files and directories, where each file is a pointer to a `blob` object, and each directory is a pointer to another `tree` object.

A typical tree object will look like this:

~~~
100644 blob 6d9259063726f9178e51a5336e49d4819d4524d6    .gitignore
100644 blob 4e7e80e76d650a091e24c02d727a6de824fdb29e    404.html
100644 blob 2adc0ed4760b0c17c3d8812b282b3d2dc9e119a4    README.md
100644 blob 1d91ff9d20194f0de4adeb2105ea2a72f35c4218    _config.yml
040000 tree 7a31baa899b0b64ccb55e829956e146e19f16bab    _data
040000 tree d564d0bc3dd917926892c55e3706cc116d5b165e    _drafts
~~~

The first column represents the file mode. Files can have one of five modes:

`100644`
: A regular readable, writeable file

`100755`
: An executable file

`040000`
: A subdirectory (or 'tree within a tree')

`160000`
: A Git submodule commit hash (which I have never used nor seen)

`120000`
: A symlink (which I have never used nor seen)

Then you have the type (`blob` or `tree`). Then a SHA, which is a pointer to a `blob` or `tree` object in the Git data store; then finally the name of the file or directory.

All these data are combined into one `tree` object, which is hashed, zipped, and stored in the Git object store, using its hash as its key.

### Git commit

Finally we get to the commit.

Commits are pretty simple to understand. Here's what one looks like:

~~~
tree 9276c1cddb477c64fea8445bdbe5f8389b4145ac
parent b0432ba07744b25a1ce196a47dce11ddba762046
author R. Michael Rogers <email@redacted> 1408997497 -0400
committer R. Michael Rogers <email@redacted> 1408997497 -0400

new post on a failed experiment
~~~

So, simply, when you commit something, Git stores the content of the file system (using `blob` objects), the structure of the file system (using `tree` objects), and then the overall `commit` object that points to the root `tree` and the `commit` that it was built off of (from the `parent`).

Above, that's a commit with the hash `4e85dbd08be22632c048c011c127e6ede048f3c0`, and it lives in the Git object store, zipped.

## So to view a commit...

To see what a commit looks like, you perform a `checkout` operation with the specific hash:

1. Git checks its object store, finding a `commit` object with that hash.
2. Git checks its object store, finding a `tree` with the commit's `tree` entry (`9276c1cddb477c64fea8445bdbe5f8389b4145ac` above).
3. Git recursively builds the commit's file system, pulling `blob`s and `tree`s from the pointers referenced in the root `tree`.

## How is this practical *at all*?

Dude, it's *not*. That's the point. It's *theory*. But now we know what a commit is, so when we talk about `rebase` there will be more context.

Which leads me back to my hypothesis, or a restatement thereof: by knowing the theory, we become more effective at the practice.

Look for upcoming posts on:

* Terms like `origin` and `master` are obtuse and make me angry[^3], and what's a `ref`?
* What is 'staging'? Why do commits need to be staged?
* How about branch/merge/rebase/squash/cherry-pick?
* Can `reflog` save my bacon?[^4]
* What about tools?

If you have any feedback or things I should add to the list, please let me know. I'll be testing this hypothesis over the next month or so and I hunger for data.

----

[^1]: Here is the [Wikipedia entry](http://en.wikipedia.org/wiki/Apache_Subversion) for Subversion. I recommend not looking.
[^2]: Either way, I'd probably [slash Gene's tires](https://i.chzbgr.com/maxW500/6164600576/h3D3E7644/){:target="_blank"}.
[^3]: I totes agree.
[^4]: The answer is: Yes. `reflog` can save ALL the bacon.
