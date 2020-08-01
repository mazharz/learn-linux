Ready to learn more? I would like to give you a bit of information on command line applications first.

# What's a command?

A command is either a program or a script (technically there are other stuff but not important here). A program is written in one of the programming languages (there are like hundreds of them) and then compiled into a binary file to be executed by the machine. On the other hand, a script is a file containing instructions which are translated into binary when run. So all in all, command is some sort of software that can be called to be executed. Calling a program is as simple as typing it's name in front of the prompt.

# What is an argument?

It means additional data (options) that we pass to the command to customize it's behavior. Passing arguments in bash shell is as simple as writing the desired options after the command (with a space separating them). Take a look at this example:

```bash
$ command argument another-argument
```

Here we've passed two arguments to our command. Now that we know the basics, let's start actually seeing these in action.

# history

history is a command that tells us what commands were executed in bash. To see that it actually does that, run some nonsense commands like this:

```bash
$ blah
blah: command not found
$ blah blah
blah: command not found
$ blah blah blah
blah: command not found
$ _
```

Notice how the command is called `blah` in all three cases. Why? Re-read above more carefully. And now try running the history command:

```bash
$ history
```

What you'll see is the list of all the commands that you have executed from the moment you installed your operating system listed in the order in which you executed them. But sometimes, you need to see only a couple of previous commands that you executed. To do that, you can pass an argument to the history command. The argument can be the number of previously executed commands. Just try it to see what I mean:

```bash
$ history 5
```

You'll see that the four last commands that you executed along with the current command (the `history 5` itself) will be shown. Note that `history` doesn't keep an unlimited number of commands. This is usually limited to a finite but considerably large number. Now this is good enough to see a list of commands, but what if you wanted to quickly execute one of those commands (the ones that history shows you)? You can do that with your arrow keys! You know, the keys that have an arrow on them? They're between your numpad on the right and the main keyboard section. Hit the up key and you'll see one by one, you will go higher in that same history list. This is extremely helpful to quickly run the previous command, or modify just a little part of it without writing the whole thing from the start.

Remember I told you about some shortcuts to move in the line? There are two shortcuts for up and down arrow keys as well. They're `^p` and `^n` which stand for previous and next. You may think to yourself that the arrow keys are a lot easier! Why the hell should these be considered shortcuts? To answer that, I will suggest that you learn "touch typing". A great deal of touch typing is to keep your hands on the home row keys. If you have no idea what I'm talking about, it doesn't matter, just ignore this paragraph and go on. But if you want to learn, just search for touch type and learn it to type faster and without the need to look at the keyboard :D

Now before I go on to the next topic, I got to show you one more interesting feature. History command is great, but you need to search in it. There is a shortcut to search. Just hit `control+r` and you'll see your prompt changing to "`(reverse-i-search)`". Now type "blah" and you'll see it finds your previously entered blah command, now if you hit enter it'll run that command for you. And if you want to go further back searching for it, just keep hitting that `control+r`. If you want to alter the command you found, just hit the right or left arrow keys (or their shortcuts). There is a way to search down (if you go too far and want to come back down) but that needs some extra configuration and making sure that `control+s` isn’t reserved for some other function.

<p class="note">If you’re curious about the "control+s" thing, it pauses the output of the terminal. Why? You see, in vintage ages, there weren’t any graphical interfaces. So people needed to stop the output for a moment in order to inspect it (using "shift+page up" or "shift+page down"). If you ever get stuck in that paused mode, use "control+q" to get out of it.</p>

# man

This command is what you'll be using for the rest of your life, without a doubt. It's short for manual. Basically any decent command line program should have a man page describing the use of it. Let's see it in action:

```bash
$ man history
```

Here we passed `history` as an argument to the man command. This will cause man to show us the man page of history. To get out of a man page just hit `q` and you'll be dropped back where you were. man even has a page for itself describing itself! Just type:


```bash
$ man man
```

Now use your up and down arrow keys to scroll the man page (most terminal emulators support using the mouse scroll to scroll man pages). Now let's see some points on reading a man page:

- A man page usually starts with a summary of the command.
- `SYNOPSIS` is a high-level view of the options and arguments that command accepts.
- In `SYNOPSIS`, anything inside brackets `[ ]` will mean that that's an optional argument.
- There is usually a description of what the command does.
- Sometimes, you'll see examples of the use of that command.
- The most important part of a man page is it's `OPTIONS` section.

Let's go down a little bit and find the `OPTIONS` section (in man's man page that you just opened). Find the option `-k, --apropos`. First, the short version of an option is written (here the `-k`) and then the long (descriptive) type (here `--apropos`). These two are exactly the same, so it's up to you which to use, they both offer the same functionality. In the next lines, you'll see a description of what this option does. In this case, the option will search in the man page descriptions. So let's see it in action:

```bash
$ man -k something
```

Or:

```bash
$ man --apropos something
```

You'll notice that this will be printed out:

```bash
preconv (1) - convert encoding of input files to something GNU...
```

<p class="note">Note that results can be different based on the distribution and it’s version, the reason being that different programs may or may not be installed by default.</p>

You'll see that the command we typed, searched for the phrase "something" in all the man pages and gave us one that matches (here "something GNU..."). Now try it with a different keyword to see that the list could be much longer:

```bash
$ man -k file
```

So whenever you're stuck to figure out what command is about this kind of thing that you want to do, just use this option with "man" to get what you want. I don't know if you noticed or not, but in the `man`'s man page, it said that this option is the same as `apropos`. That doesn't mean that we have a long version of the option (`--apropos`), instead it's actually talking about the command `apropos`. Try this and you'll know what I'm saying:

```bash
$ apropos something
```

Now, whenever I fail to give you a good description of a command, or you're just told to run a command you don't know, just check the man page to figure out what it is and how you should be using it. But sometimes, this isn't possible, some commands don't have a man page! What should we do then?

# -h and --help

These two options are usually (not always though) “help” in command line programs or scripts. For example, type this:

```bash
$ man -h
```

You'll notice that some sort of help is printed in your terminal window showing the most useful options that you can use with that specific command (here "man"). In case of `man` the `--help` will do just the same, but in other programs they might be printing different helps.

```bash
$ man --help
```

# What if even those two aren’t available?

In some extremely rare cases, you’ll notice that there is no man page, no `-h` and even no `--help`! In these situations, go ahead and first search for a man page or a documentation online (use your beloved search engine) and if that fails too, then you should do the following:

- Find out where the file is! (we will see `which` command later to do this)
- Open the file with a text editor and see if it’s a script or a program
  - If it’s a script, you’ll see the code, sort of english-alike statements
  - If it’s a program, you’ll see lots of garbage symbols that make no sense
- If the file is a script, you should either try to read it or search for readme files or anything else in your disk (for example some programs put their documentation in `/usr/share/doc`)
- If the file is a program, you should look for it’s source or a readme file
- If you’re stuck with a program with no source or even a readme file somewhere, think twice before running it, it can be anything, literally anything!

<p class="note">Note that the situation above is extremely rare and chances are that you’ll never experience it, but you should be informed at least once.</p>

# Conclusion

This lesson was mostly teaching you how to get information when you're lost. Some sort of teaching you how to catch a fish, instead of catching one for you! Whenever you're feeling lost about something, refer to man pages and refresh your memory. Hell! nobody remembers all these commands and options that they've got. But you need to get familiar with some of them to be able to search for what you need. For instance here you learned that man gives you information. From now on, all I will do is to give you a taste of the most important commands that you'll need to know about along with the concepts that you need in order to understand them. I can never cover all the options and arguments, we will only dip our toes in the ocean of possibilities. So I'll hope to see you in the next lesson with a lot more energy and a smile on your face. I mean, I can't see you, but you know... :/

