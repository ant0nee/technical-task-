var highlighted = [];

function loaded() {

	toggleMenu();

	if (localStorage.getItem("selected")){

		highlighted = JSON.parse(localStorage.getItem("selected"));

	}

	for (var i = 0; i < highlighted.length; i++) {

		if (document.getElementById(highlighted[i])) {

			document.getElementById(highlighted[i]).className += " is-selected";

		}

	}

	resize(); 

}

function toggleMenu() {

	if (document.getElementById("navigation").className != "show") {
		document.getElementById("navigation").className="show";
	} else {
		document.getElementById("navigation").className="";
	}

}

function resize() {

	if (window.outerWidth < 500) {

		document.body.className = "mobile";

	} else {

		document.body.className = "desktop";

	}

}

function select(object) {

	if (new RegExp("^.*\\sis\\-selected$").test(object.className)) {

		object.className = object.className.replace(" is-selected","");
		highlighted.splice(highlighted.indexOf(object.id),1);

	} else {

		object.className += " is-selected";
		highlighted.push(object.id);

	}

	localStorage.setItem("selected", JSON.stringify(highlighted));

}