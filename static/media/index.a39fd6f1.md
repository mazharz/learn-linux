Remember the chapter where we mounted partitions? Well now we can create those partitions and talk even more about disks and how they work. To be able to follow this chapter, you need a disk to be working with, if you are using Linux on a physical machine that could be achieved by inserting a flash drive into your computer but if on the other hand, you’re using a virtual machine, you need to make a virtual disk. We already did that too in the aforementioned chapter, so go ahead and get your setup ready.

We can have a certain number of disks in our computers. If you open a computer case, you can actually see the disks attached usually to the SATA interfaces (newer fun SDDs may be connected via PCIe slots). These are actual physical devices. But due to different reasons, we may want to divide up these disks into smaller sections. These sections are called partitions. You usually see them as "drives" in a Windows machine. In order to be able to make partitions and use them, we need something called a partition table.

# Partition Table

A partition table is simply some metadata about the partitions and the disk in general. We have two types of partition tables, namely MBR (Master Boot Record) and GPT (GUID Partition Table). MBR is the old one which has many limitations and generally sucks :D and GPT is the superior newer one. MBR's limitations are really
annoying and causes your disks to be complicated for no good reason (of course, at his youth, he was a popular kid). You can read more about each of them in [MBR](https://en.wikipedia.org/wiki/Master_boot_record) and [GPT](https://en.wikipedia.org/wiki/GUID_Partition_Table).

# Let's make a partition

There are a bunch of partitioning programs that we can use to manage our partitions:

- `gparted` (graphical front-end to `parted`)
- `parted`
- `fdisk`
- `gdisk`
- `cfdisk`
- ...

Because the graphical one is easy and you can figure it out much more faster, I am not going to talk about that one. Just install it like this if you're on Ubuntu:

```bash
$ sudo apt install gparted
```

Or like this if you're on an rpm-based distro (like fedora):

```bash
$ sudo dnf install gparted
```

Here we use `gdisk` to make our partition. First, we should identify our disk, so:

```bash
$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda                               8:0    0  20G  0 disk 
...
sdb                               8:16   0   4G  0 disk 
```

Here, I added a second virtual disk to my VM. Since I know that it's a 4G virtual disk and that there are literally nothing else attatched to it, then I conclude that it is in fact the disk I want. So I execute `gdisk` like this:

```bash
$ sudo gdisk /dev/sdb
[sudo] password for john: 
GPT fdisk (gdisk) version 1.0.5

Partition table scan:
  MBR: not present
  BSD: not present
  APM: not present
  GPT: not present

Creating new GPT entries in memory.

Command (? for help): 
```

So we naturally proceed by hitting the `?` button to get some help:

```bash
Command (? for help): ?
b	back up GPT data to a file
c	change a partition's name
d	delete a partition
i	show detailed information on a partition
l	list known partition types
n	add a new partition
o	create a new empty GUID partition table (GPT)
p	print the partition table
q	quit without saving changes
r	recovery and transformation options (experts only)
s	sort partitions
t	change a partition's type code
v	verify disk
w	write table to disk and exit
x	extra functionality (experts only)
?	print this menu
```

And we know that we need to create a GPT partition table before creating any partition at all. So:

```bash
Command (? for help): o
This option deletes all partitions and creates a new protective MBR.
Proceed? (Y/N): Y
```

And then to create a partition:

```bash
Command (? for help): n
Partition number (1-128, default 1): 
First sector (34-8388574, default = 2048) or {+-}size{KMGTP}: 
Last sector (2048-8388574, default = 8388574) or {+-}size{KMGTP}: 
Current type is 8300 (Linux filesystem)
Hex code or GUID (L to show codes, Enter = 8300): 
Changed type of partition to 'Linux filesystem'
```

Since there were no parition in this new empty disk, we created one, gave it the default options, number 1, starting from the first sector to the last sector (defaults) and then again using the 8300 code which is the default to make a Linux filesystem type parition (basically a flag). And now the only thing that we need to do is to write these changes to that disk (because until now they are not applied so that we don't make a mistake). So we first go ahead and print the current state by executing a `p` action in `gdisk`:

```bash
Command (? for help): p
Disk /dev/sdb: 8388608 sectors, 4.0 GiB
Model: VBOX HARDDISK   
Sector size (logical/physical): 512/512 bytes
Disk identifier (GUID): D738CBA0-D6B0-41D0-BFF6-1781F5DC477C
Partition table holds up to 128 entries
Main partition table begins at sector 2 and ends at sector 33
First usable sector is 34, last usable sector is 8388574
Partitions will be aligned on 2048-sector boundaries
Total free space is 2014 sectors (1007.0 KiB)

Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048         8388574   4.0 GiB     8300  Linux filesystem
```

It beautifully tells us a lot about it, but we just need to know that it is the right size and double check that this is the right disk and so on and so forth. So now we write these changes to the disk:

```bash
Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): Y
OK; writing new GUID partition table (GPT) to /dev/sdb.
The operation has completed successfully.
```

Now to confirm that we actually did it, we can use `lsblk`:

```bash
$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda                               8:0    0  20G  0 disk 
...
sdb                               8:16   0   4G  0 disk 
└─sdb1                            8:17   0   4G  0 part 
```

Yay! But now we can't mount it :/ Go ahead and try it:

```bash
$ sudo mount /dev/sdb1 /mnt
[sudo] password for john: 
mount: /mnt: wrong fs type, bad option, bad superblock on /dev/sdb1, missing codepage or helper program, or other error.
```

That's because we didn't make a filesystem on it :D (in Windows terms, we haven't formatted it yet). So let's!

# Making a Filesystem

We can use the `mkfs` command to satisfy our filesystem needs. First, take a look at this:

```bash
$ ls -l /usr/sbin/mkfs*
-rwxr-xr-x. 1 root root  16480 Mar 24 19:00 /usr/sbin/mkfs
-rwxr-xr-x. 1 root root 535864 Apr  6 01:43 /usr/sbin/mkfs.btrfs
-rwxr-xr-x. 1 root root  46368 Mar 24 19:00 /usr/sbin/mkfs.cramfs
-rwxr-xr-x. 4 root root 146024 Jan 31  2020 /usr/sbin/mkfs.ext2
-rwxr-xr-x. 4 root root 146024 Jan 31  2020 /usr/sbin/mkfs.ext3
-rwxr-xr-x. 4 root root 146024 Jan 31  2020 /usr/sbin/mkfs.ext4
-rwxr-xr-x. 1 root root  42248 Jan 28  2020 /usr/sbin/mkfs.fat
-rwxr-xr-x. 1 root root  38920 Jan 29  2020 /usr/sbin/mkfs.hfsplus
-rwxr-xr-x. 1 root root 117944 Mar 24 19:00 /usr/sbin/mkfs.minix
lrwxrwxrwx. 1 root root      8 Jan 28  2020 /usr/sbin/mkfs.msdos -> mkfs.fat
lrwxrwxrwx. 1 root root     16 Jan 29  2020 /usr/sbin/mkfs.ntfs -> /usr/sbin/mkntfs
lrwxrwxrwx. 1 root root      8 Jan 28  2020 /usr/sbin/mkfs.vfat -> mkfs.fat
-rwxr-xr-x. 1 root root 498424 Jan 31  2020 /usr/sbin/mkfs.xfs
```

You can clearly see that we have quite a lot of tools here. The one we're interested in is the one ending with ext4 because ext4 is a common filesystem for Linux partitions (when you get more comfortable, you should check out `btrfs` because it's a `b`et`t`e`r` `fs`). So:

```bash
$ sudo mkfs.ext4 /dev/sdb1
[sudo] password for john: 
mke2fs 1.45.5 (07-Jan-2020)
Creating filesystem with 1048315 4k blocks and 262144 inodes
Filesystem UUID: ae3b5d11-e70f-4647-92d0-618105c3edab
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (16384 blocks): done
Writing superblocks and filesystem accounting information: done 
```

And that's it. We have our brand new partition with it's fancy new filesystem. Let's mount it:

```bash
$ sudo mount /dev/sdb1 /mnt
$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda                               8:0    0  20G  0 disk 
...
sdb                               8:16   0   4G  0 disk 
└─sdb1                            8:17   0   4G  0 part /mnt
```

Good? :D Alright. So we made a partition table, a partition, and a filesystem. Now we are pretty good with disks, don't you think?

# Checking a filesystem

There are times that you need to check for faulty filesystems or disks. That's when you need to use `fsck` which stands for `f`ile`s`ystem `c`hec`k`. Let's say we have been given the partition we previously made and we don't know anything about it. The first step would be to gather some information about it. After `lsblk` (to find the partition identifier), we can use `file` to print some info about it. Why `file`? Because everything in Linux (Unix) is a file or a process:

```bash
$ sudo file -sL /dev/sdb1
/dev/sdb1: Linux rev 1.0 ext4 filesystem data, UUID=ae3b5d11-e70f-4647-92d0-618105c3edab (extents) (64bit) (large files) (huge files)
```

So we figured it out, this is an `ext4` parition (we knew that but what if we didn't make the partition in the first place?). Now we can use the appropriate fsck tool (it also auto detects, but I wanted to do it the hard way so you learn to use `file` on special files):

```bash
$ sudo fsck.ext4 /dev/sdb1
e2fsck 1.45.5 (07-Jan-2020)
/dev/sdb1: clean, 11/262144 files, 36942/1048315 blocks
```

Since we just create the partition, it's virtually impossible for it to be erroneous. Here we have a clean beautiful filesystem. What if it weren't clean? We would search "How to repair a filesystem fsck" in google.


# What about physical bad sectors?

That would be the job of `badblocks`. In order to check for bad sectors, you would run this command on your disk and wait for it to write data to the disk and then read the written data from it. It does that and checks for each block to see if the data it reads is the same as the data that it writes. Basically to check if your piece of paper is error free, you would memorize a word, write it down, then read it from the paper, if it's the same that you remember, then the paper is ok. That's how `badblocks` checks disks. Remember it does this for every byte of the disk so the amount of time it needs is proportional to filling and emptying the disk entirely. It also has a non-safe mode which doesn't write back the original data, so you might be extra cautious when using it.

# Conclusion

That is partitioning in a nutshell. This chapter is certainly certainly not enough, but we can't really go over all the scenarios and different types of filesystems. As always, be curious, search for it, read different tutorials, read the man page, and practice.