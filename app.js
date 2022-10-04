import {
    uiInit,
    uiMenuUp,
    uiMenuDown,
    uiMenuEnter,
    uiUpdateMessage,
    uiUpdateMessageTimed,
    uiUpdateMessage2

} from "./view.js";

import { AudioPlayer } from "./lib/audio_player.js";

// audio
const tracks = [
    "down_under.mp3",
    "music_died.mp3",
    "dancing_in_the_moonlight.mp3",
    "things_have_changed.mp3",
    "jonny_boy.mp3",
    "bad_guy.mp3",
    "one_of_us.mp3",
    "blow_it_up.mp3",
    "numbers.mp3",
    "borderline.mp3",
    "heat_waves.mp3",
    "kansas_city.mp3",
    "born_in_the_usa.mp3",
    "luddite.mp3",
    "man_in_black.mp3",
    "run.mp3",
    "see_you_all.mp3",
    "i_will_buy_you_a_new_life.mp3",
    "concert_for_aliens.mp3",
    "freaks.mp3",
    "sheer.mp3",
    "afg.mp3",
    "slip_slidin.mp3",
    "sunshine_reggae.mp3",
    "take_on_me.mp3",
    "wreckin_bar.mp3",
    "the_lonesome_road.mp3",
    "sleeping_is_naturelle.mp3",
    "goodbye_goodbye.mp3"
];

const wrong_button_messages = [
    "Wrong button Chief!",
    "That's not it.",
    "You will get the hang of it.",
    "You might want to read the description.",
    "You like pressing buttons don't you?"
];

let audioPlayer,
    userInteracted;

const wrongButton = () => {
    const i = Math.floor(Math.random() * wrong_button_messages.length);
    uiUpdateMessageTimed(wrong_button_messages[i]);
}

const wheelHandler = (wheelEvent) => {
    if ( wheelEvent.deltaY > 0 ) audioPlayer.volumeDown(); // up
    else audioPlayer.volumeUp(); // down
}

const keyHandler = (keyDownEvent) => {
    userInteracted = true;
    switch (keyDownEvent.key) {
        case "ArrowUp"   : { uiMenuUp(); break; }
        case "ArrowDown" : { uiMenuDown(); break; }
        case "Enter"     : { uiMenuEnter(); break; }
        case "Shift"     : { break; }
        // audio
        case "c" : { audioPlayer.playPause(); break; }
        case "e" : { audioPlayer.nextTrack(); break; }
        case "E" : { audioPlayer.previousTrack(); break }
        case "l" : { audioPlayer.togglePlayOnLoop(); break; }
        case "L" : { audioPlayer.toggleSameTrackLoop(); break }
        case "s" : { audioPlayer.toggleShuffle(); break }
        case "+" : { audioPlayer.volumeUp(); break; }
        case "-" : { audioPlayer.volumeDown(); break; }
        default  : { wrongButton(); }
    }
}

const shakeUpUser = () => {
    setTimeout(()=> {
        if ( ! userInteracted ) {
            uiUpdateMessage("♫ Hit 'c' for play/pause music! e/E to navigate ;) ♪🎶");
        }
    }, 15000);
}

const init = () => {
    audioPlayer = new AudioPlayer(20,
        true,
        false,
        "lib/music/",
        tracks,
        uiUpdateMessage,
        uiUpdateMessageTimed,
        uiUpdateMessage2
    );

    document.addEventListener("keydown", keyDownEvent => keyHandler(keyDownEvent));
    document.addEventListener('wheel', wheelEvent => wheelHandler(wheelEvent));

    userInteracted = false;
}

uiInit();
init();
shakeUpUser();
