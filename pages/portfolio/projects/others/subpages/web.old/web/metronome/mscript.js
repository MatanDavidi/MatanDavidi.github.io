var quarterCounter = 1;
var overMetric = 4;
var underMetric = 4;
var intervalID = 0;
var isPlaying = false;
var firstClick = true;

var count = 0;
var msFirst = 0;
var msPrevious = 0;

function updateMetric() {

    var um = $("#underMetric").val() * 1;

    if (Math.log2(um) == Math.round(Math.log2(um))
        && um >= 2) {

        underMetric = $("#underMetric").val() * 1;

    } else {

        $("#underMetric").val(underMetric);

    }

    if ($("#overMetric").val() * 1 > 0) {

        overMetric = $("#overMetric").val() * 1;

    } else {

        overMetric = underMetric;
        $("#overMetric").val(underMetric);

    }

}

function updateTempo(value) {

    if (value * 1 <= 300 && value * 1 > 0) {

        $("#tempo").val(value * 1);
        $("#tempoNumber").val(value * 1);

    } else if (value * 1 > 300) {

        $("#tempo").val(300);
        $("#tempoNumber").val(300);

    } else {

        $("#tempo").val(1);
        $("#tempoNumber").val(1);

    }

}

function beatIt() {

    if (!isPlaying) {

        $("#playPause").val("❚❚");

        var tempo = $("#tempo").val() * 1;

        var ms = (60000 / (underMetric / 4)) / tempo;

        if (firstClick) {

            moreCowbell();
            intervalID = setInterval(moreCowbell, ms);
            firstClick = false;

        } else {

            intervalID = setInterval(moreCowbell, ms);

        }

        isPlaying = true;

    } else {

        clearInterval(intervalID);

        isPlaying = false;
        firstClick = true;
        quarterCounter = 1;

        $("#playPause").val("►");

    }

}

function moreCowbell() {

    if (quarterCounter == 1 || overMetric <= 1) {

        var audio = new Audio('sfx/MetronomeUp.wav');
        quarterCounter++;

    } else {

        var audio = new Audio('sfx/Metronome.wav');
        quarterCounter++;

        if (quarterCounter >= overMetric + 1) {

            quarterCounter = 1;

        }

    }

    audio.play();

}

function clickBeat() {

    var d = new Date();
    var t = d.getTime();

    if ((t - msPrevious) > 1000 * $("#seconds").val()) {

        count = 0;

    }

    if (count == 0) {

        msFirst = t;
        count = 1;

    } else {

        var bpmAvg = 60000 * count / (t - msFirst);
        var bpmRound = Math.round(Math.round(bpmAvg * 100) / 100);
        $("#tempo").val(bpmRound);
        $("#tempoNumber").val(bpmRound);
        count++;

    }

    msPrevious = t;
    return true;

}