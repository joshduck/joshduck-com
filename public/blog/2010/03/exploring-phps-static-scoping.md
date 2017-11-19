title: Digging deeper into PHP's static scoping
date: 2010-03-19 11:51
excerpt: 
categories: php, programming

Redditor troelskn made an interesting [observation](http://www.reddit.com/r/PHP/comments/bbc81/what_can_singletons_teach_us_about_php/c0lxkn2) about my recent blog post about [Singletons](/blog/2010/03/10/singletons-what-can-they-teach-us-about-php/), pointing out that static variables defined within a method behave completely differently to regular static properties. I use static method variables often but still found this behaviour surprising. I decided this was a good opportunity to find out exactly how static methods, properties and variables work in PHP.<!--more-->

I put together a few test cases to compare the **static** and **self** keywords as well as to look at class introspection methods. You can see the [code and results here](/random/static.html). I'll step through each of the tests and examine them in detail.

This post covers advanced behaviour of static scoping. [An introduction to PHP's static scoping](/blog/2010/07/29/an-introduction-to-phps-static-scoping/) gives a primer to readers who are looking for something simpler.

## Self Keyword

The [first example](/random/static.html#test1) takes a look at PHP's **self** keyword, which was introduced with PHP 5.0\. It uses what is known as "compile time binding". This essentially means that PHP's compilation stage replaces any references to **self** with a reference to a specific class.

In our examples the [calls](/random/static.html#test1-A-testA) to `self::whoBase()` and `self::whoOverridden()` will be compiled as though we had written `A::whoBase()` and `A::whoOverridden()`. Therefore calling `**B**::testA()` is always going to produce the same result as `**A**::testA()`; both telling us that the class name is **A**. Because of this a method which has non-trivial use of the **self** keyword is almost always useless when inherited.

There are two main reasons that inheriting static methods properly is not possible with compile time binding. Firstly the compilation process does not know which subclasses might inherit from class being compiled. Subclasses could be `import`-ed at any time in the future, so the compilation stage must ignore _all_ subclasses for consistency. The second and more practical reason is that **self** references can only by replaced by a single class reference, so the compiler _must_ choose the super class.

The takeaway from this is that you should assume that a self method call or property reference will be unaware of any subclasses.

## Static Keyword

Obviously PHP developers weren't happy with the limitations of **self**; even Zend [ran into it's limitations](http://blog.joshuaeichorn.com/archives/2006/01/09/zactiverecord-cant-work/). The lack of usable inheritance meant the utility of static methods was greatly reduced. Thankfully PHP 5.3 introduced [late static binding](http://php.net/manual/en/language.oop5.late-static-bindings.php) through the **static** keyword, which can be used interchangeably with **self**.

Late static binding means that the decision as to which class **static** references should resolve to is not made until the code is called. When `B::testA()` is called in our [second example](/random/static.html#test2) the PHP runtime makes a note that the method was called on class B. When the runtime encounters the call to [`static::whoOverridden()`](/random/static.html#test2-A-testA-whoOverridden) within that method it translates the **static** reference to class B, as that's the class it noted earlier, and dispatches a call to `B::whoOverridden()`.

Surprisingly PHP won't forget that **static** should still resolve to B even if we add in **self** method calls in between the two steps. If we call the test method [`B::testAViaSelfReference()`](/random/static.html#test2-A-testAViaSelfReference), which is defined in A, we might expect that the call to `self::testA()` would cause future **static** references to point to A. However we actually get the same result as we'd get without the **self** misdirection: the reference to class B is not lost. Only explicit references to a class by name will reset what **static** refers to. This is demonstrated by the test method [`B::testAViaExplicitReference()`](/random/static.html#test2-A-testAViaExplicitReference).

You will have noticed that the **static** keyword is also used for  static method and variable declaration. This dual usage only exists to   save the language authors from defining a new PHP keyword, and shouldn't  be taken to mean any more than that.

The rule of thumb for static keywords is that they will always resolve to the class named _explicitly_ in the calling code.

## Static Method Variables

[Static variables](http://php.net/manual/en/language.variables.scope.php) have been available since PHP 4 and allow you to define a persistent variable that is only accessible from the current function. This allows you to encapsulate state into a function or method and can eliminate the need for classes where a single function will suffice.

The [third tests](/random/static.html#test3) show that surprisingly, when a static variable is defined inside a class method they will always refer to the class on which the method was called. In doing this they act almost like properties referenced through **static**, though there are subtle differences.

Our test [`B::selfCount()`](/random/static.html#test3-A-selfCount) increments A's count, which indicates static variables can't preserve the calling class scope like we just saw the **static** keyword do. I can see this being potentially problematic if have an inherited method containing a static variable that is called from both inside and outside it's class.

If you find yourself doing this I'd suggest always using the **static** keyword rather than **self** for method calls inside the class, otherwise you _will_ end up with two separate static variables in your method, one attached to the subclass and one to the super class. Alternatively, you could use static properties inside class methods and only use static variables from within plain functions.

## Static Class Introspection

The [final test classes](/random/static.html#test4) look at the different ways we can check which class our current scope is attached to. The older `get_class()` method and `__CLASS__` constant will always tell us where our methods are defined but not what class they are called against.

The function `get_called_class()` is new in PHP 5.3 and is the late static bound equivalent to `get_class()`. It returns the called class and has the same behaviour as the **static **keyword.

## That's All

I found this little experiment to give me a much better insight into those tricky corner cases I generally try and avoid because I'm unsure of how PHP will act.

The behaviour of static variables is still the most surprising result, though I'm sceptical to whether anything interesting can be done to make use of its abnormal behaviour (like using it to create pseudo late static binding for pre-PHP 5.3 setups). The side effect of using **self** with static variables has convinced me that the **static** keyword is probably a better choice when available. [Singletons](/blog/2010/03/10/singletons-what-can-they-teach-us-about-php/), pointing out that static variables defined within a method behave completely differently to regu