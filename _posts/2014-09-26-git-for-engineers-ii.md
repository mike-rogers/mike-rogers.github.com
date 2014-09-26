---
layout: post
title: "Git for Engineers, Part 2: The Stage"
category: 
tags: []
---

* [Part 1: Commits]({% post_url 2014-09-16-git-for-engineers %})
* {: .active} [Part 2: The Stage]({% post_url 2014-09-26-git-for-engineers-ii %})
{: .pagination}

## Review

This series explores the hypothesis that _learning the fundamentals of a tool is important to our understanding and correct use of the tool_. The corollary is, of course, _by knowing more we likely won't screw up as catastrophically_.

In [Part 1]({% post_url 2014-09-16-git-for-engineers %}) we went over how Git stores commits in the object model, and what exactly a SHA represents.

Today I'd like to type words about the process of creating a commit, which involves an abstract location called _the stage_. You may immediately think "Staging? Really? I've been using Git for `${duration}`. I think I *know* how to staging."

Go ahead and read anyway. You may appreciate the thing at the end. Foreshadowing!

**Aside**: Some people refer to this concept as "staging", as in "the staging area". I have also heard "the stage", "to stage changes", "put those changes in staging", "put those changes on the stage", and "man your beard is super handsome". I am now experiencing the phenomenon called [semantic satiation](http://en.wikipedia.org/wiki/Semantic_satiation) with regard to the word 'stage'.
{: .aside}

## Intro to staging

This part might be insulting. Bear with me.

Let's say you have a blank, newly-created repository and you have created some files that you want to commit. Try to `commit` without `staging` first.

Nothing happens.

"Nothing?!" you might say. "What sense does that make? And what does 'staging' mean anyway?"

**Staging** is the intermediate step where you select the individual files you want to include in your commit. This may seem like an overcomplication to the commit process ("why not just include _everything_?"), but I enjoy the low level of granularity. It gives you the freedom to individually and explicitly build what your commit looks like, giving you a level of control beyond the previous generation of source code management software (I'm looking at *you*, CVS).

**Aside**: One of the absolute strengths of *any* Source Code Management software (and especially Git) is the ability to craft your commits to be *valuable*, for a certain definition of *value*. Those who are using an SCM more casually may typically just have a throwaway commit message (sometimes even gibberish) associated with an arbitrary snapshot of the code ("I haven't committed in a while"). In more rigorous environments, commits can represent a highly regimented snapshot of work being done, traceable to a code review, a task in an [ALM](http://en.wikipedia.org/wiki/Application_lifecycle_management) tool (such as [JIRA](https://www.atlassian.com/software/jira) or [TFS](http://www.visualstudio.com/en-us/products/tfs-overview-vs.aspx)), a set of tests, and even a formal requirement. Additionally, I try to `squash` commits strategically to make sure that every commit makes sense in the context of current development, cleaning any 'convenience commits' I may have made along the way (the `squash` operation will be covered in a later part).
{: .aside}\

Now, I said that the stage is _intermediate_. It's important to understand that the stage represents one of three _very distinct_ and _very important_ sets of the files in the context of your repository:

1. **The commit**: the canonical snapshot of how files existed during the last commit operation, which is captured in the Git object store
1. **The stage**: the snapshot of the files as they _will be committed_ during the _next_ commit operation, which is captured in _the stage_
1. **The working directory**: the snapshot of the files as they are on the file system

When you separate the files into these three buckets you can more easily visualize the operations necessary to flow from one bucket to another. When you have a file in your working directory that you want staged, you use the `add` command[^1]. When you want to preserve the snapshot of the stage, you create a commit.

Three buckets. Awesome. Moving on.

## Advanced staging

This part is hard to describe.

Did you know that the staging area is never[^2] empty? The staging area implicitly contains the contents of the previous commit. You might initially reject that notion if you've seen the output of the `status` command after a `commit` or `checkout` operation[^3] (hint: it's empty). The reason you don't see those implicitly added files in the output of the `status` operation is that Git will only show the _differences_ between the staging area and the current state of the file system.

The concept of implicitly staged content is important because of how it fits in with the mental model we developed in the previous section. Commits are _comprehensive_, meaning that they contain all the information necessary to rebuild the snapshot of the file system at the point of the commit. Each `commit` object references a `tree` object that references `blob` objects that represent all the files in your commit. This comprehensive, **non-delta** representation[^4] of commits is why staging is so important, and why staging needs to hold the snapshot of the previous commit.

I hope that made sense, because I rewrote this section five times. The short version is: _staging implicitly holds everything from the previous commit, because commits are built from staging and have to reference everything comprehensively_.

Of course, if staging holds everything, that means staging must be some kind of file or data store, and must live somewhere on the file system.

So, where does Git look for the staging area?

## Staging and the index file

This part seems too nuts-and-bolts until you screw it up.

The `index` file is a special file (in the `.git` directory) that contains all the information for files within the staging area. When you check out a specific commit, `index` is auto-populated with all files tracked by that commit. The `index` file is what's compared against your current working directory whenever you execute a `status` command to see what's been changed. It's the file that's updated with an `add` or `remove` command.

**Aside**: For more information on what the `index` file contains, see the [specification](https://github.com/git/git/blob/master/Documentation/technical/index-format.txt) available in Git's own source code.
{: .aside}

Why is it important to understand that the stage is captured in the `index` file? Two reasons:

1. Without the `index` file and its implicit population of the files in the previous commit, you would have to `stage` every file for every commit, regardless of whether the file's contents had changed
1. More importantly, if you screw up your `index` file, **bad things can happen**

Story time!

### The Git index file and bad things

Working on a fairly sizeable, complex project distributed across half a dozen teams, we had one guy (probably me) accidentally zero-out his `index` file and commit it.

Take a second and, based on the information above, guess what happened when he pushed that commit to `origin`. Try not to think about the 'Jeopardy' music.

Okay, what happened? Since `index` represents the staging area, which is auto-populated with all the files for the commit you've checked out, zeroing out that file effectively *removes all files from the staging area*. By creating a commit with an empty `index` file, the commit was associated with a `tree` object that contained no `blob` objects. That commit had effectively removed[^5] all the files in the project.

Pushing that commit to `origin` presented us with a logistical problem which we will discuss in a future article. It suffices to say that we lost a non-trivial amount of time in fixing that error, mostly due to our shoddy response to it. And, having gone through the whole thing we are now obligated to spread the tale so nobody replicates the mistake.

## What have we learned?

The intent of these articles is to expose the underpinnings of a tool that we use heavily on many projects, and in doing so to hopefully give us the context we need to avoid any egregious missteps. By more fully understanding how staging and the `index` file interact with commits, and that commits are comprehensive, we've set the stage for better dealing with more advanced things like considerate rebasing (_i.e._, how not to rebase like a jerk) and getting your repository to a good state after screwing something up locally.

FUNDAMENTALS!

One more aside and then I have to get back to looking for someone to play Ping Pong with:

**Aside**: Some people swear by the method of `interactive staging`, which is a technique I'm pretty sure is reserved for the command line. One of my goals in this series is to avoid explaining the various Git clients and how they are used. My hope is that, by developing a shared language and mental model for the internal workings of Git, individuals will be able to choose the clients that suit them and their projects. Anyway, stepping off my soap box, check out this link, which details [interactive staging](http://git-scm.com/book/en/Git-Tools-Interactive-Staging).
{: .aside}

----

[^1]: There's a reason I mentioned the `add` command but not `remove`. We need more context before we talk about removing things from staging because removing things can be destructive. There are dragons here; do not tread lightly.
[^2]: The staging area is never empty **unless** the repository is spanking new or you've explicitly removed all files.
[^3]: The output of a fresh `status` command is empty (although it may contain 'untracked' files), from which one could easily conclude that there's "nothing" in staging. This conclusion is slightly wrong and needs massaged.
[^4]: Commits are by default comprehensive. If you optimize your repository (using garbage collection) or push/pull to/from a remote server, you may end up with a `packfile` which _may_ use a delta notation in some cases. We may discuss that in the vague future. Or not.
[^5]: Words are hard. I don't think 'remove' is the right word, but 'erase' and 'delete' don't seem to cut it either. The important distinction is that the files hadn't been [balefired](http://en.wikipedia.org/wiki/One_Power#Balefire) from the repository; they still existed in previous commits. In the current commit, however, their presence is lacking.
