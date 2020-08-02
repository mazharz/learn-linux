Have you ever used shortcuts in Windows? The name shortcut makes sense because the shortcut file gives you a faster access to the original file you want. But the actual shortcut file is just a link to the original one. That's why we call it a link in Linux. And to think that a simple shortcut occupies a whole chapter might question my sanity. My answer is that first, links in Linux are not just the same as shortcuts in Windows (we have two kinds of links) and second, I try to give you the detailed explanation here. Let's get acquainted with links.

# ln

`l`i`n`k. We have two major types of links but before I try describing those, I must tell you a little bit about files and how they're stored on the disk. And you know what they say, a picture is worth a thousand words :/ Anyway:

![Picture of links in Linux](/learn-linux/images/links.svg)

The outer rectangle is our disk simplified (you could argue that disks are round but I could defend that this is an SSD, so...). Remember when you format a disk? There are two options, fast and slow. Here you'll learn the difference between those two as well. At the beginning of each disk, we have a `partition table` which holds some meta-data (data about data). In that small portion, the links to files are stored. When you create a file, first an entry in this partition table is made for that file with a unique identifier. Then this entry points to the place in your disk where the actual file's data will be stored. For example when you copy an image, first a new entry is created in the partition table, then this entry will link to an empty space in the disk and then the image is actually copied to that empty space byte by byte. Now when you "format" a disk, you are actually creating this partition table. When you choose the fast option, you are indicating that only that small partition table should be created and the old one removed. But when you choose the slow option, that means that the operating system will overwrite the actual data byte by byte. That takes longer because it's the equivalent of copying a file as large as your disk. And a funny fact about deletion. Have you ever noticed that deleting a file takes a very short amount of time? That's because deletion only removes the entry in the partition table, it doesn't overwrite the actual data. Same goes for moving (cutting) a file. If you move a file to a place on the same disk (partition actually but we haven't covered that yet), only it's link will be updated in the partition table. Now that you know what links are (the entries in the partition table), let's see the two kinds of links.

# Soft links

`Soft links` are the exact equivalent to a shortcut in Windows. Take a look at the illustration and you'll see that a `soft link` is just like a regular file, it creates both the entry in the partition table and a data section indicating where the original file is.

# Hard links

A `hard link` on the other hand is just an entry in the partition table pointing to the original file. It doesn't create any data on the disk, just an entry in the partition table (which can have a different file name and be placed in a different directory).

# Let's actually make some links

Let's make three files same as the picture above:

```bash
$ touch originalfile
$ ln originalfile hardlink
$ ln -s originalfile softlink
$ ls -li
5767232 -rw-r--r-- 2 john john  0 Nov 23 17:57 originalfile
5767232 -rw-r--r-- 2 john john  0 Nov 23 17:57 hardlink
5767234 lrwxrwxrwx 1 john john 12 Nov 23 17:57 softlink -> originalfile
```

You can easily tell that the `-s` option makes `soft links` and using `ln` without it, results in making a `hard link`. Remember I told you about `inode` in the chapter where we first saw `ls`? Well here it is. See how the first column of `ls` shows us the `inode` numbers of our files? Notice that the first two files (`originalfile` and `hardlink`) have the same inode number but the soft link has a different one. Also note that the first character in the permission section of `ls`'s output indicates that the hard link is a regular file but the soft link is an `L` which stands for `l`ink. And additionally, you can see that the soft link has a different size (12 bytes) but the hard link is exactly the same as our original file. Now open your file manager and add some content to your original file. Then you'll see that not only the size of our hard link is still matching the original file, but also it's modified date/time is the same too:

```bash
$ ls -li
5767232 -rw-r--r-- 2 john john 26 Nov 23 18:07 originalfile
5767232 -rw-r--r-- 2 john john 26 Nov 23 18:07 hardlink
5767234 lrwxrwxrwx 1 john john 12 Nov 23 17:57 softlink -> originalfile
```

Now notice one more thing about the output. See the number between the permission's section and the user's name? That indicates how many links are pointing to the file. See that both originalfile and hardlink have the same number "2". That's because they're both pointing to that same content (take a look at the illustration again if you're lost). Now to further prove my point, let's delete the original file and see what happens:

```bash
$ rm originalfile
$ ls -li
5767232 -rw-r--r-- 1 john john 26 Nov 23 18:07 hardlink
5767234 lrwxrwxrwx 1 john john 12 Nov 23 17:57 softlink -> originalfile
```

If you have color enabled in your terminal, you'll immediately see that the soft link's color changes to red. Now open both files and see what happens. The `hardlink` still works but the `softlink` no longer points to the original file's entry in the partition table (see the illustration once more). Also note the number of links to the file is reduced for `hardlink` to one because the other entry point (`originalfile`) is now removed.

# Conclusion

So that's all I've got on links. I really got excited the first time I learned about links and how files are stored and the `inode` mystery :) Now you should have a good grasp on the fundamental concepts. In the next few chapters, we will be focusing on `streams` and boy, you have no idea how cool those are :D See you there.

