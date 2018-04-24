// ==UserScript==
// @name         FRHD Editor Tool
// @version      1
// @author       GoodraFRHD
// @match        *://www.freeriderhd.com/*
// @require      https://code.jquery.com/jquery-1.10.2.js
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

/*Press ~ to inject
Commands:
1: Verifies the level
\: Teleports you to camera
*/
(()=> {
var injected;
    document.addEventListener('keydown', e => {
		switch (e.keyCode) {
        case 192:
GameSettings.vehiclePowerup.time = 0;
if(injected)return;
injected = !0;
cS = GameManager.game.currentScene;
fP = cS.playerManager.firstPlayer;
cS.message.show("Inject Successful!",50,"#8A2BE2");
console.log('Injected');
GameSettings.vehiclePowerup.minTime = -999;
GameSettings.vehiclePowerup.maxTime = 999;
         break;
         case 49:if(!injected)return;cS.message.show("Track Verified",50,"#8A2BE2"); cS.verified = !0; break;
            case 220:if(!injected)return; cS.message.show("Moved to: "+Math.floor((cS.camera.position.x*100))/100+", "+Math.floor((cS.camera.position.y*100))/100,50,"#8A2BE2");fP.createBaseVehicle(cS.camera.position,1,{x: 0,y: 0}); break;
            case 88: if(!injected)return;cS.message.show("Created Checkpoint",50,"#8A2BE2");fP._createCheckpoint(); break;
        }
	});

})();
