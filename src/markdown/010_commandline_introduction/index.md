---
layout: post
title: Chapter Ten - Command-line introduction
pathToImage: ../../pic.jpg
---

Reader, command line, command line, reader. That's it! end of chapter. Bye. If you guys know a good psychologist, just let me know :/ Let's pretend you didn't read my extremely not funny introduction. OK! Let's get to know the command line. Why is it called "command line"? Because it's a line that you put commands in! If you want a black and white analogy, a command line is the black to those white GUIs (Gee Eu Aai, I hate it when people call it gooi :P). There are terminal emulators that give you this command line interface. Just fire up one and tell me what you see. I can't hear you so I'll tell you what I see instead, mine is a window with dark background and colorful text:

```bash
username@hostname:~$ _
```

This is called a prompt, because it prompts you to enter something, or in other words, it waits for you to type something and hit enter to execute it. You have probably seen this in Mac or Windows too but in Linux, you'll do most of your serious tasks in here. This terminal emulator of yours runs a program called `shell`. Shell is the program that runs commands for you and gives you back their outputs. So visually, there is no difference between a terminal and a shell. In most Linux distros, your default shell is called bash. Don't worry about learning all the shells! Learning one is enough to be working with all of them. These are some other famous shells:

- zsh
- fish
- powershell

Yes, the last one belongs to Windows. Hey, did I mention that Mac also uses bash? So reading this book will benefit you even over there.

## Why should we bother with learning the command line?

### It's powerful

One can delete all the pictures in a directory using only one command:

```bash
$ rm .jpeg *.jpg *.png
```

<p class="warning">
Note: don't try the commands until you're introduced with what they do, I just wanted to give you a taste here.
</p>

### Learn once, use forever

Once a command line program (command) reaches maturity, it's very unlikely that it'll change the way it works. For example, the command you saw above was like that when I first started learning Linux and it's still the same. And if you can install that program elsewhere, it'll be exactly the same. But you can literally see graphical interfaces change dramatically between monthly updates.

### logging nature

Remember what a log file was? Logging means telling what you're doing while you're doing it. Command line applications are usually more informative than graphical ones. For example, if you launch firefox from your application menu and if it happens to have a problem, you won't know what happened, literally nothing happens. But type "firefox" in the terminal and hit enter:

```bash
$ firefox
```

And now if you close firefox some sort of warning will be shown in the terminal. Notice how you won't get the prompt back until you close firefox. Also note that from now on, I'll be referring to prompt by just a dollar sign, same as above.

### depends on less utilities

I'm sure that you have tried to install something and you got an error about another program or library not being installed. That means your desired program depends on a dependency (another program). Command line applications need very little number of dependencies compared to graphical ones. Hell, even if your graphics card is broken, you can launch a Linux without graphics and use the command line utilities.

### It's cool!

Hackers and experts use the command line all the time. This was in fact one of my reasons to learn it when I was just starting out XD It's dumb but it's true.

### Some applications only have CLI versions

For now, you don't need to worry about this at all. But there will be times, in the future, when you hit a situation that can be only resolved with a command line application that doesn't have a GUI front-end. Once I wanted to recover a scratched CD (those round things that used to store data like a million years ago!), the only program that saved my life was dd with some special arguments (options) that no graphical application did provide.

### You can automate your system with scripts

These same commands that you'll learn in this book can be used in scripting. A script is a set of commands that will be executed one after the other. For example, you can write a script to occasionally look for some sort of file in your system and tell you about it! Sort of like a monitoring program.

## OKAY!!! I'll learn the goddamn thing, now tell me what the hell was that prompt?

Easy tiger! Let me start with that dollar sign.

```bash
username@hostname:~$ _
```

That means you are using a regular user. If you were using the root user, it would've looked like this:

```bash
root@hostname:/home/username#
```

I'm not telling you how to become root yet, because you should learn which are the dangerous commands before gaining full control. Right before that prompt character ($ or #) is the directory you are in. Shell, just like a file manager, is always in a directory. When you start it, it's in your user's home by default. A user's home is illustrated by the tilde character (~). But other user's homes are not shown like that, take the example above when I changed my user to root whilst staying in the same directory (`username`'s home directory) you can clearly see that it changed from `~` to `/home/username`. The rest of that prompt is self-explanatory. The user's name comes at the beginning and after an @ comes the host's name (computer's name).

## Some essentials

In later chapters, we're going to learn different programs to work with. But bash has some features that you need to learn right now to be more efficient. Let's start with `control+c`. Run firefox again with this command:

```bash
$ firefox
```

Now firefox is going to run. Now go back to your terminal and hit `control+c`. See? Firefox is closed. That's because `^C` (`control+c`) terminates the current running application (which in this case was firefox that we ran). Now let's see another one, `control+d`. With an empty prompt, if you hit that, you'll notice that the terminal is closed (try and see if `control+c` does the same). That's because `control+d` tells the shell that you're done sending your input, hence the prompt exits the shell when it realizes you're done sending input. To see another example, let's try out the `cat` who plays the shadow games (repeats whatever you say). Type the command below and hit enter:

```bash
$ cat
```

Now if you start typing and hitting enter, you'll see that it repeats whatever you type. To tell the cat that you're done sending your data (you're done playing the shadow game), just use `control+d`.

It's enough! You've done way too much here. I just want to finish this introductory lesson with some movement shortcuts. Write an arbitrary sentence into your prompt (but don't hit enter). Now try these to move around:

- Use `^A` (`control+a`) to go to the beginning of the line.
- Use `^E` (`control+e`) to go to the end of the line.
- Use `alt+f` to go forward one word.
- Use `alt+b` to go backward one word.
- Use `^F` to go forward one character.
- Use `^B` to go backward one character.
- Use `alt+backspace` to delete one word before the cursor.

## Conclusion

This was your entrance to the world of the command line. I know it can be difficult right now, but resist the urge of abandoning. I assure you, you'll begin to love it when a certain threshold is passed. Take a longer break before starting the next chapter to prevent burnout. Before I go, let me tell you one more command:

```bash
$ exit
```
