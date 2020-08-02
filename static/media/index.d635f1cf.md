Here we will see even more command line programs that give us even more power when working with streams. Let's dive right in.

# nl

`n`umber `l`ines. The best way to understand it, is to use it:

```bash
$ cat file | nl
1	first line
2	second one
3	third
4	and fourth
```

It simply numbers the lines of a stream, and here you can easily see that we first printed the output of the file to the standard output and then passed that to `nl` so that it numbers the lines for us.

# fmt

If you've ever worked on a vertical screen or if you remember the old monitors with their square-shaped aspect ratios, you know that keeping lines in less than a certain length will improve the reading experience (if you're a programmer, you already should be familiar with this concept). `fmt` can help us force break lines when they exceed a certain character count. Copy this exact paragraph (this one, that you are reading right now and you're about to finish) and remove the line endings (make it a long one line text) and put it in a file, then:

```bash
$ cat file | fmt -w50
If you've ever worked on a vertical screen or
if you remember the old monitors with their
...
```

You can clearly see that the file's content (which was in a single line) is now broken into multiple ones. By default `fmt` will break on 75 characters but we can modify that just like we did above.

# uniq

This one speaks for itself as well.

```bash
$ cat file
one
one
two
two

$ cat file | uniq -c
2 one
2 two
```

# cut

This one is extremely helpful, useful, and beautiful. Is it obvious that I used it too much before or should I keep talking about it? Imagine that a file is composed of rows and columns just like spreadsheets, now `cut` helps us easily alter the columns whilst `grep` and others take care of the lines. Let's see some examples:

```bash
$ cat file
this is just a line

$ cat file | cut -c1,3
ti

$ cat file | cut -c1-3
thi
```

Got those two easy ones? `-c` stands for characters and easily, we can see that comma means "this and that" but a dash (-) means "this to that". However:

```bash
$ cat file | cut -d' ' -f1,3
this just
```

The `-d` option sets the `d`elimiter, and above, we set it to space (it's tab by default). Then we filter the `f`ields "one and three" (`-f`). That's why the first and third word is printed. Similarly, we could use dash:

```bash
$ cat file | cut -d' ' -f2-4
is just a
```

# rev

You may think that the `rev`erse of something is not really useful, but it really is. Take a look at the basic usage of `rev` first:

```bash
$ cat file
something here?

$ cat file | rev
?ereh gnihtemos
```

Now let's say we want to remove that question mark, we could count all the characters and do something like this:

```bash
$ cat file | cut -c1-14
something here
```

But what if we don't know how long the sentence is before the question mark? In that case, it's easier to reverse the string of characters and remove the first one, then reverse it again! Because we know that the question mark will always be at the end, so when reversed, it'll always be the first.

```bash
$ cat file | rev | cut -c2- | rev
something here
```

First we reverse the string, then we cut from the second character to the end (putting no number after the dash means to the end), then we reverse again back to the original.

<p class="note">I wanted to talk about <code>tr</code> too, but I thought it was overkill for this book, if you're interested, take a look at some online resources or just the man page if you're feeling too adventurous.</p>

# Conclusion

Now I think you start to see the power we have over streams. I promise the next chapter will be our last on streams, I know you might be tired, but you’ll appreciate these stuff later on in your life.

