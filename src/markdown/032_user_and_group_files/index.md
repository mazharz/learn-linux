# /etc/passwd

Go ahead and `less` the output and navigate to the end of the file:

```bash
[username]:[x]:[UID]:[GID]:[Comment]:[Home directory]:[Default shell]
john:x:1000:1000:John Doe,,,:/home/john:/bin/bash
```

What are we seeing here? First line is the format in which you'll see the info in. Second is an actual line in this file. Lines are separated by colons, so there are a fixed number of columns for each line. Here are the columns:

- `username`: obvious
- `x`: if there is an x in the second column it means that the password for this user is stored in a shadow file (which we'll see in a moment)
- `UID`: User ID
- `GID`: Group ID of the primary group to which the user belongs to
- `Comment`: Just some comment to describe the role of user, here in ubuntu, it's the full name of our user
- `Home Directory`: obvious by now
- `Default Shell`: obvious by now

In fact when you use the commands from the last chapter, you are modifying these files :D But you shouldn't do them by hand, it's not a good practice. Always use those commands for management.

# /etc/group

```bash
[Group name]:[Group password]:[GID]:[Group members]
adm:x:4:syslog,john
```

- `Group name`: obvious
- `x`: same as before, x means the password for this group is in the shadow file (the group shadow file not the user shadow file)
- `GID`: Group ID
- `Group members`: Comma separated users that are in this group

# /etc/shadow

Here is the user shadow file:

```bash
[username]:[password]:[last-pass-change]:[min-days-between-pass-change]:[max]:[warn-days-before-deadline]:[inactive]:[expire]
john:$6$cP3...fA3:18229:0:99999:7:::
```

- `username`: obvious
- `password`: the password stored in a common hash format. The first part (`$6`) defines the type of hashing algorithm used to hash the password and the rest (after the second `$`) is the actual password stored in hash format.
- `$1$`: MD5
- `$2a$ and $2y$`: are blowfish
- `$5$`: SHA-256
- `$6$`: SHA-512
- `lass-pass-change`: The last time users password was changed (note the unit is days since January 1st 1970 ( Why? find out for yourself)
- `min-days-between-pass-change`: Minimum number of days after which a user can change his/her password.
- `max`: Maximum number of days after a user can change his/her password! (meaning that after that number of days, user must change his/her password)
- `warn-days-before-deadline`: Number of days before the `max` to warn the user so s/he can change her/his password.
- `inactive`: number of days after `max` password expires so that the account is disabled.
- `expire`: a date to expire the user in
- `last field`: literally nothing! it's reserved for the future :/

<p class="note">What is hashing? Hashing is the process of transforming a string of characters into a jibberish thing that doesn't reflect the password. This is a one way process, no one (mathematically) can transform the hash back into the original string. That's why we store passwords like that. How programs validate the password you might ask? They ask for a password, you enter one, they hash it again and compare it to the stored hashed password and if equal, they grant you with permissions. This way no one can know the password but it still works :)</p>

# /etc/gshadow

The group shadow file:

```bash
[group name]:[password]:[group admins]:[group members]
```

They are all self-explanatory so I won’t repeat myself.

# Conclusion

Yeap! That's it! Good enough :) Now you have a pretty good understanding of users and groups in Linux. Next lesson is going to be about `bash`! Yes, our shell, we will learn more about it.

