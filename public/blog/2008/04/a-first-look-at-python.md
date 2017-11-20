title: A First Look at Python
date: 2008-04-12 01:47
excerpt: 
categories: programming, python

So I've been looking at and using Python recently. I thought I'd share some of my thoughts for those who haven't had a chance to play with the language yet. I'll try to avoid a preachy OMG-I've-just-discovered-the-best-thing-ever post, or to simply write another Python tutorial. I'll look at the good and bad points of the language.I first looked at Python a month or two ago. The guy and girls over at [programming.reddit.com](http://reddit.com/r/programming) push it as the language to end all languages, so I decided to grab a copy of the (free!) [Dive Into Python](http://www.diveintopython.org/) book. I started putting together a smallish personal project, but with no external pressure it petered out. When a discussion came up at work (a PHP shop) on how to quickly write a reliable server daemon I pushed the idea of Python. It took a little convincing, but the results speak for themselves.

<!--more-->

## Picking an Editor

I believe that the editor can make a huge difference to how you perceive a new language. What might be a massively frustrating time-sapping bug in one could be pointed out and corrected be another. Python doesn't have any kind of officially recommended editor, and it can take a few hours to really get the feel of an IDE. Picking an editor when you don't even know a language is even worse.

Dive Into Python suggested using Activestate's Pythonwin. Unfortunately this advice seems to be very dated; the IDE was functional, but basic. I appreciated the in-built debugger and auto complete, but the editor itself seemed a little too rudimentary.

I eventually switched over to [Open Komodo](http://www.openkomodo.com/), also by ActiveState. The IDE is very good and does a lot of hand-holding that newbies appreciate, like looking after whitespace issues, providing auto-complete and picking up syntax errors. It does have a few drawbacks: it's an editor, not an IDE, so you will need to run and debug your code outside the editor. It's missing a few basic features, like a function list, but the problems are fairly minor. It is built on Firefox's XUL platform so perhaps we'll see more extensions becoming available in the near future.

## Interactive Shell

The number one tool for making Python easy for beginners would have to be the interactive shell. There have been countless times when I've just jumped over to the shell to test how certain Python functions work. Even copying and playing with examples in the Dive Into Python book helps you better absorb the information. In other languages testing functionality would mean I'd need to create a new file, add my code, save it to a temporary location and then execute it. The interactive shell actively encourages me to experiment with how object behave, rather than adopting a cargo-cult mentality of just using what has worked in the past.

## The White Space Issue

Python's use of white space seems to be a big issue amongst those that are not familiar with the language. It was one of the objections that I faced when proposing it at work. It tends to put Python in the "weird language" basket, which is unfortunate. After using the language I'd say that the white space issue is largely irrelevant.

It does have some negative effects. It means you'll have to watch out for tab/space issues, but a good IDE should do that for you. It also make refactoring a little bit more difficult; I like to sometimes comment out a conditional statement, but that is not possible in Python. Sometimes I also like to indent my code for readability, for example if I'm printing out HTML I'll indent some child elements to indicate that they are related to previous lines. Again, that's not possible. The biggest issue I see is that there is nothing stopping you from accidentally breaking the flow of your code. If you took a Python code file and removed the whitespace you can loose meaning:

```python
for item in list:
if item.available:
item.update()
item.check_stock()

```
It's impossible to tell where the statements should be. Are we calling _check_stock _on every item, or just the available ones? Sure, this is contrived, but I can see something like this happening.

The advantages of the white space convention become very obvious very quickly. Python code is very compact. Not "what-the-hell-is-this-Perl-code-doing" compact, but actual readable compact non-ugly code. I've heard some people describe it as "prose". That is going a bit far, but it is very neat and easy to read.

## Lists, Dicts and Tuples

Python makes working with data sets incredibly easy. It has made me realise how much of my programming is actually just munging sets. Something I'd envisage as the driving part of a module can be converted from a nest of loops and conditional statements into a single line.

Python list comprehension is the magic that makes this happen. What makes it even better is that the code is just as readable, perhaps even more so, than the verbose multi-line version. Python's syntax makes list invocations feel like a natural extension of for loops, meaning it is a great way to get programmers stuck in the imperative mindset on board.

```python
#Hmmm
new_list = []
for item in old_list:
    if item % 2 == 0:
    new_list.append(item * 2)

#Yay, list comprehensions sort it all out
new_list = [item * 2 for item in old_list if item % 2 == 0]
```
I've used map and filter functions to do the same thing in the past, but the lambda functions feel like they are out of place when transforming a list.

## Syntactic Sugar

People love to repeatedly trot out one or two new features in the blog posts they write when they've just discovered a language. I'm no different. However I usually end up look at these contrived examples with a skeptical "but how often do you really use that?" So I'll do you a favour and share some features that will become second nature to you in Python.

Tuple (and list) unpacking is a really neat feature. It makes a lot of code very concise. In this example the _range_ function returns a list of [0, 1, 2]. The values are unpacked and assigned to the three variables a, b and c.

```python
a, b, c = range(3)
```
This gives you the cool feature of multiple return values in a way that fits into the language and doesn't feel bolted on. Even better, it does it without needing to implement some one-off syntax to achieve it. You can use the same unpacking feature anywhere in your code. And yes, you will use it.

```python
data = [(1, 3), (3, 6), (4, 7)]
print [x + y for x, y in data]
#x and y are automatically unpacked
```
Another neat feature is the way Python treats everything as an object. This means the following code is perfectly valid.

```python
"!" * 5
"Hello world".split()
", ".join(values)
```
Note that join works on the string variable, not a list as you may expect. This is not as widely used as the tuple unpacking, but does have it's place with string munging.

## Modules

One of the (few) compliments given to PHP is that it has modules for pretty much anything. From my experience, albeit limited, with Python I'd have to say that it deserves the same accolades. The project I have been working on has made use of threads, queues, HTTP servers and clients, config and command line parsers as well as sub processes (including writing to _stdin _and reading _stdout_). Everything I've wanted has been available as a pre-packaged module. (OK, I lie, I wanted a HTML generator. I ended up downloading [markup.py](http://markup.sourceforge.net/) and was up and running in a couple of minutes). Each of the pre-packaged modules seems well written too. Their components can be set up and used with little or no boilerplate and does what I need with very few exceptions.

The actual module system is a welcome sight for a PHP programmer. It's a lot better than the "throw everything into the global namespace" method I've grown used to. It also means you can be sure that your required modules actually exist at runtime, instead of facing the prospect of your program failing mid-execution with "function X does not exist"

## Documentation

PHP has spoilt me with its fantastic documentation. Python documentation is adequate, but it could be better. The API reference shows the functions and classes within a module, but could benefit code examples, gotchas and so on. It would also be great to find more links between related parts of the Python documentation. Usually I'll need to supplement the Python documentation with a Google search for more information. PHP's comment section is great in this regard. If someone posts to the documentation then they usually have something worth saying.

## It's Guido

One cools thing I've noticed when searching for Python examples is that [Guido van Rossum's](http://www.python.org/~guido/) name keeps appearing all over the place. I don't know much about Guido, but it's cool to see a language creator being so heavily involved in his creation. It is a kind of vote of confidence that makes me feel the language is worth learning.

## Am I a Convert?

So, Python's a great language, but am I a convert? Is this the end of PHP for me? Well, no. It's a bit soon to be making that call. I've only used the language for a few weeks, and the first couple of weeks in a new project are always the most productive.

There are still quite a few things I like about PHP too: its documentation, easy integration with Apache and the new OO features are making it much more bearable. My knowledge and experience with PHP is not something I want to throw away on a whim. I know PHP's strengths and weaknesses. I know exactly how far I can push it before things go bad. That knowledge is not something to underestimate. At this stage Python is still an unknown. I have no idea how will it perform in a web environment or how it will handle itself under a large load.

So, Python is a language that I can choose to use when appropriate. I can honestly say it's been enjoyable so far and I'll look forward to learning more.

## So You Want More?

If you want to learn Python right now then check out the free [Dive Into Python](http://www.diveintopython.org/) book.

If you are looking for something more lightweight, then the [Python in Ten Minutes](http://www.poromenos.org/tutorials/python) tutorial is a good one.

Unfortunately I can't find anything that fills in the gaps between these two resources. If you do know of something then please let me know by leaving a comment below.