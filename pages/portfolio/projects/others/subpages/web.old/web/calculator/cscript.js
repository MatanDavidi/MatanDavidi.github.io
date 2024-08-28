var calc = "";
var clear = false;
var mistake = false;
var newNumber = false;

function press(value) {

	var string = $("#result").val();

	if (string.length < 32 && !clear) {

		mistake = false;
		newNumber = true;

		if (!(value == '.' && string.split('.').length > 1)) {

			if (string != "0" || value == '.') {

				$("#result").val(string + value);

			} else {

				$("#result").val(value);

			}

			if (clear) {

				$("#result").val(value);
				clear = false;

			}

		}

	} else if (clear) {

		$("#result").val(value);
		clear = false;

	}

}

function backSpace() {

	if (clear) {
		clearResult()
	}

	var string = $("#result").val();
	$("#result").val(string.substring(0, string.length - 1));

	if ($("#result").val().length == 0) {

		$("#result").val("0");

	}
	
}

function clearResult() {

	$("#result").val("0");
	calc = "";
	clear = false;
	$("#calc")[0].innerHTML = "";

}

function changeSign() {

	var string = $("#result").val();
	if (string[string.length - 1] != '.') {

		$("#result").val(Number($("#result").val()) * -1);

	} else {

		$("#result").val(Number($("#result").val()) * -1 + ".");

	}
	
}

function operation(sign) {

	var string = $("#result").val();
	if ((!(calc.trim().replace(/.*?(\d+)[^\d]*$/,'$1') == string)) && (!mistake) || newNumber) {
		
		calc += $("#result").val() + " " + sign + " ";
		clear = true;
		newNumber = false;

	} else {

		mistake = true;
		calc = calc.trim().replace(/[+\-×\/]$/, sign) + " ";

	}

	$("#calc")[0].innerHTML = calc;

}

function calculate() {

	calc += $("#result").val();
	var op = calc.split(" ");
	var result = op[0] * 1;
	for (var i = 0; i < op.length; i++) {
		if (op[i] != /[0-9]/g) {
			switch(op[i]) {
				case "+":
					result += (op[i + 1] * 1);
					break;

				case "-":
					result -= (op[i + 1] * 1);
					break;

				case "×":
					result *= (op[i + 1] * 1);
					break;

				case "/":
					result /= (op[i + 1] * 1);
					break;

			}
		}
	}
	
	if (isNaN(result)) {

		result = "Risultato non definito"

	} 

	if (result == Infinity) {
		
		result = "Impossibile dividere per zero";

	}

	$("#result").val(result);
	calc = "";
	clear = true;
	$("#calc")[0].innerHTML = "";

}

function switchMode() {

	if ($("#science").css("display") == "table-row") {

		$("tbody")[0].removeChild(document.getElementById('science'));
		$("#switch")[0].innerHTML = "Base --> Scientifica";

	} else {

		var row = $("tbody")[0].insertRow();
		row.id = "science";

		var cell = row.insertCell();
		cell.setAttribute("colspan", "4");

		var butt = document.createElement("BUTTON");

		butt.setAttribute("onclick", "oneOver()");
		butt.innerHTML = "1/X";

		cell.appendChild(butt);

		$("#switch")[0].innerHTML = "Scientifica --> Base";

	}

}

function oneOver() {

	var toSet = "" + (1 / $("#result").val() * 1);

	if (isNaN(toSet)) {

		toSet = "Risultato non definito"

	} 

	if (toSet == Infinity) {
		
		toSet = "Impossibile dividere per zero";

	}

	$("#result").val(toSet);
	clear = true;

}