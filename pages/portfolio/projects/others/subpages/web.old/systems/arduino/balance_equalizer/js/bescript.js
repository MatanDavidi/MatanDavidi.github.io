$(function(){

    $("input[value='Balance Equalizer']").on('click', function() {buttonClicked("Balance Equalizer")});
    $("input[value='LED Matrix']").on('click', function() {buttonClicked("LED Matrix")});
    $("input[value='Joystick']").on('click', function() {buttonClicked("Joystick")});

});

function buttonClicked(bttn) {

    //Read the XML's data
    $.post("xml/esercizio.xml", function(data) {

        replaceBody(data.getElementsByTagName('esercizio')[findIndex(data, bttn)]);

    });
    
}

function replaceBody(esercizio) {

    var desc = esercizio.getElementsByTagName('descrizione')[0].innerHTML;
    $("#descrizione").html(desc);

    var mat = esercizio.getElementsByTagName('materiale')[0].innerHTML
    $("#materiale").html(mat);

    var sche = esercizio.getElementsByTagName('schemi')[0].innerHTML
    $("#schemi").html(sche);

    var cod = esercizio.getElementsByTagName('codice')[0].innerHTML
    $("#codice").html(cod);

}

function findIndex(data, bttn) {

    var titoli = data.getElementsByTagName('titolo');

    for (var i = 0; i < titoli.length; i++) {

        if (titoli[i].childNodes[0].nodeValue == bttn) {

            return i;

        }

    }

}