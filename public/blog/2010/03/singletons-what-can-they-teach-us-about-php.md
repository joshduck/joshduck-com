title: Singletons: What can they teach us about PHP?
date: 2010-03-10 12:54
excerpt: 
categories: php, programming

Why would I be showing you how implement singletons in PHP? Don't I know that the singleton pattern suffers from [obvious shortcomings](http://blogs.msdn.com/scottdensmore/archive/2004/05/25/140827.aspx)? Of course I do, but I have an ulterior motive. Singletons are a simple way to show off some of the features of PHP you probably don't get to see and use too often. Now we've got that covered let's see some code. If you haven't seen a Singleton before the premise is simple: there should only ever be one instance of our class.<!--more-->

<pre lang="php">
<?php
class Greeter {
	protected $count;

	private function __construct() {
		$this->count = 1;
	}

	public function hello() {
		return 'Hi ' . $this->count++;
	}

	public static function getInstance() {
		static $instance = null;
		if ($instance === null) {
			$class = get_called_class();
			$instance = new $class();
		}
		return $instance;
	}
}

class FrenchGreeter extends Greeter {
	public function hello() {
		return 'Bonjour ' . $this->count++;
	}
}

echo Greeter::getInstance()->hello(); //Outputs 'Hi 1'
echo Greeter::getInstance()->hello(); //Outputs 'Hi 2'
echo FrenchGreeter::getInstance()->hello(); //Outputs 'Bonjour 1'
?>
</pre>

Now, there are a few fun snippets in this piece of code. Let's start at the top:

## Private constructors

<pre lang="php">private function __construct();</pre>

A private constructor? Yep. That means that only the Greeter class can construct a new instance of itself. You can try it if you'd like: 

<pre lang="php">
$bob = new Greeter();
Fatal error: Call to private Greeter::__construct() from invalid context in C:\Users\Josh\Examples\singletons.php on line 1
</pre>

Told you so. So this prevents anyone from sneakily constructing a new instance of the class when we're not looking. On to the next snippet.

## Static variables

<pre lang="php">
public static function getInstance() {
	static $instance = null;
</pre>

Defining [statically scoped variables](http://php.net/manual/en/language.variables.scope.php) within functions is a feature borrowed from C. All static variables, whether defined in a method or in the class definition, are bound to the function and will persist across calls. The initial assignment (setting the variable to null) is only executed once - when the variable is declared. You can only assign scalar values on a static variable declaraion so the null assignment and check are necessary to if we are to assign an object or array to the variable.

You can use static variables in instance methods and plain old functions too. If you do use them in an instance method then remember that the variable is bound to the class and not the instance. Take a look at the following code:

<pre lang="php">
<?php
class Counter {
	function count() {
		static $count = 1;
		return $count++;
	}
}

class SubCounter extends Counter { 
}

$a = new Counter();
$b = new Counter();
$c = new SubCounter();
echo $a->count(); //Outputs 1
echo $b->count(); //Outputs 2
echo $c->count(); //Outputs 1
</pre>

Even though $a and $b are two separate instances the static $count variable is scoped to the method, which is in turn scoped to the class, so is shared between instances. When we call the method on $c our static variable is bound to SubCounter so we get the value of 1\. 

## Fetching the current class name

<pre lang="php">$class = get_called_class();</pre>

The [get_called_class](http://www.php.net/get_called_class) method is a long overdue addition to PHP and was added in the 5.3 release with the introduction of [late static binding](http://php.net/manual/en/language.oop5.late-static-bindings.php). The function returns the class which the current method was invoked on. The older [get_class](http://www.php.net/get_class) (when called with no arguments) and __CLASS__ magic constant always return the name of the class where the current method was defined (compile time binding). Let's take a look.

<pre lang="php">
<?php
class A {
	public function who() {
		echo __CLASS__;
		echo get_class();
		echo get_class($this);
		echo get_called_class();
	}

	public static function whoStatic() {
		echo __CLASS__;
		echo get_class();
		echo get_called_class();
	}
}

class B extends A {
}

$a = new A(); 	
$b = new B(); 	
$a->who();          //Outputs AAAA
$b->who();          //Outputs AABB
A::whoStatic();    //AAA
B::whoStatic();    //Outputs AAB
</pre>

The get_class() function is a kind-of dual purpose function. If an object is passed to the function then it returns the name of that object's class. Otherwise it acts like __CLASS__. 

Instance methods always give us an implicit $this variable, which we can easily pass to get_class(). However, static methods have no such luxury. Before the introduction of late static binding there was absolutely no way to determine which class a static method was called on.

## Variable variable functions

<pre lang="php">$instance = new $class();</pre>

This is one of PHP's niftier features. Any variable lookup, function call or class instantiation can be performed on a string value. PHP calls these [Variable variables](http://www.php.net/manual/en/language.variables.variable.php) and [Variable functions](http://www.php.net/manual/en/functions.variable-functions.php). Let's check out some examples.

<pre lang="php">
<?php
$var = 'city';
$city = 'London';
echo $$var;	//Outputs 'London'

$a = 'foo';
$b = 'bar';
$foobar = 'Found me';
echo ${$a . $b}; //Outputs 'Found me'

$a = 'b';
$b = 'c';
$c = 'd';
$d = 'The end';
echo $$$$a; //Outputs 'The end';

function greeting() { echo 'Hi'; }
$func = 'greeting';
$func(); //Outputs 'Hi'
</pre>

This allows for some neat meta-programming. Though care should be taken not to abuse the functionality.

So there you have it, four advanced PHP examples from one design pattern (that you should never, ever use).