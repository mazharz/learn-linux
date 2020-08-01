---
layout: post
title: Chapter thirty four - Actually print in terminal
pathToImage: ../../pic.jpg
---

What I mean by printing is actual print on a piece of paper! Not useful or anything but it's just really cool to be able to interact with the real world with just the command line. Or maybe it's just that I'm a geek! Hopefully not.

## Set up your printer

If you don't have one, then just forget about this chapter. But if you do, then install the `cups` package. It's a print server so we definitely need it. On Ubuntu, it's installed by default but it may not be on other distros. So do your research and get it working. You may also need to install the drivers for your printer based on its manufacturer. Mine is HP so I installed `hplip` which is horrible! Buggy graphical interface, sucky command line one, it's just not that good :) Of course this is in case of an actual OS not a virtual one, you probably will be able to do it via a virtual machine too, but I haven't tried it. Anyway, you should be able to print using your graphical applications (libreoffice or document reader), then try the following.

## lpstat

This is the command to query your printer's name:

```bash
$ lpstat -p
Printer HP_LaserJet_Professional_P1102 is idle. Enabled since ...
```

In my case it's `HP_LaserJet_Professional_P1102`. You'll need that for the last command so that you can specify which printer to print on.

## pr

This is just to prettify the text, write something in a file:

```bash
$ echo "chandler and monica" > file
$ cat file
chandler and monica
$ pr file


2020-04-21 22:26                       file                       Page 1


chandler and monica
...
$ pr file > printVersion
```

If the content of your file is long, you'll see how it gets separated into pages but for our purpose, this is just fine. Now we have a file called `printVersion` which is ready for print.

## lpr

Super simply:

```bash
$ lpr -PHP_LaserJet_Professional_P1102
$
```

Yes, it's THAT easy! Well I mean considering the pain of printer setup, it may not be, but generally it is easy and straightforward.

## Conclusion

As I promised, the shortest chapter :) So I'm not going to lengthen it with the conclusion!

