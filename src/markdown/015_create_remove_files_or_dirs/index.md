Here we will learn how to actually do something effective. Let's start by learning to touch!

# touch

What happens when you touch something? It gets changed. Maybe not visible to your eyes but on a microscopic scale, touching something definitely changes it. In Linux, when you touch something, it's timestamp gets changed. Meaning that it's modified date/time is updated. But the weird part is that if you touch something that doesn't exist, it will magically come into existence! Maybe my analogy made things worse, but you know, I can't help myself. Let's see it in action:

```bash
$ touch something
$ ls -l
...
-rw-r--r--  1 john john    0 Nov 21 18:45  something
...
```

Take a look at the file's size, it's zero because there is literally no content in that file. It's a true empty file. Now literally wait one minute, and then execute the same two commands again:

```bash
$ touch something
$ ls -l
...
-rw-r--r--  1 john john    0 Nov 21 18:46  something
...
```

See? when `something` didn't exist, `touch` created a new empty file and named it `something`, but when it did exist, touch only updated the time (from 45 to 46).

# rm

It's short for remove and it can be one of the most dangerous commands ever. This command (with certain options) can delete literally `EVERYTHING`. And by everything I don't just mean the operating system, it'll delete even the disks attached to your computer, or even network storage that's mounted somewhere. But first, let's use it in the most basic way possible:

```bash
$ rm something
```

Not surprisingly, it'll remove the `something` file that we just created above. But let's see more:

- -r recursive
- -f force

Let's get our environment ready for explaining those files: first, open up your file manager and create a directory named `dir`. Then use this command to create a new file in that directory:

```bash
$ touch dir/file
```

Now try to remove the directory and it's belongings:

```bash
$ rm dir
rm: cannot remove 'dir': Is a directory
```

To be able to remove a directory with everything in it, we must use the recursive option. That means that `rm` is going to delete everything in there first, and then deletes the directory at last (if you're a programmer, think of a recursive function and you'll be set):

```bash
$ rm -r dir
```

See? It's gone. Now let's see the force option. First `touch something`:

```bash
$ touch something
```

Then make it read-only using this command (we'll learn that later, for now just know that the file will be read-only):

```bash
$ chmod 444 something
```

Now try and remove the file:

```bash
$ rm something
```

It'll ask you for confirmation and you need to press `y` and hit `enter` to confirm that you really want to remove the file. This can get annoying if you're removing lots of files at once. Let's recreate that situation:

```bash
$ touch something
$ chmod 444 something
```

Now let's use the force option:

```bash
$ rm -f something
```

It instantly removes the file without asking. Now let me tell you about a very dangerous thing you can do with `rm`. I can't stress this enough, *DON'T EVER RUN THIS ON YOUR PHYSICAL MACHINE*.

```bash
$ rm -rf /
```

What that does, is it'll try to remove anything that falls under the `root` directory. And you know by now that EVERYTHING falls under `root` :) Now this command won't have the permission to remove everything because it's being run as a regular user. Later we'll learn about the `sudo` command that runs commands as a super user, it'll look like this (*DON’T RUN IT*):

```bash
$ sudo rm -rf /
```

That will remove everything after you enter your password. Running the `rm -rf /` as `root` will do the same. So remember to avoid that command, you will never need to remove everything, even in that case you are better off formatting the disk to avoid removing mounted partitions. This command has become some sort of joke in the literature!

# mkdir

`m`a`k`e `dir`ectory. Simply makes a directory:

```bash
$ mkdir somedir
```

It has only one useful option that you might see in scripts often. It's the `-p` which stands for “no error if existing, make parent directories as needed” according to its man page. This means that if the directory existed, it won't complain about it and if the parent directory didn't exist it would create it (which is very useful). So this command:

```bash
$ mkdir -p a/b/c
```

will create a directory named `c` inside `b` inside `a`:

```bash
$ tree a
a
└── b
    └── c
```

After removing all three (with `rm -r a`), try running it without the `-p` and you’ll see it complain.

# rmdir

It's easy to guess that it's short for `r`e`m`ove `dir`ectory. But remember that `rm` deleted directories with files in them when passed the option `-r`? Then why would we want another command? Because `rmdir` removes only the empty directories. Run these commands to understand it:

```bash
$ mkdir iamempty
$ rmdir iamempty
$ mkdir iamnot
$ touch iamnot/file
$ rmdir iamnot
rmdir: failed to remove 'iamnot': Directory not empty
```

# Conclusion

That wraps up this chapter, you learned important commands that will be necessary to have in your knowledge base. The next chapter will talk about copying, moving (or cutting) files but after that the more in-depth stuff will be coming up. So get excited :D you’re becoming a better Linux user chapter by chapter.


