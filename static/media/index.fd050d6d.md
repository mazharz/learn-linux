You know how to move around in a file manager. You double (or single) click on directories (aka. folders) to open them or use the up or back buttons to go up or back one directory. In the terminal, as I said before, we are in a directory at any time. Here we will learn how to navigate and find our way.

# pwd

`pwd` or `p`rint `w`orking `d`irectory is a very self-descriptive command. It'll just tell you where you are:

```bash
$ pwd
/home/john
```

If you want, you can read it's man page in less than a minute :)

# Absolute and Relative paths

Suppose, I meet you in the street and ask you the directions to the nearest park. Your answer would be something like this: "go straight ahead and turn left in the first square you reach". I can get to the park with no problem. Now I can use that sentence to guide anyone in a similar situation. For example if I were in Paris and someone asks me about a park, I may happen to give that exact same description to guide that person to another park. On the other hand, if you were to give me this address: "Cosmos, Milky way, Solar System, Earth, America continent, Canada, State, City, Avenue, ...". Then I couldn't use that address to guide the person in Paris. This right here is the fundamental difference between a relative and an absolute address (along with the fact that using relative paths, we don’t need to address from the root everytime). In Linux, absolute addresses always start at the root (`/`) but relative addresses can be starting with any of these forms:

- dir/subdir/...
- ./dir/subdir/...
- ../dir/subdir/...

A single dot (.) means "the current directory that we are in" and a double dot (..) means "the parent directory of the current one that we are in". So the second example can be translated into: "something inside 'subdir' which is inside 'dir' itself, and 'dir' is right here where we are". The first example and the second one are exactly the same. But you can translate the third example as "something inside the 'subdir' which is in 'dir' which is one directory above the one that we are in".

# cd

`c`hange `d`irectory is one of the most useful commands in the world of Linux, Unix, Windows, Mac and everywhere else :D We're all united on this matter. You may have guessed it, to change to a specific directory, we give the path to that directory to the cd command as an argument. Some examples include:

```bash
$ cd /
$ cd /home/john/Downloads
$ cd ..
$ cd Desktop
$ cd ../..
```

<p class="note">
Replace "john" with your own username.
</p>

Go ahead and try them (don't forget to run pwd after each one to see where you end up, additionally look at the prompt's location and see that change too). The first one is obvious, it just changes to the root directory (`/`). Second example is going to the `Downloads` directory using an absolute path. The third example goes up one directory so that it'll fall into `/home/john`. The fourth example goes into the `Desktop` directory (because we are in home of our john user, there will be a `Desktop` directory there). And then the last example will go up two levels which means that you'll end up being in `/home` (not `/home/john`).

<p class="note">
Note that cd is one of bash shell's built-in commands so if you try to look up it's man page, you'll fail. Instead you can see bash's man page (it's under the "SHELL BUILTIN COMMANDS" section) or just type "cd --help" or "cd -h".
</p>

Home is a place where you'll end up going a lot. So there are two shortcuts for it. The first is that tilde symbol I told you before (`~`). You can type `cd ~` to go to your home, or if you're too lazy to do even that! just use `cd` with no arguments.

<p class="note">
Additional note for curious ones: "cd" reads the value of environment variable "HOME" to figure out the default path to go. If you type "echo $HOME" you'll see the value of this variable. We have not yet covered environment variables so don't worry if you don't understand what it is. You can come back to this when we cover it later on.
</p>

Remember how commands distinguish arguments? By a space between them. But what if the directory we want to change to includes a space? Let's go home by a single `cd` command. Then via your file manager create a directory (we'll learn how to do that in the command line in an upcoming chapter). I created a directory called "Some Dir". Now let's see what happens when we use `cd` to change to it:

```bash
$ cd Some Dir
bash: cd: too many arguments
```

That is because `cd` accepts only one argument to go there. To solve this, we can either surround our directory name inside single or double quotes OR escape the space using backslash. Let's see the first solution first:

```bash
$ cd "Some Dir"
$ cd ..
```

Or:

```bash
$ cd 'Some Dir'
$ cd ..
```

Escaping a character means putting a backslash before that character. That tells bash to treat that character as literally what it is. Here it tells bash to treat a space as `space` not as a separator of arguments:

```bash
$  cd Some\ Dir
```

<p class="note">
I don’t know if you remember or not, but we previously saw how "\n" resulted in "n" when we omitted the double quotes. It was when we used "echo -e".
</p>

But this is of course a bit messier. Now try putting a single quote (') or double quote (") in the directory's name and see how you can fix those. Search for it online and you'll find the answer. *A hint: there are two ways to do it for each situation.*

# Conclusion

What you just learned here is going to be extremely useful in future. This is the basis of what your command line knowledge will be built upon. It is an easy concept, but you need to practice for it to be natural to you. Create a series of nested directories and try to navigate your way through them using different types of relative paths and absolute paths. Once you’re comfortable (or a little bit comfortable) with navigation, proceed to the next chapter.

