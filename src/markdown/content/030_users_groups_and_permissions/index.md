---
layout: post
title: Chapter Thirty - Users, groups, and permissions
pathToImage: ../../pic.jpg
---

Remember I promised to talk about these stuff? Well now is the time to see what's all the fuss about. We will discuss users, groups and permission in this and the next two chapters. So let's dive in:

## ls (again!)

We have been using `ls` for quite a long time and now is the time to understand the first weird column:

```bash
$ ls -l
-rw-r--r-- 1 john john 13 Mar 29 12:18 file
```

We already know the first character (letter). That indicates what type of file we're dealing with, which is a regular file here because of the dash (`-`). Now we will divide the rest of those characters into three sections:

```bash
rw- r-- r--
```

The first three letters are for "user", the second for "group" and the third for "others". The user is self-explanatory, it means the person who owns the file (and we'll see in a moment who does), the group means the group which the file belongs to (we'll see that too) and the "others" is for anyone other than the aforementioned user and group. So you can think of it like this:

```bash
<user> <group> <other>
```

Now in each of those sections, we have three letters, in the example above, they are in order "rw-", "r--" and "r--". The first letters of all is "r" right? Now take a look at another file's permissions:

```bash
$ ls -l
-rw-r--r-- 1 john john 13 Mar 29 12:18 file
-rwxrwxrwx 1 john john 21 Mar 29 12:47 file2
```

Hmm! They all seem to be the same! "rwx" three times. It should be obvious that this means that anyone dealing with "file2" would have the same permissions, no matter if it's the owner, the group to which the file belongs to, or any other user. But what do those letters mean?

```bash
Read Write eXecute
```

Now we are making more sense! So the "file2" has read, write and execute permission for every user possible! That means the file has all the permissions for every possible user. But what about "file"? Notice that it has "rw-" for the owner user, well that means the owner user can read and write the file, but s/he can't execute it! The "group" and "other" permissions for that file are both "r--" which means anyone other than the owner can read the file, but they can't write to it, or execute it. So if a file lacks a certain permission, there will be a dash (-) instead of the letter corresponding to it's permission. Now let's do some exercise:

```bash
--- --- ---
r-x r-- r--
rwx rw- r--
```

The first one means that no one has any permission on this file! That doesn't make any sense because why would we need such a file? But it is theoretically correct nonetheless. The second one means that the user owning the file has read and execute permissions but any other user, has only the permission to read the file. Last one means that the user has read, write and execution permissions, the group which this file belongs to, has read and write permissions and other users can only read this file.

Now take another look at this output:

```bash
$ ls -l
-rwxrwxrwx 1 john john 21 Mar 29 12:47 file2
```

You see those two "john"s? Those indicate the user and group! Yes, this file belongs to user `john` (the first john indicates that) and it also belongs to a group called `john`. This is because each user can have his/her own group like when you talk to yourself! Take a look at this as another example:

```bash
$ ls -l /dev | head
...
crw--w----  1 root   tty         5,   1 Mar 29 09:20 console
...
```

Here the file belongs to the "root" user and the "tty" group. It is a "character device" file because of that "c" at the beginning of the line and it has read and write permissions for "root", only write permission for the users inside "tty" group and no permission for other users.

## chmod

`ch`ange file `mod`e bits! In human language, it means to change those permissions. So let's.

```bash
$ ls -l
-rw-r--r-- 1 john john 0 Mar 29 13:16 file
$ chmod ugo+rwx file
$ ls -l
-rwxrwxrwx 1 john john 0 Mar 29 13:16 file
```

Seems obvious right? I told `chmod` to add (+) `r`, `w` and `x` to `u`, `g` and `o`! Meaning that I told `chmod` to add `r`ead, `w`rite and e`x`ecute permissions to `u`ser, `g`roup and `o`thers. Here is another example:

```bash
$ ls -l
-rwxrwxrwx 1 john john 0 Mar 29 13:16 file
$ chmod g-x file
$ ls -l
-rwxrw-rwx 1 john john 0 Mar 29 13:16 file
$ chmod o-wx file
$ ls -l
-rwxrw-r-- 1 john john 0 Mar 29 13:16 file
```

Above, I told `chmod` to remove (`-`) the e`x`ecute permission from `g`roup and then I told it to remove both `w`rite and e`x`ecute permissions from other. That should be easy and clear.

Before we move on to a more sophisticated way of changing the permission, let's see the permissions of a regular directory:

```bash
$ ls -l
drwxr-xr-x   2 john john 4096 Mar 13 21:25  bin
```

Notice that the directory has e`x`ecute enabled for all users. That is because the way a directory is executed is when you double click on it, or use `cd` to go into it! So generally directories are executable for all. Go ahead and try it for yourself (you should be denied the permission of `cd`ing into a directory). Also try removing the `w`rite permission (with e`x`ecute permission enabled), in that situation you will be able to go into the directory, but you will not have permission to create anything in there :)

<p class="note">Note: the rest of this part is optional, if you don't know binary, you can skip it (go to <code>chown</code>). Sadly, I can't explain binary here (but you can still get the idea if you read it though).</p>

So there is another way to do the same thing. Using numbers. If you know binary, you would know that 010 means the number 2. Because there is a one in the second place. Just as a reminder here are the numbers zero to seven:

- zero: 000
- one: 001
- two: 010
- three: 011
- four: 100
- five: 101
- six: 110
- seven: 111

I don't know if you noticed or not, but the permissions are very similar to a binary three digit number! The reason being that each of those letters (r, w or x) can either be on or off (either the permission exists or it doesn't). So you could think of "r-x" as 101, or "rw-" as 110! I think you know where I'm going with this :D So to set the "rw-" permission, all we have to do is to set the permission to 110 which is the number 6! Now we have three sections of permission, right? So can you guess what the following command does?

```bash
$ chmod 762 file
```

Yes indeed! Sets user to "rwx", group to "rw-" and other to "-w-". Because 762 translates to 111 110 010:

```bash
$ chmod 762 file
$ ls -l
-rwxrw--w- 1 john john 0 Mar 29 13:16 file
```

Isn't that awesome? :D The first time I learned that was not a long time after I learned binary and man was I swimming in the clouds! It was as if I discovered gold or something, I just can't explain it here but I hope you get a similar feeling somewhere along your learnings. Those moments are the ones that assure you "THIS IS YOUR PASSION!". Anyway, let's move on.

A very important option of chmod is `-R` which is short for `R`ecursive. Meaning that if you want to apply the same permission recursively on a directory, you can.

<p class="warning">Warning: Never ever ever ever ever try to apply a permission on the root directory (or any other major directory) recursively. It's similar to <code>rm -rf /*</code>, it'll just ruin the whole system.</p>

## chown

So let's change the ownership of files or directories.

```bash
$ ls -l
-rw-r--r-- 1 john john 0 Mar 29 13:48 file
$ sudo chown root:john file
[sudo] password for john: 
$ ls -l
-rw-r--r-- 1 root john 0 Mar 29 13:48 file
```

Here I changed the ownership of the file so "root" will be the user that owns the file, but the file still remains in the "john" group. So users in the "john" group will have the permissions "r--" (second set of permissions) but now only "root" can write to the file ("rw-"). In fact if you try to overwrite the file like this:

```bash
$ echo "something" > file
bash: file: Permission denied
```

You will get the error `permission denied`, because the owner of that file is now "root" and you can't overwrite her files. And obviously you can change the group like so:

```bash
$ sudo chown root:root file
```

Which will cause the file to be owned by "root" user and the "root" group as well.

Note that we have `-R` for `chown` as well, so we can change the ownerships recursively.

## sudo and su

As we have said many times, we have regular users and one "root" user which is the most privileged user. Now that we are comfortable with the command line, it's time to be able to be ROOT! Generally, we want to prevent being root for several reasons. I'm not going to bore you with them but take the general idea that when you are God, you should be errorless. And from what we know, humans are definitely NOT errorless. We are indeed errorful in some circumstances, like when we declare an imaginary friend ;) But anyway, we generally tend to be regular users. But sometimes, we need to run commands as root, that is when "sudo" comes in. It may sound like a cool ninja, but unfortunately, it's not :( It's short for `s`uper `u`ser `do`. Whenever you want to execute a command with super user permissions, you just prepend it with a "sudo" just like we did a little before when we wanted to make the owner of a file "root". If you tried to change the owner to `root` without the "sudo", you'll notice that you couldn't, the reason being that a file that is owned by root (if it is a script or program) can cause serious damage just by being run. Let's run a simple command with `sudo`:

```bash
$ sudo ls -l
[sudo] password for john: 
-rw-r--r-- 1 root john 0 Mar 29 13:48 file
```

Of course, we don't need to run `ls -l` as `root`, but we can :/ First, we will provide the password of our own user and then the command will be executed as if "root" was executing it. Let's see a better example when the regular user is unable to perform some task:

```bash
$ chown root:root file
chown: changing ownership of 'file': Operation not permitted
$ sudo chown root:root file
$ ls -l
-rw-r--r-- 1 root root 0 Mar 29 13:48 file
```

But what if we REALLY want to be root? Then we should use a command called `su` which is short for `s`witch `u`ser. You call the command and provide a name which is the user you want to change into. And then you should provide the password for that user instead of your own password. So we should be able to change into the `root` user like this:

```bash
$ su root
Password: 
su: Authentication failure
```

If you are on Ubuntu, you will receive the above error. Ubuntu's team decided that users shouldn't be able to change into `root` to keep them safe from themselves. And they are mostly right, but there are times that we absolutely need to change into root. We can easily trick Ubuntu like this:

```bash
$ sudo su root
[sudo] password for john: 
root@u6untu:/home/john#
```

Why did that work?! Because we are running the `su` command as `root` itself (because we prepended `sudo` to our command)! You will see that the prompt changes to `root@hostname:/path/to/home#`. Remember that `#` means `root` and `$` means `regular user`? Now create a file:

```bash
root@u6untu:/home/john# touch somefile
root@u6untu:/home/john# ls -l
...
-rw-r--r-- 1 root root 0 Mar 29 13:48 somefile
...
```

That right there is proof that we are in fact `root`! The newly created file's owner and group are both `root`. If you need even more proof, try the command below.

## whoami

Basically does what it's named for!

```bash
root@u6untu:/home/john# whoami
root
root@u6untu:/home/john# exit
exit
john@u6untu:~$ whoami
john
```

## id

This one gives you the information on who you are:

```bash
$ id
uid=1000(john) gid=1000(john) groups=1000(john),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),119(lpadmin),130(lxd),131(sambashare)
$ sudo su
root@u6untu:/home/john# id
uid=0(root) gid=0(root) groups=0(root)
```

Notice how I just executed `sudo su` and I didn't give the `root` user as it’s argument? That's because `su` defaults to change to `root`.

## groups

Wanna know what groups you belong to?

```bash
$ groups
john adm cdrom sudo dip plugdev lpadmin lxd sambashare
```

It also accepts an argument to specify what user you wish to query (same goes for `id`):

```bash
$ groups john
john : john adm cdrom sudo dip plugdev lpadmin lxd sambashare
$ groups root
root : root
$ id root
uid=0(root) gid=0(root) groups=0(root)
```

## Conclusion

Phew! That was quite a lot of information in one chapter! Congratulations, you now are able to change permission, change ownership, switch users, execute commands as super user and query information about users. That is a huge step, you should be proud. In the next chapter, we will learn how to manage the users and groups which is another important skill to learn. I'm not going to lie to you, it'll be as informative as this one, so take a longer break before you jump in the next one.

