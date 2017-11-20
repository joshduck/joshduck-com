title: Inheritance and Mootools Mixins
date: 2011-02-11 17:26
excerpt: 
categories: javascript, programming, uncategorized

I was playing with Mootools' Class implementation today. It has a few nice features like mixins, easy inheritance and sane parent method calling. I did run into issues combining mixins (through the _Implements_ keyword) with parent method calling. The following code fails with the message: **The method "setOptions" has no parent.**<!--more-->

```javascript
var Car = new Class({
	Extends: Vehicle,
	Implements: [Options],

	options: {
		wheels: 2,
	},

	setOptions: function(options) {
		if (options.wheels &lt; 3) {
			throw new Error("That's not a car.");
		} else {
			this.parent(options);
		}
	}
});
```

Apparently mixin methods like _setOptions_ don't act like inherited functions in Mootools' class implementation. The obvious fix is to make the class inherit from the mixin directly.

```javascript
var Car = new Class({
	Extends: Options,

	// Code omitted
}
```

This works, but we've lost the ability to create a sane object hierarchy. Thankfully the _Options_ variable I added to the _Implements_ array is just a reference to the class used to implement the mixin. So it is possible to call the parent method manually, just like I would without Mootool's magic _this.parent_ method.

```javascript
var Car = new Class({

	// Code omitted

	setOptions: function(options) {
		if (options.wheels == 2) {
			throw new Error("That's not a car.");
		} else {
			Options.prototype.setOptions.call(this, options);
		}
	}
}
```

This works exactly like I hoped. The same approach would obviously work for other mixins like _Events _ and _Chain_.

As a side note, it's worth mentioning that _Options.prototype.setOptions_ is actually pointing to a wrapper method which does a bit of Mootools-specific magic and validation; like ensuring the function is not protected. Fortunately the wrapper is written in a sane enough way that calling it from another object like this works OK.