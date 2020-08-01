---
layout: post
title: Chapter Twenty six - System state information
pathToImage: ../../pic.jpg
---

What's going on generally in the operating system? Let's learn some commands to find that out.

## date

Aside from the silly stereotype that states this is the only date Linux users get, people use it to find the current date-time, both in regular usage and in scripts.

```bash
$ date
Mon 09 Mar 2020 07:16:01 PM +0330
```

So let's see some useful variations:

- `$ date +"%a" Mon`
- `$ date +"%A" Monday`
- `$ date +"%b" Mar`
- `$ date +"%B" March`

You get the idea. First we'll start with a plus sign, then in a literal string, we pass in the option we want. These options are stated in the man page under the `FORMAT` section. They are too obvious to expand here, so I'll leave you with the man page alone.

## cal

`cal`endar.

```bash
$ cal
     March 2020       
Su Mo Tu We Th Fr Sa  
 1  2  3  4  5  6  7  
 8  9 10 11 12 13 14  
15 16 17 18 19 20 21  
22 23 24 25 26 27 28  
29 30 31
```

I use this one on a daily basis! And there's a Jalali calendar which you can install too, it's called `jcal` (it's a persian calendar).

```bash
$ jcal
    Esfand 1398     
Sh Ye Do Se Ch Pa Jo
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29
```

The options that I use regularly are the same for both of them. So let's see the ones I use:

```bash
$ cal -3
   February 2020           March 2020            April 2020       
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
                   1   1  2  3  4  5  6  7            1  2  3  4  
 2  3  4  5  6  7  8   8  9 10 11 12 13 14   5  6  7  8  9 10 11  
 9 10 11 12 13 14 15  15 16 17 18 19 20 21  12 13 14 15 16 17 18  
16 17 18 19 20 21 22  22 23 24 25 26 27 28  19 20 21 22 23 24 25  
23 24 25 26 27 28 29  29 30 31              26 27 28 29 30        
                                                                  
$ cal -y
                            2020
      January               February               March          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                     1   1  2  3  4  5  6  7  
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   8  9 10 11 12 13 14  
12 13 14 15 16 17 18   9 10 11 12 13 14 15  15 16 17 18 19 20 21  
19 20 21 22 23 24 25  16 17 18 19 20 21 22  22 23 24 25 26 27 28  
26 27 28 29 30 31     23 24 25 26 27 28 29  29 30 31              
                                                                  
       April                  May                   June          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                  1  2      1  2  3  4  5  6  
 5  6  7  8  9 10 11   3  4  5  6  7  8  9   7  8  9 10 11 12 13  
12 13 14 15 16 17 18  10 11 12 13 14 15 16  14 15 16 17 18 19 20  
19 20 21 22 23 24 25  17 18 19 20 21 22 23  21 22 23 24 25 26 27  
26 27 28 29 30        24 25 26 27 28 29 30  28 29 30              
                      31                                          

...
```

## uptime

```bash
$ uptime
 19:30:58 up 36 min,  1 user,  load average: 0.72, 0.78, 0.73
$ uptime -p
up 36 minutes
```

The first column is the current time. After that is the actual uptime (how much your computer has been awake). Then the number of logged-in users and finally the load average. What is load average? Think of it as how much your system has been utilized. If you have a dual core CPU, your load average must be smaller than or equal to 2. If you have a 6 core cpu, less than or equal to 6. You get the idea. If it's more than that, there is too much load on your system. But that's not all it is. Try moving a lot of files to another disk and you'll see that whilst your CPU is not too much worked up, your load average goes insane. I remember having a load average of 9 on a 4 core cpu while only one of the cores worked hard. The reason being that load average also counts the tasks that are waiting to be executed, so because disks are usually slower than CPUs (much slower), then the CPU waits for the disk (I/O) to do its job (copy files or dirs). Also the `-p` option prints the uptime in a pretty manner!

## uname

```bash
$ uname -a
Linux u6untu 5.3.0-40-generic #32-Ubuntu SMP Fri Jan 31 20:24:34 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
$ uname -r
5.3.0-40-generic
```

The name comes from "unix name" (I just searched it now, I had no idea why it was called that). It gives you a good amount of information such as kernel name (Linux), node name (hostname that you set at the installation time), kernel release (5.3.0-40-generic), etc. You know where to look if you need to know the other options it's got. Just note that the operating system (at the end) is stated to be `GNU/Linux` so the guys in favor of "GNU/Linux" over "Linux" won here. Usually when you sit at a unix-like operating system, you immediately execute that to see what kernel you're dealing with (yes we have kernels other than Linux).

## lsb_release

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 19.10
Release:	19.10
Codename:	eoan
```

This one prints the distribution-specific information. Really useful to see what distro you're dealing with.

## dmesg

"Print or control the kernel ring buffer. The default action is to display all messages from the kernel ring buffer." That's man page's words not mine. Basically when your operating system starts up, the kernel will load. And at that time, there is no other program to take care of what is going on (to log it), so the kernel takes care of that herself. And what you see as the output of `dmesg` is usually generated by the device drivers (like graphics card).

## journalctl

I saved the best for last. `journal` `c`on`t`ro`l`. This one is the most informative of all, simply because it takes care of the system logs. The simplest form of use is obviously with no arguments. Keep in mind that the newest results are printed at the top (so it's in reverse order of what happened). And then there is the `-b` which lists the logs since the last boot, meaning from the moment you turn on your system (notice now we are seeing the results in regular order :/).

```bash
$ journalctl -b
...
```

Interestingly, using a negative number can show you logs from previous boots:

```bash
$ journalctl -b -1
...
```

You may want to know which boot logs you want:

```bash
$ journalctl --list-boots
-6 621c502d809b4893970112d154407a30 Sun 2020-03-08 10:13:27 +0330--Sun 2020-03-08 10:25:41 +0330
-5 568de285c62443ffa8e988143351307e Sun 2020-03-08 10:26:20 +0330--Sun 2020-03-08 14:24:11 +0330
-4 21dc3cb9787b4022b7e977669a94cae6 Sun 2020-03-08 14:24:32 +0330--Sun 2020-03-08 14:26:30 +0330
-3 aee4007eb0b44f82849c1393a7ef2e32 Sun 2020-03-08 14:26:56 +0330--Sun 2020-03-08 16:16:50 +0330
-2 4b740f9b9c1443feb9dd8ded22cc81b5 Sun 2020-03-08 16:28:12 +0330--Mon 2020-03-09 00:55:31 +0330
-1 52c1415491814d768a04ff07478115a4 Mon 2020-03-09 09:32:40 +0330--Mon 2020-03-09 17:32:29 +0330
 0 80e2e4a3c36a431c8f6c382620399149 Mon 2020-03-09 18:55:03 +0330--Mon 2020-03-09 20:15:50 +0330
```

You can see that yesterday I have been using my laptop from 10 to 16 with a couple of reboots there. You can also use the ID in the second column:

```bash
$ journalctl  -b 4b740f9b9c1443feb9dd8ded22cc81b5
...
```

You can also filter by timestamps but I'll leave that one for yourself. However, an interesting option is `-u` which stands for `u`nit.

```bash
$ journalctl -u virtualbox.service --since today
...
```

This one lists today's logs generated by `virtualbox`. If you wonder where do you find the names of units, you can execute `systemctl`:

```bash
$ systemctl
```

The first column would be the name of units. If you wonder what `systemctl` is, you should be a bit more patient. In later lessons you'll meet him. Back to `journalctl`, if you're like me and lazy to learn all the options, you may need to use this next one:

```bash
$ journalctl -a
```

This way you get all the information that `journalctl` has. And to find what you're looking for, just use the search functionality that less has. Simply hit the forward slash (`/`) and type your keyword(s). Though this is not the ideal approach, it's useful in cases where you know that the log contains a very specific keyword.

## Conclusion

We learned how to see what is going on in the system. In the next lesson we learn a few commands to control our system (it's going to be a short lesson).


