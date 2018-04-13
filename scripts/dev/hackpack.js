// ==UserScript==
// @name         FRHD Hack Tool
// @version      1
// @author       GoodraFRHD
// @match        *://www.freeriderhd.com/*
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
GameSettings.vehiclePowerup.minTime = -999;
GameSettings.vehiclePowerup.time = 0;
GameSettings.vehiclePowerup.maxTime = 999;
GameSettings.user.classic = true;
user.classic = true;
GameSettings.user.plus = true;
user.plus = true;
GameSettings.requireTrackVerification = false;
user.admin = true;
    var recordData = [];
    document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 0; break;//shift
            case 80: GameManager.game.currentScene.trackComplete(); break;//"p"
            case 49: GameManager.game.currentScene.playerManager.firstPlayer.createTempVehicle("HELI", 29970,  GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;//1 key
            case 50: GameManager.game.currentScene.playerManager.firstPlayer.createTempVehicle("TRUCK", 29970,  GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;//2
            case 48: GameManager.game.currentScene.playerManager.firstPlayer.createBaseVehicle(GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._tempVehicle.dir,GameManager.game.currentScene.playerManager.firstPlayer._tempVehicle.masses[0].vel); break;
            case 87: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = -0.3;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0; break; //"w"
            case 65: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = -0.3; break; //"a"
            case 83: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0.3;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0; break; //"s"
            case 68: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0.3; break; //"d"
            case 67: GM_setClipboard(GameManager.game.currentScene.track.getCode());GameManager.game.currentScene.message.show("Track Copied!",50,"#08faf3"); break;//C
            case 88: recordData.push(GameManager.game.currentScene.playerManager.firstPlayer._gamepad);GameManager.game.currentScene.playerManager.firstPlayer._createCheckpoint(GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;
            case 13: var p = recordData.length-1;GameManager.game.currentScene.playerManager.firstPlayer._gamepad = recordData[p]; break;
        }
	});
 	document.addEventListener('keyup', function(e) {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 100; break;//shift
		}
	});
})();
