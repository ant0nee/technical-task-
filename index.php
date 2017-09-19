<?php 

	function echoBooks($list) {

		for ($book = 0; $book < count($list); $book++) {

			$volumeInfo = $list[$book]->volumeInfo;
			$id = $list[$book]->id;
			$title = $volumeInfo->title." ".$volumeInfo->subtitle;

			$thumbnail = $volumeInfo->imageLinks->thumbnail;
			$authors = implode(', ', $volumeInfo->authors);
			$pageCount = $volumeInfo->pageCount;
			$description = htmlspecialchars($volumeInfo->description);
			$shortDesc = substr($description, 0, 140);

			if (strlen($description) != strlen($shortDesc)) {

				$shortDesc = $shortDesc . "...";

			}

			echo "<div class=\"book\" id=\"$id\" onclick=\"select(this)\" title=\"$description\">".
			"<div class=\"thumbnail\"><img class=\"thumbnail-image\" src=\"$thumbnail\" alt=\"book cover\" /></div>".
			"<div class=\"info\">".
			"<p class=\"title\">$title</p>".
			"<p class=\"authors\">$authors</p>".
			"<p class=\"pageCount\">pages: $pageCount</p>".
			"<p class=\"description\">$shortDesc</p>".
			"</div>".
			"</div>";

		}

	}

	$books = json_decode(file_get_contents("https://www.googleapis.com/books/v1/volumes?q=HTML5"));
	$books = $books->{'items'}; 
	$featured = array_slice($books, -2, 2); 
	$not_featured = array_slice($books, 0, count($books)-2);
	
?>
<!DOCTYPE html> 
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="styles.css">
	<script src="scripts.js"></script>
</head>
<body>
	<article>
		<header><img id="logo" /> <h1>The Book Store</h1></header>
		<nav>
			<a href="javascript:;" onClick="toggleMenu()" title="menu">
				<img id="menuIcon" alt="logo" src="images/menu.svg" width="50" height="50" />
			</a>
			<ul id="navigation">
				<li><a href="javascript:;">Home</a></li><!--
				--><li><a href="javascript:;">Books</a></li><!--
				--><li><a href="javascript:;">Magazines</a></li><!--
				--><li><a href="javascript:;">E-Books</a></li><!--
				--><li><a href="javascript:;">Account</a></li>
			</ul>
		</nav>
		<section>
			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
		</section>
		<section class="featured">
			<h2>Featured</h2>
			<?php
				echoBooks($featured);
			?>
		</section>
		<section class="general">
			<?php
				echoBooks($not_featured);
			?>
		</section>
	</article>
	<footer>
		<a href="javascript:;"><img src="images/twitter_icon.png" alt="twitter" /></a>
		<a href="javascript:;"><img src="images/facebook_icon.png" alt="facebook" /></a>
		<a href="javascript:;"><img src="images/instagram_icon.png" alt="instagram" /></a>
	</footer>
</body>
</html>