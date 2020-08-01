---
layout: post
title: Chapter Thirty three - More on bash
pathToImage: ../../pic.jpg
---

At this point, you should be quite comfortable with the command line. This command line of ours, in most Linux distros, is `bash`. So let's jump right in and see different features and characteristics of it.

## ;

The semicolon. In programming, you know semicolons to be the last character of some lines of code! To put it more precisely, it is put at the end of statements. In `bash`, a semicolon does more or less the same job. It separates commands, sort of defining the border of commands. Take a look at the example below:

```bash
$ echo a echo b
a echo b
```

Here `bash` is struggling with recognizing where a command ends and the next begins. If you recall, I told you that spaces are separators of arguments for programs. In this case, `echo` is doing a favor of accepting many arguments and stitching them together with spaces (I literally went ahead and read through the source code to figure this out). So naturally, `bash` passes "a", "echo", and "b" as arguments to our `echo` program. But my initial aim was to print "a" and then another "b". To tell `bash` that this is what we want, we should instruct him with putting a semicolon between our commands. Just like this:

```bash
$ echo a ; echo b
a
b
```

Obviously, there is no limit on how many commands you run in this way (or is there?). I honestly don't know if there is a limit and I don't really care :D It's not important, because you rarely need to do this. If your chain of commands gets too much, you're better off putting them in a file and run the file instead (that is what a script is).

## !!

That's right! Double exclamation marks! Go ahead and try it (If it were me, I wouldn't just trust me, but this one is really safe):

```bash
$ echo 'hey world'
hey world
$ !!
echo 'hey world'
hey world
```

Simply reruns the previous command. But there is more to it:

```bash
$ ls -a
.  ..  somefile
$ ls -l
-rw-r--r-- 1 john john 0 Apr 19 19:40 somefile
$ history | tail -n 3
 2023  ls -a
 2024  ls -l
 2025  history | tail -n 3
$ !2024
ls -l
total 0
-rw-r--r-- 1 john john 0 Apr 19 19:40 somefile
```

See? The number that `history` prints on the left side of it's output can be used to rerun that specific command using an exclamation mark. Although that may be useful, there is even a better version:

```bash
$ ls -l
-rw-r--r-- 1 john john 0 Apr 19 19:40 somefile
$ cd ..
$ !ls
ls -l
...
```

Using the name of a previously executed command, you can rerun it with an exclamation mark. As we saw before, we can use `Ctrl+r` to do a search which is far more helpful, but these are also methods to execute a more recent command.

## && and ||

The two ampersands mean "logical and" and the two pipes mean "logical or". To better understand this, take a look at this:

```bash
$ ls && echo 'hi'
Desktop    Music   Pictures
...
hi
$ ls aslkdjflkasdj && echo 'hi'
ls: cannot access 'aslkdjflkasdj': No such file or directory
$ echo a || echo b
a
$ echo a || echo b; echo c
a
c
```

In the first two, we told `bash` to run `ls` *and* `echo`. So the first line runs `ls` and then runs `echo`. But when `ls` fails in the second example, the `echo` isn't executed at all. So `bash`, when presented with multiple commands with `&&` in between them, will start from the left and execute them, if any one of them fails, it abandons the execution of the rest.

The second two sets of commands represent the "logical or". In contrast, an "or" means either of the options. So `bash`, when confronted with a set of commands with `||` in between them, is going to start from the left and execute the commands, whenever he runs a command successfully, it abandons the rest. Logically the reverse process. The last example represents how we can stop this behavior with a semicolon.

## Sub-shell

Oh boy! This is a power tool :D It is amazing! I'll shut up so you can see it for yourself:

```bash
$ ls $(echo .; echo /)
.:
file1 file2
...

/:
bin   cdrom  etc   lib
...

```

What happens is that the dollar sign launches a sub-shell, runs the commands that we pass it, then puts the output of those commands as arguments of the command of the outer shell. The above example is as if we were to execute `ls` twice, once on the current directory and another time on the root directory. Don't be fooled to think that is the only use case. Another example that just popped in my head is this:

```bash
$ cat file
audacity blender
$ sudo apt install $(cat ./file)
```

I know we haven't seen `apt` yet, but think of it as a program that installs software. This way, we could have a list of space-separated program names in a file (such as `audacity` and `blender` above). Then install them all at once via that command and with the help of a sub-shell.

## env, set and printenv

A variable is something that you can put some value in. Sort of like a bowl. Environment variables are bowls that are used in the environment! Basically there are variables in your operating system that are set through different mechanisms and they are used by different programs to achieve certain results. You know that every command you run is a program of some sort. The reason these are called environment variables is because the commands you run are run in an environment (namely, shell). This shell has some variables set into it. Just like that. So let's actually see them:

```bash
$ echo $HOME
/home/john
```

Here we use `echo` to print a variable's content. The name of this variable is `HOME` and it's content is the path to our user's home. In bash, when we want to use a variable, we use a dollar sign to indicate that the following will be the name of our variable. Let's set a variable of our own:

```bash
$ myvar="woohoo"
$ echo $myvar
woohoo
```

Now let's see the environment variables that are out there. We have three commands to do so:

- `env`: displays all the global environment variables
- `printenv`: displays all the global environment variables
- `set`: displays all the environment variables (global and local)

And the way we set our variable above was a local method. So the output below should make sense:

```bash
$ env
SHELL=/bin/bash
HOME=/home/john
USER=john
...

$ env | grep myvar
$ printenv | grep myvar
$ set | grep myvar
myvar=woohoo
```

So let's define a couple of global ones too:

```bash
$ export PLAYER=barney
$ echo $PLAYER
barney
$ set | grep PLAYER
PLAYER=barney
$ env | grep PLAYER
PLAYER=barney
```

Environment variables usually change the behavior of commands or provide additional features. I'm sure you remember when we opened the `sudoers` file with `gedit`, we had to change the `EDITOR` environment variable. Another use case of directly modifying an env var may be setting proxy for the command line applications:

```bash
export http_proxy="http://localhost:1234"
```

## which

I have told you about this one before, it locates a command. Simply to find out where is the ls command, you can execute this:

```bash
$ which ls
/usr/bin/ls
```

## whereis

If you take a look at the man page, this one not only finds the executable, but it also finds it's manual page and it's source (if available):

```bash
$ whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

You see, man pages are stored in a `gzip` file :D A little bit more knowledge everyday. Imagine how much you will learn about your operating system in 10 years.

## read

To put some user input in a variable:

```bash
$ read -p "who are you? " name
who are you? nonofyourbusiness
$ echo $name
nonofyourbusiness
```

Why would you need such a command besides in scripts? Let's say you are using a command which needs a password to be given as an argument. You could save your password this way and put the variable as the argument instead:

```bash
$ echo "this is a regular way to provide" "password"
this is a regular way to provide password
$ read -s pass
$ echo "this is a better way to provide" $pass
this is a better way to provide password
```

The first command is given two strings, one of which we assume is password (literally written as "password"). To prevent typing the password in a terminal like this, we can use the `-s` option of `read` and give it the password to store in a variable. `-s` causes `read` to prevent showing the string on the terminal. After running the `read` command I gave it "password" as input, but it's not shown here obviously, so you have to try it for yourself to understand what I'm talking about.

## alias

> Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.
> - Oscar Wilde

Let's create some masks:

```bash
$ alias whisper='echo "sssss"'
$ whisper
sssss
```

We can literally make up any command, a clever one that I saw a while ago was this:

```bash
$ alias please="sudo"
$ please ls
[sudo] password for john:
bin Desktop 
...
$
```

Just note that these are discarded after closing your terminal. To make them last, you need to add them to your `~/.bashrc` file located in home. Note that there are `aliases` there if you're using a distro like Ubuntu. For instance:

```bash
$ cat ~/.bashrc | grep alias
# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

So have fun making some clever ones and if you did, share them so we can all be lazier :D

## Conclusion

That was hell of a chapter. Good job. I promise the next chapter will be as short as possible (maybe even the shortest).

