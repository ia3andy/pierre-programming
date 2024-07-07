
import {Howl, Howler} from 'howler';

const winSounds = [
 //    "applause-2.wav",
    "applause.wav",
    "fairy-win-sound.wav",
    "conference-audience-clapping.wav",
//    "ending-show-audience-clapping.wav",
    "video-game-win.wav",
    "small-win.wav"
];


const failSounds = [
    "cartoon-falling-whistle.wav",
    "cartoon-laugh-voice.wav",
    "fail-notification.wav",
    "fart-2.wav",
    "fart.wav",
    "kung-fu-.wav",
    "laughing-cartoon-creature.wav",
    "samurai-sword-impact.wav",
    "strong-punch.mp3",
    "sword.wav",
    "weak-hit-impact.wav"
];

function howl(s) {
    return new Howl({src: [`/static/sounds/${s}`]});
}


const winSoundsHowlers = winSounds.map(howl);


const failSoundsHowlers = failSounds.map(howl);


export function playWin() {
    winSoundsHowlers[Math.floor(Math.random() * winSoundsHowlers.length)].play();
};

export function playFail() {
    failSoundsHowlers[Math.floor(Math.random() * failSoundsHowlers.length)].play();
};