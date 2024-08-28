var cellsClicked = 0;
var starsClicked = 0;

function insertTable(cellNum, starNum) {

	var cellTable = document.createElement("TABLE");
	cellTable.setAttribute("id", "cellTable");
	document.getElementById('selectables').appendChild(cellTable);

	var cellCap = document.createElement("CAPTION");
	cellCap.innerHTML = "Scegli 5 numeri";
	cellTable.appendChild(cellCap);

	for (var i = 0; i < cellNum / 5; i++) {

		var row = cellTable.insertRow();
		cellTable.appendChild(row);

		for (var j = 0; j < cellNum / (cellNum / 5); j++) {

			var cell = row.insertCell();
			row.appendChild(cell);
			cell.innerHTML = (i * (cellNum / (cellNum / 5)) + j) + 1;
			cell.setAttribute("onclick", "clickCell(this)");
			cell.setAttribute("class", "selectable");

		}

	}

	var starTable = document.createElement("TABLE");
	starTable.setAttribute("id", "starTable");
	document.getElementById('selectables').appendChild(starTable);

	var starCap = document.createElement("CAPTION");
	starCap.innerHTML = "Scegli 2 stelle";
	starTable.appendChild(starCap);

	for (var i = 0; i < starNum / 2; i++) {

		var row = starTable.insertRow();
		starTable.appendChild(row);

		for (var j = 0; j < starNum / (starNum / 2); j++) {

			var cell = row.insertCell();
			row.appendChild(cell);
			cell.innerHTML = (i * (starNum / (starNum / 2)) + j) + 1;
			cell.setAttribute("onclick", "clickStar(this)");
			cell.setAttribute("class", "selectable");

		}

	}

	var selectedCellsTable = document.createElement("TABLE");
	selectedCellsTable.setAttribute("id", "selectedCellsTable");
	document.getElementById('selected').appendChild(selectedCellsTable);

	var selCellCap = document.createElement("CAPTION");
	selCellCap.innerHTML = "Numeri selezionati";
	selectedCellsTable.appendChild(selCellCap);

	var row = selectedCellsTable.insertRow();
	selectedCellsTable.appendChild(row);

	for (var i = 0; i < 5; i++) {
		var cell = row.insertCell();
		row.appendChild(cell);
		cell.setAttribute("class", "selectedCell");
	}

	var selectedStarsTable = document.createElement("TABLE");
	selectedStarsTable.setAttribute("id", "selectedStarsTable");
	document.getElementById('selected').appendChild(selectedStarsTable);

	var selStarCap = document.createElement("CAPTION");
	selStarCap.innerHTML = "Stelle selezionate";
	selectedStarsTable.appendChild(selStarCap);

	var row = selectedStarsTable.insertRow();
	selectedStarsTable.appendChild(row);

	for (var i = 0; i < 2; i++) {
		var cell = row.insertCell();
		row.appendChild(cell);
		cell.setAttribute("class", "selectedStar");
	}

}

function clickCell(cellClicked) {

	if (cellClicked.style.backgroundColor == "orange") {

		if (cellsClicked > 0) {

			cellClicked.style.backgroundColor = "initial";
			cellsClicked--;

		}


	} else {

		if (cellsClicked < 5) {

			cellClicked.style.backgroundColor = "orange";
			cellsClicked++;

		}

	}

	printSelected();
}

function clickStar(starClicked) {

	if (starClicked.style.backgroundColor == "yellow") {

		if (starsClicked > 0) {

			starClicked.style.backgroundColor = "initial";
			starsClicked--;

		}


	} else {

		if (starsClicked < 2) {

			starClicked.style.backgroundColor = "yellow";
			starsClicked++;

		}

	}

	printSelected();

}


function printSelected() {

	var buttons = document.getElementsByClassName('selectable');
	var selectedCells = [];
	var selectedStars = [];

	for (var i = 0; i < buttons.length; i++) {

		if (buttons[i].style.backgroundColor == "orange") {

			selectedCells.push(buttons[i]);

		} else if (buttons[i].style.backgroundColor == "yellow") {

			selectedStars.push(buttons[i]);

		}

	}

	if (selectedCells.length == 0) {

		document.getElementById('selectedCellsTable').style.display = "none";

	} else {

		document.getElementById('selectedCellsTable').style.display = "inline-table";

	}

	if (selectedStars.length == 0) {

		document.getElementById('selectedStarsTable').style.display = "none";

	} else {

		document.getElementById('selectedStarsTable').style.display = "inline-table";

	}

	var cells = document.getElementsByClassName("selectedCell");
	var stars = document.getElementsByClassName("selectedStar");

	for (var i = 0; i < 5; i++) {

		if (i < 2) {

			if (selectedStars[i] != undefined) {

				stars[i].innerHTML = selectedStars[i].innerHTML;

			} else {

				stars[i].innerHTML = "";

			}

		}

		if (selectedCells[i] != undefined) {

			cells[i].innerHTML = selectedCells[i].innerHTML;

		} else {

			cells[i].innerHTML = "";

		}

	}

	if (selectedCells.length == 5 && selectedStars.length == 2) {

		document.getElementById('extraction').style.display = "block";

	} else {

		document.getElementById('extraction').style.display = "none";

	}

}

function extraction(extractions) {

	if (cellsClicked == 5 && starsClicked == 2) {

		if (document.getElementById('extRes') != null) {

			document.body.removeChild(document.getElementById('extRes'));

		}

		var resTab = document.createElement("TABLE");
		resTab.setAttribute("id", "extRes");
		document.body.appendChild(resTab);

		var resCap = document.createElement("CAPTION");
		resCap.innerHTML = "Estrazioni";
		resTab.appendChild(resCap);

		var capRow = resTab.insertRow();
		resTab.appendChild(capRow);

		var capIndex = capRow.insertCell();
		capRow.appendChild(capIndex);
		capIndex.innerHTML = "Numero di estrazione";

		var capNum = capRow.insertCell();
		capRow.appendChild(capNum);
		capNum.innerHTML = "Numeri estratti";

		var capStar = capRow.insertCell();
		capRow.appendChild(capStar);
		capStar.innerHTML = "Stelle estratte";

		var capGuess = capRow.insertCell();
		capRow.appendChild(capGuess);
		capGuess.innerHTML = "Numeri indovinati";

		var selCel = document.getElementsByClassName('selectedCell');

		var selStar = document.getElementsByClassName('selectedStar');

		for (var i = 0; i < extractions; i++) {

			var numExt = getRandomArray(5, 1, 50);
			numExt.sort(function(a, b){return a - b});
			var starExt = getRandomArray(2, 1, 12);
			starExt.sort(function(a, b){return a - b});

			var row = resTab.insertRow();
			resTab.appendChild(row);

			var correct = 0;

			for (var j = 0; j < selCel.length; j++) {

				if (numExt.includes(selCel[j].innerHTML * 1)) {

					correct++;
					numExt[numExt.indexOf(selCel[j].innerHTML * 1)] = "<b>" + numExt[numExt.indexOf(selCel[j].innerHTML * 1)] + "</b>";

				}

			}

			for (var j = 0; j < selStar.length; j++) {

				if (starExt.includes(selStar[j].innerHTML * 1)) {

					correct++;
					starExt[starExt.indexOf(selStar[j].innerHTML * 1)] = "<i>" + starExt[starExt.indexOf(selStar[j].innerHTML * 1)] + "</i>";

				}

			}

			var indexCell = row.insertCell();
			indexCell.innerHTML = i + 1;
			row.appendChild(indexCell);

			var numCell = row.insertCell();
			numCell.innerHTML = numExt.join(", ");
			row.appendChild(numCell);

			var starCell = row.insertCell();
			starCell.innerHTML = starExt.join(", ");
			row.appendChild(starCell);

			var correctCell = row.insertCell();
			correctCell.innerHTML = correct;
			row.appendChild(correctCell);

		}

		document.getElementById('extRes').style.display = "table";

		reset();

	}  else {

		alert("ERRORE: Devi ancora selezionare " + (5 - selectedCells) + " numeri e " + (2 - selectedStars) + " stelle.");

	}

}

function getRandomArray(length, min, max) {

	var re = [];

	for (var i = 0; i < length; i++) {

		re.push(getRandomIntInclusive(min, max));

	}

	return re;

}

function getRandomIntInclusive(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso

}

function reset() {

	cellsClicked = 0;
	starsClicked = 0;

	var selectables = document.getElementsByClassName('selectable');

	for (var i = 0; i < selectables.length; i++) {

		if (selectables[i].style.backgroundColor == "orange" || selectables[i].style.backgroundColor == "yellow") {

			selectables[i].style.backgroundColor = "initial";

		}

	}

	document.getElementById('extraction').style.display = "none";

}
