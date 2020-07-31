---
layout: post
title: Chapter Twenty two - Process management part 1
pathToImage: ../../pic.jpg
---

I'm 99% sure that you had an experience with your computer not responding and "hanging". There are so many reasons why such a thing happens, but the most common reason is that a process (running program) is doing too much that occupies a lot of CPU resources. That leads to your operating system's slow down and horrible user experience. So here we learn how to control processes. In windows, you probably know the task manager and you may have used it to end (kill) a process. Here we are doing the same thing from the terminal.

## sleep

Let's sleep! There is a command called `sleep` which does exactly that. We call it so it can sleep. It gets an argument as it's input which is the amount of time it should sleep. This is how we use it:

```bash
$ sleep 3
$ sleep 1m
$ sleep 1h
$ sleep 1d
```

I personally never used the latter two! Anyway, the postfixes should be self-explanatory. Now let's execute our first one-hour sleep command (we will need it):

```bash
$ sleep 1h
_
```

<p class="note">Note: Keep that terminal running and open a new one to continue with the other commands.</p>

## ps

I used to memorize it as `p`rocesse`s` but you are going to use it so many times that you even forget how you used to memorize it! Simply running it doesn't really give us any useful information:

```bash
$ ps
  PID TTY          TIME CMD
32174 pts/2    00:00:00 bash
32463 pts/2    00:00:00 ps
```

These are the two processes running in our terminal, `bash` shell and the ps command itself. The only useful column is that `PID` which stands for `P`rocess `ID`. `PID` is how we distinguish commands from each other. We may be running two bash shells at the same time, so their names aren't useful of course. The `PID` on the other hand, is a unique attribute of a process. Now let's give ps some useful options. The most useful set of options are these two:

- aux
- -ef

I'm not going to bore you with what each option is because you can read the man page easily. But let's see what the columns of the former are:

```bash
$ ps -ef | head -n 1; ps -ef | grep sleep | head -n 1
UID        PID  PPID  C STIME TTY          TIME CMD
john      1748  1380  0 15:36 pts/3    00:00:00 sleep 1h
```

First let's see what I have done with that command. There are mainly two commands there, before semicolon (`;`) and after it. In the first one I filtered only the first line of `ps`' output so that we can see the name of columns and then in the second one I searched for `sleep` which we executed before (in another terminal) and then I removed the `grep` command itself by filtering to show only the first line. Now let's talk about the columns, the `UID` is obviously the `U`ser `ID`, and I just talked about `PID` above. The `PPID` is the `P`arent `PID`. If you take a look at `ps`' complete output, you'll see that the `bash` process is the parent of our sleep command. The other columns aren't any useful for you now, so you can just forget about them. Only the last one which shows the command itself is important to remember.

## pstree

Now `ps` is great to see the detail of processes, but what if we want to see a visual representation of the hierarchy in which the processes are placed. Sort of like the family tree. Then we use `pstree` for that. You can clearly see there that the `pstree` command is a child of `bash` which itself is a child of your terminal. In my case, it's `xfce4-terminal` because I’m using `XFCE4` at the moment.

```bash
        ├─xfce4-terminal─┬─bash───sleep
        │                ├─bash───pstree
        │                ├─bash
        │                └─3*[{xfce4-terminal}]
```

You can even see that I have three instances of `xfce4-terminal` opened.

## exec

Let me introduce you to a very useful command, let's say you want to download a file and then close the shell you are in. Simply prepend the command with `exec` and it'll replace the shell (`bash`) with that command, meaning that when the command is finished executing, the terminal will close, because there is no more shell for the terminal to run. Try it like this:

```bash
$ exec sleep 3
```

Your terminal window should be closed after three seconds since by using `exec` you are replacing `bash` with the `sleep 3` command and when `sleep` is finished, your terminal has nothing else to do, hence the closing.

## kill

To end a process, we `kill` it. Let's kill that old `one-hour sleep` that we have in the other terminal:

```bash
$ ps aux | grep sleep | head -n 1
john      1748  1380  0 15:36 pts/3    00:00:00 sleep 1h
$ kill 1748
```

First we find the process by `grep`ping the output of `ps`, then once we know the `PID`, we simply pass that number to our kill command. Now go ahead and check the sleep command. You should see it end and print "Terminated" on the terminal.

When we use `kill` by itself, based on it's man page, we are actually telling it to gracefully shut down those processes (the `PID`s that we pass to it). That's because `kill`'s default signal is "TERM". To see all the signals, just use this:

```bash
$ kill -l
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
...
```

As you can see, the `SIGTERM` (default) is number 15. But what we are mostly interested in is the number 9 (`SIGKILL`). That's the most dangerous one. If I want to simplify the difference between these two, I better use an analogy:

You are a kid who loves programming and has been in his/her room for 5 hours straight. Now your friend tells you to stop it and get out of there for a while. This is how `SIGTERM` works, the kernel asks the program to shut itself down. But if your friend is too worried and comes in your room and forcefully removes you from your chair, then that could be how `SIGKILL` works. Dear kernel will forcefully ignore everything and remove the process from memory.

It's pretty self-explanatory that you shouldn't use the `SIGKILL` out of nowhere (unless you are in a hurry), you should first ask the process to shut down, and if it ignores you, then you can use the `SIGKILL` force. I highly recommend that you search for signals to have a better understanding of them.

## killall

Let's make a mess! Open three terminals and in each, run one `sleep` command (`1h` is good since it waits a long time). Now what happens if we want to kill all of those? We should get their `PID`s and then pass them all to kill. Something like this:

```bash
$ ps aux | grep sleep | head -n 3
john      7885  0.0  0.0  24012  844 pts/2    S+   16:31   0:00 sleep 1h
john      8182  0.0  0.0  24012  772 pts/3    S+   16:31   0:00 sleep 1h
john      8478  0.0  0.0  24012  780 pts/4    S+   16:31   0:00 sleep 1h
$ kill 7885 8182 8478
```

What if there were a thousand of these? Then we would be miserable. Fortunately, we have a command called `killall` which kills processes based on their names. So above, when we used `kill` with three arguments (the `PID`s), we could've just used this one simple command instead:

```bash
$ killall sleep
```

## Conclusion

Alright! Now you know the most important things to be dealing with processes, but you still need to know more to feel comfortable with them. The next chapter will talk about playing with processes more directly.

