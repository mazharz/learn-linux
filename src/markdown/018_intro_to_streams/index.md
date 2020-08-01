Think of rivers. They're streams of water flowing through the earth. Streams in Linux can be thought of in the same way. But we have different types of streams:

![Figure of streams](/images/018_intro_to_streams/streams.svg)

A program can receive some input, process it then produce some output or in case of error, report some error. Let's begin by the very basics of streams:

# Input stream

Remember when we used `cat` without any argument? It repeated whatever we put on the terminal. That's an example of an input stream. So you see that it's not a big deal. If you take a look at `cat`'s man page, you'll see that it says: "With no FILE, or when FILE is -, read standard input.". So when we type something into the terminal we're actually putting those characters in the input stream.

# Output stream

Most command line applications and commands use the standard output. Take `echo` as an example, it's man page says: "Echo the STRING(s) to standard output.". So all that `echo` does is writing to the standard output. `ls` does the same thing. Or any other program that writes something on the terminal. But:

# Error stream

There is no visual distinction between error stream and output stream. They're both an output that the commands or applications write on the terminal. But they can be controlled differently (which we'll learn in a moment).

# Let's redirect

We learn the streams to be able to control them. Redirection is a very useful feature that we can use to manipulate where our streams should go. Let's start by the input stream:

```bash
$ cat < file
```

Of course if we omit the `<` we still read the file, but that is one example of how we can use input stream redirector operator. The fact is, most programs which accept input stream, usually also do it via an argument so we rarely use this operator when we’re executing commands (this input stream operator is usually used in scripts). However, output redirection is used quite a lot. Take this as an example:

```bash
$ echo "to be or not to be" > file.txt
```

This will create a file (in the current directory obviously) and put `echo`'s output in that file. So `cat`ing the file will produce:

```bash
$ cat file.txt
to be or not to be
```
Now this command will overwrite any existing file so if you execute it again, you'll end up with a similar file. But try the command below:

```bash
$ echo "Monica and Chandler!" >> file.txt
```

You'll see that this line will be appended to the previous one. And each time you execute it again, a new line will be added to the file. Using just this command, you can easily make log files. Just append the output to the same file and you've got a log file. Now let's see how we can separate errors from standard outputs:

```bash
$ ls -l file.txt > r
$ ls -l asdfasdf > rr
```

You'll see that the first command will not print anything and the output is put into the `r` file (assuming you had `file.txt` in the directory that you are). But the second one will create an empty `rr` file and report the error in the terminal! That's an error which is treated differently. Now try these two commands:

```bash
$ ls -l file.txt 2> r
$ ls -l asdfadsf 2> rr
```

The functionality is reversed! Now the first command creates an empty file whilst the second puts the error in the `rr` file. That's how we can redirect different streams. Now take a look at this:

```bash
$ rm r rr
$ ls -l file.txt >> r 2>> rr
$ ls -l asdfasdf >> r 2>> rr
```

First, we remove the previous files to avoid any confusion. Now after executing those commands, you can see that the output of the first one is put in the `r` file and the error of our second command is put in `rr`. That's because we redirected both of their output and errors to specific files.

Note that we also have a `1>` which is the exact same as plain `>` but there is yet another one:

```bash
$ rm r rr
$ ls -l file.txt &> r
$ ls -l asdfasdf &>> r
```

This will cause both (output and error) streams to be treated equally and put in the same `r` file. We put two angle brackets in the second command because we want the output to be appended to what the first one created (we could also use double in the first and the result will be the same because append will create a file if not existing).

# pipe

Before wrapping up this lesson there is one more thing we should learn and that is the most useful of all. It's called `pipe`, remember that pipes connect streams of water together? That is exactly what `pipe` in Linux does. It's the character under your `backslash` (`shift + backslash`) which looks like this: `|` (a vertical line).

```bash
$ echo "something" | cat
something
```

Here what happens is that `echo` produces the output "something" and the `pipe` passes that output to `cat`’s input and hence it is `cat` who prints it on the terminal. As another example:

```bash
$ echo -e "1\n2"
1
2
$ echo -e "1\n2" | tac
2
1
```

That right there is the start of something awesome. We can pipe numerous commands together to make our desired output. Just be patient and in the next two lessons, you’ll start to recognize the power of piping.

# Conclusion

Learning streams requires practice so I suggest trying these commands more and more until you're familiar with the concepts and really understand them. In later lessons, we learn other useful commands that manipulate streams more interestingly.

