<?php
error_reporting(E_ALL ^ E_NOTICE);

switch ($_GET['mode']) {
	case 'shim':
		showShim();
		break;
	case 'tracker':
		showTracker();
		break;
	default:
		showMain();
}

//Demo page. Allows user to send messages to tracker (through shim).
function showMain() {
	$shim = 'tracker.php?mode=shim';
  ?>
		<html>
			<body>
				<script type="text/javascript">
					var sendMessage = function(message) {
						var tracker = '<?php echo $shim; ?>#' + escape(message);
						var frame = document.createElement('iframe');
						frame.src = tracker;
						frame.id = 'shim';
						frame.height = 400;
						frame.width = 400;

						var oldFrame = document.getElementById('shim');
						var container = oldFrame.parentNode;
						container.removeChild(oldFrame);
						container.appendChild(frame);
					}
				</script>
				<input type="text" id="message" value="Hello, there." />
				<button onclick="sendMessage(document.getElementById('message').value);">Send</button>
				<br />
				<iframe id="shim" src="<?php echo $shim; ?>#Page%20load" height="400" width="400"></iframe>
			<body>
		</html>
	<?php
}

//Shows a non-expiring shim page which calls tracker.
function showShim() {

	//Generate session ID. Stored in users cache.
	$id = uniqid(null, true);

	//This page should never expire. This will force cache to keep our ID.
	$age = 10 * 365 * 24 * 60 * 60;
	$expires = gmdate("D, d M Y H:i:s", time() + $age);
	$modified = gmdate("D, d M Y H:i:s", time());
	header("Cache-Control: max-age=$age; private"); // HTTP/1.1
	header("Last-Modified: $modified GMT");
	header("Expires: $expires GMT");

	$tracker = "tracker.php?mode=tracker&amp;id=" . urlencode($id);
  ?>
		<html>
			<body>
				<h2>Shim</h2>
				<p>This file contains the unique ID, and is cached indefinately.</p>


				<script type="text/javascript">
					//Try and generate iframe by javascript.
					//This allows us to pass message AND referrer to tracker.
					var tracker = '<?php echo addslashes($tracker); ?>' +
						'&amp;message=' + document.location.hash.substr(1) +
						'&amp;referrer=' + document.referrer;
						document.write('<iframe src="' + tracker + '" height="400" width="400"></iframe>');
				</script>
				<noscript>
					<!-- No JS fallback, we lose referrer and message, but can still see unique hits -->
					<iframe src="<?php echo $tracker; ?>&map;message=No+JS" height="400" width="400"></iframe>
				</noscript>
			<body>
		</html>
	<?php
}

//Tracker which logs requests (to temp session) and displays captured info.
function showTracker() {
	$id = $_GET['id'];

	//Initialise session (used for storing messages on server only). No cookies.
	ini_set('session.use_cookies', 0);
	session_id('tracker-' . md5($id));
	session_start();

	//Get previous messages, trim and prepend the new message.
	$messages = isset($_SESSION['messages']) ? $_SESSION['messages'] : array();
	array_slice($messages, 0, 10);
	array_unshift($messages, $_GET['message']);

	//Save messages array
	$_SESSION['messages'] = $messages;
	$_SESSION['hitcount'] = (int)$_SESSION['hitcount'] + 1;
	session_write_close();
  ?>
		<html>
			<body>
				<h2>Tracker</h2>
				ID: <?php echo htmlspecialchars($_GET['id']); ?><br />
				Time: <?php echo date('H:i:s'); ?><br />
				Referrer: <?php echo htmlspecialchars($_GET['referrer']); ?><br />
				Hit count: <?php echo htmlspecialchars($_SESSION['hitcount']); ?><br />
				Last Message: <?php echo htmlspecialchars($_GET['message']); ?><br />
				<br />

			</body>
		</html>
	<?php
}