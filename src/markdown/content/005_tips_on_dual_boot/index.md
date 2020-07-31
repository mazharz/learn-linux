---
layout: post
title: Chapter Five - Tips on dual boot
pathToImage: ../../pic.jpg
---

As I said before, if you're a beginner, consider using virtualization instead. But if you're still here and you are about to tell me to shut up! Then alright, continue.

## MBR / GPT

First, you need to know about your disk's partition table. Think of the partition table as the meta-data of your disk. It holds information about the disk itself, as well as links to the actual data on the disk. Master Boot Record used to be the only choice for ages, but the GUID Partition Table came to the rescue. Basically MBR has many limitations, such as being able to create only 4 primary partitions. GPT doesn't have these limitations and it's just better and easier to work with (new is always better?). Why am I telling you this? Because you need to find out which of these partition tables your main disk has. Just search for it and figure it out yourself.

## BIOS / UEFI

Just like before, "Basic Input Output System" is the older fellow and "Unified Extensible Firmware Interface" is the new one. And just like before, you need to find out which of these your computer has. Just search for it and figure it out yourself.

Now let me tell you something, using MBR with BIOS and GPT with UEFI is the best approach to install, you can mix and match but it wouldn't go as smooth.

## Bootloader

This is the software that starts everything after you hit your computer's power button. It loads the init system and then that loads the kernel and so on. I would suggest going with GRUB (which is what most distributions use).

If you're using something like Ubuntu, you are likely to have the install made super easy for you. Most of the time, Ubuntu detects your current OS and tries to install itself beside that. All you need to do is to free up some space for it (online dual boot guides all tell you how to do that). Just remember, NEVER format the disk that you have your data on, options like "erase disk and install Ubuntu" will do just that, they warn you though, so at least read the warnings thoroughly.

## Conclusion

This chapter doesn't really guide you that much, it's just meant to make you familiar with the concepts you need to know. I'm specifically not giving you instructions so that you won't get excited and mess up your system. Once you learn Linux, you'll gather the skills that you need, to do it on your own. If you're willing to install Linux via dual boot, you must be willing to do some research and learn more. I could just copy and paste from Arch Wiki or other useful resources, but I won't :) I just gave you the hint that you should check ArchWiki in case you need it ;)

