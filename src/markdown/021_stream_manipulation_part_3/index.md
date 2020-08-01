---
layout: post
title: Chapter Twenty one - Stream manipulation part 3
pathToImage: ../../pic.jpg
---

Now before we begin, I just have to mention that you most definitely won't learn everything about `sed` and `awk` here. There are books written on each of these programs. So don't expect this to be the mastery of these commands, instead, think of this chapter as just an introduction.

## sed

`s`tream `ed`itor. I love this one in particular, I learned it via `vim`'s integration and got amazed by how much I was able to do with it. Let's see it's structure first:

```bash
sed 's/old/new/'
```

There are three sections that are passed to sed, the first section (which is `s`) is short for `s`ubstitute, so `sed` will replace every `old` with `new`. Let's see it in action:

```bash
$ echo "something here" | sed 's/here/there/'
something there
```

See? It replaces `here` with `there`. You could also use a file as the input for `sed`, just like this:

```bash
$ sed 's/here/there/' ./file.txt
```

And to use multiple actions in one command, just use `semicolon`:

```bash
$ echo "something here" | sed -e 's/something/anotherthing/; s/here/there/'
anotherthing there
```

Now what if we have a good amount of commands that we want to store for later usage? We can store the actions in a file and run `sed` fed with that script file (command file):

```bash
$ echo "s/something/another/; s/here/there/" > command_file
$ cat command_file 
s/something/another/; s/here/there/
$ echo "something here" | sed -f command_file
another there
```

And to combine the command file with the input file, we obviously do this:

```bash
$ sed -f command_file input_file
```

Now take a look at this command:

```bash
$ echo "something and something" | sed 's/something/hey/'
hey and something
```

You see what happened? `sed` did replace the first "something" with "hey" but it missed the other one. To tell `sed` that we need to replace all (and not just one), we should use another option:

```bash
$ echo "something and something" | sed 's/something/hey/g'
hey and hey
```

Think of it as `g`lobal option. So the command below should make sense now:

```bash
$ echo "star is * *" | sed 's/*/beautiful/'
star is beautiful *
```

But if you come from a programming world, you may think that `*` can be a `regex` (if you don't know what that is, just skip the rest of `sed`'s commands below or come back to it after we learned it later on in the course), well take a look at the one below:

```bash
$ echo "star is * *" | sed 's/.*/beautiful/'
beautiful
```

See what happened? When added after the . (`dot`), star symbol will mean as Zero-Or-More of any (.) character. And just to give you two more examples:

```bash
$ echo "something here" | sed 's/^/@/'
@something here
$ echo "something here" | sed 's/$/@/'
something here@
```

The `caret` means the `beginning of the line` and the `dollar sign` means the `end of the line`. Now `sed` has many more options and even other syntaxes. Just search for it and you'll find loads of tutorials online and in forms of books.

## awk

It's man page says that it's a programming language, so, yeah! I don't dare to claim that I even know it enough, I have a sense of what it's basic usages are, so here are some interesting usages of `awk`:

```bash
$ awk '{print}' file
this is some file's content
and another line
```

And to use it like grep:

```bash
$ awk '/another/' file
and another line
```

It just printed the line that had "another" in it.

```bash
$ awk '/another/ {print $1,$2;}' file
and another
```

The example above will print the first and second column of the line that contains "another". The equivalent to that would be:

```bash
$ cat file | grep another | cut -d' ' -f1,2
and another
```

But that's too much more work to do when compared to `awk`. Another useful example of `awk` may look like this:

```bash
$ ls -l | awk '{print $3,$9}'
john somefile
john anotherfile
```

What we did was to filter only the third and ninth column of the output that `ls -l` makes, which results in the file's owner and name to be printed.

## Conclusion

Your only limit is your imagination now. You know way too many powerful tools to not be able to do almost anything with them. I'll wrap the stream manipulation right here because we have seen enough! Using only these commands that you know by now, you can produce unimaginable outputs just by combining the programs and piping them together through the standard streams. I hope you enjoyed these three parts, because when I first learned these, I was amazed by the possibilities and the opportunities they gave me. Just being able to do this much in the terminal is enough to make you feel good about yourself. So that's it for now, see you in the next chapter with more fun stuff.

