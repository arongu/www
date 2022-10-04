export { Timer }

class Timer {
    constructor(limit, ms) {
        if ( limit !== undefined && Number.isInteger(limit) && limit > 0 ) this.limit = limit;
        else this.limit = null;

        if ( ms !== undefined && Number.isInteger(ms) && ms > 0 ) this.ms = ms;
        else this.ms = 1000;

        this.count = null;
        this.interval = null;
    }

    // setInterval, arrow function for "this"
    callbackLimited = () => {
        this.count++;
        if ( this.count === this.limit ) {
            clearInterval(this.interval);
        }
    }

    callbackUnlimited = () => this.count++;

    reset(){
        this.count = 0;
    }

    start(){
        if ( this.interval === null ) {
            const callback = this.limit === null ? this.callbackUnlimited : this.callbackLimited;
            this.interval = setInterval(callback, this.ms);

        } else {
            console.log("Timer is already running!");
        }
    }

    stop(){
        if ( this.interval !== null ) {
            clearInterval(this.interval);
             this.interval = null;
        }
    }

    getElapsed(){
        return this.count;
    }
}