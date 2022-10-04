export { AudioPlayer }

class AudioPlayer {
    constructor(audio_volume,
                play_tracks_on_loop,
                play_tracks_shuffled,
                tracks_base_path,
                track_list,
                callback_message,
                callback_message_fading,
                callback_message2) {

        this.audio                 = null;
        this.audio_volume          = audio_volume;
        this.play_music            = false;
        this.play_tracks_on_loop   = play_tracks_on_loop;
        this.play_1track_on_loop   = false;
        this.play_tracks_shuffled  = play_tracks_shuffled;
        this.tracks                = track_list;
        this.tracks_base_path      = tracks_base_path;
        this.track_index           = play_tracks_shuffled === true ? Math.floor(Math.random() * this.tracks.length) : 0;
        this.track_index_playing   = null;
        this.callback_message      = callback_message;
        this.callback_message_fading = callback_message_fading;
        this.callback_message2     = callback_message2;
    }

    // handlers
    handlerPlay(){
        this.callback_message("▶ " + this.tracks[this.track_index]);
    }

    handlerPaused(){
        this.callback_message("⏸ " + this.tracks[this.track_index]);
    }

    handlerOnEnd(){
        if ( this.play_1track_on_loop ) {
            this.callback_message_fading("⏮ ");
            this.audio.play();

        } else if ( this.play_tracks_on_loop ) {
            this.callback_message_fading("⏭ ");
            this.nextTrack();

        } else if ( this.play_tracks_shuffled ) {
            this.trackRandom();

        } else {
            this.callback_message("■ " + this.tracks[this.track_index]);
            this.play_music = false; // click back to "stop"
            setTimeout(() => { this.callback_message2("") }, 1500);
        }
    }

    handlerCanplaythrough(){
        if ( this.play_music === true ) this.audio.play();
    }

    handlerOnTimeUpdate(){
      this.showState();
    }

    showState(){
        if ( this.audio === null ) return;
        if ( isNaN(this.audio.duration) ) return;

        let percent = ((this.audio.currentTime / this.audio.duration) * 100).toFixed(1);
        let string = "";

        if ( this.play_tracks_shuffled ) string += "🔀 ";
        if ( this.play_tracks_on_loop ) string += "🔁 ";
        if ( this.play_1track_on_loop ) string += "🔂 ";

        string += percent + "%";
        this.callback_message2(string);
    }

    // track navigation
    loadTrack(){
        if ( this.audio !== null ) {
            this.audio.pause();
            this.audio = null;
        }

        this.audio = new Audio(this.tracks_base_path + "/" + this.tracks[this.track_index]);
        this.track_index_playing = this.track_index;
        this.audio.volume = this.audio_volume / 100;
        this.audio.addEventListener("canplaythrough", (event) => this.handlerCanplaythrough());
        this.audio.addEventListener("play", (event) => this.handlerPlay());
        this.audio.addEventListener("pause", (event) => this.handlerPaused());
        this.audio.addEventListener("ended", (event) => this.handlerOnEnd());
        this.audio.addEventListener("timeupdate", (event) => this.handlerOnTimeUpdate());
    }

    notifySelected(){
        if ( this.play_tracks_shuffled ) this.callback_message("🔀 " + this.tracks[this.track_index]);
        else this.callback_message(this.tracks[this.track_index]);
    }

    trackRandom(){
        if ( this.tracks.length === 0 ) return;

        let n, tries = 5;
        do {
            n = Math.floor(Math.random() * this.tracks.length);
            tries++;

        } while ( n === this.track_index && tries < 5 )
        this.track_index = n;
    }

    trackForward(){
        if ( this.play_tracks_on_loop && this.track_index === this.tracks.length - 1 ) {
            this.track_index = 0;

        } else if ( this.track_index <= this.tracks.length - 1 ) {
            this.track_index = this.track_index + 1;
        }
    }

    trackBackwards(){
        if (this.play_tracks_on_loop && this.track_index === 0) {
            this.track_index = this.tracks.length - 1;

        } else if (this.track_index > 0) {
            this.track_index = this.track_index - 1;
        }
    }

    nextTrack(){
        if ( this.play_tracks_shuffled ) this.trackRandom();
        else this.trackForward();

        if ( this.play_music ) this.loadTrack();
        else this.notifySelected();
    }

    previousTrack(){
        if ( this.play_tracks_shuffled ) this.trackRandom();
        else this.trackBackwards();

        if ( this.play_music ) this.loadTrack();
        else this.notifySelected();
    }

    play(){
        if ( this.audio === null || this.track_index !== this.track_index_playing ) this.loadTrack();
        else this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    // playPause
    // event driven, music starts "later"

    isPlaying() {
        return this.play_music;
    }

    playPause(){
        this.play_music = !this.play_music;
        if ( this.play_music ) this.play();
        else this.pause();
    }

    toggleShuffle(){
        this.play_tracks_shuffled = !this.play_tracks_shuffled;
        this.callback_message_fading("Shuffle tracks: " + this.play_tracks_shuffled);
        this.showState();
    }

    togglePlayOnLoop(){
        this.play_tracks_on_loop = !this.play_tracks_on_loop;
        this.callback_message_fading("Play on loop: " + this.play_tracks_on_loop);
        this.showState();
    }

    toggleSameTrackLoop(){
        this.play_1track_on_loop = !this.play_1track_on_loop;
        this.callback_message_fading("Repeat same track: " + this.play_1track_on_loop);
        this.showState();
    }

    // volume
    volumeUp(){
        if ( this.audio !== null ) {
            if ( this.audio_volume < 100 ) {
                this.audio_volume = this.audio_volume + 5;
                this.audio.volume = this.audio_volume / 100;
            }

            this.callback_message_fading("🔊 " + this.audio_volume + "%");
        }
    }

    volumeDown(){
        if ( this.audio !== null ) {
            if ( this.audio_volume > 0 ) {
                this.audio_volume = this.audio_volume - 5;
                this.audio.volume = this.audio_volume / 100;
            }

            this.callback_message_fading("🔉 " + this.audio_volume + "%");
        }
    }
}
