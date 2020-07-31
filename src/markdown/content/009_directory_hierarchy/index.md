---
layout: post
title: Chapter Nine - Directory hierarchy
pathToImage: ../../pic.jpg
---

Here we are, finally starting to learn Linux. By now you should have a Linux installed so that you can follow along (learn by doing). Now let's see why we should learn the directory hierarchy. Remember that I told you in Linux, we have most of our configurations in the form of text files? So to change the setting of an application we might need to locate its configuration file and change a part of it. So we should be able to find it. This chapter gives you the basics of where you should be looking in order to find what you're looking for. Before you begin reading, fire up your Linux system, open up the file manager and navigate to the root directory. Here is how to find it in different desktop environments:

- Gnome: first go to the `other locations` on the left side panel and then select `computer` in your disks (you'll see a `/` on the right hand side of that)
- KDE: it's on your left side panel labelled as `root`
- XFCE: it's called `File System` on the left side panel

## /

A normal forward slash, in Linux, is called `root`. In Linux, everything is placed in a tree structure. Compare this to Windows' directory hierarchy in the figure below:

![An image representing Linux directory hierarchy](./directory_hierarchy.svg)

Everything is in root. Note that a slash doesn't mean root EVERYWHERE. A slash is used to divide the name of nested directories. For instance, `a/b` means that there is a directory called `a` which has another directory inside it, called `b`. But in this phrase: `/a/b` the first slash means root. This means there is a directory named `a` inside root, which itself holds another directory called `b`. Note that `b` in both examples can be a file too, but i just thought i simplify which i now regret because i had to describe this additional sentence :D Now let's see what directories are in this root of ours.

## /bin

Not surprisingly, bin stands for binary. Computers understand only ones and zeros, so in order for computers to be able to run something, they should be able to read it in binary (zeros and ones). These files are usually stored in directories called `bin`. This has become some sort of standard, you are likely to see this `bin` in many more places. For example when working with libraries in programming, you might find yourself in need of running the files in a `bin` directory inside that library's sub-directories.

## /boot

What is needed for the system to boot up is right in this directory. This includes the kernel and some other init files. In case you didn't know, boot is the process of starting a computer and loading the operating system.

## /dev

Devices. These are pseudo files that provide a way to control devices. For example `/dev/sda` will point to the `iScsi Disk A` which you can read as the first disk. Similarly, `/dev/sdb` means the second disk and so on. Note that not everything here is actually pointing to a physical device. For example, later when we encrypt a disk, we'll find ourselves working with `/dev/mapper/blah` which is a gate through which we work with encrypted disks (the actual disk would still be in the form of `/dev/sdX`).

## /etc

This one doesn't have a self-explanatory name! Here is where we can find most configuration files of different programs.

## /home

Ah, home sweet home. This is where the home of all the users are held. For instance, if your username is `john` you can find the directory `/home/john` which means that there is a `john` directory inside your `home` directory which itself is inside `/` (root). The home of a user is where the local stuff is stored. For example, system-wide configuration files for a program are stored in `/etc` but the local ones for each user can be stored in `/home/john/.config`.

## /lib

This is where the libraries are stored. A library is a piece of software that can be used by many other programs. For example, when you write a simple program to read something from keyboard and just print it on the screen (the second lesson of every programming tutorial) you are going to use libraries that simplify the reading from keyboard and analyzing low-level codes. Libraries prevent us from re-inventing the wheel.

## /mnt

A temporary mount point. You can use this directory to mount partitions manually. Mounting is something that we're not familiar with yet so don't worry about it.

## /opt

This is where third-party applications usually put their files in. For example, I remember in college i had to work with the stupid android studio (uughh), it's files were stored in `/opt`.

## /proc

Processes. This is where running processes store their temporary files. You don't really want to change these files manually unless you really know what you're doing. A process is a running instance of a program. So for example, vim is a text editor, so it's a program. But when you run vim, an instance (a copy) of it, is moved to RAM and that is called a process.

## /root

This is the home of the `root` user. This is a different root from the `/`. In every Unix system, there is a user that has literally all the privileges, this user is called root. In case you didn't notice, when you root your android phone, you are enabling the access to this user, so that you can do stuff that you are normally not privileged to.

## /sbin

System binaries.

## /srv

Some protocols use this directory as a place to store their data (for instance, ftp and http). A protocol is a set of rules defined for some sort of communication. For example, HTTP is a HyperText Transfer Protocol which is used in the web to transfer web pages.

## /sys

System! One of the directories that I don't describe because you don't need to know it in the scope of this tutorial.

## /tmp

A temporary directory for all users. In some distributions, this directory is completely wiped after reboot.

## /usr

A secondary hierarchy. You'll notice that inside this directory, there are similar directories that you find in `/`. For instance, we have `bin`, `lib`, `sbin`, etc. In most distros, you'll notice that the `lib` for example, is just a link (shortcut) to `/usr/lib`. This is to simplify the structure and avoid the sparseness. But distros don't completely remove those shortcut directories because that may cause old programs to crash (this is called backward-compatibility).

## /var

Variables are usually here. That includes the log files, database files, email spool, etc. Log files are important and we'll get back to them whenever possible. Suppose you are cooking and you write down everything that you do. For example you write down, "made the dough, sliced the mushrooms, made marinara, …". This is the equivalent to a log file. Programs (the good ones) usually write down what they're doing so that in case of errors, a system administrator (or a user) can take a look at the log files and figure out what went wrong.

## Conclusion

After exploring these directories using your file manager, you are ready to continue with the next chapter, where we will be diving into the command line interface :D Just one more thing, you can take a longer break here. I think you should be exploring the programs and just becoming more and more familiar with the graphical parts of Linux. My suggestion is that you should customize your settings, open different programs and just try to learn all you can using just trial and error :) Basically try to do what you normally do (in your Windows machine) on a daily basis.

