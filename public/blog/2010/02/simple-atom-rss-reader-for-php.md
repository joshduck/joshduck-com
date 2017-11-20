title: Simple Atom / RSS Reader for PHP
date: 2010-02-08 09:13
excerpt: 
categories: php, programming, uncategorized

I was recently looking for a simple RSS reader for PHP. There are a few out there, like [Magpie RSS](http://magpierss.sourceforge.net/). These seem like adequate projects, but much too high level for the scripts I was throwing together. I need to read a couple of different feed formats: namely Wordpress' RSS feed and Flickr's Atom feeds. I decided to put together a single-class implementation which didn't do anything more than the bare minimum.

<!--more-->

*   Read both Atom and RSS feeds.
*   Easy initialisation and feed iteration (one line for each).
*   Cache URL contents (default is 60 minutes).
*   Graceful degradation: fail gracefully on errors (errors result in a 0 item feed which can be iterated through).
*   Single XML implementation for leaner code (SimpleXML).

Firstly, my usage examples:

```php
$feed = new Feed('http://www.example.com/feed.rss');

//Get items with next() or current()
echo $feed->next()->title;           // "Blog post 1"
echo $feed->next()->title;           // "Blog post 2"
echo $feed->current()->title;        // "Blog post 2"

//Feed data returned
echo $feed->current()->title;        // "Blog post 2"
echo $feed->current()->date;         // int(1265569159)
echo $feed->current()->description;  // "Lorem ipsum dolar..."
echo $feed->current()->link;         // "http://www.example.com/blog/2"
echo $feed->current()->image;        // "http://www.example.com/blog/images/2.jpg"

//Get multiple items in single call
foreach ($feed->find(3) as $item) {
	echo $item->title;               // "Blog post 3" "Blog post 4" "Blog post 5"
}

//Reset internal counter
echo $feed->reset();
echo $feed->next()->title;           // "Blog post 1"

//Get random items, without repeating
echo $feed->random()->title;         // "Blog post 4"
echo $feed->random()->title;         // "Blog post 1"

//Total number of items
echo $feed->count();                 // int(10)

```
The implementation is below. I failed on the single-class requirement, instead choosing to use the Template design pattern and break the actual XML DOM navigation out into a seperate class for each feed type. This keeps the overall design a lot cleaner.

```php
<?php
/**
 * Simple reader for RSS and Atom feeds. 
 * Requires: SimpleXML, fopen_wrappers
 * Limitations: Not content encoding support. 
 * 
 * Usage:
 *     $feed = new Feed('http://www.example.com/feed.rss');
 *
 *     //Get items with next() or current()
 *     echo $feed->next()->title;           // "Blog post 1"
 *     echo $feed->next()->title;           // "Blog post 1"
 *     echo $feed->next()->title;           // "Blog post 2"
 *     echo $feed->current()->title;        // "Blog post 2"
 *
 *     //Feed data returned
 *     echo $feed->current()->title;        // "Blog post 2"
 *     echo $feed->current()->date;         // int(1265569159)
 *     echo $feed->current()->description;  // "Lorem ipsum dolar..."
 *     echo $feed->current()->link;         // "http://www.example.com/blog/2"
 *     echo $feed->current()->image;        // "http://www.example.com/blog/images/2.jpg"
 *
 *     //Get multiple items in single call
 *     foreach ($feed->find(3) as $item) {
 *         echo $item->title;               // "Blog post 3" "Blog post 4" "Blog post 5"
 *     }
 *
 *     //Reset internal counter
 *     echo $feed->reset();
 *     echo $feed->next()->title;           // "Blog post 1"
 *
 *     //Get random items, without repeating
 *     echo $feed->random()->title;         // "Blog post 4"
 *     echo $feed->random()->title;         // "Blog post 3"
 *
 *     //Total number of items
 *     echo $feed->count();                 // int(10)
 */
class Feed {
	private $url;
	private $reader;
	private $current;
	private $remaining;

	public $cacheTime = 3600;

	/**
	 * Create Atom reader object.
	 *
	 * @param string $url
	 */
	public function __construct($url) {
		$this->url = $url;
		$this->reset();
	}

	/**
	 * Reset current item to first RSS item.
	 */
	public function reset() {
		$this->current = -1;
		$this->remaining = null;
	}

	/**
	 * Get the next item in the feed.
	 *
	 * @return stdClass Object representing the item. Will return null when the list is exhausted.
	 */
	public function next() {
		if ($this->current < $this->count()) {
			$this->current++;
			$next = $this->getReader()->item($this->current);
			return $next;
		}
	}

	/**
	 * Get the current item in the feed.
	 *
	 * @return stdClass Object representing the item. Will return null when the list is exhausted.
	 */
	public function current() {
		return $this->getReader()->item(max(0, $this->current));
	}

	/**
	 * Get random item from the feed. Will not return an item more than once.
	 *
	 * @return stdClass Object representing the item. Will return null when the list is exhausted.
	 */
	public function random() {
		if ($this->remaining === null) {
			$this->remaining = array();
			for ($i = 0; $i < $this->count(); $i++) {
				$this->remaining[] = $i;
			}
		}

		if (count($this->remaining)) {
			$picked = array_rand($this->remaining);
			$index = $this->remaining[$picked];
			unset($this->remaining[$picked]);
			return $this->getReader()->item($index);
		}
	}

	/**
	 * Get X items from feed. Will advance pointer.
	 *
	 * @param int $count
	 * @return array of stdClass
	 */
	public function find($count) {
		$items = array();

		while ($item = $this->next()) {
			$items[] = $item;
			if (count($items) >= $count) {
				break;
			}
		}

		return $items;
	}

	/**
	 * Get the number of items in the feed.
	 *
	 * @return int
	 */
	public function count() {
		return $this->getReader()->count();
	}

	/**
	 * Get FeedReader object for the feed.
	 *
	 * @return FeedReader
	 */
	private function getReader() {
		if (!$this->reader) {
			$xml = $this->getXML();
			if (RSSReader::canRead($xml)) {
				$this->reader = new RSSReader($xml);
			} else if (AtomReader::canRead($xml)) {
				$this->reader = new AtomReader($xml);
			} else {
				$this->reader = new NullReader($xml);
			}
		}
		return $this->reader;
	}

	/**
	 * Get XML element for the feed.
	 *
	 * @return SimpleXMLElement
	 */
	private function getXML() {
		if ($xml = $this->getCacheXML()) {
			return $xml;
		} else if ($xml = $this->getURLXML()) {
			return $xml;
		} else {
			return new SimpleXMLElement("");
		}
	}

	/**
	 * Get XML element for the feed from cache.
	 *
	 * @return SimpleXMLElement or null if cache doesn't exist.
	 */
	private function getCacheXML() {
		//Store URL data in local cache.
		$cacheFilename = $this->getCacheFilename();
		if (file_exists($cacheFilename) &amp;&amp; (time() - filemtime($cacheFilename)) < $this->cacheTime) {
			if ($data = file_get_contents($cacheFilename)) {
				return new SimpleXMLElement($data);
			}
		}
	}

	/**
	 * Get XML element from the feed from the live URL.
	 * Will cache XML data to disk.
	 *
	 * @return SimpleXMLElement or null if URL is unreachable.
	 */
	private function getURLXML() {
		if ($data = @file_get_contents($this->url)) {
			try {
				$xml = new SimpleXMLElement($data);
				file_put_contents($this->getCacheFilename(), $data);
				return $xml;
			} catch (Exception $e) {
				return null;
			}
		}
	}

	/**
	 * Name of the cache file for current URL.
	 *
	 * @return string
	 */
	private function getCacheFilename() {
		return sys_get_temp_dir() . '/' . md5($this->url) . '.feed.cache';
	}
}

/**
 * Interface for reading items from feed.
 */
interface FeedReader {

	/**
	 * Create reader from SimpleXMLElement.
	 *
	 * @param SimpleXMLElement $root
	 */
	public function __construct(SimpleXMLElement $root);

	/**
	 * Get single node.
	 *
	 * @return array or null.
	 */
	public function item($index);

	/**
	 * Get number of items.
	 *
	 * @return int.
	 */
	public function count();

	/**
	 * Can this reader understand the XML file?
	 *
	 * @param SimpleXMLElement $root
	 * @return bool
	 */
	public static function canRead(SimpleXMLElement $root);

}

/**
 * Concrete implementation of FeedReader that will never return an item.
 */
class NullReader implements FeedReader {

	public function __construct(SimpleXMLElement $root) {
		//Nothing
	}

	public function count() {
		return null;
	}

	public function item($index) {
		return null;
	}

	public static function canRead(SimpleXMLElement $root) {
		return true;
	}
}

/**
 * Concrete implementation of FeedReader that will read an Atom feed.
 */
class AtomReader implements FeedReader {

	private $root;

	public function __construct(SimpleXMLElement $root) {
		$this->root = $root;
	}

	public function count() {
		return count($this->root->entry);
	}

	public function item($index) {
		$node = $this->root->entry[$index];

		if (!$node) {
			return null;
		}

		$item = array(
			'title' => (string)$node->title,
			'description' => (string)$node->description,
			'image' => null,
			'link' => null,
			'date' => strtotime($node->published),
		);

		//Iterate through link nodes getting content URL and images.
		foreach ($node->link as $link) {
			if (strpos($link['type'], 'text') === 0 || $item['link'] === null) {
				$item['link'] = (string)$link['href'];
			}
			if (strpos($link['type'], 'image') === 0) {
				$item['image'] = (string)$link['href'];
			}
		}

		return (object)$item;
	}

	public static function canRead(SimpleXMLElement $root) {
		//Check for Atom namespace.
		return in_array('http://www.w3.org/2005/Atom', $root->getNamespaces());
	}
}

/**
 * Concrete implementation of FeedReader that will read an RSS feed.
 */
class RSSReader implements FeedReader {

	private $root;

	public function __construct(SimpleXMLElement $root) {
		$this->root = $root;
	}

	public function count() {
		return count($this->root->channel->item);
	}

	public function item($index) {
		$node = $this->root->channel->item[$index];

		if (!$node) {
			return null;
		}

		return (object)array(
			'title' => (string)$node->title,
			'description' => (string)$node->description,
			'url' => (string)$node->link,
			'image' => null,
			'date' => strtotime($node->pubDate),
		);
	}

	public static function canRead(SimpleXMLElement $root) {
		//RSS feeds name their root node 'rss'.
		return $root->getName() == 'rss';
	}
}
```

There are a few things missing, namely any kind of encoding awareness and correct error handling. It also requires SimpleXML and [allow_url_fopen](http://uk2.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen) to be enabled. On the plus side the code is simple enough to hack in new features as they are needed.

I'm releasing this code under the [BSD License](http://creativecommons.org/licenses/BSD/), so feel free to take and modify it for any purposes.