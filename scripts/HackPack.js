// ==UserScript==
// @name         FRHD Hack Tool
// @version      1
// @author       GoodraFRHD
// @match        *://www.freeriderhd.com/*
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==
(() => {
/*
KEYBINDS:
P: win track
SHIFT: noclip
1: heli
2: truck
3: balloon
0: bike
W,A,S,D: change gravity
*/
GameSettings.vehiclePowerup.minTime = -999;
GameSettings.vehiclePowerup.time = 0;
GameSettings.vehiclePowerup.maxTime = 999;
GameSettings.user.classic = true;
user.classic = true;
GameSettings.user.plus = true;
user.plus = true;
GameSettings.requireTrackVerification = false;
user.admin = true;
    var a;
    document.addEventListener('keydown', e => {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 0; break;//shift
            case 80: GameManager.game.currentScene.verifyComplete = ()=>{return !0;}; GameManager.game.currentScene.trackComplete(); break;//"p"
            case 49: GameManager.game.currentScene.playerManager.firstPlayer.createTempVehicle("HELI", 29970,  GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;//1 key
            case 50: GameManager.game.currentScene.playerManager.firstPlayer.createTempVehicle("TRUCK", 29970,  GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;//2
            case 51: GameManager.game.currentScene.playerManager.firstPlayer.createTempVehicle("BALLOON", 29970,  GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.dir); break;//3 key
            case 48: GameManager.game.currentScene.playerManager.firstPlayer.createBaseVehicle(GameManager.game.currentScene.camera.position,GameManager.game.currentScene.playerManager.firstPlayer._tempVehicle.dir,GameManager.game.currentScene.playerManager.firstPlayer._tempVehicle.masses[0].vel); break;
            case 87: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = -0.3;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0; break; //"w"
            case 65: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = -0.3; break; //"a"
            case 83: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0.3;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0; break; //"s"
            case 68: GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.y = 0;GameManager.game.currentScene.playerManager.firstPlayer._baseVehicle.gravity.x = 0.3; break; //"d"
            case 67: GM_setClipboard(GameManager.game.currentScene.track.getCode());GameManager.game.currentScene.message.show("Track Copied!",50,"#8A2BE2"); break;//C
 }
	});
 	document.addEventListener('keyup', e => {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 100; break;//shift
		}
	});
})();
