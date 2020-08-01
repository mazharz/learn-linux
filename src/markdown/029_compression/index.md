---
layout: post
title: Chapter Twenty nine - Compression
pathToImage: ../../pic.jpg
---

I have no doubt that you had used a compression program before. On windows, Winrar seems to be the most popular. In Linux, we have similar programs as well, those graphical compression utilities that your distribution provides are actually really good. I have never had a single problem with them. So why should we learn to do it in the command line? We shouldn't, but we can. We are going to learn them so we can be doing the same thing if we ever need to. Like when you want to backup your website's data on your server, or when you want to write a script that automatically zips a file or directory. So let's jump right in.

## gzip

We'll start with the most Linuxy (or unixy) one. You usually don't see this on Windows. So let's start by making a file.

```bash
$ echo "this is a file" > file
$ ls -l
-rw-r--r-- 1 john john 15 Mar 27 13:29 file
```

And then:

```bash
$ gzip file 
$ ls -l
-rw-r--r-- 1 john john 38 Mar 27 13:29 file.gz
```

What the damn hell? well the original is deleted when you call `gzip` on the file. You can use your graphical application to open the file and you'll see that it contains only a file named `file` which is what we wanted. Now let's decompress it:

```bash
$ gunzip file.gz 
$ ls -l
-rw-r--r-- 1 john john 15 Mar 27 13:29 file
```

The file is back. Good, that is straight forward enough. But let's say we wanted to keep the original file. If you take a look at the man page, you'll see that there is an option there named `-c` which says "Write output on standard output; keep original files unchanged". Because we know how to redirect standard output into a file, we can do this:

```bash
$ ls -l
-rw-r--r-- 1 john john 15 Mar 27 13:29 file
$ gzip -c file
W'}^file+'',V'D''̜T.'Pf$ gzip -c file > file.gz

$ ls -l
-rw-r--r-- 1 john john 15 Mar 27 13:29 file
-rw-r--r-- 1 john john 38 Mar 27 13:36 file.gz
```

And if you use your graphical compression tool, you can see that there is no problem with it. I don't know if you noticed or not but our compressed file seems to be even larger than our original :| The reason behind that is that compression algorithms try to minimize size based on repetition and some other factors whilst adding a small overhead like how they did the compression. That is the reason why we see the size increasing here, because we didn't have a big enough file to have any repetition or anything and it also has to add it's metadata and stuff! But take a look at this:

```bash
$ echo "fffffffffffffffffffffffffffffffffffffffffffff" > file
$ ls -l
-rw-r--r-- 1 john john 46 Mar 27 13:47 file
$ gzip file 
$ ls -l
-rw-r--r-- 1 john john 30 Mar 27 13:47 file.gz
```

Now we see some compression, 46 bytes becomes 30. But enough about the things we won't need to know (honestly compression algorithms are awesome, but totally out of the scope of our discussion), let's learn the things we need. Before we go into the next discussion, there is an option called `-d` which you can use instead of `gunzip`. So you would use `gzip -d file.gz` to `d`ecompress instead of `gunzip file.gz`. Now let's compress some directories, go ahead and make a directory with two files in there:

```bash
$ tree
.
└── dir
    ├── file
    └── file2

1 directory, 2 files
$ gzip dir
gzip: dir is a directory -- ignored
```

Hmmm! We seem to be having a problem. If you look at the man page, you'll see that it explicitly says that gzip compresses files, but doesn't say anything about directories. So what should we do?

## tar

`tar` is an archiving utility, meaning it accumulates multiple files and directories into one file! So we can use `tar` to put them together and then compress the output of `tar`! I know, it seems ridiculous but please keep reading because it'll make more sense in a jiff!

```bash
$ tar -cvf dir.tar dir
dir/
dir/file2
dir/file
$ ls -l
drwxr-xr-x 2 john john  4096 Mar 27 13:52 dir
-rw-r--r-- 1 john john 10240 Mar 27 13:58 dir.tar
```

- `-c` for `c`reate
- `-f` for `f`ile to put in
- `-v` for `v`erbose (show us what you are putting in the archive file)

So now we have put the files together into a `tar` file, so:

```bash
$ gzip dir.tar
$ ls -l
drwxr-xr-x 2 john john 4096 Mar 27 13:52 dir
-rw-r--r-- 1 john john  182 Mar 27 13:58 dir.tar.gz
```

In both states (when it's `.tar` or `.tar.gz`) you can use your graphical compression tool to see the contents (notice the difference in size). But that seems ridiculous, a better way to do just this is to use only `tar` with the `-z` option which `gzips` the whole thing itself! :D I'm not a jerk, I just wanted you to see that you have more control, I could show you the easy way first, but now you know you don't HAVE TO compress to put some files together.

```bash
$ ls -l
drwxr-xr-x 2 john john 4096 Mar 27 13:52 dir
$ tar -zcvf dir.tar.gz dir
dir/
dir/file2
dir/file
$ ls -l
drwxr-xr-x 2 john john 4096 Mar 27 13:52 dir
-rw-r--r-- 1 john john  174 Mar 27 14:06 dir.tar.gz
```

And if you even want to see the content on your terminal:

```bash
$ tar -ztvf dir.tar.gz 
drwxr-xr-x john/john     0 2020-03-27 13:52 dir/
-rw-r--r-- john/john    28 2020-03-27 13:52 dir/file2
-rw-r--r-- john/john    28 2020-03-27 13:52 dir/file
```

And to decompress:

```bash
$ rm -r dir
$ tar -zxvf dir.tar.gz 
dir/
dir/file2
dir/file
$ ls -l
drwxr-xr-x 2 john john 4096 Mar 27 13:52 dir
-rw-r--r-- 1 john john  174 Mar 27 14:06 dir.tar.gz
```

This is the most common way to compress files and directories in Linux, but not the only way. In fact most files that a regular user deals with are in the form of `zip` and `rar` files. Surely we have tools to deal with those too:

## zip

This is the most common type of compressed file among all operating systems, even the decent android file managers are capable of processing it. So let's begin:

```bash
$ ls -l
-rw-r--r-- 1 john john 53 Mar 28 11:46 file
$ zip file.zip file 
  adding: file (deflated 6%)
$ ls
file  file.zip
$ ls -l
-rw-r--r-- 1 john john  53 Mar 28 11:46 file
-rw-r--r-- 1 john john 208 Mar 28 11:47 file.zip
```

You can also add more files like this:

```bash
$ zip file.zip file1 file2 ...
```

And to unzip:

```bash
$ rm file

$ unzip file.zip 
Archive:  file.zip
  inflating: file                    
$ ls -l
-rw-r--r-- 1 john john  53 Mar 28 11:46 file
-rw-r--r-- 1 john john 208 Mar 28 11:47 file.zip
```

Now try zipping a directory:

```bash
$ rm ./*
$ mkdir somedir
$ touch somedir/file1 somedir/file2
$ tree
.
└── somedir
    ├── file1
    └── file2

1 directory, 2 files
$ zip archive.zip somedir/
  adding: somedir/ (stored 0%)
$ ls -l
total 8
-rw-r--r-- 1 john john  166 Mar 28 11:50 archive.zip
drwxr-xr-x 2 john john 4096 Mar 28 11:50 somedir
```

Now try opening it with your graphical compression utility. You will see that the directory is empty! Why?

```bash
$ rm archive.zip 
$ zip -r archive.zip somedir/
  adding: somedir/ (stored 0%)
  adding: somedir/file2 (stored 0%)
  adding: somedir/file1 (stored 0%)
$ ls -l
-rw-r--r-- 1 john john  474 Mar 28 11:54 archive.zip
drwxr-xr-x 2 john john 4096 Mar 28 11:50 somedir
```

That's why! Not let's say we want to decompress into a specific directory, like when you specify the destination directory in your graphical compression utility.

```bash
$ rm -r somedir/
$ mkdir dirToStoreIn

$ unzip archive.zip -d dirToStoreIn/
Archive:  archive.zip
   creating: dirToStoreIn/somedir/
 extracting: dirToStoreIn/somedir/file2  
 extracting: dirToStoreIn/somedir/file1  
$ tree
.
├── archive.zip
└── dirToStoreIn
    └── somedir
        ├── file1
        └── file2

2 directories, 3 files
```

## rar

I almost always `unrar` stuff in contrast to `rar`ing them because I don't like rar as a compression utility, primarily due to it being a proprietary algorithm, which in this world (Linux) counts as a sucky solution. Anyway, to help discourage the use of `rar`, I will only show you the extraction commands. By the way, unrar is not installed by default on most distributions, so you have to do this if you're on ubuntu:

```bash
$ sudo apt install -y unrar
```

Don't worry about that command, we will talk about package managers in depth later :) Anyway, these are the commands:

```bash
$ unrar l archive.rar
$ unrar e archive.rar
$ unrar e archive.rar /destination/directory
$ unrar x archive.rar
```

The first one (`l`) will list the content of the archive file. Second, will extract files, but it doesn't keep the directory structure, meaning that if you had a directory in the archive with two files in it, the files won't be in the directory when extracted. In fact there wouldn't even be a directory extracted at all! So to keep the directory structure, you should use the `x` option instead.

## The other ones

There are many more compression algorithms and tools, but should we learn them all right now? Of course not! Whenever (if ever) we need them, we can easily search on the internet or even look at their man pages to see how they work. And usually, it's really simple and easy. But if you're too eager to learn, you can search for these commands:

- `bzip2`, `bzcmp`, `bzdiff`, `bzgrep`, `bzless`, `bzmore` (all are bzip-related utilities)
- `7zip`
- `xz`

## Conclusion

Good enough! Let's move on to more important stuff, namely users, groups and permissions!!!

