title: Securing Your PHP Code - Databases
date: 2008-04-06 02:05
excerpt: 
categories: mysql, php, programming

[SQL injection](http://www.unixwiz.net/techtips/sql-injection.html) is a well trodden topic so I won't go into too much detail.

For those who don't know, the problem occurs when you fail to properly escape variables being placed into your strings. For example the SQL statement `"SELECT * FROM users WHERE name = '$name'"` will fail if $name is set to `' or '1' = '1`. The string will be expanded to produce `SELECT * FROM users WHERE name = '' or '1' = '1'`. This is obviously not what you wanted, and could lead to very bad results when coupled with DELETE or UPDATE queries.

<!--more-->

Some database libraries (but not MySQL's PHP extension) allow multiple SQL statements inside a single call, so if `$name` was set to `'; DELETE FROM USERS --` in the previous example the first query would be ended by the semicolon and a second query would then delete all users and open a comment so that your database will ignore any trailing characters.

## Magic Quotes

PHP 4 introduced a feature called [magic quotes](http://au2.php.net/magic_quotes) that was intended to combat SQL injection. It did this by automatically adding backslashes before any quotes or slashes in your scripts input ($_GET or $_POST). This is widely regarded as a major mistake, as it was tackling the issue in the wrong spot. If you've ever seen a page which leaves backslashes in your input (think O\'Connor) then you know what I mean.

Magic quotes were also a failure because developers couldn't ever assume that they were available or turned on in a given environment. Therefore they'd need to check and manually quote values if necessary, meaning there was no added value. These days you will probably need to do the opposite and unquote values when magic quotes are enabled. The [comments](http://au2.php.net/magic_quotes) in PHP's manual page offer a method of doing this.

## A Better Solution

The solution to SQL injecting is to stop thinking of SQL as a single string and start thinking of it as a command with arguments. To do this you must define the SQL statement and arguments separately. The [MySQL Improved Extension (mysqli)](http://au2.php.net/mysqli) and [PHP Data Objects](http://au2.php.net/pdo) library both offer prepared statements which will allow you to define a query, and then to define the values for arguments inside the query.
<pre lang="php">$stmt = $dbh->prepare("INSERT INTO REGISTRY (name, value) VALUES (:name, :value)");
$stmt->bindValue(':name', $name);
$stmt->bindValue(':value', $value);
$stmt->execute();</pre>
If you feel that prepared statements are not for you then you can still define your SQL and arguments separately. I recommend using `[sprintf](http://www.php.net/sprintf)` do this.
<pre lang="php">$sql = sprintf("SELECT * FROM user
			WHERE name = '%s'
			AND id > %d",
		mysqli_real_escape_string($name, $db),
		mysqli_real_escape_string($id, $db));
</pre>
This is a little more verbose than what you are probably used to, but it makes it easy to see when a value has not been escaped. The escape function needs your DB link because it will match the encoding that your database is using. This gives you extra security against SQL injections. I use [func_get_args](http://www.php.net/func_get_args) and [vsprintf](http://www.php.net/vsprintf) to create a function to do the querying and escaping in a single function.

## Final Tips

Your final line of defence against SQL injection is to plan for the worst.

Make sure that the MySQL user your website is using only has the permissions it needs, and no more. You should set up a new user with INSERT, UPDATE, DELETE and SELECT permissions on your current tables only.

It is a good idea to perform rolling database backups on a regular basis. This will obviously protect against database corruption, but could also make the difference between a vulnerability being a short outage or a complete loss of data.

You should avoid printing your SQL errors (e.g. `mysql_error()`) if your database calls fail. This can give attackers clues as to where you have errors in your code. It also looks unprofessional.

## Physical Access

Even if your security is foolproof (which it won't ever be) then you're still in trouble if someone steals a physical device containing your data. Time and time again you'll hear of someone stealing a laptop or discs containing [sensitive information](http://news.bbc.co.uk/2/hi/uk_news/politics/7128851.stm). Often these is no reason for the data to be in such a vulnerable location in the first place. If you do need to copy data from your secure setup then encrypting it is a very good idea.

## General Security Rules

I hope this tutorial has made you aware of some of the security issues you'll be up against as a PHP developer. I'd like to leave you with a few tips that aren't specific to any security issue, but are good to keep in mind.

*   Build on the work of others. Don't build your own security when you can use what other, smarter, people have already done.
*   Where possible use whitelists instead of blacklists.
*   Never trust your user's input. Ever.

## Other articles in this series

*   [Securing Your PHP Code - XSS](../securing-your-php-code-xss/)
*   [Securing Your PHP Code - Server Security](../securing-your-php-code-server-security/)