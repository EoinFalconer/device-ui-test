"use strict";
const Graphics = require('./graphics.js');

function normaliseFPS(fps) {
	let result = '';
	if(fps >= 40.0){
		result = 'high';
	}else if(fps < 40.0 && fps > 20.0){
		result = 'medium';
	}else{
		result = 'low';
	}
	return result;
}

module.exports = function() {
    return new Promise(function(resolve, reject){
        let graphics = new Graphics();
        graphics.addChildren().then(function(){
            graphics.startAnimation();
            setTimeout(function(){
                graphics.stopAnimation();
                let fps = graphics.getAverageFPS();
                resolve(normaliseFPS(fps));
            }, 1250);
        });
    });
}
