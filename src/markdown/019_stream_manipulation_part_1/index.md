---
layout: post
title: Chapter Nineteen - Stream manipulation part 1
pathToImage: ../../pic.jpg
---

Now we know how streams work but without knowing how we can manipulate them, what good are they? So let's begin by the most useful commands:

## grep

This is a very useful command, I use it on a daily basis (literally). Simply, it filters the stream and shows only the lines that contain a specific string of characters. Seeing it in action is far easier to understand. First let's create a file with these lines in it:

```bash
one
two
three
```

And now:

```bash
$ grep n file.txt
one
```

What happened? we passed two arguments to `grep`, one is what to filter on and the other is the name of our file. `grep` goes ahead and prints the lines which have `n` in them (here only one has the character `n` in it). Let's try it one more time:

```bash
$ grep t file.txt
two
three
```

```bash
$ grep three file.txt
three
```

Depending on your distribution, there may be some internal configuration that makes grep be colorful or not. That all happens because of a useful option that `grep` has, namely, `--color`. Go ahead, take a look at the man page and figure out how to use it. Just open up the man page and search (slash (`/`)) for it.

<p class="note">Note for curious fellows: By default, grep doesn't apply the color. But the guys that configured your distro have changed a file named .bashrc (which is bash's config) in your home directory to apply the color option. It uses an alias to do that which we will cover later on. Just use <code>$ grep grep ~/.bashrc</code> to see which line is doing that job.</p>

There are numerous use cases where `grep` comes in handy and I'll use it in different circumstances later so don't worry about examples because you'll see it more often.

## head and tail

To filter the beginning or the end of a file, we can use these two commands. They're really helpful. Not just because they give you the head and tail, because they ONLY give you that :) I personally had a huge text file (close to 2G) which I needed for university data processing homework. Almost all the text editors crashed when I tried to open that file, but i needed to see the structure of that file (not seeing the whole thing but getting an idea of how the file is organized). So i just used these two commands and they worked like a charm :D First create a file with 15 lines or more, then:

```bash
$ tail file.txt
```

You'll see that it gives you the last ten lines. Both of these commands accept a number option:

```bash
$ head -n 5 file.txt
one
two
three
four
five
```

## sort

It does what it's named for. Sorts!

```bash
$ cat file
a
ab
bbab
aab
bab
```

```bash
$ sort file
a
aab
ab
bab
bbab
```

Take a look at it's man page and note that it also has a `-r` option to reverse the sorting behavior.

## wc

I just want to know who named this program :/ It's short for `w`ord `c`ount.

```bash
$ cat file
hello world
and
hi
```

```bash
$ wc file
3  4 19 file
```

The first number is line count, second is word count and third is for character count. You may say that “I literally counted the characters here and they're 16, what the hell is that 19?”. That's because you're ignoring the EOL (End Of Line) characters that tell your text editor or bash to show them in separate lines. This text from a computer's perspective is like this:

```bash
hello$world%and%hi%
```
Where the dollar sign is for space and the percentage is for new-line (`\n`). Whenever a text editor or any other program sees these special characters, they show you the text in separate lines. If you don't believe me, execute this command:

```bash
$ hexdump -C file
00000000  68 65 6c 6c 6f 20 77 6f  72 6c 64 0a 61 6e 64 0a  |hello world.and.|
00000010  68 69 0a                                          |hi.|
00000013
```

This command shows you the hexadecimal version representation of the file you give as an argument. Think of it as a low-level viewpoint that computers understand. Don't pay attention to that first column, that's your offset, if you're too curious read the note below for that. But you can clearly see that `6c 6c` is for that `ll` part of hello and the `0a` is for the new-line character which is shown as a dot in the `ascii` representation on the right.

<p class="note">About the first column: An offset is the location from the beginning of the file. Like if the very first byte of the file is the Zero location, then that first column shows where the current line starts (in hexadecimal). For instance the second line's first column says 00000010 which in hexadecimal means 16 and that is because in the first line, we have 16 bytes (or character if you imagine in ascii).</p>

Back to our wc command. It has three useful options:

- `-l` (line)
- `-w` (word)
- `-m` (character)

So if you supply any of the above options, `wc` only gives you that piece of information instead of all three. It may seem unnecessary now, but it's really useful to get only a single number as our output to pass to other programs.

## Use them with pipe

All these commands that we learned in this lesson work with streams too, so instead of supplying a file name to read their content from, we can pass streams to them. Remember `pipe`? Here we go:

```bash
$ echo -e "one\ntwo\nthree" | grep n
one
```

Let's see what happened. If you execute only the part before the pipe, you'll see that it prints one two three in separate lines (because we provided the new-line characters). Now when we add the pipe part, we are actually passing this output to `grep` so that `grep` processes the output of echo instead of it being printed on the terminal. That's why we don't see the output of echo being printed, instead, it is passed to `grep` and `grep` filters the lines which have `n` in them and then returns only a single line with `one` in it. Now take a look at this one:

```bash
$ echo -e "one\ntwo\nthree" | grep t | sort
three
two
```

Here, we first pass the output to grep so only the lines containing the character `t` are printed, then we pass that output (which is `two\nthree`) to `sort` so that it's sorted character by character (hence `three` coming before `two`). Now this is the beauty of streams. Through passing our stream to different programs, we can get the most out of them:

```bash
$ echo -e "one\ntwo\nthree" | grep t | sort | wc -l
2
```

Here the output of `echo` is passed to `grep`, then the output of `grep` is passed to `sort` and lastly, the output of `sort` is passed to wc and it's option `-l` prints the number of lines.

## Conclusion

Now you know the power of pipe and streams. In the next lesson we learn more programs and begin to do more interesting stuff with streams. Have some fun with these commands before joining me on the next lesson. See you there :)

