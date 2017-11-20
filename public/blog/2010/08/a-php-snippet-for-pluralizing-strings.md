title: A PHP snippet for pluralizing strings
date: 2010-08-14 00:41
excerpt: 
categories: uncategorized

Every time I'm working on CRUD applications it seems like a lot of boilerplate code goes towards displaying appropriate messages when lists can contain zero, one or more than one element. I put together a quick function to speed up the process.

The function takes a string with string fragments marked up inline as its main argument. It then formats the output based on the count passed into the function.<!--more-->


```php
function pluralize($text, $count = 0) {
	$regex = '/\[(.*?)\]/';
	$divider = '|';

	// If there are no end braces [] use whole input as option list.
	if (preg_match($regex, $text, $matches)) {
		$search = $matches[0];
		$fragments = explode($divider, $matches[1]);
	} else {
		$search = $text;
		$fragments = explode($divider, $text);
	}

	// We accept one (which is pointless...), two or three inline text fragments.
	// If we've been given just two then case for zero should be same as two or more.
	if (count($fragments) == 1) {
		$fragments = array($fragments[0], $fragments[0], $fragments[0]);
	} else if (count($fragments) == 2) {
		$fragments = array($fragments[1], $fragments[0], $fragments[1]);
	}

	// Normalize count.
	// If value is array then use the number of elements as count.
	if (intval($count) &lt;= 0) {
		$count = 0;
	} else if (is_array($count)) {
		$count = count($count);
	} 

	// Choose the appropriate text fragment.
	if ($count &lt;= 1) {
		$replace = $fragments[$count];
	} else {
		$replace = $fragments[2];
	}

	// Replace markup with chosen option.
	$text = str_replace($search, $replace, $text);

	// Place our count into output (allows user to put %d inline to get count).
	$text = str_replace('%d', number_format($count), $text);

	return $text;
}

```

The tests show example usage.


```php
$input = "There [are no pages|is 1 page|are %d pages]";
assert(pluralize($input, 0) == 'There are no pages');
assert(pluralize($input, -1) == 'There are no pages');
assert(pluralize($input, 1) == 'There is 1 page');
assert(pluralize($input, 2) == 'There are 2 pages');
assert(pluralize($input, 1000) == 'There are 1,000 pages');
assert(pluralize($input, null) == 'There are no pages');
assert(pluralize($input, array(1, 2, 3)) == 'There are 3 pages');

$input = "1 page|%d pages";
assert(pluralize($input, 0) == '0 pages');
assert(pluralize($input, 1) == '1 page');

```

I am releasing this into the public domain so feel free to copy and redistribute the code.