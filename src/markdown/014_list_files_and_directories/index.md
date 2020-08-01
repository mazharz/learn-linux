---
layout: post
title: Chapter Fourteen - List files and directories
pathToImage: ../../pic.jpg
---

A fundamental feature of a file manager is that it shows you what files and directories are where you are. In the command line, similarly, we can list those files and directories. Let's learn to do that.

## ls

`l`i`s`t! Open a terminal and execute it without any arguments:

```bash
$ ls
Desktop   Downloads Pictures Templates
Documents Music     Public   Videos
```

You can see that it prints out the name of directories in your home. You can also give ls a path to be listing the files there instead. For example to list the files in root (`/`):

```bash
$ ls /
bin   cdrom  etc
boot  dev    home
...
```

Now let's see some options:

- -l (long)
- -a (all)
- -t (time)
- -r (reverse)
- -h (human-readable)
- -i (inode)
- -S (sort by size)

Now let's see them one by one. We'll start with the first, long format listing:

```bash
$ ls -l
total 52
drwxr-xr-x  2 john john 4096 Nov 17 22:19  Desktop
drwxr-xr-x  2 john john 4096 Nov  8 00:29  Documents
drwxr-xr-x  3 john john 4096 Nov 19 10:30  Downloads
...
```

As you can see the output of this long version is quite detailed. First column is about permissions (which we'll discuss later) but for now you need to know that the first character specifies what type of file it is. For example here they're all `d`, That means they are directories, if they were dashes (-) that means that they're files. Second column (the number) is the number of links to that directory or file (we also will learn this later when we get to links). The third column is the user owner of that file or directory. The fourth is the group to which the directory belongs (each user has his own group that's why here the output is the same). The fifth column gives us the size of that file or directory, as you can see here directories are usually 4KB. Next column is the date and time in which that file or directory has been modified. And the last column is the name of our file or directory. Now let's list the hidden files or directories:

```bash
$ ls -a
.             .tor   Desktop
..            .vim   Downloads
.bash_history .local Templates
...
```

You can see that we have files or directories that start with a dot. A dot at the beginning of the name of a file or directory means that it is hidden. In your file manager hitting `control+h` will reveal these files but in the command line `ls -a` does it. Note that we can see those two shortcuts that we talked about before (. and ..). Now we could even combine the two options to get the detailed listing of all the files (including hidden ones):

```bash
$ ls -al
total 212
drwxr-xr-x 34 john john  4096 Nov 19 19:42  .
drwxr-xr-x  3 root root  4096 Nov  8 00:25  ..
-rw-------  1 john john 15382 Nov 20 08:31  .bash_history
...
```

Note that the upper directory (`/home`) belongs to root instead of our user. And also note the `.bash_history` file starts with a dash. I suggest you try and see what's in that bash history file. Remember you can use less:

```bash
$ less .bash_history
```

Now let's see that time option:

```bash
$ ls -lt
total 52
drwxr-xr-x  4 john john 4096 Nov 20 08:14  Desktop
drwxr-xr-x  3 john john 4096 Nov 19 10:30  Downloads
drwxr-xr-x  2 john john 4096 Nov 18 12:06  Videos
...
```

And the reverse with time:

```bash
$ ls -ltr
total 52
drwxr-xr-x  2 john john 4096 Nov  8 00:29  Templates
drwxr-xr-x  2 john john 4096 Nov  9 08:03  Public
drwxr-xr-x  2 john john 4096 Nov  9 09:35  Music
...
```

And now the human-readable option:

```bash
$ ls -lha
...
-rw-------  1 john john  13K Nov 20 08:46  .viminfo
drwx------  3 john john 4.0K Nov 17 13:31  .tor
...
```

You can see that the file sizes are now in KB which is really much easier to read than the number of bytes, specially when we have big files like these:

```bash
$ ls -l
total 9016328
-rwxr-xr-x 1 john john 7135559680 Sep 26 12:50 CentOS-8.iso
-rwxr-xr-x 1 john john 2097152000 Apr 20  2019 ubuntu-19.04.iso
```

Instead it would be like this:

```bash
$ ls -lh
total 8.6G
-rwxr-xr-x 1 john john 6.7G Sep 26 12:50 CentOS-8.iso
-rwxr-xr-x 1 john john 2.0G Apr 20  2019 ubuntu-19.04.iso
```

This next one is not yet for you to understand! I'm just going to show you what it does, later when we talk about links, we come back to this option and actually see it's meaning.

```bash
$ ls -li
...
662686 drwxr-xr-x  2 john john 4096 Nov 17 22:19  Desktop
662726 drwxr-xr-x  2 john john 4096 Nov  8 00:29  Documents
...
```

Note that another column has been added before the permissions (the first column). This number is called `inode` and we will learn what it is later on. Now let's see a very useful option, sort by size:

```bash
$ ls -lSh
total 3.3M
-rw-r--r-- 1 john john 3.3M Nov 14 21:04  file.mp3
-rw-r--r-- 1 john john  287 Nov 17 22:19  todo.txt
```

You can also reverse the order to get the bigger files at the bottom using the reverse option:

```bash
$ ls -lShr
total 3.3M
-rw-r--r-- 1 john john  287 Nov 17 22:19  todo.txt
-rw-r--r-- 1 john john 3.3M Nov 14 21:04  file.mp3
```

## tree

This program is not installed by default but we can install it easily. Just execute the command below and don't worry about it because we'll learn what it does later (this works on debian-based distros):

```bash
$ sudo apt install tree
```

You must enter your password. After it gave you your prompt back, execute it:

```bash
$ tree
```

You will be seeing something like this:

```bash
$ tree
.
├── Desktop
├── Documents
├── Downloads
├── Templates
└── Videos
```

Now try this instead:

```bash
$ tree /
```

You will see an incredibly huge output, that's because `tree` will recursively go into every directory and print them all. If it's still going, use `control+c` to stop the `tree` program. But what if we wanted to list only two levels of directories and files using this beautiful tree program? Let's take a look at the man page, shall we? Search for `-L` option and read what it says about it.

```bash
$ tree -L 2 /
```

See? how easy it is to learn command line options and programs? This `tree` command will be helpful when you're trying to make sense of the structure of nested directories.

## Conclusion

In this lesson we learned that we can list files or directories in the terminal just as we can see them in a file manager. That's it for now :)
