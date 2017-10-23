"use strict";
const fps = require("fps");

class fpsCalc {
    constructor() {
    	this.counter = 0;
        this.fpsSum = 0.0;
        this.ticker = fps({
            every: 1   // update every frame
        });
        this.ticker.on('data', (framerate) => {
            this.fpsSum = this.fpsSum + framerate;
            this.counter++;
        });
    }

    tickFPS() {
        this.ticker.tick();
    }

    getAverageFPS() {
        if(this.fpsSum > 0) {
            return this.fpsSum / this.counter;
        }
        return 0;
    }

}

module.exports = fpsCalc;
