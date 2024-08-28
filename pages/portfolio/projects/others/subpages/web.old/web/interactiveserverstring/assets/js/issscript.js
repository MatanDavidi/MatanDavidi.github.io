//If the rows inside of the table are ordered in ascending order
var isAscending = false;

function updateVal() {

	var newVal = $(".container input[type=range]").val();	
	
	var toUpdate = "";

	switch(newVal) {

		case "0":
			toUpdate = "farfallino";
			break;

		case "1":
			toUpdate = "palindromo";
			break;

		case "2":
			toUpdate = "statistiche";
			break;

	}

	$(".container b").html("Modalità scelta: " + toUpdate);

}

function sortTable(isChar) {

	if ($("#statsTable")[0] !== undefined) {

        var switched = false;
        const rows = $("#statsTable")[0].getElementsByTagName('tr');

        do {

            switched = false;

            for (var i = 1; i < rows.length - 1; i++) {

                const x = rows[i].getElementsByTagName('td')[isChar? 0: 1].innerHTML;
                const y = rows[i + 1].getElementsByTagName('td')[isChar? 0: 1].innerHTML;

                if (isAscending? (isChar? x < y: x * 1 < y * 1): (isChar? x > y: x * 1 > y * 1)) {

                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switched = true;

                }

            }

        } while (switched);

        var tdHtml = $("#statsTable")[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[isChar? 0: 1].innerHTML;


        if (isAscending) {

            $("#statsTable")[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[isChar? 0: 1].innerHTML =
            tdHtml.split('↑')[0] + ' ↓';

        } else {

            $("#statsTable")[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[isChar? 0: 1].innerHTML =
            tdHtml.split('↓')[0] + ' ↑';

        }

        //Remove the arrow from the column that isn't ordered
        const headerRow = $("#statsTable")[0].getElementsByTagName('tr')[0];

        headerRow.getElementsByTagName('th')[isChar? 1: 0].innerHTML =
        (headerRow.getElementsByTagName('th')[isChar? 1: 0].innerHTML).split(isAscending? '↑': '↓')[0];

        isAscending = !isAscending;

    }

}

sortTable(true);