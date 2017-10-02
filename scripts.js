var highlighted = [];

function addBooks(books, containerId) {

	for (var book = 0; book < books.length; book++) {
       		var volumeInfo = books[book].volumeInfo;
       		var id = books[book].id; 
       		if (volumeInfo.subtitle == undefined) {
       			var title = volumeInfo.title;
       		} else {
       			var title = volumeInfo.title+" "+volumeInfo.subtitle;
       		}
			var thumbnail = volumeInfo.imageLinks.thumbnail;
			var authors = volumeInfo.authors.join(", ");
			var pageCount = volumeInfo.pageCount;
			var description = escapeHtml(volumeInfo.description);
			var shortDesc = description.substring(0, 140);
			if (description.length != shortDesc.length) {

				shortDesc += "...";

			}

			document.getElementById(containerId).innerHTML += "<div class=\"book\" id="+id+" title=\""+description+"\">"+
			"<input type=\"checkbox\" class=\"book_checkbox "+id+"\" onClick=\"selectBook('"+id+"')\">"+
			"<div class=\"book-content\"><div class=\"thumbnail\"><img class=\"thumbnail-image\" src=\""+thumbnail+"\" alt=\"book cover\" /></div>"+
			"<div class=\"info\">"+
			"<p class=\"title\">"+title+"</p>"+
			"<p class=\"authors\">"+authors+"</p>"+
			"<p class=\"pageCount\">pages: "+pageCount+"</p>"+
			"<p class=\"description\">"+shortDesc+"</p>"+
			"</div></div>"+
			"</div>";

       }

}

function getRememberedStates() {

	if (localStorage.getItem("selected")){

		highlighted = JSON.parse(localStorage.getItem("selected"));

	}

	for (var i = 0; i < highlighted.length; i++) {

		if (document.getElementById(highlighted[i])) {

			console.log(highlighted[i]);
			document.getElementById(highlighted[i]).className += " is-selected";
			document.getElementsByClassName(highlighted[i])[0].checked=true;

		}

	}

}

function loaded() {

	toggleMenu();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	       var books = JSON.parse(xhttp.responseText).items;
	       var featured = books.slice(-2,books.length);
	       var not_featured = books.slice(0, -2); 
	       addBooks(featured, "featured");
	       addBooks(not_featured, "not_featured");
	       getRememberedStates();
	       
	    }
	};
	xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=HTML5", true);
	xhttp.send();

}

function toggleMenu() {

	if (document.getElementById("navigation").className != "show") {
		document.getElementById("navigation").className="show";
	} else {
		document.getElementById("navigation").className="";
	}

}

function selectBook(id) {

	var book = document.getElementById(id);
	if (new RegExp("^.*\\sis\\-selected$").test(book.className)) {

		book.className = book.className.replace(" is-selected","");
		highlighted.splice(highlighted.indexOf(book.id),1);

	} else {

		book.className += " is-selected";
		highlighted.push(book.id);

	}

	localStorage.setItem("selected", JSON.stringify(highlighted));

}

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}