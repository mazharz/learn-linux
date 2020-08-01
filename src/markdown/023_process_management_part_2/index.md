---
layout: post
title: Chapter Twenty three - Process management part 2
pathToImage: ../../pic.jpg
---

Let's jump in, shall we?

## bg

It's short for `b`ack`g`round. But in order to be able to use it, we should first learn how to suspend a process. First, run a `sleep` command:

```bash
$ sleep 1h
```

Now, let's say we want to push this process to the background so that we can execute another command. We can do that by suspending it first. To suspend a process, just use the `Ctrl+z` key combination. Now you'll see that it tells you the process is stopped.

```bash
$ sleep 1h
^Z
[1]+  Stopped                 sleep 1h
```

If you want it to continue in the background instead of being in a suspended state, you can type `bg`. Go ahead and do it:

```bash
$ bg
[1]+ sleep 1h &
```

## jobs

According to its man page it displays status of jobs in the current session. By session it means the current shell environment (you can think of it as the current terminal). If you execute it right after opening a new terminal, you'll see that it does nothing. But now that we pushed a process to the background, it'll tell us this:

```bash
$ jobs
[1]+  Running                 sleep 1h &
```

Now let's push one more process to the background. This time we execute a `two-hour sleep` so it's different from the other one:

```bash
$ sleep 2h
^Z
[2]+  Stopped                 sleep 2h
$ jobs
[1]-  Running                 sleep 1h &
[2]+  Stopped                 sleep 2h
$ bg
[2]+ sleep 2h &
$ jobs
[1]-  Running                 sleep 1h &
[2]+  Running                 sleep 2h &
```

## fg

Now, I want to bring back those processes. What should I do?

```bash
$ fg
sleep 2h
_
```

Why was the `two-hour sleep` brought back? If you pay close attention to the output of `sleep`, you can see that it indicates that the latest process we executed was the one with a plus (`+`) in front of it's number (which is the `two-hour sleep` here). Let's push the current process to the background and bring the other one to our foreground:

```bash
^Z
[2]+  Stopped                 sleep 2h
$ bg
[2]+ sleep 2h &
$ jobs
[1]-  Running                 sleep 1h &
[2]+  Running                 sleep 2h &
$ fg 1
sleep 1h
_
```

## background control operator (&)

What if we want to execute a process in the background from the very beginning?

```bash
$ sleep 3h &
[3] 16868
$ jobs
[1]   Running                 sleep 1h &
[2]-  Running                 sleep 2h &
[3]+  Running                 sleep 3h &
```

Also, if you execute a simple ps with no arguments, you can see these `sleep` processes. That's because they are all executed in the same shell:

```bash
$ ps
  PID TTY          TIME CMD
15028 pts/3    00:00:00 bash
15327 pts/3    00:00:00 sleep
15628 pts/3    00:00:00 sleep
16868 pts/3    00:00:00 sleep
17574 pts/3    00:00:00 ps
```

## disown

First execute a `ps` from another terminal to see these `sleep` processes:

```bash
$ ps -ef | grep sleep
john   15327 15028  0 11:24 pts/3    00:00:00 sleep 1h
john   15628 15028  0 11:28 pts/3    00:00:00 sleep 2h
john   16868 15028  0 11:45 pts/3    00:00:00 sleep 3h
john   17950 17630  0 11:50 pts/2    00:00:00 grep --color=auto sleep
```

Now close your terminal that you executed the `sleep` processes in and execute the same `ps` from that other terminal:

```bash
$ ps -ef | grep sleep
john   17997 17630  0 11:51 pts/2    00:00:00 grep --color=auto sleep
```

Why did they all get killed? Because their parent (the shell that they were executed from) was killed. So let's prevent that with `disown`. Close all your terminals to prevent confusion, then open two terminals, in the first execute this:

```bash
$ sleep 5h & disown
[1] 18417
```

And then see if it's running from the other terminal:

```bash
$ ps -ef | grep sleep
john   18417 18127  0 11:53 pts/2    00:00:00 sleep 5h
john   18732 18441  0 11:53 pts/3    00:00:00 grep --color=auto sleep
```

Now close the terminal which you executed the `sleep` command in and run the same ps again:

```bash
$ ps -ef | grep sleep
john   18417     1  0 11:53 ?        00:00:00 sleep 5h
john   18761 18441  0 11:54 pts/3    00:00:00 grep --color=auto sleep
```

See? now that `sleep` command is independent from it's parent. So it will continue to run in the background even when the terminal from which it was executed, is closed (killed). I usually use this when I want to open a google chrome with it's proxy set:

```bash
$ google-chrome --proxy-server=localhost:9050 & disown
[1] 19706
```

## Conclusion

Very good. You now have a good-enough understanding of the processes in a Linux system. Of course, if you want, you can get deeper and learn about things like the `nice`ness of a process or other concepts. This is enough for a Linux user to be able to handle his/her processes on a daily basis. And also, in desktop environments you still have the task manager :D So if you're lazy, you can use that instead. I wanted to teach you the hard way to do it, so you are not afraid if you ever need to handle your processes in a Linux server that doesn't have any graphical interface.

