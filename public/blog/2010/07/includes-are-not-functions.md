title: Includes are not functions
date: 2010-07-29 01:32
excerpt: 
categories: php, programming

Over the last week I've been working with a commercial PHP eCommerce package. Amongst some shockingly bad code one of the patterns that has stood out has been the use of includes a kind of pseudo-function. Dozens of files in the application are in the following format.<!--more-->
<pre lang="php"><?php  
$product_id = $_GET['product_id'];
$category_id = $_GET['category_id'];

include 'includes/product.php';
if ($_SERVER['HTTP_REQUEST_METHOD'] == 'POST') {
   	include('includes/product_update.php';   
}  

$template->set('categories', $categories);
$template->set('errors', $errors);
$template->set('product', $product);
?></pre>

The authors might try and justify this by saying that the includes allow for code reuse but can you really tell what's happening here? Where are _$categories, $errors_ and _$product_ being defined? We can guess that _$product_ is defined in _product.php_ but is it being used or even modified within _product_update.php_? Could we safely refactor any of these files without fearing that we'll created unintended consequences in a rarely-used code path?

Debugging the eCommerce package with [Xdebug](http://www.xdebug.org/) session showed that there were almost 50 different local variables in scope by the end of a typical script. I couldn't be certain which variables were required and which weren't, let alone where each was defined.

## Why is inline code in includes a bad idea?

There are a few specific reasons we should rule this kind of code right out:

*   Our main script can't be sure of what variables are required by included files. You won't be able to remove or refactor variables without checking each and every includes first.
*   Likewise, our parent script can't be sure if an include will modify local variables. Each included file could potentially change a global variable in a way that is required by subsequent scripts - either intentionally or unintentionally.
*   If you're using a server with register globals turned on then you'll need to add `if (!defined('APP_START')) die();` style guards to the start of every include, so they cant be requested  directly by the end user. For most core this isn't a problem, but commercial packages must code for the worst. If an include just contained function definitions this wouldn't be a problem.

## So how exactly should I be using includes?

Each include files should contain only:

*   Configuration variables or constant definitions.
*   A single class. The file should be named after the class. E.g. class _Product_ is defined in _Product.php_.
*   A set of related functions. Don't create "do-everything" files; break your functions down into logical groups like database functions or HTML helpers
The only time I'd ever include inline code in an include file would be if I were defining config variables in code, including a PHP-based template or if I'm initialising environment configuration (such as defining error handlers, PHP ini settings and script timeouts).

## Which include function should I use?

There are quite a few statements we can choose between for including files: _include, include_once, require_ and _require_once_. Which should we be using?

If you follow the best practices and just have function and class definitions in an include then it becomes obvious that you wouldn't want to include a file more than once. Doing so would force PHP to error when it attempts to redefine a function or class. Using _include_once_ or _require_once_ is obviously a better choice.

A missing function or class definition is something that you should know about sooner rather than later. For that reason I find _require_once_ a better way to define dependencies.

The other function should be reserved for special cases, for example an autoloader function that would prefer to handle missing files without _E_ERROR_ being raised.

## Summing up

Rather than helping code reuse misusing includes turns your code base into a mass of spaghetti code, which would be bad enough on its own but is made worse by the code being spread over dozens of files with no hints as to what is where.