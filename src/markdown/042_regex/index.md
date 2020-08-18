Okay, get ready to learn the equivalent of a swiss army knife in the world of computers. It's short for `reg`ular `ex`pression. There is a very strong academic theory behind it (automata) which makes it even more attractive. To be honest, that course was one of my favorites and also one of the few that I use it's teachings on a daily basis. So let's begin.

# Give me the general idea

Alright, as you wish. Imagine trying to instruct your friend to pass you something in a restaurant. You can be as vague as "pass me the thing" and that can be acceptable in the context, leading your friend to passing you the ketchup. But computers, as we already know, are a bit more precise. They don't really grasp so much of the context that our minds do. So we can't really instruct them vaguely. In fact, we need to be as precise and descriptive as possible. Regex is a way to talk to our computer in a more abstract way. That's what makes it special. Imagine telling your computer "give me those files that start with the letter 'a'". So let's see a very simple example:

```bash
$ cd /tmp
$ mkdir temp
$ cd temp
$ touch file1
$ touch file2
$ gedit *
```

<p class="note">Obviously, you should change <code>gedit</code> to <code>kate</code>, <code>mousepad</code>, or any other editor that is provided by your distribution.</p>

We went into the `/tmp` directory, created a `temp` directory and changed to it, then created two files. The last line is where we want to focus on, instead of `$ gedit file1 file2`, we instructed `bash` to open all the files in the current directory. In the same directory, execute these:

```bash
 $ touch f1
 $ touch f2
 $ gedit ??
```

See? There were our files `file1` and `file2` there as well, but when we typed `??` we meant that bash should substitute that with files that contain two letters, hence opening `f1` and `f2` only. We can also open files that start with "file":

```bash
$ gedit file*
```

That should lead to `file1` and `file2` being opened by `gedit`. Similarly, we can do something like this as well:

```bash
$ gedit f?
```

And that should open `f1` and `f2` since they start with `f` and have only one character after that. Don't limit yourself to files that start with something, we can also open files that end in a specific set of characters:

```bash
$ gedit *1
```

That should open `f1` and `file1` since they have `1` at the end. By now you should realize that `?` means one character and `*` means many characters. So you could come up with something like this:

```bash
$ gedit f*1
```

Notice that `f1` is also opened in addition to `file1`, why is that? Because `*` means "zero or more". So the command above will mean "file(s) that start with `f`, have some sequence of characters (no matter what) or even none and then end with `1`".

These (\* and ?) are examples of wildcards. Bash provides various types of wildcards that you can use to make your life easier. So if you're interested in learning more, take a look at [here](https://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm).

# Actual Regex

Those are not exactly Regex, I mean they're extremely similar, but regex is a superset when compared to wildcards. It is way more extensible and way more interesting. A great tool that supports extended regex is `grep`! Man, we would've been miserable if we didn't have `grep`. If you take a look at `grep`'s man page, you'll see that it has a `-E` option that allows us to use regex in our patterns. But there is also a command called `egrep` which if you find it (with `$ which egrep`) and then open it, you'll see something like this:

```
#!/bin/sh
exec grep -E "$@"
```

This is literally a shortcut. It executes `grep` with `-E` option and then passes any other argument that we provide to it (`$@`). So let's use `egrep`. First, I'm going to make a file with the following content:

```
$ cat myfile
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

# \*

Now, let's `grep` the crap out of it:

```bash
$ cat myfile | egrep --color=always "1*"
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

<p class="note">Make sure you pass <code>--color=always</code> so you better understand what's going on. I can't really emulate that stuff here because I'm using regular markup files, maybe this'll be fixed in future, but for now, you absolutely must run the commands to see what characters are affected (colored).</p>

Why everything is printed back to the terminal? Because \* means "zero or more", so it matches everything, because there are zero `1`s all over the place! There is zero ones at every single possible place. It might be a bit confusing, but you'll get the hang of it pretty fast. Now let's try something very close:

# +

```bash
$ cat myfile | egrep --color=always "1+"
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Aha! + means "one or more", so it only prints the line that contains a matching pattern, meaning the `1`, `10`, `11`, `12`, and `13`. Note that `11` is one entity in the eyes of regex, + matches "one or more" ones, so `11` is treated as a matching pattern, not two separate `1`s.

Now let's try something a bit different:

# . (dot)

```bash
$ cat myfile | egrep --color=always "."
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Why is everything colored? Because `.` means "any character", so it can be used to point to anything, this might look stupid now, but you'll see how useful it gets in a couple of seconds, take a look at this example:

```bash
$ cat myfile | egrep --color=always "M.+ "
Monica and Chandler
Joey, Pheobe, Mike, David
```

Here "Monica and " and "Mike, " are colored (obviously the space isn't colored, but it's a part of it). Why is that? Because we instructed `grep` to match something that starts with "M" and then follows by anything one or more times and then end with a space (" "). And the reason that it matches "Monica and " and not "Monica " is because `grep` matches them in a greedy fashion, so it looks ahead to see if there is any more spaces that it can match.

# ?

A question mark indicates that the previous character (or groups of characters, as we will see in a bit) either exists or not. Meaning that `a?` means either an "a" comes or not. Let's see an example:

```bash
$ cat myfile | egrep --color=always "1?2"
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Here, `2` and `12` are matching that expression. Why?

# {n}

That means that the previous character (or group of characters) are repeated `n` times. For instance:

```bash
$ cat myfile | egrep --color=always "1{2}"
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Here only `11` is matched. Why? Because we instructed that the character `1` must be repeated 2 times.

# {n, m}

At least, n time, and at most, m times.

```bash
$ cat myfile | egrep --color=always "1{1,2}"
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Now the single `1` characters are also affected, because at least one, and at most, two.

# [ab]

Either `a` or `b`.

```bash
cat myfile | egrep --color=always "a[cj]"
Ross and Rachel
Sheldon and Leonard, Howard and Raj
```

Here only R`ac`hel and R`aj` are colored. Because we told `grep` to match something that starts with "a" and is followed by either "c" or "j". Note that you can add as many characters as you want in between the characters, a bracket means either one of the characters inside it.

# ()

Parentheses simple group characters to make them act as one.

```bash
$ cat myfile | egrep --color=always "(ss){2}"
$ cat myfile | egrep --color=always "(ss){1}"
Ross and Rachel
```

Above, we sorrounded the `ss` with parentheses so it is a group, so now {2} means two `ss`s or `ssss`. That's why our patterns matches when we count it as one set of `ss`.

# |

A pipe means "or".

```bash
$ cat myfile | egrep --color=always "(Ross)|(Joey)"
Ross and Rachel
Joey, Pheobe, Mike, David
```

Here, "Ross" and "Joey" are matched, because first of all we made Ross and Joey into a group so they will be acted upon as if they are a single character, then we said, either Ross or Joey. To see an example without the parentheses:

```bash
cat myfile | egrep --color=always "a|b"
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
```

Here all "a"s and "b"s are affected.

# ^

Beginning of the line.

```bash
$ cat myfile | egrep --color=always "^M"
Monica and Chandler
```

Only Monica is matched because that "M" is immediately after the beginning of the line, but Mike is not like that.

# \$

End of the line.

```bash
$ cat myfile | egrep --color=always "r$"
Monica and Chandler
```

Only the "r" in Chandler is matched because that's the only "r" that is immediately followed by the end of line.

# ^ again!

It also means "not" in a special case, when it is the first character in a bracket.

```bash
$ cat myfile | egrep --color=always "^[^MRJ0]"
Sheldon and Leonard, Howard and Raj
```

What happened? We told `grep` to give us the lines that start with chracters that don't include "M", "R", "J", and "0". So the lines that had those characters in the very beginning are not matched at all. Only the "S" in sheldon is matched because it's not one of those ommited characters and is immediately after the begining of the line (the first caret).

# Some shortcuts

There are cases that are very common, like "numbers", or "lower-case characters" or "upper-case characters". We have some shortcuts for those:

```bash
$ cat myfile | egrep --color=always "[0-9A-Z]"
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
0 1 2 3 4 5 6 7 8 9 10 11 12 13
```

That matches all the numbers and the upper-case characters. Similarly:

```bash
$ cat myfile | egrep --color=always "[a-z]"
Monica and Chandler
Ross and Rachel
Joey, Pheobe, Mike, David
Sheldon and Leonard, Howard and Raj
```

# Conclusion

This is by no means even close to what regex can offer, but here is not the place for talking about regex in too much details (though I'd love to go on). Just make a quick search in google to get overwhelmed by how powerful it can be :D But remember, you don't need all of that. And also remember that whilst regex is amazing, it can get tricky in term of performance. This amazingness is due to the underlying algorithms and those, if not treated properly, can get ugly. But for our purposes here and now, it's totally worth it and it helps us an enormous deal. Try to practice it for a while, maybe search for examples online so you see how sophisticated it can get.
