function isPalindrome(palindrome) {

	return palindrome == palindrome.split('').reverse().join('');

}

function calculatePalindrome() {

	var checkTesto = /[^A-Za-zàèìòùÀÈÌÒÙ ]/;
	if (!(checkTesto.test(document.getElementById('text').value))) {

		var testoPalindromo = (document.getElementById('text').value).replace(/ /g, "");

		if (isPalindrome(testoPalindromo.toUpperCase())) {

			document.getElementById("palindromo").style.color = "green";
			document.getElementById("palindromo").innerHTML = testoPalindromo;

		} else {

			document.getElementById("palindromo").style.color = "red";
			document.getElementById("palindromo").innerHTML = testoPalindromo;
			
		}

		document.getElementById('farfallino').innerHTML = butterfly(document.getElementById('text').value);

	} else {

		window.alert("ERRORE\nPassare solo testo letterale, senza numeri.\n(Testo passato: " + document.getElementById('text').value + ")");
		document.getElementById('text').value = "";

	}

}

function butterfly(string) {
		
	var toReturn = "";

	for (var i = 0; i < string.length; i++) {
		
		if (isVowel(string.charAt(i))) {

			toReturn += "<b>" + string.charAt(i) + 'f' + string.charAt(i) + "</b>";

		} else {

			toReturn += string.charAt(i);

		}

	}

	return toReturn;

}

function isVowel(char) {

	return (char.toLowerCase() == 'a') || (char.toLowerCase() == 'e') || (char.toLowerCase() == 'i') || (char.toLowerCase() == 'o') || (char.toLowerCase() == 'u') || (char.toLowerCase() == 'à') || (char.toLowerCase() == 'è') || (char.toLowerCase() == 'ì') || (char.toLowerCase() == 'ò') || (char.toLowerCase() == 'ù')

}