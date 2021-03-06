title: An introduction to PHP's static scoping
date: 2010-07-30 01:19
excerpt: 
categories: php, programming

The static keyword is a core feature of PHP's object oriented programming. Unfortunately, there doesn't seem to be much in the way of easy introductions available online, so I'd like to give a brief overview of how the keyword functions, and how it should be used.

PHP actually has two distinct uses for the static keyword. The first and most common usage is related class method and property scoping, the second to variable scoping within in a single function.<!--more-->

## Static Methods and Properties

The [static keyword](http://php.net/static "static keyword") allows you to define methods and properties scoped to the class in which they're declared, rather than one particular object instance.

Let's start by taking a look at some code examples.


```php
<?php
class Planet {
	static $count = 0;
	public $name;

	function __construct($name) {
		$this->name;
		self::$count++;
	}

	public function getDescription() {
		return $this->name . ' is a ' . self::getShape();
	}

	public static function getShape() {
		return 'sphere';
	}
}
?>
```

What happens to the static property `$count` as we start creating instances?


```php
<?php
//Outputs 0.
echo Planet::$count;

$earth = new Planet('Earth');
$pluto = new Planet('Pluto');

//Outputs 2.
echo Planet::$count;
?>
```

The static property `$count` is attached to the `Planet` class and not to either of the instances. It can be referenced at any time, even before` $earth` or `$pluto `are instantiated.

We used the `self` keyword in the constructor method to increment the counter with the expression `self::$count++`. Any instance method can access a static property through the `self` keyword - which works much like the `$this` variable does for referencing instance members. Using `Planet::$count` to access the static property would have also worked, but it's best to avoid referencing our class by name when possible.

Let's try calling the static method.


```php
<?php
//Outputs 'sphere'.
echo Planet::getShape();

//Outputs 'Earth is a sphere'.
echo $earth->getDescription();
?>
```

Just like the static property, the static method can be referenced without the need to call against a specific object instance and is called via the `self` keyword in the statement `self::getShape()`.

### When to use static methods and properties

The static keyword is ideal for creating class-level utility methods and for share data between objects of the same type. 

It also tend to get used in older code as a way of segregating code into modules, such as `Log::message()` or `FileHelper::getFilePermissions($filename)`. PHP 5.3 introduced [namespaces](http://php.net/namespaces "namespaces") which are more appropriate for this use case and should be where if possible.

Unfortunately there are a few issues with how static methods and properties work with class inheritance. I've covered some of the nuances of [static scoping inheritance](../2010/03/19/exploring-phps-static-scoping/) in one of my previous posts, which looks at how PHP 5.3's [late static binding](http://php.net/language.oop5.late-static-bindings) resolves the issues.

## Static Variables

Despite sharing the static keyword, [static variables](http://php.net/variables.scope "static variables") are unrelated to PHP's static methods and classes. In fact they have nothing to do with OOP at all. They allow you to define a variable that persists across function calls - effectively allowing you to attach state to any function.


```php
<?php
function hello() {
	static $staticVar = 1;
	$normalVar = 1;
	return "Hello " . $staticVar++ . " " . $normalVar++ . "\r\n";
}

echo hello(); //Prints "Hello 1 1"
echo hello(); //Prints "Hello 2 1"
echo hello(); //Prints "Hello 3 1"
?>
```

Regular variables, like `$normalVar`, only exist within a single function call. As soon as the function returns, the variable falls out of scope and is discarded. This is why the value of `$normalVar` is always `1` on each call. Static variables like `$staticVar`, however, are only instantiated once. The same variable (and value) will be available on subsequent calls to the function.

The statment `static $staticVar = 0;` is only ever evaluated on the first call to the function. Because of this magic static variables can only be instantiated with scalar values (like `1`, `"Hello"` or `true`) and not complex expressions (like arrays, object instances or result of a function call). If you do want to initialise a static variable with a non-scalar value then a little boiler-plate code is needed.

```php
<?php
function hello() {
	static $world = null;
	if ($world === null) {
		$world = new Planet('Earth');
	}
	return "Hello " . $world->getName() . "\r\n";
}
?>
```

I find that static variables are often useful in [memoizing](http://en.wikipedia.org/wiki/Memoization) expensive function call. The memoize function's signature doesn't have to change and I don't have to resort to creating a class with private properties for a cache values or to using global variables to store the pre-calculated value. Ryan Day has posted [an example and benchmark](http://www.ryanday.net/?p=210) using this method.