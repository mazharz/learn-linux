---
layout: post
title: Chapter Twenty five - Disks and mounting
pathToImage: ../../pic.jpg
---

Consumer users may not need to learn how to work with disks but any decent user must have the basic understanding of how they work and how to manipulate them. In fact users who wish to be able to install distros like Arch or Gentoo must definitely be comfortable with disks as they need to do their partitioning themselves since these distros do not provide any guided partitioning tool to do it for them.

## lsblk

`l`i`s`t `bl`oc`k` devices.

```bash
$ lsblk
NAME                  MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
sda                     8:0    0 931.5G  0 disk  
└─sda1                  8:1    0 931.5G  0 part  
  └─mzd               253:3    0 931.5G  0 crypt /home/john/mzd
nvme0n1               259:0    0 119.2G  0 disk  
├─nvme0n1p1           259:1    0   512M  0 part  /boot/efi
├─nvme0n1p2           259:2    0   732M  0 part  /boot
└─nvme0n1p3           259:3    0   118G  0 part  
  └─nvme0n1p3_crypt   253:0    0   118G  0 crypt 
    ├─vgubuntu-root   253:1    0   117G  0 lvm   /
    └─vgubuntu-swap_1 253:2    0   976M  0 lvm   [SWAP]
```

The output above may intimidate you at first, but rest assured, there is nothing special about it. That is not what most users see when they execute this command. The reason being that I have both my disks encrypted and that causes this mess of output. And to be fair that is not something everyone will need, so I am not going to talk about any of it, neither `lvm` nor `dm_crypt`. If you are interested, you can learn them on your own (Arch wiki can be a good resource, tough this is done with Ubutnu’s auto installation tool). You may see something similar to this:

```bash
NAME                  MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
sda                     8:0    0 931.5G  0 disk  
└─sda1                  8:1    0 931.5G  0 part
```

<p class="note">Note: In Ubuntu, you will see a bunch of loop devices as well. Just ignore those, they don't concern you.</p>

In Linux, disks are abstracted and presented in forms of abbreviations like `sda` which stands for `S`CSI `d`isk `a`. Let SCSI go, you don't need to know what it is. The only important thing is that if you have another disk, it will probably be presented as `sdb`. And on it goes, `sdc`, `sdd`, ... Each of those disks can have a certain number of partitions, for example in the above output, our disk has one partition named `sda1`. Not every type of storage is named this way though, below are some other examples:

- `/dev/fd0`: first `f`loppy `d`isk
- `/dev/sda`: first `S`CSI `d`isk
- `/dev/scd0`: first `S`CSI `CD`-ROM (Compact Disk Read Only Memory)
- `/dev/hda`: the master drive on primary IDE controller
- `/dev/hdb`: the slave disk on primary IDE controller
- `/dev/mmcblk0`: the SDHC card on PCMCIA

Obviously, you can see the size of disks and partitions in `lsblk`'s output, but another important field is the mountpoint. In the output of my own laptop's disks, you can see that I have my `sda1` encrypted partition mounted on `/home/john/mzd`. What I mean is that the partition is connected to the directory so that you can interact with the partition through that directory. You can think of the directory becoming the gateway of that partition. One can mount any partition on any desired directory (not literally because some directories are special for their own purpose). We will come back to this down below, but first, let's learn about two more commands that give us useful information.

## df

`df` displays the amount of disk space available on the file system. That’s what the man page said (or in Michael Scott’s words: that's what she said).

```bash
$ df
Filesystem                1K-blocks      Used Available Use% Mounted on
...
/dev/mapper/vgubuntu-root 120276728  15240992  98882932  14% /
/dev/mapper/mzd           960377872 268241556 643281996  30% /home/john/mzd
...
```

But that's not really readable, so:

```bash
$ df -h
Filesystem                 Size  Used Avail Use% Mounted on
...
/dev/mapper/vgubuntu-root  115G   15G   95G  14% /
/dev/mapper/mzd            916G  256G  614G  30% /home/john/mzd
...
```

I don't think that I should explain the above command, it is super self-explanatory, I think. Another useful option that `df` has is `-a` which stands for `a`ll. Just wanted to let you know you can check the man page if you want and just see how it lists some additional stuff!


## du

```bash
$ du
...
```

If you have forgotten how to shut talkative programs up, use the holy `Ctrl+c`. `du`, by default, lists every directory that is a child of the current directory (recursively). But we don't want that much (though it's super useful in some cases). Use the `-d` option to limit the `d`epth (and also the human-readable option):

```bash
$ du -d 1 -h
236M	./.local
8.0K	./Desktop
4.0K	./Videos
19M	./.mozilla
...
```

You may be angry that this has nothing to do with disks, and to be fair, you are right. But I didn't have anywhere else to tell you about this command, so please tolerate it :D But think about it this way, this command estimates the amount of disk usage each directory occupies, so I guess it somehow relates to disk :/ Anyway, a useful option that it has is the `-a` which lists files in addition to the directories.

## mount and umount

Let's first insert a USB disk to our computer. If you are using virtualization, which you probably are, then you need to do some extra stuff. If you’re not using virtualbox, skip to the `lsblk` command below. First, shutdown your VM if it’s running, then in virtualbox, select your VM and hit the `settings` button to open up your VM’s settings. Go to the `storage` section and then click on the little hard disk on the right of `Controller: SATA`. Then select the `create` button and follow the on screen instructions (just like when we created our VM) to make a hard disk for you VM (other than the current one). About 2G is enough. After creation select the `choose` button to complete the setup. Hit `ok` and start up your VM. Now we should create a partition (using a graphical tool). First run this command to install the tool:

```bash
$ sudo apt install gparted
```

Then run it. Obviously it’s called `gparted`. Now select the button on the top-right (which says `/dev/sda`) and change it to the second options (which is `/dev/sdb`). Now go to the top bar and select `Device` and in it’s menu select `Create Partition Table...` In the opened dialog, just hit `apply`. You don’t need to change the partition table type. Now hit the icon on the top left with a plus sign on it, that creates a partition. In the dialog, just hit `add`, it’s not important for now. To finish the process, click on the green `tick sign` and then `apply`. Close the application and now your partition is ready for mounting.

<p class="note">If any of the above is ambiguous, you can just search for "how to create a partition table in gparted" and "how to create partition in gparted".</p>

Because I'm using Ubuntu and this is my laptop, the disk is automatically mounted:

```bash
$ lsblk
NAME                  MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
...
sdb                     8:16   1  14.5G  0 disk  
└─sdb1                  8:17   1  14.5G  0 part  /media/john/AC9C-16EF
...
```

Let's first unmount it using `umount` (yes, doesn't have an `n`). We can unmount either by giving the disk’s abbreviated name or by it's mount point. Since the names are different in very small letters (`sda` and `sdb` and ...) I usually like to unmount using the mountpoint.

<p class="note">If you are using a VM or if the mountpoint column is empty (look at the above output), you don’t need to execute the below command.</p>

To unmount, we can use this command:

```bash
$ umount /media/john/AC9C-16EF
$ lsblk
NAME                  MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
...
sdb                     8:16   1  14.5G  0 disk  
└─sdb1                  8:17   1  14.5G  0 part  
...
```

Now that it's unmounted, we can `mount` it somewhere else. Stay in the home directory and execute this:

```bash
$ mkdir somedir
$ sudo mount /dev/sdb1 ./somedir
$ lsblk
...
sdb                     8:16   1  14.5G  0 disk  
└─sdb1                  8:17   1  14.5G  0 part  /home/john/somedir
...
```

And now that USB disk is mounted on the `/home/john/somedir` which is a regular directory we created ourselves. We can unmount it again (this time using the disk name):


```bash
$ sudo umount /dev/sdb1
$ lsblk
...
sdb                     8:16   1  14.5G  0 disk  
└─sdb1                  8:17   1  14.5G  0 part  
...
```

A fun exercise! With the USB disk unmounted, go ahead and create some files or directories in that `somedir`. Then mount the disk on it. Now open your file manager and go to that place, you'll see that the files/dirs you created are not there anymore, instead, the content of your mounted disk is shown. Now unmount the disk and then re-open your file manager and go to that `somedir` directory again. What happens? The files or directories that were in there are magically back! Isn't that cool?

Well now you may be asking why do we refer to our disks as `/dev/sda`? The reason is that our disks are in the form of special files inside the `/dev` directory (which we briefly mentioned in our directory hierarchy lesson long time ago). Go ahead and execute this to see them:

```bash
$ ls -l /dev | grep sda
brw-rw----  1 root   disk        8,   0 Mar  9 09:32 sda
brw-rw----  1 root   disk        8,   1 Mar  9 09:32 sda1
```

See those `b`s at the beginning of the lines? That's for `b`lock devices which are these special disk files. All we need to know is that these are special files through which we can access disks.

## dd

<p class="warning">DANGER! This command has the potential to delete everything. Please don't use it on real systems until you are comfortable with it.</p>

This beast is one of the most amazing commands. It can create a bootable flash drive from an `iso` file or backup a whole disk into one single file. You must use it with `sudo` because it needs special permissions. I'm going to give you two examples and I recommend that you don’t execute them blindly. First this is how you make a bootable linux installation media using `dd`:

```bash
$ sudo dd if=/path/to/file.iso of=/dev/sdb
```

Before executing that, you should make sure that `sdb` refers to the USB disk that you insert into your computer because if it's another disk, then it’ll will be completely deleted. Another way of using this command is like this:

```bash
$ sudo dd if=/dev/sdb of=/path/to/file.iso
```

Literally the reverse! Every single bit of the `sdb` disk is put into the `file.iso`. There is much more to `dd` but here is not the place for it. You can search for it yourself and learn the hell out of it. Just remember, don’t execute anything before understanding it.

## Conclusion

So this is pretty much it. Now you know how disks are listed and mounted. Later on, we will make partitions and talk more about filesystems, but for now, you're good to go :)

