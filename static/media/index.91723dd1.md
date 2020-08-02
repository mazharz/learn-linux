You have no idea how much good stuff is about to enlighten this journey of ours. You may think that these first steps of our journey are "not as useful" as the important parts of Linux that we should learn. But that can't be more wrong. For example, every command that we run somehow shows us something right? Remember when we used the `-h` how the command wrote it's output on the terminal? Now we're going to learn just that.

# echo

echo will write on the terminal. Take the analogy of screaming in the mountains, when your voice is echoed back to you:

```bash
$ echo is there anybody out there?
is there anybody out there?
```

If you've done any programming you know what a string literal is. But if you don't, let me explain it to you. A literal is exactly what it is, right? So a string literal is literally a string. String in programming is referred to as a string of characters. So any sentence you imagine, can be a string literal. In programming strings are enclosed in double or single quotes. So "this is a string literal". Why am I telling you this? Because you ought to give echo a string. The correct form of the command above is like this:

```bash
$ echo "is there anybody out there?"
is there anybody out there?
```

It may not make a difference now, but be patient, you'll see the difference in just a moment. Now let's see some cool options of echo.

- -n
- -e
  - \t
  - \n

Let's try them out:

```bash
$ echo -n "All nightmare long"
All nightmare long$ _
```

You'll notice that the prompt will immediately follow the printed string. This is useful in situations like you want to print multiple echo commands but you want the output to stay on the same line. Now let's see the other option:

```bash
$ echo -e "the first line\nthe second line"
the first line
the second line
$ _
```

What just happened? Let's see what the man page of echo says about this option: "`-e` enable interpretation of backslash escapes". Our friend, the man page, is right. And the meaning of `\n` is a newline. That's why everything after the `\n` will appear on the second line. Now let's see what happens if we don't put those quotes around our string:

```bash
$ echo -e the first line\nthesecond line
the first linenthesecond line
```

See? I told you the double quotes matter. Here the `\n` is interpreted as literally `n`. Now it's time to see how we can insert tab characters:

```bash
$ echo -e "before tab\tafter tab"
before tab        after tab
```

That's all you need to know about echo for now. Later, if you get into scripting, you'll notice that you need to learn more about it. And then, you'll be comfortable using the man page.

# cat

Remember this fluffy command? Back then I told you that it was a cat playing the shadow game. But I was lying :( Sorry to disappoint you, `cat` is short for concatenation. You are already familiar with the simplest use of it:

```bash
$ cat
something
Something
```

You can use `control+d` to tell cat you’re done with your input. Now go ahead and open the text editor in your distribution. Write something in it and save it as "file.txt" in your home directory (it must be in `/home/your_username` or it won't work, you'll learn why later). Now go back to your terminal and use cat like this:

```bash
$ cat file.txt
this is the content of the file.
```

You should be able to see the content of your file printed out. Now create another file named "file2.txt" the same way you did for "file.txt" Then use cat like this:

```bash
$ cat file.txt file2.txt
this is the content of the file.
and this is the content of the second file.
```

You should see the content of both files printed in the order you provided them. That is the concatenation of multiple files. Later we’ll learn to put back the output into a file so we concatenate the two files and write it in another one.

# tac

Can you guess what this program does? Change your first file so that it has two lines at least. Then run our cat to see if it works fine:

```bash
$ cat file.txt
line 1
line 2
```

Now try this:

```bash
$ tac file.txt
line 2
line 1
```

That was a very complicated command to learn! As surprising as it may seem for this command to be useful, it actually is. Imagine you have a file which contains thousands of lines. And you decide to view the first line of that file. If you use `cat`, you will have to scroll back up thousands of lines, but using `tac`, you’ll see the first line where the output ends (which is right before your prompt). This is just one possible use case for this command, in fact the next commands will provide a better solution to this problem of viewing large files.

# more

Change your file's content to have like a dozen lines. Using cat isn't the best method to view that file's content anymore. You can use the command `more` to view file content page by page:

```bash
$ more file.txt
```

When the content is less than a page of terminal window, more will work the same as cat but when there's more content, you can see the content, page by page by hitting the space or line by line by hitting the enter on your keyboard. I don't know if you noticed or not, but you can't go back a page :/ I swear I haven't used `more` to view anything. The reason being the existence of less.

# less

If you're a minimalist, you may believe that less is more. Linux seems to be believing the same thing. `less` command is literally more than more. It does a better job at showing file content.

```bash
$ less file.txt
```

Now you can use your arrow keys or the `page-up`, `page-down` keys to navigate (if you manage to learn `vim` in future, you’ll notice a few similar key combinations like `g` or `G` to navigate to the top or bottom). To get out of `less`, similar to man pages, you can use the `q` key on your keyboard. Actually man pages are shown to you via `less`. Now get out of there and try this command:

```bash
$ less file.txt file2.txt
```

Now you can see on the status bar down in your terminal that you are in file 1 of the two files. To switch between the files, you can use `:n` for going to the next file and `:p` for previous. While I'm on a roll talking about `less`, let me tell you that you can search for a keyword using the forward slash key (`/`). Hit that and type something that you know is in your content. The found results will be highlighted and you can view the next match by hitting `n` and the previous by `N` (`shift+n`).

# diff

Before we wrap this chapter up, let's see one more command. This one is used in `git` if you happen to be a developer, you may be familiar with it. Create two files that have a slight difference. Like `file.txt` could be "hello world" and `file2.txt` could be "helo world". Now run this:

```bash
$ diff file.txt file2.txt
1c1
< hello world
---
> helo world
```

I'm not going to teach you `diff` now. But I just wanted you to know that we have something like that, which you can learn later, if you want to. No pressure at all.

# Conclusion

In this chapter we learned how to print on the terminal and how to view file's content in the terminal in case we need to. `echo`, `cat` and `less` are the most important commands that you should definitely consider focusing on. But don't worry about memorizing them, they will be repeated so many times that your brain will have no choice but to recall them. Remember I said that you should definitely put those files in the home directory or the commands won't work? You'll learn in the next chapter why that is and how you can make them work if those files were elsewhere. Take a longer break and when you're ready, meet me in the next one :)

