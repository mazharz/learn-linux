---
layout: post
title: Chapter Sixteen - Copy, move and file types
pathToImage: ../../pic.jpg
---

Copying files or directories or moving them from one place to another. This was most of my experience with operating systems when I was a 9-year-old kid. These might not be your day-to-day commands, but you'll need them eventually. If you're planning on learning scripting in the future, you'll need them even more. Let's jump in.

## cp

`c`o`p`y:

```bash
$ cp source destination
```

For example:

```bash
$ touch original
$ cp original acopy
$ ls -l
-rw-r--r-- 1 john john 0 Nov 22 10:08 acopy
-rw-r--r-- 1 john john 0 Nov 22 10:07 original
```

Of course we can use paths to copy from or to different places:

```bash
$ cp original /home/john/Desktop/somefile
```

The command above will copy the file "original" to `john`'s desktop and also rename it to "somefile". But if we execute this:

```bash
$ cp original /home/john/Desktop
```

The file will only be copied there, so now we have two identical files in `john`'s desktop, one named "original" and the other named "somefile". This behavior of the `cp` command is very interesting. To better memorize it, you can think of it this way. If you copy a file and your destination is a directory, then the file will be copied into that directory, but if you copy a file and your path points to a non-existing file, the file will be copied to the parent directory and renamed. For instance, here we copied the "original" file to "/home/john/Desktop/somefile". `cp` tries to find a directory named "somefile" inside `john`'s desktop, but since it can't find one, it will instead put the file in his desktop and rename it to "somefile". Anyway, now if you try to copy a directory with it's belongings, you'll get the error indicating that you haven't specified the `-r` command. And now you should be familiar with what that does. So to copy a non-empty directory:

```bash
$ cp -r Desktop newDesktop
```

## mv

`m`o`v`e:

```bash
$ touch /tmp/afile
$ mv /tmp/afile /home/john
```

That will move the "afile" file to john's home (and keep the name) but the command below will also rename the file:

```bash
$ mv /tmp/afile /home/john/movedfile
```

So that special behavior of copy applies to move too. Now we can use that feature to interestingly rename a file:

```bash
$ /tmp/afile /tmp/somefile
```

Since there is no "somefile" directory in our `/tmp` directory, `mv` will realize that it should move the "afile" file to `/tmp` (moves it to the same place it was) and then rename it to "somefile". So we moved a file to where it was but renamed it, hence we just renamed the file. But `mv` has a fundamental difference when it comes to recursive option, and that's because it doesn't need one. To move a non-empty directory, just use it the regular way and you'll be fine:

```bash
$ mkdir /tmp/somedir
$ touch /tmp/somedir/file
$ mv /tmp/somedir ~
```

## file

Let me show you something:

```bash
$ ls -l
-rwxr-xr-x 1 john john   18824 Sep 19 13:43 apt
-rw-r--r-- 1 john john       0 Nov 22 10:07 original
-rw-r--r-- 1 john john 3356274 Nov 14 21:04 some
-rw-r--r-- 1 john john     409 Nov 21 18:30 another
```

What do you think each file is? You can never realize that by the size or any other information that `ls` gives you. You can also open each file with all your applications and hope for the best. There is a better solution, his name is `file`.

```bash
$ file apt
apt: ELF 64-bit LSB pie executable, ...
```

`file` tells us that this is an executable file. That's all we need to know, now let's try the others:

```bash
$ file  original
original: empty
$ file some
some: Audio file with ...
$ file another
another: ASCII text
```

Now we know we should open "some" with a multimedia player and "another" with a text editor.

## Conclusion

Compared to other chapters, this one was a relatively short one. The reason is that you have a knowledge base that makes things easier to grasp, so I don't need to explain as much as I did in the early chapters. If you're into dividing up this book, I can tell you that here is the end of our beginner's section. We'll be talking about more interesting stuff from here, like streams, processes and so on. Don't be intimidated by the names because they're really not a big deal. They're just less obvious because you may not have heard of such concepts before. For example, you always knew what copy meant and you just learned how to do it in the terminal, but for example when we talk about streams, you need to understand the concept first. I promise I make it as simple as possible, but don't expect to be seeing 2 + 2 = 5 :D Maybe a math joke to end this chapter with?

```bash
              0 = 0
        12 - 12 = 15 - 15
      4 (3 - 3) = 5 (3 - 3)
(2 + 2) (3 - 3) = 5 (3 - 3)
          2 + 2 = 5
```
