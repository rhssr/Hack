// ==UserScript==
// @name         FRHD No Clip
// @version      1
// @author       GoodraFRHD
// @match        *://www.freeriderhd.com/*
// @grant        unsafeWindow
// ==/UserScript==
//Hit shift to enable
(function() {
//GameSettings.developerMode = true;
GameSettings.vehiclePowerup.minTime = -999;
GameSettings.vehiclePowerup.time = 0;
GameSettings.vehiclePowerup.maxTime = 999;
GameSettings.user.classic = true;
user.classic = true;
GameSettings.user.plus = true;
user.plus = true;
GameSettings.requireTrackVerification = false;
user.admin = true;
 	document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 0; break;
        }
	});
 	document.addEventListener('keyup', function(e) {
		switch (e.keyCode) {
			case 16: GameSettings.physicsSectorSize = 100; break;
            case 17: bombClip = true; break;
		}
	});
})();
