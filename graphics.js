"use strict";

const fpsCalc = require("./fps-calculator");
const pixijs = require("pixi.js");

class Graphics {

    constructor() {
    	this.isCapable = true;
    	this.fpsCalc = new fpsCalc();
        this.stage = new PIXI.Stage(0xFFFFFF, true);
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        if (!this.webGLSupport()) {
            this.isCapable = false;
        }
        this.renderer.view.style.display = "none";
        $('body').append(this.renderer.view);
        this.count = 0;
    }

    addChildren() {
        return new Promise((resolve, reject) => {
            try{
                this.graphics = new PIXI.Graphics();

                // set a fill and line style
                this.graphics.beginFill(0xFF3300);
                this.graphics.lineStyle(10, 0xffd900, 1);

                // draw a shape
                this.graphics.moveTo(50,50);
                this.graphics.lineTo(250, 50);
                this.graphics.lineTo(100, 100);
                this.graphics.lineTo(250, 220);
                this.graphics.lineTo(50, 220);
                this.graphics.lineTo(50, 50);
                this.graphics.endFill();

                // set a fill and line style again
                this.graphics.lineStyle(10, 0xFF0000, 0.8);
                this.graphics.beginFill(0xFF700B, 1);

                // draw a second shape
                this.graphics.moveTo(210,300);
                this.graphics.lineTo(450,320);
                this.graphics.lineTo(570,350);
                this.graphics.lineTo(580,20);
                this.graphics.lineTo(330,120);
                this.graphics.lineTo(410,200);
                this.graphics.lineTo(210,300);
                this.graphics.endFill();

                // draw a rectangel
                this.graphics.lineStyle(2, 0x0000FF, 1);
                this.graphics.drawRect(50, 250, 100, 100);

                // draw a circle
                this.graphics.lineStyle(0);
                this.graphics.beginFill(0xFFFF0B, 0.5);
                this.graphics.drawCircle(470, 200,100);

                this.graphics.lineStyle(20, 0x33FF00);
                this.graphics.moveTo(30,30);
                this.graphics.lineTo(600, 300);


                this.stage.addChild(this.graphics);

                // lets create moving shape
                this.thing = new PIXI.Graphics();
                this.stage.addChild(this.thing);
                this.thing.position.x = 620/2;
                this.thing.position.y = 380/2;

                this.count = 0;

                resolve();
            }catch(e){this.isCapable = false;}
        });
    }

    startAnimation() {
        this.intervalRef = setInterval(() => {
            this.animate();
        }, 16);
    }

    stopAnimation() {
        clearInterval(this.intervalRef);
        $(this.renderer.view).remove();
    }

    webGLSupport() {
       var supported;

       try {
           var canvas = document.createElement('canvas');
           supported = !! window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
       } catch(e) { supported = false; }

       try {
           // let is by no means required, but will help us rule out some old browsers: http://caniuse.com/#feat=let
           eval('let foo = 123;');
       } catch (e) { supported = false; }

       if (supported === false) {
           return false;
       } else {
            return true;
       }
     }

     animate() {
        try {
            this.thing.clear();

            this.count += 0.1;

            this.thing.clear();
            this.thing.lineStyle(30, 0xff0000, 1);
            this.thing.beginFill(0xffFF00, 0.5);

            this.thing.moveTo(-120 + Math.sin(this.count) * 20, -100 + Math.cos(this.count)* 20);
            this.thing.lineTo(120 + Math.cos(this.count) * 20, -100 + Math.sin(this.count)* 20);
            this.thing.lineTo(120 + Math.sin(this.count) * 20, 100 + Math.cos(this.count)* 20);
            this.thing.lineTo(-120 + Math.cos(this.count)* 20, 100 + Math.sin(this.count)* 20);
            this.thing.lineTo(-120 + Math.sin(this.count) * 20, -100 + Math.cos(this.count)* 20);

            this.thing.rotation = this.count * 0.1;

            this.renderer.render(this.stage);
            this.fpsCalc.tickFPS();
        } catch(e) {this.isCapable = false;}
    }

    getAverageFPS() {
        if(this.isCapable){
            return this.fpsCalc.getAverageFPS();
        }else {
            return 0;
        }

    }
}

module.exports = Graphics;






