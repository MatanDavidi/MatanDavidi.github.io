var budget;
var kidMode;
var wins = 0;
var losses = 0;

// =================================== playGame ================================

function playGame() {

  if (kidMode == undefined) {

    budget = 50;

    if (new Date(document.getElementById('date').value) > new Date()) {

      dateError()

    } else if (checkAdult(new Date(document.getElementById('date').value))) {

      kidMode = false;


    } else {

      kidMode = true;
      alert("Kid friendly mode: ACTIVATED");

    }

  }

  if (kidMode) {

    kidsGame();

  } else {

    changeDiceVisibility("none");

    document.getElementById('betTip').innerHTML = "Inserire la propria puntata (Massimo: " + budget + " CHF):";
    document.getElementById('bet').setAttribute("max", budget);
    document.getElementById('center').style.display = "none";
    document.getElementById('adultGame').style.display = "block";

  }

}

// ================================== dateError ================================

function dateError() {

  alert("ERRORE: La data di nascita non può essere oltre quella di oggi.");

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {

    dd = '0' + dd;

  }

  if (mm < 10) {

    mm = '0' + mm;

  }

  today = yyyy + '-' + mm + '-' + dd;

  document.getElementById('date').value = today;

}

// ================================ checkAdult =================================

function checkAdult(d) {

  var etaMs = new Date() - d.getTime();
  var etaData = new Date(etaMs);
  var anni = Math.abs(etaData.getUTCFullYear() - 1970);

  return anni >= 18;

}

// ============================= goAllIn =======================================

function goAllIn() {

  document.getElementById('bet').value = budget;

}

// ======================== changeDiceVisibility ===============================

function changeDiceVisibility(value) {

  var dice = document.getElementsByClassName('dice');
  for (var i = 0; i < dice.length; i++) {

    dice[i].style.display = value;

  }

}

// =============================== kidsGame ====================================

function kidsGame() {

  document.getElementById('center').style.display = "none";
  betSet(0);

}

// =============================== betSet ======================================

function betSet(money) {
  
  if (money > budget && !kidMode) {

    alert("ERRORE: Non disponi di " + money + " CHF. Montepremi: " + budget + ".");
    document.getElementById('bet').value = budget;

  } else if (money < 5 && !kidMode) {

    alert("ERRORE: Devi scommettere almeno 5 CHF.");
    document.getElementById('bet').value = 5;

  } else {
	
	document.getElementById('adultGame').style.display = "none";

    var bet = money;
	
	budget -= bet;

    var diceRoll = new Audio('sfx/dice.mp3');
    diceRoll.play();

    var pDie1 = throwDie();
    var pDie2 = throwDie();
    var pcDie1 = throwDie();
    var pcDie2 = throwDie();

    var diceResult = document.getElementsByClassName('diceResult');

    changeImg(document.getElementById('pDie1'), pDie1);
    changeImg(document.getElementById('pDie2'), pDie2);
    changeImg(document.getElementById('pcDie1'), pcDie1);
    changeImg(document.getElementById('pcDie2'), pcDie2);

    changeDiceVisibility("inline");
    document.getElementById('dice').style.display = "block";

    if (playerWins((pDie1 + pDie2), (pcDie1 + pcDie2))) {

      document.getElementById('result').innerHTML = "HAI VINTO!";
      if (!kidMode) {

        budget += bet * 2;

      } else {

        wins++;

      }

    } else {

      document.getElementById('result').innerHTML = "HAI PERSO!";

      if (kidMode) {

        losses++;

      }

    }

    if (!kidMode) {

      document.getElementById('curBudget').innerHTML = "Montepremi corrente: " + budget + " CHF";

      if (budget < 5) {

        endGame();

      }

    } else {

      document.getElementById('status').innerHTML = "Vittorie: " + wins + "<br> Sconfitte: " + losses;

    }

  }

}

// =============================== changeImg ===================================

function changeImg(element, die) {

  switch (die) {
    case 1:
      element.setAttribute("src", "img/dice/die_1.png");
      break;

    case 2:
      element.setAttribute("src", "img/dice/die_2.png");
      break;

    case 3:
      element.setAttribute("src", "img/dice/die_3.png");
      break;

    case 4:
      element.setAttribute("src", "img/dice/die_4.png");
      break;

    case 5:
      element.setAttribute("src", "img/dice/die_5.png");
      break;

    case 6:
      element.setAttribute("src", "img/dice/die_6.png");
      break;

  }

}

// =============================== throwDie ====================================

function throwDie() {

  return getRandomIntInclusive(1, 6);

}

// ========================== getRandomIntInclusive ============================

function getRandomIntInclusive(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso

}

// ============================= playerWins ====================================

function playerWins(player, cpu) {

  if (player > cpu) {

    return true;

  } else {

    return false;

  }

}

// ================================ endGame ====================================

function endGame() {

  document.getElementById('replay').style.display = "none";

}
