var synth = window.speechSynthesis;

var voiceSelect = $('select')[0];
var inputTxt = $('#text');


function populateVoiceList() {

    voices = synth.getVoices();

    for(i = 0; i < voices.length ; i++) {

        var option = document.createElement('OPTION');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if(voices[i].default) {

            option.textContent += ' -- DEFAULT';

        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        $("#voiceSelect").append(option);

    }

}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {

    speechSynthesis.onvoiceschanged = populateVoiceList;

}

function talk(params) {

    if (synth.speaking) {

        synth.cancel();
        
    } else {

        var utterThis = new SpeechSynthesisUtterance($('#text').val());
        var selectedOption = $('select')[0].selectedOptions[0].getAttribute('data-name');

        for(i = 0; i < voices.length ; i++) {

            if(voices[i].name === selectedOption) {

                utterThis.voice = voices[i];

            }

        }

        synth.speak(utterThis);
        inputTxt.blur();

    }

}

document.onkeypress = function(event) {

    if (event.keyCode == 13 && !$("#text").is(':focus')) {

        talk();

    }
    
};