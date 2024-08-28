var xp;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function createButt() {
	
	var butt = document.createElement("INPUT");
	butt.setAttribute("type", "button");
	butt.setAttribute("name", "newWindow");
	butt.setAttribute("value", "Nuova finestra");
	butt.setAttribute("onclick", "openSesame()");


	$(".child")[0].appendChild(butt);

	document.body.style.height = $(document).height() + "px";
	($(".container")[0]).style.height = $(document).height() + "px";
	$("input").center();

}

function openSesame() {
	
	//xp = window.open("../screensaver/screensaver.html", "Finestra", "width=100,height=100");
	xp = window.open("", "Finestra", "width=100,height=100");
	
	var w = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

	var h = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;

	try {

		xp.resizeTo(w/2, h/2);

		var left = (screen.width / 2) - (w / 4);
	    var top = (screen.height / 2) - (w / 8);

		xp.moveTo(left, top);

	} catch (DOMException) {

	}

}

window.onresize = moveWindow;

function moveWindow() {

	if (xp != undefined && !xp.closed) {

		var wDifference = windowWidth - window.innerWidth;
		var hDifference = windowHeight - window.innerHeight;

		if (wDifference > 0) {

			//Finestra meno larga --> spostamento verso l'alto
			xp.moveBy(0, wDifference);

		} else {

			//Finestra più larga --> spostamento verso il basso
			xp.moveBy(0, wDifference);

		}

		if (hDifference > 0) {

			//Finestra meno lunga --> spostamento verso destra
			xp.moveBy(hDifference, 0);

		} else {

			//Finestra più lunga --> spostamento verso sinistra
			xp.moveBy(hDifference, 0);

		}

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

	}

	$("input").center();

}

jQuery.fn.center = function () {

    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;

}