---
layout: post
title: "Git Bash prompt awesomeness"
category: 
tags: []
---

It's no secret that I prefer the old school. I'm writing this post in EMACS; I like C (a lot); I was once yelled at for trying to install an ASP.NET MVC application by toggling the IL directly into the server's Front Panel...

... and I **love** the command line.

## Command line lovin'

Why do I love the command line? Let me `wc -l` the ways...

For starts, I have fairly poor vision, which makes interacting with the mouse a gambit at times. I have to slide my glasses down my nose so I'm using the correct part of the progressive lens; then I have to get just the right distance away from the monitor. Only then can I tell that I'm about to click on the wrong pixel.

So for pure leave-the-mouse-behind-and-get-in-to-the-groove speed, nothing beats the command line. I prefer `bash`, which uses EMACS key bindings for things like 'end of line' (`C-e`), 'beginning of line' (`C-a`), 'cut to end of line' (`C-k`), 'paste' (`C-y`), and so forth. Also, I've mapped capslock to another control key, so my fingers never really need to leave home row.

But for me the killer feature is being able to manipulate the prompt itself. I cut my teeth on MSDOS (I used it in the 3.0's, but I used 5.0 the most), and I still remember modifying `autoexec.bat` to update the prompt with: `prompt $p$g`

These days you can do so much more.

## Hey guys, check out my Gits

My shell prompt is pretty boring in most areas:

![Plain ol' prompt](/assets/images/git-prompt/prompt-plain.png "Plain ol' prompt")

But if I navigate into a Git repository the prompt will change:

![New hotness](/assets/images/git-prompt/prompt-git.png "New hotness")

Check out the component parts:

![Component parts of the shell](/assets/images/git-prompt/prompt-git-subdir.png "MSPAINT: I WANT TO WATCH THE WORLD BURN")

You'll notice the following characteristics:

8. < _username_ >@< _hostname_ >
8. `Git` indicator. Yep, we're in Gitland
8. Name of Git repository (or best guess thereof)
8. Directory within the Git repository
8. Branch
8. Status indicator

The current status indicator, a green plus sign, means everything is clean. No stashes, no staged changes, no untracked files.

![Pending changes, untracked files](/assets/images/git-prompt/prompt-git-pending-untracked.png "Pending and untracked changes")

This prompt indicates that there have been changes made to tracked files (that have not yet been staged). This is the dull yellow 'u'.

There's also an untracked file that's slipped into the repository somewhere. You can tell by the red 'u'.

![Changes staged](/assets/images/git-prompt/prompt-git-staged.png "Staged changes")

This prompt indicates that there are no untracked files and that all changes have been staged for commit. That's what that green 's' means.

![Stashed changes](/assets/images/git-prompt/prompt-git-stashed.png "Stashed changes")

A yellow 's' means changes have been stashed and are waiting to be popped. For you that stash.

## Witchcraft!

No, I'm no warlock. Just some guy who ~~AVADA KEDAV~~ uh, wait, let me show you how to put it together.

### First, BASH it up in BASH town

You'll need BASH. I installed [Git](http://msysgit.github.io/) through [Chocolatey](http://chocolatey.org), which presented me with a great BASH prompt.

### Next, download this script

The following script is the prompt massager. It's where all the magicks are. Download this into your home directory under `.ps1_prompt`.

[Check me out, I'm a script](https://gist.github.com/mike-rogers/8906700)

I really want to embed that Gist into this entry, but it looked terrible when I tried it.

### Plug it into `.bashrc`

If you don't have a file called `.bashrc` in your home directory, go ahead and create one. Add the following line:

```bash
source ~/.ps1_prompt
```

### Restart the shell

Or just type `source ~/.ps1_prompt`.

## Awesome.

I couldn't agree harder.
