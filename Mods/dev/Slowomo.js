! function t(e, i, s) {
    function n(o, a) {
        if(!i[o]) {
            if(!e[o]) {
                var h = "function" == typeof require && require;
                if(!a && h) return h(o, !0);
                if(r) return r(o, !0);
                var l = new Error("Cannot find module '" + o + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = i[o] = {
                exports: {}
            };
            e[o][0].call(c.exports, function(t) {
                var i = e[o][1][t];
                return n(i ? i : t)
            }, c, c.exports, t, e, i, s)
        }
        return i[o].exports
    }
    for(var r = "function" == typeof require && require, o = 0; o < s.length; o++) n(s[o]);
    return n
}({
    1: [function(t, e) {
        function i() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function s(t) {
            return "function" == typeof t
        }

        function n(t) {
            return "number" == typeof t
        }

        function r(t) {
            return "object" == typeof t && null !== t
        }

        function o(t) {
            return void 0 === t
        }
        e.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(t) {
            if(!n(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, i.prototype.emit = function(t) {
            var e, i, n, a, h, l;
            if(this._events || (this._events = {}), "error" === t && (!this._events.error || r(this._events.error) && !this._events.error.length)) {
                if(e = arguments[1], e instanceof Error) throw e;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if(i = this._events[t], o(i)) return !1;
            if(s(i)) switch(arguments.length) {
                case 1:
                    i.call(this);
                    break;
                case 2:
                    i.call(this, arguments[1]);
                    break;
                case 3:
                    i.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for(n = arguments.length, a = new Array(n - 1), h = 1; n > h; h++) a[h - 1] = arguments[h];
                    i.apply(this, a)
            } else if(r(i)) {
                for(n = arguments.length, a = new Array(n - 1), h = 1; n > h; h++) a[h - 1] = arguments[h];
                for(l = i.slice(), n = l.length, h = 0; n > h; h++) l[h].apply(this, a)
            }
            return !0
        }, i.prototype.addListener = function(t, e) {
            var n;
            if(!s(e)) throw TypeError("listener must be a function");
            if(this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, s(e.listener) ? e.listener : e), this._events[t] ? r(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, r(this._events[t]) && !this._events[t].warned) {
                var n;
                n = o(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(t, e) {
            function i() {
                this.removeListener(t, i), n || (n = !0, e.apply(this, arguments))
            }
            if(!s(e)) throw TypeError("listener must be a function");
            var n = !1;
            return i.listener = e, this.on(t, i), this
        }, i.prototype.removeListener = function(t, e) {
            var i, n, o, a;
            if(!s(e)) throw TypeError("listener must be a function");
            if(!this._events || !this._events[t]) return this;
            if(i = this._events[t], o = i.length, n = -1, i === e || s(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if(r(i)) {
                for(a = o; a-- > 0;)
                    if(i[a] === e || i[a].listener && i[a].listener === e) {
                        n = a;
                        break
                    }
                if(0 > n) return this;
                1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, i.prototype.removeAllListeners = function(t) {
            var e, i;
            if(!this._events) return this;
            if(!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if(0 === arguments.length) {
                for(e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if(i = this._events[t], s(i)) this.removeListener(t, i);
            else
                for(; i.length;) this.removeListener(t, i[i.length - 1]);
            return delete this._events[t], this
        }, i.prototype.listeners = function(t) {
            var e;
            return e = this._events && this._events[t] ? s(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, i.listenerCount = function(t, e) {
            var i;
            return i = t._events && t._events[e] ? s(t._events[e]) ? 1 : t._events[e].length : 0
        }
    }, {}],
    2: [function(t) {
        ! function(e) {
            "use strict";

            function i(t, e, i) {
                this.assets = e, this.settings = i, this.initCanvas(), this.initStage(), this.setSize(), this.switchScene(t), this.setSize(), this.startTicker()
            }
            t("../libs/createjs/easeljs-0.8"), t("../libs/performance");
            var s = t("./scenes/editor"),
                n = t("./scenes/main"),
                r = {
                    Editor: s,
                    Main: n
                };
            i.prototype = {
                gameContainer: null,
                tickCount: 0,
                currentScene: null,
                assets: null,
                stage: null,
                canvas: null,
                stats: null,
                width: 0,
                height: 0,
                fullscreen: !1,
                onStateChange: null,
                initCanvas: function() {
                    var t = document.createElement("canvas"),
                        e = document.getElementById(this.settings.defaultContainerID);
                    e.appendChild(t), this.gameContainer = e, this.canvas = t
                },
                initStage: function() {
                    var t = new createjs.Stage(this.canvas);
                    t.autoClear = !1, createjs.Touch.enable(t), t.enableMouseOver(30), t.mouseMoveOutside = !0, t.preventSelection = !1, this.stage = t
                },
                setSize: function() {
                    var t = window.innerHeight,
                        e = window.innerWidth;
                    if(!this.settings.fullscreen && !this.settings.isStandalone) {
                        var i = this.gameContainer;
                        t = i.clientHeight, e = i.clientWidth
                    }
                    if(this.currentScene) {
                        var s = this.currentScene.getCanvasOffset();
                        t -= s.height
                    }
                    var n = 1;
                    void 0 !== window.devicePixelRatio && (n = window.devicePixelRatio), this.settings.lowQualityMode && (n = 1);
                    var r = e * n,
                        o = t * n;
                    (r !== this.width || o !== this.height) && (this.width = r, this.height = o, this.canvas.width = r, this.canvas.height = o), this.pixelRatio = n, this.canvas.style.width = e + "px", this.canvas.style.height = t + "px", this.currentScene && this.currentScene.command("resize")
                },
                startTicker: function() {
                    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCED, createjs.Ticker.setFPS(this.settings.drawFPS), createjs.Ticker.on("tick", this.update.bind(this))
                },
                update: function() {
                    this.currentScene.update(), this.tickCount+=0.5
                },
                switchScene: function(t) {
                    null !== this.currentScene && this.currentScene.close(), this.currentScene = new r[t](this)
                },
                command: function() {
                    this.currentScene.command.apply(this.currentScene, arguments)
                },
                close: function() {
                    createjs.Ticker.reset(), createjs.Ticker.removeAllEventListeners(), this.currentScene.close(), this.currentScene = null, this.assets = null, this.settings = null, this.stage.autoClear = !0, this.stage.removeAllChildren(), this.stage.update(), this.stage.enableDOMEvents(!1), this.stage.removeAllEventListeners(), this.stage = null, this.canvas.parentNode.removeChild(this.canvas), this.canvas = null, this.tickCount = null, this.height = null, this.width = null
                }
            }, e.Game = i
        }(window = window || {})
    }, {
        "../libs/createjs/easeljs-0.8": 82,
        "../libs/performance": 84,
        "./scenes/editor": 16,
        "./scenes/main": 17
    }],
    3: [function(t, e) {
        function i() {}
        var s = t("../../libs/lodash-3.10.1.js"),
            n = i.prototype;
        n.defaultControlOptions = {
            visible: !0
        }, n.name = null, n.controlsSpriteSheetData = null, n.controlData = null, n.game = null, n.scene = null, n.settings = null, n.stage = null, n.controlsContainer = null, n.controlsSprite = null, n.gamepad = null, n.initialize = function(t) {
            this.scene = t, this.game = t.game, this.assets = t.assets, this.settings = t.settings, this.stage = t.game.stage, this.mouse = t.mouse, this.playerManager = t.playerManager, this.createSprite(), this.addControls(), this.resize()
        }, n.addControls = function() {}, n.createSprite = function() {
            var t = this.scene.assets.getResult(this.name),
                e = this.controlsSpriteSheetData;
            e.images = [t];
            var i = new createjs.SpriteSheet(e),
                s = new createjs.Sprite(i);
            this.controlsSprite = s
        }, n.isVisible = function() {
            return this.controlsContainer.visible
        }, n.hide = function() {
            this.controlsContainer.visible = !1
        }, n.show = function() {
            this.controlsContainer.visible = !0
        }, n.setVisibility = function(t) {
            this.controlsContainer.visible = t
        }, n.createControl = function(t) {
            var e = this.controlsSprite,
                i = s.extend({}, this.defaultControlOptions, this.controlData[t]),
                n = e.clone();
            n.gotoAndStop(t), n.buttonDetails = i, n.cursor = "pointer", n.on("mousedown", this.controlDown.bind(this)), n.on("pressup", this.controlUp.bind(this)), n.on("mouseover", this.mouseOver.bind(this)), n.on("mouseout", this.mouseOut.bind(this));
            var r = n.getBounds();
            if(n.regX = r.width / 2, n.regY = r.height / 2, n.alpha = .5, n.name = t, n.visible = i.visible, i.hitArea) {
                var o = i.hitArea,
                    a = new createjs.Shape;
                o.radius ? a.graphics.beginFill("#000").drawCircle(o.x, o.y, o.radius) : a.graphics.beginFill("#000").drawRect(o.x, o.y, o.width, o.height), n.hitArea = a
            }
            return n
        }, n.mouseOver = function(t) {
            var e = t.target;
            e.alpha = .8, this.mouse.enabled = !1
        }, n.mouseOut = function(t) {
            var e = t.target;
            e.alpha = .5, this.mouse.enabled = !0
        }, n.controlDown = function(t) {
            var e = t.target,
                i = e.buttonDetails,
                s = this.playerManager.firstPlayer.getGamepad();
            if(i.key) {
                var n = i.key;
                s.setButtonDown(n)
            }
            if(i.keys)
                for(var r = i.keys, o = r.length, a = 0; o > a; a++) {
                    var n = r[a];
                    s.setButtonDown(n)
                }
            i.downCallback && i.downCallback(t), this.settings.mobile && (this.mouse.enabled = !1), e.alpha = 1
        }, n.controlUp = function(t) {
            var e = t.target,
                i = e.buttonDetails,
                s = this.playerManager.firstPlayer.getGamepad();
            if(i.key) {
                var n = i.key;
                s.setButtonUp(n)
            }
            if(i.keys)
                for(var r = i.keys, o = r.length, a = 0; o > a; a++) {
                    var n = r[a];
                    s.setButtonUp(n)
                }
            i.upCallback && i.upCallback(t), this.settings.mobile ? (this.mouse.enabled = !0, e.alpha = .5) : e.alpha = .8
        }, n.close = function() {}, n.update = function() {}, n.resize = function() {
            var t = this.scene.game,
                e = (this.scene.screen, t.width),
                i = t.height,
                s = t.pixelRatio,
                n = this.controlsContainer.children;
            for(var r in n) {
                var o = n[r],
                    a = o.buttonDetails;
                a.bottom && (o.y = i - a.bottom * (s / 2)), a.left && (o.x = a.left * (s / 2)), a.right && (o.x = e - a.right * (s / 2)), a.top && (o.y = a.top * (s / 2)), o.scaleX = o.scaleY = s / 2
            }
        }, e.exports = i
    }, {
        "../../libs/lodash-3.10.1.js": 83
    }],
    4: [function(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "fullscreen_controls", n.fullscreenControl = null, n.fullscreen = !1, n.controlsSpriteSheetData = {
            frames: [
                [230, 2, 76, 76],
                [154, 2, 76, 76],
                [78, 2, 76, 76],
                [2, 2, 76, 76]
            ],
            animations: {
                "exit_fullscreen_btn-hover": [0],
                exit_fullscreen_btn: [1],
                "fullscreen_btn-hover": [2],
                fullscreen_btn: [3]
            }
        }, n.controlData = {
            "fullscreen_btn-hover": {
                top: 60,
                right: 150,
                key: "fullscreen"
            }
        }, n.update = function() {
            var t = this.scene.settings.fullscreen;
            this.fullscreen !== t && (this.fullscreenControl.gotoAndStop(t ? "exit_fullscreen_btn-hover" : "fullscreen_btn-hover"), this.fullscreen = t)
        }, n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("fullscreen_btn-hover")), this.controlsContainer = t, this.fullscreenControl = t.getChildByName("fullscreen_btn-hover"), this.stage.addChild(t)
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    5: [function(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "pause_controls", n.pauseControl = null, n.paused = !1, n.controlsSpriteSheetData = {
            frames: [
                [230, 2, 76, 76],
                [154, 2, 76, 76],
                [78, 2, 76, 76],
                [2, 2, 76, 76]
            ],
            animations: {
                "pause_btn-hover": [0],
                pause_btn: [1],
                "play_btn-hover": [2],
                play_btn: [3]
            }
        }, n.controlData = {
            "pause_btn-hover": {
                key: "pause",
                top: 60,
                right: 70
            }
        }, n.update = function() {
            var t = this.scene.state.paused;
            this.paused !== t && (t ? (this.pauseControl.gotoAndStop("play_btn-hover"), this.paused = !0) : (this.pauseControl.gotoAndStop("pause_btn-hover"), this.paused = !1))
        }, n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("pause_btn-hover")), this.controlsContainer = t, this.pauseControl = t.getChildByName("pause_btn-hover"), this.stage.addChild(t)
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    6: [function(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "phone_controls", n.mainResize = n.resize, n.zoomControlsContainer = null, n.lastCheckpointButton = null, n.replayButton = null, n.controlsSpriteSheetData = {
            frames: [
                [782, 2, 128, 128],
                [652, 2, 128, 128],
                [522, 2, 128, 128],
                [912, 78, 75, 75],
                [392, 2, 128, 128],
                [912, 2, 75, 75],
                [262, 2, 128, 128],
                [132, 2, 128, 128],
                [2, 2, 128, 128]
            ],
            animations: {
                accelerate: [0],
                brake: [1],
                direction: [2],
                last_checkpoint: [3],
                left: [4],
                replay: [5],
                right: [6],
                zoom_in: [7],
                zoom_out: [8]
            }
        }, n.controlData = {
            brake: {
                key: "down",
                bottom: 100,
                left: 100,
                hitArea: {
                    width: 250,
                    height: 200,
                    x: -30,
                    y: -15
                }
            },
            direction: {
                key: "z",
                bottom: 250,
                right: 100,
                hitArea: {
                    width: 200,
                    height: 200,
                    x: -20,
                    y: -65
                }
            },
            forward: {
                key: "up",
                bottom: 250,
                left: 100,
                hitArea: {
                    width: 250,
                    height: 200,
                    x: -30,
                    y: -65
                }
            },
            last_checkpoint: {
                key: "enter",
                top: 60,
                left: 160
            },
            left: {
                key: "left",
                bottom: 100,
                right: 250,
                hitArea: {
                    width: 230,
                    height: 230,
                    x: -100,
                    y: -65
                }
            },
            right: {
                key: "right",
                bottom: 100,
                right: 100,
                hitArea: {
                    width: 200,
                    height: 200,
                    x: -10,
                    y: -15
                }
            },
            replay: {
                key: "restart",
                top: 60,
                left: 80
            },
            zoom_in: {
                key: "zoom_increase",
                bottom: 100,
                right: 100
            },
            zoom_out: {
                key: "zoom_decrease",
                bottom: 100,
                left: 100
            }
        }, n.addControls = function() {
            var t = this.createControl("last_checkpoint"),
                e = this.createControl("replay"),
                i = this.createControl("zoom_in"),
                s = this.createControl("zoom_out"),
                n = new createjs.Container;
            n.addChild(this.createControl("left")), n.addChild(this.createControl("right")), n.addChild(this.createControl("forward")), n.addChild(this.createControl("brake")), n.addChild(this.createControl("direction")), n.addChild(t), n.addChild(e), n.addChild(i), n.addChild(s);
            var r = new createjs.Container;
            r.addChild(i), r.addChild(s), r.visibility = !1, this.lastCheckpointButton = t, this.replayButton = e, this.controlsContainer = n, this.zoomControlsContainer = r, this.stage.addChild(n), this.stage.addChild(r)
        }, n.resize = function() {
            var t = this.scene.game,
                e = (this.scene.screen, t.width),
                i = t.height,
                s = t.pixelRatio,
                n = this.zoomControlsContainer.children;
            for(var r in n) {
                var o = n[r],
                    a = o.buttonDetails;
                a.bottom && (o.y = i - a.bottom * (s / 2)), a.left && (o.x = a.left * (s / 2)), a.right && (o.x = e - a.right * (s / 2)), a.top && (o.y = a.top * (s / 2)), o.scaleX = o.scaleY = s / 2
            }
            this.mainResize()
        }, n.setZoomControlsVisibilty = function(t) {
            this.zoomControlsContainer.visible = t
        }, n.update = function() {
            var t = this.scene;
            this.lastCheckpointButton.visible = t.playerManager.firstPlayer.hasCheckpoints() ? !0 : !1
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    7: [function(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "redo_undo_controls", n.controlsSpriteSheetData = {
            frames: [
                [78, 2, 76, 76],
                [2, 2, 76, 76]
            ],
            animations: {
                redo: [0],
                undo: [1]
            }
        }, n.controlData = {
            redo: {
                keys: ["ctrl", "y"],
                top: 60,
                right: 160
            },
            undo: {
                keys: ["ctrl", "z"],
                top: 60,
                right: 240
            }
        }, n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("redo")), t.addChild(this.createControl("undo")), this.controlsContainer = t, this.stage.addChild(t)
        }, n.update = function() {
            var t = this.scene,
                e = this.scene.state.paused;
            t.controls && this.controlsContainer.visible !== e && (this.controlsContainer.visible = e)
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    8: [function(t, e) {
        function i(t) {
            var e = t.settings;
            if(e.fullscreenAvailable === !1) {
                var i = this.controlData["settings_btn-hover"];
                i.top = 60, i.right = 150
            }
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "settings_controls", n.controlsSpriteSheetData = {
            frames: [
                [78, 2, 76, 76],
                [2, 2, 76, 76]
            ],
            animations: {
                "settings_btn-hover": [0],
                settings_btn: [1]
            }
        }, n.controlData = {
            "settings_btn-hover": {
                top: 60,
                right: 230,
                key: "settings"
            }
        }, n.update = function() {}, n.addControls = function() {
            var t = new createjs.Container;
            t.addChild(this.createControl("settings_btn-hover")), this.controlsContainer = t, this.stage.addChild(t)
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    9: [function(t, e) {
        function i(t) {
            this.initialize(t)
        }
        var s = t("./controls"),
            n = i.prototype = new s;
        n.name = "tablet_controls", n.mainResize = n.resize, n.zoomControlsContainer = null, n.lastCheckpointButton = null, n.controlsSpriteSheetData = {
            frames: [
                [154, 306, 150, 150],
                [154, 154, 150, 150],
                [382, 154, 75, 75],
                [306, 2, 150, 150],
                [154, 2, 150, 150],
                [306, 154, 75, 75],
                [2, 306, 150, 150],
                [2, 154, 150, 150],
                [2, 2, 150, 150]
            ],
            animations: {
                accelerate: [0],
                brake: [1],
                last_checkpoint: [2],
                direction: [3],
                left: [4],
                replay: [5],
                right: [6],
                zoom_in: [7],
                zoom_out: [8]
            }
        }, n.controlData = {
            brake: {
                key: "down",
                bottom: 120,
                left: 285,
                hitArea: {
                    radius: 150,
                    x: 75,
                    y: 90
                }
            },
            direction: {
                key: "z",
                bottom: 285,
                right: 450,
                hitArea: {
                    radius: 150,
                    x: 40,
                    y: 40
                }
            },
            forward: {
                key: "up",
                bottom: 285,
                left: 140,
                hitArea: {
                    radius: 150,
                    x: 75,
                    y: 75
                }
            },
            last_checkpoint: {
                key: "enter",
                top: 60,
                left: 160
            },
            left: {
                key: "left",
                bottom: 120,
                right: 285,
                hitArea: {
                    radius: 150,
                    x: 75,
                    y: 75
                }
            },
            right: {
                key: "right",
                bottom: 285,
                right: 140,
                hitArea: {
                    radius: 150,
                    x: 100,
                    y: 40
                }
            },
            replay: {
                key: "restart",
                top: 60,
                left: 80
            },
            zoom_in: {
                key: "zoom_increase",
                bottom: 285,
                right: 140
            },
            zoom_out: {
                key: "zoom_decrease",
                bottom: 285,
                left: 140
            }
        }, n.resize = function() {
            var t = this.scene.game,
                e = (this.scene.screen, t.width),
                i = t.height,
                s = t.pixelRatio,
                n = this.zoomControlsContainer.children;
            for(var r in n) {
                var o = n[r],
                    a = o.buttonDetails;
                a.bottom && (o.y = i - a.bottom * (s / 2)), a.left && (o.x = a.left * (s / 2)), a.right && (o.x = e - a.right * (s / 2)), a.top && (o.y = a.top * (s / 2)), o.scaleX = o.scaleY = s / 2
            }
            this.mainResize()
        }, n.setZoomControlsVisibilty = function(t) {
            this.zoomControlsContainer.visible = t
        }, n.addControls = function() {
            var t = this.createControl("zoom_in"),
                e = this.createControl("zoom_out"),
                i = new createjs.Container;
            i.addChild(this.createControl("left")), i.addChild(this.createControl("right")), i.addChild(this.createControl("forward")), i.addChild(this.createControl("brake")), i.addChild(this.createControl("direction")), i.addChild(this.createControl("last_checkpoint")), i.addChild(this.createControl("replay"));
            var s = new createjs.Container;
            s.addChild(t), s.addChild(e), s.visible = !1, this.lastCheckpointButton = i.getChildByName("last_checkpoint"), this.controlsContainer = i, this.zoomControlsContainer = s, this.stage.addChild(i), this.stage.addChild(s)
        }, n.update = function() {
            var t = this.scene;
            this.lastCheckpointButton.visible = t.playerManager.firstPlayer.hasCheckpoints() ? !0 : !1
        }, e.exports = i
    }, {
        "./controls": 3
    }],
    10: [function(t, e, i) {
        ! function() {
            "use strict";

            function t(t) {
                this.drawAngle = 0, this.colors = t, this.createVersion()
            }
            var s = GameInventoryManager.HeadClass,
                n = Math.max,
                r = {},
                o = 0,
                a = 0,
                h = 2.2,
                l = 1,
                c = 115,
                u = 112,
                p = .17,
                d = t.prototype = new s;
            d.versionName = "", d.dirty = !0, d.getVersions = function() {
                return r
            }, d.cache = function(t) {
                var e = r[this.versionName];
                e.dirty = !1;
                var t = n(t, 1),
                    i = c * t * p,
                    s = u * t * p,
                    h = e.canvas;
                h.width = i, h.height = s, o = h.width / 2, a = h.height / 2;
                var l = h.getContext("2d"),
                    d = p * t,
                    f = this.colors;
                l.save(), l.scale(d, d), l.translate(0, 0), l.beginPath(), l.strokeStyle = "rgba(0,0,0,0)", l.lineCap = "butt", l.lineJoin = "miter", l.miterLimit = 4, l.save(), l.fillStyle = "#ffffff", l.beginPath(), l.arc(42.4, 52.5, 30.3, 0, 6.283185307179586, !0), l.closePath(), l.fill(), l.stroke(), l.restore(), l.save(), l.fillStyle = f.back, l.beginPath(), l.moveTo(71.624, 44.496), l.bezierCurveTo(68.112, 31.647, 56.363, 22.2, 42.4, 22.2), l.bezierCurveTo(25.665999999999997, 22.2, 12.099999999999998, 35.765, 12.099999999999998, 52.5), l.bezierCurveTo(12.099999999999998, 55.771, 12.623999999999999, 58.916, 13.582999999999998, 61.867000000000004), l.lineTo(71.624, 44.496), l.closePath(), l.fill(), l.stroke(), l.restore(), f.front && (l.save(), l.beginPath(), l.moveTo(76.917, 38.393), l.bezierCurveTo(71.677, 25.617, 59.54900000000001, 16.371000000000002, 45.172, 15.309000000000001), l.bezierCurveTo(47.57899999999999, 22.559, 50.918, 33.862, 52.501, 44.894999999999996), l.bezierCurveTo(60.643, 42.731, 68.775, 40.566, 76.917, 38.393), l.closePath(), l.fillStyle = f.front, l.fill(), l.stroke(), l.restore()), l.save(), l.beginPath(), l.moveTo(42.4, 22.2), l.bezierCurveTo(59.134, 22.2, 72.7, 35.765, 72.7, 52.5), l.bezierCurveTo(72.7, 69.235, 59.135, 82.8, 42.4, 82.8), l.bezierCurveTo(25.665, 82.8, 12.1, 69.234, 12.1, 52.5), l.bezierCurveTo(12.1, 35.766000000000005, 25.666, 22.2, 42.4, 22.2), l.moveTo(42.4, 15.2), l.bezierCurveTo(21.833, 15.2, 5.100000000000001, 31.932, 5.100000000000001, 52.5), l.bezierCurveTo(5.100000000000001, 73.068, 21.832, 89.8, 42.4, 89.8), l.bezierCurveTo(62.967999999999996, 89.8, 79.69999999999999, 73.068, 79.69999999999999, 52.5), l.bezierCurveTo(79.69999999999999, 31.932000000000002, 62.968, 15.2, 42.4, 15.2), l.lineTo(42.4, 15.2), l.closePath(), l.fill(), l.stroke(), l.restore(), l.save(), l.beginPath(), l.moveTo(16.3, 66.85), l.bezierCurveTo(41.8, 60.148999999999994, 67.2, 53.449999999999996, 92.601, 46.648999999999994), l.bezierCurveTo(96.201, 45.648999999999994, 99.8, 44.748999999999995, 103.5, 43.748999999999995), l.bezierCurveTo(111, 41.748999999999995, 107.8, 30.148999999999994, 100.3, 32.148999999999994), l.bezierCurveTo(74.901, 38.94899999999999, 49.400999999999996, 45.748999999999995, 24, 52.449), l.bezierCurveTo(20.4, 53.449, 16.8, 54.349, 13.101, 55.349), l.bezierCurveTo(5.7, 57.35, 8.9, 68.85, 16.3, 66.85), l.lineTo(16.3, 66.85), l.closePath(), l.fill(), l.stroke(), l.restore()
            }, d.setDirty = function() {
                r[this.versionName].dirty = !0
            }, d.getBaseWidth = function() {
                return c
            }, d.getBaseHeight = function() {
                return u
            }, d.getDrawOffsetX = function() {
                return h
            }, d.getDrawOffsetY = function() {
                return l
            }, d.getScale = function() {
                return p
            }, GameInventoryManager && GameInventoryManager.register("forward_cap", t), "undefined" != typeof i && ("undefined" != typeof e && e.exports && (i = e.exports = t), i.Forward_Cap = t)
        }()
    }, {}],
    11: [function(t, e) {
        function i() {}
        t("../inventorymanager");
        var s = (Math.atan2, i.prototype);
        s.createVersion = function() {
            var t = this.colors,
                e = this.getVersions(),
                i = "";
            for(var s in t) t.hasOwnProperty(s) && (i += t[s]);
            this.versionName = i, e[i] || (e[i] = {
                dirty: !0,
                canvas: document.createElement("canvas")
            })
        }, s.draw = function(t, e, i, s, n, r) {
            var o = this.getCache(n),
                a = this.getBaseWidth(),
                h = this.getBaseHeight(),
                l = this.getScale(),
                c = this.getDrawOffsetX(),
                u = this.getDrawOffsetY(),
                p = a * n * l,
                d = h * n * l,
                f = c * n - p / 2,
                v = u * n - d / 2,
                g = -1 === r;
            t.translate(e, i), t.rotate(s), g && t.scale(1, -1), t.drawImage(o, f, v, p, d), g && t.scale(1, -1), t.rotate(-s), t.translate(-e, -i)
        }, s.getCache = function(t) {
            var e = this.getVersions();
            return e[this.versionName].dirty && this.cache(t), e[this.versionName].canvas
        }, s.setDirty = function() {
            var t = this.getVersions();
            t[this.versionName].dirty = !0
        }, e.exports = i, GameInventoryManager && (GameInventoryManager.HeadClass = i)
    }, {
        "../inventorymanager": 12
    }],
    12: [function(t, e) {
        function i() {}
        var s = {},
            n = {},
            r = {},
            o = i.prototype;
        o.getItem = function(t) {
            var e = t.classname,
                i = t.script,
                o = t.options,
                a = t.type;
            s[e] || ("1" === a && (e = "forward_cap", o = {
                back: "white"
            }), r[i] || (r[i] = !0, GameManager.loadFile(i)));
            var h = this.generateID(a, e, o);
            return n[h] || (n[h] = new s[e](o)), n[h]
        }, o.redraw = function() {
            for(var t in n) n.hasOwnProperty(t) && n[t].setDirty()
        }, o.generateID = function(t, e, i) {
            var e = t + e;
            if(i)
                for(var s in i) i.hasOwnProperty(s) && (e += i[s]);
            return e
        }, o.register = function(t, e) {
            s[t] = e
        }, o.clear = function() {}, window.GameInventoryManager = new i, e.exports = i
    }, {}],
    13: [function(t, e) {
        function i(t, e, i, a, h) {
            var l = [],
                c = t,
                u = e,
                p = (a - e) / (i - t),
                d = i > t ? 1 : -1,
                f = a > e ? 1 : -1,
                v = 0;
            l.push(t, e);
            do {
                var g = n(c / h) == n(i / h),
                    m = n(u / h) == n(a / h);
                if(g && m) break;
                var y = 0,
                    w = 0;
                y = s(n(c / h + d) * h), 0 > d && (y = s(r((c + 1) / h + d) * h) - 1), w = s(e + (y - t) * p);
                var _ = 0,
                    x = 0;
                x = s(n(u / h + f) * h), 0 > f && (x = s(r((u + 1) / h + f) * h) - 1), _ = s(t + (x - e) / p), o(y - t, 2) + o(w - e, 2) < o(_ - t, 2) + o(x - e, 2) ? (c = y, u = w, l.push(y, w)) : (c = _, u = x, l.push(_, x))
            } while (v++ < 5e3);
            return l
        }
        var s = (t("./cartesian"), Math.round),
            n = Math.floor,
            r = Math.ceil,
            o = Math.pow;
        e.exports = i
    }, {
        "./cartesian": 14
    }],
    14: [function(t, e) {
        function i(t, e) {
            this.x = t, this.y = e
        }
        var s = Math.sqrt,
            n = Math.pow,
            r = (Math.round, Math.atan2),
            o = Math.PI;
        i.prototype = {
            x: 0,
            y: 0,
            toReal: function(t) {
                var e = t.camera,
                    s = t.screen,
                    n = (this.x - s.center.x) / e.zoom + e.position.x,
                    r = (this.y - s.center.y) / e.zoom + e.position.y;
                return new i(n, r)
            },
            toScreen: function(t) {
                var e = t.camera,
                    s = t.screen,
                    n = (this.x - e.position.x) * e.zoom + s.center.x,
                    r = (this.y - e.position.y) * e.zoom + s.center.y;
                return new i(n, r)
            },
            lenSqr: function() {
                return n(this.x, 2) + n(this.y, 2)
            },
            len: function() {
                return s(n(this.x, 2) + n(this.y, 2))
            },
            dot: function(t) {
                return this.x * t.x + this.y * t.y
            },
            factor: function(t) {
                return new i(this.x * t, this.y * t)
            },
            factorSelf: function(t) {
                this.x = this.x * t, this.y = this.y * t
            },
            factorOut: function(t, e) {
                e.x = this.x * t, e.y = this.y * t
            },
            add: function(t) {
                return new i(this.x + t.x, this.y + t.y)
            },
            inc: function(t) {
                this.x += t.x, this.y += t.y
            },
            addOut: function(t, e) {
                e.x = this.x + t.x, e.y = this.y + t.y
            },
            sub: function(t) {
                return new i(this.x - t.x, this.y - t.y)
            },
            subOut: function(t, e) {
                e.x = this.x - t.x, e.y = this.y - t.y
            },
            subSelf: function(t) {
                this.x = this.x - t.x, this.y = this.y - t.y
            },
            equ: function(t) {
                this.x = t.x, this.y = t.y
            },
            normalize: function() {
                var t = s(n(this.x, 2) + n(this.y, 2));
                return new i(this.x / t, this.y / t)
            },
            getAngleInDegrees: function(t) {
                var e = t.sub(this),
                    i = r(e.x, -e.y),
                    s = i * (180 / o);
                return 0 > s && (s += 360), s
            },
            getAngleInRadians: function(t) {
                var e = t.sub(this);
                return r(e.x, -e.y)
            }
        }, e.exports = i
    }, {}],
    15: [function(t, e) {
        function i(t, e, i) {
            function o(t, e, i, s, n, r) {
                f.push(t, e), a(t, e, i, s, n, r, 0), f.push(n, r)
            }

            function a(t, e, i, o, h, l, c) {
                if(!(c > g)) {
                    var u = (t + i) / 2,
                        p = (e + o) / 2,
                        d = (i + h) / 2,
                        _ = (o + l) / 2,
                        x = (u + d) / 2,
                        b = (p + _) / 2,
                        T = h - t,
                        k = l - e,
                        C = s((i - h) * k - (o - l) * T);
                    if(C > m) {
                        if(v * (T * T + k * k) >= C * C) {
                            if(w > y) return void f.push(x, b);
                            var S = s(n(l - o, h - i) - n(o - e, i - t));
                            if(S >= r && (S = 2 * r - S), y > S) return void f.push(x, b)
                        }
                    } else if(T = x - (t + h) / 2, k = b - (e + l) / 2, v >= T * T + k * k) return void f.push(x, b);
                    a(t, e, u, p, x, b, c + 1), a(x, b, d, _, h, l, c + 1)
                }
            }
            var h = t.x,
                l = t.y,
                c = e.x,
                u = e.y,
                p = i.x,
                d = i.y,
                f = [],
                v = .25,
                g = 10,
                m = 1e-30,
                y = 0,
                w = .01;
            return o(h, l, c, u, p, d), f
        }
        var s = Math.abs,
            n = Math.atan2,
            r = Math.PI;
        e.exports = i
    }, {}],
    16: [function(t, e) {
        function i(t) {
            this.game = t, this.assets = t.assets, this.stage = t.stage, this.settings = t.settings, this.sound = new k(this), this.mouse = new s(this), this.mouse.disableContextMenu(), this.message = new C(this), this.camera = new n(this), this.screen = new r(this), this.createTrack(), this.loadingcircle = new y(this), this.playerManager = new o(this), this.vehicleTimer = new a(this), this.score = new w(this), this.createMainPlayer(), this.createControls(), this.registerTools(), this.state = this.setStateDefaults(), this.oldState = this.setStateDefaults(), this.restart(), this.initializeAnalytics(), this.stage.addEventListener("stagemousedown", this.tapToStartOrRestart.bind(this))
        } {
            var s = (t("../math/cartesian"), t("../utils/mousehandler")),
                n = t("../view/camera"),
                r = t("../view/screen"),
                o = t("../vehicles/player_manager"),
                a = t("../utils/vehicletimer"),
                h = t("../tools/toolhandler"),
                l = t("../tools/cameratool"),
                c = t("../tools/curvetool"),
                u = t("../tools/straightlinetool"),
                p = t("../tools/brushtool"),
                d = t("../tools/selecttool"),
                f = t("../tools/erasertool"),
                v = t("../tools/poweruptool"),
                g = t("../tools/vehiclepoweruptool"),
                m = t("../tracks/track"),
                y = (t("../utils/gamepad"), t("../utils/loadingcircle")),
                w = t("../utils/score"),
                _ = t("../controls/tablet"),
                x = t("../controls/phone"),
                b = t("../controls/pause"),
                T = t("../controls/redoundo"),
                k = t("../utils/soundmanager"),
                C = t("../utils/messagemanager"),
                S = Application.Helpers.GoogleAnalyticsHelper;
            Math.round
        }
        i.prototype = {
            game: null,
            assets: null,
            stage: null,
            canvas: null,
            settings: null,
            camera: null,
            screen: null,
            mouse: null,
            track: null,
            player: null,
            players: null,
            ticks: 0,
            state: null,
            oldState: null,
            stateDirty: !0,
            onStateChange: null,
            vehicle: "Mtb",
            showDialog: !1,
            dialogOptions: !1,
            importCode: !1,
            clear: !1,
            redoundoControls: null,
            pauseControls: null,
            inFocus: !0,
            controls: null,
            verified: !1,
            getCanvasOffset: function() {
                var t = {
                    height: 90,
                    width: 0
                };
                return this.settings.isStandalone && (t = {
                    height: 202,
                    width: 0
                }), t
            },
            tapToStartOrRestart: function() {
                if(this.settings.mobile) {
                    var t = this.playerManager.firstPlayer;
                    if(t && t._crashed && !this.state.paused) {
                        var e = t.getGamepad();
                        e.setButtonDown("enter")
                    } else this.play()
                }
            },
            analytics: null,
            initializeAnalytics: function() {
                this.analytics = {
                    deaths: 0,
                    mouseEvents: 0
                }, this.trackAction("editor-open", "open")
            },
            createMainPlayer: function() {
                var t = this.playerManager,
                    e = t.createPlayer(this, this.settings.user),
                    i = e.getGamepad();
                i.setKeyMap(this.settings.editorHotkeys), i.onButtonDown = this.buttonDown.bind(this), i.listen(), this.playerManager.firstPlayer = e, this.playerManager.addPlayer(e)
            },
            createControls: function() {
                "tablet" === this.settings.controls && (this.controls = new _(this), this.controls.hide()), "phone" === this.settings.controls && (this.controls = new x(this), this.controls.hide()), this.redoundoControls = new T(this), this.pauseControls = new b(this)
            },
            createTrack: function() {
                this.track && this.track.close();
                var t = new m(this),
                    e = this.getAvailableTrackCode();
                0 != e ? (t.read(e), this.track = t, this.state.preloading = !1, this.state.loading = !1) : t.addDefaultLine(), this.importCode = !1, this.restartTrack = !0, this.clear = !1, this.track = t
            },
            updateControls: function() {
                if(this.controls) {
                    var t = this.state.paused;
                    this.controls.isVisible() === t && (t || (this.playing = !1, this.camera.focusOnMainPlayer(), this.toolHandler.setTool("camera")), this.controls.setVisibility(!t), this.updateState()), this.controls.update()
                }
                this.pauseControls.update()
            },
            registerTools: function() {
                var t = new h(this);
                t.enableGridUse(), this.toolHandler = t, t.registerTool(l), t.registerTool(c), t.registerTool(u), t.registerTool(p), t.registerTool(d), t.registerTool(f), t.registerTool(v), t.registerTool(g), t.setTool(this.settings.startTool)
            },
            updateToolHandler: function() {
                this.controls && this.controls.isVisible() !== !1 || this.toolHandler.update()
            },
            play: function() {
                this.playing = !0
            },
            update: function() {
                this.updateToolHandler(), this.mouse.update(), this.state.showDialog || (this.updateGamepads(), this.checkGamepads()), this.screen.update(), this.updateControls(), this.camera.update(), this.sound.update(), this.restartTrack && this.restart(), !this.state.paused && this.playing && (this.message.update(), this.updatePlayers(), this.score.update(), this.playerManager.firstPlayer.complete ? this.trackComplete() : this.ticks+=0.5), this.vehicleTimer.update(), (this.importCode || this.clear) && this.createTrack(), this.isStateDirty() && this.updateState(), this.stage.clear(), this.draw(), this.stage.update(), this.camera.updateZoom()
            },
            isStateDirty: function() {
                var t = this.oldState,
                    e = this.state,
                    i = !1;
                for(var s in e) e[s] !== t[s] && (i = !0, this.oldState[s] = e[s]);
                return i
            },
            updateGamepads: function() {
                this.playerManager.updateGamepads()
            },
            checkGamepads: function() {
                this.playerManager.checkKeys()
            },
            stopAudio: function() {
                createjs.Sound.stop()
            },
            restart: function() {
                this.verified = !this.settings.requireTrackVerification, this.track.dirty = !1, this.track.resetPowerups(), this.message.hide(), this.restartTrack = !1, this.playing = !1, this.ticks = 0, this.playerManager.reset(), this.camera.focusOnPlayer(), this.camera.fastforward(), this.score.update()
            },
            buttonDown: function(t) {
                var e = this.camera;
                switch(this.playing = !0, t) {
                    case "up":
                    case "down":
                    case "left":
                    case "right":
                        e.focusOnMainPlayer();
                        break;
                    case "change_camera":
                        e.focusOnNextPlayer();
                        break;
                    case "pause":
                        this.state.paused = !this.state.paused;
                        break;
                    case "settings":
                        this.command("dialog", "settings");
                        break;
                    case "change_vehicle":
                        this.toggleVehicle();
                        break;
                    case "zoom_increase":
                        e.increaseZoom();
                        break;
                    case "zoom_decrease":
                        e.decreaseZoom();
                        break;
                    case "fullscreen":
                        this.toggleFullscreen()
                }
            },
            toggleFullscreen: function() {
                if(this.settings.embedded) {
                    var t = this.settings,
                        e = t.basePlatformUrl + "/t/" + t.track.url;
                    window.open(e)
                } else this.settings.fullscreenAvailable && (this.settings.fullscreen = this.state.fullscreen = !this.settings.fullscreen)
            },
            updatePlayers: function() {
                this.playerManager.update()
            },
            drawPlayers: function() {
                this.playerManager.draw()
            },
            draw: function() {
                this.toolHandler.drawGrid(), this.track.draw(), this.drawPlayers(), this.controls && this.controls.isVisible() !== !1 || this.toolHandler.draw(), this.state.loading && this.loadingcircle.draw(), this.message.draw()
            },
            getAvailableTrackCode: function() {
                var t = this.settings,
                    e = !1;
                return t.importCode && "false" !== t.importCode ? (e = t.importCode, t.importCode = null) : this.importCode && (e = this.importCode, this.importCode = null), e
            },
            redraw: function() {
                this.track.undraw(), GameInventoryManager.redraw(), this.toolHandler.resize()
            },
            resize: function() {
                this.pauseControls.resize(), this.redoundoControls.resize(), this.controls && this.controls.resize()
            },
            updateState: function() {
                null !== this.game.onStateChange && this.game.onStateChange(this.state)
            },
            stateChanged: function() {
                this.updateState()
            },
            setStateDefaults: function() {
                var t = {};
                return t.paused = this.settings.mobile ? !0 : this.settings.startPaused, t.loading = !1, t.playing = this.settings.waitForKeyPress, t.tool = this.toolHandler.currentTool, t.toolOptions = this.toolHandler.getToolOptions(), t.grid = this.toolHandler.options.grid, t.cameraLocked = this.toolHandler.options.cameraLocked, t.zoomPercentage = this.camera.zoomPercentage, t.vehicle = this.vehicle, t.showDialog = !1, t.dialogOptions = !1, t.preloading = !1, t.fullscreen = this.settings.fullscreen, t.inFocus = !0, this.controls && (t.hideMenus = this.controls.isVisible()), t
            },
            toggleVehicle: function() {
                var t = this.track.allowedVehicles,
                    e = t.length,
                    i = this.state.vehicle,
                    s = t.indexOf(i);
                s++, s >= e && (s = 0);
                var i = t[s];
                this.selectVehicle(i)
            },
            selectVehicle: function(t) {
                var e = this.track.allowedVehicles,
                    i = e.indexOf(t); - 1 !== i && (this.settings.track.vehicle = t, this.vehicle = t, this.playerManager.firstPlayer.setBaseVehicle(t), this.restartTrack = !0)
            },
            trackAction: function(t, e) {
                var i = this.toolHandler.analytics.actions,
                    s = this.mouse.analytics.clicks,
                    n = i + s,
                    r = {
                        category: "create",
                        action: t,
                        label: e,
                        value: n,
                        non_interaction: !0
                    };
                S.track_event(r)
            },
            openDialog: function(t) {
                switch(this.state.dialogOptions = {}, t) {
                    case "import":
                        break;
                    case "export":
                        setTimeout(this.getTrackCode.bind(this), 750);
                        break;
                    case "upload":
                        "undefined" == typeof isChromeApp && setTimeout(this.getTrackCode.bind(this), 750)
                }
                this.playing = !1, this.state.showDialog = t
            },
            getTrackCode: function() {
                this.state.dialogOptions = {}, this.state.dialogOptions.verified = this.verified, this.state.dialogOptions.code = this.track.getCode()
            },
            trackComplete: function() {
                this.verified = this.track.dirty ? !1 : !0
            },
            hideControlPlanel: function() {},
            showControlPlanel: function() {},
            command: function() {
                var t = Array.prototype.slice.call(arguments, 0),
                    e = t.shift();
                switch(e) {
                    case "change tool":
                        var i = t[0];
                        this.toolHandler.setTool(i);
                        break;
                    case "change tool option":
                        var s = t[0],
                            n = t[1];
                        "undefined" != typeof t[2] ? this.toolHandler.setToolOption(s, n, t[2]) : this.toolHandler.setToolOption(s, n);
                        break;
                    case "snap":
                        this.toolHandler.toggleSnap();
                        break;
                    case "add track":
                        this.track.read(demo.code), track = null;
                        break;
                    case "redraw":
                        this.redraw();
                        break;
                    case "fullscreen":
                        this.settings.fullscreen = this.state.fullscreen = !this.settings.fullscreen;
                        break;
                    case "grid":
                        this.toolHandler.toggleGrid();
                        break;
                    case "lock camera":
                        this.toolHandler.toggleCameraLock();
                        break;
                    case "toggle vehicle":
                        this.toggleVehicle();
                        break;
                    case "reset zoom":
                        this.camera.resetZoom();
                        break;
                    case "increase zoom":
                        this.camera.increaseZoom();
                        break;
                    case "decrease zoom":
                        this.camera.decreaseZoom();
                        break;
                    case "change lineType":
                        var r = t[0];
                        this.toolHandler.options.lineType = r;
                        break;
                    case "resize":
                        this.resize();
                        break;
                    case "dialog":
                        var o = t[0];
                        o === !1 ? this.listen() : this.unlisten(), this.openDialog(o);
                        break;
                    case "focused":
                        var a = t[0];
                        a === !0 ? (this.state.inFocus = !0, this.state.showDialog === !1 && this.listen()) : (this.state.inFocus = !1, this.unlisten(), this.playing = !1);
                        break;
                    case "clear track":
                        this.trackAction("editor-action", "clear"), this.clear = !0;
                        break;
                    case "import":
                        var h = t[0];
                        h.length <= 0 && (h = !1), this.importCode = h, this.clear = t[1], this.command("dialog", !1)
                }
            },
            listen: function() {
                var t = this.playerManager.firstPlayer,
                    e = t.getGamepad();
                e.listen()
            },
            unlisten: function() {
                var t = this.playerManager.firstPlayer,
                    e = t.getGamepad();
                e.unlisten()
            },
            stopAudio: function() {
                createjs.Sound.stop()
            },
            close: function() {
                this.trackAction("editor-exit", "exit"), this.pauseControls = null, this.mouse.close(), this.mouse = null, this.camera.close(), this.camera = null, this.screen.close(), this.screen = null, this.vehicleTimer.close(), this.vehicleTimer = null, this.playerManager.close(), this.playerManager = null, this.sound.close(), this.sound = null, this.track.close(), this.toolHandler.close(), this.game = null, this.assets = null, this.settings = null, this.stage = null, this.track = null, this.state = null, this.stopAudio()
            }
        }, e.exports = i
    }, {
        "../controls/pause": 5,
        "../controls/phone": 6,
        "../controls/redoundo": 7,
        "../controls/tablet": 9,
        "../math/cartesian": 14,
        "../tools/brushtool": 32,
        "../tools/cameratool": 33,
        "../tools/curvetool": 34,
        "../tools/erasertool": 35,
        "../tools/poweruptool": 36,
        "../tools/selecttool": 45,
        "../tools/straightlinetool": 46,
        "../tools/toolhandler": 48,
        "../tools/vehiclepoweruptool": 49,
        "../tracks/track": 52,
        "../utils/gamepad": 56,
        "../utils/loadingcircle": 57,
        "../utils/messagemanager": 58,
        "../utils/mousehandler": 59,
        "../utils/score": 62,
        "../utils/soundmanager": 64,
        "../utils/vehicletimer": 65,
        "../vehicles/player_manager": 73,
        "../view/camera": 80,
        "../view/screen": 81
    }],
    17: [function(t, e) {
        function i(t) {
            this.game = t, this.assets = t.assets, this.stage = t.stage, this.settings = t.settings, this.sound = new _(this), this.mouse = new s(this), this.initalizeCamera(), this.screen = new l(this), this.createTrack(), this.score = new n(this), this.raceTimes = new o(this), this.message = new x(this), this.settings.isCampaign && (this.campaignScore = new r(this)), this.loadingcircle = new g(this), this.loading = !1, this.ready = !1, this.playerManager = new p(this), this.vehicleTimer = new d(this), this.races = [], this.state = this.setStateDefaults(), this.oldState = this.setStateDefaults(), this.createMainPlayer(), this.createControls(), this.registerTools(), this.setStartingVehicle(), this.restart(), this.initializeAnalytics(), this.stage.addEventListener("stagemousedown", this.tapToStartOrRestart.bind(this))
        }
        var s = (t("../math/cartesian"), t("../utils/mousehandler")),
            n = t("../utils/score"),
            r = t("../utils/campaignscore"),
            o = t("../utils/racetimes"),
            a = Application.Helpers.GoogleAnalyticsHelper,
            h = t("../view/camera"),
            l = t("../view/screen"),
            c = t("../tools/toolhandler"),
            u = t("../tools/cameratool"),
            p = t("../vehicles/player_manager"),
            d = t("../utils/vehicletimer"),
            f = t("../tracks/track"),
            v = (t("../utils/gamepad"), {});
        v.MTB = t("../vehicles/mtb"), v.BMX = t("../vehicles/bmx");
        var g = t("../utils/loadingcircle"),
            m = t("../controls/tablet"),
            y = t("../controls/phone"),
            w = t("../controls/pause"),
            _ = t("../utils/soundmanager"),
            x = t("../utils/messagemanager"),
            b = t("../controls/fullscreen"),
            T = t("../controls/settings"),
            k = Math.round,
            C = t("../../libs/lodash-3.10.1"),
            S = t("../utils/sha256"),
            P = t("../utils/formatnumber");
        i.prototype = {
            game: null,
            assets: null,
            stage: null,
            settings: null,
            camera: null,
            score: null,
            screen: null,
            mouse: null,
            track: null,
            player: null,
            players: null,
            ticks: 0,
            races: null,
            state: null,
            oldState: null,
            stateDirty: !0,
            onStateChange: null,
            playing: !1,
            ready: !1,
            vehicle: "Mtb",
            showDialog: !1,
            importCode: !1,
            preloading: !0,
            loading: !0,
            pauseControls: null,
            fullscreenControls: null,
            settingsControls: null,
            controls: null,
            message: null,
            showSkip: !1,
            getCanvasOffset: function() {
                var t = {
                    height: 0,
                    width: 0
                };
                return t
            },
            tapToStartOrRestart: function() {
                if(this.settings.mobile) {
                    var t = this.playerManager.firstPlayer;
                    if(t && t._crashed && !this.state.paused) {
                        var e = t.getGamepad();
                        e.setButtonDown("enter")
                    } else this.play()
                }
            },
            analytics: null,
            initializeAnalytics: function() {
                this.analytics = {
                    deaths: 0
                }
            },
            createControls: function() {
                "tablet" === this.settings.controls && (this.controls = new m(this), this.controls.hide()), "phone" === this.settings.controls && (this.controls = new y(this), this.controls.hide()), this.pauseControls = new w(this), this.settings.fullscreenAvailable && (this.fullscreenControls = new b(this)), this.settingsControls = new T(this)
            },
            play: function() {
                this.state.playing || (this.state.playing = !0, this.hideControlPlanel())
            },
            buttonDown: function(t) {
                if(!this.state.showDialog) {
                    var e = this.camera;
                    switch(t) {
                        case "change_camera":
                            e.focusOnNextPlayer();
                            break;
                        case "pause":
                            this.state.paused = !this.state.paused;
                            break;
                        case "settings":
                            this.openDialog("settings");
                            break;
                        case "exit_fullscreen":
                            this.exitFullscreen();
                            break;
                        case "change_vehicle":
                            this.toggleVehicle();
                            break;
                        case "zoom_increase":
                            e.increaseZoom();
                            break;
                        case "zoom_decrease":
                            e.decreaseZoom();
                            break;
                        case "fullscreen":
                            this.toggleFullscreen()
                    }
                }
            },
            exitFullscreen: function() {
                this.settings.fullscreenAvailable && (this.settings.fullscreen = this.state.fullscreen = !1, this.trackEvent("game-ui", "game-fullscreen-toggle", "game-out-fullscreen"))
            },
            toggleFullscreen: function() {
                if(this.settings.embedded) {
                    var t = this.settings,
                        e = t.basePlatformUrl + "/t/" + t.track.url;
                    window.open(e)
                } else this.settings.fullscreenAvailable && (this.settings.fullscreen = this.state.fullscreen = !this.settings.fullscreen, this.settings.fullscreen ? this.trackEvent("game-ui", "game-fullscreen-toggle", "game-into-fullscreen") : this.trackEvent("game-ui", "game-fullscreen-toggle", "game-out-fullscreen"))
            },
            trackEvent: function(t, e, i) {
                var s = {
                    category: t,
                    action: e,
                    label: i,
                    value: 0,
                    non_interaction: !0
                };
                a.track_event(s)
            },
            getAvailableTrackCode: function() {
                var t = this.settings,
                    e = !1;
                return t.importCode && "false" !== t.importCode ? (e = t.importCode, t.importCode = null) : this.importCode && (e = this.importCode, this.importCode = null), e
            },
            createMainPlayer: function() {
                var t = this.playerManager,
                    e = t.createPlayer(this, this.settings.user),
                    i = e.getGamepad();
                i.setKeyMap(this.settings.playHotkeys), i.recordKeys(this.settings.keysToRecord), i.onButtonDown = this.buttonDown.bind(this), i.listen(), this.playerManager.firstPlayer = e, this.playerManager.addPlayer(e)
            },
            createTrack: function() {
                this.track && this.track.close();
                var t = new f(this),
                    e = this.getAvailableTrackCode();
                0 != e && (t.read(e), this.track = t, this.setTrackAllowedVehicles(), this.state.preloading = !1, this.loading = !1, this.restartTrack = !0, this.ready = !0), this.track = t
            },
            setTrackAllowedVehicles: function() {
                var t = this.track,
                    e = this.settings.track;
                e && (t.allowedVehicles = e.vehicles)
            },
            initalizeCamera: function() {
                this.camera = new h(this)
            },
            updateControls: function() {
                if(this.controls) {
                    var t = this.state.paused;
                    this.controls.isVisible() === t && (t || (this.state.playing = !1, this.camera.focusOnMainPlayer(), this.toolHandler.setTool("camera")), this.controls.setVisibility(!t), this.controls.setZoomControlsVisibilty(t), this.updateState()), this.controls.update()
                }
                this.pauseControls.update(), this.settings.fullscreenAvailable && this.fullscreenControls.update()
            },
            registerTools: function() {
                var t = new c(this);
                this.toolHandler = t, t.registerTool(u), t.setTool("Camera")
            },
            updateToolHandler: function() {
                this.controls && this.controls.isVisible() !== !1 || this.toolHandler.update()
            },
            update: function() {
                this.ready ? (this.updateToolHandler(), this.mouse.update(), this.state.paused || this.state.showDialog || (this.updateGamepads(), this.checkGamepads()), this.screen.update(), this.updateControls(), this.camera.update(), this.sound.update(), this.restartTrack && this.restart(), !this.state.paused && this.state.playing && (this.message.update(), this.updatePlayers(), this.playerManager.firstPlayer.complete ? this.trackComplete() : this.ticks+=0.5), this.updateScore(), this.vehicleTimer.update(), this.isStateDirty() && this.updateState(), this.stage.clear(), this.draw(), this.stage.update(), this.camera.updateZoom()) : this.importCode && this.createTrack()
            },
            isStateDirty: function() {
                var t = this.oldState,
                    e = this.state,
                    i = !1;
                for(var s in e) e[s] !== t[s] && (i = !0, this.oldState[s] = e[s]);
                return i
            },
            updateScore: function() {
                this.score.update(), this.campaignScore && this.campaignScore.update(), this.raceTimes.update()
            },
            restart: function() {
                this.settings.mobile ? this.message.show("Press Any Button To Start", 1, "#333333") : this.message.show("Press Any Key To Start", 1, "#333333", "#FFFFFF"), this.track.resetPowerups(), this.restartTrack = !1, this.state.paused = !1, this.state.playing = !this.settings.waitForKeyPress, this.ticks = 0, this.playerManager.reset(), this.playerManager.getPlayerCount() > 0 && (this.camera.focusIndex = 1), this.camera.focusOnPlayer(), this.camera.fastforward(), this.showControlPlanel("main")
            },
            listen: function() {
                var t = this.playerManager.firstPlayer,
                    e = t.getGamepad();
                e.listen()
            },
            unlisten: function() {
                var t = this.playerManager.firstPlayer,
                    e = t.getGamepad();
                e.unlisten()
            },
            stopAudio: function() {
                createjs.Sound.stop()
            },
            setStartingVehicle: function() {
                var t = this.settings,
                    e = t.startVehicle;
                t.track && (e = t.track.vehicle), this.vehicle = e
            },
            updateGamepads: function() {
                this.playerManager.updateGamepads()
            },
            checkGamepads: function() {
                this.playerManager.checkKeys()
            },
            updatePlayers: function() {
                this.playerManager.update()
            },
            drawPlayers: function() {
                this.playerManager.draw()
            },
            hideControlPlanel: function() {
                this.state.showSkip && (this.state.showSkip = !1), this.state.showControls !== !1 && (this.state.showControls = !1)
            },
            showControlPlanel: function(t) {
                this.settings.isCampaign && !this.settings.mobile && this.settings.campaignData.can_skip && this.analytics && this.analytics.deaths > 5 && (this.state.showSkip = !0), this.stateshowControls !== t && this.settings.showHelpControls && (this.state.showControls = t)
            },
            draw: function() {
                this.toolHandler.drawGrid(), this.track.draw(), this.drawPlayers(), this.controls && this.controls.isVisible() !== !1 || this.toolHandler.draw(), this.loading && this.loadingcircle.draw(), this.message.draw()
            },
            redraw: function() {
                this.track.undraw(), GameInventoryManager.redraw(), this.toolHandler.resize()
            },
            resize: function() {
                this.pauseControls.resize(), this.settings.fullscreenAvailable && this.fullscreenControls.resize(), this.settingsControls.resize(), this.controls && this.controls.resize()
            },
            updateState: function() {
                null !== this.game.onStateChange && this.game.onStateChange(this.state)
            },
            stateChanged: function() {
                this.updateState()
            },
            setStateDefaults: function() {
                var t = {};
                return t.playing = !this.settings.waitForKeyPress, t.paused = !1, t.playerAlive = !0, t.inFocus = !0, t.preloading = !0, t.fullscreen = this.settings.fullscreen, t.showControls = !1, t.showSkip = !1, t.showDialog = !1, t.dialogOptions = !1, t
            },
            toggleVehicle: function() {
                var t = this.track.allowedVehicles,
                    e = t.length,
                    i = this.vehicle,
                    s = t.indexOf(i);
                s++, s >= e && (s = 0);
                var i = t[s];
                this.selectVehicle(i)
            },
            selectVehicle: function(t) {
                var e = this.track.allowedVehicles,
                    i = e.indexOf(t); - 1 !== i && (this.settings.track.vehicle = t, this.vehicle = t, this.playerManager.firstPlayer.setBaseVehicle(t), this.restartTrack = !0)
            },
            openDialog: function(t) {
                this.state.playing = !1, this.state.showDialog = t
            },
            command: function() {
                var t = Array.prototype.slice.call(arguments, 0),
                    e = t.shift();
                switch(e) {
                    case "resize":
                        this.resize();
                        break;
                    case "dialog":
                        var i = t[0];
                        i === !1 ? this.listen() : this.unlisten(), this.openDialog(i);
                        break;
                    case "focused":
                        var s = t[0];
                        s === !0 ? (this.state.inFocus = !0, this.state.showDialog === !1 && this.listen()) : (this.state.inFocus = !1, this.unlisten(), this.state.playing = !1);
                        break;
                    case "add track":
                        var n = t[0];
                        this.importCode = n.code;
                        break;
                    case "clear race":
                        this.races = [], this.restartTrack = !0, this.raceTimes.clear();
                        break;
                    case "add race":
                        var r = t[0],
                            o = t[1];
                        this.addRaces(r), o && (this.state.dialogOptions = {
                            races: this.races
                        }, this.command("dialog", "race_dialog"));
                        break;
                    case "change vehicle":
                        var a = t[0];
                        this.selectVehicle(a);
                        break;
                    case "restart":
                        this.command("dialog", !1), this.restartTrack = !0;
                        break;
                    case "resume":
                        this.state.paused = !1;
                        break;
                    case "fullscreen":
                        this.toggleFullscreen();
                        break;
                    case "exit_fullscreen":
                        this.exitFullscreen()
                }
            },
            addRaces: function(t) {
                this.mergeRaces(t), this.sortRaces(), this.formatRaces(), this.addRaceTimes(), this.addPlayers(), this.restartTrack = !0
            },
            addRaceTimes: function() {
                var t = this.settings.raceColors,
                    e = t.length,
                    i = this.races,
                    s = this.raceTimes;
                s.clear();
                for(var n in i) {
                    var r = i[n];
                    r.user.color = t[n % e], s.addRace(r, n)
                }
            },
            addPlayers: function() {
                var t = this.races,
                    e = this.playerManager;
                e.clear();
                var i = this.settings.keysToRecord;
                for(var s in t) {
                    var n = t[s],
                        r = n.user,
                        o = n.race,
                        a = o.code;
                    "string" == typeof a && (a = JSON.parse(a));
                    var h = e.createPlayer(this, r);
                    h.setBaseVehicle(o.vehicle), h.setAsGhost();
                    var l = h.getGamepad();
                    l.loadPlayback(a, i), e.addPlayer(h)
                }
            },
            formatRaces: function() {
                var t = this.races;
                for(var e in t) {
                    var i = t[e].race,
                        s = i.code;
                    if("string" == typeof s) {
                        s = JSON.parse(s);
                        for(var n in s) {
                            var r = s[n],
                                o = C.countBy(r, C.identity);
                            s[n] = o
                        }
                        i.code = s
                    }
                }
            },
            removeDuplicateRaces: function() {
                var t = C.uniq(this.races, this.uniqesByUserIdIterator.bind(this));
                this.races = t
            },
            uniqesByUserIdIterator: function(t) {
                var e = t.user;
                return e.u_id
            },
            sortRaces: function() {
                var t = C.sortBy(this.races, this.sortByRunTicksIterator.bind(this));
                this.races = t
            },
            mergeRaces: function(t) {
                var e = this.races;
                C.each(t, function(t) {
                    var i = C.find(e, function(e) {
                        return e.user.u_id === t.user.u_id
                    });
                    i ? C.extend(i, t) : e.push(t)
                })
            },
            sortByRunTicksIterator: function(t) {
                var e = this.settings,
                    i = parseInt(t.race.run_ticks),
                    s = P(i / e.drawFPS * 1e3);
                return t.runTime = s, i
            },
            verifyComplete: function() {
                var t = this.playerManager.firstPlayer,
                    e = t._powerupsConsumed.targets,
                    i = this.track.targets,
                    s = !0;
                for(var n in i) {
                    var r = i[n],
                        o = r.id; - 1 === e.indexOf(o) && (s = !1)
                }
                return s
            },
            trackComplete: function() {
                if(this.verifyComplete()) {
                    this.sound.play("victory_sound");
                    var t = this.playerManager;
                    t.mutePlayers();
                    var e = t.firstPlayer,
                        i = e.getGamepad(),
                        s = i.getReplayString(),
                        n = this.settings,
                        r = this.ticks,
                        o = P(r / n.drawFPS * 1e3),
                        a = $("#track-data").data("t_id"),
                        h = {
                            t_id: a,
                            u_id: n.user.u_id,
                            code: s,
                            vehicle: e._baseVehicleType,
                            run_ticks: r,
                            fps: 25,
                            time: o
                        },
                        l = h.t_id + "|" + h.u_id + "|" + h.code + "|" + h.run_ticks + "|" + h.vehicle + "|" + h.fps + "|erxrHHcksIHHksktt8933XhwlstTekz",
                        c = S.SHA256(l).toString();
                    h.sig = c;
                    var u = this.races,
                        p = u.length,
                        d = [];
                    if(p > 0) {
                        for(var f = 0; p > f; f++) d.push(u[f].user.u_id);
                        h.races = d
                    }
                    n.isCampaign && (h.is_campaign = !0), this.state.dialogOptions = {
                        postData: h,
                        analytics: this.analytics
                    }, n.isCampaign ? this.command("dialog", "campaign_complete") : this.command("dialog", "track_complete"), i.reset(!0), this.listen()
                }
            },
            drawFPS: function() {
                var t = createjs.Ticker.getMeasuredFPS(),
                    e = this.game.pixelRatio,
                    i = this.game.canvas.getContext("2d"),
                    s = 5,
                    n = this.screen.height - 12 * e,
                    r = k(10 * t) / 10,
                    o = "FPS : " + r;
                i.save(), i.fillStyle = "#000000", i.font = 8 * e + "pt arial", i.fillText(o, s * e, n), i.restore()
            },
            close: function() {
                this.fullscreenControls = null, this.settingsControls = null, this.pauseControls = null, this.raceTimes = null, this.score = null, this.campaignScore = null, this.mouse.close(), this.mouse = null, this.camera.close(), this.camera = null, this.screen.close(), this.screen = null, this.vehicleTimer.close(), this.vehicleTimer = null, this.playerManager.close(), this.playerManager = null, this.sound.close(), this.sound = null, this.track.close(), this.toolHandler.close(), this.game = null, this.assets = null, this.settings = null, this.stage = null, this.track = null, this.state = null, this.stopAudio()
            }
        }, e.exports = i
    }, {
        "../../libs/lodash-3.10.1": 83,
        "../controls/fullscreen": 4,
        "../controls/pause": 5,
        "../controls/phone": 6,
        "../controls/settings": 8,
        "../controls/tablet": 9,
        "../math/cartesian": 14,
        "../tools/cameratool": 33,
        "../tools/toolhandler": 48,
        "../tracks/track": 52,
        "../utils/campaignscore": 53,
        "../utils/formatnumber": 55,
        "../utils/gamepad": 56,
        "../utils/loadingcircle": 57,
        "../utils/messagemanager": 58,
        "../utils/mousehandler": 59,
        "../utils/racetimes": 61,
        "../utils/score": 62,
        "../utils/sha256": 63,
        "../utils/soundmanager": 64,
        "../utils/vehicletimer": 65,
        "../vehicles/bmx": 66,
        "../vehicles/mtb": 71,
        "../vehicles/player_manager": 73,
        "../view/camera": 80,
        "../view/screen": 81
    }],
    18: [function(t, e) {
        function i(t, e, i, n) {
            var r = new s(t, e),
                o = new s(i, n),
                a = o.sub(r);
            this.p1 = r, this.p2 = o, this.pp = a, this.len = a.len(), this.sectors = [], this.collided = !1, this.remove = !1, this.highlight = !1, this.recorded = !1
        }
        var s = t("../math/cartesian"),
            n = Math.sqrt,
            r = Math.pow,
            o = (Math.round, Math.floor);
        i.prototype = {
            sectors: null,
            p1: null,
            p2: null,
            pp: null,
            len: 0,
            collided: !1,
            remove: !1,
            highlight: !1,
            recorded: !1,
            getCode: function(t) {
                this.recorded = !0;
                var e = this.p2,
                    i = " " + e.x.toString(32) + " " + e.y.toString(32),
                    s = this.checkForConnectedLine(t, e);
                return s && (i += s.getCode(t)), i
            },
            checkForConnectedLine: function(t, e) {
                var i = t.settings.physicsSectorSize,
                    s = t.sectors.physicsSectors,
                    n = o(e.x / i),
                    r = o(e.y / i);
                return s[n][r].searchForLine("physicsLines", e)
            },
            addSectorReference: function(t) {
                this.sectors.push(t)
            },
            removeAllReferences: function() {
                this.remove = !0;
                for(var t = this.sectors, e = t.length, i = 0; e > i; i++) t[i].drawn = !1, t[i].dirty = !0;
                this.sectors = []
            },
            erase: function(t, e) {
                var i = !1;
                if(!this.remove) {
                    var s = this.p1,
                        r = this.p2,
                        o = t,
                        a = e,
                        h = r.sub(s),
                        l = s.sub(o),
                        c = h.dot(h),
                        u = 2 * l.dot(h),
                        p = l.dot(l) - a * a,
                        d = u * u - 4 * c * p;
                    if(d > 0) {
                        d = n(d);
                        var f = (-u - d) / (2 * c),
                            v = (-u + d) / (2 * c);
                        f >= 0 && 1 >= f && (i = !0, this.removeAllReferences()), v >= 0 && 1 >= v && (i = !0, this.removeAllReferences())
                    }
                    this.intersects(this.p1.x, this.p1.y, t.x, t.y, e) ? (i = !0, this.removeAllReferences()) : this.intersects(this.p2.x, this.p2.y, t.x, t.y, e) && (i = !0, this.removeAllReferences())
                }
                return i
            },
            intersects: function(t, e, i, s, n) {
                var r = t - i,
                    o = e - s;
                return n * n >= r * r + o * o
            },
            collide: function(t) {
                if(!this.collided) {
                    this.collided = !0;
                    var e = t.pos,
                        i = t.vel,
                        s = t.radius,
                        o = 0,
                        a = 0,
                        h = 0,
                        l = this.p1,
                        c = this.p2,
                        u = e.x - l.x,
                        p = e.y - l.y,
                        d = this.pp,
                        f = this.len,
                        v = (u * d.x + p * d.y) / f / f;
                    if(v >= 0 && 1 >= v) {
                        var g = (u * d.y - p * d.x) * ((u - i.x) * d.y - (p - i.y) * d.x) < 0 ? -1 : 1,
                            o = u - d.x * v,
                            a = p - d.y * v;
                        if(h = n(r(o, 2) + r(a, 2)), 0 === h && (h = 1), s > h || 0 > g) {
                            var m = (s * g - h) / h;
                            return e.x += o * m, e.y += a * m, void t.drive(-a / h, o / h)
                        }
                    }
                    if(!(-s > v * f || v * f > f + s)) {
                        var y = v > 0 ? c : l;
                        if(o = e.x - y.x, a = e.y - y.y, h = n(r(o, 2) + r(a, 2)), 0 === h && (h = 1), s > h) {
                            var m = (s - h) / h;
                            return e.x += o * m, e.y += a * m, void t.drive(-a / h, o / h)
                        }
                    }
                }
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    19: [function(t, e) {
        function i() {}
        var s = (t("../math/cartesian"), Math.PI, Math.sqrt),
            n = Math.pow,
            r = i.prototype;
        r.init = function(t) {
            this.game = t.scene.game, this.scene = t.scene, this.settings = this.game.settings, this.remove = !1
        }, r.scene = null, r.angle = 0, r.x = 0, r.y = 0, r.name = null, r.sector = null, r.settings = null, r.remove = !1, r.getCode = function() {}, r.draw = function() {}, r.erase = function(t, e) {
            var i = !1;
            if(!this.remove) {
                var r = s(n(t.x - this.x, 2) + n(t.y - this.y, 2));
                e >= r && (i = [this], this.removeAllReferences())
            }
            return i
        }, r.removeAllReferences = function() {
            this.remove = !0, this.sector && (this.sector.powerupCanvasDrawn = !1, this.sector.dirty = !0, this.sector = null), this.scene.track.cleanPowerups()
        }, r.collide = function(t) {
            var e = t.pos.x - this.x,
                i = t.pos.y - this.y,
                r = s(n(e, 2) + n(i, 2));
            !this.hit && 26 > r && (this.hit = !0, this.sector.powerupCanvasDrawn = !1)
        }, r.addSectorReference = function(t) {
            this.sector = t
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    20: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.init(i)
        }
        var s = t("../powerup"),
            n = (Math.max, Math.sqrt, Math.pow),
            r = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 25,
                height: 25
            },
            o = i.prototype = new s;
        o.x = 0, o.y = 0, o.name = "antigravity", o.getCode = function() {
            return "A " + this.x.toString(32) + " " + this.y.toString(32)
        }, o.recache = function(t) {
            r.dirty = !1;
            var e = r.canvas;
            e.width = r.width * t, e.height = r.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawPowerup(s, n, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, o.setDirty = function(t) {
            r.dirty = t
        }, o.draw = function(t, e, i, s) {
            r.dirty && this.recache(i);
            var n = r.width * i,
                o = r.height * i,
                a = n / 2,
                h = o / 2,
                l = t,
                c = e;
            s.translate(l, c), s.drawImage(r.canvas, -a, -h, n, o), s.translate(-l, -c)
        }, o.drawPowerup = function(t, e, i, s) {
            i *= .5, s.save(), s.beginPath(), s.scale(i, i), s.moveTo(0, 0), s.lineTo(50, 0), s.lineTo(50, 50), s.lineTo(0, 50), s.closePath(), s.clip(), s.translate(0, 0), s.translate(0, 0), s.scale(1, 1), s.translate(0, 0), s.strokeStyle = "rgba(0,0,0,0)", s.lineCap = "butt", s.lineJoin = "miter", s.miterLimit = 4, s.save(), s.restore(), s.save(), s.restore(), s.save(), s.fillStyle = "rgba(0, 0, 0, 0)", s.strokeStyle = "rgba(0, 0, 0, 0)", s.lineWidth = 1, s.translate(-726, -131), s.save(), s.translate(726, 131), s.save(), s.fillStyle = "#08faf3", s.strokeStyle = "#000000", s.lineWidth = 2, s.beginPath(), s.moveTo(25, 36), s.bezierCurveTo(18.9251591, 36, 14, 31.0751824, 14, 25), s.bezierCurveTo(14, 18.9248176, 18.9251591, 14, 25, 14), s.bezierCurveTo(31.0751824, 14, 36, 18.9248176, 36, 25), s.bezierCurveTo(36, 31.0751824, 31.0751824, 36, 25, 36), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(25, 35), s.bezierCurveTo(30.5228976, 35, 35, 30.5228976, 35, 25), s.bezierCurveTo(35, 19.4771024, 30.5228976, 15, 25, 15), s.bezierCurveTo(19.4773211, 15, 15, 19.4772251, 15, 25), s.bezierCurveTo(15, 30.5227749, 19.4773211, 35, 25, 35), s.closePath(), s.moveTo(25, 37), s.bezierCurveTo(18.3727612, 37, 13, 31.627354, 13, 25), s.bezierCurveTo(13, 18.372646, 18.3727612, 13, 25, 13), s.bezierCurveTo(31.6274671, 13, 37, 18.3725329, 37, 25), s.bezierCurveTo(37, 31.6274671, 31.6274671, 37, 25, 37), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(1.0370609, 29.702878), s.lineTo(.571767448, 27.3196417), s.lineTo(10.8190136, 27.3196417), s.lineTo(11.2235626, 28.7886215), s.bezierCurveTo(12.5553335, 33.6244869, 16.3752072, 37.4442862, 21.2110994, 38.7761385), s.lineTo(22.6800518, 39.1807024), s.lineTo(22.6800518, 49.4279421), s.lineTo(20.2968028, 48.9626301), s.bezierCurveTo(10.5816525, 47.0658182, 2.93381735, 39.4180779, 1.0370609, 29.702878), s.closePath(), s.moveTo(48.9629391, 20.297122), s.lineTo(49.4282326, 22.6803583), s.lineTo(39.1809639, 22.6803583), s.lineTo(38.7764299, 21.2113511), s.bezierCurveTo(37.4446547, 16.3752014, 33.624798, 12.5554192, 28.7886215, 11.2235626), s.lineTo(27.3196417, 10.8190136), s.lineTo(27.3196417, .571783441), s.lineTo(29.7028653, 1.03705842), s.bezierCurveTo(39.418382, 2.93381152, 47.0661305, 10.5816549, 48.9629391, 20.297122), s.closePath(), s.moveTo(11.2235701, 21.2113511), s.lineTo(10.8190361, 22.6803583), s.lineTo(.571767448, 22.6803583), s.lineTo(1.0370609, 20.297122), s.bezierCurveTo(2.93380373, 10.5819918, 10.5815702, 2.93422536, 20.2967378, 1.03707606), s.lineTo(22.6800518, .571669532), s.lineTo(22.6800518, 10.8189911), s.lineTo(21.2110994, 11.223555), s.bezierCurveTo(16.3751604, 12.5554202, 12.5553324, 16.3752482, 11.2235701, 21.2113511), s.closePath(), s.moveTo(29.7028653, 48.9626351), s.lineTo(27.3196417, 49.4279101), s.lineTo(27.3196417, 39.1806799), s.lineTo(28.7886215, 38.7761309), s.bezierCurveTo(33.6247513, 37.4442873, 37.4446537, 33.6245336, 38.7764374, 28.7886215), s.lineTo(39.1809864, 27.3196417), s.lineTo(49.4282326, 27.3196417), s.lineTo(48.9629391, 29.702878), s.bezierCurveTo(47.0661446, 39.4182726, 39.4184545, 47.0658678, 29.7028653, 48.9626351), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#08faf3", s.beginPath(), s.moveTo(3, 29.3196417), s.bezierCurveTo(4.74079001, 38.2359804, 11.7640196, 45.2589035, 20.6800518, 46.9996935), s.lineTo(20.6800518, 40.7043471), s.bezierCurveTo(15.1649961, 39.1854465, 10.814247, 34.8350039, 9.29534642, 29.3196417), s.lineTo(3, 29.3196417), s.closePath(), s.moveTo(47, 20.6803583), s.bezierCurveTo(45.25921, 11.7640196, 38.2362869, 4.74079001, 29.3196417, 3), s.lineTo(29.3196417, 9.29534642), s.bezierCurveTo(34.8350039, 10.814247, 39.185753, 15.1646897, 40.7046536, 20.6803583), s.lineTo(47, 20.6803583), s.closePath(), s.moveTo(9.29534642, 20.6803583), s.bezierCurveTo(10.814247, 15.1646897, 15.1649961, 10.814247, 20.6800518, 9.29534642), s.lineTo(20.6800518, 3), s.bezierCurveTo(11.7640196, 4.74109649, 4.74079001, 11.7640196, 3, 20.6803583), s.lineTo(9.29534642, 20.6803583), s.closePath(), s.moveTo(29.3196417, 46.9996935), s.bezierCurveTo(38.2362869, 45.2589035, 45.25921, 38.2359804, 47, 29.3196417), s.lineTo(40.7046536, 29.3196417), s.bezierCurveTo(39.185753, 34.8350039, 34.8350039, 39.1854465, 29.3196417, 40.7043471), s.lineTo(29.3196417, 46.9996935), s.closePath(), s.fill(), s.stroke(), s.restore(), s.restore(), s.restore(), s.restore()
        }, o.collide = function(t) {
            {
                var e = t.parent,
                    i = e.player,
                    s = t.pos.x - this.x,
                    r = t.pos.y - this.y,
                    o = n(s, 2) + n(r, 2),
                    a = e.masses;
                a.length
            }
            1e3 > o && i.isAlive() && (i.isGhost() === !1 && ((0 != e.gravity.x || 0 != e.gravity.y) && this.scene.sound.play("antigravity_sound", .3), this.scene.message.show("Antigravity Engaged", 50, "#08faf3")), e.gravity.x = 0, e.gravity.y = 0)
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    21: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.init(i), this.hit = !1
        }
        var s = t("../powerup"),
            n = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 26,
                height: 26
            },
            r = (Math.random, Math.pow),
            o = Math.sqrt,
            a = (Math.cos, Math.sin, i.prototype = new s);
        a.x = 0, a.y = 0, a.name = "bomb", a.getCode = function() {
            return "O " + this.x.toString(32) + " " + this.y.toString(32)
        }, a.recache = function(t) {
            n.dirty = !1;
            var e = n.canvas;
            e.width = n.width * t, e.height = n.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                r = e.height / 2;
            this.drawCircle(s, r, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, a.setDirty = function(t) {
            n.dirty = t
        }, a.draw = function(t, e, i, s) {
            if(!this.hit) {
                n.dirty && this.recache(i);
                var r = n.width * i,
                    o = n.height * i,
                    a = r / 2,
                    h = o / 2;
                s.drawImage(n.canvas, t - a, e - h, r, o)
            }
        }, a.drawCircle = function(t, e, i, s) {
            i *= .2, s.fillStyle = "#000", s.strokeStyle = "#000", s.lineWidth = 8 * i, s.beginPath(), s.moveTo(53 * i, 105 * i), s.lineTo(41.5 * i, 115 * i), s.lineTo(43 * i, 100 * i), s.bezierCurveTo(35.5 * i, 95 * i, 30 * i, 88.5 * i, 26.5 * i, 80 * i), s.lineTo(11 * i, 78 * i), s.lineTo(24 * i, 69.5 * i), s.bezierCurveTo(24 * i, 68 * i, 24 * i, 67 * i, 24 * i, 66 * i), s.bezierCurveTo(24 * i, 58.5 * i, 26 * i, 51 * i, 30 * i, 45 * i), s.lineTo(22 * i, 31.5 * i), s.lineTo(37.5 * i, 36 * i), s.bezierCurveTo(43.5 * i, 31 * i, 51 * i, 27.5 * i, 60 * i, 26 * i), s.lineTo(66 * i, 11 * i), s.lineTo(72 * i, 26.5 * i), s.bezierCurveTo(80.5 * i, 27.5 * i, 88 * i, 31 * i, 93.5 * i, 36.5 * i), s.lineTo(110 * i, 31.5 * i), s.lineTo(101.5 * i, 46 * i), s.bezierCurveTo(105 * i, 52 * i, 107 * i, 59 * i, 107 * i, 66 * i), s.bezierCurveTo(107 * i, 67 * i, 107 * i, 68 * i, 107 * i, 69 * i), s.lineTo(121 * i, 78 * i), s.lineTo(104.5 * i, 80.5 * i), s.bezierCurveTo(101.5 * i, 88 * i, 96 * i, 95 * i, 89 * i, 99.5 * i), s.lineTo(90.5 * i, 115 * i), s.lineTo(78.5 * i, 104.5 * i), s.bezierCurveTo(74.5 * i, 106 * i, 70 * i, 107 * i, 65.5 * i, 107 * i), s.bezierCurveTo(61 * i, 107 * i, 57 * i, 106 * i, 53 * i, 105 * i), s.lineTo(53 * i, 105 * i), s.closePath(), s.fill(), s.stroke(), s.beginPath(), s.arc(66 * i, 66 * i, 40 * i, 0 * i, 2 * Math.PI, !0), s.lineWidth = 2 * i, s.fillStyle = "#d12929", s.fill(), s.stroke(), s.beginPath(), s.arc(66 * i, 66 * i, 8 * i, 0 * i, 2 * Math.PI, !0), s.lineWidth = 2 * i, s.fillStyle = "#000", s.fill(), s.stroke()
        }, a.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                n = t.pos.y - this.y,
                a = o(r(s, 2) + r(n, 2));
            20 > a && i.isAlive() && (e.explode(), i.isGhost() === !1 && (this.hit = !0, this.sector.powerupCanvasDrawn = !1))
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    22: [function(t, e) {
        function i(t, e, i, s) {
            this.x = t, this.y = e, this.angle = i, this.realAngle = i;
            var n = (i - 180) / 360 * 2 * Math.PI;
            this.directionX = (-Math.sin(n)).toFixed(15) / 1, this.directionY = Math.cos(n).toFixed(15) / 1, this.init(s)
        }
        var s = t("../powerup"),
            n = (Math.max, Math.sqrt, Math.pow),
            r = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 24,
                height: 16
            },
            o = i.prototype = new s;
        o.x = 0, o.y = 0, o.name = "boost", o.angle = 0, o.realAngle = 0, o.directionX = 0, o.directionY = 0, o.getCode = function() {
            return "B " + this.x.toString(32) + " " + this.y.toString(32) + " " + this.realAngle.toString(32)
        }, o.recache = function(t) {
            r.dirty = !1;
            var e = r.canvas;
            e.width = r.width * t, e.height = r.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawCircle(s, n, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, o.setDirty = function(t) {
            r.dirty = t
        }, o.draw = function(t, e, i, s) {
            r.dirty && this.recache(i);
            var n = r.width * i,
                o = r.height * i,
                a = n / 2,
                h = o / 2,
                l = t,
                c = e,
                u = (this.angle - 90) * (Math.PI / 180);
            s.translate(l, c), s.rotate(u), s.drawImage(r.canvas, -a, -h, n, o), s.rotate(-u), s.translate(-l, -c)
        }, o.drawCircle = function(t, e, i, s) {
            s.save(), s.strokeStyle = "rgba(0,0,0,0)", s.lineCap = "round", s.fillStyle = "#8ac832", s.strokeStyle = "#000000", i *= .2, s.lineWidth = Math.max(8 * i, 1), s.beginPath(), s.moveTo(0 * i, 0 * i), s.lineTo(118 * i, 0 * i), s.lineTo(118 * i, 81 * i), s.lineTo(0 * i, 81 * i), s.closePath(), s.beginPath(), s.moveTo(3 * i, 1.5 * i), s.lineTo(35 * i, 1.7 * i), s.lineTo(66 * i, 40 * i), s.lineTo(34 * i, 78 * i), s.lineTo(4 * i, 78 * i), s.lineTo(36 * i, 39 * i), s.lineTo(3 * i, 1.5 * i), s.closePath(), s.moveTo(53 * i, 1.5 * i), s.lineTo(85 * i, 1.7 * i), s.lineTo(116 * i, 40 * i), s.lineTo(84 * i, 78 * i), s.lineTo(54 * i, 78 * i), s.lineTo(85 * i, 39 * i), s.lineTo(53 * i, 1.5 * i), s.closePath(), s.fill(), s.stroke()
        }, o.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                r = t.pos.y - this.y,
                o = n(s, 2) + n(r, 2),
                a = e.masses,
                h = a.length,
                l = this.directionX,
                c = this.directionY;
            if(1e3 > o && i.isAlive()) {
                for(var u = h - 1; u >= 0; u--) {
                    var p = a[u].pos;
                    p.x += l, p.y += c
                }
                i.isGhost() === !1 && (this.scene.sound.play("boost_sound"), this.scene.message.show("Boost Engaged", 50, "#8ac832"))
            }
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    23: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.id = o().toString(36).substr(2), this.init(i)
        }
        var s = t("../powerup"),
            n = Math.sqrt,
            r = Math.pow,
            o = Math.random,
            a = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 20,
                height: 32
            },
            h = i.prototype = new s;
        h.x = 0, h.y = 0, h.name = "checkpoint", h.getCode = function() {
            return "C " + this.x.toString(32) + " " + this.y.toString(32)
        }, h.recache = function(t) {
            a.dirty = !1;
            var e = a.canvas;
            e.width = a.width * t, e.height = a.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawCircle(s, n, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, h.setDirty = function(t) {
            a.dirty = t
        }, h.draw = function(t, e, i, s) {
            a.dirty && this.recache(i);
            var n = a.width * i,
                r = a.height * i,
                o = n / 2,
                h = r / 2;
            s.save(), this.hit && (s.globalAlpha = .3), s.drawImage(a.canvas, t - o, e - h, n, r), s.restore()
        }, h.drawCircle = function(t, e, i, s) {
            i *= .15, s.save(), s.translate(1, 1), s.beginPath(), s.moveTo(0 * i, 0 * i), s.lineTo(112 * i, 0 * i), s.lineTo(112 * i, 95 * i), s.lineTo(0 * i, 95 * i), s.closePath(), s.fillStyle = "#826cdc", s.strokeStyle = "#000000", s.lineWidth = 8 * i, s.beginPath(), s.moveTo(3 * i, 10 * i), s.bezierCurveTo(3 * i, 10 * i, 33.5 * i, 27 * i, 55 * i, 10 * i), s.bezierCurveTo(76 * i, -6 * i, 108 * i, 10 * i, 108 * i, 10 * i), s.lineTo(109 * i, 86 * i), s.bezierCurveTo(109 * i, 86 * i, 74 * i, 73.5 * i, 56.5 * i, 86 * i), s.bezierCurveTo(40 * i, 98 * i, 3 * i, 88.5 * i, 3 * i, 88.5 * i), s.lineTo(3 * i, 10 * i), s.closePath(), s.fill(), s.stroke(), s.beginPath(), s.lineWidth = 15 * i, s.moveTo(3 * i, 10 * i), s.lineTo(3 * i, 180 * i), s.stroke(), s.restore()
        }, h.collide = function(t) {
            {
                var e = t.parent,
                    i = e.player,
                    s = t.pos.x - this.x,
                    o = t.pos.y - this.y,
                    a = n(r(s, 2) + r(o, 2)),
                    h = i._powerupsConsumed.checkpoints;
                this.scene
            }
            26 > a && i.isAlive() && -1 === h.indexOf(this.id) && (h.push(this.id), i.setCheckpointOnUpdate(), i.isGhost() === !1 && (this.hit = !0, this.sector.powerupCanvasDrawn = !1, this.scene.message.show("Checkpoint Saved", 50, "#826cdc", "#FFFFFF"), this.scene.sound.play("checkpoint_sound")))
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    24: [function(t, e) {
        function i(t, e, i, s) {
            this.x = t, this.y = e, this.angle = i - 180, this.realAngle = i;
            var n = this.angle / 360 * 2 * Math.PI;
            this.directionX = (-.3 * Math.sin(n)).toFixed(15) / 1, this.directionY = (.3 * Math.cos(n)).toFixed(15) / 1, this.init(s)
        }
        var s = t("../powerup"),
            n = (Math.max, Math.sqrt, Math.pow),
            r = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 20,
                height: 20
            },
            o = i.prototype = new s;
        o.x = 0, o.y = 0, o.angle = 0, o.realAngle = 0, o.name = "gravity", o.recache = function(t) {
            r.dirty = !1;
            var e = r.canvas;
            e.width = r.width * t, e.height = r.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawArrow(s, n, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 3 * t, i.stroke())
        }, o.getCode = function() {
            return "G " + this.x.toString(32) + " " + this.y.toString(32) + " " + this.realAngle.toString(32)
        }, o.setDirty = function(t) {
            r.dirty = t
        }, o.draw = function(t, e, i, s) {
            r.dirty && this.recache(i);
            var n = r.width * i,
                o = r.height * i,
                a = n / 2,
                h = o / 2,
                l = t,
                c = e,
                u = (this.angle + 90) * (Math.PI / 180);
            s.translate(l, c), s.rotate(u), s.drawImage(r.canvas, -a, -h, n, o), s.rotate(-u), s.translate(-l, -c)
        }, o.drawArrow = function(t, e, i, s) {
            i *= .2, s.beginPath(), s.moveTo(0 * i, 0 * i), s.lineTo(97 * i, 0 * i), s.lineTo(97 * i, 96 * i), s.lineTo(0 * i, 96 * i), s.closePath(), s.clip(), s.fillStyle = "rgba(0, 0, 0, 0)", s.strokeStyle = "rgba(0, 0, 0, 0)", s.lineWidth = Math.max(6 * i, 1), s.save(), s.fillStyle = "#376eb7", s.strokeStyle = "#000000", s.beginPath(), s.moveTo(41 * i, 70 * i), s.lineTo(41 * i, 95 * i), s.lineTo(97 * i, 48 * i), s.lineTo(41 * i, 1 * i), s.lineTo(41 * i, 25 * i), s.lineTo(1 * i, 25 * i), s.lineTo(1 * i, 70 * i), s.lineTo(41 * i, 70 * i), s.closePath(), s.closePath(), s.fill(), s.stroke()
        }, o.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                r = t.pos.y - this.y,
                o = n(s, 2) + n(r, 2),
                a = e.masses,
                h = (a.length, this.directionX),
                l = this.directionY;
            1e3 > o && i.isAlive() && (e.gravity.x = h, e.gravity.y = l, i.isGhost() === !1 && (this.scene.message.show("Gravity Changed", 50, "#1F80C3", "#FFFFFF"), this.scene.sound.play("gravity_down_sound")))
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    25: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.init(i)
        }
        var s = t("../powerup"),
            n = Math.sqrt,
            r = Math.pow,
            o = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 24,
                height: 24
            },
            a = i.prototype = new s;
        a.x = 0, a.y = 0, a.name = "slowmo", a.recache = function(t) {
            o.dirty = !1;
            var e = o.canvas;
            e.width = o.width * t, e.height = o.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawCircle(s, n, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, a.setDirty = function(t) {
            o.dirty = t
        }, a.getCode = function() {
            return "S " + this.x.toString(32) + " " + this.y.toString(32)
        }, a.draw = function(t, e, i, s) {
            o.dirty && this.recache(i);
            var n = o.width * i,
                r = o.height * i,
                a = n / 2,
                h = r / 2;
            s.drawImage(o.canvas, t - a, e - h, n, r)
        }, a.collide = function(t) {
            }, a.drawCircle = function(t, e, i, s) {
            s.save(), s.beginPath(), i *= .2, s.moveTo(0 * i, 0 * i), s.lineTo(116 * i, 0 * i), s.lineTo(116 * i, 114 * i), s.lineTo(0 * i, 114 * i), s.closePath(), s.fillStyle = "#FFF", s.strokeStyle = "#000000", s.lineWidth = Math.max(3 * i, .5), s.beginPath(), s.moveTo(58 * i, 111 * i), s.bezierCurveTo(89 * i, 111 * i, 114 * i, 87 * i, 114 * i, 56 * i), s.bezierCurveTo(114 * i, 26 * i, 89 * i, 2 * i, 58 * i, 2 * i), s.bezierCurveTo(27.1748289 * i, 2 * i, 2 * i, 26 * i, 2 * i, 56 * i), s.bezierCurveTo(2 * i, 87 * i, 27.1748289 * i, 111 * i, 58 * i, 111 * i), s.closePath(), s.moveTo(58 * i, 103 * i), s.bezierCurveTo(84 * i, 103 * i, 106 * i, 82 * i, 106 * i, 56 * i), s.bezierCurveTo(106 * i, 30 * i, 84 * i, 9 * i, 58 * i, 9 * i), s.bezierCurveTo(31 * i, 9 * i, 10 * i, 30 * i, 10 * i, 56 * i), s.bezierCurveTo(10 * i, 82 * i, 31 * i, 103 * i, 58 * i, 103 * i), s.closePath(), s.moveTo(58 * i, 55 * i), s.lineTo(37 * i, 23 * i), s.lineTo(35 * i, 25 * i), s.lineTo(56 * i, 57 * i), s.lineTo(58 * i, 55 * i), s.closePath(), s.moveTo(58.5 * i, 59 * i), s.lineTo(81.5 * i, 59 * i), s.lineTo(81.5 * i, 56 * i), s.lineTo(58.5 * i, 56 * i), s.lineTo(58.5 * i, 59 * i), s.closePath(), s.moveTo(98.5 * i, 59 * i), s.lineTo(105.5 * i, 59 * i), s.lineTo(105.5 * i, 56 * i), s.lineTo(98.5 * i, 56 * i), s.lineTo(98.5 * i, 59 * i), s.closePath(), s.moveTo(11.5 * i, 59 * i), s.lineTo(18.5 * i, 59 * i), s.lineTo(18.5 * i, 56 * i), s.lineTo(11.5 * i, 56 * i), s.lineTo(11.5 * i, 59 * i), s.closePath(), s.moveTo(57 * i, 96 * i), s.lineTo(57 * i, 101.5 * i), s.lineTo(60 * i, 101.5 * i), s.lineTo(60 * i, 96 * i), s.lineTo(57 * i, 96 * i), s.closePath(), s.moveTo(57 * i, 12 * i), s.lineTo(57 * i, 17.5 * i), s.lineTo(60 * i, 17.5 * i), s.lineTo(60 * i, 12 * i), s.lineTo(57 * i, 12 * i), s.closePath(), s.fill(), s.stroke()
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    26: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.hit = !1, this.id = o().toString(36).substr(2), this.init(i)
        }
        var s = t("../powerup"),
            n = Math.sqrt,
            r = Math.pow,
            o = Math.random,
            a = {
                canvas: document.createElement("canvas"),
                width: 35,
                height: 35
            },
            h = {
                canvas: document.createElement("canvas"),
                width: 35,
                height: 35
            },
            l = !0,
            c = i.prototype = new s;
        c.x = 0, c.y = 0, c.name = "goal", c.hit = !1, c.superErase = c.erase, c.getCode = function() {
            return "T " + this.x.toString(32) + " " + this.y.toString(32)
        }, c.recache = function(t) {
            l = !1, this.cacheStar(t), this.cacheEmptyStar(t)
        }, c.cacheStar = function(t) {
            var e = a.canvas;
            e.width = a.width * t, e.height = a.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawStar(s, n, 5, 10, 5, !0, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, c.cacheEmptyStar = function(t) {
            var e = h.canvas;
            e.width = h.width * t, e.height = h.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                n = e.height / 2;
            this.drawStar(s, n, 5, 10, 5, !1, t, i), this.settings.developerMode && (i.beginPath(), i.rect(0, 0, e.width, e.height), i.strokeStyle = "red", i.strokeWidth = 1 * t, i.stroke())
        }, c.setDirty = function(t) {
            l = t
        }, c.draw = function(t, e, i, s) {
            if(this.hit) {
                var n = h.width * i,
                    r = h.height * i,
                    o = n / 2,
                    c = r / 2;
                s.drawImage(h.canvas, t - o, e - c, n, r)
            } else {
                l && this.recache(i);
                var n = a.width * i,
                    r = a.height * i,
                    o = n / 2,
                    c = r / 2;
                s.drawImage(a.canvas, t - o, e - c, n, r)
            }
        }, c.drawStar = function(t, e, i, s, n, r, o, a) {
            var h = Math.PI / 2 * 3,
                l = t,
                c = e,
                u = Math.PI / i;
            s *= o, n *= o, a.strokeSyle = "#000", a.beginPath(), a.moveTo(t, e - s);
            for(var p = 0; i > p; p++) l = t + Math.cos(h) * s, c = e + Math.sin(h) * s, a.lineTo(l, c), h += u, l = t + Math.cos(h) * n, c = e + Math.sin(h) * n, a.lineTo(l, c), h += u;
            a.lineTo(t, e - s), a.closePath(), a.lineWidth = Math.max(2 * o, 1), a.strokeStyle = "black", a.stroke(), a.fillStyle = r ? "#FAE335" : "#FFFFFF", a.fill()
        }, c.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                o = t.pos.y - this.y,
                a = n(r(s, 2) + r(o, 2)),
                h = i._powerupsConsumed.targets,
                l = this.scene;
            if(26 > a && i.isAlive() && -1 === h.indexOf(this.id)) {
                h.push(this.id);
                var c = h.length,
                    u = l.track.targetCount;
                i.isGhost() === !1 && (this.hit = !0, this.sector.powerupCanvasDrawn = !1, l.sound.play("goal_sound"), l.message.show(c + " of " + u + " Stars", 50, "#FAE335", "#666666")), c >= u && (i.complete = !0)
            }
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    27: [function(t, e) {
        function i(t, e, i) {
            this.x = t, this.y = e, this.id = o().toString(36).substr(2), this.init(i)
        }
        var s = t("../powerup"),
            n = (Math.max, Math.sqrt),
            r = Math.pow,
            o = Math.random,
            a = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 29,
                height: 32
            },
            h = i.prototype = new s;
        h.id = null, h.otherPortal = null, h.hit = !1, h.x = 0, h.y = 0, h.name = "teleport", h.recorded = !1, h.erase = function(t, e) {
            var i = !1;
            if(!this.remove) {
                var s = n(r(t.x - this.x, 2) + r(t.y - this.y, 2));
                e >= s && (i = [this, this.otherPortal], this.removeAllReferences(), this.otherPortal.removeAllReferences())
            }
            return i
        }, h.addOtherPortalRef = function(t) {
            this.otherPortal = t
        }, h.getCode = function() {
            var t = "";
            return this.recorded === !1 && this.otherPortal.recorded === !0 ? this.recorded = !0 : this.recorded === !1 && this.otherPortal.recorded === !1 ? (this.recorded = !0, t = "W " + this.x.toString(32) + " " + this.y.toString(32) + " " + this.otherPortal.x.toString(32) + " " + this.otherPortal.y.toString(32)) : this.recorded === !0 && this.otherPortal.recorded === !0 && (this.otherPortal.recorded = !1, t = "W " + this.x.toString(32) + " " + this.y.toString(32) + " " + this.otherPortal.x.toString(32) + " " + this.otherPortal.y.toString(32)), t
        }, h.setDirty = function(t) {
            a.dirty = t
        }, h.recache = function(t) {
            a.dirty = !1, this.drawPowerup(t, a)
        }, h.drawPowerup = function(t, e) {
            var i = e.canvas;
            i.width = e.width * t, i.height = e.height * t;
            var s = i.getContext("2d"),
                n = (s.width / 2, s.height / 2, .65 * t);
            s.save(), s.scale(n, n), s.save(), s.beginPath(), s.moveTo(0, 0), s.lineTo(44, 0), s.lineTo(44, 48), s.lineTo(0, 48), s.closePath(), s.clip(), s.translate(0, 0), s.translate(0, 0), s.scale(1, 1), s.translate(0, 0), s.strokeStyle = "rgba(0,0,0,0)", s.lineCap = "butt", s.lineJoin = "miter", s.miterLimit = 4, s.save(), s.restore(), s.save(), s.restore(), s.save(), s.fillStyle = "rgba(0, 0, 0, 0)", s.strokeStyle = "rgba(0, 0, 0, 0)", s.lineWidth = 1, s.translate(-788, -50), s.save(), s.translate(790, 52), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(17, 3), s.bezierCurveTo(16.9424049, 2.83458834, 16.4420628, 2.62968665, 15.9196825, 2.4515011), s.lineTo(8.51063934, -.0757469011), s.lineTo(16.223952, -1.41205186), s.bezierCurveTo(21.2423806, -2.2814774, 25.8773816, -1.40451316, 29.9447883, .583562762), s.bezierCurveTo(31.7394578, 1.46076529, 33.0361403, 2.35169307, 33.7316821, 2.95217334), s.bezierCurveTo(35.1972328, 4.14751314, 36.509471, 5.52829294, 37.6336956, 7.05811132), s.bezierCurveTo(39.8993675, 10.1439271, 41.2801108, 13.6041318, 41.7252304, 17.3208639), s.bezierCurveTo(41.7397043, 17.4414782, 41.7543021, 17.5670407, 41.7704814, 17.7094344), s.bezierCurveTo(41.7921038, 17.9009058, 41.7921038, 17.9009058, 41.8132645, 18.0904969), s.lineTo(41.840873, 18.3390683), s.lineTo(41.8856209, 18.735971), s.lineTo(41.8856209, 21.4226506), s.lineTo(41.8542399, 21.5977061), s.bezierCurveTo(41.8009577, 21.89487, 41.7866262, 21.9747988, 41.7740749, 22.044061), s.bezierCurveTo(41.759051, 22.1809078, 41.759051, 22.1809078, 41.7559584, 22.2091488), s.bezierCurveTo(41.6872107, 22.8267498, 41.6438556, 23.1562694, 41.5609313, 23.6049736), s.bezierCurveTo(40.8769441, 27.3127264, 39.3221077, 30.5993535, 36.9456235, 33.3462518), s.bezierCurveTo(32.8945821, 38.029004, 27.65733, 40.5391341, 21.868366, 40.5391341), s.bezierCurveTo(21.742671, 40.5391341, 21.6184358, 40.538205, 21.4955986, 40.5363608), s.bezierCurveTo(22.1492681, 41.0434881, 22.8806236, 41.5794806, 23.6943816, 42.1440112), s.lineTo(28.4276887, 45.4276613), s.lineTo(22.6779106, 45.7834802), s.bezierCurveTo(18.1741264, 46.062192, 14.0554746, 45.155711, 10.4302114, 43.4736066), s.bezierCurveTo(8.54152696, 42.5972663, 7.17424655, 41.7066293, 6.38621142, 41.0629331), s.bezierCurveTo(4.99599225, 40.025971, 3.38305673, 38.3146562, 2.25448469, 36.778713), s.bezierCurveTo(-.0125398982, 33.6943248, -1.39399999, 30.2338948, -1.84021156, 26.5118367), s.bezierCurveTo(-1.86468983, 26.3063181, -1.88762639, 26.1042985, -1.92006182, 25.811651), s.lineTo(-1.95463612, 25.5020237), s.lineTo(-2.00013072, 25.1020716), s.lineTo(-2.00013072, 22.4141906), s.lineTo(-1.96885958, 22.2394346), s.bezierCurveTo(-1.92214724, 21.9784071, -1.90657901, 21.8914122, -1.89618079, 21.8334198), s.bezierCurveTo(-1.83478692, 21.2274076, -1.79887919, 20.9331002, -1.72945035, 20.5323584), s.bezierCurveTo(-.927733904, 15.885014, 1.1979378, 11.9079902, 4.5664052, 8.76464131), s.bezierCurveTo(8.29993169, 5.27968493, 12.7861394, 3.24768826, 17.4210789, 3.06365477), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#dd45ec", s.beginPath(), s.moveTo(23.9052288, 5.91261647), s.bezierCurveTo(23.9052288, 5.91261647, 22.5543791, 5.13614588, 18.1099346, 5.04995765), s.bezierCurveTo(13.6479739, 5.05021647, 9.39411765, 6.99424, 5.93111111, 10.2266871), s.bezierCurveTo(2.88431373, 13.0698635, .969542484, 16.6517224, .241437908, 20.8723576), s.bezierCurveTo(.169019608, 21.2903576, .131372549, 21.6617694, .101045752, 21.9601929), s.bezierCurveTo(.0960784314, 22.0104047, .0911111111, 22.0611341, .0858823529, 22.1113459), s.bezierCurveTo(.0837908497, 22.1227341, .0816993464, 22.1341224, .0796078431, 22.1452518), s.lineTo(-.000130718954, 22.5917224), s.lineTo(-.000130718954, 23.0451812), s.lineTo(-.000130718954, 24.6993224), s.lineTo(-.000130718954, 24.9886871), s.lineTo(.0325490196, 25.2759812), s.lineTo(.0675816993, 25.5896753), s.bezierCurveTo(.0929411765, 25.8184753, .118562092, 26.0470165, .145751634, 26.2752988), s.bezierCurveTo(.550457516, 29.6511341, 1.80196078, 32.7860047, 3.86601307, 35.59424), s.bezierCurveTo(4.76326797, 36.8153694, 6.27176471, 38.4928047, 7.6179085, 39.4864282), s.bezierCurveTo(7.6179085, 39.4864282, 13.4911111, 44.3481694, 22.5543791, 43.7872988), s.bezierCurveTo(16.5849673, 39.6461224, 15.7624837, 37.5460282, 15.7624837, 37.5460282), s.bezierCurveTo(16.4521569, 37.6208282, 18.1535948, 38.5391341, 21.868366, 38.5391341), s.bezierCurveTo(27.0628758, 38.5391341, 31.7535948, 36.2909929, 35.4330719, 32.0377459), s.bezierCurveTo(37.5739869, 29.5631341, 38.9739869, 26.6037459, 39.5941176, 23.2421459), s.bezierCurveTo(39.6816993, 22.76824, 39.7295425, 22.3354871, 39.7682353, 21.9878871), s.bezierCurveTo(39.7768627, 21.9092047, 39.7852288, 21.8300047, 39.7946405, 21.7510635), s.bezierCurveTo(39.7983007, 21.7319106, 39.8019608, 21.7124988, 39.8053595, 21.6930871), s.lineTo(39.8856209, 21.2448047), s.lineTo(39.8856209, 20.7895341), s.lineTo(39.8856209, 19.1356518), s.lineTo(39.8856209, 18.8483576), s.lineTo(39.8534641, 18.5631341), s.lineTo(39.8254902, 18.3112988), s.bezierCurveTo(39.7975163, 18.0607576, 39.7695425, 17.8096988, 39.7394771, 17.5591576), s.bezierCurveTo(39.3355556, 14.1864282, 38.0845752, 11.0515576, 36.0215686, 8.24176941), s.bezierCurveTo(34.9975163, 6.84826353, 33.8019608, 5.59038118, 32.4675817, 4.50202824), s.bezierCurveTo(32.4675817, 4.50202824, 25.996732, -1.07536, 16.5653595, .558592941), s.bezierCurveTo(21.6393464, 2.28934588, 23.9052288, 5.91261647, 23.9052288, 5.91261647), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#fefefe", s.beginPath(), s.moveTo(5.22875817, 24.6992965), s.lineTo(5.22875817, 23.0451553), s.bezierCurveTo(5.24078431, 22.97812, 5.25647059, 22.9113435, 5.26457516, 22.8437906), s.bezierCurveTo(5.30823529, 22.4770376, 5.33254902, 22.1071788, 5.39555556, 21.7440494), s.bezierCurveTo(5.9179085, 18.7173671, 7.26117647, 16.0988494, 9.5179085, 13.9930612), s.bezierCurveTo(12.7882353, 10.9404965, 16.6520261, 9.83428471, 21.0614379, 10.8020259), s.bezierCurveTo(23.1579085, 11.2619553, 24.9563399, 12.2887082, 26.3997386, 13.8804729), s.bezierCurveTo(27.8005229, 15.4251318, 28.5681046, 17.2482847, 28.8130719, 19.3033435), s.bezierCurveTo(29.0044444, 20.9103788, 28.7861438, 22.4467553, 28.0836601, 23.9122141), s.bezierCurveTo(26.5186928, 27.1764965, 23.3458824, 28.74652, 19.8862745, 27.9666847), s.bezierCurveTo(17.6018301, 27.4518847, 16.0658824, 25.7762612, 15.7793464, 23.4833435), s.bezierCurveTo(15.7513725, 23.2566141, 15.7422222, 23.0278141, 15.7233987, 22.7920259), s.bezierCurveTo(15.6826144, 22.7959082, 15.6577778, 22.7959082, 15.6345098, 22.8013435), s.bezierCurveTo(15.2580392, 22.8929671, 15.0844444, 23.1867318, 14.9532026, 23.5037906), s.bezierCurveTo(14.6407843, 24.2592965, 14.6128105, 25.0383553, 14.8180392, 25.8238847), s.bezierCurveTo(15.1252288, 26.9999788, 15.8075817, 27.9480494, 16.7301961, 28.7162376), s.bezierCurveTo(19.105098, 30.6939082, 21.8201307, 31.2356259, 24.7777778, 30.3869435), s.bezierCurveTo(27.9027451, 29.4903788, 30.1628758, 27.5002847, 31.6556863, 24.6703082), s.bezierCurveTo(33.1751634, 21.7893435, 33.4169935, 18.73652, 32.7003922, 15.5969906), s.bezierCurveTo(32.1134641, 13.0263553, 30.9056209, 10.7471553, 29.2807843, 8.67397882), s.bezierCurveTo(29.2345098, 8.61496706, 29.1887582, 8.55595529, 29.1427451, 8.49694353), s.bezierCurveTo(30.1487582, 9.31767294, 31.0295425, 10.2476259, 31.7918954, 11.2855082), s.bezierCurveTo(33.305098, 13.3460024, 34.2433987, 15.6329671, 34.5471895, 18.1681435), s.bezierCurveTo(34.5856209, 18.4903788, 34.6206536, 18.8131318, 34.6569935, 19.1356259), s.lineTo(34.6569935, 20.7897671), s.bezierCurveTo(34.6449673, 20.8565435, 34.629281, 20.92332, 34.620915, 20.9908729), s.bezierCurveTo(34.5644444, 21.4313906, 34.5309804, 21.8763082, 34.4501961, 22.3121671), s.bezierCurveTo(34.0122876, 24.6873906, 33.0475817, 26.8374376, 31.4616993, 28.6706847), s.bezierCurveTo(28.1134641, 32.5408729, 23.9121569, 34.11012, 18.8256209, 33.0287553), s.bezierCurveTo(16.5994771, 32.5553671, 14.72, 31.4287082, 13.2504575, 29.68372), s.bezierCurveTo(11.9879739, 28.1846141, 11.2983007, 26.4463553, 11.0705882, 24.5126847), s.bezierCurveTo(10.871634, 22.8236024, 11.1286275, 21.2212259, 11.9113725, 19.7042612), s.bezierCurveTo(13.5228758, 16.5810376, 16.6386928, 15.0982376, 19.9803922, 15.8646141), s.bezierCurveTo(22.303268, 16.3975318, 23.7997386, 18.0288965, 24.1079739, 20.3696965), s.bezierCurveTo(24.136732, 20.5899553, 24.1440523, 20.8128024, 24.1662745, 21.1008729), s.bezierCurveTo(24.343268, 20.9921671, 24.5147712, 20.9334141, 24.6146405, 20.8153906), s.bezierCurveTo(24.7620915, 20.6414612, 24.8909804, 20.4375082, 24.970719, 20.2255318), s.bezierCurveTo(25.28, 19.4032494, 25.2648366, 18.5688024, 24.9890196, 17.7405671), s.bezierCurveTo(24.5738562, 16.4935553, 23.7654902, 15.5263318, 22.715817, 14.7615082), s.bezierCurveTo(20.315817, 13.0147082, 17.6664052, 12.6334612, 14.8541176, 13.5207082), s.bezierCurveTo(11.8538562, 14.4672259, 9.67267974, 16.4187553, 8.23006536, 19.1622847), s.bezierCurveTo(6.68470588, 22.1014847, 6.45960784, 25.2078847, 7.22352941, 28.3996965), s.bezierCurveTo(7.82248366, 30.8996729, 9.0096732, 33.1206376, 10.5921569, 35.1438612), s.bezierCurveTo(10.6420915, 35.2083082, 10.692549, 35.2724965, 10.743268, 35.3364259), s.bezierCurveTo(9.97568627, 34.7698612, 8.83764706, 33.5606376, 8.09385621, 32.5486376), s.bezierCurveTo(6.57986928, 30.4886612, 5.6420915, 28.2016965, 5.33830065, 25.66652), s.bezierCurveTo(5.29960784, 25.3442847, 5.26535948, 25.0215318, 5.22875817, 24.6992965), s.fill(), s.stroke(), s.restore(), s.restore(), s.restore(), s.restore()
        }, h.draw = function(t, e, i, s) {
            a.dirty && this.recache(i); {
                var n = a.width * i,
                    r = a.height * i,
                    o = n / 2,
                    h = r / 2,
                    l = t,
                    c = e;
                (this.angle - 90) * (Math.PI / 180)
            }
            s.globalAlpha = this.hit === !1 ? 1 : .2, s.translate(l, c), s.drawImage(a.canvas, -o, -h, n, r), s.translate(-l, -c)
        }, h.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = i._powerupsConsumed.misc;
            if(-1 === s.indexOf(this.id)) {
                {
                    var n = t.pos.x - this.x,
                        o = t.pos.y - this.y,
                        a = r(n, 2) + r(o, 2),
                        h = e.masses;
                    h.length
                }
                1e3 > a && i.isAlive() && (s.push(this.id), s.push(this.otherPortal.id), e.moveVehicle(this.otherPortal.x - this.x, this.otherPortal.y - this.y), i.isGhost() === !1 && (this.hit = !0, this.otherPortal.hit = !0, this.sector.powerupCanvasDrawn = !1, this.otherPortal.sector.powerupCanvasDrawn = !1, this.scene.sound.play("teleport_sound", .3), this.scene.message.show("Teleport Engaged", 50, "#8ac832")))
            }
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    28: [function(t, e) {
        function i(t, e, i, n) {
            this.p1 = new s(t, e), this.p2 = new s(i, n), this.pp = this.p2.sub(this.p1), this.len = this.pp.len(), this.sectors = []
        }
        var s = t("../math/cartesian"),
            n = Math.sqrt,
            r = (Math.pow, Math.round, Math.floor);
        i.prototype = {
            sectors: null,
            p1: null,
            p2: null,
            pp: null,
            len: 0,
            collided: !1,
            remove: !1,
            recorded: !1,
            getCode: function(t) {
                this.recorded = !0;
                var e = this.p2,
                    i = " " + e.x.toString(32) + " " + e.y.toString(32),
                    s = this.checkForConnectedLine(t, e);
                return s && (i += s.getCode(t)), i
            },
            checkForConnectedLine: function(t, e) {
                var i = t.settings.drawSectorSize,
                    s = t.sectors.drawSectors,
                    n = r(e.x / i),
                    o = r(e.y / i);
                return s[n][o].searchForLine("sceneryLines", e)
            },
            erase: function(t, e) {
                var i = !1;
                if(!this.remove) {
                    var s = this.p1,
                        r = this.p2,
                        o = t,
                        a = e,
                        h = r.sub(s),
                        l = s.sub(o),
                        c = h.dot(h),
                        u = 2 * l.dot(h),
                        p = l.dot(l) - a * a,
                        d = u * u - 4 * c * p;
                    if(d > 0) {
                        d = n(d);
                        var f = (-u - d) / (2 * c),
                            v = (-u + d) / (2 * c);
                        f >= 0 && 1 >= f && (i = !0, this.removeAllReferences()), v >= 0 && 1 >= v && (i = !0, this.removeAllReferences())
                    }
                    this.intersects(this.p1.x, this.p1.y, t.x, t.y, e) ? (i = !0, this.removeAllReferences()) : this.intersects(this.p2.x, this.p2.y, t.x, t.y, e) && (i = !0, this.removeAllReferences())
                }
                return i
            },
            intersects: function(t, e, i, s, n) {
                var r = t - i,
                    o = e - s;
                return n * n >= r * r + o * o
            },
            addSectorReference: function(t) {
                this.sectors.push(t)
            },
            removeAllReferences: function() {
                this.remove = !0;
                for(var t = this.sectors, e = t.length, i = 0; e > i; i++) t[i].drawn = !1, t[i].dirty = !0;
                this.sectors = []
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    29: [function(t, e) {
        function i(t, e, i) {
            this.track = i, this.scene = i.scene, this.settings = i.settings, this.drawSectorSize = this.settings.drawSectorSize, this.row = e, this.column = t, this.camera = i.camera, this.zoom = i.camera.zoom, this.canvasPool = i.canvasPool, this.x = t * this.drawSectorSize, this.y = e * this.drawSectorSize, this.realX = this.x * this.zoom, this.realY = this.y * this.zoom, this.lineCount = 0, this.powerupsCount = 0, this.drawn = !1, this.dirty = !1, this.physicsLines = [], this.sceneryLines = [], this.hasPowerups = !1, this.powerups = {
                all: [],
                goals: [],
                gravitys: [],
                boosts: [],
                slowmos: [],
                checkpoints: [],
                bombs: [],
                antigravitys: [],
                teleports: [],
                helicopters: [],
                trucks: []
            }
        } {
            var s = (t("../math/cartesian"), t("./physicsline")),
                n = t("./sceneryline");
            Math.max, Math.min
        }
        i.prototype = {
            image: !1,
            scene: null,
            settings: null,
            drawSectorSize: null,
            row: 0,
            column: 0,
            camera: null,
            zoom: 0,
            x: 0,
            y: 0,
            realX: 0,
            realY: 0,
            lineCount: 0,
            powerupsCount: 0,
            drawn: !1,
            physicsLines: [],
            sceneryLines: [],
            powerups: [],
            canvasPool: null,
            canvas: null,
            powerupCanvas: null,
            powerupCanvasOffset: 30,
            powerupCanvasDrawn: !1,
            dirty: !1,
            addLine: function(t) {
                t instanceof s && this.physicsLines.push(t), t instanceof n && this.sceneryLines.push(t), this.lineCount++, this.drawn = !1
            },
            searchForLine: function(t, e) {
                var i = this[t],
                    s = !1;
                for(var n in i) {
                    var r = i[n];
                    r.p1.x === e.x && r.p1.y === e.y && r.recorded === !1 && r.remove === !1 && (s = r)
                }
                return s
            },
            addPowerup: function(t) {
                var e = this.powerups,
                    i = null;
                switch(t.name) {
                    case "goal":
                        i = e.goals;
                        break;
                    case "gravity":
                        i = e.gravitys;
                        break;
                    case "slowmo":
                        i = e.slowmos;
                        break;
                    case "boost":
                        i = e.boosts;
                        break;
                    case "checkpoint":
                        i = e.checkpoints;
                        break;
                    case "bomb":
                        i = e.bombs;
                        break;
                    case "antigravity":
                        i = e.antigravitys;
                        break;
                    case "teleport":
                        i = e.teleports;
                        break;
                    case "helicopter":
                        i = e.helicopters;
                        break;
                    case "truck":
                        i = e.trucks
                }
                e.all.push(t), i.push(t), this.powerupsCount++, this.hasPowerups = !0, this.powerupCanvasDrawn = !1
            },
            erase: function(t, e, i) {
                var s = [];
                if(i.physics === !0)
                    for(var n = this.physicsLines, r = n.length, o = r - 1; o >= 0; o--) {
                        var a = n[o];
                        a.erase(t, e) && s.push(a)
                    }
                if(i.scenery === !0)
                    for(var h = this.sceneryLines, l = h.length, c = l - 1; c >= 0; c--) {
                        var u = h[c];
                        u.erase(t, e) && s.push(u)
                    }
                if(i.powerups === !0)
                    for(var p = this.powerups.all, d = p.length, f = d - 1; f >= 0; f--) {
                        var v = p[f],
                            g = v.erase(t, e);
                        g !== !1 && s.push.apply(s, g)
                    }
                return s
            },
            cleanSector: function() {
                this.cleanSectorType("physicsLines"), this.cleanSectorType("sceneryLines"), this.cleanSectorType("powerups", "all"), 0 === this.powerups.all.length ? (this.hasPowerups = !1, this.powerupCanvas && (this.canvasPool.releaseCanvas(this.powerupCanvas), this.powerupCanvas = null)) : this.hasPowerups = !0, this.dirty = !1
            },
            cleanSectorType: function(t, e) {
                var i = this[t];
                e && (i = i[e]);
                for(var s = i.length, n = s - 1; n >= 0; n--) {
                    var r = i[n];
                    r.remove && i.splice(n, 1)
                }
            },
            draw: function() {
                var t = this.scene.camera,
                    e = t.zoom,
                    i = this.physicsLines,
                    s = this.sceneryLines,
                    n = this.drawSectorSize * e | 0,
                    r = this.canvasPool.getCanvas();
                r.width = n, r.height = n;
                var o = r.getContext("2d");
                o.clearRect(0, 0, r.width, r.height);
                var a = 2 * e > .5 ? 2 * e : .5,
                    h = this.settings.sceneryLineColor,
                    l = this.settings.physicsLineColor;
                o.save(), o.beginPath(), o.lineWidth = a, o.lineCap = "round", o.strokeStyle = h, this.drawLines(s, e, o), o.stroke(), o.beginPath(), o.lineWidth = a, o.lineCap = "round", o.strokeStyle = l, this.drawLines(i, e, o), o.stroke(), this.settings.developerMode && (o.beginPath(), o.strokeStyle = "blue", o.rect(0, 0, n, n), o.stroke()), this.canvas = r, this.drawn = !0
            },
            drawLine: function(t, e) {
                var i, s, n, r, o, a, h = this.canvas,
                    l = this.scene.camera,
                    c = l.zoom,
                    u = 2 * c > .5 ? 2 * c : .5,
                    p = !1,
                    d = this.x,
                    f = this.y;
                if(!h) {
                    var v = this.drawSectorSize * c | 0;
                    h = this.canvasPool.getCanvas(), h.width = v, h.height = v, p = h.getContext("2d")
                }
                p || (p = h.getContext("2d")), o = t.p1, a = t.p2, i = (o.x - d) * c, s = (o.y - f) * c, n = (a.x - d) * c, r = (a.y - f) * c, p.save(), p.beginPath(), p.lineWidth = u, p.lineCap = "round", p.strokeStyle = e, p.moveTo(i, s), p.lineTo(n, r), p.stroke()
            },
            cachePowerupSector: function() {
                this.powerupCanvasDrawn = !0;
                var t = this.powerups.all;
                if(t.length > 0) {
                    var e = this.scene.camera,
                        i = e.zoom,
                        s = this.drawSectorSize * i | 0,
                        n = this.powerupCanvasOffset,
                        r = this.canvasPool.getCanvas();
                    r.width = s + n * i, r.height = s + n * i;
                    var o = r.getContext("2d");
                    o.clearRect(0, 0, r.width, r.height), this.drawPowerups(this.powerups.slowmos, i, o), this.drawPowerups(this.powerups.checkpoints, i, o), this.drawPowerups(this.powerups.boosts, i, o), this.drawPowerups(this.powerups.gravitys, i, o), this.drawPowerups(this.powerups.bombs, i, o), this.drawPowerups(this.powerups.goals, i, o), this.drawPowerups(this.powerups.antigravitys, i, o), this.drawPowerups(this.powerups.teleports, i, o), this.drawPowerups(this.powerups.helicopters, i, o), this.drawPowerups(this.powerups.trucks, i, o), this.powerupCanvas = r, this.settings.developerMode && (o.beginPath(), o.strokeStyle = "red", o.rect(0, 0, r.width, r.height), o.stroke())
                }
            },
            update: function() {
                var t = this.camera.zoom;
                this.realX = this.x * t | 0, this.realY = this.y * t | 0, this.zoom = t
            },
            resetCollided: function() {
                for(var t = this.physicsLines, e = t.length, i = e - 1; i >= 0; i--) t[i] && (t[i].collided = !1)
            },
            collide: function(t) {
                for(var e = t.parent, i = this.physicsLines, s = i.length, n = s - 1; n >= 0; n--)
                    if(i[n]) {
                        var r = i[n];
                        r.remove ? i.splice(n, 1) : r.collide(t)
                    }
                if(e.powerupsEnabled)
                    for(var o = this.powerups.all, a = o.length, h = a - 1; h >= 0; h--) {
                        var l = o[h];
                        l.remove ? o.splice(h, 1) : o[h].collide(t)
                    }
            },
            drawLines: function(t, e, i) {
                for(var s, n, r, o, a, h, l, c = this.x, u = this.y, p = t.length, d = p - 1; d >= 0; d--) {
                    var a = t[d];
                    a.remove ? t.splice(d, 1) : (h = a.p1, l = a.p2, s = (h.x - c) * e, n = (h.y - u) * e, r = (l.x - c) * e, o = (l.y - u) * e, i.moveTo(s, n), i.lineTo(r, o))
                }
            },
            drawPowerups: function(t, e, i) {
                for(var t = t, s = t.length, n = this.x, r = this.y, o = this.powerupCanvasOffset * e / 2, a = s - 1; a >= 0; a--) {
                    var h = t[a];
                    if(h.remove) t.splice(a, 1);
                    else {
                        var l = (h.x - n) * e + o,
                            c = (h.y - r) * e + o;
                        h.draw(l, c, e, i)
                    }
                }
            },
            drawBackground: function(t, e, i) {
                var s = this.drawSectorSize * e | 0;
                t.beginPath(), t.rect(0, 0, s, s), t.fillStyle = i, t.fill()
            },
            clear: function() {
                this.drawn = !1, this.powerupCanvasDrawn = !1, this.canvas && (this.canvas = null, this.canvasPool.releaseCanvas(this.canvas)), this.powerupCanvas && (this.canvasPool.releaseCanvas(this.powerupCanvas), this.powerupCanvas = null)
            },
            close: function() {
                this.track = null, this.scene = null, this.settings = null, this.drawSectorSize = null, this.row = null, this.column = null, this.camera = null, this.zoom = null, this.canvasPool = null, this.x = null, this.y = null, this.realX = null, this.realY = null, this.lineCount = null, this.drawn = null, this.physicsLines = null, this.sceneryLines = null, this.canvas = null
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./physicsline": 18,
        "./sceneryline": 28
    }],
    30: [function(t, e) {
        function i(t, e, i, s) {
            this.x = t, this.y = e, this.time = i, this.id = r().toString(36).substr(2), this.hit = !1, this.init(s)
        }
        var s = t("../powerup"),
            n = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 32,
                height: 42
            },
            r = Math.random,
            o = Math.pow,
            a = Math.sqrt,
            h = (Math.cos, Math.sin, i.prototype = new s);
        h.x = 0, h.y = 0, h.name = "helicopter", h.getCode = function() {
            return "V " + this.x.toString(32) + " " + this.y.toString(32) + " 1 " + this.time.toString(32)
        }, h.recache = function(t) {
            n.dirty = !1;
            var e = n.canvas;
            e.width = n.width * t, e.height = n.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                r = e.height / 2;
            this.drawIcon(s, r, t, i)
        }, h.setDirty = function(t) {
            n.dirty = t
        }, h.draw = function(t, e, i, s) {
            if(!this.hit) {
                n.dirty && this.recache(i);
                var r = n.width * i,
                    o = n.height * i,
                    a = r / 2,
                    h = o / 2;
                s.drawImage(n.canvas, t - a, e - h, r, o)
            }
        }, h.drawIcon = function(t, e, i, s) {
            i *= 1, s.lineCap = "butt", s.lineJoin = "miter", s.miterLimit = 4 * i, s.fillStyle = "#000000", s.beginPath(), s.moveTo(15 * i, 4.5 * i), s.lineTo(15 * i, 2.5 * i), s.bezierCurveTo(15 * i, 1.4 * i, 14.1 * i, .5 * i, 13 * i, .5 * i), s.bezierCurveTo(11.9 * i, .5 * i, 11 * i, 1.4 * i, 11 * i, 2.5 * i), s.lineTo(11 * i, 4.5 * i), s.bezierCurveTo(11 * i, 5.6 * i, 11.9 * i, 6.5 * i, 13 * i, 6.5 * i), s.bezierCurveTo(14.1 * i, 6.5 * i, 15 * i, 5.6 * i, 15 * i, 4.5 * i), s.lineTo(15 * i, 4.5 * i), s.closePath(), s.fill(), s.beginPath(), s.lineCap = "round", s.lineWidth = 2 * i, s.moveTo(1 * i, 3 * i), s.lineTo(25 * i, 3 * i), s.stroke(), s.lineCap = "butt", s.lineWidth = 1 * i, s.beginPath(), s.moveTo(6.1 * i, 26.9 * i), s.lineTo(4.1 * i, 31.9 * i), s.bezierCurveTo(3.8 * i, 32.7 * i, 4.2 * i, 33.6 * i, 4.9 * i, 33.9 * i), s.bezierCurveTo(5.7 * i, 34.2 * i, 6.6 * i, 33.8 * i, 6.9 * i, 33 * i), s.lineTo(8.9 * i, 28 * i), s.bezierCurveTo(9.2 * i, 27.3 * i, 8.8 * i, 26.4 * i, 8 * i, 26.1 * i), s.bezierCurveTo(7.3 * i, 25.8 * i, 6.4 * i, 26.1 * i, 6.1 * i, 26.9 * i), s.lineTo(6.1 * i, 26.9 * i), s.closePath(), s.fill(), s.stroke(), s.beginPath(), s.moveTo(17 * i, 28 * i), s.lineTo(19 * i, 33 * i), s.bezierCurveTo(19.4 * i, 33.8 * i, 20.3 * i, 34.2 * i, 21 * i, 33.9 * i), s.bezierCurveTo(21.8 * i, 33.6 * i, 22.2 * i, 32.7 * i, 21.9 * i, 31.9 * i), s.lineTo(19.9 * i, 26.9 * i), s.bezierCurveTo(19.6 * i, 26.2 * i, 18.7 * i, 25.8 * i, 17.9 * i, 26.1 * i), s.bezierCurveTo(17.2 * i, 26.4 * i, 16.8 * i, 27.3 * i, 17.1 * i, 28 * i), s.lineTo(17 * i, 28 * i), s.closePath(), s.fill(), s.stroke(), s.fillStyle = "#f59423", s.strokeStyle = "#000000", s.lineWidth = 2 * i, s.beginPath(), s.arc(13 * i, 17 * i, 11 * i, 0 * i, 2 * Math.PI, !0), s.closePath(), s.fill(), s.stroke(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(21 * i, 17 * i), s.bezierCurveTo(21 * i, 12.6 * i, 17.4 * i, 9 * i, 13 * i, 9 * i), s.bezierCurveTo(8.6 * i, 9 * i, 5 * i, 12.6 * i, 5 * i, 17 * i), s.lineTo(21 * i, 17 * i), s.closePath(), s.fill()
        }, h.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                n = t.pos.y - this.y,
                r = a(o(s, 2) + o(n, 2)),
                h = i._powerupsConsumed.misc,
                l = this.scene;
            if(30 > r && i.isAlive() && -1 === h.indexOf(this.id)) {
                h.push(this.id);
                var c = this.time * l.settings.drawFPS;
                i.setTempVehicle("HELI", c, {
                    x: this.x,
                    y: this.y
                }, e.dir), l.camera.playerFocus === i && (l.camera.focusOnPlayer(), l.vehicleTimer.playerAddedTime(i)), i.isGhost() === !1 && (this.hit = !0, this.sector.powerupCanvasDrawn = !1, this.scene.message.show("Helicopter Powerup!", 50, "#F2902E", !1))
            }
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    31: [function(t, e) {
        function i(t, e, i, s) {
            this.x = t, this.y = e, this.time = i, this.id = r().toString(36).substr(2), this.hit = !1, this.init(s)
        }
        var s = t("../powerup"),
            n = {
                canvas: document.createElement("canvas"),
                dirty: !0,
                width: 32,
                height: 42
            },
            r = Math.random,
            o = Math.pow,
            a = Math.sqrt,
            h = (Math.cos, Math.sin, i.prototype = new s);
        h.x = 0, h.y = 0, h.name = "truck", h.getCode = function() {
            return "V " + this.x.toString(32) + " " + this.y.toString(32) + " 2 " + this.time.toString(32)
        }, h.recache = function(t) {
            n.dirty = !1;
            var e = n.canvas;
            e.width = n.width * t, e.height = n.height * t;
            var i = e.getContext("2d"),
                s = e.width / 2,
                r = e.height / 2;
            this.drawIcon(s, r, t, i)
        }, h.setDirty = function(t) {
            n.dirty = t
        }, h.draw = function(t, e, i, s) {
            if(!this.hit) {
                n.dirty && this.recache(i);
                var r = n.width * i,
                    o = n.height * i,
                    a = r / 2,
                    h = o / 2;
                s.drawImage(n.canvas, t - a, e - h, r, o)
            }
        }, h.drawIcon = function(t, e, i, s) {
            i *= 1, s.save(), s.scale(i, i), s.beginPath(), s.moveTo(0, 0), s.lineTo(24, 0), s.lineTo(24, 26), s.lineTo(0, 26), s.closePath(), s.clip(), s.translate(0, 0), s.translate(0, 0), s.scale(1, 1), s.translate(0, 0), s.strokeStyle = "rgba(0,0,0,0)", s.lineCap = "butt", s.lineJoin = "miter", s.miterLimit = 4, s.save(), s.restore(), s.save(), s.restore(), s.save(), s.fillStyle = "rgba(0, 0, 0, 0)", s.strokeStyle = "rgba(0, 0, 0, 0)", s.lineWidth = 1, s.translate(-1320, -352), s.save(), s.translate(251, 28), s.save(), s.translate(1056, 265), s.save(), s.translate(3, 49), s.save(), s.translate(10, 8), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(2, 17), s.lineTo(4, 17), s.quadraticCurveTo(6, 17, 6, 19), s.lineTo(6, 26), s.quadraticCurveTo(6, 28, 4, 28), s.lineTo(2, 28), s.quadraticCurveTo(0, 28, 0, 26), s.lineTo(0, 19), s.quadraticCurveTo(0, 17, 2, 17), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(20, 17), s.lineTo(22, 17), s.quadraticCurveTo(24, 17, 24, 19), s.lineTo(24, 26), s.quadraticCurveTo(24, 28, 22, 28), s.lineTo(20, 28), s.quadraticCurveTo(18, 28, 18, 26), s.lineTo(18, 19), s.quadraticCurveTo(18, 17, 20, 17), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.strokeStyle = "#000000", s.lineWidth = 2, s.lineCap = "square", s.beginPath(), s.moveTo(3.5, 23), s.lineTo(20.5, 23), s.fill(), s.stroke(), s.restore(), s.save(), s.save(), s.fillStyle = "#94d44e", s.save(), s.beginPath(), s.moveTo(23, 11.2672237), s.bezierCurveTo(23.5979157, 11.6115707, 24, 12.2552568, 24, 12.999615), s.lineTo(24, 19.000385), s.bezierCurveTo(24, 20.1047419, 23.1029738, 21, 21.9950534, 21), s.lineTo(2.00494659, 21), s.bezierCurveTo(.897645164, 21, 0, 20.1125667, 0, 19.000385), s.lineTo(0, 12.999615), s.bezierCurveTo(0, 12.2603805, .401930294, 11.6148368, 1, 11.268783), s.lineTo(1, 3.99742191), s.bezierCurveTo(1, 2.89427625, 1.88967395, 2, 2.991155, 2), s.lineTo(21.008845, 2), s.bezierCurveTo(22.1085295, 2, 23, 2.89092539, 23, 3.99742191), s.lineTo(23, 11.2672237), s.closePath(), s.fill(), s.stroke(), s.restore(), s.restore(), s.save(), s.strokeStyle = "#000000", s.lineWidth = 2, s.beginPath(), s.moveTo(22.5009348, 12.1337882), s.lineTo(22, 11.8452936), s.lineTo(22, 3.99742191), s.bezierCurveTo(22, 3.44392402, 21.5569554, 3, 21.008845, 3), s.lineTo(2.991155, 3), s.bezierCurveTo(2.44342393, 3, 2, 3.44509694, 2, 3.99742191), s.lineTo(2, 11.8455), s.lineTo(1.50082265, 12.1343329), s.bezierCurveTo(1.19247839, 12.3127464, 1, 12.6390115, 1, 12.999615), s.lineTo(1, 19.000385), s.bezierCurveTo(1, 19.5563739, 1.44601448, 20, 2.00494659, 20), s.lineTo(21.9950534, 20), s.bezierCurveTo(22.5510229, 20, 23, 19.5521213, 23, 19.000385), s.lineTo(23, 12.999615), s.bezierCurveTo(23, 12.6352349, 22.8086914, 12.311029, 22.5009348, 12.1337882), s.closePath(), s.fill(), s.stroke(), s.restore(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.moveTo(5, 6), s.lineTo(19, 6), s.quadraticCurveTo(19, 6, 19, 6), s.lineTo(19, 12), s.quadraticCurveTo(19, 12, 19, 12), s.lineTo(5, 12), s.quadraticCurveTo(5, 12, 5, 12), s.lineTo(5, 6), s.quadraticCurveTo(5, 6, 5, 6), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.arc(5.03571429, 16.0357143, 1.39285714, 0, 6.283185307179586, !0), s.closePath(), s.fill(), s.stroke(), s.restore(), s.save(), s.fillStyle = "#000000", s.beginPath(), s.arc(18.9642857, 16.0357143, 1.39285714, 0, 6.283185307179586, !0), s.closePath(), s.fill(), s.stroke(), s.restore(), s.restore(), s.restore(), s.restore(), s.restore(), s.restore(), s.restore()
        }, h.collide = function(t) {
            var e = t.parent,
                i = e.player,
                s = t.pos.x - this.x,
                n = t.pos.y - this.y,
                r = a(o(s, 2) + o(n, 2)),
                h = i._powerupsConsumed.misc,
                l = this.scene;
            if(30 > r && i.isAlive() && -1 === h.indexOf(this.id)) {
                h.push(this.id);
                var c = this.time * l.settings.drawFPS;
                i.setTempVehicle("TRUCK", c, {
                    x: this.x,
                    y: this.y
                }, e.dir), l.camera.playerFocus === i && (l.camera.focusOnPlayer(), l.vehicleTimer.playerAddedTime(i)), i.isGhost() === !1 && (this.hit = !0, this.sector.powerupCanvasDrawn = !1, this.scene.message.show("Truck Powerup!", 50, "#94d44e", !1))
            }
        }, e.exports = i
    }, {
        "../powerup": 19
    }],
    32: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("./tool"),
            n = (t("../../libs/lodash-3.10.1"), Math.sqrt, Math.pow, Math.round, function(t) {
                this.toolInit(t), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1;
                var e = t.scene.settings.brush;
                this.addedObjects = [], this.options = {
                    breakLength: e.breakLength,
                    maxBreakLength: e.maxBreakLength,
                    minBreakLength: e.minBreakLength,
                    breakLengthSensitivity: e.breakLengthSensitivity,
                    trailSpeed: e.trailSpeed,
                    maxTrailSpeed: e.maxTrailSpeed,
                    minTrailSpeed: e.minTrailSpeed,
                    trailSpeedSensitivity: e.trailSpeedSensitivity
                }
            }),
            r = n.prototype = new s;
        r.toolInit = r.init, r.toolUpdate = r.update, r.name = "Brush", r.p1 = null, r.p2 = null, r.active = !1, r.options = null, r.reset = function() {
            this.recordActionsToToolhandler(), this.active = !1
        }, r.recordActionsToToolhandler = function() {
            var t, e = this.addedObjects,
                i = e.length;
            if(i)
                for(t = 0; i > t; t++) this.toolhandler.addActionToTimeline({
                    type: "add",
                    objects: [e[t]]
                });
            this.addedObjects = []
        }, r.press = function() {
            if(this.recordActionsToToolhandler(), !this.active) {
                var t = this.mouse.touch.real;
                this.p1.x = t.x, this.p1.y = t.y, this.p2.x = t.x, this.p2.y = t.y, this.active = !0
            }
        }, r.hold = function() {
            var t = this.mouse.touch.real,
                e = this.p1,
                i = this.p2,
                s = this.options.trailSpeed,
                n = this.options.breakLength;
            i.inc(t.sub(i).factor(s));
            var r = screen.height + t.sub(i).len();
            if(r *= n, i.sub(e).lenSqr() > r) {
                var o = this.scene.track,
                    a = !1;
                a = "physics" === this.toolhandler.options.lineType ? o.addPhysicsLine(e.x, e.y, i.x, i.y) : o.addSceneryLine(e.x, e.y, i.x, i.y), a && this.addedObjects.push(a), e.equ(i), this.toolhandler.snapPoint.x = i.x, this.toolhandler.snapPoint.y = i.y
            }
            this.toolhandler.moveCameraTowardsMouse()
        }, r.release = function() {
            var t = this.p1,
                e = this.p2,
                i = this.scene.track,
                s = !1;
            s = "physics" === this.toolhandler.options.lineType ? i.addPhysicsLine(t.x, t.y, e.x, e.y) : i.addSceneryLine(t.x, t.y, e.x, e.y), s && this.addedObjects.push(s), this.recordActionsToToolhandler();
            var n = this.toolhandler,
                r = n.snapPoint;
            r.x = e.x, r.y = e.y, this.active = !1
        }, r.update = function() {
            var t = this.toolhandler.gamepad,
                e = this.mouse;
            t.isButtonDown("alt") ? e.mousewheel !== !1 && this.adjustTrailSpeed(e.mousewheel) : t.isButtonDown("shift") && e.mousewheel !== !1 && this.adjustBreakLength(e.mousewheel);
            var i = this.toolhandler;
            i.options.snap && (this.active = !0, this.p1.x = i.snapPoint.x, this.p1.y = i.snapPoint.y, this.p2.x = e.touch.real.x, this.p2.y = e.touch.real.y), this.toolUpdate()
        }, r.adjustTrailSpeed = function(t) {
            var e = this.options.trailSpeed,
                i = this.options.trailSpeedSensitivity,
                s = this.options.maxTrailSpeed,
                n = this.options.minTrailSpeed;
            t > 0 ? (e += i, e > s && (e = s)) : (e -= i, n > e && (e = n)), this.setOption("trailSpeed", e)
        }, r.adjustBreakLength = function(t) {
            var e = this.options.breakLength,
                i = this.options.breakLengthSensitivity,
                s = this.options.maxBreakLength,
                n = this.options.minBreakLength;
            t > 0 ? (e += i, e > s && (e = s)) : (e -= i, n > e && (e = n)), this.setOption("breakLength", e)
        }, r.setOption = function(t, e) {
            this.options[t] = e
        }, r.getOptions = function() {
            var t = this.toolhandler,
                e = this.options;
            return e.lineType = t.options.lineType, e.snap = t.options.snap, e
        }, r.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d")),
                i = t.camera,
                s = i.zoom;
            this.drawCursor(e), this.active && (this.drawLine(e, s), this.drawPoint(e, this.p1, s), this.drawPoint(e, this.p2, s))
        }, r.drawText = function(t) {
            var e = this.name,
                i = this.options.breakLength,
                s = this.options.trailSpeed,
                n = this.game.pixelRatio;
            t.fillStyle = "#000000", t.font = 12 * n + "pt arial", t.fillText(e, 10 * n, 20 * n), t.font = 8 * n + "pt arial", s = 0 | s, i = i, t.fillText("Trail speed : " + s, 10 * n, 40 * n), t.fillText("Break length : " + i, 10 * n, 60 * n)
        }, r.drawCursor = function(t) {
            var e = this.mouse.touch,
                i = e.real.toScreen(this.scene),
                s = this.camera.zoom,
                n = this.toolhandler,
                r = (n.options.lineType, n.options.grid),
                o = "#1884cf";
            if(r) {
                var a = 5 * s;
                t.beginPath(), t.moveTo(i.x, i.y - a), t.lineTo(i.x, i.y + a), t.moveTo(i.x - a, i.y), t.lineTo(i.x + a, i.y), t.lineWidth = 1 * s, t.stroke()
            } else t.beginPath(), t.arc(i.x, i.y, 1 * s, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = o, t.fill()
        }, r.drawPoint = function(t, e, i) {
            var s = e.toScreen(this.scene);
            t.beginPath(), t.arc(s.x, s.y, 1 * i, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = "#1884cf", t.fill()
        }, r.drawLine = function(t, e) {
            var i = this.scene,
                s = (i.game.canvas, 2 * e > .5 ? 2 * e : .5),
                n = this.toolhandler,
                r = n.options.lineType,
                o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(), t.lineWidth = s, t.lineCap = "round", t.strokeStyle = o;
            var a = this.p1.toScreen(this.scene),
                h = this.p2.toScreen(this.scene);
            t.moveTo(a.x, a.y), t.lineTo(h.x, h.y), t.stroke()
        }, e.exports = n
    }, {
        "../../libs/lodash-3.10.1": 83,
        "../math/cartesian": 14,
        "./tool": 47
    }],
    33: [function(t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
            s = function(t) {
                this.toolInit(t)
            },
            n = s.prototype = new i;
        n.toolInit = n.init, n.toolDraw = n.draw, n.name = "Camera", n.hold = function() {
            var t = this.mouse.touch,
                e = t.pos,
                i = this.camera,
                s = t.old.pos.sub(e).factor(1 / i.zoom);
            i.position.inc(s)
        }, n.draw = function() {
            {
                var t = this.scene;
                t.game.canvas, t.game.canvas.getContext("2d")
            }
        }, n.drawText = function(t) {
            {
                var e = this.name,
                    i = this.game.pixelRatio,
                    s = this.scene;
                s.game.canvas
            }
            t.fillStyle = "#000000", t.font = 12 * i + "pt arial", t.fillText(e, 10 * i, 20 * i), t.font = 8 * i + "pt arial"
        }, e.exports = s
    }, {
        "../math/cartesian": 14,
        "./tool": 47
    }],
    34: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("../math/curvedivision"),
            n = t("./tool"),
            r = Math.sqrt,
            o = Math.pow,
            a = function(t) {
                this.toolInit(t), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.midpoint = new i(0, 0), this.active = !1, this.options = {}
            },
            h = a.prototype = new n;
        h.toolInit = h.init, h.name = "Curve", h.active = !1, h.p1 = null, h.p2 = null, h.midpoint = null, h.anchoring = !1, h.options = null, h.getOptions = function() {
            var t = this.toolhandler,
                e = this.options;
            return e.lineType = t.options.lineType, e.snap = t.options.snap, e
        }, h.reset = function() {
            this.active = !1, this.anchoring = !1
        }, h.press = function() {
            if(!this.active) {
                this.active = !0;
                var t = this.mouse.touch.real;
                this.p1.x = t.x, this.p1.y = t.y
            }
        }, h.hold = function() {
            var t = this.mouse.touch.real;
            this.p2.x = t.x, this.p2.y = t.y;
            var e = this.p1,
                i = this.p2;
            this.midpoint.x = (e.x + i.x) / 2, this.midpoint.y = (e.y + i.y) / 2, this.toolhandler.moveCameraTowardsMouse()
        }, h.release = function() {
            var t = this.p1,
                e = this.p2,
                i = this.midpoint,
                s = this.toolhandler;
            if(this.anchoring) {
                if(i.x === e.x && i.y === e.y) {
                    var n = this.scene.track,
                        a = !1;
                    a = "physics" === s.options.lineType ? n.addPhysicsLine(t.x, t.y, e.x, e.y) : n.addSceneryLine(t.x, t.y, e.x, e.y), a && s.addActionToTimeline({
                        type: "add",
                        objects: [a]
                    }), s.snapPoint.x = e.x, s.snapPoint.y = e.y
                } else this.splitAndAddCurve();
                this.anchoring = !1, this.active = !1
            } else {
                var h = e.x - t.x,
                    l = e.y - t.y,
                    c = r(o(h, 2) + o(l, 2));
                c > 0 ? this.anchoring = !0 : this.active = !1
            }
        }, h.updateAnchor = function() {
            var t = this.mouse.touch.real;
            this.midpoint.x = t.x, this.midpoint.y = t.y
        }, h.splitAndAddCurve = function() {
            for(var t = (performance.now(), s(this.p1, this.midpoint, this.p2)), e = this.scene.track, i = t.length, n = this.toolhandler, r = [], o = 0; i - 2 > o; o += 2) {
                var a = t[o],
                    h = t[o + 1],
                    l = t[o + 2],
                    c = t[o + 3],
                    u = !1;
                u = "physics" === n.options.lineType ? e.addPhysicsLine(a, h, l, c) : e.addSceneryLine(a, h, l, c), u && r.push(u), n.snapPoint.x = l, n.snapPoint.y = c
            }
            r.length > 0 && n.addActionToTimeline({
                type: "add",
                objects: r
            })
        }, h.update = function() {
            var t = this.mouse,
                e = t.touch,
                i = t.secondaryTouch,
                s = this.toolhandler.gamepad,
                n = this.toolhandler;
            n.options.snap && (this.active = !0, this.p1 = n.snapPoint, this.anchoring || this.hold());
            var r = this.toolhandler.options,
                o = s.isButtonDown("shift");
            r.rightClickMove && (o = i.old.down), o ? (e.old.down || r.rightClickMove) && this.moveCamera() : (e.press && !this.anchoring && this.press(), e.old.down && !this.anchoring && this.hold(), e.release && this.release(), this.anchoring && this.updateAnchor()), t.mousewheel !== !1 && s.isButtonDown("shift") === !1 && this.mousewheel(t.mousewheel)
        }, h.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d")),
                i = t.camera,
                s = i.zoom;
            this.drawCursor(e, s), this.active && (this.drawLine(e, s), this.drawPoint(e, this.p1, s), this.drawPoint(e, this.p2, s))
        }, h.toScreen = function(t, e) {
            var i = this.scene.camera,
                s = this.scene.screen;
            return(t - i.position[e]) * i.zoom + s.center[e]
        }, h.drawCursor = function(t, e) {
            var i = this.mouse.touch,
                s = i.real.toScreen(this.scene),
                n = this.toolhandler,
                r = (n.options.lineType, n.options.grid),
                o = "#1884cf";
            if(r) {
                var a = 5 * e;
                t.beginPath(), t.moveTo(s.x, s.y - a), t.lineTo(s.x, s.y + a), t.moveTo(s.x - a, s.y), t.lineTo(s.x + a, s.y), t.lineWidth = 1 * e, t.stroke()
            } else t.beginPath(), t.arc(s.x, s.y, 1 * e, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = o, t.fill()
        }, h.drawPoint = function(t, e, i) {
            var s = e.toScreen(this.scene);
            t.beginPath(), t.arc(s.x, s.y, 1 * i, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = "#1884cf", t.fill()
        }, h.drawText = function(t) {
            {
                var e = this.name,
                    i = this.game.pixelRatio,
                    s = this.scene;
                s.game.canvas
            }
            t.fillStyle = "#000000", t.font = 12 * i + "pt arial", t.fillText(e, 10 * i, 20 * i), t.font = 8 * i + "pt arial"
        }, h.drawLine = function(t, e) {
            var i = this.scene,
                s = (i.game.canvas, 2 * e > .5 ? 2 * e : .5),
                n = this.toolhandler,
                r = n.options.lineType,
                o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(), t.lineWidth = s, t.lineCap = "round", t.strokeStyle = o;
            var a = this.p1.toScreen(this.scene),
                h = this.p2.toScreen(this.scene),
                l = this.midpoint.toScreen(this.scene);
            t.moveTo(a.x, a.y), t.quadraticCurveTo(l.x, l.y, h.x, h.y), t.stroke()
        }, e.exports = a
    }, {
        "../math/cartesian": 14,
        "../math/curvedivision": 15,
        "./tool": 47
    }],
    35: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("./tool"),
            n = t("../../libs/lodash-3.10.1"),
            r = Math.round,
            o = function(t) {
                this.toolInit(t);
                var e = t.scene.settings.eraser;
                this.options = e, this.eraserPoint = new i, this.erasedObjects = []
            },
            a = o.prototype = new s;
        a.toolInit = a.init, a.toolUpdate = a.update, a.name = "Eraser", a.options = null, a.reset = function() {
            this.recordActionsToToolhandler()
        }, a.press = function() {
            this.recordActionsToToolhandler()
        }, a.recordActionsToToolhandler = function() {
            this.erasedObjects.length > 0 && this.toolhandler.addActionToTimeline({
                type: "remove",
                objects: n.flatten(this.erasedObjects)
            }), this.erasedObjects = []
        }, a.release = function() {
            this.recordActionsToToolhandler()
        }, a.hold = function() {
            var t = this.mouse.touch,
                e = t.pos,
                i = this.scene.track,
                s = this.scene.screen,
                n = this.scene.camera,
                o = s.center,
                a = n.position,
                h = (e.x - o.x) / n.zoom + a.x,
                l = (e.y - o.y) / n.zoom + a.y;
            this.eraserPoint.x = r(h), this.eraserPoint.y = r(l);
            var c = i.erase(this.eraserPoint, this.options.radius / this.scene.camera.zoom, this.options.types);
            c.length > 0 && this.erasedObjects.push(c)
        }, a.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d"));
            this.drawEraser(e)
        }, a.drawEraser = function(t) {
            {
                var e = this.mouse.touch,
                    i = e.pos;
                this.camera.zoom
            }
            t.beginPath(), t.arc(i.x, i.y, this.options.radius, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = "rgba(255,255,255,0.8)", t.fill(), t.strokeStyle = "#000000", t.stroke()
        }, a.setOption = function(t, e) {
            this.options[t] = e
        }, a.getOptions = function() {
            return this.options
        }, a.update = function() {
            var t = this.toolhandler.gamepad,
                e = this.mouse;
            t.isButtonDown("shift") && e.mousewheel !== !1 && this.adjustRadius(e.mousewheel), this.toolUpdate()
        }, a.adjustRadius = function(t) {
            var e = this.options.radius,
                i = this.options.radiusSizeSensitivity,
                s = this.options.maxRadius,
                n = this.options.minRadius,
                r = t > 0 ? i : -i;
            e += r, n > e ? e = n : e > s && (e = s), this.setOption("radius", e)
        }, e.exports = o
    }, {
        "../../libs/lodash-3.10.1": 83,
        "../math/cartesian": 14,
        "./tool": 47
    }],
    36: [function(t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
            s = (Math.round, t("./poweruptools/gravitytool")),
            n = t("./poweruptools/goaltool"),
            r = t("./poweruptools/boosttool"),
            o = t("./poweruptools/slowmotool"),
            a = t("./poweruptools/checkpointtool"),
            h = t("./poweruptools/bombtool"),
            l = t("./poweruptools/antigravitytool"),
            c = t("./poweruptools/teleporttool"),
            u = function(t) {
                this.toolInit(t), this.powerupTools = {}, this.registerPowerupTools(), this.options = {
                    selected: "goal"
                }
            },
            p = u.prototype = new i;
        p.toolInit = p.init, p.toolUpdate = p.update, p.name = "Powerup", p.powerupTools = null, p.registerPowerupTools = function() {
            this.registerTool(new n(this.toolhandler)), this.registerTool(new r(this.toolhandler)), this.registerTool(new s(this.toolhandler)), this.registerTool(new o(this.toolhandler)), this.registerTool(new h(this.toolhandler)), this.registerTool(new a(this.toolhandler)), this.registerTool(new l(this.toolhandler)), this.registerTool(new c(this.toolhandler))
        }, p.registerTool = function(t) {
            this.powerupTools[t.name] = t
        }, p.setOption = function(t, e) {
            this.options[t] = e
        }, p.getOptions = function() {
            return this.options
        }, p.update = function() {
            var t = this.toolhandler.gamepad,
                e = (this.mouse, this.options);
            t.isButtonDown("opt1") && (e.selected = "goal", t.setButtonUp("opt1")), t.isButtonDown("opt2") && (e.selected = "boost", t.setButtonUp("opt2")), t.isButtonDown("opt3") && (e.selected = "gravity", t.setButtonUp("opt3")), t.isButtonDown("opt4") && (e.selected = "slowmo", t.setButtonUp("opt4")), t.isButtonDown("opt5") && (e.selected = "bomb", t.setButtonUp("opt5")), t.isButtonDown("opt6") && (e.selected = "checkpoint", t.setButtonUp("opt6")), t.isButtonDown("opt7") && (e.selected = "antigravity", t.setButtonUp("opt7")), t.isButtonDown("opt8") && Application.User.get("classic") && (e.selected = "teleport", t.setButtonUp("opt8")), this.toolUpdate()
        }, p.press = function() {
            var t = this.options.selected;
            this.powerupTools[t].press()
        }, p.hold = function() {
            var t = this.options.selected;
            this.powerupTools[t].hold()
        }, p.release = function() {
            var t = this.options.selected;
            this.powerupTools[t].release()
        }, p.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d")),
                i = this.options;
            this.powerupTools[i.selected].draw(e)
        }, e.exports = u
    }, {
        "../math/cartesian": 14,
        "./poweruptools/antigravitytool": 37,
        "./poweruptools/bombtool": 38,
        "./poweruptools/boosttool": 39,
        "./poweruptools/checkpointtool": 40,
        "./poweruptools/goaltool": 41,
        "./poweruptools/gravitytool": 42,
        "./poweruptools/slowmotool": 43,
        "./poweruptools/teleporttool": 44,
        "./tool": 47
    }],
    37: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/antigravity"),
            r = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "antigravity", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.settings.device,
                n = this.scene.screen;
            if(this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x"),
                    o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            } else if("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x"),
                    o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y;
            var i = this.scene.track,
                s = new n(this.p1.x, this.p1.y, i);
            i.addPowerup(s), this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [s]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/antigravity": 20,
        "../tool": 47
    }],
    38: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/bomb"),
            r = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "bomb", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.settings.device,
                n = this.scene.screen;
            if(this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x"),
                    o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            } else if("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x"),
                    o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/bomb": 21,
        "../tool": 47
    }],
    39: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/boost"),
            r = Math.PI,
            o = Math.atan2,
            a = Math.pow,
            h = Math.sqrt,
            l = Math.max,
            c = Math.min,
            u = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            p = u.prototype = new s;
        p.toolInit = p.init, p.toolUpdate = p.update, p.powerup = null, p.name = "boost", p.p1 = null, p.p2 = null, p.active = !1, p.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, p.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, p.release = function() {
            var t = this.scene.track,
                e = new n(this.p1.x, this.p1.y, this.powerup.angle, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, p.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.screen,
                n = this.scene.settings.device;
            if(this.active === !0) {
                var a = s.realToScreen(this.p1.x, "x"),
                    h = s.realToScreen(this.p1.y, "y"),
                    l = this.p1,
                    c = this.p2,
                    u = l.y - c.y,
                    p = l.x - c.x,
                    d = o(l.y - c.y, l.x - c.x);
                0 === p && 0 === u && (d = r - r / 2), 0 > d && (d += 2 * r), this.drawPathToMouse(t, d), this.powerup.angle = d * (180 / r) - 90 | 0, this.powerup.draw(a, h, i, t)
            } else if("desktop" === n) {
                t.globalAlpha = .8, this.powerup.angle = 0;
                var a = s.realToScreen(e.real.x, "x"),
                    h = s.realToScreen(e.real.y, "y");
                this.powerup.draw(a, h, i, t), t.globalAlpha = 1
            }
        }, p.drawPathToMouse = function(t, e) {
            var i = this.p1,
                s = this.p2,
                n = this.scene.screen,
                o = this.scene.camera.zoom,
                u = n.realToScreen(i.x, "x"),
                p = n.realToScreen(i.y, "y"),
                d = n.realToScreen(s.x, "x"),
                f = n.realToScreen(s.y, "y"),
                v = h(a(d - u, 2) + a(f - p, 2));
            30 * o > v && (v = 30 * o), t.strokeStyle = "#ADCF7D", t.lineWidth = l(1, 2 * o), t.beginPath(), t.moveTo(u, p), t.lineTo(u + v, p), t.stroke(), t.beginPath(), t.moveTo(u, p), t.lineTo(d, f), t.stroke(), t.closePath();
            var g = e + 180 * (r / 180),
                m = c(v, 50 * o);
            t.beginPath(), t.moveTo(u, p), t.arc(u, p, m, g, 0, !1), t.moveTo(u, p), t.stroke(), t.fillStyle = "rgba(173, 207, 125,0.2)", t.fill(), t.closePath()
        }, e.exports = u
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/boost": 22,
        "../tool": 47
    }],
    40: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/checkpoint"),
            r = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "checkpoint", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.settings.device,
                n = this.scene.screen;
            if(this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x"),
                    o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            } else if("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x"),
                    o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/checkpoint": 23,
        "../tool": 47
    }],
    41: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/target"),
            r = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "goal", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.settings.device,
                n = this.scene.screen;
            if(this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x"),
                    o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            } else if("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x"),
                    o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, t);
            t.addTarget(e), t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/target": 26,
        "../tool": 47
    }],
    42: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/gravity"),
            r = Math.PI,
            o = Math.atan2,
            a = Math.pow,
            h = Math.sqrt,
            l = Math.max,
            c = Math.min,
            u = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            p = u.prototype = new s;
        p.toolInit = p.init, p.toolUpdate = p.update, p.powerup = null, p.name = "gravity", p.p1 = null, p.p2 = null, p.active = !1, p.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, p.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, p.release = function() {
            var t = this.scene.track,
                e = new n(this.p1.x, this.p1.y, this.powerup.angle - 180, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, p.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.screen,
                n = this.scene.settings.device;
            if(this.active === !0) {
                var a = s.realToScreen(this.p1.x, "x"),
                    h = s.realToScreen(this.p1.y, "y"),
                    l = this.p1,
                    c = this.p2,
                    u = l.y - c.y,
                    p = l.x - c.x,
                    d = o(l.y - c.y, l.x - c.x);
                0 === p && 0 === u && (d = r - r / 2), 0 > d && (d += 2 * r), this.drawPathToMouse(t, d), this.powerup.angle = d * (180 / r) + 90 | 0, this.powerup.draw(a, h, i, t)
            } else if("desktop" === n) {
                t.globalAlpha = .8, this.powerup.angle = 180;
                var a = s.realToScreen(e.real.x, "x"),
                    h = s.realToScreen(e.real.y, "y");
                this.powerup.draw(a, h, i, t), t.globalAlpha = 1
            }
        }, p.drawPathToMouse = function(t, e) {
            var i = this.p1,
                s = this.p2,
                n = this.scene.screen,
                o = this.scene.camera.zoom,
                u = n.realToScreen(i.x, "x"),
                p = n.realToScreen(i.y, "y"),
                d = n.realToScreen(s.x, "x"),
                f = n.realToScreen(s.y, "y"),
                v = h(a(d - u, 2) + a(f - p, 2));
            30 * o > v && (v = 30 * o), t.strokeStyle = "#A2B7D2", t.lineWidth = l(1, 2 * o), t.beginPath(), t.moveTo(u, p), t.lineTo(u + v, p), t.stroke(), t.beginPath(), t.moveTo(u, p), t.lineTo(d, f), t.stroke(), t.closePath();
            var g = e + 180 * (r / 180),
                m = c(v, 50 * o);
            t.beginPath(), t.moveTo(u, p), t.arc(u, p, m, g, 0, !1), t.moveTo(u, p), t.stroke(), t.fillStyle = "rgba(162, 183, 210,0.2)", t.fill(), t.closePath()
        }, e.exports = u
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/gravity": 24,
        "../tool": 47
    }],
    43: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/slowmo"),
            r = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "slowmo", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.settings.device,
                n = this.scene.screen;
            if(this.active === !0) {
                var r = n.realToScreen(this.p1.x, "x"),
                    o = n.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            } else if("desktop" === s) {
                var r = n.realToScreen(e.real.x, "x"),
                    o = n.realToScreen(e.real.y, "y");
                t.globalAlpha = .8, this.powerup.draw(r, o, i, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/slowmo": 25,
        "../tool": 47
    }],
    44: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/powerups/teleport"),
            r = Math.PI,
            o = Math.atan2,
            a = Math.pow,
            h = Math.sqrt,
            l = Math.max,
            c = (Math.min, Math.abs),
            u = function(t) {
                this.toolInit(t), this.powerup = new n(0, 0, t.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1
            },
            p = u.prototype = new s;
        p.toolInit = p.init, p.toolUpdate = p.update, p.powerup = null, p.portal1 = null, p.name = "teleport", p.p1 = null, p.p2 = null, p.active = !1, p.press = function() {
            var t = this.mouse.touch,
                e = t.real,
                i = (this.scene.screen, this.scene.track);
            this.p1.x = e.x, this.p1.y = e.y, this.portal1 = new n(this.p1.x, this.p1.y, i), this.active = !0
        }, p.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, p.release = function() {
            var t = c(this.p2.x - this.p1.x),
                e = c(this.p2.y - this.p1.y);
            if(t > 40 || e > 40) {
                var i = this.scene.track;
                this.portal2 = new n(this.p2.x, this.p2.y, i), this.portal1.addOtherPortalRef(this.portal2), this.portal2.addOtherPortalRef(this.portal1), i.addPowerup(this.portal1), i.addPowerup(this.portal2), this.toolhandler.addActionToTimeline({
                    type: "add",
                    objects: [this.portal1, this.portal2]
                }), this.active = !1
            } else this.active = !1, this.portal1 = null
        }, p.draw = function(t) {
            var e = this.mouse.touch,
                i = (e.pos, this.camera.zoom),
                s = this.scene.screen,
                n = this.scene.settings.device;
            if(this.active === !0) {
                var a = s.realToScreen(this.p1.x, "x"),
                    h = s.realToScreen(this.p1.y, "y"),
                    l = s.realToScreen(this.p2.x, "x"),
                    c = s.realToScreen(this.p2.y, "y"),
                    u = this.p1,
                    p = this.p2,
                    d = u.y - p.y,
                    f = u.x - p.x,
                    v = o(u.y - p.y, u.x - p.x);
                0 === f && 0 === d && (v = r - r / 2), 0 > v && (v += 2 * r), this.drawPathToMouse(t, v), this.portal1.draw(a, h, i, t), this.powerup.draw(l, c, i, t)
            } else if("desktop" === n) {
                t.globalAlpha = .8;
                var g = s.realToScreen(e.real.x, "x"),
                    m = s.realToScreen(e.real.y, "y");
                this.powerup.draw(g, m, i, t), t.globalAlpha = 1
            }
        }, p.drawPathToMouse = function(t) {
            var e = this.p1,
                i = this.p2,
                s = this.scene.screen,
                n = this.scene.camera.zoom,
                r = s.realToScreen(e.x, "x"),
                o = s.realToScreen(e.y, "y"),
                c = s.realToScreen(i.x, "x"),
                u = s.realToScreen(i.y, "y"),
                p = h(a(c - r, 2) + a(u - o, 2));
            30 * n > p && (p = 30 * n), t.strokeStyle = "#dd45ec", t.lineWidth = l(1, 2 * n), t.beginPath(), t.moveTo(r, o), t.lineTo(c, u), t.stroke(), t.closePath()
        }, e.exports = u
    }, {
        "../../math/cartesian": 14,
        "../../sector/powerups/teleport": 27,
        "../tool": 47
    }],
    45: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("./tool"),
            n = t("../utils/path"),
            r = t("../sector/physicsline"),
            o = t("../sector/sceneryline"),
            a = Math.min,
            h = Math.max,
            l = Math.abs,
            c = function(t) {
                this.toolInit(t), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.selectedElements = [], this.dashOffset = 0
            },
            u = c.prototype = new s;
        u.toolInit = u.init, u.name = "Select", u.passive = !1, u.active = !1, u.p1 = null, u.p2 = null, u.selectedElements = [], u.dashOffset = 0, u.selectedSectors = [], u.press = function() {
            var t = this.mouse.touch.real;
            this.passive = !1, this.active = !0, this.p1.x = t.x, this.p1.y = t.y, this.p2.x = t.x, this.p2.y = t.y
        }, u.hold = function() {
            var t = this.mouse.touch.real;
            this.p2.x = t.x, this.p2.y = t.y
        }, u.unselectElements = function() {
            for(var t = this.selectedElements, e = t.length, i = 0; e > i; i++) {
                var s = t[i];
                s instanceof r && s.highlightLine(!1), s instanceof o && s.highlightLine(!1)
            }
        }, u.release = function() {
            this.unselectElements();
            for(var t = (performance.now(), this.scene.track.select(this.p1, this.p2)), e = t.length, i = [], s = 0; e > s; s++) {
                var n = t[s];
                this.intersectsLine(n.p1, n.p2) && (n.removeAllReferences(), i.push(n))
            }
            this.selectedElements = i, this.active = !1, this.passive = !0
        }, u.buildPaths = function(t) {
            for(var e = []; t.length > 0;) {
                var i = new n;
                i.build(t), e.push(i)
            }
        }, u.intersectsLine = function(t, e) {
            var i = a(this.p1.y, this.p2.y),
                s = a(this.p1.x, this.p2.x),
                n = h(this.p1.y, this.p2.y),
                r = h(this.p1.x, this.p2.x),
                o = l(r - s),
                c = l(i - n),
                u = t.x,
                p = e.x;
            if(t.x > e.x && (u = e.x, p = t.x), p > s + o && (p = s + o), s > u && (u = s), u > p) return !1;
            var d = t.y,
                f = e.y,
                v = e.x - t.x;
            if(l(v) > 1e-7) {
                var g = (e.y - t.y) / v,
                    m = t.y - g * t.x;
                d = g * u + m, f = g * p + m
            }
            if(d > f) {
                var y = f;
                f = d, d = y
            }
            return f > i + c && (f = i + c), i > d && (d = i), d > f ? !1 : !0
        }, u.toScreen = function(t, e) {
            var i = this.scene.camera,
                s = this.scene.screen;
            return(t - i.position[e]) * i.zoom + s.center[e]
        }, u.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d"));
            if(this.drawText(e), this.active || this.passive) {
                var i = this.p1.toScreen(this.scene),
                    s = this.p2.toScreen(this.scene),
                    n = s.x - i.x,
                    r = s.y - i.y;
                e.save(), e.setLineDash && (e.setLineDash([6]), e.lineDashOffset = this.dashOffset), this.active ? (e.beginPath(), e.rect(i.x, i.y, n, r), e.fillStyle = "rgba(24, 132, 207, 0.3)", e.fill(), e.lineWidth = 2, e.strokeStyle = "rgba(24, 132, 207, 0.7)", e.stroke()) : this.passive && (e.strokeStyle = "rgba(24, 132, 207, 0.7)", e.lineWidth = 2, e.strokeRect(i.x, i.y, n, r)), e.restore(), this.dashOffset > 22 && (this.dashOffset = 0), this.dashOffset++
            }
        }, u.reset = function() {
            this.p1.x = 0, this.p1.y = 0, this.p2.x = 0, this.p2.y = 0, this.active = !1, this.passive = !1, this.unselectElements()
        }, u.drawSectors = function() {
            for(var t = this.scene, e = t.camera, i = t.screen, s = t.game.canvas.getContext("2d"), n = e.zoom, r = e.position, o = t.screen.center, a = this.settings.drawSectorSize * n, h = r.x * n / a, l = r.y * n / a, c = i.width / a, u = i.height / a, p = u / 2, d = c / 2, f = h - d - 1, v = l - p - 1, g = h + d, m = l + p, y = this.totalSectors, w = y.length, _ = 0; w > _; _++) {
                var x = y[_],
                    b = x.row,
                    T = x.column;
                if(T >= f && g >= T && b >= v && m >= b) {
                    x.drawn === !1 && x.image === !1 && x.draw();
                    var k = T * a - h * a + o.x,
                        C = b * a - l * a + o.y;
                    k = 0 | k, C = 0 | C, x.image ? s.drawImage(x.image, k, C) : s.drawImage(x.canvas, k, C)
                } else x.drawn && x.clear()
            }
        }, u.drawText = function(t) {
            {
                var e = this.name,
                    i = this.game.pixelRatio,
                    s = this.scene;
                s.game.canvas, this.radius
            }
            t.save(), t.fillStyle = "#000000", t.font = 12 * i + "pt arial", t.fillText(e, 10 * i, 20 * i), t.font = 8 * i + "pt arial"
        }, u.close = function() {
            this.dashOffset = 0, this.selectedElements = [], this.mouse = null, this.camera = null, this.scene = null, this.toolHandler = null, this.p2 = null, this.p1 = null, this.active = !1, this.passive = !1
        }, e.exports = c
    }, {
        "../math/cartesian": 14,
        "../sector/physicsline": 18,
        "../sector/sceneryline": 28,
        "../utils/path": 60,
        "./tool": 47
    }],
    46: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("./tool"),
            n = (Math.sqrt, Math.pow, function(t) {
                this.game = t.scene.game, this.toolInit(t), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.active = !1, this.shouldDrawMetadata = !1, this.options = {}
            }),
            r = n.prototype = new s;
        r.toolInit = r.init, r.toolUpdate = r.update, r.toolDraw = r.draw, r.name = "StraightLine", r.p1 = null, r.p2 = null, r.active = !1, r.reset = function() {
            this.active = !1
        }, r.press = function() {
            if(!this.active) {
                var t = this.mouse.touch.real;
                this.p1.x = t.x, this.p1.y = t.y, this.active = !0
            }
        }, r.getOptions = function() {
            var t = this.toolhandler,
                e = this.options;
            return e.lineType = t.options.lineType, e.snap = t.options.snap, e
        }, r.hold = function() {
            var t = this.mouse.touch.real;
            this.p2.x = t.x, this.p2.y = t.y, this.toolhandler.moveCameraTowardsMouse()
        }, r.release = function() {
            var t = this.p1,
                e = this.p2,
                i = this.scene.track,
                s = this.toolhandler,
                n = !1;
            n = "physics" === s.options.lineType ? i.addPhysicsLine(t.x, t.y, e.x, e.y) : i.addSceneryLine(t.x, t.y, e.x, e.y), n && s.addActionToTimeline({
                type: "add",
                objects: [n]
            });
            var r = s.snapPoint;
            r.x = e.x, r.y = e.y, this.active = !1
        }, r.update = function() {
            this.toolUpdate();
            var t = this.toolhandler,
                e = t.gamepad;
            t.options.snap && (this.active = !0, this.p1 = t.snapPoint, this.hold()), this.shouldDrawMetadata = e.isButtonDown("ctrl") ? !0 : !1
        }, r.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d")),
                i = t.camera,
                s = i.zoom;
            e.save(), this.drawCursor(e), this.active && (this.drawLine(e, s), this.drawPoint(e, this.p1, s), this.drawPoint(e, this.p2, s), this.drawPointData(e, this.p2, s)), e.restore()
        }, r.drawCursor = function(t) {
            var e = this.mouse.touch,
                i = e.real.toScreen(this.scene),
                s = this.camera.zoom,
                n = this.toolhandler,
                r = (n.options.lineType, n.options.grid),
                o = "#1884cf";
            if(r) {
                var a = 5 * s;
                t.beginPath(), t.moveTo(i.x, i.y - a), t.lineTo(i.x, i.y + a), t.moveTo(i.x - a, i.y), t.lineTo(i.x + a, i.y), t.lineWidth = 1 * s, t.closePath(), t.stroke()
            } else t.lineWidth = 1, t.fillStyle = o, t.beginPath(), t.arc(i.x, i.y, 1 * s, 0, 2 * Math.PI, !1), t.closePath(), t.fill()
        }, r.drawPoint = function(t, e, i) {
            var s = e.toScreen(this.scene);
            t.beginPath(), t.arc(s.x, s.y, 1 * i, 0, 2 * Math.PI, !1), t.lineWidth = 1, t.fillStyle = "#1884cf", t.fill()
        }, r.drawPointData = function(t, e) {
            var i = e.toScreen(this.scene);
            if(this.shouldDrawMetadata) {
                var s = this.p1.getAngleInDegrees(this.p2);
                s = s.toFixed(2);
                var n = this.game.pixelRatio;
                t.fillStyle = "#000000", t.font = 8 * n + "pt arial", t.fillText("" + s + "°", i.x + 10, i.y + 10), t.strokeText("" + s + "°", i.x + 10, i.y + 10)
            }
        }, r.drawLine = function(t, e) {
            var i = this.scene,
                s = (i.game.canvas, 2 * e > .5 ? 2 * e : .5),
                n = this.toolhandler,
                r = n.options.lineType,
                o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(), t.lineWidth = s, t.lineCap = "round", t.strokeStyle = o;
            var a = this.p1.toScreen(this.scene),
                h = this.p2.toScreen(this.scene);
            t.moveTo(a.x, a.y), t.lineTo(h.x, h.y), t.stroke()
        }, e.exports = n
    }, {
        "../math/cartesian": 14,
        "./tool": 47
    }],
    47: [function(t, e) {
        var i = (t("../math/cartesian"), Math.round, function() {});
        i.prototype = {
            name: "",
            toolhandler: null,
            camera: null,
            mouse: null,
            scene: null,
            init: function(t) {
                this.toolhandler = t, this.scene = t.scene, this.game = t.scene.game, this.camera = t.scene.camera, this.mouse = t.scene.mouse, this.gamepad = t.gamepad
            },
            press: function() {},
            hold: function() {},
            release: function() {},
            update: function() {
                var t = this.mouse,
                    e = t.touch,
                    i = t.secondaryTouch,
                    s = this.toolhandler.gamepad,
                    n = this.toolhandler.options,
                    r = s.isButtonDown("shift");
                n.rightClickMove && (r = i.old.down), r ? (e.old.down || n.rightClickMove) && this.moveCamera() : (e.press && this.press(), e.old.down && this.hold(), e.release && this.release()), t.mousewheel !== !1 && s.isButtonDown("shift") === !1 && this.mousewheel(t.mousewheel)
            },
            moveCamera: function() {
                var t = this.mouse.secondaryTouch,
                    e = t.pos,
                    i = this.camera,
                    s = t.old.pos.sub(e).factor(1 / i.zoom);
                i.position.inc(s)
            },
            draw: function() {},
            reset: function() {},
            mousewheel: function(t) {
                var e = this.scene.settings,
                    i = this.scene.game.pixelRatio,
                    s = e.cameraSensitivity,
                    n = e.cameraZoomMin,
                    r = e.cameraZoomMax,
                    o = n * i,
                    a = r * i,
                    h = this.camera,
                    l = this.mouse.touch,
                    c = h.desiredZoom;
                c += t * s, h.setZoom(c / i, l.pos), h.desiredZoom < o ? h.setZoom(n, l.pos) : h.desiredZoom > a && h.setZoom(r, l.pos)
            },
            checkKeys: function() {
                var t = this.gamepad,
                    e = this.name.toLowerCase(),
                    i = this.toolhandler;
                t.isButtonDown(e) && (i.setTool(e), t.setButtonUp(e))
            },
            getOptions: function() {
                return {}
            },
            close: function() {}
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    48: [function(t, e) {
        var i = t("../math/cartesian"),
            s = (t("../utils/canvaspool"), Math.sqrt, Math.pow, Math.floor),
            n = t("../sector/physicsline"),
            r = t("../sector/sceneryline"),
            o = t("../sector/powerups/target"),
            a = 50,
            h = function(t) {
                this.currentTool = "", this.scene = t, this.camera = t.camera, this.mouse = t.mouse, this.mouse.updateCallback = this.draw.bind(this), this.gamepad = t.playerManager.firstPlayer.getGamepad(), this.tools = {}, this.options = t.settings.toolHandler, this.snapPoint = new i, this.snapPoint.equ(this.scene.track.defaultLine.p2), this.gridCache = !1, this.initAnalytics(), this.actionTimeline = [], this.actionTimelinePointer = 0
            };
        h.prototype = {
            currentTool: "",
            scene: null,
            camera: null,
            mouse: null,
            tools: {},
            gamepad: null,
            gridCache: !1,
            gridCacheAlpha: 1,
            gridUseEnabled: !1,
            snapPoint: !1,
            options: null,
            initAnalytics: function() {
                this.analytics = {
                    actions: 0
                }
            },
            enableGridUse: function() {
                this.gridUseEnabled = !0
            },
            getToolOptions: function() {
                return this.tools[this.currentTool].getOptions()
            },
            setToolOption: function(t, e, i) {
                "undefined" != typeof i && "undefined" != typeof this.tools[i] ? this.tools[i].setOption(t, e) : this.tools[this.currentTool].setOption(t, e)
            },
            registerTool: function(t) {
                var t = new t(this),
                    e = t.name.toLowerCase();
                this.tools[e] = t
            },
            setTool: function(t) {
                var t = t.toLowerCase(),
                    e = this.scene;
                this.currentTool !== t && (this.resetTool(), this.currentTool = t, null != e.state && (e.state.tool = this.currentTool, e.state.toolOptions = this.getToolOptions()), this.analytics.actions++)
            },
            addActionToTimeline: function(t) {
                this.actionTimeline.length >= a && (this.actionTimeline.splice(0, this.actionTimeline.length - a), this.actionTimelinePointer = a), this.actionTimeline.splice(this.actionTimelinePointer), this.actionTimeline.push(t), this.actionTimelinePointer++
            },
            revertAction: function() {
                var t = this.actionTimelinePointer;
                if(t > 0) {
                    var e = this.actionTimeline[t - 1];
                    switch(t--, e.type) {
                        case "add":
                            this.removeObjects(e.objects);
                            break;
                        case "remove":
                            this.addObjects(e.objects)
                    }
                    this.actionTimelinePointer = t
                }
            },
            applyAction: function() {
                var t = this.actionTimeline,
                    e = this.actionTimelinePointer;
                if(e < t.length) {
                    var i = this.actionTimeline[e];
                    switch(e++, i.type) {
                        case "add":
                            this.addObjects(i.objects);
                            break;
                        case "remove":
                            this.removeObjects(i.objects)
                    }
                    this.actionTimelinePointer = e
                }
            },
            removeObjects: function(t) {
                for(var e = t.length, i = 0; e > i; i++) {
                    var s = t[i];
                    s.remove = !0, s.removeAllReferences()
                }
                this.scene.track.cleanTrack()
            },
            addObjects: function(t) {
                for(var e = t.length, i = this.scene.track, s = 0; e > s; s++) {
                    var a = t[s];
                    a instanceof n ? (a.remove = !1, i.addPhysicsLineToTrack(a)) : a instanceof r ? (a.remove = !1, i.addSceneryLineToTrack(a)) : a instanceof o ? (a.remove = !1, i.addTarget(a), i.addPowerup(a)) : (a.remove = !1, i.addPowerup(a))
                }
            },
            resetTool: function() {
                "" !== this.currentTool && this.tools[this.currentTool].reset()
            },
            update: function() {
                this.checkGrid(), this.mouse.enabled && this.tools[this.currentTool].update(), this.checkHotkeys(), this.checkMouse(), this.checkSnap()
            },
            checkGrid: function() {
                var t = this.scene.camera;
                t.zoom !== t.desiredZoom && (this.gridCache = !1)
            },
            checkSnap: function() {
                this.options.snapLocked && (this.options.snap = !0)
            },
            moveCameraTowardsMouse: function() {
                if(this.options.cameraLocked === !1) {
                    var t = this.scene.screen,
                        e = 100,
                        i = t.height - e,
                        s = 0 + e,
                        n = t.width - e,
                        r = 0 + e,
                        o = this.options.cameraMoveSpeed,
                        a = t.center,
                        h = this.camera,
                        l = this.mouse.touch,
                        c = l.pos.x,
                        u = l.pos.y,
                        p = .8 * (c - a.x),
                        d = u - a.y;
                    (c >= n || r >= c || u >= i || s >= u) && (h.position.x += p * o * (1 / h.zoom), h.position.y += d * o * (1 / h.zoom))
                }
            },
            checkMouse: function() {
                var t = this.mouse.touch,
                    e = this.mouse.secondaryTouch;
                (t.press || e.press) && this.press()
            },
            press: function() {
                this.camera.unfocus()
            },
            checkHotkeys: function() {
                var t = this.gamepad,
                    e = this.options.snap,
                    i = this.options.snapLocked,
                    s = this.options.rightClickMove,
                    n = t.isButtonDown("alt");
                s && (n = t.isButtonDown("shift")), n && !e ? this.toggleQuickSnap() : n || !e || i || this.toggleQuickSnap(), t.isButtonDown("ctrl") && t.isButtonDown("z") && (t.setButtonUp("z"), this.revertAction()), t.isButtonDown("ctrl") && t.isButtonDown("y") && (t.setButtonUp("y"), this.applyAction());
                var r = this.tools;
                for(var o in r) {
                    var a = r[o];
                    a.checkKeys()
                }
                this.gridUseEnabled && t.isButtonDown("grid") && (t.setButtonUp("grid"), this.toggleGrid()), t.isButtonDown("zoom_increase") && (t.setButtonUp("zoom_increase"), this.scene.camera.increaseZoom()), t.isButtonDown("zoom_decrease") && (t.setButtonUp("zoom_decrease"), this.scene.camera.decreaseZoom()), t.isButtonDown("zoom_100") && (t.setButtonUp("zoom_100"), this.scene.camera.resetZoom()), t.isButtonDown("lineType") && (t.setButtonUp("lineType"), this.toggleLineType())
            },
            toggleLineType: function() {
                var t = this.options.lineType;
                this.options.lineType = "physics" === t ? "scenery" : "physics"
            },
            toggleGrid: function() {
                this.options.grid = !this.options.grid
            },
            toggleSnap: function() {
                this.options.snap = !this.options.snap, this.options.snapLocked = !this.options.snapLocked, this.resetTool()
            },
            toggleQuickSnap: function() {
                this.options.snapLocked || (this.options.snap = !this.options.snap, this.resetTool())
            },
            toggleCameraLock: function() {
                this.options.cameraLocked = !this.options.cameraLocked
            },
            draw: function() {
                this.scene.game.pixelRatio, this.scene.game.canvas.getContext("2d");
                this.mouse.enabled && this.tools[this.currentTool].draw()
            },
            drawGrid: function() {
                var t = this.scene.game.pixelRatio,
                    e = this.scene.game.canvas.getContext("2d");
                this.options.grid === !0 && this.options.visibleGrid && this.drawCachedGrid(e, t)
            },
            drawCachedGrid: function(t, e) {
                this.gridCache === !1 && this.cacheGrid(e);
                var i = this.gridCache,
                    s = i.width,
                    n = i.height,
                    r = this.scene.screen,
                    o = r.center,
                    a = (o.x / s | 0) + 2,
                    h = (o.y / n | 0) + 2,
                    l = this.camera.zoom,
                    c = this.camera.position.x * l % s,
                    u = this.camera.position.y * l % n;
                t.globalAlpha = this.gridCacheAlpha;
                for(var p = -a; a > p; p++)
                    for(var d = -h; h > d; d++) {
                        var f = p * s - c + o.x,
                            v = d * n - u + o.y;
                        t.drawImage(i, 0, 0, n, s, f, v, s, n)
                    }
                t.globalAlpha = 1
            },
            cacheGrid: function() {
                var t = this.scene.camera.zoom,
                    e = 200 * t,
                    i = 200 * t,
                    n = this.options.gridSize,
                    r = n * t,
                    o = document.createElement("canvas");
                o.width = e, o.height = i;
                var a = o.getContext("2d");
                a.strokeStyle = this.options.gridMinorLineColor, a.strokeWidth = 1, a.beginPath();
                var h = null,
                    l = null,
                    c = null,
                    u = null;
                for(h = s(e / r), l = 0; h >= l; l++) c = l * r, a.moveTo(c, 0), a.lineTo(c, i), a.stroke();
                for(h = s(i / r), l = 0; h >= l; l++) u = l * r, a.moveTo(0, u), a.lineTo(e, u), a.stroke();
                a.beginPath(), a.rect(0, 0, e, i), a.lineWidth = 2, a.strokeStyle = this.options.gridMajorLineColor, a.stroke(), a.closePath(), this.gridCache = o, this.gridCacheAlpha = Math.min(t + .2, 1)
            },
            resize: function() {
                var t = this.scene.game.pixelRatio;
                this.cacheGrid(t)
            },
            undo: function() {},
            redo: function() {},
            close: function() {
                this.actionTimeline = [], this.actionTimelinePointer = 0, this.tools = null, this.mouse = null, this.scene = null, this.camera = null, this.options.grid = !1, this.options = null, this.gridCache = null
            }
        }, e.exports = h
    }, {
        "../math/cartesian": 14,
        "../sector/physicsline": 18,
        "../sector/powerups/target": 26,
        "../sector/sceneryline": 28,
        "../utils/canvaspool": 54
    }],
    49: [function(t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
            s = (Math.round, t("./vehiclepoweruptools/helicoptertool")),
            n = t("./vehiclepoweruptools/trucktool"),
            r = function(t) {
                this.toolInit(t), this.powerupTools = {}, this.options = t.scene.settings.vehiclePowerup, this.registerPowerupTools()
            },
            o = r.prototype = new i;
        o.toolInit = o.init, o.toolUpdate = o.update, o.name = "vehiclepowerup", o.powerupTools = null, o.registerPowerupTools = function() {
            this.registerTool(new s(this, this.toolhandler)), this.registerTool(new n(this, this.toolhandler))
        }, o.registerTool = function(t) {
            this.powerupTools[t.name] = t
        }, o.setOption = function(t, e) {
            this.options[t] = e
        }, o.getOptions = function() {
            return this.options
        }, o.update = function() {
            this.toolhandler.gamepad, this.mouse, this.options;
            this.toolUpdate()
        }, o.press = function() {
            var t = this.options.selected;
            this.powerupTools[t].press()
        }, o.hold = function() {
            var t = this.options.selected;
            this.powerupTools[t].hold()
        }, o.release = function() {
            var t = this.options.selected;
            this.powerupTools[t].release()
        }, o.draw = function() {
            var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d")),
                i = this.options;
            this.powerupTools[i.selected].draw(e)
        }, e.exports = r
    }, {
        "../math/cartesian": 14,
        "./tool": 47,
        "./vehiclepoweruptools/helicoptertool": 50,
        "./vehiclepoweruptools/trucktool": 51
    }],
    50: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/vehiclepowerups/helicopter"),
            r = function(t, e) {
                this.toolInit(e), this.powerup = new n(0, 0, 0, e.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.options = t.options, this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "helicopter", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = e.pos,
                s = this.camera.zoom,
                n = this.scene.settings.device;
            if(("desktop" === n || this.active) && (t.globalAlpha = .8, this.powerup.draw(i.x, i.y, s, t), t.globalAlpha = 1), this.active === !0) {
                var r = this.scene.screen,
                    o = r.realToScreen(this.p1.x, "x"),
                    a = r.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(o, a, s, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, this.options.time, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/vehiclepowerups/helicopter": 30,
        "../tool": 47
    }],
    51: [function(t, e) {
        var i = t("../../math/cartesian"),
            s = t("../tool"),
            n = t("../../sector/vehiclepowerups/truck"),
            r = function(t, e) {
                this.toolInit(e), this.powerup = new n(0, 0, 0, e.scene.track), this.p1 = new i(0, 0), this.p2 = new i(0, 0), this.options = t.options, this.active = !1
            },
            o = r.prototype = new s;
        o.toolInit = o.init, o.toolUpdate = o.update, o.powerup = null, o.name = "truck", o.p1 = null, o.p2 = null, o.active = !1, o.draw = function(t) {
            var e = this.mouse.touch,
                i = e.pos,
                s = this.camera.zoom,
                n = this.scene.settings.device;
            if(("desktop" === n || this.active) && (t.globalAlpha = .8, this.powerup.draw(i.x, i.y, s, t), t.globalAlpha = 1), this.active === !0) {
                var r = this.scene.screen,
                    o = r.realToScreen(this.p1.x, "x"),
                    a = r.realToScreen(this.p1.y, "y");
                t.globalAlpha = .4, this.powerup.draw(o, a, s, t), t.globalAlpha = 1
            }
        }, o.press = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p1.x = e.x, this.p1.y = e.y, this.p2.x = e.x, this.p2.y = e.y, this.active = !0
        }, o.hold = function() {
            var t = this.mouse.touch,
                e = t.real;
            this.p2.x = e.x, this.p2.y = e.y
        }, o.release = function() {
            var t = (this.scene.screen, this.scene.track),
                e = new n(this.p1.x, this.p1.y, this.options.time, t);
            t.addPowerup(e), this.active = !1, this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e]
            })
        }, e.exports = r
    }, {
        "../../math/cartesian": 14,
        "../../sector/vehiclepowerups/truck": 31,
        "../tool": 47
    }],
    52: [function(t, e) {
        function i(t) {
            this.scene = t, this.game = t.game, this.settings = t.game.settings, this.camera = t.camera, this.sectors = {}, this.sectors.drawSectors = [], this.sectors.physicsSectors = [], this.totalSectors = [], this.powerups = [], this.powerupsLookupTable = {}, this.physicsLines = [], this.sceneryLines = [], this.targets = [], this.allowedVehicles = ["MTB", "BMX"], this.canvasPool = new C(t), this.createPowerupCache()
        }
        var s = t("../math/cartesian"),
            n = t("../sector/physicsline"),
            r = t("../sector/sceneryline"),
            o = t("../math/bresenham"),
            a = t("../sector/sector"),
            h = t("../../libs/lodash-3.10.1"),
            l = Math.floor,
            c = Math.max,
            u = Math.min,
            p = Math.sqrt,
            d = Math.pow,
            f = Math.round,
            v = t("../sector/powerups/bomb"),
            g = t("../sector/powerups/gravity"),
            m = t("../sector/powerups/boost"),
            y = t("../sector/powerups/checkpoint"),
            w = t("../sector/powerups/target"),
            _ = t("../sector/powerups/slowmo"),
            x = t("../sector/powerups/antigravity"),
            b = t("../sector/powerups/teleport"),
            T = t("../sector/vehiclepowerups/helicopter"),
            k = t("../sector/vehiclepowerups/truck"),
            C = t("../utils/canvaspool"),
            S = {
                LINE: 1,
                POWERUPS: 2
            },
            P = [];
        i.prototype = {
            defaultLine: {
                p1: new s(-40, 50),
                p2: new s(40, 50)
            },
            game: null,
            scene: null,
            camera: null,
            canvas: null,
            canvasPool: null,
            settings: null,
            physicsLines: null,
            sceneryLines: null,
            powerups: null,
            targets: null,
            targetCount: 0,
            sectors: null,
            totalSectors: null,
            allowedVehicles: null,
            dirty: !1,
            createPowerupCache: function() {
                P.push(new m(0, 0, 0, this)), P.push(new _(0, 0, this)), P.push(new v(0, 0, this)), P.push(new g(0, 0, 0, this)), P.push(new y(0, 0, this)), P.push(new w(0, 0, this)), P.push(new x(0, 0, this)), P.push(new b(0, 0, this)), P.push(new T(0, 0, 0, this)), P.push(new k(0, 0, 0, this))
            },
            recachePowerups: function(t) {
                for(var e in P) P[e].recache(t)
            },
            read: function(t) {
                var e = t.split("#"),
                    i = e[0].split(","),
                    s = [],
                    n = [];
                if(e.length > 2) var s = e[1].split(","),
                    n = e[2].split(",");
                else if(e.length > 1) var n = e[1].split(",");
                this.addLines(i, this.addPhysicsLine), this.addLines(s, this.addSceneryLine), this.addPowerups(n)
            },
            addPowerups: function(t) {
                for(var e = t.length, i = [], s = ((new Date).getTime(), 0); e > s; s++)
                    if(i = t[s].split(" "), i.length >= 2) {
                        for(var n = [], r = i.length, o = 1; r > o; o++) {
                            var a = parseInt(i[o], 32);
                            n.push(a)
                        }
                        var h = f(n[0]),
                            l = f(n[1]),
                            p = null;
                        switch(i[0]) {
                            case "B":
                                p = new m(h, l, n[2], this), this.addPowerup(p);
                                break;
                            case "S":
                                p = new _(h, l, this), this.addPowerup(p);
                                break;
                            case "O":
                                p = new v(h, l, this), this.addPowerup(p);
                                break;
                            case "G":
                                p = new g(h, l, n[2], this), this.addPowerup(p);
                                break;
                            case "C":
                                p = new y(h, l, this), this.addPowerup(p);
                                break;
                            case "T":
                                p = new w(h, l, this), this.addTarget(p), this.addPowerup(p);
                                break;
                            case "A":
                                p = new x(h, l, this), this.addPowerup(p);
                                break;
                            case "V":
                                var d = n[2],
                                    C = n[3],
                                    S = this.settings.vehiclePowerup.minTime,
                                    P = this.settings.vehiclePowerup.maxTime;
                                C = C || S, C = u(C, P), C = c(C, S);
                                var p;
                                switch(d) {
                                    case 1:
                                        p = new T(h, l, C, this);
                                        break;
                                    case 2:
                                        p = new k(h, l, C, this);
                                        break;
                                    default:
                                        continue
                                }
                                this.addPowerup(p);
                                break;
                            case "W":
                                var M = n[0],
                                    D = n[1],
                                    A = n[2],
                                    E = n[3],
                                    I = new b(M, D, this),
                                    z = new b(A, E, this);
                                I.addOtherPortalRef(z), z.addOtherPortalRef(I), this.addPowerup(I), this.addPowerup(z)
                        }
                    }
            },
            addTarget: function(t) {
                this.dirty = !0, this.targetCount++, this.targets.push(t)
            },
            addPowerup: function(t) {
                var e = this.sectors.drawSectors,
                    i = this.sectors.physicsSectors,
                    s = t.x,
                    n = t.y,
                    r = this.settings.drawSectorSize,
                    o = this.settings.physicsSectorSize;
                this.addRef(s, n, t, S.POWERUPS, i, o);
                var a = this.addRef(s, n, t, S.POWERUPS, e, r);
                return a !== !1 && this.totalSectors.push(a), null !== t && (this.powerups.push(t), t.id && (this.powerupsLookupTable[t.id] = t)), t
            },
            addLines: function(t, e) {
                for(var i = t.length, s = 0; i > s; s++) {
                    var n = t[s].split(" "),
                        r = n.length;
                    if(r > 3)
                        for(var o = 0; r - 2 > o; o += 2) {
                            var a = parseInt(n[o], 32),
                                h = parseInt(n[o + 1], 32),
                                l = parseInt(n[o + 2], 32),
                                c = parseInt(n[o + 3], 32),
                                u = a + h + l + c;
                            isNaN(u) || e.call(this, a, h, l, c)
                        }
                }
            },
            addPhysicsLine: function(t, e, i, s) {
                var t = f(t),
                    e = f(e),
                    i = f(i),
                    s = f(s),
                    r = i - t,
                    o = s - e,
                    a = p(d(r, 2) + d(o, 2));
                if(a >= 2) {
                    var h = new n(t, e, i, s);
                    this.addPhysicsLineToTrack(h)
                }
                return h
            },
            addPhysicsLineToTrack: function(t) {
                for(var e = this.settings.drawSectorSize, i = t.p1, s = t.p2, n = i.x, r = i.y, a = s.x, h = s.y, l = o(n, r, a, h, e), c = this.sectors.drawSectors, u = l.length, p = 0; u > p; p += 2) {
                    var d = l[p],
                        f = l[p + 1],
                        v = this.addRef(d, f, t, S.LINE, c, e);
                    v !== !1 && this.totalSectors.push(v)
                }
                for(var g = this.settings.physicsSectorSize, m = o(n, r, a, h, g), y = this.sectors.physicsSectors, w = m.length, p = 0; w > p; p += 2) {
                    var d = m[p],
                        f = m[p + 1];
                    this.addRef(d, f, t, S.LINE, y, g)
                }
                return this.physicsLines.push(t), t
            },
            addSceneryLine: function(t, e, i, s) {
                var t = f(t),
                    e = f(e),
                    i = f(i),
                    s = f(s),
                    n = i - t,
                    o = s - e,
                    a = p(d(n, 2) + d(o, 2));
                if(a >= 2) {
                    var h = new r(t, e, i, s);
                    this.addSceneryLineToTrack(h)
                }
                return h
            },
            addSceneryLineToTrack: function(t) {
                for(var e = this.settings.drawSectorSize, i = t.p1, s = t.p2, n = i.x, r = i.y, a = s.x, h = s.y, l = o(n, r, a, h, e), c = this.sectors.drawSectors, u = l.length, p = 0; u > p; p += 2) {
                    var d = l[p],
                        f = l[p + 1],
                        v = this.addRef(d, f, t, S.LINE, c, e);
                    v !== !1 && this.totalSectors.push(v)
                }
                return this.sceneryLines.push(t), t
            },
            addRef: function(t, e, i, s, n, r) {
                var o = l(t / r),
                    h = l(e / r),
                    c = !1;
                if(void 0 === n[o] && (n[o] = []), void 0 === n[o][h]) {
                    var u = new a(o, h, this);
                    n[o][h] = u, c = u
                }
                switch(s) {
                    case S.LINE:
                        n[o][h].addLine(i), i.addSectorReference(n[o][h]);
                        break;
                    case S.POWERUPS:
                        n[o][h].addPowerup(i), i.addSectorReference(n[o][h])
                }
                return this.dirty = !0, c
            },
            cleanTrack: function() {
                this.cleanLines(), this.cleanPowerups()
            },
            cleanLines: function() {
                for(var t = this.physicsLines, e = this.sceneryLines, i = t.length, s = e.length, n = i - 1; n >= 0; n--) t[n].remove && t.splice(n, 1);
                for(var r = s - 1; r >= 0; r--) e[r].remove && e.splice(r, 1)
            },
            cleanPowerups: function() {
                for(var t = this.powerups, e = this.targets, i = this.targets.length, s = t.length, n = (this.powerupsLookupTable, s - 1); n >= 0; n--) t[n].remove && t.splice(n, 1);
                for(var r = i - 1; r >= 0; r--) e[r].remove && e.splice(r, 1);
                this.targetCount = e.length
            },
            updatePowerupState: function(t) {
                var e = t._powerupsConsumed;
                this.resetPowerups();
                var i = e.targets,
                    s = e.checkpoints,
                    n = e.misc;
                this.setPowerupStates(i), this.setPowerupStates(s), this.setPowerupStates(n)
            },
            setPowerupStates: function(t) {
                var e = this.powerupsLookupTable;
                for(var i in t) {
                    var s = t[i],
                        n = e[s];
                    n.remove && n.id && (delete e[s], delete t[s]), n.hit = !0, n.sector.powerupCanvasDrawn = !1
                }
            },
            getCode: function() {
                this.cleanTrack();
                var t = this.powerups,
                    e = this.physicsLines,
                    i = this.sceneryLines,
                    s = "",
                    n = e.length,
                    r = i.length,
                    o = t.length;
                if(n > 0) {
                    for(var a in e) {
                        var h = e[a];
                        h.recorded || (s += h.p1.x.toString(32) + " " + h.p1.y.toString(32) + h.getCode(this) + ",")
                    }
                    s = s.slice(0, -1);
                    for(var a in e) e[a].recorded = !1
                }
                if(s += "#", r > 0) {
                    for(var l in i) {
                        var h = i[l];
                        h.recorded || (s += h.p1.x.toString(32) + " " + h.p1.y.toString(32) + h.getCode(this) + ",")
                    }
                    s = s.slice(0, -1);
                    for(var l in i) i[l].recorded = !1
                }
                if(s += "#", o > 0) {
                    for(var c in t) {
                        var u = t[c],
                            p = u.getCode();
                        p && (s += p + ",")
                    }
                    s = s.slice(0, -1)
                }
                return s
            },
            resetPowerups: function() {
                var t = this.powerups;
                for(var e in t) {
                    var i = t[e];
                    i.hit && !i.remove && (i.hit = !1, i.sector.powerupCanvasDrawn = !1)
                }
            },
            addDefaultLine: function() {
                var t = this.defaultLine,
                    e = t.p1,
                    i = t.p2;
                this.addPhysicsLine(e.x, e.y, i.x, i.y)
            },
            erase: function(t, e, i) {
                this.dirty = !0;
                for(var s = t.x - e, n = t.y - e, r = t.x + e, o = t.y + e, a = c(s, r), p = u(s, r), d = c(n, o), f = u(n, o), v = this.settings.drawSectorSize, g = l(a / v), m = l(p / v), y = l(d / v), w = l(f / v), _ = this.sectors.drawSectors, x = [], b = m; g >= b; b++)
                    for(var T = w; y >= T; T++) _[b] && _[b][T] && x.push(_[b][T].erase(t, e, i));
                return h.flatten(x)
            },
            drawAndCache: function() {
                for(var t = performance.now(), e = this.totalSectors, i = e.length, s = 0; i > s; s++) {
                    var n = e[s];
                    ! function(t) {
                        setTimeout(function() {
                            t.draw(), t.cacheAsImage()
                        }, 250 * s)
                    }(n)
                }
                var r = performance.now();
                console.log("Track :: Time to draw entire track : " + (r - t) + "ms")
            },
            undraw: function() {
                var t = (performance.now(), this.totalSectors);
                for(var e in t) {
                    var i = t[e];
                    i.drawn && i.clear(!0)
                }
                var s = this.camera.zoom;
                this.recachePowerups(Math.max(s, 1)), this.canvasPool.update()
            },
            collide: function(t) {
                var e = this.settings.physicsSectorSize,
                    i = Math.floor(t.pos.x / e - .5),
                    s = Math.floor(t.pos.y / e - .5),
                    n = this.sectors.physicsSectors;
                n[i] && n[i][s] && n[i][s].resetCollided(), n[i + 1] && n[i + 1][s] && n[i + 1][s].resetCollided(), n[i + 1] && n[i + 1][s + 1] && n[i + 1][s + 1].resetCollided(), n[i] && n[i][s + 1] && n[i][s + 1].resetCollided(), n[i] && n[i][s] && n[i][s].collide(t), n[i + 1] && n[i + 1][s] && n[i + 1][s].collide(t), n[i + 1] && n[i + 1][s + 1] && n[i + 1][s + 1].collide(t), n[i] && n[i][s + 1] && n[i][s + 1].collide(t)
            },
            getDrawSector: function(t, e) {
                var i = this.settings.drawSectorSize,
                    s = l(t / i),
                    n = l(e / i),
                    r = this.sectors.drawSectors,
                    o = !1;
                return "undefined" != typeof r[s] && "undefined" != typeof r[s][n] && (o = r[s][n]), o
            },
            draw: function() {
                var t = this.scene,
                    e = t.camera,
                    i = t.screen,
                    s = t.game.canvas.getContext("2d"),
                    n = e.zoom,
                    r = e.position,
                    o = t.screen.center,
                    a = this.settings.drawSectorSize * n,
                    h = r.x * n / a,
                    l = r.y * n / a,
                    c = i.width / a,
                    u = i.height / a,
                    p = u / 2,
                    d = c / 2,
                    f = h - d - 1,
                    v = l - p - 1,
                    g = h + d,
                    m = l + p;
                s.imageSmoothingEnabled = !1, s.mozImageSmoothingEnabled = !1, s.oImageSmoothingEnabled = !1, s.webkitImageSmoothingEnabled = !1;
                for(var y = h * a - o.x, w = l * a - o.y, _ = this.totalSectors, x = _.length, b = 0; x > b; b++) {
                    var T = _[b],
                        k = T.row,
                        C = T.column;
                    if(T.dirty && T.cleanSector(), C >= f && g >= C && k >= v && m >= k) {
                        T.drawn === !1 && T.draw(), T.hasPowerups && (T.powerupCanvasDrawn || T.cachePowerupSector());
                        var S = C * a - y,
                            P = k * a - w;
                        if(S = 0 | S, P = 0 | P, s.drawImage(T.canvas, S, P, a, a), T.hasPowerups && T.powerupCanvasDrawn) {
                            var M = T.powerupCanvasOffset * n;
                            s.drawImage(T.powerupCanvas, S - M / 2, P - M / 2, a + M, a + M)
                        }
                    } else T.drawn && T.clear()
                }
            },
            closeSectors: function() {
                for(var t = this.totalSectors, e = t.length, i = 0; e > i; i++) t[i].close()
            },
            close: function() {
                this.scene = null, this.closeSectors(), this.totalSectors = null, this.canvasPool = null, this.sectors = null, this.physicsLines = null, this.sceneryLines = null, this.powerups = null, this.camera = null
            }
        }, e.exports = i
    }, {
        "../../libs/lodash-3.10.1": 83,
        "../math/bresenham": 13,
        "../math/cartesian": 14,
        "../sector/physicsline": 18,
        "../sector/powerups/antigravity": 20,
        "../sector/powerups/bomb": 21,
        "../sector/powerups/boost": 22,
        "../sector/powerups/checkpoint": 23,
        "../sector/powerups/gravity": 24,
        "../sector/powerups/slowmo": 25,
        "../sector/powerups/target": 26,
        "../sector/powerups/teleport": 27,
        "../sector/sceneryline": 28,
        "../sector/sector": 29,
        "../sector/vehiclepowerups/helicopter": 30,
        "../sector/vehiclepowerups/truck": 31,
        "../utils/canvaspool": 54
    }],
    53: [function(t, e) {
        function i(t) {
            this.scene = t, this.settings = t.settings, this.build_interface()
        }
        var s = i.prototype;
        s.scene = null, s.container = null, s.cached = !1, s.build_interface = function() {
            this.sprite_sheet = this.create_sprite_sheet();
            var t = this.scene.game.pixelRatio,
                e = new createjs.Container,
                i = "helsinki",
                s = this.settings.campaignData,
                n = s.goals,
                r = n.third,
                o = new createjs.Container,
                a = this.get_sprite("bronze_medal"),
                r = new createjs.Text(r, "30px " + i, "#000000"),
                h = n.second,
                l = new createjs.Container,
                c = this.get_sprite("silver_medal"),
                h = new createjs.Text(h, "30px " + i, "#000000"),
                u = n.first,
                p = new createjs.Container,
                d = this.get_sprite("gold_medal"),
                u = new createjs.Text(u, "30px " + i, "#000000"),
                f = t / 2.5;
            "phone" === this.settings.controls && (f = t / 2.5), a.y = 7, a.x = 16, r.x = 69, r.y = 14, c.y = 7, c.x = 175, h.x = 229, h.y = 14, d.y = 7, d.x = 350, u.y = 14, u.x = 400, o.addChild(a), o.addChild(r), l.addChild(c), l.addChild(h), p.addChild(d), p.addChild(u), o.alpha = .4, l.alpha = .4, p.alpha = .4, e.addChild(o), e.addChild(l), e.addChild(p), e.scaleX = e.scaleY = f, e.y = 80 * f, e.x = 0, this.bronze_container = o, this.silver_container = l, this.gold_container = p, this.container = e, this.scene.game.stage.addChild(e), this.update_state()
        }, s.update_state = function() {
            var t = this.settings.campaignData,
                e = t.user;
            switch(e.has_goal) {
                case 1:
                case "first":
                    this.gold_container.alpha = 1;
                case "second":
                case 2:
                    this.silver_container.alpha = 1;
                case "third":
                case 3:
                    this.bronze_container.alpha = 1;
                case 0:
            }
        }, s.center_container = function() {
            var t = this.scene.screen,
                e = this.container,
                i = e.getBounds(),
                s = this.scene.game.pixelRatio;
            e.x = t.width / 2 - i.width / 2 * e.scaleY, e.y = 40 * s
        }, s.update = function() {
            this.settings.mobile && this.center_container(), this.update_state()
        }, s.create_sprite_sheet = function() {
            var t = this.scene.assets.getResult("campaign_icons"),
                e = {
                    images: [t],
                    frames: [
                        [548, 68, 44, 44],
                        [2, 68, 452, 56],
                        [502, 68, 44, 44],
                        [2, 2, 588, 64],
                        [456, 68, 44, 44]
                    ],
                    animations: {
                        bronze_medal: [0],
                        center_panel: [1],
                        silver_medal: [2],
                        left_panel: [3],
                        gold_medal: [4]
                    }
                },
                i = new createjs.SpriteSheet(e);
            return i
        }, s.get_sprite = function(t) {
            var e = this.sprite_sheet,
                i = new createjs.Sprite(e, t);
            return i.stop(), i
        }, e.exports = i
    }, {}],
    54: [function(t, e) {
        function i(t) {
            this.options = t, this.canvasPool = [], t.screen && (this.setToScreen = !0, this.update()), t.cap && (this.setToScreen = !1, this.poolCap = t.cap)
        }
        var s = Math.floor,
            n = Math.ceil;
        i.prototype = {
            canvasPool: null,
            poolCap: 5e3,
            setToScreen: !0,
            options: null,
            update: function() {
                this.setToScreen && (this.getPoolCapFromScreen(), this.cleanPool())
            },
            getPoolCapFromScreen: function() {
                var t = this.options,
                    e = t.settings,
                    i = t.screen,
                    r = (this.options.width, this.options.height, i.width),
                    o = i.height,
                    a = t.camera,
                    h = a.zoom,
                    l = s(e.drawSectorSize * h),
                    c = n(r / l),
                    u = n(o / l);
                this.poolCap = c * u + c + u
            },
            getCanvas: function() {
                var t = this.canvasPool.pop();
                return null == t && (t = document.createElement("canvas")), t
            },
            releaseCanvas: function(t) {
                this.canvasPool.length < this.poolCap && this.canvasPool.push(t)
            },
            cleanPool: function() {
                this.canvasPool.length > this.poolCap && (this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1))
            }
        }, e.exports = i
    }, {}],
    55: [function(t, e) {
        function i(t) {
            t = parseInt(t, 10);
            var e = s(t / 6e4),
                i = (t - 6e4 * e) / 1e3;
            return i = i.toFixed(2), 10 > e && (e = e), 10 > i && (i = "0" + i), e + ":" + i
        }
        var s = Math.floor;
        e.exports = i
    }, {}],
    56: [function(t, e) {
        function i(t) {
            this.scene = t, this.tickDownButtons = {}, this.previousTickDownButtons = {}, this.downButtons = {}, this.keymap = {}, this.records = {}, this.numberOfKeysDown = 0, this.tickNumberOfKeysDown = 0
        }
        var s = t("../../libs/lodash-3.10.1");
        i.prototype = {
            tickDownButtons: null,
            previousTickDownButtons: null,
            downButtons: null,
            paused: !1,
            keymap: null,
            records: null,
            keysToRecord: null,
            keysToPlay: null,
            recording: !1,
            playback: null,
            numberOfKeysDown: 0,
            tickNumberOfKeysDown: 0,
            replaying: !1,
            listen: function() {
                document.onkeydown = this.handleButtonDown.bind(this), document.onkeyup = this.handleButtonUp.bind(this)
            },
            unlisten: function() {
                this.downButtons = {}, document.onkeydown = function() {}, document.onkeyup = function() {}
            },
            pause: function() {
                this.paused = !0
            },
            unpause: function() {
                this.paused = !1
            },
            recordKeys: function(t) {
                this.keysToRecord = t, this.recording = !0
            },
            loadPlayback: function(t, e) {
                this.keysToPlay = e, this.playback = t, this.replaying = !0
            },
            setKeyMap: function(t) {
                var e = {};
                for(var i in t)
                    if(t[i] instanceof Array)
                        for(var s in t[i]) e[t[i][s]] = i;
                    else e[t[i]] = i;
                this.keymap = e
            },
            handleButtonDown: function(t) {
                var e = this.getInternalCode(t.keyCode);
                "string" == typeof e && t.preventDefault(), this.setButtonDown(e)
            },
            handleButtonUp: function(t) {
                var e = this.getInternalCode(t.keyCode);
                "string" == typeof e && t.preventDefault(), this.setButtonUp(e)
            },
            getInternalCode: function(t) {
                var e = this.keymap;
                return e[t] || t
            },
            setButtonsDown: function(t) {
                for(var e = 0, i = t.length; i > e; e++) this.setButtonDown(t[e])
            },
            setButtonUp: function(t) {
                this.downButtons[t] && (this.onButtonUp && this.onButtonUp(t), this.downButtons[t] = !1, this.numberOfKeysDown--)
            },
            setButtonDown: function(t, e) {
                this.downButtons[t] || (this.onButtonDown && this.onButtonDown(t), this.downButtons[t] = e ? e : !0, this.numberOfKeysDown++)
            },
            isButtonDown: function(t) {
                var e = !1,
                    i = this.tickDownButtons[t];
                return(i > 0 || 1 == i) && (e = !0), e
            },
            getButtonDownOccurances: function(t) {
                var e = 0;
                if(this.isButtonDown(t)) {
                    e = 1;
                    var i = this.tickDownButtons[t];
                    i !== !0 && (e = i)
                }
                return e
            },
            getDownButtons: function() {
                var t = [];
                for(var e in this.tickDownButtons) this.tickDownButtons[e] && t.push(e);
                return t
            },
            reset: function(t) {
                (this.replaying || t) && (this.downButtons = {}), this.tickDownButtons = {}, this.previousTickDownButtons = {}, this.records = {}
            },
            update: function() {
                this.scene;
                this.replaying && this.updatePlayback(), this.previousTickDownButtons = s.merge({}, this.tickDownButtons), this.tickDownButtons = s.merge({}, this.downButtons), this.tickNumberOfKeysDown = this.numberOfKeysDown, this.recording && this.updateRecording()
            },
            areKeysDown: function() {
                for(var t in this.downButtons)
                    if(this.downButtons[t] === !0) return !0;
                return !1
            },
            updatePlayback: function() {
                var t = this.keysToPlay,
                    e = this.playback,
                    i = this.scene.ticks;
                for(var s in t) {
                    var n = t[s],
                        r = n + "_up",
                        o = n + "_down";
                    if("undefined" != typeof e[o] && "undefined" != typeof e[o][i]) {
                        var a = e[o][i];
                        this.setButtonDown(n, a)
                    }
                    "undefined" != typeof e[r] && "undefined" != typeof e[r][i] && this.setButtonUp(n)
                }
            },
            updateRecording: function() {
                var t = this.scene.ticks,
                    e = this.records,
                    i = (this.keymap, this.keysToRecord),
                    s = this.tickDownButtons,
                    n = this.previousTickDownButtons;
                for(var r in i) {
                    var o = i[r];
                    if("undefined" != typeof s[o]) {
                        var a = s[o],
                            h = !1;
                        if("undefined" != typeof n[o] && (h = n[o]), a !== h) {
                            var l = o + "_up",
                                c = o + "_down",
                                u = l;
                            a && (u = c), e[u] || (e[u] = []), a || e[c] && -1 !== e[c].indexOf(t) && (t += 1), e[u].push(t)
                        }
                    }
                }
            },
            buttonWasRecentlyDown: function(t) {
                var e = this.records;
                this.replaying && (e = this.playback);
                var i = t + "_down",
                    s = !1;
                if(e[i]) {
                    var n = this.scene.ticks,
                        r = n,
                        o = e[i],
                        a = -1;
                    a = this.replaying ? "undefined" != typeof o[r] : o.indexOf(r), -1 !== a && (s = !0)
                }
                return s
            },
            getReplayString: function() {
                return JSON.stringify(this.records)
            },
            encodeReplayString: function(t) {
                var e = this.scene.settings,
                    i = {
                        version: e.replayVersion
                    };
                for(var s in t) {
                    var n = t[s];
                    i[s] = "";
                    for(var r in n) {
                        var o = n[r];
                        i[s] += o.toString(32) + " "
                    }
                }
                return i
            },
            close: function() {
                this.unlisten(), this.handleButtonUp = null, this.handleButtonDown = null, this.onButtonDown = null, this.onButtonUp = null, this.scene = null, this.tickDownButtons = null, this.downButtons = null, this.keymap = null, this.records = null, this.keysToRecord = null
            }
        }, e.exports = i
    }, {
        "../../libs/lodash-3.10.1": 83
    }],
    57: [function(t, e) {
        var i = (t("../math/cartesian"), Math.round, function(t) {
            this.scene = t, this.screen = t.screen, this.context = t.game.canvas.getContext("2d"), this.clockwise = !1, this.settings = {
                radius: 10,
                color: "#1884cf"
            }
        });
        i.prototype = {
            scene: null,
            clockwise: !1,
            context: null,
            screen: null,
            pixelRatio: 1,
            draw: function() {
                var t = this.context,
                    e = this.screen,
                    i = this.settings,
                    s = this.scene.game.pixelRatio,
                    n = i.radius,
                    r = this.clockwise,
                    o = this.scene.game.tickCount % 25 / 25 * 2 * Math.PI;
                0 === o && (this.clockwise && (o = 2 * Math.PI), this.clockwise = !this.clockwise);
                var a = r ? 0 : o,
                    h = r ? o : 0,
                    l = e.width - 25 * s,
                    c = e.height - 25 * s,
                    u = !1;
                t.beginPath(), t.arc(l, c, n * s, a, h, u), t.lineWidth = 3 * s, t.strokeStyle = i.color, t.stroke()
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    58: [function(t, e) {
        function i(t) {
            this.scene = t, this.message = !1, this.timeout = !1, this.color = "#000"
        }
        var s = i.prototype;
        s.message = null, s.timeout = null, s.draw = function() {
            var t = this.message,
                e = this.timeout,
                i = this.color,
                s = this.outline;
            if(e !== !1 && 0 >= e && (t = !1), this.scene.state.paused && (i = !1, s = !1, t = this.scene.settings.mobile ? "Paused" : "Paused - Press Spacebar to Continue"), i === !1 && (i = "#333333"), t) {
                var n = this.scene.game,
                    r = this.scene,
                    o = n.pixelRatio,
                    a = n.canvas.getContext("2d"),
                    h = r.screen.center.x,
                    l = 100,
                    c = r.settings;
                "phone" === c.controls && (l = 80), a.save(), a.fillStyle = i, a.lineWidth = 4 * (o / 2), a.font = 12 * o + "pt helsinki", a.textAlign = "center", s && (a.strokeStyle = s, a.strokeText(t, h, l * o), a.strokeStyle = "#000"), a.fillText(t, h, l * o), a.restore()
            }
        }, s.show = function(t, e, i, s) {
            this.message = t, this.timeout = e, this.color = i, this.outline = s
        }, s.hide = function() {
            this.message = !1, this.color = !1, this.outline = !1
        }, s.update = function() {
            this.timeout !== !1 && this.timeout--
        }, e.exports = i
    }, {}],
    59: [function(t, e) {
        var i = t("../math/cartesian"),
            s = t("../../libs/lodash-3.10.1"),
            n = t("events").EventEmitter,
            r = Math.round,
            o = function(t) {
                this.scene = t, this.enabled = !0, this.touch = this.getTouchObject(), this.touch.old = this.getTouchObject(), this.secondaryTouch = this.getTouchObject(), this.secondaryTouch.old = this.getTouchObject(), this.initAnalytics(), this.bindToMouseEvents(), this.updateCallback = !1
            },
            a = o.prototype = new n;
        a.scene = null, a.touch = null, a.touches = [], a.wheel = !1, a.mousewheel = !1, a.mouseMoveListener = null, a.mouseUpListener = null, a.mouseDownListener = null, a.throttledMouseWheel = null, a.analytics = null, a.contextMenuHandler = function(t) {
            return t.stopPropagation(), t.preventDefault(), !1
        }, a.initAnalytics = function() {
            this.analytics = {
                clicks: 0
            }
        }, a.getTouchObject = function() {
            var t = {
                id: null,
                down: !1,
                press: !1,
                release: !1,
                pos: new i(0, 0),
                real: new i(0, 0),
                type: 1
            };
            return t
        }, a.bindToMouseEvents = function() {
            var t = this.scene.game.stage,
                e = this.scene.game.canvas,
                i = this.onMouseMove.bind(this),
                n = this.onMouseDown.bind(this),
                r = this.onMouseUp.bind(this);
            t.addEventListener("stagemousemove", i), t.addEventListener("stagemousedown", n), t.addEventListener("stagemouseup", r), this.mouseMoveListener = i, this.mouseDownListener = n, this.mouseUpListener = r;
            var o = s.throttle(this.onMouseWheel, 0);
            e.addEventListener("mousewheel", o.bind(this)), e.addEventListener("wheel", o.bind(this)), e.addEventListener("DOMMouseScroll", o.bind(this)), this.mouseWheelListener = o
        }, a.onMouseDown = function(t) {
            this.analytics.clicks++, 2 === t.nativeEvent.button ? this.secondaryTouch.down === !1 && (this.updatePosition(t, this.secondaryTouch), this.secondaryTouch.down = !0) : this.touch.down === !1 && (this.updatePosition(t, this.touch), this.touch.down = !0)
        }, a.disableContextMenu = function() {
            this.scene.game.canvas.oncontextmenu = function() {
                return !1
            }
        }, a.onMouseUp = function(t) {
            2 === t.nativeEvent.button ? this.secondaryTouch.down === !0 && (this.updatePosition(t, this.secondaryTouch), this.secondaryTouch.down = !1) : this.touch.down === !0 && (this.updatePosition(t, this.touch), this.touch.down = !1)
        }, a.updatePosition = function(t, e) {
            e.id = t.pointerID, e.type = t.nativeEvent.button;
            var i = e.pos;
            i.x = t.stageX, i.y = t.stageY, this.updateRealPosition(e)
        }, a.updateRealPosition = function(t) {
            var e = (t.old, t.pos),
                i = t.real,
                s = (t.down, this.scene),
                n = s.screen,
                o = s.camera,
                a = n.center,
                h = o.position,
                l = (e.x - a.x) / o.zoom + h.x,
                c = (e.y - a.y) / o.zoom + h.y;
            i.x = r(l), i.y = r(c);
            var u = this.scene.settings;
            if(this.scene.toolHandler.options.grid) {
                var p = u.toolHandler.gridSize;
                i.x = r(i.x / p) * p, i.y = r(i.y / p) * p
            }
            this.updateCallback
        }, a.onMouseWheel = function(t) {
            var t = window.event || t;
            t.preventDefault(), t.stopPropagation();
            var e = Math.max(-1, Math.min(1, t.deltaY || -t.detail));
            return 0 == e && (e = Math.max(-1, Math.min(1, t.deltaX || -t.detail))), this.wheel = -e, !1
        }, a.onMouseMove = function(t) {
            this.updatePosition(t, this.touch), this.updatePosition(t, this.secondaryTouch)
        }, a.update = function() {
            this.enabled && (this.updateTouch(this.touch), this.updateTouch(this.secondaryTouch), this.updateWheel())
        }, a.updateTouch = function(t) {
            var e = t.old,
                i = t.pos,
                s = t.real,
                n = t.down;
            e.pos.x = i.x, e.pos.y = i.y, e.real.x = s.x, e.real.y = s.y, !e.down && n && (t.press = !0), e.down && !n && (t.release = !0), e.press && (t.press = !1), e.release && (t.release = !1), this.updateRealPosition(t), e.down = t.down, e.press = t.press, e.release = t.release
        }, a.updateWheel = function() {
            this.mousewheel = this.wheel, this.wheel = !1
        }, a.close = function() {
            var t = this.scene.game.stage,
                e = this.scene.game.canvas;
            t.removeAllEventListeners(), e.removeEventListener("mousewheel", this.mouseWheelListener), e.removeEventListener("DOMMouseScroll", this.mouseWheelListener), this.touches = null, this.touch = null, this.scene = null, this.wheel = null, this.mouseMoveListener = null, this.mouseDownListener = null, this.mouseUpListener = null
        }, e.exports = o
    }, {
        "../../libs/lodash-3.10.1": 83,
        "../math/cartesian": 14,
        events: 1
    }],
    60: [function(t, e) {
        function i() {
            this.start = null, this.end = null, this.verticies = []
        }
        i.prototype = {
            start: null,
            end: null,
            verticies: [],
            build: function(t) {
                var e = t.pop();
                this.start = e.p1, this.end = e.p2, this.verticies.push(e);
                for(var i = t.length, s = i - 1; s >= 0; s--) {
                    var n = t[s],
                        r = n.p1,
                        o = n.p2;
                    this.start.x === o.x && this.start.y === o.y ? (this.verticies.unshift(n), this.start = n.p1, t.splice(s, 1)) : this.end.x === r.x && this.end.y === r.y && (this.verticies.push(n), this.end = n.p2, t.splice(s, 1))
                }
            }
        }, e.exports = i
    }, {}],
    61: [function(t, e) {
        function i(t) {
            this.scene = t, this.maxRaces = this.scene.settings.mobile ? 3 : 10, this.createContainer()
        }
        var s = t("./formatnumber"),
            n = i.prototype;
        n.container = null, n.raceList = [], n.raceCount = 0, n.highlightedRace = null, n.raceOpacity = .3, n.raceYOffset = 50, n.mobileRaceXOffset = 180, n.maxRaces = 10, n.createContainer = function() {
            var t = this.scene.game,
                e = t.settings,
                i = t.pixelRatio,
                s = i / 2.5,
                n = new createjs.Container;
            n.scaleX = n.scaleY = s, n.y = 80 * s, n.x = 15 * s, e.isCampaign && (n.y += 55 * s), this.container = n, t.stage.addChild(n)
        }, n.clear = function() {
            this.container.removeAllChildren(), this.raceList = [], this.raceCount = 0
        }, n.centerContainer = function() {
            var t = this.scene,
                e = t.screen,
                i = this.container,
                s = i.getBounds(),
                n = this.scene.game.pixelRatio;
            i.x = e.width / 2 - s.width / 2 * i.scaleY;
            var r = 40;
            t.settings.isCampaign && (i.visible = !1), i.y = r * n
        }, n.addRace = function(t, e) {
            if(this.raceCount < this.maxRaces) {
                var i = this.scene,
                    n = i.game,
                    r = (n.pixelRatio, t.user),
                    o = t.race,
                    a = i.settings,
                    h = a.drawFPS,
                    l = r.color,
                    c = "helsinki",
                    u = new createjs.Container,
                    p = (i.camera, new createjs.Shape),
                    d = p.graphics;
                d.setStrokeStyle(4, "round"), d.beginFill(l).drawCircle(0, 0, 20), p.x = 25, p.y = 25;
                var f = s(parseInt(o.run_ticks) / h * 1e3),
                    v = new createjs.Text(f, "30px " + c, "#000000");
                v.x = 55, v.y = 9;
                var g = new createjs.Text(r.d_name.charAt(0), "25px " + c, "#000000");
                g.x = 17, g.y = 33, g.textBaseline = "alphabetic";
                var m = new createjs.Container;
                m.addChild(p), m.addChild(g), m.cache(0, 0, 50, 50), m.removeAllChildren(), u.addChild(m, v), u.alpha = this.raceOpacity, a.mobile ? u.x = e * this.mobileRaceXOffset : (u.x = -2, u.y = e * this.raceYOffset), this.raceList.push(u), this.container.addChild(u), this.raceCount++
            }
        }, n.update = function() {
            if(this.raceCount > 0) {
                var t = this.scene.camera;
                t.focusIndex > 0 && t.focusIndex < this.maxRaces ? this.highlightRace(t.focusIndex - 1) : this.unhighlightRace(), this.scene.settings.mobile && this.centerContainer()
            }
        }, n.highlightRace = function(t) {
            if(this.highlightedRace !== this.raceList[t]) {
                this.unhighlightRace();
                var e = this.raceList[t];
                e.alpha = 1, this.highlightedRace = e
            }
        }, n.unhighlightRace = function() {
            this.highlightedRace && (this.highlightedRace.alpha = this.raceOpacity, this.highlightedRace = null)
        }, e.exports = i
    }, {
        "./formatnumber": 55
    }],
    62: [function(t, e) {
        function i(t) {
            this.scene = t, this.stage = t.game.stage, this.build_interface()
        }
        var s = t("./formatnumber"),
            n = i.prototype;
        n.container = null, n.cached = !1, n.scene = null, n.state = null, n.offset = {
            y: 0,
            x: 0
        }, n.build_interface = function() {
            var t = this.scene,
                e = t.game.pixelRatio,
                i = t.settings,
                s = new createjs.Container,
                n = "helsinki",
                r = new createjs.Text("00:00.00", "40px " + n, "#000000"),
                o = new createjs.Text("TIME:", "20px " + n, "#999999"),
                a = this.get_timer_sprite(),
                h = new createjs.Text(" -- : --.--", "35px " + n, "#999999"),
                l = new createjs.Text("BEST:", "20px " + n, "#999999"),
                c = new createjs.Text("0/0", "40px " + n, "#000000"),
                u = new createjs.Bitmap(t.assets.getResult("targets_icon")),
                p = e / 2.5;
            i.mobile && (p = e / 2.5), r.y = 18, r.x = 57, o.y = 3, o.x = 59, a.y = 0, a.x = 0, h.x = 237, h.y = 21, l.x = 240, l.y = 3, c.y = 15, c.x = 460, u.y = 0, u.x = 400, s.addChild(r), s.addChild(o), s.addChild(a), s.addChild(h), s.addChild(l), s.addChild(c), s.addChild(u), s.scaleX = s.scaleY = p, s.y = (10 + this.offset.y) * p, s.x = 10 * p, this.best_time_title = l, this.time_title = o, this.container = s, this.time = r, this.goals = c, this.best_time = h, this.stage.addChild(s)
        }, n.update = function() {
            var t = this.scene,
                e = t.ticks,
                i = t.settings,
                n = t.track,
                r = t.playerManager.firstPlayer;
            this.cached === !1 && e > 50 && (this.cached = !0, this.cache_fixed_text());
            var o = e / i.drawFPS;
            this.time.text = s(1e3 * o);
            var a = n.targetCount,
                h = r.getTargetsHit();
            this.goals.text = h + "/" + a;
            var l = " -- : --.--";
            i.isCampaign && i.campaignData.user.best_time ? l = i.campaignData.user.best_time : i.userTrackStats && i.userTrackStats.best_time && (l = i.userTrackStats.best_time), this.best_time.text = l, i.mobile && this.center_container()
        }, n.center_container = function() {
            var t = this.container,
                e = t.getBounds(),
                i = this.scene.screen,
                s = this.scene.game.pixelRatio;
            t.x = i.width / 2 - e.width / 2 * t.scaleY, t.y = 10 * s
        }, n.cache_fixed_text = function() {
            var t, e = this.best_time_title,
                i = this.time_title,
                s = 10;
            t = e.getBounds(), e.cache(t.x, t.y, t.width, t.height + s), t = i.getBounds(), i.cache(t.x, t.y, t.width, t.height + s)
        }, n.get_timer_sprite = function() {
            var t = this.scene.assets.getResult("time_icon"),
                e = {
                    images: [t],
                    frames: {
                        width: 60,
                        height: 60
                    }
                },
                i = new createjs.SpriteSheet(e),
                s = new createjs.Sprite(i);
            return s
        }, e.exports = i
    }, {
        "./formatnumber": 55
    }],
    63: [function(t, e) {
        var i = i || function(t, e) {
            var i = {},
                s = i.lib = {},
                n = function() {},
                r = s.Base = {
                    extend: function(t) {
                        n.prototype = this;
                        var e = new n;
                        return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                            e.$super.init.apply(this, arguments)
                        }), e.init.prototype = e, e.$super = this, e
                    },
                    create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments), t
                    },
                    init: function() {},
                    mixIn: function(t) {
                        for(var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                },
                o = s.WordArray = r.extend({
                    init: function(t, i) {
                        t = this.words = t || [], this.sigBytes = i != e ? i : 4 * t.length
                    },
                    toString: function(t) {
                        return(t || h).stringify(this)
                    },
                    concat: function(t) {
                        var e = this.words,
                            i = t.words,
                            s = this.sigBytes;
                        if(t = t.sigBytes, this.clamp(), s % 4)
                            for(var n = 0; t > n; n++) e[s + n >>> 2] |= (i[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 24 - 8 * ((s + n) % 4);
                        else if(65535 < i.length)
                            for(n = 0; t > n; n += 4) e[s + n >>> 2] = i[n >>> 2];
                        else e.push.apply(e, i);
                        return this.sigBytes += t, this
                    },
                    clamp: function() {
                        var e = this.words,
                            i = this.sigBytes;
                        e[i >>> 2] &= 4294967295 << 32 - 8 * (i % 4), e.length = t.ceil(i / 4)
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t.words = this.words.slice(0), t
                    },
                    random: function(e) {
                        for(var i = [], s = 0; e > s; s += 4) i.push(4294967296 * t.random() | 0);
                        return new o.init(i, e)
                    }
                }),
                a = i.enc = {},
                h = a.Hex = {
                    stringify: function(t) {
                        var e = t.words;
                        t = t.sigBytes;
                        for(var i = [], s = 0; t > s; s++) {
                            var n = e[s >>> 2] >>> 24 - 8 * (s % 4) & 255;
                            i.push((n >>> 4).toString(16)), i.push((15 & n).toString(16))
                        }
                        return i.join("")
                    },
                    parse: function(t) {
                        for(var e = t.length, i = [], s = 0; e > s; s += 2) i[s >>> 3] |= parseInt(t.substr(s, 2), 16) << 24 - 4 * (s % 8);
                        return new o.init(i, e / 2)
                    }
                },
                l = a.Latin1 = {
                    stringify: function(t) {
                        var e = t.words;
                        t = t.sigBytes;
                        for(var i = [], s = 0; t > s; s++) i.push(String.fromCharCode(e[s >>> 2] >>> 24 - 8 * (s % 4) & 255));
                        return i.join("")
                    },
                    parse: function(t) {
                        for(var e = t.length, i = [], s = 0; e > s; s++) i[s >>> 2] |= (255 & t.charCodeAt(s)) << 24 - 8 * (s % 4);
                        return new o.init(i, e)
                    }
                },
                c = a.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(l.stringify(t)))
                        } catch(e) {
                            throw Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return l.parse(unescape(encodeURIComponent(t)))
                    }
                },
                u = s.BufferedBlockAlgorithm = r.extend({
                    reset: function() {
                        this._data = new o.init, this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = c.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                    },
                    _process: function(e) {
                        var i = this._data,
                            s = i.words,
                            n = i.sigBytes,
                            r = this.blockSize,
                            a = n / (4 * r),
                            a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
                        if(e = a * r, n = t.min(4 * e, n), e) {
                            for(var h = 0; e > h; h += r) this._doProcessBlock(s, h);
                            h = s.splice(0, e), i.sigBytes -= n
                        }
                        return new o.init(h, n)
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t._data = this._data.clone(), t
                    },
                    _minBufferSize: 0
                });
            s.Hasher = u.extend({
                cfg: r.extend(),
                init: function(t) {
                    this.cfg = this.cfg.extend(t), this.reset()
                },
                reset: function() {
                    u.reset.call(this), this._doReset()
                },
                update: function(t) {
                    return this._append(t), this._process(), this
                },
                finalize: function(t) {
                    return t && this._append(t), this._doFinalize()
                },
                blockSize: 16,
                _createHelper: function(t) {
                    return function(e, i) {
                        return new t.init(i).finalize(e)
                    }
                },
                _createHmacHelper: function(t) {
                    return function(e, i) {
                        return new p.HMAC.init(t, i).finalize(e)
                    }
                }
            });
            var p = i.algo = {};
            return i
        }(Math);
        ! function(t) {
            for(var e = i, s = e.lib, n = s.WordArray, r = s.Hasher, s = e.algo, o = [], a = [], h = function(t) {
                    return 4294967296 * (t - (0 | t)) | 0
                }, l = 2, c = 0; 64 > c;) {
                var u;
                t: {
                    u = l;
                    for(var p = t.sqrt(u), d = 2; p >= d; d++)
                        if(!(u % d)) {
                            u = !1;
                            break t
                        }
                    u = !0
                }
                u && (8 > c && (o[c] = h(t.pow(l, .5))), a[c] = h(t.pow(l, 1 / 3)), c++), l++
            }
            var f = [],
                s = s.SHA256 = r.extend({
                    _doReset: function() {
                        this._hash = new n.init(o.slice(0))
                    },
                    _doProcessBlock: function(t, e) {
                        for(var i = this._hash.words, s = i[0], n = i[1], r = i[2], o = i[3], h = i[4], l = i[5], c = i[6], u = i[7], p = 0; 64 > p; p++) {
                            if(16 > p) f[p] = 0 | t[e + p];
                            else {
                                var d = f[p - 15],
                                    v = f[p - 2];
                                f[p] = ((d << 25 | d >>> 7) ^ (d << 14 | d >>> 18) ^ d >>> 3) + f[p - 7] + ((v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10) + f[p - 16]
                            }
                            d = u + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & l ^ ~h & c) + a[p] + f[p], v = ((s << 30 | s >>> 2) ^ (s << 19 | s >>> 13) ^ (s << 10 | s >>> 22)) + (s & n ^ s & r ^ n & r), u = c, c = l, l = h, h = o + d | 0, o = r, r = n, n = s, s = d + v | 0
                        }
                        i[0] = i[0] + s | 0, i[1] = i[1] + n | 0, i[2] = i[2] + r | 0, i[3] = i[3] + o | 0, i[4] = i[4] + h | 0, i[5] = i[5] + l | 0, i[6] = i[6] + c | 0, i[7] = i[7] + u | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            i = e.words,
                            s = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        return i[n >>> 5] |= 128 << 24 - n % 32, i[(n + 64 >>> 9 << 4) + 14] = t.floor(s / 4294967296), i[(n + 64 >>> 9 << 4) + 15] = s, e.sigBytes = 4 * i.length, this._process(), this._hash
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                });
            e.SHA256 = r._createHelper(s), e.HmacSHA256 = r._createHmacHelper(s)
        }(Math), e.exports = i
    }, {}],
    64: [function(t, e) {
        "use strict";
        var i = (Math.min, function(t) {
            this.scene = t, this.sounds = {}
        });
        i.prototype = {
            sounds: null,
            update: function() {
                var t = createjs.Sound,
                    e = this.scene,
                    i = e.settings;
                t.setMute(e.state.paused || i.soundsEnabled === !1 ? !0 : !1)
            },
            setVolume: function(t, e) {
                this.sounds[t] && (this.sounds[t].volume = e)
            },
            muted: !1,
            mute_all: function() {
                var t = this.sounds;
                for(var e in t) t.hasOwnProperty(e) && (t[e].volume = 0);
                this.muted = !0
            },
            stop_all: function() {
                var t = this.sounds;
                for(var e in t) t.hasOwnProperty(e) && (t[e].volume = 0, t[e].stop())
            },
            play: function(t, e) {
                if((null === e || "undefined" == typeof e) && (e = 1), this.sounds[t]) this.sounds[t].volume = e;
                else if(this.scene.settings.soundsEnabled) {
                    var i = createjs.Sound.play(t, {
                            volume: e
                        }),
                        s = this;
                    i.addEventListener("complete", function() {
                        s.sounds[t] = null
                    }), this.sounds[t] = i
                }
            },
            stop: function(t) {
                this.sounds[t] && (this.sounds[t].stop(), this.sounds[t] = null)
            },
            close: function() {
                this.sounds = null
            }
        }, e.exports = i
    }, {}],
    65: [function(t, e) {
        function i(t) {
            this.scene = t, this.settings = t.settings, this.player = !1, this.build_interface(), this.createPulseTween()
        }
        var s = t("../../libs/tween"),
            n = i.prototype;
        n.scene = null, n.container = null, n.cached = !1, n.build_interface = function() {
            var t = this.scene.game.pixelRatio,
                e = new createjs.Container,
                i = "helsinki",
                s = new createjs.Shape;
            s.graphics.setStrokeStyle(5, "round").beginStroke("rgba(242,144,66,1)").beginFill("rgba(242,144,66,0.5)").drawRoundRect(0, 0, 200, 60, 25);
            var n = new createjs.Text("00:00", "35px " + i, "#000000");
            n.textAlign = "center", n.textBaseline = "middle", n.x = 100, n.y = 30, e.addChild(s), e.addChild(n), e.visible = !1, e.scaleX = e.scaleY = t / 2, this.timeText = n, this.container = e, this.scene.game.stage.addChild(e), this.center_container()
        }, n.setPlayer = function(t) {
            this.player = t
        }, n.removePlayer = function() {
            this.player = !1
        }, n.playerAddedTime = function(t) {
            this.player === t && this.createPulseTween()
        }, n.createPulseTween = function() {
            var t = this.container,
                e = this.scene.game.pixelRatio,
                i = e / 2,
                n = {
                    scale: i
                },
                r = {
                    scale: 1.2 * i
                };
            this.pulse = new s.Tween(n).to(r, 200).repeat(1).yoyo(!0).easing(s.Easing.Cubic.InOut).onUpdate(function() {
                t.scaleX = t.scaleY = this.scale
            }).start()
        }, n.center_container = function() {
            var t = this.scene.screen,
                e = this.container;
            e.x = t.width / 2 - 100 * e.scaleX, e.y = t.height - 100 * e.scaleY
        }, n.update = function() {
            s.update(), this.player && this.player._tempVehicleTicks > 0 ? (this.center_container(), this.updateTime()) : this.container.visible = !1
        }, n.updateTime = function() {
            var t = (this.container, this.timeText),
                e = (this.player, this.player._tempVehicleTicks),
                i = this.scene.settings.drawFPS,
                s = e / i;
            s = s.toFixed(2);
            var n = "";
            10 > s && (n = "0"), n += s, t.text = n, this.container.visible = !0
        }, n.close = function() {
            this.container = null, this.player = null, this.scene = null, this.settings = null, this.timeText = null
        }, e.exports = i
    }, {
        "../../libs/tween": 85
    }],
    66: [function(t, e) {
        function i(t, e, i, s) {
            this.vehicleInit(t), this.createMasses(e, s), this.createSprings(), this.updateCameraFocalPoint(), this.stopSounds(), -1 === i && this.swap()
        }
        e.exports = i;
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = t("./spring"),
            o = t("./vehicle"),
            a = t("./wheel"),
            h = t("./ragdoll"),
            l = (Math.PI, Math.atan2),
            c = Math.floor,
            u = Math.random,
            p = Math.min,
            d = {
                BIKE_GROUND: "bike_ground",
                BIKE_AIR: "bike_air",
                BIKE_FALL_1: "bike_fall_1",
                BIKE_FALL_2: "bike_fall_2",
                BIKE_FALL_3: "bike_fall_3"
            },
            f = i.prototype = new o;
        f.vehicleName = "BMX", f.vehicleInit = f.init, f.vehicleUpdate = f.update, f.masses = null, f.springs = null, f.cosmetics = null, f.slow = !0, f.pedala = 0, f.cosmeticHead = null, f.cosmeticRearWheel = null, f.cosmeticFrontWheel = null, f.swapped = !1, f.ragdoll = null, f.createMasses = function(t, e) {
            this.masses = [];
            var i = new n,
                r = new a(new s(t.x + 21, t.y + 3), this),
                o = new a(new s(t.x + -21, t.y + 3), this);
            i.init(new s(t.x, t.y - 36), this), i.drive = this.createRagdoll.bind(this), o.radius = 11.7, r.radius = 11.7, i.radius = 14, i.vel.equ(e), o.vel.equ(e), r.vel.equ(e), this.masses.push(i), this.masses.push(o), this.masses.push(r), this.head = i, this.frontWheel = r, this.rearWheel = o
        }, f.createSprings = function() {
            this.springs = [];
            var t = new r(this.head, this.rearWheel, this),
                e = new r(this.rearWheel, this.frontWheel, this),
                i = new r(this.frontWheel, this.head, this);
            e.lrest = 42, e.leff = 42, e.springConstant = .35, e.dampConstant = .3, t.lrest = 45, t.leff = 45, t.springConstant = .35, t.dampConstant = .3, i.lrest = 45, i.leff = 45, i.springConstant = .35, i.dampConstant = .3, this.springs.push(t), this.springs.push(e), this.springs.push(i), this.rearSpring = t, this.chasse = e, this.frontSpring = i
        }, f.createRagdoll = function() {
            this.ragdoll = new h(this.getStickMan(), this), this.ragdoll.zero(this.head.vel, this.rearWheel.vel), this.ragdoll.dir = this.dir, this.rearWheel.motor = 0, this.rearWheel.brake = !1, this.frontWheel.brake = !1, this.head.collide = !1, this.updateCameraFocalPoint(), this.player.isInFocus() && this.playBailSound(), this.dead()
        }, f.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND)
        }, f.playBailSound = function() {
            var t = this.scene.sound,
                e = p(this.speed / 50, 1),
                i = c(3 * u()) + 1;
            switch(i) {
                case 1:
                    t.play(d.BIKE_FALL_1, e);
                    break;
                case 2:
                    t.play(d.BIKE_FALL_2, e);
                    break;
                case 3:
                    t.play(d.BIKE_FALL_3, e)
            }
        }, f.updateCameraFocalPoint = function() {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head
        }, f.getStickMan = function() {
            var t = this.dir,
                e = this.head,
                i = this.frontWheel,
                n = this.rearWheel,
                r = this.pedala,
                o = i.pos.sub(n.pos),
                a = e.pos.sub(i.pos.add(n.pos).factor(.5)),
                h = new s(o.y * t, -o.x * t),
                l = {};
            l.head = n.pos.add(o.factor(.35)).add(a.factor(1.2)), l.lHand = l.rHand = n.pos.add(o.factor(.8)).add(h.factor(.68));
            var c = l.head.sub(l.lHand);
            c = new s(c.y * t, -c.x * t), l.lElbow = l.rElbow = l.head.add(l.lHand).factor(.5).add(c.factor(130 / c.lenSqr())), l.waist = n.pos.add(o.factor(.2)).add(h.factor(.5));
            var u = new s(6 * Math.cos(r), 6 * Math.sin(r));
            return l.lFoot = n.pos.add(o.factor(.4)).add(h.factor(.05)).add(u), c = l.waist.sub(l.lFoot), c = new s(-c.y * t, c.x * t), l.lKnee = l.waist.add(l.lFoot).factor(.5).add(c.factor(160 / c.lenSqr())), l.rFoot = n.pos.add(o.factor(.4)).add(h.factor(.05)).sub(u), c = l.waist.sub(l.rFoot), c = new s(-c.y * t, c.x * t), l.rKnee = l.waist.add(l.rFoot).factor(.5).add(c.factor(160 / c.lenSqr())), l
        }, f.update = function() {
            if(this.crashed === !1 && (this.updateSound(), this.control()), this.explosion) this.explosion.update();
            else {
                for(var t = this.springs, e = t.length, i = e - 1; i >= 0; i--) t[i].update();
                for(var s = this.masses, n = s.length, r = n - 1; r >= 0; r--) s[r].update();
                if(this.rearWheel.contact && this.frontWheel.contact && (this.slow = !1), this.slow === !0) {
                    this.crashed === !1 && this.control();
                    for(var i = e - 1; i >= 0; i--) t[i].update();
                    for(var r = n - 1; r >= 0; r--) s[r].update()
                }
                this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle()
            }
            this.updateCameraFocalPoint()
        }, f.updateSound = function() {
            if(this.player.isInFocus()) {
                this.updateSpeed();
                var t = p(this.speed / 50, 1),
                    e = this.scene.sound;
                this.rearWheel.contact || this.frontWheel.contact ? (e.play(d.BIKE_GROUND, t), e.stop(d.BIKE_AIR)) : (e.play(d.BIKE_AIR, t), e.stop(d.BIKE_GROUND))
            }
        }, f.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND)
        }, f.swap = function() {
            this.dir = -1 * this.dir, this.chasse.swap();
            var t = this.rearSpring.leff;
            this.rearSpring.leff = this.frontSpring.leff, this.frontSpring.leff = t
        }, f.control = function() {
            var t = this.gamepad,
                e = t.isButtonDown("up"),
                i = t.isButtonDown("down"),
                s = (t.isButtonDown("back"), t.isButtonDown("left")),
                n = t.isButtonDown("right"),
                r = t.isButtonDown("z"),
                o = e ? 1 : 0,
                a = this.rearWheel;
            a.motor += (o - a.motor) / 10, r && !this.swapped && (this.swap(), this.swapped = !0), r || (this.swapped = !1), e && (this.pedala += this.rearWheel.speed / 5), a.brake = i, i && this.frontSpring.contract(-10, 10), this.frontWheel.brake = this.dir > 0 && n && i ? !0 : this.dir < 0 && s && i ? !0 : !1;
            var h = s ? 1 : 0;
            h += n ? -1 : 0, this.rearSpring.contract(5 * h * this.dir, 5), this.frontSpring.contract(5 * -h * this.dir, 5), this.chasse.rotate(h / 6), !h && e && (this.rearSpring.contract(-7, 5), this.frontSpring.contract(7, 5))
        }, f.draw = function() {
            if(this.explosion) this.explosion.draw();
            else {
                var t = this.scene.game.canvas.getContext("2d");
                if(t.imageSmoothingEnabled = !0, t.webkitImageSmoothingEnabled = !0, t.mozImageSmoothingEnabled = !0, this.settings.developerMode)
                    for(var e = this.masses, i = e.length, s = i - 1; s >= 0; s--) e[s].draw();
                this.drawBikeFrame()
            }
        }, f.updateDrawHeadAngle = function() {
            var t = this.frontWheel.pos,
                e = this.rearWheel.pos,
                i = t.x,
                s = t.y,
                n = e.x,
                r = e.y,
                o = i - n,
                a = s - r;
            this.drawHeadAngle = -(l(o, a) - Math.PI / 2)
        }, f.drawBikeFrame = function() {
            var t = this.scene,
                e = this.rearWheel.pos.toScreen(t),
                i = this.frontWheel.pos.toScreen(t),
                n = this.head.pos.toScreen(t),
                r = (t.game.pixelRatio, this.player._opacity),
                o = i.sub(e),
                a = new s((i.y - e.y) * this.dir, (e.x - i.x) * this.dir),
                h = this.pedala,
                l = this.dir,
                c = t.camera.zoom,
                u = t.game.canvas.getContext("2d");
            u.globalAlpha = r, u.strokeStyle = "rgba(0,0,0,1)", u.lineWidth = 3 * c, u.lineCap = "round", u.lineJoin = "round", u.beginPath(), u.fillStyle = "rgba(200,200, 200, 0.2)", u.arc(i.x, i.y, 10.5 * c, 0, 2 * Math.PI, !1), u.fill(), u.stroke(), u.beginPath(), u.arc(e.x, e.y, 10.5 * c, 0, 2 * Math.PI, !1), u.fill(), u.stroke();
            var p = e.add(o.factor(.3)).add(a.factor(.25)),
                d = e.add(o.factor(.4)).add(a.factor(.05)),
                f = e.add(o.factor(.84)).add(a.factor(.42)),
                v = e.add(o.factor(.84)).add(a.factor(.37));
            u.beginPath(), u.strokeStyle = "rgba(0,0,0,1)", u.moveTo(e.x, e.y), u.lineTo(p.x, p.y), u.lineTo(f.x, f.y), u.moveTo(v.x, v.y), u.lineTo(d.x, d.y), u.lineTo(e.x, e.y), u.stroke(), u.beginPath(), u.strokeStyle = "rgba(0,0,0,1)", u.lineWidth = Math.max(1 * c, .5), u.arc(d.x, d.y, 3 * c, 0, 2 * Math.PI, !1), u.stroke();
            var g = new s(6 * Math.cos(h) * c, 6 * Math.sin(h) * c),
                m = d.add(g),
                y = d.sub(g);
            u.beginPath(), u.moveTo(m.x, m.y), u.lineTo(y.x, y.y), u.stroke();
            var w = e.add(o.factor(.25)).add(a.factor(.4)),
                _ = e.add(o.factor(.17)).add(a.factor(.38)),
                x = e.add(o.factor(.3)).add(a.factor(.45));
            u.beginPath(), u.strokeStyle = "rgba(0,0,0,1)", u.lineWidth = 3 * c, u.moveTo(_.x, _.y), u.lineTo(x.x, x.y), u.moveTo(d.x, d.y), u.lineTo(w.x, w.y);
            var b = e.add(o.factor(1)).add(a.factor(0)),
                T = e.add(o.factor(.97)).add(a.factor(0)),
                k = e.add(o.factor(.8)).add(a.factor(.48));
            u.moveTo(b.x, b.y), u.lineTo(T.x, T.y), u.lineTo(k.x, k.y);
            var C = e.add(o.factor(.86)).add(a.factor(.5)),
                S = e.add(o.factor(.82)).add(a.factor(.65)),
                P = e.add(o.factor(.78)).add(a.factor(.67));
            if(u.moveTo(k.x, k.y), u.lineTo(C.x, C.y), u.lineTo(S.x, S.y), u.lineTo(P.x, P.y), u.stroke(), this.crashed) this.ragdoll && this.ragdoll.draw();
            else {
                a = n.sub(e.add(o.factor(.5)));
                var M = p.add(o.factor(-.1)).add(a.factor(.3)),
                    D = m.sub(M),
                    A = new s(D.y * l, -D.x * l);
                A = A.factor(c * c);
                var E = M.add(D.factor(.5)).add(A.factor(200 / D.lenSqr())),
                    I = m.add(D.factor(.12)).add(A.factor(50 / D.lenSqr()));
                D = y.sub(M), A = new s(D.y * l, -D.x * l), A = A.factor(c * c);
                var z = M.add(D.factor(.5)).add(A.factor(200 / D.lenSqr())),
                    O = y.add(D.factor(.12)).add(A.factor(50 / D.lenSqr()));
                u.strokeStyle = "rgba(0,0,0,0.5)", u.lineWidth = 6 * c, u.beginPath(), u.moveTo(y.x, y.y), u.lineTo(z.x, z.y), u.lineTo(M.x, M.y), u.stroke(), u.lineWidth = 4 * c, u.beginPath(), u.moveTo(y.x, y.y), u.lineTo(O.x, O.y), u.stroke(), u.lineWidth = 6 * c, u.strokeStyle = "rgba(0,0,0,1)", u.beginPath(), u.moveTo(m.x, m.y), u.lineTo(E.x, E.y), u.lineTo(M.x, M.y), u.stroke(), u.lineWidth = 6 * c, u.beginPath(), u.moveTo(m.x, m.y), u.lineTo(I.x, I.y), u.stroke();
                var j = p.add(o.factor(.05)).add(a.factor(.9));
                u.lineWidth = 8 * c, u.beginPath(), u.moveTo(M.x, M.y), u.lineTo(j.x, j.y), u.stroke();
                var L = p.add(o.factor(.15)).add(a.factor(1.05));
                o = j.sub(P), a = new s(o.y * l, -o.x * l), a = a.factor(c * c);
                var F = P.add(o.factor(.4)).add(a.factor(130 / o.lenSqr()));
                u.lineWidth = 5 * c, u.beginPath(), u.moveTo(j.x, j.y), u.lineTo(F.x, F.y), u.lineTo(P.x, P.y), u.stroke();
                var B = this.cosmetics,
                    R = GameInventoryManager.getItem(B.head),
                    W = this.drawHeadAngle;
                R.draw(u, L.x, L.y, W, c, this.dir), u.globalAlpha = 1
            }
        }
    }, {
        "../math/cartesian": 14,
        "./mass": 70,
        "./ragdoll": 75,
        "./spring": 76,
        "./vehicle": 78,
        "./wheel": 79
    }],
    67: [function(t, e) {
        function i(t, e, i) {
            this.massInit(t, e), this.color = i, this.pos.x = t.x + 5 * (n() - n()), this.pos.y = t.y + 5 * (n() - n()), this.old.x = this.pos.x, this.old.y = this.pos.y, this.vel.y = 11 * (n() - n()), this.vel.x = 11 * (n() - n()), this.radius = 2 * n() * 5, this.angle = 6.2 * n(), this.speed = 1 * n() - 1 * n(), this.friction = .05
        }
        var s = (t("../math/cartesian"), t("./mass")),
            n = (t("./spring"), Math.random),
            r = Math.pow,
            o = Math.sqrt,
            a = Math.cos,
            h = Math.sin,
            l = [1, .7, .8, .9, .5, 1, .7, 1],
            c = i.prototype = new s;
        c.massInit = c.init, c.massUpdate = c.update, c.color = "black", c.drive = function(t, e) {
            var i = this.vel,
                s = this.pos;
            this.speed = (t * i.x + e * i.y) / this.radius, this.angle += this.speed;
            var n = -(t * i.x + e * i.y) * this.friction;
            s.x += t * n, s.y += e * n;
            var a = o(r(t, 2) + r(e, 2));
            if(a > 0) {
                var h = -e / a,
                    l = t / a,
                    c = .8 * (h * i.x + l * i.y);
                this.old.x += h * c, this.old.y += l * c
            }
        }, c.update = function() {
            {
                var t = this.scene;
                t.settings
            }
            this.angle += this.speed, this.massUpdate()
        }, c.draw = function() {
            var t = this.scene.screen,
                e = this.scene.camera,
                i = t.realToScreen(this.pos.x, "x"),
                s = t.realToScreen(this.pos.y, "y"),
                n = 0,
                r = e.zoom,
                o = this.angle,
                c = l[0] * r * this.radius,
                u = i + c * a(o),
                p = s + c * h(o),
                d = this.scene.game.canvas.getContext("2d");
            for(d.lineWidth = 1 * r, d.strokeStyle = "#000000", d.beginPath(), d.moveTo(u, p), d.fillStyle = this.color; n++ < 8;) c = l[n - 1] * r * this.radius, u = i + c * a(o + 6.283 * n / 8), p = s + c * h(o + 6.283 * n / 8), d.lineTo(u, p);
            d.fill(), d.stroke()
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./mass": 70,
        "./spring": 76
    }],
    68: [function(t, e) {
        function i(t, e) {
            this.time = 20, this.gravity = new s(0, .3), this.scene = e, this.createMasses(t), this.positionX = t.x, this.positionY = t.y
        }
        var s = t("../math/cartesian"),
            n = (t("./mass"), t("./debris")),
            r = (t("./spring"), Math.random),
            o = Math.cos,
            a = Math.sin,
            h = i.prototype;
        h.vehicleInit = h.init, h.complete = !1, h.time = 0, h.powerupsEnabled = !1, h.draw = function(t) {
            var e = this.time,
                i = this.positionX,
                s = this.positionY,
                n = this.scene.camera.zoom,
                h = this.scene.screen,
                l = this.scene.game.canvas.getContext("2d");
            if(l.globalAlpha = t, e > 0) {
                e -= 10;
                var c = h.realToScreen(i, "x"),
                    u = h.realToScreen(s, "y"),
                    p = 0,
                    d = 6.2 * r(),
                    f = e * n,
                    v = c + f * o(d),
                    g = u + f * a(d);
                for(l.lineWidth = 0, l.strokeStyle = "black", l.beginPath(), l.moveTo(v, g), l.fillStyle = "black"; p++ < 16;) f = (e + 30 * r()) * n, v = c + f * o(d + 6.283 * p / 16), g = u + f * a(d + 6.283 * p / 16), l.lineTo(v, g);
                l.fill(), l.stroke()
            }
            var m = this.masses;
            for(var y in m) m[y].draw();
            l.globalAlpha = 1, this.time = e
        }, h.createMasses = function(t) {
            this.masses = [], this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000")), this.masses.push(new n(t, this, "#000000"))
        }, h.update = function() {
            var t = this.masses;
            for(var e in t) t[e].update()
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./debris": 67,
        "./mass": 70,
        "./spring": 76
    }],
    69: [function(t, e) {
        function i(t, e, i) {
            this.vehicleInit(t), this.createMasses(e), this.createSprings(), this.createCockpit(), this.updateCameraFocalPoint(), this.stopSounds(), -1 === i && this.swap()
        }
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = t("./spring"),
            o = t("./vehicle"),
            a = t("./prop"),
            h = (t("./ragdoll"), Math.PI, Math.atan2),
            l = Math.min,
            c = {
                HELICOPTER: "helicopter"
            },
            u = i.prototype = new o;
        u.vehicleName = "Helicopter", u.vehicleInit = u.init, u.vehicleUpdate = u.update, u.vehicleDraw = u.draw, u.masses = null, u.springs = null, u.slow = !0, u.swapped = !1, u.createCockpit = function() {
            var t = document.createElement("canvas");
            this.canvasCockpit = t
        }, u.drawCockpit = function() {
            var t = this.canvasCockpit,
                e = this.masses,
                i = this.scene,
                s = i.camera.zoom,
                n = e[0].radius * s * .9,
                r = 50 * s,
                o = 50 * s;
            t.width = r, t.height = o;
            var a = 0,
                h = 0,
                l = Math.max(2 * s, 1),
                c = t.getContext("2d");
            c.save(), c.translate(r / 2, o / 2), c.scale(1.3, 1), c.beginPath(), c.arc(0, 0, n, 0, 1.5 * Math.PI, !1), c.lineTo(a, h), c.lineTo(a + n, h), c.closePath(), c.restore(), c.fillStyle = "#000000", c.fill(), c.lineWidth = l, c.strokeStyle = "black", c.stroke(), c.save(), c.translate(r / 2, o / 2), c.scale(1.3, 1), c.beginPath(), c.arc(a, h, n, 0, 1.5 * Math.PI, !0), c.restore(), c.lineWidth = l, c.strokeStyle = "black", c.stroke()
        }, u.createMasses = function(t) {
            var e = [];
            e.push(new a(new s(t.x + 0, t.y + 18), this));
            var i = new n,
                r = new n,
                o = new n,
                h = new n;
            i.init(new s(t.x + -17, t.y + 42), this), r.init(new s(t.x + 17, t.y + 42), this), o.init(new s(t.x + -40, t.y + 15), this), h.init(new s(t.x + 40, t.y + 15), this), e.push(i), e.push(r), e.push(o), e.push(h), e[0].radius = 18, e[1].radius = 8, e[2].radius = 8, e[3].grav = !1, e[4].grav = e[4].collide = !1, e[1].friction = .2, e[2].friction = .2, this.head = e[0], this.mass2 = e[1], this.mass3 = e[2], this.mass4 = e[3], this.rotor = 0, this.rotor2 = 0, this.dir = 1;
            var l = this;
            e[3].drive = this.head.drive = function() {
                l.explode()
            }, this.focalPoint = e[0], this.masses = e
        }, u.createSprings = function() {
            var t = this.masses,
                e = [];
            e.push(new r(t[0], t[1], this)), e.push(new r(t[2], t[0], this)), e.push(new r(t[2], t[1], this)), e.push(new r(t[0], t[3], this)), e.push(new r(t[1], t[3], this)), e.push(new r(t[0], t[4], this)), e.push(new r(t[2], t[4], this)), this.spring1 = e[0], this.spring2 = e[1], this.spring3 = e[2], this.spring4 = e[3], this.spring5 = e[4], this.spring6 = e[5], this.spring7 = e[6], e[0].leff = e[4].lrest = 30, e[1].leff = e[4].lrest = 30, e[2].leff = e[4].lrest = 35, e[4].leff = e[4].lrest = 35, e[6].leff = e[4].lrest = 35;
            for(var i in e) e[i].dampConstant = .4;
            for(var i in e) e[i].springConstant = .5;
            this.springs = e
        }, u.updateCameraFocalPoint = function() {}, u.update = function() {
            if(this.crashed === !1 && (this.updateSound(), this.control()), this.explosion) this.explosion.update();
            else {
                for(var t = this.springs, e = t.length, i = e - 1; i >= 0; i--) t[i].update();
                for(var s = this.masses, n = s.length, r = n - 1; r >= 0; r--) s[r].update();
                if((this.masses[1].contact || this.masses[2].contact) && (this.slow = !1), this.slow === !0) {
                    this.crashed === !1 && this.control();
                    for(var i = e - 1; i >= 0; i--) t[i].update();
                    for(var r = n - 1; r >= 0; r--) s[r].update()
                }
                this.updateCockpitAngle()
            }
        }, u.updateSound = function() {
            if(this.player.isInFocus()) {
                var t = this.scene.sound,
                    e = l(this.head.motor, 1);
                t.play(c.HELICOPTER, e)
            }
        }, u.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(c.HELICOPTER)
        }, u.swap = function() {
            var t = this.dir,
                e = this.springs,
                i = this.masses;
            t = -1 * t, e[2].swap();
            var n = new s(0, 0),
                r = new s(0, 0),
                o = new s(0, 0);
            n.equ(i[3].pos), r.equ(i[3].old), o.equ(i[3].vel), i[3].pos.equ(i[4].pos), i[3].old.equ(i[4].old), i[3].vel.equ(i[4].vel), i[4].pos.equ(n), i[4].old.equ(r), i[4].vel.equ(o), this.dir = t
        }, u.control = function() {
            var t = this.player.getGamepad(),
                e = t.isButtonDown("up"),
                i = (t.isButtonDown("down"), t.isButtonDown("back")),
                s = t.isButtonDown("left"),
                n = t.isButtonDown("right"),
                r = t.isButtonDown("z"),
                o = this.masses,
                a = this.springs;
            r && !this.swapped && (this.swap(), this.swapped = !0), r || (this.swapped = !1);
            var h = o[1].pos.add(o[2].pos).factor(.5);
            h = o[0].pos.sub(h), h = h.factor(1 / h.len()), o[0].angle.equ(h);
            var l = e ? 1 : 0;
            o[0].motor += (l - o[0].motor) / 10;
            var c = s ? 1 : 0;
            c += n ? -1 : 0, a[2].rotate(c / 6), i && (this.scene.restartTrack = !0)
        }, u.updateCockpitAngle = function() {
            var t = this.masses,
                e = t[0].pos,
                i = t[3].pos,
                s = e.x,
                n = e.y,
                r = i.x,
                o = i.y,
                a = s - r,
                l = n - o;
            this.cockpitAngle = -(h(a, l) - Math.PI / 2)
        }, u.draw = function() {
            if(this.explosion) this.explosion.draw(1);
            else {
                var t = this.scene.game.canvas.getContext("2d");
                t.imageSmoothingEnabled = !0, t.webkitImageSmoothingEnabled = !0, t.mozImageSmoothingEnabled = !0, t.globalAlpha = this.player._opacity;
                var e = this.masses,
                    i = this.dir,
                    n = this.rotor,
                    r = this.rotor2,
                    o = this.scene,
                    a = o.camera.zoom,
                    h = e[1].pos.add(e[2].pos).factor(.5);
                h = e[0].pos.sub(h).factor(a);
                var l = new s(-h.y * i, h.x * i),
                    c = e[0].pos.toScreen(o);
                n += .5 * e[0].motor + .05, n > 6.2831 && (n -= 6.2831), r += .5, r > 6.2831 && (r -= 6.2831), this.rotor = n, this.rotor2 = r, t.strokeStyle = "#000000", t.lineWidth = 5 * a, t.beginPath(), t.moveTo(c.x + .5 * h.x, c.y + .5 * h.y), t.lineTo(c.x + .8 * h.x, c.y + .8 * h.y), t.stroke(), t.lineWidth = 3 * a, t.beginPath();
                var u = .9 * Math.cos(n);
                t.moveTo(c.x + .9 * h.x + l.x * u, c.y + .8 * h.y + l.y * u), t.lineTo(c.x + .9 * h.x - l.x * u, c.y + .8 * h.y - l.y * u), t.stroke();
                var p = e[1].pos.toScreen(o),
                    d = e[2].pos.toScreen(o);
                t.lineWidth = 4 * a, t.stokeStyle = "#666666", t.beginPath(), t.moveTo(p.x - .2 * l.x - .1 * h.x, p.y - .2 * l.y - .1 * h.y), t.lineTo(p.x - .25 * h.x, p.y - .25 * h.y), t.lineTo(d.x - .25 * h.x, d.y - .25 * h.y), t.lineTo(d.x + .2 * l.x - .1 * h.x, d.y + .2 * l.y - .1 * h.y), t.stroke(), t.lineWidth = 3 * a, t.beginPath(), t.moveTo(p.x - .2 * h.x, p.y - .2 * h.y), t.lineTo(c.x, c.y), t.lineTo(d.x - .2 * h.x, d.y - .2 * h.y), t.stroke(), t.lineWidth = 6 * a, t.stokeStyle = "#000000", t.beginPath();
                var f = e[3].pos.toScreen(o);
                t.moveTo(c.x, c.y), t.lineTo(f.x, f.y), t.lineTo(c.x - .1 * h.x, c.y - .3 * h.y), t.stroke(), t.lineWidth = 2 * a, t.stokeStyle = "#000000", t.beginPath();
                var v = 7 * a,
                    g = new s(v * Math.sin(-r), v * Math.cos(-r));
                t.moveTo(f.x + g.x, f.y + g.y), t.lineTo(f.x - g.x, f.y - g.y), t.moveTo(f.x - g.y, f.y + g.x), t.lineTo(f.x + g.y, f.y - g.x), t.stroke(), t.beginPath(), t.lineWidth = 2 * a, t.arc(f.x, f.y, e[3].radius * a, 0, 2 * Math.PI, !1), t.stroke(); {
                    c.x, c.y
                }
                this.drawCockpit();
                var m = this.canvasCockpit,
                    y = m.width,
                    w = m.height,
                    _ = c.x + 5 * a * this.dir,
                    x = c.y + 2 * a,
                    b = 0,
                    T = 0,
                    k = y,
                    C = w,
                    S = b * a - k / 2,
                    P = T * a - C / 2,
                    M = this.cockpitAngle,
                    D = -1 === i,
                    A = this.cosmetics,
                    E = GameInventoryManager.getItem(A.head),
                    I = this.cockpitAngle;
                E.draw(t, _ + 5 * a * i, x - 5 * a, I, .7 * a, i), t.translate(_, x), t.rotate(M), D && t.scale(1, -1), t.drawImage(m, S, P, k, C), D && t.scale(1, -1), t.rotate(-M), t.translate(-_, -x), t.globalAlpha = 1
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./mass": 70,
        "./prop": 74,
        "./ragdoll": 75,
        "./spring": 76,
        "./vehicle": 78
    }],
    70: [function(t, e) {
        function i() {}
        var s = t("../math/cartesian");
        i.prototype = {
            pos: null,
            old: null,
            vel: null,
            parent: null,
            radius: 0,
            friction: 0,
            collide: !1,
            contact: !1,
            scene: null,
            drawPos: null,
            init: function(t, e) {
                this.pos = new s, this.old = new s, this.vel = new s(0, 0), this.drawPos = new s(0, 0), this.radius = 10, this.friction = 0, this.parent = e, this.collide = !0, this.contact = !1, this.scene = e.scene, this.pos.equ(t), this.old.equ(t)
            },
            drive: function(t, e) {
                var i = this.friction,
                    s = -(t * this.vel.x + e * this.vel.y) * i;
                t *= s, e *= s, this.pos.x += t, this.pos.y += e, this.contact = !0
            },
            update: function() {
                var t = this.vel;
                t.inc(this.parent.gravity);
                var e = this.parent.gravity;
                (0 != e.x || 0 != e.y) && (t.x = .99 * t.x, t.y = .99 * t.y), this.pos.inc(this.vel), this.contact = !1, this.collide && this.scene.track.collide(this), t.x = this.pos.x - this.old.x, t.y = this.pos.y - this.old.y, this.old.equ(this.pos)
            },
            draw: function() {
                var t = this.pos.toScreen(this.scene),
                    e = this.scene.game.canvas.getContext("2d"),
                    i = (this.radius, this.scene.camera.zoom);
                e.beginPath(), e.fillStyle = "rgba(0,0,0,1)", e.arc(t.x, t.y, this.radius * i, 0, 2 * Math.PI, !1), e.fill(), e.closePath()
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    71: [function(t, e) {
        var i = function(t, e, i, s) {
            this.color = "rgba(0,0,0,1)", this.vehicleInit(t), this.createMasses(e, s), this.createSprings(), this.updateCameraFocalPoint(), this.stopSounds(), -1 === i && this.swap()
        };
        e.exports = i;
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = t("./spring"),
            o = t("./vehicle"),
            a = t("./wheel"),
            h = t("./ragdoll"),
            l = (t("../cosmetics/heads/head"), t("../cosmetics/heads/forward_cap"), Math.atan2),
            c = Math.min,
            u = Math.floor,
            p = Math.random,
            d = {
                BIKE_GROUND: "bike_ground",
                BIKE_AIR: "bike_air",
                BIKE_FALL_1: "bike_fall_1",
                BIKE_FALL_2: "bike_fall_2",
                BIKE_FALL_3: "bike_fall_3"
            },
            f = i.prototype = new o;
        f.vehicleName = "MTB", f.vehicleInit = f.init, f.vehicleUpdate = f.update, f.vehicleControl = f.control, f.vehicleDraw = f.draw, f.masses = null, f.springs = null, f.cosmetics = null, f.slow = !0, f.pedala = 0, f.swapped = !1, f.ragdoll = null, f.crashed = !1, f.createMasses = function(t, e) {
            this.masses = [];
            var i = new n,
                r = new a(new s(t.x + 23, t.y), this),
                o = new a(new s(t.x + -23, t.y), this);
            i.init(new s(t.x + 2, t.y + -38), this), i.drive = this.createRagdoll.bind(this), o.radius = 14, r.radius = 14, i.radius = 14, i.vel.equ(e), o.vel.equ(e), r.vel.equ(e), this.masses.push(i), this.masses.push(o), this.masses.push(r), this.head = i, this.frontWheel = r, this.rearWheel = o
        }, f.createSprings = function() {
            this.springs = [];
            var t = new r(this.head, this.rearWheel, this),
                e = new r(this.rearWheel, this.frontWheel, this),
                i = new r(this.frontWheel, this.head, this);
            e.lrest = 45, e.leff = 45, e.springConstant = .2, e.dampConstant = .3, t.lrest = 47, t.leff = 47, t.springConstant = .2, t.dampConstant = .3, i.lrest = 45, i.leff = 45, i.springConstant = .2, i.dampConstant = .3, this.springs.push(t), this.springs.push(e), this.springs.push(i), this.rearSpring = t, this.chasse = e, this.frontSpring = i
        }, f.createRagdoll = function() {
            this.ragdoll = new h(this.getStickMan(), this), this.ragdoll.zero(this.head.vel, this.rearWheel.vel), this.ragdoll.dir = this.dir, this.rearWheel.motor = 0, this.rearWheel.brake = !1, this.frontWheel.brake = !1, this.head.collide = !1, this.player.isInFocus() && this.playBailSound(), this.dead()
        }, f.playBailSound = function() {
            var t = this.scene.sound,
                e = c(this.speed / 50, 1),
                i = u(3 * p()) + 1;
            switch(i) {
                case 1:
                    t.play(d.BIKE_FALL_1, e);
                    break;
                case 2:
                    t.play(d.BIKE_FALL_2, e);
                    break;
                case 3:
                    t.play(d.BIKE_FALL_3, e)
            }
        }, f.updateCameraFocalPoint = function() {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head
        }, f.getStickMan = function() {
            var t = this.dir,
                e = this.head,
                i = this.frontWheel,
                n = this.rearWheel,
                r = this.pedala,
                o = i.pos.sub(n.pos),
                a = e.pos.sub(i.pos.add(n.pos).factor(.5)),
                h = new s(o.y * t, -o.x * t),
                l = {};
            l.head = n.pos.add(o.factor(.35)).add(a.factor(1.2)), l.lHand = l.rHand = n.pos.add(o.factor(.8)).add(h.factor(.68));
            var c = l.head.sub(l.lHand);
            c = new s(c.y * t, -c.x * t), l.lElbow = l.rElbow = l.head.add(l.lHand).factor(.5).add(c.factor(130 / c.lenSqr())), l.waist = n.pos.add(o.factor(.2)).add(h.factor(.5));
            var u = new s(6 * Math.cos(r), 6 * Math.sin(r));
            return l.lFoot = n.pos.add(o.factor(.4)).add(h.factor(.05)).add(u), c = l.waist.sub(l.lFoot), c = new s(-c.y * t, c.x * t), l.lKnee = l.waist.add(l.lFoot).factor(.5).add(c.factor(160 / c.lenSqr())), l.rFoot = n.pos.add(o.factor(.4)).add(h.factor(.05)).sub(u), c = l.waist.sub(l.rFoot), c = new s(-c.y * t, c.x * t), l.rKnee = l.waist.add(l.rFoot).factor(.5).add(c.factor(160 / c.lenSqr())), l
        }, f.update = function() {
            if(this.crashed === !1 && (this.updateSound(), this.control()), this.explosion) this.explosion.update();
            else {
                for(var t = this.springs, e = t.length, i = e - 1; i >= 0; i--) t[i].update();
                for(var s = this.masses, n = s.length, r = n - 1; r >= 0; r--) s[r].update();
                if(this.rearWheel.contact && this.frontWheel.contact && (this.slow = !1), this.slow === !0) {
                    this.crashed === !1 && this.control();
                    for(var i = e - 1; i >= 0; i--) t[i].update();
                    for(var r = n - 1; r >= 0; r--) s[r].update()
                }
                this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle()
            }
            this.updateCameraFocalPoint()
        }, f.updateSound = function() {
            if(this.player.isInFocus()) {
                this.updateSpeed();
                var t = c(this.speed / 50, 1),
                    e = this.scene.sound;
                this.rearWheel.contact || this.frontWheel.contact ? (e.play(d.BIKE_GROUND, t), e.stop(d.BIKE_AIR)) : (e.play(d.BIKE_AIR, t), e.stop(d.BIKE_GROUND))
            }
        }, f.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND)
        }, f.updateDrawHeadAngle = function() {
            var t = this.frontWheel.pos,
                e = this.rearWheel.pos,
                i = t.x,
                s = t.y,
                n = e.x,
                r = e.y,
                o = i - n,
                a = s - r;
            this.drawHeadAngle = -(l(o, a) - Math.PI / 2)
        }, f.swap = function() {
            this.dir = -1 * this.dir, this.chasse.swap();
            var t = this.rearSpring.leff;
            this.rearSpring.leff = this.frontSpring.leff, this.frontSpring.leff = t
        }, f.control = function() {
            var t = this.gamepad,
                e = t.isButtonDown("up"),
                i = t.isButtonDown("down"),
                s = (t.isButtonDown("back"), t.isButtonDown("left")),
                n = t.isButtonDown("right"),
                r = t.isButtonDown("z"),
                o = e ? 1 : 0,
                a = this.rearWheel;
            a.motor += (o - a.motor) / 10, r && !this.swapped && (this.swap(), this.swapped = !0), r || (this.swapped = !1), e && (this.pedala += this.rearWheel.speed / 5), a.brake = i, this.frontWheel.brake = this.dir > 0 && n && i ? !0 : this.dir < 0 && s && i ? !0 : !1;
            var h = s ? 1 : 0;
            h += n ? -1 : 0, this.rearSpring.contract(5 * h * this.dir, 5), this.frontSpring.contract(5 * -h * this.dir, 5), this.chasse.rotate(h / 8), !h && e && (this.rearSpring.contract(-7, 5), this.frontSpring.contract(7, 5))
        }, f.draw = function() {
            if(this.explosion) this.explosion.draw(1);
            else {
                var t = this.scene.game.canvas.getContext("2d");
                if(t.imageSmoothingEnabled = !0, t.mozImageSmoothingEnabled = !0, t.oImageSmoothingEnabled = !0, t.webkitImageSmoothingEnabled = !0, this.settings.developerMode)
                    for(var e = this.masses, i = e.length, s = i - 1; s >= 0; s--) e[s].draw();
                this.drawBikeFrame()
            }
        }, f.drawBikeFrame = function() {
            var t = this.scene,
                e = this.frontWheel.pos.toScreen(t),
                i = this.rearWheel.pos.toScreen(t),
                n = this.head.pos.toScreen(t),
                r = (t.game.pixelRatio, t.camera.zoom),
                o = t.game.canvas.getContext("2d"),
                a = this.player._opacity,
                h = e.sub(i),
                l = new s((e.y - i.y) * this.dir, (i.x - e.x) * this.dir),
                c = h.factor(.5);
            i.addOut(c, c), n.subOut(c, c), o.globalAlpha = a, o.strokeStyle = "#000000", o.lineWidth = 3 * r, o.lineCap = "round", o.lineJoin = "round", o.beginPath(), o.fillStyle = "rgba(200,200, 200,0.2)", o.arc(e.x, e.y, 12.5 * r, 0, 2 * Math.PI, !1), o.fill(), o.stroke(), o.beginPath(), o.arc(i.x, i.y, 12.5 * r, 0, 2 * Math.PI, !1), o.fill(), o.stroke(), o.strokeStyle = "rgba(153, 153, 153,1)", o.fillStyle = "rgba(204, 204, 204,1)", o.lineWidth = 1, o.beginPath(), o.arc(e.x, e.y, 6 * r, 0, 2 * Math.PI, !1), o.fill(), o.stroke(), o.beginPath(), o.arc(i.x, i.y, 6 * r, 0, 2 * Math.PI, !1), o.fill(), o.stroke(), o.beginPath(), o.strokeStyle = "#000000", o.lineWidth = 5 * r, o.moveTo(i.x, i.y), o.lineTo(i.x + .4 * h.x + .05 * l.x, i.y + .4 * h.y + .05 * l.y), o.moveTo(i.x + .72 * h.x + .64 * c.x, i.y + .72 * h.y + .64 * c.y), o.lineTo(i.x + .46 * h.x + .4 * c.x, i.y + .46 * h.y + .4 * c.y), o.lineTo(i.x + .4 * h.x + .05 * l.x, i.y + .4 * h.y + .05 * l.y), o.stroke(), o.beginPath(), o.lineWidth = 2 * r, o.strokeStyle = "#000000", o.moveTo(i.x + .72 * h.x + .64 * c.x, i.y + .72 * h.y + .64 * c.y), o.lineTo(i.x + .43 * h.x + .05 * l.x, i.y + .43 * h.y + .05 * l.y), o.stroke(), o.beginPath(), o.lineWidth = 1 * r, o.moveTo(i.x + .46 * h.x + .4 * c.x, i.y + .46 * h.y + .4 * c.y), o.lineTo(i.x + .28 * h.x + .5 * c.x, i.y + .28 * h.y + .5 * c.y), o.stroke(), o.beginPath(), o.lineWidth = 2 * r, o.moveTo(i.x + .45 * h.x + .3 * c.x, i.y + .45 * h.y + .3 * c.y), o.lineTo(i.x + .3 * h.x + .4 * c.x, i.y + .3 * h.y + .4 * c.y), o.lineTo(i.x + .25 * h.x + .6 * c.x, i.y + .25 * h.y + .6 * c.y), o.moveTo(i.x + .17 * h.x + .6 * c.x, i.y + .17 * h.y + .6 * c.y), o.lineTo(i.x + .3 * h.x + .6 * c.x, i.y + .3 * h.y + .6 * c.y), o.stroke(), o.beginPath(), o.lineWidth = 3 * r, o.moveTo(e.x, e.y), o.lineTo(i.x + .71 * h.x + .73 * c.x, i.y + .71 * h.y + .73 * c.y), o.lineTo(i.x + .73 * h.x + .77 * c.x, i.y + .73 * h.y + .77 * c.y), o.lineTo(i.x + .7 * h.x + .8 * c.x, i.y + .7 * h.y + .8 * c.y), o.stroke(), o.beginPath(), o.lineWidth = 1 * r;
            var u = new s(6 * Math.cos(this.pedala) * r, 6 * Math.sin(this.pedala) * r);
            if(o.moveTo(i.x + .43 * h.x + .05 * l.x + u.x, i.y + .43 * h.y + .05 * l.y + u.y), o.lineTo(i.x + .43 * h.x + .05 * l.x - u.x, i.y + .43 * h.y + .05 * l.y - u.y), o.stroke(), this.crashed) this.ragdoll && this.ragdoll.draw();
            else {
                h.factorOut(.5, l), i.addOut(l, l), n.subOut(l, l);
                var p = h.factor(.3);
                p.x = i.x + p.x + .25 * l.x, p.y = i.y + p.y + .25 * l.y;
                var d = h.factor(.4);
                d.x = i.x + d.x + .05 * l.x, d.y = i.y + d.y + .05 * l.y;
                var f = d.add(u),
                    v = d.sub(u),
                    g = h.factor(.67);
                g.x = i.x + g.x + .8 * l.x, g.y = i.y + g.y + .8 * l.y;
                var m = h.factor(-.05);
                m.x = p.x + m.x + .42 * l.x, m.y = p.y + m.y + .42 * l.y;
                var y = f.sub(m),
                    w = y.lenSqr();
                c.x = y.y * this.dir, c.y = -y.x * this.dir, c.factorSelf(r * r);
                var _ = y.factor(.5);
                _.x = m.x + _.x + c.x * (200 / y.lenSqr()), _.y = m.y + _.y + c.y * (200 / y.lenSqr());
                var x = y.factor(.12);
                x.x = f.x + x.x + c.x * (50 / w), x.y = f.y + x.y + c.y * (50 / w), v.subOut(m, y), w = y.lenSqr(), c.x = y.y * this.dir, c.y = -y.x * this.dir, c.factorSelf(r * r);
                var b = y.factor(.5);
                b.x = m.x + b.x + c.x * (200 / w), b.y = m.y + b.y + c.y * (200 / w);
                var T = y.factor(.12);
                T.x = v.x + T.x + c.x * (50 / w), T.y = v.y + T.y + c.y * (50 / w), o.strokeStyle = "rgba(0,0,0," + .5 * a + ")", o.lineWidth = 6 * r, o.beginPath(), o.moveTo(v.x, v.y), o.lineTo(b.x, b.y), o.lineTo(m.x, m.y), o.stroke(), o.lineWidth = 4 * r, o.beginPath(), o.moveTo(v.x, v.y), o.lineTo(T.x, T.y), o.stroke(), o.lineWidth = 6 * r, o.strokeStyle = "#000000", o.beginPath(), o.moveTo(f.x, f.y), o.lineTo(_.x, _.y), o.lineTo(m.x, m.y), o.stroke(), o.lineWidth = 4 * r, o.beginPath(), o.moveTo(f.x, f.y), o.lineTo(x.x, x.y), o.stroke();
                var k = h.factor(.1);
                k.x = p.x + k.x + .95 * l.x, k.y = p.y + k.y + .95 * l.y, o.lineWidth = 8 * r, o.beginPath(), o.moveTo(m.x, m.y), o.lineTo(k.x, k.y), o.stroke();
                var C = h.factor(.2);
                C.x = p.x + C.x + 1.09 * l.x, C.y = p.y + C.y + 1.09 * l.y, o.beginPath(), o.lineWidth = 2 * r, k.subOut(g, h);
                var S = h.lenSqr();
                l.x = h.y * this.dir, l.y = -h.x * this.dir, l.factorSelf(r * r);
                var P = h.factor(.3);
                P.x = g.x + P.x + l.x * (80 / S), P.y = g.y + P.y + l.y * (80 / S), o.lineWidth = 5 * r, o.beginPath(), o.moveTo(k.x, k.y), o.lineTo(P.x, P.y), o.lineTo(g.x, g.y), o.stroke();
                var M = this.cosmetics,
                    D = GameInventoryManager.getItem(M.head),
                    A = this.drawHeadAngle;
                D.draw(o, C.x, C.y, A, r, this.dir), o.globalAlpha = 1
            }
        }
    }, {
        "../cosmetics/heads/forward_cap": 10,
        "../cosmetics/heads/head": 11,
        "../math/cartesian": 14,
        "./mass": 70,
        "./ragdoll": 75,
        "./spring": 76,
        "./vehicle": 78,
        "./wheel": 79
    }],
    72: [function(t, e) {
        var i = function(t, e) {
            this.id = f++, this._scene = t, this._game = t.game, this._user = e, this._settings = t.settings;
            var i = t.settings.startVehicle;
            t.settings.track && (i = t.settings.track.vehicle), this._baseVehicleType = i, this._gamepad = new n(t), this._ghost = !1, this._color = e.color ? e.color : "#000000", this.setDefaults(), this.createBaseVehicle(new s(0, 35), 1, new s(0, 0))
        };
        e.exports = i;
        var s = t("../math/cartesian"),
            n = t("../utils/gamepad"),
            r = t("./explosion"),
            o = t("./bmx"),
            a = t("./helicopter"),
            h = t("./truck"),
            l = t("./mtb"),
            c = Math.sqrt,
            u = Math.pow,
            p = (Math.min, Math.max),
            d = {};
        d.BMX = o, d.MTB = l, d.HELI = a, d.TRUCK = h;
        var f = 0,
            v = function g(t, e) {
                for(var i in e) try {
                    t[i] = e[i].constructor == Object ? g(t[i], e[i]) : e[i]
                } catch(s) {
                    t[i] = e[i]
                }
                return t
            };
        i.prototype.getCheckpointCount = function() {
            return this._checkpoints.length
        }, i.prototype.setDefaults = function() {
            this._baseVehicle = !1, this._tempVehicleType = null, this._tempVehicle = !1, this._tempVehicleTicks = 0, this._temp_vehicle_options = null, this._addCheckpoint = !1, this._checkpoints = [], this._crashed = !1, this._effect = !1, this._effectTicks = 0, this._opacity = 1, this.complete = !1, this._powerupsConsumed = {
                checkpoints: [],
                targets: [],
                misc: []
            }
        }, i.prototype.hasCheckpoints = function() {
            return this._checkpoints.length > 0
        }, i.prototype.setColor = function(t) {
            this._color = t
        }, i.prototype.dead = function() {
            if(this._crashed = !0, this._ghost === !1) {
                var t = this._scene,
                    e = t.settings,
                    i = t.message;
                t.state.playerAlive = this.isAlive(), this._checkpoints.length > 0 ? e.mobile ? i.show("Tap to go to checkpoint!", !1, "#000000", "#FFFFFF") : i.show("Press Enter For Checkpoint", !1, "#000000", "#FFFFFF") : e.mobile ? i.show("Tap to Restart!", !1, "#000000", "#FFFFFF") : i.show("Press Enter To Restart", !1, "#000000", "#FFFFFF")
            }
        }, i.prototype.setAsGhost = function() {
            this._ghost = !0
        }, i.prototype.isGhost = function() {
            return this._ghost
        }, i.prototype.isAlive = function() {
            return !this._crashed
        }, i.prototype.getTargetsHit = function() {
            return this._powerupsConsumed.targets.length
        }, i.prototype.getGamepad = function() {
            return this._gamepad
        }, i.prototype.setBaseVehicle = function(t) {
            this._baseVehicleType = t, this.reset()
        }, i.prototype.createBaseVehicle = function(t, e, i) {
            this._tempVehicle && this._tempVehicle.stopSounds(), this._baseVehicle = new d[this._baseVehicleType](this, t, e, i), this._tempVehicle = !1, this._tempVehicleType = !1, this._tempVehicleTicks = 0
        }, i.prototype.setTempVehicle = function(t, e, i, s) {
            this._temp_vehicle_options && this._temp_vehicle_options.type === t && (e = this._temp_vehicle_options.ticks + e), this._temp_vehicle_options = {
                type: t,
                ticks: e,
                position: i,
                direction: s
            }
        }, i.prototype.createTempVehicle = function(t, e, i, s) {
            if(this._temp_vehicle_options) {
                var n = this._temp_vehicle_options;
                t = n.type, e = n.ticks, i = n.position, s = n.direction, this._temp_vehicle_options = null
            }
            this._tempVehicleType === t ? this._tempVehicleTicks += e : (this.getActiveVehicle().stopSounds(), this._effect = new r(i, this._scene), this._effectTicks = 45, this._tempVehicleType = t, this._tempVehicle = new d[t](this, i, s), this._tempVehicleTicks = e)
        }, i.prototype.update = function() {
            if(this.complete === !1) {
                var t = this._baseVehicle;
                this._temp_vehicle_options && this.createTempVehicle(), this._tempVehicleTicks > 0 && (t = this._tempVehicle, this._crashed === !1 && this._tempVehicleTicks--, this._tempVehicleTicks <= 0 && this._crashed === !1 && (this._effectTicks = 45, this._effect = new r(this._tempVehicle.focalPoint.pos, this._scene), this.createBaseVehicle(this._tempVehicle.focalPoint.pos, this._tempVehicle.dir, this._tempVehicle.masses[0].vel), t = this._baseVehicle)), this._effectTicks > 0 && (this._effectTicks--, this._effect.update()), t.update(), this._addCheckpoint && (this._createCheckpoint(), this._addCheckpoint = !1)
            }
        }, i.prototype.isInFocus = function() {
            var t = this._scene.camera,
                e = !1;
            return t.playerFocus && t.playerFocus === this && (e = !0), e
        }, i.prototype.updateOpacity = function() {
            var t = 1,
                e = this._scene.camera;
            if(e.playerFocus && e.playerFocus !== this) {
                var i = this.getDistanceBetweenPlayers(e.playerFocus);
                1200 > i && (t = Math.min(i / 500, 1))
            }
            this._opacity = t
        }, i.prototype.drawName = function() {
            var t = this._scene,
                e = (t.settings, this._color),
                i = this._user.d_name,
                s = t.game,
                n = t.camera.zoom,
                r = s.pixelRatio,
                o = s.canvas,
                a = o.getContext("2d"),
                h = this._opacity,
                l = this.getActiveVehicle(),
                c = l.focalPoint.pos.toScreen(t);
            a.globalAlpha = h, a.beginPath(), a.fillStyle = e, a.moveTo(c.x, c.y - 40 * n), a.lineTo(c.x - 5 * n, c.y - 50 * n), a.lineTo(c.x + 5 * n, c.y - 50 * n), a.lineTo(c.x, c.y - 40 * n), a.fill();
            var u = 9 * r * p(n, 1);
            a.font = u + "pt helsinki", a.textAlign = "center", a.fillStyle = e, a.fillText(i, c.x, c.y - 60 * n), a.globalAlpha = 1
        }, i.prototype.draw = function() {
            this.updateOpacity();
            var t = this._baseVehicle;
            this._tempVehicleTicks > 0 && (t = this._tempVehicle), this._effectTicks > 0 && this._effect.draw(this._effectTicks / 100), t.draw(), this.isGhost() && this.drawName()
        }, i.prototype.checkKeys = function() {
            var t = this._gamepad,
                e = this._ghost,
                i = this._scene;
            if(e === !1) {
                if(t.isButtonDown("backspace")) {
                    this.gotoCheckpoint();
                    var s = t.getButtonDownOccurances("backspace");
                    this.removeCheckpoint(s), t.setButtonUp("backspace")
                } else if(t.isButtonDown("enter") && this.canRemoveCheckpoint) {
                    this.gotoCheckpoint();
                    var n = t.getButtonDownOccurances("enter");
                    this.removeCheckpoint(n), t.setButtonUp("enter")
                } else t.isButtonDown("enter") && i.state.playing === !0 ? (this.gotoCheckpoint(), t.setButtonUp("enter"), this.canRemoveCheckpoint = !0) : t.areKeysDown() && !this._crashed && (i.play(), this.canRemoveCheckpoint = !1);
                t.isButtonDown("restart") && (i.restartTrack = !0, t.setButtonUp("restart")), (t.isButtonDown("up") || t.isButtonDown("down") || t.isButtonDown("left") || t.isButtonDown("right")) && i.camera.focusOnMainPlayer()
            }
        }, i.prototype.getDistanceBetweenPlayers = function(t) {
            var e = t.getActiveVehicle(),
                i = this.getActiveVehicle(),
                s = e.focalPoint.pos.x - i.focalPoint.pos.x,
                n = e.focalPoint.pos.y - i.focalPoint.pos.y;
            return c(u(s, 2) + u(n, 2))
        }, i.prototype.getActiveVehicle = function() {
            var t = this._baseVehicle;
            return this._tempVehicleTicks > 0 && (t = this._tempVehicle), t
        }, i.prototype._createCheckpoint = function() {
            var t = {};
            this._tempVehicleTicks > 0 ? (t._tempVehicleType = this._tempVehicleType, t._tempVehicle = JSON.stringify(this._tempVehicle, this._snapshotFilter), t._tempVehicleTicks = this._tempVehicleTicks) : (t._baseVehicleType = this._baseVehicleType, t._baseVehicle = JSON.stringify(this._baseVehicle, this._snapshotFilter)), t._powerupsConsumed = JSON.stringify(this._powerupsConsumed), t._crashed = this._crashed, this._checkpoints.push(t)
        }, i.prototype._snapshotFilter = function(t, e) {
            switch(t) {
                case "parent":
                case "player":
                case "scene":
                case "settings":
                case "masses":
                case "springs":
                case "focalPoint":
                case "gamepad":
                    return void 0;
                case "explosion":
                    return !1;
                default:
                    return e
            }
        }, i.prototype.setCheckpointOnUpdate = function() {
            this._addCheckpoint = !0
        }, i.prototype.crashed = function() {
            this._crashed = !0
        }, i.prototype.gotoCheckpoint = function() {
            var t = this._gamepad,
                e = t.replaying,
                i = this._scene;
            if(this._checkpoints.length > 0) {
                var s = this._checkpoints[this._checkpoints.length - 1];
                if(s._tempVehicle) {
                    this._baseVehicle.stopSounds();
                    var n = this._tempVehicle;
                    this._tempVehicleType !== s._tempVehicleType && (n = new d[s._tempVehicleType](this, {
                        x: 0,
                        y: 0
                    }));
                    var r = JSON.parse(s._tempVehicle);
                    v(n, r), this._tempVehicle = n, this._tempVehicleType = s._tempVehicleType, this._tempVehicleTicks = s._tempVehicleTicks, n.updateCameraFocalPoint()
                } else {
                    var n = this._baseVehicle,
                        r = JSON.parse(s._baseVehicle);
                    v(n, r), this._tempVehicle && this._tempVehicle.stopSounds(), this._baseVehicle = n, this._tempVehicleTicks = 0, this._tempVehicleType = !1, n.updateCameraFocalPoint()
                }
                if(this._powerupsConsumed = JSON.parse(s._powerupsConsumed), this._crashed = s._crashed, e === !1) {
                    var o = i.settings;
                    i.state.playerAlive = this.isAlive(), i.settings.mobile ? i.message.show("Tap to resume", 5, "#826cdc", "#FFFFFF") : i.message.show("Press Backspace To Go Back Further", 5, "#826cdc", "#FFFFFF"), i.track.updatePowerupState(this), o.waitAtCheckpoints && (i.state.playing = !1), i.camera.focusOnMainPlayer()
                }
                i.camera.playerFocus === this && i.camera.fastforward()
            } else e === !1 && this.restartScene()
        }, i.prototype.restartScene = function() {
            var t = this._gamepad,
                e = t.replaying;
            e === !1 && (this._scene.restartTrack = !0)
        }, i.prototype.removeCheckpoint = function(t) {
            if(this._checkpoints.length > 1) {
                for(var e = 0; t > e; e++) this._checkpoints.pop();
                this.gotoCheckpoint()
            } else this.restartScene()
        }, i.prototype.close = function() {
            this.id = null, this._scene = null, this._game = null, this._user = null, this._settings = null, this._baseVehicleType = null, this._gamepad.close(), this._gamepad = null, this._baseVehicle = null, this._tempVehicleType = null, this._tempVehicle = null, this._tempVehicleTicks = null, this._addCheckpoint = null, this._checkpoints = null, this._crashed = null, this._effect = null, this._effectTicks = null, this._powerupsConsumed = null
        }, i.prototype.reset = function() {
            this._tempVehicle && this._tempVehicle.stopSounds(), this._baseVehicle.stopSounds(), this.setDefaults(), this.createBaseVehicle(new s(0, 35), 1, new s(0, 0)), this._gamepad.reset(), this._scene.state.playerAlive = this.isAlive()
        }
    }, {
        "../math/cartesian": 14,
        "../utils/gamepad": 56,
        "./bmx": 66,
        "./explosion": 68,
        "./helicopter": 69,
        "./mtb": 71,
        "./truck": 77
    }],
    73: [function(t, e) {
        var i = function(t) {
            this.scene = t, this.game = t.game, this.settings = t.settings, this.firstPlayer = null, this._players = [], this._playerLookup = {}
        };
        e.exports = i;
        var s = t("./player");
        i.prototype.update = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i].update()
        }, i.prototype.mutePlayers = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) {
                var s = t[i].getActiveVehicle();
                s.stopSounds()
            }
        }, i.prototype.updateGamepads = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i]._gamepad.update()
        }, i.prototype.createPlayer = function(t, e) {
            return new s(this.scene, e)
        }, i.prototype.addPlayer = function(t) {
            this._players.push(t), this._playerLookup[t.id] = t
        }, i.prototype.checkKeys = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i].checkKeys()
        }, i.prototype.draw = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i].draw()
        }, i.prototype.getPlayerByIndex = function(t) {
            return this._players[t]
        }, i.prototype.getPlayerById = function(t) {
            return this._playerLookup[t]
        }, i.prototype.getPlayerCount = function() {
            return this._players.length
        }, i.prototype.reset = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i].reset()
        }, i.prototype.clear = function() {
            this._players = [], this._playerLookup = {}, this._players.push(this.firstPlayer), this._playerLookup[this.firstPlayer.id] = this.firstPlayer
        }, i.prototype._closePlayers = function() {
            for(var t = this._players, e = t.length, i = 0; e > i; i++) t[i].close()
        }, i.prototype.close = function() {
            this._closePlayers(), this._players = null, this.firstPlayer = null, this._playerLookup = null, this.scene = null, this.game = null, this.settings = null
        }
    }, {
        "./player": 72
    }],
    74: [function(t, e) {
        function i(t, e) {
            this.init(t, e), this.motor = 0, this.angle = new s(0, 0), this.radius = 10, this.speed = 0
        }
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = i.prototype = new n;
        r.motor = 0, r.angle = 0, r.speed = 0, r.update = function() {
            var t = this.vel,
                e = this.angle,
                i = this.pos,
                s = this.old,
                n = this.motor;
            t.y += 0, t.inc(e.factor(2 * n)), t = t.factor(.99), i.inc(t), this.contact = !1, this.collide && this.scene.track.collide(this), this.vel = i.sub(s), s.equ(i)
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./mass": 70
    }],
    75: [function(t, e) {
        function i(t, e) {
            this.parent = e;
            var i, o, a, h, l, c, u, p, d, f, v = [],
                g = [],
                m = new s(0, 0);
            i = new n, o = new n, a = new n, h = new n, c = new n, l = new n, u = new n, p = new n, d = new n, f = new n, i.init(m, e), o.init(m, e), a.init(m, e), h.init(m, e), c.init(m, e), l.init(m, e), u.init(m, e), p.init(m, e), d.init(m, e), f.init(m, e), v.push(i), v.push(o), v.push(a), v.push(h), v.push(c), v.push(l), v.push(u), v.push(p), v.push(d), v.push(f), g.push(new r(i, o, this)), g.push(new r(i, a, this)), g.push(new r(a, c, this)), g.push(new r(i, h, this)), g.push(new r(h, l, this)), g.push(new r(o, u, this)), g.push(new r(u, d, this)), g.push(new r(o, p, this)), g.push(new r(p, f, this));
            for(var y in v) v[y].radius = 3;
            for(var y in v) v[y].friction = .05;
            i.radius = o.radius = 8;
            for(var y in g) g[y].springConstant = .4;
            for(var y in g) g[y].dampConstant = .7;
            this.masses = v, this.springs = g, this.head = i, this.waist = o, this.lElbow = a, this.rElbow = h, this.rHand = l, this.lHand = c, this.lKnee = u, this.rKnee = p, this.lFoot = d, this.rFoot = f;
            for(var y in t) this[y].pos.equ(t[y])
        }
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = t("./spring"),
            o = t("./vehicle"),
            a = Math.atan2;
        i.prototype = new o, i.prototype.init = i.prototype.initialize, i.prototype.parent = null, i.prototype.zero = function(t, e) {
            t = t.factor(.7), e = e.factor(.7);
            var i = this.springs,
                s = this.masses;
            for(var n in i) {
                var r = i[n].m2.pos.sub(i[n].m1.pos).len();
                i[n].lrest = r, i[n].leff = r
            }
            for(var n = 1; 4 >= n; n++) i[n].lrest = 13, i[n].leff = 13;
            for(var n in i) i[n].leff > 20 && (i[n].lrest = 20, i[n].leff = 20);
            var o = [this.head, this.lElbow, this.rElbow, this.lHand, this.rHand],
                a = [this.waist, this.lKnee, this.rKnee, this.lFoot, this.rFoot];
            for(var n in o) o[n].old = o[n].pos.sub(t);
            for(var n in a) a[n].old = a[n].pos.sub(e);
            for(var n in s) s[n].vel.equ(s[n].pos.sub(s[n].old)), s[n].vel.x += 1 * (Math.random() - Math.random()), s[n].vel.y += 1 * (Math.random() - Math.random())
        }, i.prototype.draw = function() {
            var t = this.head,
                e = this.waist,
                i = this.lElbow,
                s = this.rElbow,
                n = this.rHand,
                r = this.lHand,
                o = this.lKnee,
                a = this.rKnee,
                h = this.lFoot,
                l = this.rFoot,
                c = this.parent.scene,
                u = c.camera,
                p = u.zoom,
                d = c.game.canvas.getContext("2d"),
                f = (this.dir, this.parent.alpha);
            d.strokeStyle = "rgba(0,0,0," + f + ")", d.lineWidth = 5 * p, d.lineCap = "round", d.lineJoin = "round";
            var v = t.pos.toScreen(c);
            d.beginPath(), d.moveTo(v.x, v.y);
            var g = i.pos.toScreen(c);
            d.lineTo(g.x, g.y);
            var m = r.pos.toScreen(c);
            d.lineTo(m.x, m.y), d.stroke(), d.strokeStyle = "rgba(0,0,0," + .5 * f + ")", d.beginPath(), d.moveTo(v.x, v.y);
            var y = s.pos.toScreen(c);
            d.lineTo(y.x, y.y);
            var w = n.pos.toScreen(c);
            d.lineTo(w.x, w.y), d.stroke(), d.strokeStyle = "rgba(0,0,0," + f + ")", d.lineWidth = 8 * p, d.beginPath(), d.moveTo(v.x, v.y);
            var _ = e.pos.toScreen(c);
            d.lineTo(_.x, _.y), d.stroke(), d.lineWidth = 5 * p, d.beginPath(), d.moveTo(_.x, _.y);
            var x = o.pos.toScreen(c);
            d.lineTo(x.x, x.y);
            var b = h.pos.toScreen(c);
            d.lineTo(b.x, b.y);
            var T = o.pos.sub(e.pos).normalize();
            T = T.factor(4).add(h.pos);
            var k = T.toScreen(c);
            d.lineTo(k.x, k.y), d.stroke(), d.strokeStyle = "rgba(0,0,0," + .5 * f + ")", d.lineWidth = 5 * p, d.beginPath(), d.moveTo(_.x, _.y);
            var C = a.pos.toScreen(c);
            d.lineTo(C.x, C.y);
            var S = a.pos.sub(e.pos).normalize();
            S = S.factor(4).add(l.pos);
            var P = l.pos.toScreen(c);
            d.lineTo(P.x, P.y);
            var M = S.toScreen(c);
            d.lineTo(M.x, M.y), d.stroke(), v.inc(v.sub(_).factor(.25)), d.lineWidth = 1 * p, d.strokeStyle = "rgba(0,0,0," + f + ")", d.fillStyle = "rgba(255,255,255," + f + ")", d.beginPath(), d.arc(v.x, v.y, 5 * p, 0, 1.99999 * Math.PI, !1), d.fill(), d.stroke(), d.strokeStyle = "rgba(0,0,0," + f + ")", d.lineWidth = .5 * p, d.beginPath();
            var D = this.parent.cosmetics,
                A = GameInventoryManager.getItem(D.head),
                E = this.drawHeadAngle;
            A.draw(d, v.x, v.y, E, p, this.dir, 1)
        }, i.prototype.update = function() {
            for(var t = (this.springs, this.masses, this.springs.length - 1); t >= 0; t--) this.springs[t].update();
            for(var e = this.masses.length - 1; e >= 0; e--) this.masses[e].update();
            this.updateDrawHeadAngle()
        }, i.prototype.updateDrawHeadAngle = function() {
            var t, e;
            this.dir < 0 ? (e = this.head.pos, t = this.waist.pos) : (t = this.head.pos, e = this.waist.pos);
            var i = t.x,
                s = t.y,
                n = e.x,
                r = e.y,
                o = i - n,
                h = s - r;
            this.drawHeadAngle = -(a(o, h) + Math.PI)
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./mass": 70,
        "./spring": 76,
        "./vehicle": 78
    }],
    76: [function(t, e) {
        var i = t("../math/cartesian"),
            s = function(t, e, i) {
                this.m1 = t, this.m2 = e, this.parent = i, this.lrest = 40, this.leff = 40, this.dampConstant = .5, this.springConstant = .7
            };
        s.prototype = {
            m1: null,
            m2: null,
            parent: null,
            lrest: 40,
            leff: 40,
            dampConstant: 0,
            springConstant: 0,
            swap: function() {
                var t = new i,
                    e = this.m1,
                    s = this.m2;
                t.equ(e.pos), e.pos.equ(s.pos), s.pos.equ(t), t.equ(e.old), e.old.equ(s.old), s.old.equ(t), t.equ(e.vel), e.vel.equ(s.vel), s.vel.equ(t);
                var n = e.angle;
                e.angle = s.angle, s.angle = n
            },
            update: function() {
                var t = new i(0, 0),
                    e = this.m1,
                    s = this.m2,
                    n = e.pos,
                    r = s.pos,
                    o = e.vel,
                    a = s.vel;
                t.x = r.x - n.x, t.y = r.y - n.y;
                var h = t.len();
                if(!(1 > h)) {
                    var l = 1 / h;
                    t.x *= l, t.y *= l;
                    var c = (h - this.leff) * this.springConstant,
                        u = {
                            x: t.x * c,
                            y: t.y * c
                        },
                        p = a.x - o.x,
                        d = a.y - o.y,
                        f = p * t.x + d * t.y,
                        v = f * this.dampConstant,
                        g = t.x * v,
                        m = t.y * v;
                    u.x += g, u.y += m, a.x += -u.x, a.y += -u.y, o.x += u.x, o.y += u.y
                }
            },
            rotate: function(t) {
                var e = this.m1,
                    i = this.m2,
                    s = i.pos.x - e.pos.x,
                    n = i.pos.y - e.pos.y,
                    r = -n / this.leff,
                    o = s / this.leff;
                e.pos.x += r * t, e.pos.y += o * t, i.pos.x += r * -t, i.pos.y += o * -t
            },
            contract: function(t, e) {
                this.leff += (this.lrest - t - this.leff) / e
            },
            setMasses: function(t, e) {
                this.m1 = t, this.m2 = e
            }
        }, e.exports = s
    }, {
        "../math/cartesian": 14
    }],
    77: [function(t, e) {
        var i = function(t, e, i) {
            this.vehicleInit(t), this.createMasses(e), this.createSprings(), this.stopSounds(), this.updateCameraFocalPoint(), -1 === i && this.swap()
        };
        e.exports = i;
        var s = t("../math/cartesian"),
            n = t("./mass"),
            r = t("./spring"),
            o = t("./vehicle"),
            h = t("./wheel"),
            l = Math.atan2,
            c = Math.min,
            u = (Math.floor, Math.random, Math.sqrt),
            p = Math.pow,
            d = (Math.abs, {
                TRUCK_GROUND: "truck_idle"
            }),
            f = i.prototype = new o;
        f.vehicleName = "TRUCK", f.vehicleInit = f.init, f.vehicleUpdate = f.update, f.vehicleControl = f.control, f.vehicleDraw = f.draw, f.masses = null, f.springs = null, f.cosmetics = null, f.slow = !0, f.pedala = 0, f.swapped = !1, f.crashed = !1;
        f.createMasses = function(t) {
            this.masses = [], this.masses.push(new n), this.masses.push(new n), this.masses[0].init(new s(t.x - 15, t.y + 7), this), this.masses[1].init(new s(t.x + 15, t.y + 7), this), this.masses[0].friction = .1, this.masses[1].friction = .1, this.masses.push(new h(new s(t.x - 20, t.y + 35), this)), this.masses.push(new h(new s(t.x + 20, t.y + 35), this)), this.masses[2].radius = this.masses[3].radius = 14, this.masses[0].radius = this.masses[1].radius = 7, this.head = this.masses[0], this.backMass = this.masses[1], this.rearWheel = this.masses[2], this.frontWheel = this.masses[3]
        }, f.createSprings = function() {
            this.springs = [];
            var t = this.masses;
            this.springs.push(new r(t[0], t[1], this)), this.springs.push(new r(t[0], t[2], this)), this.springs.push(new r(t[1], t[3], this)), this.springs.push(new r(t[0], t[3], this)), this.springs.push(new r(t[1], t[2], this)), this.springs.push(new r(t[2], t[3], this)), this.springs[0].leff = this.springs[0].lrest = 30, this.springs[1].leff = this.springs[1].lrest = 30, this.springs[2].leff = this.springs[2].lrest = 30, this.springs[3].leff = this.springs[3].lrest = 45, this.springs[4].leff = this.springs[4].lrest = 45;
            for(var e in this.springs) this.springs[e].springConstant = .3
        }, f.update = function() {
            if(this.crashed === !1 && (this.updateSound(), this.control()), this.explosion) this.explosion.update();
            else {
                for(var t = this.springs, e = t.length, i = e - 1; i >= 0; i--) t[i].update();
                for(var s = this.masses, n = s.length, r = n - 1; r >= 0; r--) s[r].update();
                if(this.rearWheel.contact && this.frontWheel.contact && (this.slow = !1), this.slow === !0) {
                    this.crashed === !1 && this.control();
                    for(var i = e - 1; i >= 0; i--) t[i].update();
                    for(var r = n - 1; r >= 0; r--) s[r].update()
                }
                this.updateDrawHeadAngle(), this.updateCameraFocalPoint()
            }
        }, f.updateSound = function() {
            if(this.player.isInFocus()) {
                var t = this.scene.sound;
                if(this.rearWheel.contact) {
                    var e = c(this.rearWheel.motor, 1);
                    t.play(d.TRUCK_GROUND, e)
                } else if(this.frontWheel.contact) {
                    var e = c(this.frontWheel.motor, 1);
                    t.play(d.TRUCK_GROUND, e)
                } else t.stop(d.TRUCK_GROUND)
            }
        }, f.updateCameraFocalPoint = function() {
            this.focalPoint = 1 === this.dir ? this.head : this.backMass
        }, f.stopSounds = function() {
            var t = this.scene.sound;
            t.stop(d.TRUCK_GROUND)
        }, f.updateDrawHeadAngle = function() {
            var t = this.frontWheel.pos,
                e = this.rearWheel.pos,
                i = t.x,
                s = t.y,
                n = e.x,
                r = e.y,
                o = i - n,
                a = s - r;
            this.drawHeadAngle = -(l(o, a) - Math.PI / 2)
        }, f.swap = function() {
            this.dir = -1 * this.dir, this.springs[0].swap(), this.springs[5].swap()
        }, f.control = function() {
            var t = this.gamepad,
                e = t.isButtonDown("up"),
                i = t.isButtonDown("down"),
                s = t.isButtonDown("left"),
                n = t.isButtonDown("right"),
                r = t.isButtonDown("z");
            r && !this.swapped && (this.swap(), this.swapped = !0), r || (this.swapped = !1);
            var o = e ? 1 : 0,
                a = this.rearWheel,
                h = this.frontWheel;
            a.motor += (.8 * o - a.motor) / 10, h.motor += (.8 * o - h.motor) / 10, a.brake = i, h.brake = i;
            var l = s ? 1 : 0;
            l += n ? -1 : 0;
            var c = this.springs;
            c[0].rotate(l / 8), c[5].rotate(l / 8)
        }, f.draw = function() {
            if(this.explosion) this.explosion.draw(1);
            else {
                var t = this.scene.game.canvas.getContext("2d");
                if(t.imageSmoothingEnabled = !0, t.mozImageSmoothingEnabled = !0, t.oImageSmoothingEnabled = !0, t.webkitImageSmoothingEnabled = !0, this.settings.developerMode)
                    for(var e = this.masses, i = e.length, s = i - 1; s >= 0; s--) e[s].draw();
                t.globalAlpha = this.player._opacity, this.drawTruck(t), t.globalAlpha = 1
            }
        }, f.drawTruck = function(t) {
            var e = this.scene,
                i = e.camera.zoom,
                s = this.cosmetics,
                n = GameInventoryManager.getItem(s.head),
                r = this.drawHeadAngle,
                o = this.dir,
                a = this.frontWheel.pos.toScreen(e),
                h = this.rearWheel.pos.toScreen(e),
                l = this.head.pos.toScreen(e),
                c = this.backMass.pos.toScreen(e),
                d = (this.masses[1].pos.x - this.masses[0].pos.x) * i,
                f = (this.masses[1].pos.y - this.masses[0].pos.y) * i,
                v = (.5 * (this.masses[0].pos.x + this.masses[1].pos.x) - .5 * (this.masses[2].pos.x + this.masses[3].pos.x)) * i,
                g = (.5 * (this.masses[0].pos.y + this.masses[1].pos.y) - .5 * (this.masses[2].pos.y + this.masses[3].pos.y)) * i;
            t.strokeStyle = "#000000", t.lineWidth = 3 * i, t.lineCap = "round", t.lineJoin = "round";
            var m = c.x - l.x,
                y = c.y - l.y,
                w = u(p(m, 2) + p(y, 2)),
                _ = m / w,
                x = y / w;
            n.draw(t, c.x - .5 * _ * i * 20, c.y - x * i * 20 * .5, r, .45 * i, o), t.strokeStyle = "#444444", t.beginPath(), t.moveTo(l.x - .4 * d - .9 * v, l.y - .4 * f - .9 * g), t.lineTo(l.x + .8 * d - .9 * v, l.y + .8 * f - .9 * g), t.stroke(), t.closePath(), t.save(), t.fillStyle = "#777777", t.beginPath(), t.moveTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g), t.lineTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g), t.lineTo(l.x + 1.4 * d - .7 * v, l.y + 1.4 * f - .7 * g), t.lineTo(l.x + 1.35 * d - .2 * v, l.y + 1.35 * f - .2 * g), t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g), t.lineTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g), t.lineTo(l.x + .5 * d + .2 * v, l.y + .5 * f + .2 * g), t.lineTo(l.x - .35 * d + .2 * v, l.y - .35 * f + .2 * g), t.closePath(), t.fill(), t.save(), t.lineWidth = 2 * i, t.strokeStyle = "#444444", t.beginPath(), t.moveTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g), t.lineTo(l.x - .35 * d + .2 * v, l.y - .35 * f + .2 * g), t.lineTo(l.x + .8 * d + .2 * v, l.y + .8 * f + .2 * g), t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g), t.lineTo(l.x + 1.35 * d - .2 * v, l.y + 1.35 * f - .2 * g), t.lineTo(l.x + 1.4 * d - .7 * v, l.y + 1.4 * f - .7 * g), t.lineTo(l.x - .4 * d - .7 * v, l.y - .4 * f - .7 * g), t.closePath(), t.stroke(), t.strokeStyle = "#444444", t.lineWidth = i, t.beginPath(), t.moveTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g), t.lineTo(l.x + .9 * d - .1 * v, l.y + .9 * f - .1 * g), t.lineTo(l.x + .8 * d + .2 * v, l.y + .8 * f + .2 * g), t.lineTo(l.x + .5 * d + .2 * v, l.y + .5 * f + .2 * g), t.lineTo(l.x + .5 * d - .1 * v, l.y + .5 * f - .1 * g), t.closePath(), t.stroke(), t.beginPath(), this.tire(t, h.x, h.y, 10 * i, i, this.rearWheel.angle), t.closePath(), t.beginPath(), this.tire(t, a.x, a.y, 10 * i, i, this.frontWheel.angle), t.closePath(), t.restore()
        }, f.tire = function(t, e, i, s, n, r) {
            for(t.beginPath(), t.arc(e, i, 10 * n, 0, 2 * Math.PI, !1), t.fillStyle = "#888888", t.fill(), t.lineWidth = 5.9 * n, t.strokeStyle = "#000000", t.closePath(), t.stroke(), t.beginPath(), t.lineWidth = 2 * n, t.strokeStyle = "0x000000", a = 0, s += 3 * n; a++ < 8;) t.moveTo(e + s * Math.cos(r + 6.283 * a / 8), i + s * Math.sin(r + 6.283 * a / 8)), t.lineTo(e + s * Math.cos(r + 6.283 * (a + .5) / 8), i + s * Math.sin(r + 6.283 * (a + .5) / 8));
            for(t.stroke(), t.closePath(), t.beginPath(), t.lineWidth = 2 * n, t.strokeStyle = "0x000000", a = 0, s += -9 * n; a++ < 5;) t.moveTo(e + s * Math.cos(r + 6.283 * a / 5), i + s * Math.sin(r + 6.283 * a / 5)), t.lineTo(e + s * Math.cos(r + 6.283 * (a + .2) / 5), i + s * Math.sin(r + 6.283 * (a + .2) / 5));
            t.closePath(), t.stroke()
        }
    }, {
        "../math/cartesian": 14,
        "./mass": 70,
        "./spring": 76,
        "./vehicle": 78,
        "./wheel": 79
    }],
    78: [function(t, e) {
        var i = function() {};
        e.exports = i; {
            var s = t("../math/cartesian"),
                n = (t("../utils/gamepad"), t("./explosion")),
                r = (Math.sqrt, Math.pow, Math.abs),
                o = (Math.min, Math.floor, Math.round);
            Math.random
        }
        i.prototype.init = function(t) {
            this.player = t, this.scene = t._scene, this.gamepad = t._gamepad, this.settings = t._settings, this.gravity = new s(0, .3), this.complete = !1, this.alive = !0, this.crashed = !1, this.dir = 1, this.ghost = !1, this.ragdoll = !1, this.explosion = !1, this.speed = 0, this.powerupsEnabled = !0, this.createCosmetics()
        }, i.prototype.explode = function() {
            this.scene.sound.play("bomb_sound", 1), this.explosion = new n(this.masses[0].pos, this.scene), this.dead()
        }, i.prototype.createCosmetics = function() {
            var t = this.player._user,
                e = t.cosmetics;
            this.cosmetics = e
        }, i.prototype.updateSpeed = function() {
            this.speed = r(o(this.focalPoint.vel.x + this.focalPoint.vel.y))
        }, i.prototype.close = function() {
            this.scene = null, this.settings = null, this.gravity = null, this.speed = null, this.cosmetics = null, this.explosion = null, this.ragdoll = null, this.ghost = null, this.crashed = null, this.alive = null, this.gamepad = null
        }, i.prototype.dead = function() {
            this.stopSounds(), this.player.dead(), this.crashed = !0, this.alive = !1
        }, i.prototype.moveVehicle = function(t, e) {
            for(var i = this.masses, s = i.length, n = s - 1; n >= 0; n--) i[n].pos.x = i[n].pos.x + t, i[n].pos.y = i[n].pos.y + e, i[n].old.x = i[n].old.x + t, i[n].old.y = i[n].old.y + e
        }, i.prototype.stopSounds = function() {}
    }, {
        "../math/cartesian": 14,
        "../utils/gamepad": 56,
        "./explosion": 68
    }],
    79: [function(t, e) {
        function i(t, e) {
            this.init(t, e), this.motor = 0, this.brake = !1, this.angle = 0, this.speed = 0, this.rotationSpeed = 0
        }
        var s = (t("../math/cartesian"), t("./mass")),
            n = i.prototype = new s;
        n.motor = 0, n.brake = !1, n.angle = 0, n.speed = 0, n.drive = function(t, e) {
            var i = this.pos,
                s = this.motor * this.parent.dir,
                n = s * t,
                r = s * e;
            if(i.x += n, i.y += r, this.brake) {
                var o = .3 * -(t * this.vel.x + e * this.vel.y),
                    a = t * o,
                    h = e * o;
                i.x += a, i.y += h
            }
            this.speed = (t * this.vel.x + e * this.vel.y) / this.radius, this.rotationSpeed = this.speed, this.angle += this.speed, this.contact = !0
        }, n.massUpdate = n.update, n.update = function() {
            var t = this.parent.gravity,
                e = this.pos,
                i = this.old,
                s = this.vel;
            s.x += t.x, s.y += t.y, (0 != t.x || 0 != t.y) && (s.x = .99 * s.x, s.y = .99 * s.y), e.x += s.x, e.y += s.y, this.contact = !1, this.collide && this.scene.track.collide(this), s.x = e.x - i.x, s.y = e.y - i.y, this.old.equ(this.pos), this.rotationSpeed = .999 * this.rotationSpeed
        }, e.exports = i
    }, {
        "../math/cartesian": 14,
        "./mass": 70
    }],
    80: [function(t, e) {
        function i(t) {
            var e = t.settings;
            this.settings = e, this.scene = t, this.zoom = e.cameraStartZoom * t.game.pixelRatio, this.desiredZoom = e.cameraStartZoom * t.game.pixelRatio, this.zooming = !1, this.position = new s(0, 0), this.zoomPercentage = this.getZoomAsPercentage(), this.zoomPoint = !1
        }
        var s = t("../math/cartesian"),
            n = Math.round,
            r = Math.abs,
            o = Math.sqrt,
            a = Math.pow;
        i.prototype = {
            settings: null,
            scene: null,
            zoom: 1,
            position: null,
            desiredZoom: 1,
            zoomPercentage: 0,
            focusIndex: 0,
            playerFocus: null,
            focusOnNextPlayer: function() {
                var t = this.scene.playerManager.getPlayerCount();
                this.focusIndex = (this.focusIndex + 1) % t, this.focusOnPlayer()
            },
            focusOnPlayer: function() {
                var t = this.scene,
                    e = t.playerManager,
                    i = e.getPlayerCount();
                i <= this.focusIndex && (this.focusIndex = 0);
                var s = e.getPlayerByIndex(this.focusIndex);
                if(this.playerFocus !== s) {
                    var n = this.playerFocus;
                    if(this.playerFocus = s, t.vehicleTimer.setPlayer(s), n) {
                        var r = s.getDistanceBetweenPlayers(n);
                        r > 1500 && this.fastforward()
                    } else this.fastforward()
                }
            },
            focusOnMainPlayer: function() {
                0 === this.focusIndex && this.playerFocus || (this.focusIndex = 0, this.focusOnPlayer())
            },
            update: function() {
                if(this.playerFocus) {
                    var t = this.playerFocus.getActiveVehicle(),
                        e = t.focalPoint,
                        i = this.position,
                        s = 3,
                        n = e.pos.x - i.x,
                        r = e.pos.y - i.y,
                        h = o(a(n, 2) + a(r, 2));
                    h > 1500 && (s = 1), i.x += (e.pos.x - i.x) / s, i.y += (e.pos.y - i.y) / s
                }
            },
            updateZoom: function() {
                var t = this.zoom,
                    e = this.desiredZoom;
                t !== e && (this.scene.loading = !0, this._performZoom(), this.zoom === this.desiredZoom && this.zoomComplete())
            },
            zoomToPoint: function(t) {
                var e = (this.zoom, this.scene),
                    i = e.screen,
                    s = this.position,
                    n = this.zoomPoint,
                    r = i.toReal(n.x, "x"),
                    o = i.toReal(n.y, "y"),
                    a = n.x / i.width,
                    h = n.y / i.height,
                    l = i.width / t,
                    c = i.height / t;
                s.x = r - l * a + l / 2, s.y = o - c * h + c / 2
            },
            _performZoom: function() {
                var t = this.scene,
                    e = (t.screen, this.position, this.zoom),
                    i = this.desiredZoom,
                    s = i - e,
                    n = s / 3;
                e += n, r(s) < .05 && (e = i), this.zoomPoint && this.zoomToPoint(e), this.zoom = e
            },
            zoomComplete: function() {
                this.scene.redraw(), this.zooming = !1, this.scene.loading = !1
            },
            setZoom: function(t, e) {
                var i = this.scene;
                this.desiredZoom = n(t * i.game.pixelRatio * 10) / 10, this.zooming = !0, this.desiredZoom === this.zoom && (this.zooming = !1, this.scene.state.loading = !1), this.zoomPoint = !1, null === this.playerFocus && e && (this.zoomPoint = e), this.zoomPercentage = this.getZoomAsPercentage(), i.stateChanged()
            },
            resetZoom: function() {
                var t = this.settings.cameraStartZoom;
                this.setZoom(t)
            },
            getZoomAsPercentage: function() {
                var t = this.scene.settings,
                    e = this.desiredZoom / this.scene.game.pixelRatio / t.cameraStartZoom * 100;
                return 0 | e
            },
            increaseZoom: function() {
                var t = this.scene.settings,
                    e = t.cameraSensitivity,
                    i = this.desiredZoom + 2 * e,
                    s = this.scene.game.pixelRatio,
                    n = t.cameraZoomMax,
                    r = n * s;
                this.setZoom(i / s), this.desiredZoom > r && this.setZoom(n)
            },
            decreaseZoom: function() {
                var t = this.scene.settings,
                    e = t.cameraSensitivity,
                    i = this.desiredZoom - 2 * e,
                    s = this.scene.game.pixelRatio,
                    n = t.cameraZoomMin,
                    r = n * s;
                this.setZoom(i / s), this.desiredZoom < r && this.setZoom(n)
            },
            unfocus: function() {
                this.playerFocus = null, this.scene.vehicleTimer.removePlayer()
            },
            fastforward: function() {
                if(this.playerFocus) {
                    var t = this.playerFocus.getActiveVehicle(),
                        e = t.focalPoint;
                    this.position.x = e.pos.x, this.position.y = e.pos.y
                }
            },
            close: function() {
                this.zoom = null, this.scene = null, this.position = null, this.playerFocus = null
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    81: [function(t, e) {
        function i(t) {
            this.scene = t, this.game = t.game, this.size = new s(0, 0), this.center = new s(0, 0), this.setScreen()
        }
        var s = t("../math/cartesian");
        i.prototype = {
            game: null,
            scene: null,
            size: null,
            center: null,
            width: 0,
            height: 0,
            setScreen: function() {
                var t = this.game.width,
                    e = this.game.height;
                this.width = t, this.height = e, this.size.x = t, this.size.y = e, this.center.x = t / 2, this.center.y = e / 2
            },
            update: function() {
                var t = this.game;
                (t.width !== this.width || t.height !== this.height) && this.setScreen()
            },
            realToScreen: function(t, e) {
                var i = this.scene,
                    s = i.camera,
                    n = i.screen;
                return(t - s.position[e]) * s.zoom + n.center[e]
            },
            toReal: function(t, e) {
                var i = this.scene,
                    s = i.camera,
                    n = i.screen;
                return(t - n.center[e]) / s.zoom + s.position[e]
            },
            close: function() {
                this.width = null, this.height = null, this.center = null, this.size = null, this.game = null, this.scene = null
            }
        }, e.exports = i
    }, {
        "../math/cartesian": 14
    }],
    82: [function() {
        this.createjs = this.createjs || {}, createjs.extend = function(t, e) {
                "use strict";

                function i() {
                    this.constructor = t
                }
                return i.prototype = e.prototype, t.prototype = new i
            }, this.createjs = this.createjs || {}, createjs.promote = function(t, e) {
                "use strict";
                var i = t.prototype,
                    s = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
                if(s) {
                    i[(e += "_") + "constructor"] = s.constructor;
                    for(var n in s) i.hasOwnProperty(n) && "function" == typeof s[n] && (i[e + n] = s[n])
                }
                return t
            }, this.createjs = this.createjs || {}, createjs.indexOf = function(t, e) {
                "use strict";
                for(var i = 0, s = t.length; s > i; i++)
                    if(e === t[i]) return i;
                return -1
            }, this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i) {
                    this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!i, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
                }
                var e = t.prototype;
                e.preventDefault = function() {
                    this.defaultPrevented = this.cancelable && !0
                }, e.stopPropagation = function() {
                    this.propagationStopped = !0
                }, e.stopImmediatePropagation = function() {
                    this.immediatePropagationStopped = this.propagationStopped = !0
                }, e.remove = function() {
                    this.removed = !0
                }, e.clone = function() {
                    return new t(this.type, this.bubbles, this.cancelable)
                }, e.set = function(t) {
                    for(var e in t) this[e] = t[e];
                    return this
                }, e.toString = function() {
                    return "[Event (type=" + this.type + ")]"
                }, createjs.Event = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    this._listeners = null, this._captureListeners = null
                }
                var e = t.prototype;
                t.initialize = function(t) {
                    t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
                }, e.addEventListener = function(t, e, i) {
                    var s;
                    s = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                    var n = s[t];
                    return n && this.removeEventListener(t, e, i), n = s[t], n ? n.push(e) : s[t] = [e], e
                }, e.on = function(t, e, i, s, n, r) {
                    return e.handleEvent && (i = i || e, e = e.handleEvent), i = i || this, this.addEventListener(t, function(t) {
                        e.call(i, t, n), s && t.remove()
                    }, r)
                }, e.removeEventListener = function(t, e, i) {
                    var s = i ? this._captureListeners : this._listeners;
                    if(s) {
                        var n = s[t];
                        if(n)
                            for(var r = 0, o = n.length; o > r; r++)
                                if(n[r] == e) {
                                    1 == o ? delete s[t] : n.splice(r, 1);
                                    break
                                }
                    }
                }, e.off = e.removeEventListener, e.removeAllEventListeners = function(t) {
                    t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
                }, e.dispatchEvent = function(t) {
                    if("string" == typeof t) {
                        var e = this._listeners;
                        if(!e || !e[t]) return !1;
                        t = new createjs.Event(t)
                    } else t.target && t.clone && (t = t.clone());
                    try {
                        t.target = this
                    } catch(i) {}
                    if(t.bubbles && this.parent) {
                        for(var s = this, n = [s]; s.parent;) n.push(s = s.parent);
                        var r, o = n.length;
                        for(r = o - 1; r >= 0 && !t.propagationStopped; r--) n[r]._dispatchEvent(t, 1 + (0 == r));
                        for(r = 1; o > r && !t.propagationStopped; r++) n[r]._dispatchEvent(t, 3)
                    } else this._dispatchEvent(t, 2);
                    return t.defaultPrevented
                }, e.hasEventListener = function(t) {
                    var e = this._listeners,
                        i = this._captureListeners;
                    return !!(e && e[t] || i && i[t])
                }, e.willTrigger = function(t) {
                    for(var e = this; e;) {
                        if(e.hasEventListener(t)) return !0;
                        e = e.parent
                    }
                    return !1
                }, e.toString = function() {
                    return "[EventDispatcher]"
                }, e._dispatchEvent = function(t, e) {
                    var i, s = 1 == e ? this._captureListeners : this._listeners;
                    if(t && s) {
                        var n = s[t.type];
                        if(!n || !(i = n.length)) return;
                        try {
                            t.currentTarget = this
                        } catch(r) {}
                        try {
                            t.eventPhase = e
                        } catch(r) {}
                        t.removed = !1, n = n.slice();
                        for(var o = 0; i > o && !t.immediatePropagationStopped; o++) {
                            var a = n[o];
                            a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), t.removed = !1)
                        }
                    }
                }, createjs.EventDispatcher = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    throw "Ticker cannot be instantiated."
                }
                t.RAF_SYNCHED = "synched", t.RAF = "raf", t.TIMEOUT = "timeout", t.useRAF = !1, t.timingMode = null, t.maxDelta = 0, t.paused = !1, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, createjs.EventDispatcher.initialize(t), t._addEventListener = t.addEventListener, t.addEventListener = function() {
                    return !t._inited && t.init(), t._addEventListener.apply(t, arguments)
                }, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTicks = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._timerId = null, t._raf = !0, t.setInterval = function(e) {
                    t._interval = e, t._inited && t._setupTick()
                }, t.getInterval = function() {
                    return t._interval
                }, t.setFPS = function(e) {
                    t.setInterval(1e3 / e)
                }, t.getFPS = function() {
                    return 1e3 / t._interval
                };
                try {
                    Object.defineProperties(t, {
                        interval: {
                            get: t.getInterval,
                            set: t.setInterval
                        },
                        framerate: {
                            get: t.getFPS,
                            set: t.setFPS
                        }
                    })
                } catch(e) {
                    console.log(e)
                }
                t.init = function() {
                    t._inited || (t._inited = !0, t._times = [], t._tickTimes = [], t._startTime = t._getTime(), t._times.push(t._lastTime = 0), t.interval = t._interval)
                }, t.reset = function() {
                    if(t._raf) {
                        var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                        e && e(t._timerId)
                    } else clearTimeout(t._timerId);
                    t.removeAllEventListeners("tick"), t._timerId = t._times = t._tickTimes = null, t._startTime = t._lastTime = t._ticks = 0, t._inited = !1
                }, t.getMeasuredTickTime = function(e) {
                    var i = 0,
                        s = t._tickTimes;
                    if(!s || s.length < 1) return -1;
                    e = Math.min(s.length, e || 0 | t.getFPS());
                    for(var n = 0; e > n; n++) i += s[n];
                    return i / e
                }, t.getMeasuredFPS = function(e) {
                    var i = t._times;
                    return !i || i.length < 2 ? -1 : (e = Math.min(i.length - 1, e || 0 | t.getFPS()), 1e3 / ((i[0] - i[e]) / e))
                }, t.setPaused = function(e) {
                    t.paused = e
                }, t.getPaused = function() {
                    return t.paused
                }, t.getTime = function(e) {
                    return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1
                }, t.getEventTime = function(e) {
                    return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1
                }, t.getTicks = function(e) {
                    return t._ticks - (e ? t._pausedTicks : 0)
                }, t._handleSynch = function() {
                    t._timerId = null, t._setupTick(), t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick()
                }, t._handleRAF = function() {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._handleTimeout = function() {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._setupTick = function() {
                    if(null == t._timerId) {
                        var e = t.timingMode || t.useRAF && t.RAF_SYNCHED;
                        if(e == t.RAF_SYNCHED || e == t.RAF) {
                            var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                            if(i) return t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch), void(t._raf = !0)
                        }
                        t._raf = !1, t._timerId = setTimeout(t._handleTimeout, t._interval)
                    }
                }, t._tick = function() {
                    var e = t.paused,
                        i = t._getTime(),
                        s = i - t._lastTime;
                    if(t._lastTime = i, t._ticks+=0.5, e && (t._pausedTicks+=0.5, t._pausedTime += s), t.hasEventListener("tick")) {
                        var n = new createjs.Event("tick"),
                            r = t.maxDelta;
                        n.delta = r && s > r ? r : s, n.paused = e, n.time = i, n.runTime = i - t._pausedTime, t.dispatchEvent(n)
                    }
                    for(t._tickTimes.unshift(t._getTime() - i); t._tickTimes.length > 100;) t._tickTimes.pop();
                    for(t._times.unshift(i); t._times.length > 100;) t._times.pop()
                };
                var i = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
                t._getTime = function() {
                    return(i && i.call(performance) || (new Date).getTime()) - t._startTime
                }, createjs.Ticker = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    throw "UID cannot be instantiated"
                }
                t._nextID = 0, t.get = function() {
                    return t._nextID++
                }, createjs.UID = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s, n, r, o, a, h, l) {
                    this.Event_constructor(t, e, i), this.stageX = s, this.stageY = n, this.rawX = null == h ? s : h, this.rawY = null == l ? n : l, this.nativeEvent = r, this.pointerID = o, this.primary = !!a
                }
                var e = createjs.extend(t, createjs.Event);
                e._get_localX = function() {
                    return this.currentTarget.globalToLocal(this.rawX, this.rawY).x
                }, e._get_localY = function() {
                    return this.currentTarget.globalToLocal(this.rawX, this.rawY).y
                }, e._get_isTouch = function() {
                    return -1 !== this.pointerID
                };
                try {
                    Object.defineProperties(e, {
                        localX: {
                            get: e._get_localX
                        },
                        localY: {
                            get: e._get_localY
                        },
                        isTouch: {
                            get: e._get_isTouch
                        }
                    })
                } catch(i) {}
                e.clone = function() {
                    return new t(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
                }, e.toString = function() {
                    return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
                }, createjs.MouseEvent = createjs.promote(t, "Event")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s, n, r) {
                    this.setValues(t, e, i, s, n, r)
                }
                var e = t.prototype;
                t.DEG_TO_RAD = Math.PI / 180, t.identity = null, e.setValues = function(t, e, i, s, n, r) {
                    return this.a = null == t ? 1 : t, this.b = e || 0, this.c = i || 0, this.d = null == s ? 1 : s, this.tx = n || 0, this.ty = r || 0, this
                }, e.append = function(t, e, i, s, n, r) {
                    var o = this.a,
                        a = this.b,
                        h = this.c,
                        l = this.d;
                    return(1 != t || 0 != e || 0 != i || 1 != s) && (this.a = o * t + h * e, this.b = a * t + l * e, this.c = o * i + h * s, this.d = a * i + l * s), this.tx = o * n + h * r + this.tx, this.ty = a * n + l * r + this.ty, this
                }, e.prepend = function(t, e, i, s, n, r) {
                    var o = this.a,
                        a = this.c,
                        h = this.tx;
                    return this.a = t * o + i * this.b, this.b = e * o + s * this.b, this.c = t * a + i * this.d, this.d = e * a + s * this.d, this.tx = t * h + i * this.ty + n, this.ty = e * h + s * this.ty + r, this
                }, e.appendMatrix = function(t) {
                    return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.prependMatrix = function(t) {
                    return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.appendTransform = function(e, i, s, n, r, o, a, h, l) {
                    if(r % 360) var c = r * t.DEG_TO_RAD,
                        u = Math.cos(c),
                        p = Math.sin(c);
                    else u = 1, p = 0;
                    return o || a ? (o *= t.DEG_TO_RAD, a *= t.DEG_TO_RAD, this.append(Math.cos(a), Math.sin(a), -Math.sin(o), Math.cos(o), e, i), this.append(u * s, p * s, -p * n, u * n, 0, 0)) : this.append(u * s, p * s, -p * n, u * n, e, i), (h || l) && (this.tx -= h * this.a + l * this.c, this.ty -= h * this.b + l * this.d), this
                }, e.prependTransform = function(e, i, s, n, r, o, a, h, l) {
                    if(r % 360) var c = r * t.DEG_TO_RAD,
                        u = Math.cos(c),
                        p = Math.sin(c);
                    else u = 1, p = 0;
                    return(h || l) && (this.tx -= h, this.ty -= l), o || a ? (o *= t.DEG_TO_RAD, a *= t.DEG_TO_RAD, this.prepend(u * s, p * s, -p * n, u * n, 0, 0), this.prepend(Math.cos(a), Math.sin(a), -Math.sin(o), Math.cos(o), e, i)) : this.prepend(u * s, p * s, -p * n, u * n, e, i), this
                }, e.rotate = function(e) {
                    e *= t.DEG_TO_RAD;
                    var i = Math.cos(e),
                        s = Math.sin(e),
                        n = this.a,
                        r = this.b;
                    return this.a = n * i + this.c * s, this.b = r * i + this.d * s, this.c = -n * s + this.c * i, this.d = -r * s + this.d * i, this
                }, e.skew = function(e, i) {
                    return e *= t.DEG_TO_RAD, i *= t.DEG_TO_RAD, this.append(Math.cos(i), Math.sin(i), -Math.sin(e), Math.cos(e), 0, 0), this
                }, e.scale = function(t, e) {
                    return this.a *= t, this.b *= t, this.c *= e, this.d *= e, this
                }, e.translate = function(t, e) {
                    return this.tx += this.a * t + this.c * e, this.ty += this.b * t + this.d * e, this
                }, e.identity = function() {
                    return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this
                }, e.invert = function() {
                    var t = this.a,
                        e = this.b,
                        i = this.c,
                        s = this.d,
                        n = this.tx,
                        r = t * s - e * i;
                    return this.a = s / r, this.b = -e / r, this.c = -i / r, this.d = t / r, this.tx = (i * this.ty - s * n) / r, this.ty = -(t * this.ty - e * n) / r, this
                }, e.isIdentity = function() {
                    return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
                }, e.equals = function(t) {
                    return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
                }, e.transformPoint = function(t, e, i) {
                    return i = i || {}, i.x = t * this.a + e * this.c + this.tx, i.y = t * this.b + e * this.d + this.ty, i
                }, e.decompose = function(e) {
                    null == e && (e = {}), e.x = this.tx, e.y = this.ty, e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
                    var i = Math.atan2(-this.c, this.d),
                        s = Math.atan2(this.b, this.a),
                        n = Math.abs(1 - i / s);
                    return 1e-5 > n ? (e.rotation = s / t.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180), e.skewX = e.skewY = 0) : (e.skewX = i / t.DEG_TO_RAD, e.skewY = s / t.DEG_TO_RAD), e
                }, e.copy = function(t) {
                    return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.clone = function() {
                    return new t(this.a, this.b, this.c, this.d, this.tx, this.ty)
                }, e.toString = function() {
                    return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
                }, t.identity = new t, createjs.Matrix2D = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s, n) {
                    this.setValues(t, e, i, s, n)
                }
                var e = t.prototype;
                e.setValues = function(t, e, i, s, n) {
                    return this.visible = null == t ? !0 : !!t, this.alpha = null == e ? 1 : e, this.shadow = i, this.compositeOperation = i, this.matrix = n || this.matrix && this.matrix.identity() || new createjs.Matrix2D, this
                }, e.append = function(t, e, i, s, n) {
                    return this.alpha *= e, this.shadow = i || this.shadow, this.compositeOperation = s || this.compositeOperation, this.visible = this.visible && t, n && this.matrix.appendMatrix(n), this
                }, e.prepend = function(t, e, i, s, n) {
                    return this.alpha *= e, this.shadow = this.shadow || i, this.compositeOperation = this.compositeOperation || s, this.visible = this.visible && t, n && this.matrix.prependMatrix(n), this
                }, e.identity = function() {
                    return this.visible = !0, this.alpha = 1, this.shadow = this.compositeOperation = null, this.matrix.identity(), this
                }, e.clone = function() {
                    return new t(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone())
                }, createjs.DisplayProps = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e) {
                    this.setValues(t, e)
                }
                var e = t.prototype;
                e.setValues = function(t, e) {
                    return this.x = t || 0, this.y = e || 0, this
                }, e.copy = function(t) {
                    return this.x = t.x, this.y = t.y, this
                }, e.clone = function() {
                    return new t(this.x, this.y)
                }, e.toString = function() {
                    return "[Point (x=" + this.x + " y=" + this.y + ")]"
                }, createjs.Point = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s) {
                    this.setValues(t, e, i, s)
                }
                var e = t.prototype;
                e.setValues = function(t, e, i, s) {
                    return this.x = t || 0, this.y = e || 0, this.width = i || 0, this.height = s || 0, this
                }, e.extend = function(t, e, i, s) {
                    return i = i || 0, s = s || 0, t + i > this.x + this.width && (this.width = t + i - this.x), e + s > this.y + this.height && (this.height = e + s - this.y), t < this.x && (this.width += this.x - t, this.x = t), e < this.y && (this.height += this.y - e, this.y = e), this
                }, e.pad = function(t, e, i, s) {
                    return this.x -= t, this.y -= e, this.width += t + i, this.height += e + s, this
                }, e.copy = function(t) {
                    return this.setValues(t.x, t.y, t.width, t.height)
                }, e.contains = function(t, e, i, s) {
                    return i = i || 0, s = s || 0, t >= this.x && t + i <= this.x + this.width && e >= this.y && e + s <= this.y + this.height
                }, e.union = function(t) {
                    return this.clone().extend(t.x, t.y, t.width, t.height)
                }, e.intersection = function(e) {
                    var i = e.x,
                        s = e.y,
                        n = i + e.width,
                        r = s + e.height;
                    return this.x > i && (i = this.x), this.y > s && (s = this.y), this.x + this.width < n && (n = this.x + this.width), this.y + this.height < r && (r = this.y + this.height), i >= n || s >= r ? null : new t(i, s, n - i, r - s)
                }, e.intersects = function(t) {
                    return t.x <= this.x + this.width && this.x <= t.x + t.width && t.y <= this.y + this.height && this.y <= t.y + t.height
                }, e.isEmpty = function() {
                    return this.width <= 0 || this.height <= 0
                }, e.clone = function() {
                    return new t(this.x, this.y, this.width, this.height)
                }, e.toString = function() {
                    return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
                }, createjs.Rectangle = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s, n, r, o) {
                    t.addEventListener && (this.target = t, this.overLabel = null == i ? "over" : i, this.outLabel = null == e ? "out" : e, this.downLabel = null == s ? "down" : s, this.play = n, this._isPressed = !1, this._isOver = !1, this._enabled = !1, t.mouseChildren = !1, this.enabled = !0, this.handleEvent({}), r && (o && (r.actionsEnabled = !1, r.gotoAndStop && r.gotoAndStop(o)), t.hitArea = r))
                }
                var e = t.prototype;
                e.setEnabled = function(t) {
                    if(t != this._enabled) {
                        var e = this.target;
                        this._enabled = t, t ? (e.cursor = "pointer", e.addEventListener("rollover", this), e.addEventListener("rollout", this), e.addEventListener("mousedown", this), e.addEventListener("pressup", this)) : (e.cursor = null, e.removeEventListener("rollover", this), e.removeEventListener("rollout", this), e.removeEventListener("mousedown", this), e.removeEventListener("pressup", this))
                    }
                }, e.getEnabled = function() {
                    return this._enabled
                };
                try {
                    Object.defineProperties(e, {
                        enabled: {
                            get: e.getEnabled,
                            set: e.setEnabled
                        }
                    })
                } catch(i) {}
                e.toString = function() {
                    return "[ButtonHelper]"
                }, e.handleEvent = function(t) {
                    var e, i = this.target,
                        s = t.type;
                    "mousedown" == s ? (this._isPressed = !0, e = this.downLabel) : "pressup" == s ? (this._isPressed = !1, e = this._isOver ? this.overLabel : this.outLabel) : "rollover" == s ? (this._isOver = !0, e = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, e = this._isPressed ? this.overLabel : this.outLabel), this.play ? i.gotoAndPlay && i.gotoAndPlay(e) : i.gotoAndStop && i.gotoAndStop(e)
                }, createjs.ButtonHelper = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s) {
                    this.color = t || "black", this.offsetX = e || 0, this.offsetY = i || 0, this.blur = s || 0
                }
                var e = t.prototype;
                t.identity = new t("transparent", 0, 0, 0), e.toString = function() {
                    return "[Shadow]"
                }, e.clone = function() {
                    return new t(this.color, this.offsetX, this.offsetY, this.blur)
                }, createjs.Shadow = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.EventDispatcher_constructor(), this.complete = !0, this.framerate = 0, this._animations = null, this._frames = null, this._images = null, this._data = null, this._loadCount = 0, this._frameHeight = 0, this._frameWidth = 0, this._numFrames = 0, this._regX = 0, this._regY = 0, this._spacing = 0, this._margin = 0, this._parseData(t)
                }
                var e = createjs.extend(t, createjs.EventDispatcher);
                e.getAnimations = function() {
                    return this._animations.slice()
                };
                try {
                    Object.defineProperties(e, {
                        animations: {
                            get: e.getAnimations
                        }
                    })
                } catch(i) {}
                e.getNumFrames = function(t) {
                    if(null == t) return this._frames ? this._frames.length : this._numFrames || 0;
                    var e = this._data[t];
                    return null == e ? 0 : e.frames.length
                }, e.getAnimation = function(t) {
                    return this._data[t]
                }, e.getFrame = function(t) {
                    var e;
                    return this._frames && (e = this._frames[t]) ? e : null
                }, e.getFrameBounds = function(t, e) {
                    var i = this.getFrame(t);
                    return i ? (e || new createjs.Rectangle).setValues(-i.regX, -i.regY, i.rect.width, i.rect.height) : null
                }, e.toString = function() {
                    return "[SpriteSheet]"
                }, e.clone = function() {
                    throw "SpriteSheet cannot be cloned."
                }, e._parseData = function(t) {
                    var e, i, s, n;
                    if(null != t) {
                        if(this.framerate = t.framerate || 0, t.images && (i = t.images.length) > 0)
                            for(n = this._images = [], e = 0; i > e; e++) {
                                var r = t.images[e];
                                if("string" == typeof r) {
                                    var o = r;
                                    r = document.createElement("img"), r.src = o
                                }
                                n.push(r), r.getContext || r.complete || (this._loadCount++, this.complete = !1, function(t) {
                                    r.onload = function() {
                                        t._handleImageLoad()
                                    }
                                }(this))
                            }
                        if(null == t.frames);
                        else if(t.frames instanceof Array)
                            for(this._frames = [], n = t.frames, e = 0, i = n.length; i > e; e++) {
                                var a = n[e];
                                this._frames.push({
                                    image: this._images[a[4] ? a[4] : 0],
                                    rect: new createjs.Rectangle(a[0], a[1], a[2], a[3]),
                                    regX: a[5] || 0,
                                    regY: a[6] || 0
                                })
                            } else s = t.frames, this._frameWidth = s.width, this._frameHeight = s.height, this._regX = s.regX || 0, this._regY = s.regY || 0, this._spacing = s.spacing || 0, this._margin = s.margin || 0, this._numFrames = s.count, 0 == this._loadCount && this._calculateFrames();
                        if(this._animations = [], null != (s = t.animations)) {
                            this._data = {};
                            var h;
                            for(h in s) {
                                var l = {
                                        name: h
                                    },
                                    c = s[h];
                                if("number" == typeof c) n = l.frames = [c];
                                else if(c instanceof Array)
                                    if(1 == c.length) l.frames = [c[0]];
                                    else
                                        for(l.speed = c[3], l.next = c[2], n = l.frames = [], e = c[0]; e <= c[1]; e++) n.push(e);
                                else {
                                    l.speed = c.speed, l.next = c.next;
                                    var u = c.frames;
                                    n = l.frames = "number" == typeof u ? [u] : u.slice(0)
                                }(l.next === !0 || void 0 === l.next) && (l.next = h), (l.next === !1 || n.length < 2 && l.next == h) && (l.next = null), l.speed || (l.speed = 1), this._animations.push(h), this._data[h] = l
                            }
                        }
                    }
                }, e._handleImageLoad = function() {
                    0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"))
                }, e._calculateFrames = function() {
                    if(!this._frames && 0 != this._frameWidth) {
                        this._frames = [];
                        var t = this._numFrames || 1e5,
                            e = 0,
                            i = this._frameWidth,
                            s = this._frameHeight,
                            n = this._spacing,
                            r = this._margin;
                        t: for(var o = 0, a = this._images; o < a.length; o++)
                            for(var h = a[o], l = h.width, c = h.height, u = r; c - r - s >= u;) {
                                for(var p = r; l - r - i >= p;) {
                                    if(e >= t) break t;
                                    e++, this._frames.push({
                                        image: h,
                                        rect: new createjs.Rectangle(p, u, i, s),
                                        regX: this._regX,
                                        regY: this._regY
                                    }), p += i + n
                                }
                                u += s + n
                            }
                        this._numFrames = e
                    }
                }, createjs.SpriteSheet = createjs.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    this.command = null, this._stroke = null, this._strokeStyle = null, this._oldStrokeStyle = null, this._strokeDash = null, this._oldStrokeDash = null, this._strokeIgnoreScale = !1, this._fill = null, this._instructions = [], this._commitIndex = 0, this._activeInstructions = [], this._dirty = !1, this._storeIndex = 0, this.clear()
                }
                var e = t.prototype,
                    i = t;
                t.getRGB = function(t, e, i, s) {
                    return null != t && null == i && (s = e, i = 255 & t, e = t >> 8 & 255, t = t >> 16 & 255), null == s ? "rgb(" + t + "," + e + "," + i + ")" : "rgba(" + t + "," + e + "," + i + "," + s + ")"
                }, t.getHSL = function(t, e, i, s) {
                    return null == s ? "hsl(" + t % 360 + "," + e + "%," + i + "%)" : "hsla(" + t % 360 + "," + e + "%," + i + "%," + s + ")"
                }, t.BASE_64 = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    a: 26,
                    b: 27,
                    c: 28,
                    d: 29,
                    e: 30,
                    f: 31,
                    g: 32,
                    h: 33,
                    i: 34,
                    j: 35,
                    k: 36,
                    l: 37,
                    m: 38,
                    n: 39,
                    o: 40,
                    p: 41,
                    q: 42,
                    r: 43,
                    s: 44,
                    t: 45,
                    u: 46,
                    v: 47,
                    w: 48,
                    x: 49,
                    y: 50,
                    z: 51,
                    0: 52,
                    1: 53,
                    2: 54,
                    3: 55,
                    4: 56,
                    5: 57,
                    6: 58,
                    7: 59,
                    8: 60,
                    9: 61,
                    "+": 62,
                    "/": 63
                }, t.STROKE_CAPS_MAP = ["butt", "round", "square"], t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
                var s = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                s.getContext && (t._ctx = s.getContext("2d"), s.width = s.height = 1), e.getInstructions = function() {
                    return this._updateInstructions(), this._instructions
                };
                try {
                    Object.defineProperties(e, {
                        instructions: {
                            get: e.getInstructions
                        }
                    })
                } catch(n) {}
                e.isEmpty = function() {
                    return !(this._instructions.length || this._activeInstructions.length)
                }, e.draw = function(t, e) {
                    this._updateInstructions();
                    for(var i = this._instructions, s = this._storeIndex, n = i.length; n > s; s++) i[s].exec(t, e)
                }, e.drawAsPath = function(t) {
                    this._updateInstructions();
                    for(var e, i = this._instructions, s = this._storeIndex, n = i.length; n > s; s++)(e = i[s]).path !== !1 && e.exec(t)
                }, e.moveTo = function(t, e) {
                    return this.append(new i.MoveTo(t, e), !0)
                }, e.lineTo = function(t, e) {
                    return this.append(new i.LineTo(t, e))
                }, e.arcTo = function(t, e, s, n, r) {
                    return this.append(new i.ArcTo(t, e, s, n, r))
                }, e.arc = function(t, e, s, n, r, o) {
                    return this.append(new i.Arc(t, e, s, n, r, o))
                }, e.quadraticCurveTo = function(t, e, s, n) {
                    return this.append(new i.QuadraticCurveTo(t, e, s, n))
                }, e.bezierCurveTo = function(t, e, s, n, r, o) {
                    return this.append(new i.BezierCurveTo(t, e, s, n, r, o))
                }, e.rect = function(t, e, s, n) {
                    return this.append(new i.Rect(t, e, s, n))
                }, e.closePath = function() {
                    return this._activeInstructions.length ? this.append(new i.ClosePath) : this
                }, e.clear = function() {
                    return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0, this._strokeStyle = this._stroke = this._fill = this._strokeDash = null, this._dirty = this._strokeIgnoreScale = !1, this
                }, e.beginFill = function(t) {
                    return this._setFill(t ? new i.Fill(t) : null)
                }, e.beginLinearGradientFill = function(t, e, s, n, r, o) {
                    return this._setFill((new i.Fill).linearGradient(t, e, s, n, r, o))
                }, e.beginRadialGradientFill = function(t, e, s, n, r, o, a, h) {
                    return this._setFill((new i.Fill).radialGradient(t, e, s, n, r, o, a, h))
                }, e.beginBitmapFill = function(t, e, s) {
                    return this._setFill(new i.Fill(null, s).bitmap(t, e))
                }, e.endFill = function() {
                    return this.beginFill()
                }, e.setStrokeStyle = function(t, e, s, n, r) {
                    return this._updateInstructions(!0), this._strokeStyle = this.command = new i.StrokeStyle(t, e, s, n, r), this._stroke && (this._stroke.ignoreScale = r), this._strokeIgnoreScale = r, this
                }, e.setStrokeDash = function(t, e) {
                    return this._updateInstructions(!0), this._strokeDash = this.command = new i.StrokeDash(t, e), this
                }, e.beginStroke = function(t) {
                    return this._setStroke(t ? new i.Stroke(t) : null)
                }, e.beginLinearGradientStroke = function(t, e, s, n, r, o) {
                    return this._setStroke((new i.Stroke).linearGradient(t, e, s, n, r, o))
                }, e.beginRadialGradientStroke = function(t, e, s, n, r, o, a, h) {
                    return this._setStroke((new i.Stroke).radialGradient(t, e, s, n, r, o, a, h))
                }, e.beginBitmapStroke = function(t, e) {
                    return this._setStroke((new i.Stroke).bitmap(t, e))
                }, e.endStroke = function() {
                    return this.beginStroke()
                }, e.curveTo = e.quadraticCurveTo, e.drawRect = e.rect, e.drawRoundRect = function(t, e, i, s, n) {
                    return this.drawRoundRectComplex(t, e, i, s, n, n, n, n)
                }, e.drawRoundRectComplex = function(t, e, s, n, r, o, a, h) {
                    return this.append(new i.RoundRect(t, e, s, n, r, o, a, h))
                }, e.drawCircle = function(t, e, s) {
                    return this.append(new i.Circle(t, e, s))
                }, e.drawEllipse = function(t, e, s, n) {
                    return this.append(new i.Ellipse(t, e, s, n))
                }, e.drawPolyStar = function(t, e, s, n, r, o) {
                    return this.append(new i.PolyStar(t, e, s, n, r, o))
                }, e.append = function(t, e) {
                    return this._activeInstructions.push(t), this.command = t, e || (this._dirty = !0), this
                }, e.decodePath = function(e) {
                    for(var i = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], s = [2, 2, 4, 6, 0], n = 0, r = e.length, o = [], a = 0, h = 0, l = t.BASE_64; r > n;) {
                        var c = e.charAt(n),
                            u = l[c],
                            p = u >> 3,
                            d = i[p];
                        if(!d || 3 & u) throw "bad path data (@" + n + "): " + c;
                        var f = s[p];
                        p || (a = h = 0), o.length = 0, n++;
                        for(var v = (u >> 2 & 1) + 2, g = 0; f > g; g++) {
                            var m = l[e.charAt(n)],
                                y = m >> 5 ? -1 : 1;
                            m = (31 & m) << 6 | l[e.charAt(n + 1)], 3 == v && (m = m << 6 | l[e.charAt(n + 2)]), m = y * m / 10, g % 2 ? a = m += a : h = m += h, o[g] = m, n += v
                        }
                        d.apply(this, o)
                    }
                    return this
                }, e.store = function() {
                    return this._updateInstructions(!0), this._storeIndex = this._instructions.length, this
                }, e.unstore = function() {
                    return this._storeIndex = 0, this
                }, e.clone = function() {
                    var e = new t;
                    return e.command = this.command, e._stroke = this._stroke, e._strokeStyle = this._strokeStyle, e._strokeDash = this._strokeDash, e._strokeIgnoreScale = this._strokeIgnoreScale, e._fill = this._fill, e._instructions = this._instructions.slice(), e._commitIndex = this._commitIndex, e._activeInstructions = this._activeInstructions.slice(), e._dirty = this._dirty, e._storeIndex = this._storeIndex, e
                }, e.toString = function() {
                    return "[Graphics]"
                }, e.mt = e.moveTo, e.lt = e.lineTo, e.at = e.arcTo, e.bt = e.bezierCurveTo, e.qt = e.quadraticCurveTo, e.a = e.arc, e.r = e.rect, e.cp = e.closePath, e.c = e.clear, e.f = e.beginFill, e.lf = e.beginLinearGradientFill, e.rf = e.beginRadialGradientFill, e.bf = e.beginBitmapFill, e.ef = e.endFill, e.ss = e.setStrokeStyle, e.sd = e.setStrokeDash, e.s = e.beginStroke, e.ls = e.beginLinearGradientStroke, e.rs = e.beginRadialGradientStroke, e.bs = e.beginBitmapStroke, e.es = e.endStroke, e.dr = e.drawRect, e.rr = e.drawRoundRect, e.rc = e.drawRoundRectComplex, e.dc = e.drawCircle, e.de = e.drawEllipse, e.dp = e.drawPolyStar, e.p = e.decodePath, e._updateInstructions = function(e) {
                    var i = this._instructions,
                        s = this._activeInstructions,
                        n = this._commitIndex;
                    if(this._dirty && s.length) {
                        i.length = n, i.push(t.beginCmd);
                        var r = s.length,
                            o = i.length;
                        i.length = o + r;
                        for(var a = 0; r > a; a++) i[a + o] = s[a];
                        this._fill && i.push(this._fill), this._stroke && (this._strokeDash !== this._oldStrokeDash && (this._oldStrokeDash = this._strokeDash, i.push(this._strokeDash)), this._strokeStyle !== this._oldStrokeStyle && (this._oldStrokeStyle = this._strokeStyle, i.push(this._strokeStyle)), i.push(this._stroke)), this._dirty = !1
                    }
                    e && (s.length = 0, this._commitIndex = i.length)
                }, e._setFill = function(t) {
                    return this._updateInstructions(!0), this.command = this._fill = t, this
                }, e._setStroke = function(t) {
                    return this._updateInstructions(!0), (this.command = this._stroke = t) && (t.ignoreScale = this._strokeIgnoreScale), this
                }, (i.LineTo = function(t, e) {
                    this.x = t, this.y = e
                }).prototype.exec = function(t) {
                    t.lineTo(this.x, this.y)
                }, (i.MoveTo = function(t, e) {
                    this.x = t, this.y = e
                }).prototype.exec = function(t) {
                    t.moveTo(this.x, this.y)
                }, (i.ArcTo = function(t, e, i, s, n) {
                    this.x1 = t, this.y1 = e, this.x2 = i, this.y2 = s, this.radius = n
                }).prototype.exec = function(t) {
                    t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius)
                }, (i.Arc = function(t, e, i, s, n, r) {
                    this.x = t, this.y = e, this.radius = i, this.startAngle = s, this.endAngle = n, this.anticlockwise = !!r
                }).prototype.exec = function(t) {
                    t.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
                }, (i.QuadraticCurveTo = function(t, e, i, s) {
                    this.cpx = t, this.cpy = e, this.x = i, this.y = s
                }).prototype.exec = function(t) {
                    t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y)
                }, (i.BezierCurveTo = function(t, e, i, s, n, r) {
                    this.cp1x = t, this.cp1y = e, this.cp2x = i, this.cp2y = s, this.x = n, this.y = r
                }).prototype.exec = function(t) {
                    t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y)
                }, (i.Rect = function(t, e, i, s) {
                    this.x = t, this.y = e, this.w = i, this.h = s
                }).prototype.exec = function(t) {
                    t.rect(this.x, this.y, this.w, this.h)
                }, (i.ClosePath = function() {}).prototype.exec = function(t) {
                    t.closePath()
                }, (i.BeginPath = function() {}).prototype.exec = function(t) {
                    t.beginPath()
                }, e = (i.Fill = function(t, e) {
                    this.style = t, this.matrix = e
                }).prototype, e.exec = function(t) {
                    if(this.style) {
                        t.fillStyle = this.style;
                        var e = this.matrix;
                        e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)), t.fill(), e && t.restore()
                    }
                }, e.linearGradient = function(e, i, s, n, r, o) {
                    for(var a = this.style = t._ctx.createLinearGradient(s, n, r, o), h = 0, l = e.length; l > h; h++) a.addColorStop(i[h], e[h]);
                    return a.props = {
                        colors: e,
                        ratios: i,
                        x0: s,
                        y0: n,
                        x1: r,
                        y1: o,
                        type: "linear"
                    }, this
                }, e.radialGradient = function(e, i, s, n, r, o, a, h) {
                    for(var l = this.style = t._ctx.createRadialGradient(s, n, r, o, a, h), c = 0, u = e.length; u > c; c++) l.addColorStop(i[c], e[c]);
                    return l.props = {
                        colors: e,
                        ratios: i,
                        x0: s,
                        y0: n,
                        r0: r,
                        x1: o,
                        y1: a,
                        r1: h,
                        type: "radial"
                    }, this
                }, e.bitmap = function(e, i) {
                    var s = this.style = t._ctx.createPattern(e, i || "");
                    return s.props = {
                        image: e,
                        repetition: i,
                        type: "bitmap"
                    }, this
                }, e.path = !1, e = (i.Stroke = function(t, e) {
                    this.style = t, this.ignoreScale = e
                }).prototype, e.exec = function(t) {
                    this.style && (t.strokeStyle = this.style, this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)), t.stroke(), this.ignoreScale && t.restore())
                }, e.linearGradient = i.Fill.prototype.linearGradient, e.radialGradient = i.Fill.prototype.radialGradient, e.bitmap = i.Fill.prototype.bitmap, e.path = !1, e = (i.StrokeStyle = function(t, e, i, s) {
                    this.width = t, this.caps = e, this.joints = i, this.miterLimit = s
                }).prototype, e.exec = function(e) {
                    e.lineWidth = null == this.width ? "1" : this.width, e.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : t.STROKE_CAPS_MAP[this.caps], e.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : t.STROKE_JOINTS_MAP[this.joints], e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit
                }, e.path = !1, (i.StrokeDash = function(t, e) {
                    this.segments = t, this.offset = e || 0
                }).prototype.exec = function(t) {
                    t.setLineDash && (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS), t.lineDashOffset = this.offset || 0)
                }, i.StrokeDash.EMPTY_SEGMENTS = [], (i.RoundRect = function(t, e, i, s, n, r, o, a) {
                    this.x = t, this.y = e, this.w = i, this.h = s, this.radiusTL = n, this.radiusTR = r, this.radiusBR = o, this.radiusBL = a
                }).prototype.exec = function(t) {
                    var e = (l > h ? h : l) / 2,
                        i = 0,
                        s = 0,
                        n = 0,
                        r = 0,
                        o = this.x,
                        a = this.y,
                        h = this.w,
                        l = this.h,
                        c = this.radiusTL,
                        u = this.radiusTR,
                        p = this.radiusBR,
                        d = this.radiusBL;
                    0 > c && (c *= i = -1), c > e && (c = e), 0 > u && (u *= s = -1), u > e && (u = e), 0 > p && (p *= n = -1), p > e && (p = e), 0 > d && (d *= r = -1), d > e && (d = e), t.moveTo(o + h - u, a), t.arcTo(o + h + u * s, a - u * s, o + h, a + u, u), t.lineTo(o + h, a + l - p), t.arcTo(o + h + p * n, a + l + p * n, o + h - p, a + l, p), t.lineTo(o + d, a + l), t.arcTo(o - d * r, a + l + d * r, o, a + l - d, d), t.lineTo(o, a + c), t.arcTo(o - c * i, a - c * i, o + c, a, c), t.closePath()
                }, (i.Circle = function(t, e, i) {
                    this.x = t, this.y = e, this.radius = i
                }).prototype.exec = function(t) {
                    t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
                }, (i.Ellipse = function(t, e, i, s) {
                    this.x = t, this.y = e, this.w = i, this.h = s
                }).prototype.exec = function(t) {
                    var e = this.x,
                        i = this.y,
                        s = this.w,
                        n = this.h,
                        r = .5522848,
                        o = s / 2 * r,
                        a = n / 2 * r,
                        h = e + s,
                        l = i + n,
                        c = e + s / 2,
                        u = i + n / 2;
                    t.moveTo(e, u), t.bezierCurveTo(e, u - a, c - o, i, c, i), t.bezierCurveTo(c + o, i, h, u - a, h, u), t.bezierCurveTo(h, u + a, c + o, l, c, l), t.bezierCurveTo(c - o, l, e, u + a, e, u)
                }, (i.PolyStar = function(t, e, i, s, n, r) {
                    this.x = t, this.y = e, this.radius = i, this.sides = s, this.pointSize = n, this.angle = r
                }).prototype.exec = function(t) {
                    var e = this.x,
                        i = this.y,
                        s = this.radius,
                        n = (this.angle || 0) / 180 * Math.PI,
                        r = this.sides,
                        o = 1 - (this.pointSize || 0),
                        a = Math.PI / r;
                    t.moveTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
                    for(var h = 0; r > h; h++) n += a, 1 != o && t.lineTo(e + Math.cos(n) * s * o, i + Math.sin(n) * s * o), n += a, t.lineTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
                    t.closePath()
                }, t.beginCmd = new i.BeginPath, createjs.Graphics = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    this.EventDispatcher_constructor(), this.alpha = 1, this.cacheCanvas = null, this.cacheID = 0, this.id = createjs.UID.get(), this.mouseEnabled = !0, this.tickEnabled = !0, this.name = null, this.parent = null, this.regX = 0, this.regY = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.skewX = 0, this.skewY = 0, this.shadow = null, this.visible = !0, this.x = 0, this.y = 0, this.transformMatrix = null, this.compositeOperation = null, this.snapToPixel = !0, this.filters = null, this.mask = null, this.hitArea = null, this.cursor = null, this._cacheOffsetX = 0, this._cacheOffsetY = 0, this._filterOffsetX = 0, this._filterOffsetY = 0, this._cacheScale = 1, this._cacheDataURLID = 0, this._cacheDataURL = null, this._props = new createjs.DisplayProps, this._rectangle = new createjs.Rectangle, this._bounds = null
                }
                var e = createjs.extend(t, createjs.EventDispatcher);
                t._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"], t.suppressCrossDomainErrors = !1, t._snapToPixelEnabled = !1;
                var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                i.getContext && (t._hitTestCanvas = i, t._hitTestContext = i.getContext("2d"), i.width = i.height = 1), t._nextCacheID = 1, e.getStage = function() {
                    for(var t = this, e = createjs.Stage; t.parent;) t = t.parent;
                    return t instanceof e ? t : null
                };
                try {
                    Object.defineProperties(e, {
                        stage: {
                            get: e.getStage
                        }
                    })
                } catch(s) {}
                e.isVisible = function() {
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY)
                }, e.draw = function(t, e) {
                    var i = this.cacheCanvas;
                    if(e || !i) return !1;
                    var s = this._cacheScale;
                    return t.drawImage(i, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, i.width / s, i.height / s), !0
                }, e.updateContext = function(e) {
                    var i = this,
                        s = i.mask,
                        n = i._props.matrix;
                    s && s.graphics && !s.graphics.isEmpty() && (s.getMatrix(n), e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty), s.graphics.drawAsPath(e), e.clip(), n.invert(), e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty)), this.getMatrix(n);
                    var r = n.tx,
                        o = n.ty;
                    t._snapToPixelEnabled && i.snapToPixel && (r = r + (0 > r ? -.5 : .5) | 0, o = o + (0 > o ? -.5 : .5) | 0), e.transform(n.a, n.b, n.c, n.d, r, o), e.globalAlpha *= i.alpha, i.compositeOperation && (e.globalCompositeOperation = i.compositeOperation), i.shadow && this._applyShadow(e, i.shadow)
                }, e.cache = function(t, e, i, s, n) {
                    n = n || 1, this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), this._cacheWidth = i, this._cacheHeight = s, this._cacheOffsetX = t, this._cacheOffsetY = e, this._cacheScale = n, this.updateCache()
                }, e.updateCache = function(e) {
                    var i = this.cacheCanvas;
                    if(!i) throw "cache() must be called before updateCache()";
                    var s = this._cacheScale,
                        n = this._cacheOffsetX * s,
                        r = this._cacheOffsetY * s,
                        o = this._cacheWidth,
                        a = this._cacheHeight,
                        h = i.getContext("2d"),
                        l = this._getFilterBounds();
                    n += this._filterOffsetX = l.x, r += this._filterOffsetY = l.y, o = Math.ceil(o * s) + l.width, a = Math.ceil(a * s) + l.height, o != i.width || a != i.height ? (i.width = o, i.height = a) : e || h.clearRect(0, 0, o + 1, a + 1), h.save(), h.globalCompositeOperation = e, h.setTransform(s, 0, 0, s, -n, -r), this.draw(h, !0), this._applyFilters(), h.restore(), this.cacheID = t._nextCacheID++
                }, e.uncache = function() {
                    this._cacheDataURL = this.cacheCanvas = null, this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0, this._cacheScale = 1
                }, e.getCacheDataURL = function() {
                    return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null
                }, e.localToGlobal = function(t, e, i) {
                    return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t, e, i || new createjs.Point)
                }, e.globalToLocal = function(t, e, i) {
                    return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t, e, i || new createjs.Point)
                }, e.localToLocal = function(t, e, i, s) {
                    return s = this.localToGlobal(t, e, s), i.globalToLocal(s.x, s.y, s)
                }, e.setTransform = function(t, e, i, s, n, r, o, a, h) {
                    return this.x = t || 0, this.y = e || 0, this.scaleX = null == i ? 1 : i, this.scaleY = null == s ? 1 : s, this.rotation = n || 0, this.skewX = r || 0, this.skewY = o || 0, this.regX = a || 0, this.regY = h || 0, this
                }, e.getMatrix = function(t) {
                    var e = this,
                        i = t && t.identity() || new createjs.Matrix2D;
                    return e.transformMatrix ? i.copy(e.transformMatrix) : i.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
                }, e.getConcatenatedMatrix = function(t) {
                    for(var e = this, i = this.getMatrix(t); e = e.parent;) i.prependMatrix(e.getMatrix(e._props.matrix));
                    return i
                }, e.getConcatenatedDisplayProps = function(t) {
                    t = t ? t.identity() : new createjs.DisplayProps;
                    var e = this,
                        i = e.getMatrix(t.matrix);
                    do t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation), e != this && i.prependMatrix(e.getMatrix(e._props.matrix)); while (e = e.parent);
                    return t
                }, e.hitTest = function(e, i) {
                    var s = t._hitTestContext;
                    s.setTransform(1, 0, 0, 1, -e, -i), this.draw(s);
                    var n = this._testHit(s);
                    return s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, 2, 2), n
                }, e.set = function(t) {
                    for(var e in t) this[e] = t[e];
                    return this
                }, e.getBounds = function() {
                    if(this._bounds) return this._rectangle.copy(this._bounds);
                    var t = this.cacheCanvas;
                    if(t) {
                        var e = this._cacheScale;
                        return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, t.width / e, t.height / e)
                    }
                    return null
                }, e.getTransformedBounds = function() {
                    return this._getBounds()
                }, e.setBounds = function(t, e, i, s) {
                    null == t && (this._bounds = t), this._bounds = (this._bounds || new createjs.Rectangle).setValues(t, e, i, s)
                }, e.clone = function() {
                    return this._cloneProps(new t)
                }, e.toString = function() {
                    return "[DisplayObject (name=" + this.name + ")]"
                }, e._cloneProps = function(t) {
                    return t.alpha = this.alpha, t.mouseEnabled = this.mouseEnabled, t.tickEnabled = this.tickEnabled, t.name = this.name, t.regX = this.regX, t.regY = this.regY, t.rotation = this.rotation, t.scaleX = this.scaleX, t.scaleY = this.scaleY, t.shadow = this.shadow, t.skewX = this.skewX, t.skewY = this.skewY, t.visible = this.visible, t.x = this.x, t.y = this.y, t.compositeOperation = this.compositeOperation, t.snapToPixel = this.snapToPixel, t.filters = null == this.filters ? null : this.filters.slice(0), t.mask = this.mask, t.hitArea = this.hitArea, t.cursor = this.cursor, t._bounds = this._bounds, t
                }, e._applyShadow = function(t, e) {
                    e = e || Shadow.identity, t.shadowColor = e.color, t.shadowOffsetX = e.offsetX, t.shadowOffsetY = e.offsetY, t.shadowBlur = e.blur
                }, e._tick = function(t) {
                    var e = this._listeners;
                    e && e.tick && (t.target = null, t.propagationStopped = t.immediatePropagationStopped = !1, this.dispatchEvent(t))
                }, e._testHit = function(e) {
                    try {
                        var i = e.getImageData(0, 0, 1, 1).data[3] > 1
                    } catch(s) {
                        if(!t.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
                    }
                    return i
                }, e._applyFilters = function() {
                    if(this.filters && 0 != this.filters.length && this.cacheCanvas)
                        for(var t = this.filters.length, e = this.cacheCanvas.getContext("2d"), i = this.cacheCanvas.width, s = this.cacheCanvas.height, n = 0; t > n; n++) this.filters[n].applyFilter(e, 0, 0, i, s)
                }, e._getFilterBounds = function() {
                    var t, e = this.filters,
                        i = this._rectangle.setValues(0, 0, 0, 0);
                    if(!e || !(t = e.length)) return i;
                    for(var s = 0; t > s; s++) {
                        var n = this.filters[s];
                        n.getBounds && n.getBounds(i)
                    }
                    return i
                }, e._getBounds = function(t, e) {
                    return this._transformBounds(this.getBounds(), t, e)
                }, e._transformBounds = function(t, e, i) {
                    if(!t) return t;
                    var s = t.x,
                        n = t.y,
                        r = t.width,
                        o = t.height,
                        a = this._props.matrix;
                    a = i ? a.identity() : this.getMatrix(a), (s || n) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -n), e && a.prependMatrix(e);
                    var h = r * a.a,
                        l = r * a.b,
                        c = o * a.c,
                        u = o * a.d,
                        p = a.tx,
                        d = a.ty,
                        f = p,
                        v = p,
                        g = d,
                        m = d;
                    return(s = h + p) < f ? f = s : s > v && (v = s), (s = h + c + p) < f ? f = s : s > v && (v = s), (s = c + p) < f ? f = s : s > v && (v = s), (n = l + d) < g ? g = n : n > m && (m = n), (n = l + u + d) < g ? g = n : n > m && (m = n), (n = u + d) < g ? g = n : n > m && (m = n), t.setValues(f, g, v - f, m - g)
                }, e._hasMouseEventListener = function() {
                    for(var e = t._MOUSE_EVENTS, i = 0, s = e.length; s > i; i++)
                        if(this.hasEventListener(e[i])) return !0;
                    return !!this.cursor
                }, createjs.DisplayObject = createjs.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    this.DisplayObject_constructor(), this.children = [], this.mouseChildren = !0, this.tickChildren = !0
                }
                var e = createjs.extend(t, createjs.DisplayObject);
                e.getNumChildren = function() {
                    return this.children.length
                };
                try {
                    Object.defineProperties(e, {
                        numChildren: {
                            get: e.getNumChildren
                        }
                    })
                } catch(i) {}
                e.initialize = t, e.isVisible = function() {
                    var t = this.cacheCanvas || this.children.length;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function(t, e) {
                    if(this.DisplayObject_draw(t, e)) return !0;
                    for(var i = this.children.slice(), s = 0, n = i.length; n > s; s++) {
                        var r = i[s];
                        r.isVisible() && (t.save(), r.updateContext(t), r.draw(t), t.restore())
                    }
                    return !0
                }, e.addChild = function(t) {
                    if(null == t) return t;
                    var e = arguments.length;
                    if(e > 1) {
                        for(var i = 0; e > i; i++) this.addChild(arguments[i]);
                        return arguments[e - 1]
                    }
                    return t.parent && t.parent.removeChild(t), t.parent = this, this.children.push(t), t.dispatchEvent("added"), t
                }, e.addChildAt = function(t, e) {
                    var i = arguments.length,
                        s = arguments[i - 1];
                    if(0 > s || s > this.children.length) return arguments[i - 2];
                    if(i > 2) {
                        for(var n = 0; i - 1 > n; n++) this.addChildAt(arguments[n], s + n);
                        return arguments[i - 2]
                    }
                    return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), t.dispatchEvent("added"), t
                }, e.removeChild = function(t) {
                    var e = arguments.length;
                    if(e > 1) {
                        for(var i = !0, s = 0; e > s; s++) i = i && this.removeChild(arguments[s]);
                        return i
                    }
                    return this.removeChildAt(createjs.indexOf(this.children, t))
                }, e.removeChildAt = function(t) {
                    var e = arguments.length;
                    if(e > 1) {
                        for(var i = [], s = 0; e > s; s++) i[s] = arguments[s];
                        i.sort(function(t, e) {
                            return e - t
                        });
                        for(var n = !0, s = 0; e > s; s++) n = n && this.removeChildAt(i[s]);
                        return n
                    }
                    if(0 > t || t > this.children.length - 1) return !1;
                    var r = this.children[t];
                    return r && (r.parent = null), this.children.splice(t, 1), r.dispatchEvent("removed"), !0
                }, e.removeAllChildren = function() {
                    for(var t = this.children; t.length;) this.removeChildAt(0)
                }, e.getChildAt = function(t) {
                    return this.children[t]
                }, e.getChildByName = function(t) {
                    for(var e = this.children, i = 0, s = e.length; s > i; i++)
                        if(e[i].name == t) return e[i];
                    return null
                }, e.sortChildren = function(t) {
                    this.children.sort(t)
                }, e.getChildIndex = function(t) {
                    return createjs.indexOf(this.children, t)
                }, e.swapChildrenAt = function(t, e) {
                    var i = this.children,
                        s = i[t],
                        n = i[e];
                    s && n && (i[t] = n, i[e] = s)
                }, e.swapChildren = function(t, e) {
                    for(var i, s, n = this.children, r = 0, o = n.length; o > r && (n[r] == t && (i = r), n[r] == e && (s = r), null == i || null == s); r++);
                    r != o && (n[i] = e, n[s] = t)
                }, e.setChildIndex = function(t, e) {
                    var i = this.children,
                        s = i.length;
                    if(!(t.parent != this || 0 > e || e >= s)) {
                        for(var n = 0; s > n && i[n] != t; n++);
                        n != s && n != e && (i.splice(n, 1), i.splice(e, 0, t))
                    }
                }, e.contains = function(t) {
                    for(; t;) {
                        if(t == this) return !0;
                        t = t.parent
                    }
                    return !1
                }, e.hitTest = function(t, e) {
                    return null != this.getObjectUnderPoint(t, e)
                }, e.getObjectsUnderPoint = function(t, e, i) {
                    var s = [],
                        n = this.localToGlobal(t, e);
                    return this._getObjectsUnderPoint(n.x, n.y, s, i > 0, 1 == i), s
                }, e.getObjectUnderPoint = function(t, e, i) {
                    var s = this.localToGlobal(t, e);
                    return this._getObjectsUnderPoint(s.x, s.y, null, i > 0, 1 == i)
                }, e.getBounds = function() {
                    return this._getBounds(null, !0)
                }, e.getTransformedBounds = function() {
                    return this._getBounds()
                }, e.clone = function(e) {
                    var i = this._cloneProps(new t);
                    return e && this._cloneChildren(i), i
                }, e.toString = function() {
                    return "[Container (name=" + this.name + ")]"
                }, e._tick = function(t) {
                    if(this.tickChildren)
                        for(var e = this.children.length - 1; e >= 0; e--) {
                            var i = this.children[e];
                            i.tickEnabled && i._tick && i._tick(t)
                        }
                    this.DisplayObject__tick(t)
                }, e._cloneChildren = function(t) {
                    t.children.length && t.removeAllChildren();
                    for(var e = t.children, i = 0, s = this.children.length; s > i; i++) {
                        var n = this.children[i].clone(!0);
                        n.parent = t, e.push(n)
                    }
                }, e._getObjectsUnderPoint = function(e, i, s, n, r, o) {
                    if(o = o || 0, !o && !this._testMask(this, e, i)) return null;
                    var a, h = createjs.DisplayObject._hitTestContext;
                    r = r || n && this._hasMouseEventListener();
                    for(var l = this.children, c = l.length, u = c - 1; u >= 0; u--) {
                        var p = l[u],
                            d = p.hitArea;
                        if(p.visible && (d || p.isVisible()) && (!n || p.mouseEnabled) && (d || this._testMask(p, e, i)))
                            if(!d && p instanceof t) {
                                var f = p._getObjectsUnderPoint(e, i, s, n, r, o + 1);
                                if(!s && f) return n && !this.mouseChildren ? this : f
                            } else {
                                if(n && !r && !p._hasMouseEventListener()) continue;
                                var v = p.getConcatenatedDisplayProps(p._props);
                                if(a = v.matrix, d && (a.appendMatrix(d.getMatrix(d._props.matrix)), v.alpha = d.alpha), h.globalAlpha = v.alpha, h.setTransform(a.a, a.b, a.c, a.d, a.tx - e, a.ty - i), (d || p).draw(h), !this._testHit(h)) continue;
                                if(h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, 2, 2), !s) return n && !this.mouseChildren ? this : p;
                                s.push(p)
                            }
                    }
                    return null
                }, e._testMask = function(t, e, i) {
                    var s = t.mask;
                    if(!s || !s.graphics || s.graphics.isEmpty()) return !0;
                    var n = this._props.matrix,
                        r = t.parent;
                    n = r ? r.getConcatenatedMatrix(n) : n.identity(), n = s.getMatrix(s._props.matrix).prependMatrix(n);
                    var o = createjs.DisplayObject._hitTestContext;
                    return o.setTransform(n.a, n.b, n.c, n.d, n.tx - e, n.ty - i), s.graphics.drawAsPath(o), o.fillStyle = "#000", o.fill(), this._testHit(o) ? (o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, 2, 2), !0) : !1
                }, e._getBounds = function(t, e) {
                    var i = this.DisplayObject_getBounds();
                    if(i) return this._transformBounds(i, t, e);
                    var s = this._props.matrix;
                    s = e ? s.identity() : this.getMatrix(s), t && s.prependMatrix(t);
                    for(var n = this.children.length, r = null, o = 0; n > o; o++) {
                        var a = this.children[o];
                        a.visible && (i = a._getBounds(s)) && (r ? r.extend(i.x, i.y, i.width, i.height) : r = i.clone())
                    }
                    return r
                }, createjs.Container = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.Container_constructor(), this.autoClear = !0, this.canvas = "string" == typeof t ? document.getElementById(t) : t, this.mouseX = 0, this.mouseY = 0, this.drawRect = null, this.snapToPixelEnabled = !1, this.mouseInBounds = !1, this.tickOnUpdate = !0, this.mouseMoveOutside = !1, this.preventSelection = !0, this._pointerData = {}, this._pointerCount = 0, this._primaryPointerID = null, this._mouseOverIntervalID = null, this._nextStage = null, this._prevStage = null, this.enableDOMEvents(!0)
                }
                var e = createjs.extend(t, createjs.Container);
                e._get_nextStage = function() {
                    return this._nextStage
                }, e._set_nextStage = function(t) {
                    this._nextStage && (this._nextStage._prevStage = null), t && (t._prevStage = this), this._nextStage = t
                };
                try {
                    Object.defineProperties(e, {
                        nextStage: {
                            get: e._get_nextStage,
                            set: e._set_nextStage
                        }
                    })
                } catch(i) {}
                e.update = function(t) {
                    if(this.canvas && (this.tickOnUpdate && this.tick(t), !this.dispatchEvent("drawstart"))) {
                        createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
                        var e = this.drawRect,
                            i = this.canvas.getContext("2d");
                        i.setTransform(1, 0, 0, 1, 0, 0), this.autoClear && (e ? i.clearRect(e.x, e.y, e.width, e.height) : i.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)), i.save(), this.drawRect && (i.beginPath(), i.rect(e.x, e.y, e.width, e.height), i.clip()), this.updateContext(i), this.draw(i, !1), i.restore(), this.dispatchEvent("drawend")
                    }
                }, e.tick = function(t) {
                    if(this.tickEnabled && !this.dispatchEvent("tickstart")) {
                        var e = new createjs.Event("tick");
                        if(t)
                            for(var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                        this._tick(e), this.dispatchEvent("tickend")
                    }
                }, e.handleEvent = function(t) {
                    "tick" == t.type && this.update(t)
                }, e.clear = function() {
                    if(this.canvas) {
                        var t = this.canvas.getContext("2d");
                        t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
                    }
                }, e.toDataURL = function(t, e) {
                    var i, s = this.canvas.getContext("2d"),
                        n = this.canvas.width,
                        r = this.canvas.height;
                    if(t) {
                        i = s.getImageData(0, 0, n, r);
                        var o = s.globalCompositeOperation;
                        s.globalCompositeOperation = "destination-over", s.fillStyle = t, s.fillRect(0, 0, n, r)
                    }
                    var a = this.canvas.toDataURL(e || "image/png");
                    return t && (s.putImageData(i, 0, 0), s.globalCompositeOperation = o), a
                }, e.enableMouseOver = function(t) {
                    if(this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == t && this._testMouseOver(!0)), null == t) t = 20;
                    else if(0 >= t) return;
                    var e = this;
                    this._mouseOverIntervalID = setInterval(function() {
                        e._testMouseOver()
                    }, 1e3 / Math.min(50, t))
                }, e.enableDOMEvents = function(t) {
                    null == t && (t = !0);
                    var e, i, s = this._eventListeners;
                    if(!t && s) {
                        for(e in s) i = s[e], i.t.removeEventListener(e, i.f, !1);
                        this._eventListeners = null
                    } else if(t && !s && this.canvas) {
                        var n = window.addEventListener ? window : document,
                            r = this;
                        s = this._eventListeners = {}, s.mouseup = {
                            t: n,
                            f: function(t) {
                                r._handleMouseUp(t)
                            }
                        }, s.mousemove = {
                            t: n,
                            f: function(t) {
                                r._handleMouseMove(t)
                            }
                        }, s.dblclick = {
                            t: this.canvas,
                            f: function(t) {
                                r._handleDoubleClick(t)
                            }
                        }, s.mousedown = {
                            t: this.canvas,
                            f: function(t) {
                                r._handleMouseDown(t)
                            }
                        };
                        for(e in s) i = s[e], i.t.addEventListener(e, i.f, !1)
                    }
                }, e.clone = function() {
                    throw "Stage cannot be cloned."
                }, e.toString = function() {
                    return "[Stage (name=" + this.name + ")]"
                }, e._getElementRect = function(t) {
                    var e;
                    try {
                        e = t.getBoundingClientRect()
                    } catch(i) {
                        e = {
                            top: t.offsetTop,
                            left: t.offsetLeft,
                            width: t.offsetWidth,
                            height: t.offsetHeight
                        }
                    }
                    var s = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
                        n = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
                        r = window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle,
                        o = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
                        a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
                        h = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
                        l = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
                    return {
                        left: e.left + s + o,
                        right: e.right + s - h,
                        top: e.top + n + a,
                        bottom: e.bottom + n - l
                    }
                }, e._getPointerData = function(t) {
                    var e = this._pointerData[t];
                    return e || (e = this._pointerData[t] = {
                        x: 0,
                        y: 0
                    }), e
                }, e._handleMouseMove = function(t) {
                    t || (t = window.event), this._handlePointerMove(-1, t, t.pageX, t.pageY)
                }, e._handlePointerMove = function(t, e, i, s, n) {
                    if((!this._prevStage || void 0 !== n) && this.canvas) {
                        var r = this._nextStage,
                            o = this._getPointerData(t),
                            a = o.inBounds;
                        this._updatePointerPosition(t, e, i, s), (a || o.inBounds || this.mouseMoveOutside) && (-1 === t && o.inBounds == !a && this._dispatchMouseEvent(this, a ? "mouseleave" : "mouseenter", !1, t, o, e), this._dispatchMouseEvent(this, "stagemousemove", !1, t, o, e), this._dispatchMouseEvent(o.target, "pressmove", !0, t, o, e)), r && r._handlePointerMove(t, e, i, s, null)
                    }
                }, e._updatePointerPosition = function(t, e, i, s) {
                    var n = this._getElementRect(this.canvas);
                    i -= n.left, s -= n.top;
                    var r = this.canvas.width,
                        o = this.canvas.height;
                    i /= (n.right - n.left) / r, s /= (n.bottom - n.top) / o;
                    var a = this._getPointerData(t);
                    (a.inBounds = i >= 0 && s >= 0 && r - 1 >= i && o - 1 >= s) ? (a.x = i, a.y = s) : this.mouseMoveOutside && (a.x = 0 > i ? 0 : i > r - 1 ? r - 1 : i, a.y = 0 > s ? 0 : s > o - 1 ? o - 1 : s), a.posEvtObj = e, a.rawX = i, a.rawY = s, (t === this._primaryPointerID || -1 === t) && (this.mouseX = a.x, this.mouseY = a.y, this.mouseInBounds = a.inBounds)
                }, e._handleMouseUp = function(t) {
                    this._handlePointerUp(-1, t, !1)
                }, e._handlePointerUp = function(t, e, i, s) {
                    var n = this._nextStage,
                        r = this._getPointerData(t);
                    if(!this._prevStage || void 0 !== s) {
                        r.down && this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e), r.down = !1;
                        var o = null,
                            a = r.target;
                        s || !a && !n || (o = this._getObjectsUnderPoint(r.x, r.y, null, !0)), o == a && this._dispatchMouseEvent(a, "click", !0, t, r, e), this._dispatchMouseEvent(a, "pressup", !0, t, r, e), i ? (t == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[t]) : r.target = null, n && n._handlePointerUp(t, e, i, s || o && this)
                    }
                }, e._handleMouseDown = function(t) {
                    this._handlePointerDown(-1, t, t.pageX, t.pageY)
                }, e._handlePointerDown = function(t, e, i, s, n) {
                    this.preventSelection && e.preventDefault(), (null == this._primaryPointerID || -1 === t) && (this._primaryPointerID = t), null != s && this._updatePointerPosition(t, e, i, s);
                    var r = null,
                        o = this._nextStage,
                        a = this._getPointerData(t);
                    a.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, t, a, e), a.down = !0), n || (r = a.target = this._getObjectsUnderPoint(a.x, a.y, null, !0), this._dispatchMouseEvent(a.target, "mousedown", !0, t, a, e)), o && o._handlePointerDown(t, e, i, s, n || r && this)
                }, e._testMouseOver = function(t, e, i) {
                    if(!this._prevStage || void 0 !== e) {
                        var s = this._nextStage;
                        if(!this._mouseOverIntervalID) return void(s && s._testMouseOver(t, e, i));
                        var n = this._getPointerData(-1);
                        if(n && (t || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
                            var r, o, a, h = n.posEvtObj,
                                l = i || h && h.target == this.canvas,
                                c = null,
                                u = -1,
                                p = "";
                            !e && (t || this.mouseInBounds && l) && (c = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);
                            var d = this._mouseOverTarget || [],
                                f = d[d.length - 1],
                                v = this._mouseOverTarget = [];
                            for(r = c; r;) v.unshift(r), null != r.cursor && (p = r.cursor), r = r.parent;
                            for(this.canvas.style.cursor = p, !e && i && (i.canvas.style.cursor = p), o = 0, a = v.length; a > o && v[o] == d[o]; o++) u = o;
                            for(f != c && this._dispatchMouseEvent(f, "mouseout", !0, -1, n, h), o = d.length - 1; o > u; o--) this._dispatchMouseEvent(d[o], "rollout", !1, -1, n, h);
                            for(o = v.length - 1; o > u; o--) this._dispatchMouseEvent(v[o], "rollover", !1, -1, n, h);
                            f != c && this._dispatchMouseEvent(c, "mouseover", !0, -1, n, h), s && s._testMouseOver(t, e || c && this, i || l && this)
                        }
                    }
                }, e._handleDoubleClick = function(t, e) {
                    var i = null,
                        s = this._nextStage,
                        n = this._getPointerData(-1);
                    e || (i = this._getObjectsUnderPoint(n.x, n.y, null, !0), this._dispatchMouseEvent(i, "dblclick", !0, -1, n, t)), s && s._handleDoubleClick(t, e || i && this)
                }, e._dispatchMouseEvent = function(t, e, i, s, n, r) {
                    if(t && (i || t.hasEventListener(e))) {
                        var o = new createjs.MouseEvent(e, i, !1, n.x, n.y, r, s, s === this._primaryPointerID || -1 === s, n.rawX, n.rawY);
                        t.dispatchEvent(o)
                    }
                }, createjs.Stage = createjs.promote(t, "Container")
            }(), this.createjs = this.createjs || {},
            function() {
                function t(t) {
                    this.DisplayObject_constructor(), "string" == typeof t ? (this.image = document.createElement("img"), this.image.src = t) : this.image = t, this.sourceRect = null
                }
                var e = createjs.extend(t, createjs.DisplayObject);
                e.initialize = t, e.isVisible = function() {
                    var t = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function(t, e) {
                    if(this.DisplayObject_draw(t, e) || !this.image) return !0;
                    var i = this.image,
                        s = this.sourceRect;
                    if(s) {
                        var n = s.x,
                            r = s.y,
                            o = n + s.width,
                            a = r + s.height,
                            h = 0,
                            l = 0,
                            c = i.width,
                            u = i.height;
                        0 > n && (h -= n, n = 0), o > c && (o = c), 0 > r && (l -= r, r = 0), a > u && (a = u), t.drawImage(i, n, r, o - n, a - r, h, l, o - n, a - r)
                    } else t.drawImage(i, 0, 0);
                    return !0
                }, e.getBounds = function() {
                    var t = this.DisplayObject_getBounds();
                    if(t) return t;
                    var e = this.sourceRect || this.image,
                        i = this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
                    return i ? this._rectangle.setValues(0, 0, e.width, e.height) : null
                }, e.clone = function() {
                    var e = new t(this.image);
                    return this.sourceRect && (e.sourceRect = this.sourceRect.clone()), this._cloneProps(e), e
                }, e.toString = function() {
                    return "[Bitmap (name=" + this.name + ")]"
                }, createjs.Bitmap = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e) {
                    this.DisplayObject_constructor(), this.currentFrame = 0, this.currentAnimation = null, this.paused = !0, this.spriteSheet = t, this.currentAnimationFrame = 0, this.framerate = 0, this._animation = null, this._currentFrame = null, this._skipAdvance = !1, e && this.gotoAndPlay(e)
                }
                var e = createjs.extend(t, createjs.DisplayObject);
                e.isVisible = function() {
                    var t = this.cacheCanvas || this.spriteSheet.complete;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function(t, e) {
                    if(this.DisplayObject_draw(t, e)) return !0;
                    this._normalizeFrame();
                    var i = this.spriteSheet.getFrame(0 | this._currentFrame);
                    if(!i) return !1;
                    var s = i.rect;
                    return s.width && s.height && t.drawImage(i.image, s.x, s.y, s.width, s.height, -i.regX, -i.regY, s.width, s.height), !0
                }, e.play = function() {
                    this.paused = !1
                }, e.stop = function() {
                    this.paused = !0
                }, e.gotoAndPlay = function(t) {
                    this.paused = !1, this._skipAdvance = !0, this._goto(t)
                }, e.gotoAndStop = function(t) {
                    this.paused = !0, this._goto(t)
                }, e.advance = function(t) {
                    var e = this.framerate || this.spriteSheet.framerate,
                        i = e && null != t ? t / (1e3 / e) : 1;
                    this._normalizeFrame(i)
                }, e.getBounds = function() {
                    return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
                }, e.clone = function() {
                    return this._cloneProps(new t(this.spriteSheet))
                }, e.toString = function() {
                    return "[Sprite (name=" + this.name + ")]"
                }, e._cloneProps = function(t) {
                    return this.DisplayObject__cloneProps(t), t.currentFrame = this.currentFrame, t.currentAnimation = this.currentAnimation, t.paused = this.paused, t.currentAnimationFrame = this.currentAnimationFrame, t.framerate = this.framerate, t._animation = this._animation, t._currentFrame = this._currentFrame, t._skipAdvance = this._skipAdvance, t
                }, e._tick = function(t) {
                    this.paused || (this._skipAdvance || this.advance(t && t.delta), this._skipAdvance = !1), this.DisplayObject__tick(t)
                }, e._normalizeFrame = function(t) {
                    t = t || 0;
                    var e, i = this._animation,
                        s = this.paused,
                        n = this._currentFrame;
                    if(i) {
                        var r = i.speed || 1,
                            o = this.currentAnimationFrame;
                        if(e = i.frames.length, o + t * r >= e) {
                            var a = i.next;
                            if(this._dispatchAnimationEnd(i, n, s, a, e - 1)) return;
                            if(a) return this._goto(a, t - (e - o) / r);
                            this.paused = !0, o = i.frames.length - 1
                        } else o += t * r;
                        this.currentAnimationFrame = o, this._currentFrame = i.frames[0 | o]
                    } else if(n = this._currentFrame += t, e = this.spriteSheet.getNumFrames(), n >= e && e > 0 && !this._dispatchAnimationEnd(i, n, s, e - 1) && (this._currentFrame -= e) >= e) return this._normalizeFrame();
                    n = 0 | this._currentFrame, this.currentFrame != n && (this.currentFrame = n, this.dispatchEvent("change"))
                }, e._dispatchAnimationEnd = function(t, e, i, s, n) {
                    var r = t ? t.name : null;
                    if(this.hasEventListener("animationend")) {
                        var o = new createjs.Event("animationend");
                        o.name = r, o.next = s, this.dispatchEvent(o)
                    }
                    var a = this._animation != t || this._currentFrame != e;
                    return a || i || !this.paused || (this.currentAnimationFrame = n, a = !0), a
                }, e._goto = function(t, e) {
                    if(this.currentAnimationFrame = 0, isNaN(t)) {
                        var i = this.spriteSheet.getAnimation(t);
                        i && (this._animation = i, this.currentAnimation = t, this._normalizeFrame(e))
                    } else this.currentAnimation = this._animation = null, this._currentFrame = t, this._normalizeFrame()
                }, createjs.Sprite = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.DisplayObject_constructor(), this.graphics = t ? t : new createjs.Graphics
                }
                var e = createjs.extend(t, createjs.DisplayObject);
                e.isVisible = function() {
                    var t = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function(t, e) {
                    return this.DisplayObject_draw(t, e) ? !0 : (this.graphics.draw(t, this), !0)
                }, e.clone = function(e) {
                    var i = e && this.graphics ? this.graphics.clone() : this.graphics;
                    return this._cloneProps(new t(i))
                }, e.toString = function() {
                    return "[Shape (name=" + this.name + ")]"
                }, createjs.Shape = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i) {
                    this.DisplayObject_constructor(), this.text = t, this.font = e, this.color = i, this.textAlign = "left", this.textBaseline = "top", this.maxWidth = null, this.outline = 0, this.lineHeight = 0, this.lineWidth = null
                }
                var e = createjs.extend(t, createjs.DisplayObject),
                    i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                i.getContext && (t._workingContext = i.getContext("2d"), i.width = i.height = 1), t.H_OFFSETS = {
                    start: 0,
                    left: 0,
                    center: -.5,
                    end: -1,
                    right: -1
                }, t.V_OFFSETS = {
                    top: 0,
                    hanging: -.01,
                    middle: -.4,
                    alphabetic: -.8,
                    ideographic: -.85,
                    bottom: -1
                }, e.isVisible = function() {
                    var t = this.cacheCanvas || null != this.text && "" !== this.text;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function(t, e) {
                    if(this.DisplayObject_draw(t, e)) return !0;
                    var i = this.color || "#000";
                    return this.outline ? (t.strokeStyle = i, t.lineWidth = 1 * this.outline) : t.fillStyle = i, this._drawText(this._prepContext(t)), !0
                }, e.getMeasuredWidth = function() {
                    return this._getMeasuredWidth(this.text)
                }, e.getMeasuredLineHeight = function() {
                    return 1.2 * this._getMeasuredWidth("M")
                }, e.getMeasuredHeight = function() {
                    return this._drawText(null, {}).height
                }, e.getBounds = function() {
                    var e = this.DisplayObject_getBounds();
                    if(e) return e;
                    if(null == this.text || "" == this.text) return null;
                    var i = this._drawText(null, {}),
                        s = this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width,
                        n = s * t.H_OFFSETS[this.textAlign || "left"],
                        r = this.lineHeight || this.getMeasuredLineHeight(),
                        o = r * t.V_OFFSETS[this.textBaseline || "top"];
                    return this._rectangle.setValues(n, o, s, i.height)
                }, e.getMetrics = function() {
                    var e = {
                        lines: []
                    };
                    return e.lineHeight = this.lineHeight || this.getMeasuredLineHeight(), e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"], this._drawText(null, e, e.lines)
                }, e.clone = function() {
                    return this._cloneProps(new t(this.text, this.font, this.color))
                }, e.toString = function() {
                    return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
                }, e._cloneProps = function(t) {
                    return this.DisplayObject__cloneProps(t), t.textAlign = this.textAlign, t.textBaseline = this.textBaseline, t.maxWidth = this.maxWidth, t.outline = this.outline, t.lineHeight = this.lineHeight, t.lineWidth = this.lineWidth, t
                }, e._prepContext = function(t) {
                    return t.font = this.font || "10px sans-serif", t.textAlign = this.textAlign || "left", t.textBaseline = this.textBaseline || "top", t
                }, e._drawText = function(e, i, s) {
                    var n = !!e;
                    n || (e = t._workingContext, e.save(), this._prepContext(e));
                    for(var r = this.lineHeight || this.getMeasuredLineHeight(), o = 0, a = 0, h = String(this.text).split(/(?:\r\n|\r|\n)/), l = 0, c = h.length; c > l; l++) {
                        var u = h[l],
                            p = null;
                        if(null != this.lineWidth && (p = e.measureText(u).width) > this.lineWidth) {
                            var d = u.split(/(\s)/);
                            u = d[0], p = e.measureText(u).width;
                            for(var f = 1, v = d.length; v > f; f += 2) {
                                var g = e.measureText(d[f] + d[f + 1]).width;
                                p + g > this.lineWidth ? (n && this._drawTextLine(e, u, a * r), s && s.push(u), p > o && (o = p), u = d[f + 1], p = e.measureText(u).width, a++) : (u += d[f] + d[f + 1], p += g)
                            }
                        }
                        n && this._drawTextLine(e, u, a * r), s && s.push(u), i && null == p && (p = e.measureText(u).width), p > o && (o = p), a++
                    }
                    return i && (i.width = o, i.height = a * r), n || e.restore(), i
                }, e._drawTextLine = function(t, e, i) {
                    this.outline ? t.strokeText(e, 0, i, this.maxWidth || 65535) : t.fillText(e, 0, i, this.maxWidth || 65535)
                }, e._getMeasuredWidth = function(e) {
                    var i = t._workingContext;
                    i.save();
                    var s = this._prepContext(i).measureText(e).width;
                    return i.restore(), s
                }, createjs.Text = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e) {
                    this.Container_constructor(), this.text = t || "", this.spriteSheet = e, this.lineHeight = 0, this.letterSpacing = 0, this.spaceWidth = 0, this._oldProps = {
                        text: 0,
                        spriteSheet: 0,
                        lineHeight: 0,
                        letterSpacing: 0,
                        spaceWidth: 0
                    }
                }
                var e = createjs.extend(t, createjs.Container);
                t.maxPoolSize = 100, t._spritePool = [], e.draw = function(t, e) {
                    this.DisplayObject_draw(t, e) || (this._updateText(), this.Container_draw(t, e))
                }, e.getBounds = function() {
                    return this._updateText(), this.Container_getBounds()
                }, e.isVisible = function() {
                    var t = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
                    return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && t)
                }, e.clone = function() {
                    return this._cloneProps(new t(this.text, this.spriteSheet))
                }, e.addChild = e.addChildAt = e.removeChild = e.removeChildAt = e.removeAllChildren = function() {}, e._cloneProps = function(t) {
                    return this.DisplayObject__cloneProps(t), t.lineHeight = this.lineHeight, t.letterSpacing = this.letterSpacing, t.spaceWidth = this.spaceWidth, t
                }, e._getFrameIndex = function(t, e) {
                    var i, s = e.getAnimation(t);
                    return s || (t != (i = t.toUpperCase()) || t != (i = t.toLowerCase()) || (i = null), i && (s = e.getAnimation(i))), s && s.frames[0]
                }, e._getFrame = function(t, e) {
                    var i = this._getFrameIndex(t, e);
                    return null == i ? i : e.getFrame(i)
                }, e._getLineHeight = function(t) {
                    var e = this._getFrame("1", t) || this._getFrame("T", t) || this._getFrame("L", t) || t.getFrame(0);
                    return e ? e.rect.height : 1
                }, e._getSpaceWidth = function(t) {
                    var e = this._getFrame("1", t) || this._getFrame("l", t) || this._getFrame("e", t) || this._getFrame("a", t) || t.getFrame(0);
                    return e ? e.rect.width : 1
                }, e._updateText = function() {
                    var e, i = 0,
                        s = 0,
                        n = this._oldProps,
                        r = !1,
                        o = this.spaceWidth,
                        a = this.lineHeight,
                        h = this.spriteSheet,
                        l = t._spritePool,
                        c = this.children,
                        u = 0,
                        p = c.length;
                    for(var d in n) n[d] != this[d] && (n[d] = this[d], r = !0);
                    if(r) {
                        var f = !!this._getFrame(" ", h);
                        f || o || (o = this._getSpaceWidth(h)), a || (a = this._getLineHeight(h));
                        for(var v = 0, g = this.text.length; g > v; v++) {
                            var m = this.text.charAt(v);
                            if(" " != m || f)
                                if("\n" != m && "\r" != m) {
                                    var y = this._getFrameIndex(m, h);
                                    null != y && (p > u ? e = c[u] : (c.push(e = l.length ? l.pop() : new createjs.Sprite), e.parent = this, p++), e.spriteSheet = h, e.gotoAndStop(y), e.x = i, e.y = s, u++, i += e.getBounds().width + this.letterSpacing)
                                } else "\r" == m && "\n" == this.text.charAt(v + 1) && v++, i = 0, s += a;
                            else i += o
                        }
                        for(; p > u;) l.push(e = c.pop()), e.parent = null, p--;
                        l.length > t.maxPoolSize && (l.length = t.maxPoolSize)
                    }
                }, createjs.BitmapText = createjs.promote(t, "Container")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    throw "SpriteSheetUtils cannot be instantiated"
                }
                var e = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                e.getContext && (t._workingCanvas = e, t._workingContext = e.getContext("2d"), e.width = e.height = 1), t.addFlippedFrames = function(e, i, s, n) {
                    if(i || s || n) {
                        var r = 0;
                        i && t._flip(e, ++r, !0, !1), s && t._flip(e, ++r, !1, !0), n && t._flip(e, ++r, !0, !0)
                    }
                }, t.extractFrame = function(e, i) {
                    isNaN(i) && (i = e.getAnimation(i).frames[0]);
                    var s = e.getFrame(i);
                    if(!s) return null;
                    var n = s.rect,
                        r = t._workingCanvas;
                    r.width = n.width, r.height = n.height, t._workingContext.drawImage(s.image, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
                    var o = document.createElement("img");
                    return o.src = r.toDataURL("image/png"), o
                }, t.mergeAlpha = function(t, e, i) {
                    i || (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), i.width = Math.max(e.width, t.width), i.height = Math.max(e.height, t.height);
                    var s = i.getContext("2d");
                    return s.save(), s.drawImage(t, 0, 0), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.restore(), i
                }, t._flip = function(e, i, s, n) {
                    for(var r = e._images, o = t._workingCanvas, a = t._workingContext, h = r.length / i, l = 0; h > l; l++) {
                        var c = r[l];
                        c.__tmp = l, a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, o.width + 1, o.height + 1), o.width = c.width, o.height = c.height, a.setTransform(s ? -1 : 1, 0, 0, n ? -1 : 1, s ? c.width : 0, n ? c.height : 0), a.drawImage(c, 0, 0);
                        var u = document.createElement("img");
                        u.src = o.toDataURL("image/png"), u.width = c.width, u.height = c.height, r.push(u)
                    }
                    var p = e._frames,
                        d = p.length / i;
                    for(l = 0; d > l; l++) {
                        c = p[l];
                        var f = c.rect.clone();
                        u = r[c.image.__tmp + h * i];
                        var v = {
                            image: u,
                            rect: f,
                            regX: c.regX,
                            regY: c.regY
                        };
                        s && (f.x = u.width - f.x - f.width, v.regX = f.width - c.regX), n && (f.y = u.height - f.y - f.height, v.regY = f.height - c.regY), p.push(v)
                    }
                    var g = "_" + (s ? "h" : "") + (n ? "v" : ""),
                        m = e._animations,
                        y = e._data,
                        w = m.length / i;
                    for(l = 0; w > l; l++) {
                        var _ = m[l];
                        c = y[_];
                        var x = {
                            name: _ + g,
                            speed: c.speed,
                            next: c.next,
                            frames: []
                        };
                        c.next && (x.next += g), p = c.frames;
                        for(var b = 0, T = p.length; T > b; b++) x.frames.push(p[b] + d * i);
                        y[x.name] = x, m.push(x.name)
                    }
                }, createjs.SpriteSheetUtils = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    this.EventDispatcher_constructor(), this.maxWidth = 2048, this.maxHeight = 2048, this.spriteSheet = null, this.scale = 1, this.padding = 1, this.timeSlice = .3, this.progress = -1, this._frames = [], this._animations = {}, this._data = null, this._nextFrameIndex = 0, this._index = 0, this._timerID = null, this._scale = 1
                }
                var e = createjs.extend(t, createjs.EventDispatcher);
                t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions", t.ERR_RUNNING = "a build is already running", e.addFrame = function(e, i, s, n, r) {
                    if(this._data) throw t.ERR_RUNNING;
                    var o = i || e.bounds || e.nominalBounds;
                    return !o && e.getBounds && (o = e.getBounds()), o ? (s = s || 1, this._frames.push({
                        source: e,
                        sourceRect: o,
                        scale: s,
                        funct: n,
                        data: r,
                        index: this._frames.length,
                        height: o.height * s
                    }) - 1) : null
                }, e.addAnimation = function(e, i, s, n) {
                    if(this._data) throw t.ERR_RUNNING;
                    this._animations[e] = {
                        frames: i,
                        next: s,
                        frequency: n
                    }
                }, e.addMovieClip = function(e, i, s, n, r, o) {
                    if(this._data) throw t.ERR_RUNNING;
                    var a = e.frameBounds,
                        h = i || e.bounds || e.nominalBounds;
                    if(!h && e.getBounds && (h = e.getBounds()), h || a) {
                        var l, c, u = this._frames.length,
                            p = e.timeline.duration;
                        for(l = 0; p > l; l++) {
                            var d = a && a[l] ? a[l] : h;
                            this.addFrame(e, d, s, this._setupMovieClipFrame, {
                                i: l,
                                f: n,
                                d: r
                            })
                        }
                        var f = e.timeline._labels,
                            v = [];
                        for(var g in f) v.push({
                            index: f[g],
                            label: g
                        });
                        if(v.length)
                            for(v.sort(function(t, e) {
                                    return t.index - e.index
                                }), l = 0, c = v.length; c > l; l++) {
                                for(var m = v[l].label, y = u + v[l].index, w = u + (l == c - 1 ? p : v[l + 1].index), _ = [], x = y; w > x; x++) _.push(x);
                                (!o || (m = o(m, e, y, w))) && this.addAnimation(m, _, !0)
                            }
                    }
                }, e.build = function() {
                    if(this._data) throw t.ERR_RUNNING;
                    for(this._startBuild(); this._drawNext(););
                    return this._endBuild(), this.spriteSheet
                }, e.buildAsync = function(e) {
                    if(this._data) throw t.ERR_RUNNING;
                    this.timeSlice = e, this._startBuild();
                    var i = this;
                    this._timerID = setTimeout(function() {
                        i._run()
                    }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
                }, e.stopAsync = function() {
                    clearTimeout(this._timerID), this._data = null
                }, e.clone = function() {
                    throw "SpriteSheetBuilder cannot be cloned."
                }, e.toString = function() {
                    return "[SpriteSheetBuilder]"
                }, e._startBuild = function() {
                    var e = this.padding || 0;
                    this.progress = 0, this.spriteSheet = null, this._index = 0, this._scale = this.scale;
                    var i = [];
                    this._data = {
                        images: [],
                        frames: i,
                        animations: this._animations
                    };
                    var s = this._frames.slice();
                    if(s.sort(function(t, e) {
                            return t.height <= e.height ? -1 : 1
                        }), s[s.length - 1].height + 2 * e > this.maxHeight) throw t.ERR_DIMENSIONS;
                    for(var n = 0, r = 0, o = 0; s.length;) {
                        var a = this._fillRow(s, n, o, i, e);
                        if(a.w > r && (r = a.w), n += a.h, !a.h || !s.length) {
                            var h = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                            h.width = this._getSize(r, this.maxWidth), h.height = this._getSize(n, this.maxHeight), this._data.images[o] = h, a.h || (r = n = 0, o++)
                        }
                    }
                }, e._setupMovieClipFrame = function(t, e) {
                    var i = t.actionsEnabled;
                    t.actionsEnabled = !1, t.gotoAndStop(e.i), t.actionsEnabled = i, e.f && e.f(t, e.d, e.i)
                }, e._getSize = function(t, e) {
                    for(var i = 4; Math.pow(2, ++i) < t;);
                    return Math.min(e, Math.pow(2, i))
                }, e._fillRow = function(e, i, s, n, r) {
                    var o = this.maxWidth,
                        a = this.maxHeight;
                    i += r;
                    for(var h = a - i, l = r, c = 0, u = e.length - 1; u >= 0; u--) {
                        var p = e[u],
                            d = this._scale * p.scale,
                            f = p.sourceRect,
                            v = p.source,
                            g = Math.floor(d * f.x - r),
                            m = Math.floor(d * f.y - r),
                            y = Math.ceil(d * f.height + 2 * r),
                            w = Math.ceil(d * f.width + 2 * r);
                        if(w > o) throw t.ERR_DIMENSIONS;
                        y > h || l + w > o || (p.img = s, p.rect = new createjs.Rectangle(l, i, w, y), c = c || y, e.splice(u, 1), n[p.index] = [l, i, w, y, s, Math.round(-g + d * v.regX - r), Math.round(-m + d * v.regY - r)], l += w)
                    }
                    return {
                        w: l,
                        h: c
                    }
                }, e._endBuild = function() {
                    this.spriteSheet = new createjs.SpriteSheet(this._data), this._data = null, this.progress = 1, this.dispatchEvent("complete")
                }, e._run = function() {
                    for(var t = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), e = (new Date).getTime() + t, i = !1; e > (new Date).getTime();)
                        if(!this._drawNext()) {
                            i = !0;
                            break
                        }
                    if(i) this._endBuild();
                    else {
                        var s = this;
                        this._timerID = setTimeout(function() {
                            s._run()
                        }, 50 - t)
                    }
                    var n = this.progress = this._index / this._frames.length;
                    if(this.hasEventListener("progress")) {
                        var r = new createjs.Event("progress");
                        r.progress = n, this.dispatchEvent(r)
                    }
                }, e._drawNext = function() {
                    var t = this._frames[this._index],
                        e = t.scale * this._scale,
                        i = t.rect,
                        s = t.sourceRect,
                        n = this._data.images[t.img],
                        r = n.getContext("2d");
                    return t.funct && t.funct(t.source, t.data), r.save(), r.beginPath(), r.rect(i.x, i.y, i.width, i.height), r.clip(), r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)), r.scale(e, e), t.source.draw(r), r.restore(), ++this._index < this._frames.length
                }, createjs.SpriteSheetBuilder = createjs.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.DisplayObject_constructor(), "string" == typeof t && (t = document.getElementById(t)), this.mouseEnabled = !1;
                    var e = t.style;
                    e.position = "absolute", e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%", this.htmlElement = t, this._oldProps = null
                }
                var e = createjs.extend(t, createjs.DisplayObject);
                e.isVisible = function() {
                    return null != this.htmlElement
                }, e.draw = function() {
                    return !0
                }, e.cache = function() {}, e.uncache = function() {}, e.updateCache = function() {}, e.hitTest = function() {}, e.localToGlobal = function() {}, e.globalToLocal = function() {}, e.localToLocal = function() {}, e.clone = function() {
                    throw "DOMElement cannot be cloned."
                }, e.toString = function() {
                    return "[DOMElement (name=" + this.name + ")]"
                }, e._tick = function(t) {
                    var e = this.getStage();
                    e && e.on("drawend", this._handleDrawEnd, this, !0), this.DisplayObject__tick(t)
                }, e._handleDrawEnd = function() {
                    var t = this.htmlElement;
                    if(t) {
                        var e = t.style,
                            i = this.getConcatenatedDisplayProps(this._props),
                            s = i.matrix,
                            n = i.visible ? "visible" : "hidden";
                        if(n != e.visibility && (e.visibility = n), i.visible) {
                            var r = this._oldProps,
                                o = r && r.matrix,
                                a = 1e4;
                            if(!o || !o.equals(s)) {
                                var h = "matrix(" + (s.a * a | 0) / a + "," + (s.b * a | 0) / a + "," + (s.c * a | 0) / a + "," + (s.d * a | 0) / a + "," + (s.tx + .5 | 0);
                                e.transform = e.WebkitTransform = e.OTransform = e.msTransform = h + "," + (s.ty + .5 | 0) + ")", e.MozTransform = h + "px," + (s.ty + .5 | 0) + "px)", r || (r = this._oldProps = new createjs.DisplayProps(!0, 0 / 0)), r.matrix.copy(s)
                            }
                            r.alpha != i.alpha && (e.opacity = "" + (i.alpha * a | 0) / a, r.alpha = i.alpha)
                        }
                    }
                }, createjs.DOMElement = createjs.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {}
                var e = t.prototype;
                e.getBounds = function(t) {
                    return t
                }, e.applyFilter = function(t, e, i, s, n, r, o, a) {
                    r = r || t, null == o && (o = e), null == a && (a = i);
                    try {
                        var h = t.getImageData(e, i, s, n)
                    } catch(l) {
                        return !1
                    }
                    return this._applyFilter(h) ? (r.putImageData(h, o, a), !0) : !1
                }, e.toString = function() {
                    return "[Filter]"
                }, e.clone = function() {
                    return new t
                }, e._applyFilter = function() {
                    return !0
                }, createjs.Filter = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i) {
                    (isNaN(t) || 0 > t) && (t = 0), (isNaN(e) || 0 > e) && (e = 0), (isNaN(i) || 1 > i) && (i = 1), this.blurX = 0 | t, this.blurY = 0 | e, this.quality = 0 | i
                }
                var e = createjs.extend(t, createjs.Filter);
                t.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1], t.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9], e.getBounds = function(t) {
                    var e = 0 | this.blurX,
                        i = 0 | this.blurY;
                    if(0 >= e && 0 >= i) return t;
                    var s = Math.pow(this.quality, .2);
                    return(t || new createjs.Rectangle).pad(e * s + 1, i * s + 1, e * s + 1, i * s + 1)
                }, e.clone = function() {
                    return new t(this.blurX, this.blurY, this.quality)
                }, e.toString = function() {
                    return "[BlurFilter]"
                }, e._applyFilter = function(e) {
                    var i = this.blurX >> 1;
                    if(isNaN(i) || 0 > i) return !1;
                    var s = this.blurY >> 1;
                    if(isNaN(s) || 0 > s) return !1;
                    if(0 == i && 0 == s) return !1;
                    var n = this.quality;
                    (isNaN(n) || 1 > n) && (n = 1), n |= 0, n > 3 && (n = 3), 1 > n && (n = 1);
                    var r = e.data,
                        o = 0,
                        a = 0,
                        h = 0,
                        l = 0,
                        c = 0,
                        u = 0,
                        p = 0,
                        d = 0,
                        f = 0,
                        v = 0,
                        g = 0,
                        m = 0,
                        y = 0,
                        w = 0,
                        _ = 0,
                        x = i + i + 1 | 0,
                        b = s + s + 1 | 0,
                        T = 0 | e.width,
                        k = 0 | e.height,
                        C = T - 1 | 0,
                        S = k - 1 | 0,
                        P = i + 1 | 0,
                        M = s + 1 | 0,
                        D = {
                            r: 0,
                            b: 0,
                            g: 0,
                            a: 0
                        },
                        A = D;
                    for(h = 1; x > h; h++) A = A.n = {
                        r: 0,
                        b: 0,
                        g: 0,
                        a: 0
                    };
                    A.n = D;
                    var E = {
                            r: 0,
                            b: 0,
                            g: 0,
                            a: 0
                        },
                        I = E;
                    for(h = 1; b > h; h++) I = I.n = {
                        r: 0,
                        b: 0,
                        g: 0,
                        a: 0
                    };
                    I.n = E;
                    for(var z = null, O = 0 | t.MUL_TABLE[i], j = 0 | t.SHG_TABLE[i], L = 0 | t.MUL_TABLE[s], F = 0 | t.SHG_TABLE[s]; n-- > 0;) {
                        p = u = 0;
                        var B = O,
                            R = j;
                        for(a = k; --a > -1;) {
                            for(d = P * (m = r[0 | u]), f = P * (y = r[u + 1 | 0]), v = P * (w = r[u + 2 | 0]), g = P * (_ = r[u + 3 | 0]), A = D, h = P; --h > -1;) A.r = m, A.g = y, A.b = w, A.a = _, A = A.n;
                            for(h = 1; P > h; h++) l = u + ((h > C ? C : h) << 2) | 0, d += A.r = r[l], f += A.g = r[l + 1], v += A.b = r[l + 2], g += A.a = r[l + 3], A = A.n;
                            for(z = D, o = 0; T > o; o++) r[u++] = d * B >>> R, r[u++] = f * B >>> R, r[u++] = v * B >>> R, r[u++] = g * B >>> R, l = p + ((l = o + i + 1) < C ? l : C) << 2, d -= z.r - (z.r = r[l]), f -= z.g - (z.g = r[l + 1]), v -= z.b - (z.b = r[l + 2]), g -= z.a - (z.a = r[l + 3]), z = z.n;
                            p += T
                        }
                        for(B = L, R = F, o = 0; T > o; o++) {
                            for(u = o << 2 | 0, d = M * (m = r[u]) | 0, f = M * (y = r[u + 1 | 0]) | 0, v = M * (w = r[u + 2 | 0]) | 0, g = M * (_ = r[u + 3 | 0]) | 0, I = E, h = 0; M > h; h++) I.r = m, I.g = y, I.b = w, I.a = _, I = I.n;
                            for(c = T, h = 1; s >= h; h++) u = c + o << 2, d += I.r = r[u], f += I.g = r[u + 1], v += I.b = r[u + 2], g += I.a = r[u + 3], I = I.n, S > h && (c += T);
                            if(u = o, z = E, n > 0)
                                for(a = 0; k > a; a++) l = u << 2, r[l + 3] = _ = g * B >>> R, _ > 0 ? (r[l] = d * B >>> R, r[l + 1] = f * B >>> R, r[l + 2] = v * B >>> R) : r[l] = r[l + 1] = r[l + 2] = 0, l = o + ((l = a + M) < S ? l : S) * T << 2, d -= z.r - (z.r = r[l]), f -= z.g - (z.g = r[l + 1]), v -= z.b - (z.b = r[l + 2]), g -= z.a - (z.a = r[l + 3]), z = z.n, u += T;
                            else
                                for(a = 0; k > a; a++) l = u << 2, r[l + 3] = _ = g * B >>> R, _ > 0 ? (_ = 255 / _, r[l] = (d * B >>> R) * _, r[l + 1] = (f * B >>> R) * _, r[l + 2] = (v * B >>> R) * _) : r[l] = r[l + 1] = r[l + 2] = 0, l = o + ((l = a + M) < S ? l : S) * T << 2, d -= z.r - (z.r = r[l]), f -= z.g - (z.g = r[l + 1]), v -= z.b - (z.b = r[l + 2]), g -= z.a - (z.a = r[l + 3]), z = z.n, u += T
                        }
                    }
                    return !0
                }, createjs.BlurFilter = createjs.promote(t, "Filter")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.alphaMap = t, this._alphaMap = null, this._mapData = null
                }
                var e = createjs.extend(t, createjs.Filter);
                e.clone = function() {
                    var e = new t(this.alphaMap);
                    return e._alphaMap = this._alphaMap, e._mapData = this._mapData, e
                }, e.toString = function() {
                    return "[AlphaMapFilter]"
                }, e._applyFilter = function(t) {
                    if(!this.alphaMap) return !0;
                    if(!this._prepAlphaMap()) return !1;
                    for(var e = t.data, i = this._mapData, s = 0, n = e.length; n > s; s += 4) e[s + 3] = i[s] || 0;
                    return !0
                }, e._prepAlphaMap = function() {
                    if(!this.alphaMap) return !1;
                    if(this.alphaMap == this._alphaMap && this._mapData) return !0;
                    this._mapData = null;
                    var t, e = this._alphaMap = this.alphaMap,
                        i = e;
                    e instanceof HTMLCanvasElement ? t = i.getContext("2d") : (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), i.width = e.width, i.height = e.height, t = i.getContext("2d"), t.drawImage(e, 0, 0));
                    try {
                        var s = t.getImageData(0, 0, e.width, e.height)
                    } catch(n) {
                        return !1
                    }
                    return this._mapData = s.data, !0
                }, createjs.AlphaMapFilter = createjs.promote(t, "Filter")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.mask = t
                }
                var e = createjs.extend(t, createjs.Filter);
                e.applyFilter = function(t, e, i, s, n, r, o, a) {
                    return this.mask ? (r = r || t, null == o && (o = e), null == a && (a = i), r.save(), t != r ? !1 : (r.globalCompositeOperation = "destination-in", r.drawImage(this.mask, o, a), r.restore(), !0)) : !0
                }, e.clone = function() {
                    return new t(this.mask)
                }, e.toString = function() {
                    return "[AlphaMaskFilter]"
                }, createjs.AlphaMaskFilter = createjs.promote(t, "Filter")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s, n, r, o, a) {
                    this.redMultiplier = null != t ? t : 1, this.greenMultiplier = null != e ? e : 1, this.blueMultiplier = null != i ? i : 1, this.alphaMultiplier = null != s ? s : 1, this.redOffset = n || 0, this.greenOffset = r || 0, this.blueOffset = o || 0, this.alphaOffset = a || 0
                }
                var e = createjs.extend(t, createjs.Filter);
                e.toString = function() {
                    return "[ColorFilter]"
                }, e.clone = function() {
                    return new t(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
                }, e._applyFilter = function(t) {
                    for(var e = t.data, i = e.length, s = 0; i > s; s += 4) e[s] = e[s] * this.redMultiplier + this.redOffset, e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset, e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset, e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset;
                    return !0
                }, createjs.ColorFilter = createjs.promote(t, "Filter")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t, e, i, s) {
                    this.setColor(t, e, i, s)
                }
                var e = t.prototype;
                t.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10], t.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t.LENGTH = t.IDENTITY_MATRIX.length, e.setColor = function(t, e, i, s) {
                    return this.reset().adjustColor(t, e, i, s)
                }, e.reset = function() {
                    return this.copy(t.IDENTITY_MATRIX)
                }, e.adjustColor = function(t, e, i, s) {
                    return this.adjustHue(s), this.adjustContrast(e), this.adjustBrightness(t), this.adjustSaturation(i)
                }, e.adjustBrightness = function(t) {
                    return 0 == t || isNaN(t) ? this : (t = this._cleanValue(t, 255), this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this)
                }, e.adjustContrast = function(e) {
                    if(0 == e || isNaN(e)) return this;
                    e = this._cleanValue(e, 100);
                    var i;
                    return 0 > e ? i = 127 + e / 100 * 127 : (i = e % 1, i = 0 == i ? t.DELTA_INDEX[e] : t.DELTA_INDEX[e << 0] * (1 - i) + t.DELTA_INDEX[(e << 0) + 1] * i, i = 127 * i + 127), this._multiplyMatrix([i / 127, 0, 0, 0, .5 * (127 - i), 0, i / 127, 0, 0, .5 * (127 - i), 0, 0, i / 127, 0, .5 * (127 - i), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.adjustSaturation = function(t) {
                    if(0 == t || isNaN(t)) return this;
                    t = this._cleanValue(t, 100);
                    var e = 1 + (t > 0 ? 3 * t / 100 : t / 100),
                        i = .3086,
                        s = .6094,
                        n = .082;
                    return this._multiplyMatrix([i * (1 - e) + e, s * (1 - e), n * (1 - e), 0, 0, i * (1 - e), s * (1 - e) + e, n * (1 - e), 0, 0, i * (1 - e), s * (1 - e), n * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.adjustHue = function(t) {
                    if(0 == t || isNaN(t)) return this;
                    t = this._cleanValue(t, 180) / 180 * Math.PI;
                    var e = Math.cos(t),
                        i = Math.sin(t),
                        s = .213,
                        n = .715,
                        r = .072;
                    return this._multiplyMatrix([s + e * (1 - s) + i * -s, n + e * -n + i * -n, r + e * -r + i * (1 - r), 0, 0, s + e * -s + .143 * i, n + e * (1 - n) + .14 * i, r + e * -r + i * -.283, 0, 0, s + e * -s + i * -(1 - s), n + e * -n + i * n, r + e * (1 - r) + i * r, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.concat = function(e) {
                    return e = this._fixMatrix(e), e.length != t.LENGTH ? this : (this._multiplyMatrix(e), this)
                }, e.clone = function() {
                    return(new t).copy(this)
                }, e.toArray = function() {
                    for(var e = [], i = 0, s = t.LENGTH; s > i; i++) e[i] = this[i];
                    return e
                }, e.copy = function(e) {
                    for(var i = t.LENGTH, s = 0; i > s; s++) this[s] = e[s];
                    return this
                }, e.toString = function() {
                    return "[ColorMatrix]"
                }, e._multiplyMatrix = function(t) {
                    var e, i, s, n = [];
                    for(e = 0; 5 > e; e++) {
                        for(i = 0; 5 > i; i++) n[i] = this[i + 5 * e];
                        for(i = 0; 5 > i; i++) {
                            var r = 0;
                            for(s = 0; 5 > s; s++) r += t[i + 5 * s] * n[s];
                            this[i + 5 * e] = r
                        }
                    }
                }, e._cleanValue = function(t, e) {
                    return Math.min(e, Math.max(-e, t))
                }, e._fixMatrix = function(e) {
                    return e instanceof t && (e = e.toArray()), e.length < t.LENGTH ? e = e.slice(0, e.length).concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)) : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)), e
                }, createjs.ColorMatrix = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t(t) {
                    this.matrix = t
                }
                var e = createjs.extend(t, createjs.Filter);
                e.toString = function() {
                    return "[ColorMatrixFilter]"
                }, e.clone = function() {
                    return new t(this.matrix)
                }, e._applyFilter = function(t) {
                    for(var e, i, s, n, r = t.data, o = r.length, a = this.matrix, h = a[0], l = a[1], c = a[2], u = a[3], p = a[4], d = a[5], f = a[6], v = a[7], g = a[8], m = a[9], y = a[10], w = a[11], _ = a[12], x = a[13], b = a[14], T = a[15], k = a[16], C = a[17], S = a[18], P = a[19], M = 0; o > M; M += 4) e = r[M], i = r[M + 1], s = r[M + 2], n = r[M + 3], r[M] = e * h + i * l + s * c + n * u + p, r[M + 1] = e * d + i * f + s * v + n * g + m, r[M + 2] = e * y + i * w + s * _ + n * x + b, r[M + 3] = e * T + i * k + s * C + n * S + P;
                    return !0
                }, createjs.ColorMatrixFilter = createjs.promote(t, "Filter")
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";

                function t() {
                    throw "Touch cannot be instantiated"
                }
                t.isSupported = function() {
                    return !!("ontouchstart" in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
                }, t.enable = function(e, i, s) {
                    return e && e.canvas && t.isSupported() ? e.__touch ? !0 : (e.__touch = {
                        pointers: {},
                        multitouch: !i,
                        preventDefault: !s,
                        count: 0
                    }, "ontouchstart" in window ? t._IOS_enable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_enable(e), !0) : !1
                }, t.disable = function(e) {
                    e && ("ontouchstart" in window ? t._IOS_disable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_disable(e), delete e.__touch)
                }, t._IOS_enable = function(e) {
                    var i = e.canvas,
                        s = e.__touch.f = function(i) {
                            t._IOS_handleEvent(e, i)
                        };
                    i.addEventListener("touchstart", s, !1), i.addEventListener("touchmove", s, !1), i.addEventListener("touchend", s, !1), i.addEventListener("touchcancel", s, !1)
                }, t._IOS_disable = function(t) {
                    var e = t.canvas;
                    if(e) {
                        var i = t.__touch.f;
                        e.removeEventListener("touchstart", i, !1), e.removeEventListener("touchmove", i, !1), e.removeEventListener("touchend", i, !1), e.removeEventListener("touchcancel", i, !1)
                    }
                }, t._IOS_handleEvent = function(t, e) {
                    if(t) {
                        t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                        for(var i = e.changedTouches, s = e.type, n = 0, r = i.length; r > n; n++) {
                            var o = i[n],
                                a = o.identifier;
                            o.target == t.canvas && ("touchstart" == s ? this._handleStart(t, a, e, o.pageX, o.pageY) : "touchmove" == s ? this._handleMove(t, a, e, o.pageX, o.pageY) : ("touchend" == s || "touchcancel" == s) && this._handleEnd(t, a, e))
                        }
                    }
                }, t._IE_enable = function(e) {
                    var i = e.canvas,
                        s = e.__touch.f = function(i) {
                            t._IE_handleEvent(e, i)
                        };
                    void 0 === window.navigator.pointerEnabled ? (i.addEventListener("MSPointerDown", s, !1), window.addEventListener("MSPointerMove", s, !1), window.addEventListener("MSPointerUp", s, !1), window.addEventListener("MSPointerCancel", s, !1), e.__touch.preventDefault && (i.style.msTouchAction = "none")) : (i.addEventListener("pointerdown", s, !1), window.addEventListener("pointermove", s, !1), window.addEventListener("pointerup", s, !1), window.addEventListener("pointercancel", s, !1), e.__touch.preventDefault && (i.style.touchAction = "none")), e.__touch.activeIDs = {}
                }, t._IE_disable = function(t) {
                    var e = t.__touch.f;
                    void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", e, !1), window.removeEventListener("MSPointerUp", e, !1), window.removeEventListener("MSPointerCancel", e, !1), t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1)) : (window.removeEventListener("pointermove", e, !1), window.removeEventListener("pointerup", e, !1), window.removeEventListener("pointercancel", e, !1), t.canvas && t.canvas.removeEventListener("pointerdown", e, !1))
                }, t._IE_handleEvent = function(t, e) {
                    if(t) {
                        t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                        var i = e.type,
                            s = e.pointerId,
                            n = t.__touch.activeIDs;
                        if("MSPointerDown" == i || "pointerdown" == i) {
                            if(e.srcElement != t.canvas) return;
                            n[s] = !0, this._handleStart(t, s, e, e.pageX, e.pageY)
                        } else n[s] && ("MSPointerMove" == i || "pointermove" == i ? this._handleMove(t, s, e, e.pageX, e.pageY) : ("MSPointerUp" == i || "MSPointerCancel" == i || "pointerup" == i || "pointercancel" == i) && (delete n[s], this._handleEnd(t, s, e)))
                    }
                }, t._handleStart = function(t, e, i, s, n) {
                    var r = t.__touch;
                    if(r.multitouch || !r.count) {
                        var o = r.pointers;
                        o[e] || (o[e] = !0, r.count++, t._handlePointerDown(e, i, s, n))
                    }
                }, t._handleMove = function(t, e, i, s, n) {
                    t.__touch.pointers[e] && t._handlePointerMove(e, i, s, n)
                }, t._handleEnd = function(t, e, i) {
                    var s = t.__touch,
                        n = s.pointers;
                    n[e] && (s.count--, t._handlePointerUp(e, i, !0), delete n[e])
                }, createjs.Touch = t
            }(), this.createjs = this.createjs || {},
            function() {
                "use strict";
                var t = createjs.EaselJS = createjs.EaselJS || {};
                t.version = "0.8.0", t.buildDate = "Thu, 15 Jan 2015 23:50:40 GMT"
            }()
    }, {}],
    83: [function(t, e, i) {
        (function(t) {
            (function() {
                function s(t, e) {
                    if(t !== e) {
                        var i = null === t,
                            s = t === T,
                            n = t === t,
                            r = null === e,
                            o = e === T,
                            a = e === e;
                        if(t > e && !r || !n || i && !o && a || s && a) return 1;
                        if(e > t && !i || !a || r && !s && n || o && n) return -1
                    }
                    return 0
                }

                function n(t, e, i) {
                    for(var s = t.length, n = i ? s : -1; i ? n-- : ++n < s;)
                        if(e(t[n], n, t)) return n;
                    return -1
                }

                function r(t, e, i) {
                    if(e !== e) return v(t, i);
                    i -= 1;
                    for(var s = t.length; ++i < s;)
                        if(t[i] === e) return i;
                    return -1
                }

                function o(t) {
                    return "function" == typeof t || !1
                }

                function a(t) {
                    return null == t ? "" : t + ""
                }

                function h(t, e) {
                    for(var i = -1, s = t.length; ++i < s && -1 < e.indexOf(t.charAt(i)););
                    return i
                }

                function l(t, e) {
                    for(var i = t.length; i-- && -1 < e.indexOf(t.charAt(i)););
                    return i
                }

                function c(t, e) {
                    return s(t.a, e.a) || t.b - e.b
                }

                function u(t) {
                    return Be[t]
                }

                function p(t) {
                    return Re[t]
                }

                function d(t, e, i) {
                    return e ? t = Ve[t] : i && (t = Ne[t]), "\\" + t
                }

                function f(t) {
                    return "\\" + Ne[t]
                }

                function v(t, e, i) {
                    var s = t.length;
                    for(e += i ? 0 : -1; i ? e-- : ++e < s;) {
                        var n = t[e];
                        if(n !== n) return e
                    }
                    return -1
                }

                function g(t) {
                    return !!t && "object" == typeof t
                }

                function m(t) {
                    return 160 >= t && t >= 9 && 13 >= t || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (8202 >= t || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
                }

                function y(t, e) {
                    for(var i = -1, s = t.length, n = -1, r = []; ++i < s;) t[i] === e && (t[i] = V, r[++n] = i);
                    return r
                }

                function w(t) {
                    for(var e = -1, i = t.length; ++e < i && m(t.charCodeAt(e)););
                    return e
                }

                function _(t) {
                    for(var e = t.length; e-- && m(t.charCodeAt(e)););
                    return e
                }

                function x(t) {
                    return We[t]
                }

                function b(t) {
                    function e(t) {
                        if(g(t) && !(Mo(t) || t instanceof Be)) {
                            if(t instanceof m) return t;
                            if(tr.call(t, "__chain__") && tr.call(t, "__wrapped__")) return Us(t)
                        }
                        return new m(t)
                    }

                    function i() {}

                    function m(t, e, i) {
                        this.__wrapped__ = t, this.__actions__ = i || [], this.__chain__ = !!e
                    }

                    function Be(t) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Pr, this.__views__ = []
                    }

                    function Re() {
                        this.__data__ = {}
                    }

                    function We(t) {
                        var e = t ? t.length : 0;
                        for(this.data = {
                                hash: gr(null),
                                set: new cr
                            }; e--;) this.push(t[e])
                    }

                    function Ue(t, e) {
                        var i = t.data;
                        return("string" == typeof e || gn(e) ? i.set.has(e) : i.hash[e]) ? 0 : -1
                    }

                    function Ve(t, e) {
                        var i = -1,
                            s = t.length;
                        for(e || (e = Wn(s)); ++i < s;) e[i] = t[i];
                        return e
                    }

                    function Ne(t, e) {
                        for(var i = -1, s = t.length; ++i < s && !1 !== e(t[i], i, t););
                        return t
                    }

                    function He(t, e) {
                        for(var i = -1, s = t.length; ++i < s;)
                            if(!e(t[i], i, t)) return !1;
                        return !0
                    }

                    function Ge(t, e) {
                        for(var i = -1, s = t.length, n = -1, r = []; ++i < s;) {
                            var o = t[i];
                            e(o, i, t) && (r[++n] = o)
                        }
                        return r
                    }

                    function qe(t, e) {
                        for(var i = -1, s = t.length, n = Wn(s); ++i < s;) n[i] = e(t[i], i, t);
                        return n
                    }

                    function Ye(t, e) {
                        for(var i = -1, s = e.length, n = t.length; ++i < s;) t[n + i] = e[i];
                        return t
                    }

                    function Xe(t, e, i, s) {
                        var n = -1,
                            r = t.length;
                        for(s && r && (i = t[++n]); ++n < r;) i = e(i, t[n], n, t);
                        return i
                    }

                    function Je(t, e) {
                        for(var i = -1, s = t.length; ++i < s;)
                            if(e(t[i], i, t)) return !0;
                        return !1
                    }

                    function $e(t, e, i, s) {
                        return t !== T && tr.call(s, i) ? t : e
                    }

                    function Qe(t, e, i) {
                        for(var s = -1, n = Ro(e), r = n.length; ++s < r;) {
                            var o = n[s],
                                a = t[o],
                                h = i(a, e[o], o, t, e);
                            (h === h ? h === a : a !== a) && (a !== T || o in t) || (t[o] = h)
                        }
                        return t
                    }

                    function ti(t, e) {
                        return null == e ? t : ii(e, Ro(e), t)
                    }

                    function ei(t, e) {
                        for(var i = -1, s = null == t, n = !s && Ms(t), r = n ? t.length : 0, o = e.length, a = Wn(o); ++i < o;) {
                            var h = e[i];
                            a[i] = n ? Ds(h, r) ? t[h] : T : s ? T : t[h]
                        }
                        return a
                    }

                    function ii(t, e, i) {
                        i || (i = {});
                        for(var s = -1, n = e.length; ++s < n;) {
                            var r = e[s];
                            i[r] = t[r]
                        }
                        return i
                    }

                    function si(t, e, i) {
                        var s = typeof t;
                        return "function" == s ? e === T ? t : Ri(t, e, i) : null == t ? jn : "object" == s ? _i(t) : e === T ? Rn(t) : xi(t, e)
                    }

                    function ni(t, e, i, s, n, r, o) {
                        var a;
                        if(i && (a = n ? i(t, s, n) : i(t)), a !== T) return a;
                        if(!gn(t)) return t;
                        if(s = Mo(t)) {
                            if(a = ks(t), !e) return Ve(t, a)
                        } else {
                            var h = ir.call(t),
                                l = h == X;
                            if(h != Z && h != N && (!l || n)) return Fe[h] ? Ss(t, h, e) : n ? t : {};
                            if(a = Cs(l ? {} : t), !e) return ti(a, t)
                        }
                        for(r || (r = []), o || (o = []), n = r.length; n--;)
                            if(r[n] == t) return o[n];
                        return r.push(t), o.push(a), (s ? Ne : di)(t, function(s, n) {
                            a[n] = ni(s, e, i, n, t, r, o)
                        }), a
                    }

                    function ri(t, e, i) {
                        if("function" != typeof t) throw new Kn(U);
                        return ur(function() {
                            t.apply(T, i)
                        }, e)
                    }

                    function oi(t, e) {
                        var i = t ? t.length : 0,
                            s = [];
                        if(!i) return s;
                        var n = -1,
                            o = xs(),
                            a = o === r,
                            h = a && e.length >= B && gr && cr ? new We(e) : null,
                            l = e.length;
                        h && (o = Ue, a = !1, e = h);
                        t: for(; ++n < i;)
                            if(h = t[n], a && h === h) {
                                for(var c = l; c--;)
                                    if(e[c] === h) continue t;
                                s.push(h)
                            } else 0 > o(e, h, 0) && s.push(h);
                        return s
                    }

                    function ai(t, e) {
                        var i = !0;
                        return Or(t, function(t, s, n) {
                            return i = !!e(t, s, n)
                        }), i
                    }

                    function hi(t, e, i, s) {
                        var n = s,
                            r = n;
                        return Or(t, function(t, o, a) {
                            o = +e(t, o, a), (i(o, n) || o === s && o === r) && (n = o, r = t)
                        }), r
                    }

                    function li(t, e) {
                        var i = [];
                        return Or(t, function(t, s, n) {
                            e(t, s, n) && i.push(t)
                        }), i
                    }

                    function ci(t, e, i, s) {
                        var n;
                        return i(t, function(t, i, r) {
                            return e(t, i, r) ? (n = s ? i : t, !1) : void 0
                        }), n
                    }

                    function ui(t, e, i, s) {
                        s || (s = []);
                        for(var n = -1, r = t.length; ++n < r;) {
                            var o = t[n];
                            g(o) && Ms(o) && (i || Mo(o) || pn(o)) ? e ? ui(o, e, i, s) : Ye(s, o) : i || (s[s.length] = o)
                        }
                        return s
                    }

                    function pi(t, e) {
                        Lr(t, e, Pn)
                    }

                    function di(t, e) {
                        return Lr(t, e, Ro)
                    }

                    function fi(t, e) {
                        return Fr(t, e, Ro)
                    }

                    function vi(t, e) {
                        for(var i = -1, s = e.length, n = -1, r = []; ++i < s;) {
                            var o = e[i];
                            vn(t[o]) && (r[++n] = o)
                        }
                        return r
                    }

                    function gi(t, e, i) {
                        if(null != t) {
                            i !== T && i in Rs(t) && (e = [i]), i = 0;
                            for(var s = e.length; null != t && s > i;) t = t[e[i++]];
                            return i && i == s ? t : T
                        }
                    }

                    function mi(t, e, i, s, n, r) {
                        if(t === e) t = !0;
                        else if(null == t || null == e || !gn(t) && !g(e)) t = t !== t && e !== e;
                        else t: {
                            var o = mi,
                                a = Mo(t),
                                h = Mo(e),
                                l = H,
                                c = H;a || (l = ir.call(t), l == N ? l = Z : l != Z && (a = bn(t))),
                            h || (c = ir.call(e), c == N ? c = Z : c != Z && bn(e));
                            var u = l == Z,
                                h = c == Z,
                                c = l == c;
                            if(!c || a || u) {
                                if(!s && (l = u && tr.call(t, "__wrapped__"), h = h && tr.call(e, "__wrapped__"), l || h)) {
                                    t = o(l ? t.value() : t, h ? e.value() : e, i, s, n, r);
                                    break t
                                }
                                if(c) {
                                    for(n || (n = []), r || (r = []), l = n.length; l--;)
                                        if(n[l] == t) {
                                            t = r[l] == e;
                                            break t
                                        }
                                    n.push(t), r.push(e), t = (a ? gs : ys)(t, e, o, i, s, n, r), n.pop(), r.pop()
                                } else t = !1
                            } else t = ms(t, e, l)
                        }
                        return t
                    }

                    function yi(t, e, i) {
                        var s = e.length,
                            n = s,
                            r = !i;
                        if(null == t) return !n;
                        for(t = Rs(t); s--;) {
                            var o = e[s];
                            if(r && o[2] ? o[1] !== t[o[0]] : !(o[0] in t)) return !1
                        }
                        for(; ++s < n;) {
                            var o = e[s],
                                a = o[0],
                                h = t[a],
                                l = o[1];
                            if(r && o[2]) {
                                if(h === T && !(a in t)) return !1
                            } else if(o = i ? i(h, l, a) : T, o === T ? !mi(l, h, i, !0) : !o) return !1
                        }
                        return !0
                    }

                    function wi(t, e) {
                        var i = -1,
                            s = Ms(t) ? Wn(t.length) : [];
                        return Or(t, function(t, n, r) {
                            s[++i] = e(t, n, r)
                        }), s
                    }

                    function _i(t) {
                        var e = bs(t);
                        if(1 == e.length && e[0][2]) {
                            var i = e[0][0],
                                s = e[0][1];
                            return function(t) {
                                return null == t ? !1 : t[i] === s && (s !== T || i in Rs(t))
                            }
                        }
                        return function(t) {
                            return yi(t, e)
                        }
                    }

                    function xi(t, e) {
                        var i = Mo(t),
                            s = Es(t) && e === e && !gn(e),
                            n = t + "";
                        return t = Ws(t),
                            function(r) {
                                if(null == r) return !1;
                                var o = n;
                                if(r = Rs(r), !(!i && s || o in r)) {
                                    if(r = 1 == t.length ? r : gi(r, Mi(t, 0, -1)), null == r) return !1;
                                    o = qs(t), r = Rs(r)
                                }
                                return r[o] === e ? e !== T || o in r : mi(e, r[o], T, !0)
                            }
                    }

                    function bi(t, e, i, s, n) {
                        if(!gn(t)) return t;
                        var r = Ms(e) && (Mo(e) || bn(e)),
                            o = r ? T : Ro(e);
                        return Ne(o || e, function(a, h) {
                            if(o && (h = a, a = e[h]), g(a)) {
                                s || (s = []), n || (n = []);
                                t: {
                                    for(var l = h, c = s, u = n, p = c.length, d = e[l]; p--;)
                                        if(c[p] == d) {
                                            t[l] = u[p];
                                            break t
                                        }
                                    var p = t[l],
                                        f = i ? i(p, d, l, t, e) : T,
                                        v = f === T;v && (f = d, Ms(d) && (Mo(d) || bn(d)) ? f = Mo(p) ? p : Ms(p) ? Ve(p) : [] : wn(d) || pn(d) ? f = pn(p) ? Cn(p) : wn(p) ? p : {} : v = !1),
                                    c.push(d),
                                    u.push(f),
                                    v ? t[l] = bi(f, d, i, c, u) : (f === f ? f !== p : p === p) && (t[l] = f)
                                }
                            } else l = t[h], c = i ? i(l, a, h, t, e) : T, (u = c === T) && (c = a), c === T && (!r || h in t) || !u && (c === c ? c === l : l !== l) || (t[h] = c)
                        }), t
                    }

                    function Ti(t) {
                        return function(e) {
                            return null == e ? T : e[t]
                        }
                    }

                    function ki(t) {
                        var e = t + "";
                        return t = Ws(t),
                            function(i) {
                                return gi(i, t, e)
                            }
                    }

                    function Ci(t, e) {
                        for(var i = t ? e.length : 0; i--;) {
                            var s = e[i];
                            if(s != n && Ds(s)) {
                                var n = s;
                                pr.call(t, s, 1)
                            }
                        }
                    }

                    function Si(t, e) {
                        return t + mr(Cr() * (e - t + 1))
                    }

                    function Pi(t, e, i, s, n) {
                        return n(t, function(t, n, r) {
                            i = s ? (s = !1, t) : e(i, t, n, r)
                        }), i
                    }

                    function Mi(t, e, i) {
                        var s = -1,
                            n = t.length;
                        for(e = null == e ? 0 : +e || 0, 0 > e && (e = -e > n ? 0 : n + e), i = i === T || i > n ? n : +i || 0, 0 > i && (i += n), n = e > i ? 0 : i - e >>> 0, e >>>= 0, i = Wn(n); ++s < n;) i[s] = t[s + e];
                        return i
                    }

                    function Di(t, e) {
                        var i;
                        return Or(t, function(t, s, n) {
                            return i = e(t, s, n), !i
                        }), !!i
                    }

                    function Ai(t, e) {
                        var i = t.length;
                        for(t.sort(e); i--;) t[i] = t[i].c;
                        return t
                    }

                    function Ei(t, e, i) {
                        var n = ws(),
                            r = -1;
                        return e = qe(e, function(t) {
                            return n(t)
                        }), t = wi(t, function(t) {
                            return {
                                a: qe(e, function(e) {
                                    return e(t)
                                }),
                                b: ++r,
                                c: t
                            }
                        }), Ai(t, function(t, e) {
                            var n;
                            t: {
                                for(var r = -1, o = t.a, a = e.a, h = o.length, l = i.length; ++r < h;)
                                    if(n = s(o[r], a[r])) {
                                        if(r >= l) break t;
                                        r = i[r], n *= "asc" === r || !0 === r ? 1 : -1;
                                        break t
                                    }
                                n = t.b - e.b
                            }
                            return n
                        })
                    }

                    function Ii(t, e) {
                        var i = 0;
                        return Or(t, function(t, s, n) {
                            i += +e(t, s, n) || 0
                        }), i
                    }

                    function zi(t, e) {
                        var i = -1,
                            s = xs(),
                            n = t.length,
                            o = s === r,
                            a = o && n >= B,
                            h = a && gr && cr ? new We(void 0) : null,
                            l = [];
                        h ? (s = Ue, o = !1) : (a = !1, h = e ? [] : l);
                        t: for(; ++i < n;) {
                            var c = t[i],
                                u = e ? e(c, i, t) : c;
                            if(o && c === c) {
                                for(var p = h.length; p--;)
                                    if(h[p] === u) continue t;
                                e && h.push(u), l.push(c)
                            } else 0 > s(h, u, 0) && ((e || a) && h.push(u), l.push(c))
                        }
                        return l
                    }

                    function Oi(t, e) {
                        for(var i = -1, s = e.length, n = Wn(s); ++i < s;) n[i] = t[e[i]];
                        return n
                    }

                    function ji(t, e, i, s) {
                        for(var n = t.length, r = s ? n : -1;
                            (s ? r-- : ++r < n) && e(t[r], r, t););
                        return i ? Mi(t, s ? 0 : r, s ? r + 1 : n) : Mi(t, s ? r + 1 : 0, s ? n : r)
                    }

                    function Li(t, e) {
                        var i = t;
                        i instanceof Be && (i = i.value());
                        for(var s = -1, n = e.length; ++s < n;) var r = e[s],
                            i = r.func.apply(r.thisArg, Ye([i], r.args));
                        return i
                    }

                    function Fi(t, e, i) {
                        var s = 0,
                            n = t ? t.length : s;
                        if("number" == typeof e && e === e && Dr >= n) {
                            for(; n > s;) {
                                var r = s + n >>> 1,
                                    o = t[r];
                                (i ? e >= o : e > o) && null !== o ? s = r + 1 : n = r
                            }
                            return n
                        }
                        return Bi(t, e, jn, i)
                    }

                    function Bi(t, e, i, s) {
                        e = i(e);
                        for(var n = 0, r = t ? t.length : 0, o = e !== e, a = null === e, h = e === T; r > n;) {
                            var l = mr((n + r) / 2),
                                c = i(t[l]),
                                u = c !== T,
                                p = c === c;
                            (o ? p || s : a ? p && u && (s || null != c) : h ? p && (s || u) : null == c ? 0 : s ? e >= c : e > c) ? n = l + 1: r = l
                        }
                        return br(r, Mr)
                    }

                    function Ri(t, e, i) {
                        if("function" != typeof t) return jn;
                        if(e === T) return t;
                        switch(i) {
                            case 1:
                                return function(i) {
                                    return t.call(e, i)
                                };
                            case 3:
                                return function(i, s, n) {
                                    return t.call(e, i, s, n)
                                };
                            case 4:
                                return function(i, s, n, r) {
                                    return t.call(e, i, s, n, r)
                                };
                            case 5:
                                return function(i, s, n, r, o) {
                                    return t.call(e, i, s, n, r, o)
                                }
                        }
                        return function() {
                            return t.apply(e, arguments)
                        }
                    }

                    function Wi(t) {
                        var e = new rr(t.byteLength);
                        return new dr(e).set(new dr(t)), e
                    }

                    function Ui(t, e, i) {
                        for(var s = i.length, n = -1, r = xr(t.length - s, 0), o = -1, a = e.length, h = Wn(a + r); ++o < a;) h[o] = e[o];
                        for(; ++n < s;) h[i[n]] = t[n];
                        for(; r--;) h[o++] = t[n++];
                        return h
                    }

                    function Vi(t, e, i) {
                        for(var s = -1, n = i.length, r = -1, o = xr(t.length - n, 0), a = -1, h = e.length, l = Wn(o + h); ++r < o;) l[r] = t[r];
                        for(o = r; ++a < h;) l[o + a] = e[a];
                        for(; ++s < n;) l[o + i[s]] = t[r++];
                        return l
                    }

                    function Ni(t, e) {
                        return function(i, s, n) {
                            var r = e ? e() : {};
                            if(s = ws(s, n, 3), Mo(i)) {
                                n = -1;
                                for(var o = i.length; ++n < o;) {
                                    var a = i[n];
                                    t(r, a, s(a, n, i), i)
                                }
                            } else Or(i, function(e, i, n) {
                                t(r, e, s(e, i, n), n)
                            });
                            return r
                        }
                    }

                    function Hi(t) {
                        return cn(function(e, i) {
                            var s = -1,
                                n = null == e ? 0 : i.length,
                                r = n > 2 ? i[n - 2] : T,
                                o = n > 2 ? i[2] : T,
                                a = n > 1 ? i[n - 1] : T;
                            for("function" == typeof r ? (r = Ri(r, a, 5), n -= 2) : (r = "function" == typeof a ? a : T, n -= r ? 1 : 0), o && As(i[0], i[1], o) && (r = 3 > n ? T : r, n = 1); ++s < n;)(o = i[s]) && t(e, o, r);
                            return e
                        })
                    }

                    function Gi(t, e) {
                        return function(i, s) {
                            var n = i ? Wr(i) : 0;
                            if(!zs(n)) return t(i, s);
                            for(var r = e ? n : -1, o = Rs(i);
                                (e ? r-- : ++r < n) && !1 !== s(o[r], r, o););
                            return i
                        }
                    }

                    function qi(t) {
                        return function(e, i, s) {
                            var n = Rs(e);
                            s = s(e);
                            for(var r = s.length, o = t ? r : -1; t ? o-- : ++o < r;) {
                                var a = s[o];
                                if(!1 === i(n[a], a, n)) break
                            }
                            return e
                        }
                    }

                    function Yi(t, e) {
                        function i() {
                            return(this && this !== Ke && this instanceof i ? s : t).apply(e, arguments)
                        }
                        var s = Ki(t);
                        return i
                    }

                    function Xi(t) {
                        return function(e) {
                            var i = -1;
                            e = zn(An(e));
                            for(var s = e.length, n = ""; ++i < s;) n = t(n, e[i], i);
                            return n
                        }
                    }

                    function Ki(t) {
                        return function() {
                            var e = arguments;
                            switch(e.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e[0]);
                                case 2:
                                    return new t(e[0], e[1]);
                                case 3:
                                    return new t(e[0], e[1], e[2]);
                                case 4:
                                    return new t(e[0], e[1], e[2], e[3]);
                                case 5:
                                    return new t(e[0], e[1], e[2], e[3], e[4]);
                                case 6:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                                case 7:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                            }
                            var i = zr(t.prototype),
                                e = t.apply(i, e);
                            return gn(e) ? e : i
                        }
                    }

                    function Zi(t) {
                        function e(i, s, n) {
                            return n && As(i, s, n) && (s = T), i = vs(i, t, T, T, T, T, T, s), i.placeholder = e.placeholder, i
                        }
                        return e
                    }

                    function Ji(t, e) {
                        return cn(function(i) {
                            var s = i[0];
                            return null == s ? s : (i.push(e), t.apply(T, i))
                        })
                    }

                    function $i(t, e) {
                        return function(i, s, n) {
                            if(n && As(i, s, n) && (s = T), s = ws(s, n, 3), 1 == s.length) {
                                n = i = Mo(i) ? i : Bs(i);
                                for(var r = s, o = -1, a = n.length, h = e, l = h; ++o < a;) {
                                    var c = n[o],
                                        u = +r(c);
                                    t(u, h) && (h = u, l = c)
                                }
                                if(n = l, !i.length || n !== e) return n
                            }
                            return hi(i, s, t, e)
                        }
                    }

                    function Qi(t, e) {
                        return function(i, s, r) {
                            return s = ws(s, r, 3), Mo(i) ? (s = n(i, s, e), s > -1 ? i[s] : T) : ci(i, s, t)
                        }
                    }

                    function ts(t) {
                        return function(e, i, s) {
                            return e && e.length ? (i = ws(i, s, 3), n(e, i, t)) : -1
                        }
                    }

                    function es(t) {
                        return function(e, i, s) {
                            return i = ws(i, s, 3), ci(e, i, t, !0)
                        }
                    }

                    function is(t) {
                        return function() {
                            for(var e, i = arguments.length, s = t ? i : -1, n = 0, r = Wn(i); t ? s-- : ++s < i;) {
                                var o = r[n++] = arguments[s];
                                if("function" != typeof o) throw new Kn(U);
                                !e && m.prototype.thru && "wrapper" == _s(o) && (e = new m([], !0))
                            }
                            for(s = e ? -1 : i; ++s < i;) {
                                var o = r[s],
                                    n = _s(o),
                                    a = "wrapper" == n ? Rr(o) : T;
                                e = a && Is(a[0]) && a[1] == (I | M | A | z) && !a[4].length && 1 == a[9] ? e[_s(a[0])].apply(e, a[3]) : 1 == o.length && Is(o) ? e[n]() : e.thru(o)
                            }
                            return function() {
                                var t = arguments,
                                    s = t[0];
                                if(e && 1 == t.length && Mo(s) && s.length >= B) return e.plant(s).value();
                                for(var n = 0, t = i ? r[n].apply(this, t) : s; ++n < i;) t = r[n].call(this, t);
                                return t
                            }
                        }
                    }

                    function ss(t, e) {
                        return function(i, s, n) {
                            return "function" == typeof s && n === T && Mo(i) ? t(i, s) : e(i, Ri(s, n, 3))
                        }
                    }

                    function ns(t) {
                        return function(e, i, s) {
                            return("function" != typeof i || s !== T) && (i = Ri(i, s, 3)), t(e, i, Pn)
                        }
                    }

                    function rs(t) {
                        return function(e, i, s) {
                            return("function" != typeof i || s !== T) && (i = Ri(i, s, 3)), t(e, i)
                        }
                    }

                    function os(t) {
                        return function(e, i, s) {
                            var n = {};
                            return i = ws(i, s, 3), di(e, function(e, s, r) {
                                r = i(e, s, r), s = t ? r : s, e = t ? e : r, n[s] = e
                            }), n
                        }
                    }

                    function as(t) {
                        return function(e, i, s) {
                            return e = a(e), (t ? e : "") + us(e, i, s) + (t ? "" : e)
                        }
                    }

                    function hs(t) {
                        var e = cn(function(i, s) {
                            var n = y(s, e.placeholder);
                            return vs(i, t, T, s, n)
                        });
                        return e
                    }

                    function ls(t, e) {
                        return function(i, s, n, r) {
                            var o = 3 > arguments.length;
                            return "function" == typeof s && r === T && Mo(i) ? t(i, s, n, o) : Pi(i, ws(s, r, 4), n, o, e)
                        }
                    }

                    function cs(t, e, i, s, n, r, o, a, h, l) {
                        function c() {
                            for(var w = arguments.length, _ = w, x = Wn(w); _--;) x[_] = arguments[_];
                            if(s && (x = Ui(x, s, n)), r && (x = Vi(x, r, o)), f || g) {
                                var _ = c.placeholder,
                                    b = y(x, _),
                                    w = w - b.length;
                                if(l > w) {
                                    var k = a ? Ve(a) : T,
                                        w = xr(l - w, 0),
                                        P = f ? b : T,
                                        b = f ? T : b,
                                        M = f ? x : T,
                                        x = f ? T : x;
                                    return e |= f ? A : E, e &= ~(f ? E : A), v || (e &= ~(C | S)), x = [t, e, i, M, P, x, b, k, h, w], k = cs.apply(T, x), Is(t) && Ur(k, x), k.placeholder = _, k
                                }
                            }
                            if(_ = p ? i : this, k = d ? _[t] : t, a)
                                for(w = x.length, P = br(a.length, w), b = Ve(x); P--;) M = a[P], x[P] = Ds(M, w) ? b[M] : T;
                            return u && h < x.length && (x.length = h), this && this !== Ke && this instanceof c && (k = m || Ki(t)), k.apply(_, x)
                        }
                        var u = e & I,
                            p = e & C,
                            d = e & S,
                            f = e & M,
                            v = e & P,
                            g = e & D,
                            m = d ? T : Ki(t);
                        return c
                    }

                    function us(t, e, i) {
                        return t = t.length, e = +e, e > t && wr(e) ? (e -= t, i = null == i ? " " : i + "", En(i, vr(e / i.length)).slice(0, e)) : ""
                    }

                    function ps(t, e, i, s) {
                        function n() {
                            for(var e = -1, a = arguments.length, h = -1, l = s.length, c = Wn(l + a); ++h < l;) c[h] = s[h];
                            for(; a--;) c[h++] = arguments[++e];
                            return(this && this !== Ke && this instanceof n ? o : t).apply(r ? i : this, c)
                        }
                        var r = e & C,
                            o = Ki(t);
                        return n
                    }

                    function ds(t) {
                        var e = Hn[t];
                        return function(t, i) {
                            return(i = i === T ? 0 : +i || 0) ? (i = hr(10, i), e(t * i) / i) : e(t)
                        }
                    }

                    function fs(t) {
                        return function(e, i, s, n) {
                            var r = ws(s);
                            return null == s && r === si ? Fi(e, i, t) : Bi(e, i, r(s, n, 1), t)
                        }
                    }

                    function vs(t, e, i, s, n, r, o, a) {
                        var h = e & S;
                        if(!h && "function" != typeof t) throw new Kn(U);
                        var l = s ? s.length : 0;
                        if(l || (e &= ~(A | E), s = n = T), l -= n ? n.length : 0, e & E) {
                            var c = s,
                                u = n;
                            s = n = T
                        }
                        var p = h ? T : Rr(t);
                        return i = [t, e, i, s, n, c, u, r, o, a], p && (s = i[1], e = p[1], a = s | e, n = e == I && s == M || e == I && s == z && i[7].length <= p[8] || e == (I | z) && s == M, (I > a || n) && (e & C && (i[2] = p[2], a |= s & C ? 0 : P), (s = p[3]) && (n = i[3], i[3] = n ? Ui(n, s, p[4]) : Ve(s), i[4] = n ? y(i[3], V) : Ve(p[4])), (s = p[5]) && (n = i[5], i[5] = n ? Vi(n, s, p[6]) : Ve(s), i[6] = n ? y(i[5], V) : Ve(p[6])), (s = p[7]) && (i[7] = Ve(s)), e & I && (i[8] = null == i[8] ? p[8] : br(i[8], p[8])), null == i[9] && (i[9] = p[9]), i[0] = p[0], i[1] = a), e = i[1], a = i[9]), i[9] = null == a ? h ? 0 : t.length : xr(a - l, 0) || 0, (p ? Br : Ur)(e == C ? Yi(i[0], i[2]) : e != A && e != (C | A) || i[4].length ? cs.apply(T, i) : ps.apply(T, i), i)
                    }

                    function gs(t, e, i, s, n, r, o) {
                        var a = -1,
                            h = t.length,
                            l = e.length;
                        if(h != l && (!n || h >= l)) return !1;
                        for(; ++a < h;) {
                            var c = t[a],
                                l = e[a],
                                u = s ? s(n ? l : c, n ? c : l, a) : T;
                            if(u !== T) {
                                if(u) continue;
                                return !1
                            }
                            if(n) {
                                if(!Je(e, function(t) {
                                        return c === t || i(c, t, s, n, r, o)
                                    })) return !1
                            } else if(c !== l && !i(c, l, s, n, r, o)) return !1
                        }
                        return !0
                    }

                    function ms(t, e, i) {
                        switch(i) {
                            case G:
                            case q:
                                return +t == +e;
                            case Y:
                                return t.name == e.name && t.message == e.message;
                            case K:
                                return t != +t ? e != +e : t == +e;
                            case J:
                            case $:
                                return t == e + ""
                        }
                        return !1
                    }

                    function ys(t, e, i, s, n, r, o) {
                        var a = Ro(t),
                            h = a.length,
                            l = Ro(e).length;
                        if(h != l && !n) return !1;
                        for(l = h; l--;) {
                            var c = a[l];
                            if(!(n ? c in e : tr.call(e, c))) return !1
                        }
                        for(var u = n; ++l < h;) {
                            var c = a[l],
                                p = t[c],
                                d = e[c],
                                f = s ? s(n ? d : p, n ? p : d, c) : T;
                            if(f === T ? !i(p, d, s, n, r, o) : !f) return !1;
                            u || (u = "constructor" == c)
                        }
                        return u || (i = t.constructor, s = e.constructor, !(i != s && "constructor" in t && "constructor" in e) || "function" == typeof i && i instanceof i && "function" == typeof s && s instanceof s) ? !0 : !1
                    }

                    function ws(t, i, s) {
                        var n = e.callback || On,
                            n = n === On ? si : n;
                        return s ? n(t, i, s) : n
                    }

                    function _s(t) {
                        for(var e = t.name + "", i = Ir[e], s = i ? i.length : 0; s--;) {
                            var n = i[s],
                                r = n.func;
                            if(null == r || r == t) return n.name
                        }
                        return e
                    }

                    function xs(t, i, s) {
                        var n = e.indexOf || Gs,
                            n = n === Gs ? r : n;
                        return t ? n(t, i, s) : n
                    }

                    function bs(t) {
                        t = Mn(t);
                        for(var e = t.length; e--;) {
                            var i = t[e][1];
                            t[e][2] = i === i && !gn(i)
                        }
                        return t
                    }

                    function Ts(t, e) {
                        var i = null == t ? T : t[e];
                        return mn(i) ? i : T
                    }

                    function ks(t) {
                        var e = t.length,
                            i = new t.constructor(e);
                        return e && "string" == typeof t[0] && tr.call(t, "index") && (i.index = t.index, i.input = t.input), i
                    }

                    function Cs(t) {
                        return t = t.constructor, "function" == typeof t && t instanceof t || (t = qn), new t
                    }

                    function Ss(t, e, i) {
                        var s = t.constructor;
                        switch(e) {
                            case Q:
                                return Wi(t);
                            case G:
                            case q:
                                return new s(+t);
                            case te:
                            case ee:
                            case ie:
                            case se:
                            case ne:
                            case re:
                            case oe:
                            case ae:
                            case he:
                                return e = t.buffer, new s(i ? Wi(e) : e, t.byteOffset, t.length);
                            case K:
                            case $:
                                return new s(t);
                            case J:
                                var n = new s(t.source, Pe.exec(t));
                                n.lastIndex = t.lastIndex
                        }
                        return n
                    }

                    function Ps(t, e, i) {
                        return null == t || Es(e, t) || (e = Ws(e), t = 1 == e.length ? t : gi(t, Mi(e, 0, -1)), e = qs(e)), e = null == t ? t : t[e], null == e ? T : e.apply(t, i)
                    }

                    function Ms(t) {
                        return null != t && zs(Wr(t))
                    }

                    function Ds(t, e) {
                        return t = "number" == typeof t || Ae.test(t) ? +t : -1, e = null == e ? Ar : e, t > -1 && 0 == t % 1 && e > t
                    }

                    function As(t, e, i) {
                        if(!gn(i)) return !1;
                        var s = typeof e;
                        return("number" == s ? Ms(i) && Ds(e, i.length) : "string" == s && e in i) ? (e = i[e], t === t ? t === e : e !== e) : !1
                    }

                    function Es(t, e) {
                        var i = typeof t;
                        return "string" == i && _e.test(t) || "number" == i ? !0 : Mo(t) ? !1 : !we.test(t) || null != e && t in Rs(e)
                    }

                    function Is(t) {
                        var i = _s(t),
                            s = e[i];
                        return "function" == typeof s && i in Be.prototype ? t === s ? !0 : (i = Rr(s), !!i && t === i[0]) : !1
                    }

                    function zs(t) {
                        return "number" == typeof t && t > -1 && 0 == t % 1 && Ar >= t
                    }

                    function Os(t, e) {
                        return t === T ? e : Do(t, e, Os)
                    }

                    function js(t, e) {
                        t = Rs(t);
                        for(var i = -1, s = e.length, n = {}; ++i < s;) {
                            var r = e[i];
                            r in t && (n[r] = t[r])
                        }
                        return n
                    }

                    function Ls(t, e) {
                        var i = {};
                        return pi(t, function(t, s, n) {
                            e(t, s, n) && (i[s] = t)
                        }), i
                    }

                    function Fs(t) {
                        for(var e = Pn(t), i = e.length, s = i && t.length, n = !!s && zs(s) && (Mo(t) || pn(t)), r = -1, o = []; ++r < i;) {
                            var a = e[r];
                            (n && Ds(a, s) || tr.call(t, a)) && o.push(a)
                        }
                        return o
                    }

                    function Bs(t) {
                        return null == t ? [] : Ms(t) ? gn(t) ? t : qn(t) : Dn(t)
                    }

                    function Rs(t) {
                        return gn(t) ? t : qn(t)
                    }

                    function Ws(t) {
                        if(Mo(t)) return t;
                        var e = [];
                        return a(t).replace(xe, function(t, i, s, n) {
                            e.push(s ? n.replace(Ce, "$1") : i || t)
                        }), e
                    }

                    function Us(t) {
                        return t instanceof Be ? t.clone() : new m(t.__wrapped__, t.__chain__, Ve(t.__actions__))
                    }

                    function Vs(t, e, i) {
                        return t && t.length ? ((i ? As(t, e, i) : null == e) && (e = 1), Mi(t, 0 > e ? 0 : e)) : []
                    }

                    function Ns(t, e, i) {
                        var s = t ? t.length : 0;
                        return s ? ((i ? As(t, e, i) : null == e) && (e = 1), e = s - (+e || 0), Mi(t, 0, 0 > e ? 0 : e)) : []
                    }

                    function Hs(t) {
                        return t ? t[0] : T
                    }

                    function Gs(t, e, i) {
                        var s = t ? t.length : 0;
                        if(!s) return -1;
                        if("number" == typeof i) i = 0 > i ? xr(s + i, 0) : i;
                        else if(i) return i = Fi(t, e), s > i && (e === e ? e === t[i] : t[i] !== t[i]) ? i : -1;
                        return r(t, e, i || 0)
                    }

                    function qs(t) {
                        var e = t ? t.length : 0;
                        return e ? t[e - 1] : T
                    }

                    function Ys(t) {
                        return Vs(t, 1)
                    }

                    function Xs(t, e, i, s) {
                        if(!t || !t.length) return [];
                        null != e && "boolean" != typeof e && (s = i, i = As(t, e, s) ? T : e, e = !1);
                        var n = ws();
                        if((null != i || n !== si) && (i = n(i, s, 3)), e && xs() === r) {
                            e = i;
                            var o;
                            i = -1, s = t.length;
                            for(var n = -1, a = []; ++i < s;) {
                                var h = t[i],
                                    l = e ? e(h, i, t) : h;
                                i && o === l || (o = l, a[++n] = h)
                            }
                            t = a
                        } else t = zi(t, i);
                        return t
                    }

                    function Ks(t) {
                        if(!t || !t.length) return [];
                        var e = -1,
                            i = 0;
                        t = Ge(t, function(t) {
                            return Ms(t) ? (i = xr(t.length, i), !0) : void 0
                        });
                        for(var s = Wn(i); ++e < i;) s[e] = qe(t, Ti(e));
                        return s
                    }

                    function Zs(t, e, i) {
                        return t && t.length ? (t = Ks(t), null == e ? t : (e = Ri(e, i, 4), qe(t, function(t) {
                            return Xe(t, e, T, !0)
                        }))) : []
                    }

                    function Js(t, e) {
                        var i = -1,
                            s = t ? t.length : 0,
                            n = {};
                        for(!s || e || Mo(t[0]) || (e = []); ++i < s;) {
                            var r = t[i];
                            e ? n[r] = e[i] : r && (n[r[0]] = r[1])
                        }
                        return n
                    }

                    function $s(t) {
                        return t = e(t), t.__chain__ = !0, t
                    }

                    function Qs(t, e, i) {
                        return e.call(i, t)
                    }

                    function tn(t, e, i) {
                        var s = Mo(t) ? He : ai;
                        return i && As(t, e, i) && (e = T), ("function" != typeof e || i !== T) && (e = ws(e, i, 3)), s(t, e)
                    }

                    function en(t, e, i) {
                        var s = Mo(t) ? Ge : li;
                        return e = ws(e, i, 3), s(t, e)
                    }

                    function sn(t, e, i, s) {
                        var n = t ? Wr(t) : 0;
                        return zs(n) || (t = Dn(t), n = t.length), i = "number" != typeof i || s && As(e, i, s) ? 0 : 0 > i ? xr(n + i, 0) : i || 0, "string" == typeof t || !Mo(t) && xn(t) ? n >= i && -1 < t.indexOf(e, i) : !!n && -1 < xs(t, e, i)
                    }

                    function nn(t, e, i) {
                        var s = Mo(t) ? qe : wi;
                        return e = ws(e, i, 3), s(t, e)
                    }

                    function rn(t, e, i) {
                        if(i ? As(t, e, i) : null == e) {
                            t = Bs(t);
                            var s = t.length;
                            return s > 0 ? t[Si(0, s - 1)] : T
                        }
                        i = -1, t = kn(t);
                        var s = t.length,
                            n = s - 1;
                        for(e = br(0 > e ? 0 : +e || 0, s); ++i < e;) {
                            var s = Si(i, n),
                                r = t[s];
                            t[s] = t[i], t[i] = r
                        }
                        return t.length = e, t
                    }

                    function on(t, e, i) {
                        var s = Mo(t) ? Je : Di;
                        return i && As(t, e, i) && (e = T), ("function" != typeof e || i !== T) && (e = ws(e, i, 3)), s(t, e)
                    }

                    function an(t, e) {
                        var i;
                        if("function" != typeof e) {
                            if("function" != typeof t) throw new Kn(U);
                            var s = t;
                            t = e, e = s
                        }
                        return function() {
                            return 0 < --t && (i = e.apply(this, arguments)), 1 >= t && (e = T), i
                        }
                    }

                    function hn(t, e, i) {
                        function s(e, i) {
                            i && or(i), h = p = d = T, e && (f = fo(), l = t.apply(u, a), p || h || (a = u = T))
                        }

                        function n() {
                            var t = e - (fo() - c);
                            0 >= t || t > e ? s(d, h) : p = ur(n, t)
                        }

                        function r() {
                            s(g, p)
                        }

                        function o() {
                            if(a = arguments, c = fo(), u = this, d = g && (p || !m), !1 === v) var i = m && !p;
                            else {
                                h || m || (f = c);
                                var s = v - (c - f),
                                    o = 0 >= s || s > v;
                                o ? (h && (h = or(h)), f = c, l = t.apply(u, a)) : h || (h = ur(r, s))
                            }
                            return o && p ? p = or(p) : p || e === v || (p = ur(n, e)), i && (o = !0, l = t.apply(u, a)), !o || p || h || (a = u = T), l
                        }
                        var a, h, l, c, u, p, d, f = 0,
                            v = !1,
                            g = !0;
                        if("function" != typeof t) throw new Kn(U);
                        if(e = 0 > e ? 0 : +e || 0, !0 === i) var m = !0,
                            g = !1;
                        else gn(i) && (m = !!i.leading, v = "maxWait" in i && xr(+i.maxWait || 0, e), g = "trailing" in i ? !!i.trailing : g);
                        return o.cancel = function() {
                            p && or(p), h && or(h), f = 0, h = p = d = T
                        }, o
                    }

                    function ln(t, e) {
                        function i() {
                            var s = arguments,
                                n = e ? e.apply(this, s) : s[0],
                                r = i.cache;
                            return r.has(n) ? r.get(n) : (s = t.apply(this, s), i.cache = r.set(n, s), s)
                        }
                        if("function" != typeof t || e && "function" != typeof e) throw new Kn(U);
                        return i.cache = new ln.Cache, i
                    }

                    function cn(t, e) {
                        if("function" != typeof t) throw new Kn(U);
                        return e = xr(e === T ? t.length - 1 : +e || 0, 0),
                            function() {
                                for(var i = arguments, s = -1, n = xr(i.length - e, 0), r = Wn(n); ++s < n;) r[s] = i[e + s];
                                switch(e) {
                                    case 0:
                                        return t.call(this, r);
                                    case 1:
                                        return t.call(this, i[0], r);
                                    case 2:
                                        return t.call(this, i[0], i[1], r)
                                }
                                for(n = Wn(e + 1), s = -1; ++s < e;) n[s] = i[s];
                                return n[e] = r, t.apply(this, n)
                            }
                    }

                    function un(t, e) {
                        return t > e
                    }

                    function pn(t) {
                        return g(t) && Ms(t) && tr.call(t, "callee") && !lr.call(t, "callee")
                    }

                    function dn(t, e, i, s) {
                        return s = (i = "function" == typeof i ? Ri(i, s, 3) : T) ? i(t, e) : T, s === T ? mi(t, e, i) : !!s
                    }

                    function fn(t) {
                        return g(t) && "string" == typeof t.message && ir.call(t) == Y
                    }

                    function vn(t) {
                        return gn(t) && ir.call(t) == X
                    }

                    function gn(t) {
                        var e = typeof t;
                        return !!t && ("object" == e || "function" == e)
                    }

                    function mn(t) {
                        return null == t ? !1 : vn(t) ? nr.test(Qn.call(t)) : g(t) && De.test(t)
                    }

                    function yn(t) {
                        return "number" == typeof t || g(t) && ir.call(t) == K
                    }

                    function wn(t) {
                        var e;
                        if(!g(t) || ir.call(t) != Z || pn(t) || !(tr.call(t, "constructor") || (e = t.constructor, "function" != typeof e || e instanceof e))) return !1;
                        var i;
                        return pi(t, function(t, e) {
                            i = e
                        }), i === T || tr.call(t, i)
                    }

                    function _n(t) {
                        return gn(t) && ir.call(t) == J
                    }

                    function xn(t) {
                        return "string" == typeof t || g(t) && ir.call(t) == $
                    }

                    function bn(t) {
                        return g(t) && zs(t.length) && !!Le[ir.call(t)]
                    }

                    function Tn(t, e) {
                        return e > t
                    }

                    function kn(t) {
                        var e = t ? Wr(t) : 0;
                        return zs(e) ? e ? Ve(t) : [] : Dn(t)
                    }

                    function Cn(t) {
                        return ii(t, Pn(t))
                    }

                    function Sn(t) {
                        return vi(t, Pn(t))
                    }

                    function Pn(t) {
                        if(null == t) return [];
                        gn(t) || (t = qn(t));
                        for(var e = t.length, e = e && zs(e) && (Mo(t) || pn(t)) && e || 0, i = t.constructor, s = -1, i = "function" == typeof i && i.prototype === t, n = Wn(e), r = e > 0; ++s < e;) n[s] = s + "";
                        for(var o in t) r && Ds(o, e) || "constructor" == o && (i || !tr.call(t, o)) || n.push(o);
                        return n
                    }

                    function Mn(t) {
                        t = Rs(t);
                        for(var e = -1, i = Ro(t), s = i.length, n = Wn(s); ++e < s;) {
                            var r = i[e];
                            n[e] = [r, t[r]]
                        }
                        return n
                    }

                    function Dn(t) {
                        return Oi(t, Ro(t))
                    }

                    function An(t) {
                        return(t = a(t)) && t.replace(Ee, u).replace(ke, "")
                    }

                    function En(t, e) {
                        var i = "";
                        if(t = a(t), e = +e, 1 > e || !t || !wr(e)) return i;
                        do e % 2 && (i += t), e = mr(e / 2), t += t; while (e);
                        return i
                    }

                    function In(t, e, i) {
                        var s = t;
                        return(t = a(t)) ? (i ? As(s, e, i) : null == e) ? t.slice(w(t), _(t) + 1) : (e += "", t.slice(h(t, e), l(t, e) + 1)) : t
                    }

                    function zn(t, e, i) {
                        return i && As(t, e, i) && (e = T), t = a(t), t.match(e || Oe) || []
                    }

                    function On(t, e, i) {
                        return i && As(t, e, i) && (e = T), g(t) ? Ln(t) : si(t, e)
                    }

                    function jn(t) {
                        return t
                    }

                    function Ln(t) {
                        return _i(ni(t, !0))
                    }

                    function Fn(t, e, i) {
                        if(null == i) {
                            var s = gn(e),
                                n = s ? Ro(e) : T;
                            ((n = n && n.length ? vi(e, n) : T) ? n.length : s) || (n = !1, i = e, e = t, t = this)
                        }
                        n || (n = vi(e, Ro(e)));
                        var r = !0,
                            s = -1,
                            o = vn(t),
                            a = n.length;
                        !1 === i ? r = !1 : gn(i) && "chain" in i && (r = i.chain);
                        for(; ++s < a;) {
                            i = n[s];
                            var h = e[i];
                            t[i] = h, o && (t.prototype[i] = function(e) {
                                return function() {
                                    var i = this.__chain__;
                                    if(r || i) {
                                        var s = t(this.__wrapped__);
                                        return(s.__actions__ = Ve(this.__actions__)).push({
                                            func: e,
                                            args: arguments,
                                            thisArg: t
                                        }), s.__chain__ = i, s
                                    }
                                    return e.apply(t, Ye([this.value()], arguments))
                                }
                            }(h))
                        }
                        return t
                    }

                    function Bn() {}

                    function Rn(t) {
                        return Es(t) ? Ti(t) : ki(t)
                    }
                    t = t ? Ze.defaults(Ke.Object(), t, Ze.pick(Ke, je)) : Ke;
                    var Wn = t.Array,
                        Un = t.Date,
                        Vn = t.Error,
                        Nn = t.Function,
                        Hn = t.Math,
                        Gn = t.Number,
                        qn = t.Object,
                        Yn = t.RegExp,
                        Xn = t.String,
                        Kn = t.TypeError,
                        Zn = Wn.prototype,
                        Jn = qn.prototype,
                        $n = Xn.prototype,
                        Qn = Nn.prototype.toString,
                        tr = Jn.hasOwnProperty,
                        er = 0,
                        ir = Jn.toString,
                        sr = Ke._,
                        nr = Yn("^" + Qn.call(tr).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        rr = t.ArrayBuffer,
                        or = t.clearTimeout,
                        ar = t.parseFloat,
                        hr = Hn.pow,
                        lr = Jn.propertyIsEnumerable,
                        cr = Ts(t, "Set"),
                        ur = t.setTimeout,
                        pr = Zn.splice,
                        dr = t.Uint8Array,
                        fr = Ts(t, "WeakMap"),
                        vr = Hn.ceil,
                        gr = Ts(qn, "create"),
                        mr = Hn.floor,
                        yr = Ts(Wn, "isArray"),
                        wr = t.isFinite,
                        _r = Ts(qn, "keys"),
                        xr = Hn.max,
                        br = Hn.min,
                        Tr = Ts(Un, "now"),
                        kr = t.parseInt,
                        Cr = Hn.random,
                        Sr = Gn.NEGATIVE_INFINITY,
                        Pr = Gn.POSITIVE_INFINITY,
                        Mr = 4294967294,
                        Dr = 2147483647,
                        Ar = 9007199254740991,
                        Er = fr && new fr,
                        Ir = {};
                    e.support = {}, e.templateSettings = {
                        escape: ge,
                        evaluate: me,
                        interpolate: ye,
                        variable: "",
                        imports: {
                            _: e
                        }
                    };
                    var zr = function() {
                            function t() {}
                            return function(e) {
                                if(gn(e)) {
                                    t.prototype = e;
                                    var i = new t;
                                    t.prototype = T
                                }
                                return i || {}
                            }
                        }(),
                        Or = Gi(di),
                        jr = Gi(fi, !0),
                        Lr = qi(),
                        Fr = qi(!0),
                        Br = Er ? function(t, e) {
                            return Er.set(t, e), t
                        } : jn,
                        Rr = Er ? function(t) {
                            return Er.get(t)
                        } : Bn,
                        Wr = Ti("length"),
                        Ur = function() {
                            var t = 0,
                                e = 0;
                            return function(i, s) {
                                var n = fo(),
                                    r = F - (n - e);
                                if(e = n, r > 0) {
                                    if(++t >= L) return i
                                } else t = 0;
                                return Br(i, s)
                            }
                        }(),
                        Vr = cn(function(t, e) {
                            return g(t) && Ms(t) ? oi(t, ui(e, !1, !0)) : []
                        }),
                        Nr = ts(),
                        Hr = ts(!0),
                        Gr = cn(function(t) {
                            for(var e = t.length, i = e, s = Wn(c), n = xs(), o = n === r, a = []; i--;) {
                                var h = t[i] = Ms(h = t[i]) ? h : [];
                                s[i] = o && 120 <= h.length && gr && cr ? new We(i && h) : null
                            }
                            var o = t[0],
                                l = -1,
                                c = o ? o.length : 0,
                                u = s[0];
                            t: for(; ++l < c;)
                                if(h = o[l], 0 > (u ? Ue(u, h) : n(a, h, 0))) {
                                    for(i = e; --i;) {
                                        var p = s[i];
                                        if(0 > (p ? Ue(p, h) : n(t[i], h, 0))) continue t
                                    }
                                    u && u.push(h), a.push(h)
                                }
                            return a
                        }),
                        qr = cn(function(t, e) {
                            e = ui(e);
                            var i = ei(t, e);
                            return Ci(t, e.sort(s)), i
                        }),
                        Yr = fs(),
                        Xr = fs(!0),
                        Kr = cn(function(t) {
                            return zi(ui(t, !1, !0))
                        }),
                        Zr = cn(function(t, e) {
                            return Ms(t) ? oi(t, e) : []
                        }),
                        Jr = cn(Ks),
                        $r = cn(function(t) {
                            var e = t.length,
                                i = e > 2 ? t[e - 2] : T,
                                s = e > 1 ? t[e - 1] : T;
                            return e > 2 && "function" == typeof i ? e -= 2 : (i = e > 1 && "function" == typeof s ? (--e, s) : T, s = T), t.length = e, Zs(t, i, s)
                        }),
                        Qr = cn(function(t) {
                            return t = ui(t), this.thru(function(e) {
                                e = Mo(e) ? e : [Rs(e)];
                                for(var i = t, s = -1, n = e.length, r = -1, o = i.length, a = Wn(n + o); ++s < n;) a[s] = e[s];
                                for(; ++r < o;) a[s++] = i[r];
                                return a
                            })
                        }),
                        to = cn(function(t, e) {
                            return ei(t, ui(e))
                        }),
                        eo = Ni(function(t, e, i) {
                            tr.call(t, i) ? ++t[i] : t[i] = 1
                        }),
                        io = Qi(Or),
                        so = Qi(jr, !0),
                        no = ss(Ne, Or),
                        ro = ss(function(t, e) {
                            for(var i = t.length; i-- && !1 !== e(t[i], i, t););
                            return t
                        }, jr),
                        oo = Ni(function(t, e, i) {
                            tr.call(t, i) ? t[i].push(e) : t[i] = [e]
                        }),
                        ao = Ni(function(t, e, i) {
                            t[i] = e
                        }),
                        ho = cn(function(t, e, i) {
                            var s = -1,
                                n = "function" == typeof e,
                                r = Es(e),
                                o = Ms(t) ? Wn(t.length) : [];
                            return Or(t, function(t) {
                                var a = n ? e : r && null != t ? t[e] : T;
                                o[++s] = a ? a.apply(t, i) : Ps(t, e, i)
                            }), o
                        }),
                        lo = Ni(function(t, e, i) {
                            t[i ? 0 : 1].push(e)
                        }, function() {
                            return [
                                [],
                                []
                            ]
                        }),
                        co = ls(Xe, Or),
                        uo = ls(function(t, e, i, s) {
                            var n = t.length;
                            for(s && n && (i = t[--n]); n--;) i = e(i, t[n], n, t);
                            return i
                        }, jr),
                        po = cn(function(t, e) {
                            if(null == t) return [];
                            var i = e[2];
                            return i && As(e[0], e[1], i) && (e.length = 1), Ei(t, ui(e), [])
                        }),
                        fo = Tr || function() {
                            return(new Un).getTime()
                        },
                        vo = cn(function(t, e, i) {
                            var s = C;
                            if(i.length) var n = y(i, vo.placeholder),
                                s = s | A;
                            return vs(t, s, e, i, n)
                        }),
                        go = cn(function(t, e) {
                            e = e.length ? ui(e) : Sn(t);
                            for(var i = -1, s = e.length; ++i < s;) {
                                var n = e[i];
                                t[n] = vs(t[n], C, t)
                            }
                            return t
                        }),
                        mo = cn(function(t, e, i) {
                            var s = C | S;
                            if(i.length) var n = y(i, mo.placeholder),
                                s = s | A;
                            return vs(e, s, t, i, n)
                        }),
                        yo = Zi(M),
                        wo = Zi(D),
                        _o = cn(function(t, e) {
                            return ri(t, 1, e)
                        }),
                        xo = cn(function(t, e, i) {
                            return ri(t, e, i)
                        }),
                        bo = is(),
                        To = is(!0),
                        ko = cn(function(t, e) {
                            if(e = ui(e), "function" != typeof t || !He(e, o)) throw new Kn(U);
                            var i = e.length;
                            return cn(function(s) {
                                for(var n = br(s.length, i); n--;) s[n] = e[n](s[n]);
                                return t.apply(this, s)
                            })
                        }),
                        Co = hs(A),
                        So = hs(E),
                        Po = cn(function(t, e) {
                            return vs(t, z, T, T, T, ui(e))
                        }),
                        Mo = yr || function(t) {
                            return g(t) && zs(t.length) && ir.call(t) == H
                        },
                        Do = Hi(bi),
                        Ao = Hi(function(t, e, i) {
                            return i ? Qe(t, e, i) : ti(t, e)
                        }),
                        Eo = Ji(Ao, function(t, e) {
                            return t === T ? e : t
                        }),
                        Io = Ji(Do, Os),
                        zo = es(di),
                        Oo = es(fi),
                        jo = ns(Lr),
                        Lo = ns(Fr),
                        Fo = rs(di),
                        Bo = rs(fi),
                        Ro = _r ? function(t) {
                            var e = null == t ? T : t.constructor;
                            return "function" == typeof e && e.prototype === t || "function" != typeof t && Ms(t) ? Fs(t) : gn(t) ? _r(t) : []
                        } : Fs,
                        Wo = os(!0),
                        Uo = os(),
                        Vo = cn(function(t, e) {
                            if(null == t) return {};
                            if("function" != typeof e[0]) return e = qe(ui(e), Xn), js(t, oi(Pn(t), e));
                            var i = Ri(e[0], e[1], 3);
                            return Ls(t, function(t, e, s) {
                                return !i(t, e, s)
                            })
                        }),
                        No = cn(function(t, e) {
                            return null == t ? {} : "function" == typeof e[0] ? Ls(t, Ri(e[0], e[1], 3)) : js(t, ui(e))
                        }),
                        Ho = Xi(function(t, e, i) {
                            return e = e.toLowerCase(), t + (i ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                        }),
                        Go = Xi(function(t, e, i) {
                            return t + (i ? "-" : "") + e.toLowerCase()
                        }),
                        qo = as(),
                        Yo = as(!0),
                        Xo = Xi(function(t, e, i) {
                            return t + (i ? "_" : "") + e.toLowerCase()
                        }),
                        Ko = Xi(function(t, e, i) {
                            return t + (i ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1))
                        }),
                        Zo = cn(function(t, e) {
                            try {
                                return t.apply(T, e)
                            } catch(i) {
                                return fn(i) ? i : new Vn(i)
                            }
                        }),
                        Jo = cn(function(t, e) {
                            return function(i) {
                                return Ps(i, t, e)
                            }
                        }),
                        $o = cn(function(t, e) {
                            return function(i) {
                                return Ps(t, i, e)
                            }
                        }),
                        Qo = ds("ceil"),
                        ta = ds("floor"),
                        ea = $i(un, Sr),
                        ia = $i(Tn, Pr),
                        sa = ds("round");
                    return e.prototype = i.prototype, m.prototype = zr(i.prototype), m.prototype.constructor = m, Be.prototype = zr(i.prototype), Be.prototype.constructor = Be, Re.prototype["delete"] = function(t) {
                        return this.has(t) && delete this.__data__[t]
                    }, Re.prototype.get = function(t) {
                        return "__proto__" == t ? T : this.__data__[t]
                    }, Re.prototype.has = function(t) {
                        return "__proto__" != t && tr.call(this.__data__, t)
                    }, Re.prototype.set = function(t, e) {
                        return "__proto__" != t && (this.__data__[t] = e), this
                    }, We.prototype.push = function(t) {
                        var e = this.data;
                        "string" == typeof t || gn(t) ? e.set.add(t) : e.hash[t] = !0
                    }, ln.Cache = Re, e.after = function(t, e) {
                        if("function" != typeof e) {
                            if("function" != typeof t) throw new Kn(U);
                            var i = t;
                            t = e, e = i
                        }
                        return t = wr(t = +t) ? t : 0,
                            function() {
                                return 1 > --t ? e.apply(this, arguments) : void 0
                            }
                    }, e.ary = function(t, e, i) {
                        return i && As(t, e, i) && (e = T), e = t && null == e ? t.length : xr(+e || 0, 0), vs(t, I, T, T, T, T, e)
                    }, e.assign = Ao, e.at = to, e.before = an, e.bind = vo, e.bindAll = go, e.bindKey = mo, e.callback = On, e.chain = $s, e.chunk = function(t, e, i) {
                        e = (i ? As(t, e, i) : null == e) ? 1 : xr(mr(e) || 1, 1), i = 0;
                        for(var s = t ? t.length : 0, n = -1, r = Wn(vr(s / e)); s > i;) r[++n] = Mi(t, i, i += e);
                        return r
                    }, e.compact = function(t) {
                        for(var e = -1, i = t ? t.length : 0, s = -1, n = []; ++e < i;) {
                            var r = t[e];
                            r && (n[++s] = r)
                        }
                        return n
                    }, e.constant = function(t) {
                        return function() {
                            return t
                        }
                    }, e.countBy = eo, e.create = function(t, e, i) {
                        var s = zr(t);
                        return i && As(t, e, i) && (e = T), e ? ti(s, e) : s
                    }, e.curry = yo, e.curryRight = wo, e.debounce = hn, e.defaults = Eo, e.defaultsDeep = Io, e.defer = _o, e.delay = xo, e.difference = Vr, e.drop = Vs, e.dropRight = Ns, e.dropRightWhile = function(t, e, i) {
                        return t && t.length ? ji(t, ws(e, i, 3), !0, !0) : []
                    }, e.dropWhile = function(t, e, i) {
                        return t && t.length ? ji(t, ws(e, i, 3), !0) : []
                    }, e.fill = function(t, e, i, s) {
                        var n = t ? t.length : 0;
                        if(!n) return [];
                        for(i && "number" != typeof i && As(t, e, i) && (i = 0, s = n), n = t.length, i = null == i ? 0 : +i || 0, 0 > i && (i = -i > n ? 0 : n + i), s = s === T || s > n ? n : +s || 0, 0 > s && (s += n), n = i > s ? 0 : s >>> 0, i >>>= 0; n > i;) t[i++] = e;
                        return t
                    }, e.filter = en, e.flatten = function(t, e, i) {
                        var s = t ? t.length : 0;
                        return i && As(t, e, i) && (e = !1), s ? ui(t, e) : []
                    }, e.flattenDeep = function(t) {
                        return t && t.length ? ui(t, !0) : []
                    }, e.flow = bo, e.flowRight = To, e.forEach = no, e.forEachRight = ro, e.forIn = jo, e.forInRight = Lo, e.forOwn = Fo, e.forOwnRight = Bo, e.functions = Sn, e.groupBy = oo, e.indexBy = ao, e.initial = function(t) {
                        return Ns(t, 1)
                    }, e.intersection = Gr, e.invert = function(t, e, i) {
                        i && As(t, e, i) && (e = T), i = -1;
                        for(var s = Ro(t), n = s.length, r = {}; ++i < n;) {
                            var o = s[i],
                                a = t[o];
                            e ? tr.call(r, a) ? r[a].push(o) : r[a] = [o] : r[a] = o
                        }
                        return r
                    }, e.invoke = ho, e.keys = Ro, e.keysIn = Pn, e.map = nn, e.mapKeys = Wo, e.mapValues = Uo, e.matches = Ln, e.matchesProperty = function(t, e) {
                        return xi(t, ni(e, !0))
                    }, e.memoize = ln, e.merge = Do, e.method = Jo, e.methodOf = $o, e.mixin = Fn, e.modArgs = ko, e.negate = function(t) {
                        if("function" != typeof t) throw new Kn(U);
                        return function() {
                            return !t.apply(this, arguments)
                        }
                    }, e.omit = Vo, e.once = function(t) {
                        return an(2, t)
                    }, e.pairs = Mn, e.partial = Co, e.partialRight = So, e.partition = lo, e.pick = No, e.pluck = function(t, e) {
                        return nn(t, Rn(e))
                    }, e.property = Rn, e.propertyOf = function(t) {
                        return function(e) {
                            return gi(t, Ws(e), e + "")
                        }
                    }, e.pull = function() {
                        var t = arguments,
                            e = t[0];
                        if(!e || !e.length) return e;
                        for(var i = 0, s = xs(), n = t.length; ++i < n;)
                            for(var r = 0, o = t[i]; - 1 < (r = s(e, o, r));) pr.call(e, r, 1);
                        return e
                    }, e.pullAt = qr, e.range = function(t, e, i) {
                        i && As(t, e, i) && (e = i = T), t = +t || 0, i = null == i ? 1 : +i || 0, null == e ? (e = t, t = 0) : e = +e || 0;
                        var s = -1;
                        e = xr(vr((e - t) / (i || 1)), 0);
                        for(var n = Wn(e); ++s < e;) n[s] = t, t += i;
                        return n
                    }, e.rearg = Po, e.reject = function(t, e, i) {
                        var s = Mo(t) ? Ge : li;
                        return e = ws(e, i, 3), s(t, function(t, i, s) {
                            return !e(t, i, s)
                        })
                    }, e.remove = function(t, e, i) {
                        var s = [];
                        if(!t || !t.length) return s;
                        var n = -1,
                            r = [],
                            o = t.length;
                        for(e = ws(e, i, 3); ++n < o;) i = t[n], e(i, n, t) && (s.push(i), r.push(n));
                        return Ci(t, r), s
                    }, e.rest = Ys, e.restParam = cn, e.set = function(t, e, i) {
                        if(null == t) return t;
                        var s = e + "";
                        e = null != t[s] || Es(e, t) ? [s] : Ws(e);
                        for(var s = -1, n = e.length, r = n - 1, o = t; null != o && ++s < n;) {
                            var a = e[s];
                            gn(o) && (s == r ? o[a] = i : null == o[a] && (o[a] = Ds(e[s + 1]) ? [] : {})), o = o[a]
                        }
                        return t
                    }, e.shuffle = function(t) {
                        return rn(t, Pr)
                    }, e.slice = function(t, e, i) {
                        var s = t ? t.length : 0;
                        return s ? (i && "number" != typeof i && As(t, e, i) && (e = 0, i = s), Mi(t, e, i)) : []
                    }, e.sortBy = function(t, e, i) {
                        if(null == t) return [];
                        i && As(t, e, i) && (e = T);
                        var s = -1;
                        return e = ws(e, i, 3), t = wi(t, function(t, i, n) {
                            return {
                                a: e(t, i, n),
                                b: ++s,
                                c: t
                            }
                        }), Ai(t, c)
                    }, e.sortByAll = po, e.sortByOrder = function(t, e, i, s) {
                        return null == t ? [] : (s && As(e, i, s) && (i = T), Mo(e) || (e = null == e ? [] : [e]), Mo(i) || (i = null == i ? [] : [i]), Ei(t, e, i))
                    }, e.spread = function(t) {
                        if("function" != typeof t) throw new Kn(U);
                        return function(e) {
                            return t.apply(this, e)
                        }
                    }, e.take = function(t, e, i) {
                        return t && t.length ? ((i ? As(t, e, i) : null == e) && (e = 1), Mi(t, 0, 0 > e ? 0 : e)) : []
                    }, e.takeRight = function(t, e, i) {
                        var s = t ? t.length : 0;
                        return s ? ((i ? As(t, e, i) : null == e) && (e = 1), e = s - (+e || 0), Mi(t, 0 > e ? 0 : e)) : []
                    }, e.takeRightWhile = function(t, e, i) {
                        return t && t.length ? ji(t, ws(e, i, 3), !1, !0) : []
                    }, e.takeWhile = function(t, e, i) {
                        return t && t.length ? ji(t, ws(e, i, 3)) : []
                    }, e.tap = function(t, e, i) {
                        return e.call(i, t), t
                    }, e.throttle = function(t, e, i) {
                        var s = !0,
                            n = !0;
                        if("function" != typeof t) throw new Kn(U);
                        return !1 === i ? s = !1 : gn(i) && (s = "leading" in i ? !!i.leading : s, n = "trailing" in i ? !!i.trailing : n), hn(t, e, {
                            leading: s,
                            maxWait: +e,
                            trailing: n
                        })
                    }, e.thru = Qs, e.times = function(t, e, i) {
                        if(t = mr(t), 1 > t || !wr(t)) return [];
                        var s = -1,
                            n = Wn(br(t, 4294967295));
                        for(e = Ri(e, i, 1); ++s < t;) 4294967295 > s ? n[s] = e(s) : e(s);
                        return n
                    }, e.toArray = kn, e.toPlainObject = Cn, e.transform = function(t, e, i, s) {
                        var n = Mo(t) || bn(t);
                        return e = ws(e, s, 4), null == i && (n || gn(t) ? (s = t.constructor, i = n ? Mo(t) ? new s : [] : zr(vn(s) ? s.prototype : T)) : i = {}), (n ? Ne : di)(t, function(t, s, n) {
                            return e(i, t, s, n)
                        }), i
                    }, e.union = Kr, e.uniq = Xs, e.unzip = Ks, e.unzipWith = Zs, e.values = Dn, e.valuesIn = function(t) {
                        return Oi(t, Pn(t))
                    }, e.where = function(t, e) {
                        return en(t, _i(e))
                    }, e.without = Zr, e.wrap = function(t, e) {
                        return e = null == e ? jn : e, vs(e, A, T, [t], [])
                    }, e.xor = function() {
                        for(var t = -1, e = arguments.length; ++t < e;) {
                            var i = arguments[t];
                            if(Ms(i)) var s = s ? Ye(oi(s, i), oi(i, s)) : i
                        }
                        return s ? zi(s) : []
                    }, e.zip = Jr, e.zipObject = Js, e.zipWith = $r, e.backflow = To, e.collect = nn, e.compose = To, e.each = no, e.eachRight = ro, e.extend = Ao, e.iteratee = On, e.methods = Sn, e.object = Js, e.select = en, e.tail = Ys, e.unique = Xs, Fn(e, e), e.add = function(t, e) {
                        return(+t || 0) + (+e || 0)
                    }, e.attempt = Zo, e.camelCase = Ho, e.capitalize = function(t) {
                        return(t = a(t)) && t.charAt(0).toUpperCase() + t.slice(1)
                    }, e.ceil = Qo, e.clone = function(t, e, i, s) {
                        return e && "boolean" != typeof e && As(t, e, i) ? e = !1 : "function" == typeof e && (s = i, i = e, e = !1), "function" == typeof i ? ni(t, e, Ri(i, s, 3)) : ni(t, e)
                    }, e.cloneDeep = function(t, e, i) {
                        return "function" == typeof e ? ni(t, !0, Ri(e, i, 3)) : ni(t, !0)
                    }, e.deburr = An, e.endsWith = function(t, e, i) {
                        t = a(t), e += "";
                        var s = t.length;
                        return i = i === T ? s : br(0 > i ? 0 : +i || 0, s), i -= e.length, i >= 0 && t.indexOf(e, i) == i
                    }, e.escape = function(t) {
                        return(t = a(t)) && ve.test(t) ? t.replace(de, p) : t
                    }, e.escapeRegExp = function(t) {
                        return(t = a(t)) && Te.test(t) ? t.replace(be, d) : t || "(?:)"
                    }, e.every = tn, e.find = io, e.findIndex = Nr, e.findKey = zo, e.findLast = so, e.findLastIndex = Hr, e.findLastKey = Oo, e.findWhere = function(t, e) {
                        return io(t, _i(e))
                    }, e.first = Hs, e.floor = ta, e.get = function(t, e, i) {
                        return t = null == t ? T : gi(t, Ws(e), e + ""), t === T ? i : t
                    }, e.gt = un, e.gte = function(t, e) {
                        return t >= e
                    }, e.has = function(t, e) {
                        if(null == t) return !1;
                        var i = tr.call(t, e);
                        if(!i && !Es(e)) {
                            if(e = Ws(e), t = 1 == e.length ? t : gi(t, Mi(e, 0, -1)), null == t) return !1;
                            e = qs(e), i = tr.call(t, e)
                        }
                        return i || zs(t.length) && Ds(e, t.length) && (Mo(t) || pn(t))
                    }, e.identity = jn, e.includes = sn, e.indexOf = Gs, e.inRange = function(t, e, i) {
                        return e = +e || 0, i === T ? (i = e, e = 0) : i = +i || 0, t >= br(e, i) && t < xr(e, i)
                    }, e.isArguments = pn, e.isArray = Mo, e.isBoolean = function(t) {
                        return !0 === t || !1 === t || g(t) && ir.call(t) == G
                    }, e.isDate = function(t) {
                        return g(t) && ir.call(t) == q
                    }, e.isElement = function(t) {
                        return !!t && 1 === t.nodeType && g(t) && !wn(t)
                    }, e.isEmpty = function(t) {
                        return null == t ? !0 : Ms(t) && (Mo(t) || xn(t) || pn(t) || g(t) && vn(t.splice)) ? !t.length : !Ro(t).length
                    }, e.isEqual = dn, e.isError = fn, e.isFinite = function(t) {
                        return "number" == typeof t && wr(t)
                    }, e.isFunction = vn, e.isMatch = function(t, e, i, s) {
                        return i = "function" == typeof i ? Ri(i, s, 3) : T, yi(t, bs(e), i)
                    }, e.isNaN = function(t) {
                        return yn(t) && t != +t
                    }, e.isNative = mn, e.isNull = function(t) {
                        return null === t
                    }, e.isNumber = yn, e.isObject = gn, e.isPlainObject = wn, e.isRegExp = _n, e.isString = xn, e.isTypedArray = bn, e.isUndefined = function(t) {
                        return t === T
                    }, e.kebabCase = Go, e.last = qs, e.lastIndexOf = function(t, e, i) {
                        var s = t ? t.length : 0;
                        if(!s) return -1;
                        var n = s;
                        if("number" == typeof i) n = (0 > i ? xr(s + i, 0) : br(i || 0, s - 1)) + 1;
                        else if(i) return n = Fi(t, e, !0) - 1, t = t[n], (e === e ? e === t : t !== t) ? n : -1;
                        if(e !== e) return v(t, n, !0);
                        for(; n--;)
                            if(t[n] === e) return n;
                        return -1
                    }, e.lt = Tn, e.lte = function(t, e) {
                        return e >= t
                    }, e.max = ea, e.min = ia, e.noConflict = function() {
                        return Ke._ = sr, this
                    }, e.noop = Bn, e.now = fo, e.pad = function(t, e, i) {
                        t = a(t), e = +e;
                        var s = t.length;
                        return e > s && wr(e) ? (s = (e - s) / 2, e = mr(s), s = vr(s), i = us("", s, i), i.slice(0, e) + t + i) : t
                    }, e.padLeft = qo, e.padRight = Yo, e.parseInt = function(t, e, i) {
                        return(i ? As(t, e, i) : null == e) ? e = 0 : e && (e = +e), t = In(t), kr(t, e || (Me.test(t) ? 16 : 10))
                    }, e.random = function(t, e, i) {
                        i && As(t, e, i) && (e = i = T);
                        var s = null == t,
                            n = null == e;
                        return null == i && (n && "boolean" == typeof t ? (i = t, t = 1) : "boolean" == typeof e && (i = e, n = !0)), s && n && (e = 1, n = !1), t = +t || 0, n ? (e = t, t = 0) : e = +e || 0, i || t % 1 || e % 1 ? (i = Cr(), br(t + i * (e - t + ar("1e-" + ((i + "").length - 1))), e)) : Si(t, e)
                    }, e.reduce = co, e.reduceRight = uo, e.repeat = En, e.result = function(t, e, i) {
                        var s = null == t ? T : t[e];
                        return s === T && (null == t || Es(e, t) || (e = Ws(e), t = 1 == e.length ? t : gi(t, Mi(e, 0, -1)), s = null == t ? T : t[qs(e)]), s = s === T ? i : s), vn(s) ? s.call(t) : s
                    }, e.round = sa, e.runInContext = b, e.size = function(t) {
                        var e = t ? Wr(t) : 0;
                        return zs(e) ? e : Ro(t).length
                    }, e.snakeCase = Xo, e.some = on, e.sortedIndex = Yr, e.sortedLastIndex = Xr, e.startCase = Ko, e.startsWith = function(t, e, i) {
                        return t = a(t), i = null == i ? 0 : br(0 > i ? 0 : +i || 0, t.length), t.lastIndexOf(e, i) == i
                    }, e.sum = function(t, e, i) {
                        if(i && As(t, e, i) && (e = T), e = ws(e, i, 3), 1 == e.length) {
                            t = Mo(t) ? t : Bs(t), i = t.length;
                            for(var s = 0; i--;) s += +e(t[i]) || 0;
                            t = s
                        } else t = Ii(t, e);
                        return t
                    }, e.template = function(t, i, s) {
                        var n = e.templateSettings;
                        s && As(t, i, s) && (i = s = T), t = a(t), i = Qe(ti({}, s || i), n, $e), s = Qe(ti({}, i.imports), n.imports, $e);
                        var r, o, h = Ro(s),
                            l = Oi(s, h),
                            c = 0;
                        s = i.interpolate || Ie;
                        var u = "__p+='";
                        s = Yn((i.escape || Ie).source + "|" + s.source + "|" + (s === ye ? Se : Ie).source + "|" + (i.evaluate || Ie).source + "|$", "g");
                        var p = "sourceURL" in i ? "//# sourceURL=" + i.sourceURL + "\n" : "";
                        if(t.replace(s, function(e, i, s, n, a, h) {
                                return s || (s = n), u += t.slice(c, h).replace(ze, f), i && (r = !0, u += "'+__e(" + i + ")+'"), a && (o = !0, u += "';" + a + ";\n__p+='"), s && (u += "'+((__t=(" + s + "))==null?'':__t)+'"), c = h + e.length, e
                            }), u += "';", (i = i.variable) || (u = "with(obj){" + u + "}"), u = (o ? u.replace(le, "") : u).replace(ce, "$1").replace(ue, "$1;"), u = "function(" + (i || "obj") + "){" + (i ? "" : "obj||(obj={});") + "var __t,__p=''" + (r ? ",__e=_.escape" : "") + (o ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + u + "return __p}", i = Zo(function() {
                                return Nn(h, p + "return " + u).apply(T, l)
                            }), i.source = u, fn(i)) throw i;
                        return i
                    }, e.trim = In, e.trimLeft = function(t, e, i) {
                        var s = t;
                        return(t = a(t)) ? t.slice((i ? As(s, e, i) : null == e) ? w(t) : h(t, e + "")) : t
                    }, e.trimRight = function(t, e, i) {
                        var s = t;
                        return(t = a(t)) ? (i ? As(s, e, i) : null == e) ? t.slice(0, _(t) + 1) : t.slice(0, l(t, e + "") + 1) : t
                    }, e.trunc = function(t, e, i) {
                        i && As(t, e, i) && (e = T);
                        var s = O;
                        if(i = j, null != e)
                            if(gn(e)) {
                                var n = "separator" in e ? e.separator : n,
                                    s = "length" in e ? +e.length || 0 : s;
                                i = "omission" in e ? a(e.omission) : i
                            } else s = +e || 0;
                        if(t = a(t), s >= t.length) return t;
                        if(s -= i.length, 1 > s) return i;
                        if(e = t.slice(0, s), null == n) return e + i;
                        if(_n(n)) {
                            if(t.slice(s).search(n)) {
                                var r, o = t.slice(0, s);
                                for(n.global || (n = Yn(n.source, (Pe.exec(n) || "") + "g")), n.lastIndex = 0; t = n.exec(o);) r = t.index;
                                e = e.slice(0, null == r ? s : r)
                            }
                        } else t.indexOf(n, s) != s && (n = e.lastIndexOf(n), n > -1 && (e = e.slice(0, n)));
                        return e + i
                    }, e.unescape = function(t) {
                        return(t = a(t)) && fe.test(t) ? t.replace(pe, x) : t
                    }, e.uniqueId = function(t) {
                        var e = ++er;
                        return a(t) + e
                    }, e.words = zn, e.all = tn, e.any = on, e.contains = sn, e.eq = dn, e.detect = io, e.foldl = co, e.foldr = uo, e.head = Hs, e.include = sn, e.inject = co, Fn(e, function() {
                        var t = {};
                        return di(e, function(i, s) {
                            e.prototype[s] || (t[s] = i)
                        }), t
                    }(), !1), e.sample = rn, e.prototype.sample = function(t) {
                        return this.__chain__ || null != t ? this.thru(function(e) {
                            return rn(e, t)
                        }) : rn(this.value())
                    }, e.VERSION = k, Ne("bind bindKey curry curryRight partial partialRight".split(" "), function(t) {
                        e[t].placeholder = e
                    }), Ne(["drop", "take"], function(t, e) {
                        Be.prototype[t] = function(i) {
                            var s = this.__filtered__;
                            if(s && !e) return new Be(this);
                            i = null == i ? 1 : xr(mr(i) || 0, 0);
                            var n = this.clone();
                            return s ? n.__takeCount__ = br(n.__takeCount__, i) : n.__views__.push({
                                size: i,
                                type: t + (0 > n.__dir__ ? "Right" : "")
                            }), n
                        }, Be.prototype[t + "Right"] = function(e) {
                            return this.reverse()[t](e).reverse()
                        }
                    }), Ne(["filter", "map", "takeWhile"], function(t, e) {
                        var i = e + 1,
                            s = i != W;
                        Be.prototype[t] = function(t, e) {
                            var n = this.clone();
                            return n.__iteratees__.push({
                                iteratee: ws(t, e, 1),
                                type: i
                            }), n.__filtered__ = n.__filtered__ || s, n
                        }
                    }), Ne(["first", "last"], function(t, e) {
                        var i = "take" + (e ? "Right" : "");
                        Be.prototype[t] = function() {
                            return this[i](1).value()[0]
                        }
                    }), Ne(["initial", "rest"], function(t, e) {
                        var i = "drop" + (e ? "" : "Right");
                        Be.prototype[t] = function() {
                            return this.__filtered__ ? new Be(this) : this[i](1)
                        }
                    }), Ne(["pluck", "where"], function(t, e) {
                        var i = e ? "filter" : "map",
                            s = e ? _i : Rn;
                        Be.prototype[t] = function(t) {
                            return this[i](s(t))
                        }
                    }), Be.prototype.compact = function() {
                        return this.filter(jn)
                    }, Be.prototype.reject = function(t, e) {
                        return t = ws(t, e, 1), this.filter(function(e) {
                            return !t(e)
                        })
                    }, Be.prototype.slice = function(t, e) {
                        t = null == t ? 0 : +t || 0;
                        var i = this;
                        return i.__filtered__ && (t > 0 || 0 > e) ? new Be(i) : (0 > t ? i = i.takeRight(-t) : t && (i = i.drop(t)), e !== T && (e = +e || 0, i = 0 > e ? i.dropRight(-e) : i.take(e - t)), i)
                    }, Be.prototype.takeRightWhile = function(t, e) {
                        return this.reverse().takeWhile(t, e).reverse()
                    }, Be.prototype.toArray = function() {
                        return this.take(Pr)
                    }, di(Be.prototype, function(t, i) {
                        var s = /^(?:filter|map|reject)|While$/.test(i),
                            n = /^(?:first|last)$/.test(i),
                            r = e[n ? "take" + ("last" == i ? "Right" : "") : i];
                        r && (e.prototype[i] = function() {
                            function e(t) {
                                return n && o ? r(t, 1)[0] : r.apply(T, Ye([t], i))
                            }
                            var i = n ? [1] : arguments,
                                o = this.__chain__,
                                a = this.__wrapped__,
                                h = !!this.__actions__.length,
                                l = a instanceof Be,
                                c = i[0],
                                u = l || Mo(a);
                            return u && s && "function" == typeof c && 1 != c.length && (l = u = !1), c = {
                                func: Qs,
                                args: [e],
                                thisArg: T
                            }, h = l && !h, n && !o ? h ? (a = a.clone(), a.__actions__.push(c), t.call(a)) : r.call(T, this.value())[0] : !n && u ? (a = h ? a : new Be(this), a = t.apply(a, i), a.__actions__.push(c), new m(a, o)) : this.thru(e)
                        })
                    }), Ne("join pop push replace shift sort splice split unshift".split(" "), function(t) {
                        var i = (/^(?:replace|split)$/.test(t) ? $n : Zn)[t],
                            s = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                            n = /^(?:join|pop|replace|shift)$/.test(t);
                        e.prototype[t] = function() {
                            var t = arguments;
                            return n && !this.__chain__ ? i.apply(this.value(), t) : this[s](function(e) {
                                return i.apply(e, t)
                            })
                        }
                    }), di(Be.prototype, function(t, i) {
                        var s = e[i];
                        if(s) {
                            var n = s.name + "";
                            (Ir[n] || (Ir[n] = [])).push({
                                name: i,
                                func: s
                            })
                        }
                    }), Ir[cs(T, S).name] = [{
                        name: "wrapper",
                        func: T
                    }], Be.prototype.clone = function() {
                        var t = new Be(this.__wrapped__);
                        return t.__actions__ = Ve(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Ve(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Ve(this.__views__), t
                    }, Be.prototype.reverse = function() {
                        if(this.__filtered__) {
                            var t = new Be(this);
                            t.__dir__ = -1, t.__filtered__ = !0
                        } else t = this.clone(), t.__dir__ *= -1;
                        return t
                    }, Be.prototype.value = function() {
                        var t, e = this.__wrapped__.value(),
                            i = this.__dir__,
                            s = Mo(e),
                            n = 0 > i,
                            r = s ? e.length : 0;
                        t = r;
                        for(var o = this.__views__, a = 0, h = -1, l = o.length; ++h < l;) {
                            var c = o[h],
                                u = c.size;
                            switch(c.type) {
                                case "drop":
                                    a += u;
                                    break;
                                case "dropRight":
                                    t -= u;
                                    break;
                                case "take":
                                    t = br(t, a + u);
                                    break;
                                case "takeRight":
                                    a = xr(a, t - u)
                            }
                        }
                        if(t = {
                                start: a,
                                end: t
                            }, o = t.start, a = t.end, t = a - o, n = n ? a : o - 1, o = this.__iteratees__, a = o.length, h = 0, l = br(t, this.__takeCount__), !s || B > r || r == t && l == t) return Li(e, this.__actions__);
                        s = [];
                        t: for(; t-- && l > h;) {
                            for(n += i, r = -1, c = e[n]; ++r < a;) {
                                var p = o[r],
                                    u = p.type,
                                    p = p.iteratee(c);
                                if(u == W) c = p;
                                else if(!p) {
                                    if(u == R) continue t;
                                    break t
                                }
                            }
                            s[h++] = c
                        }
                        return s
                    }, e.prototype.chain = function() {
                        return $s(this)
                    }, e.prototype.commit = function() {
                        return new m(this.value(), this.__chain__)
                    }, e.prototype.concat = Qr, e.prototype.plant = function(t) {
                        for(var e, s = this; s instanceof i;) {
                            var n = Us(s);
                            e ? r.__wrapped__ = n : e = n;
                            var r = n,
                                s = s.__wrapped__
                        }
                        return r.__wrapped__ = t, e
                    }, e.prototype.reverse = function() {
                        function t(t) {
                            return t.reverse()
                        }
                        var e = this.__wrapped__;
                        return e instanceof Be ? (this.__actions__.length && (e = new Be(this)), e = e.reverse(), e.__actions__.push({
                            func: Qs,
                            args: [t],
                            thisArg: T
                        }), new m(e, this.__chain__)) : this.thru(t)
                    }, e.prototype.toString = function() {
                        return this.value() + ""
                    }, e.prototype.run = e.prototype.toJSON = e.prototype.valueOf = e.prototype.value = function() {
                        return Li(this.__wrapped__, this.__actions__)
                    }, e.prototype.collect = e.prototype.map, e.prototype.head = e.prototype.first, e.prototype.select = e.prototype.filter, e.prototype.tail = e.prototype.rest, e
                }
                var T, k = "3.10.1",
                    C = 1,
                    S = 2,
                    P = 4,
                    M = 8,
                    D = 16,
                    A = 32,
                    E = 64,
                    I = 128,
                    z = 256,
                    O = 30,
                    j = "...",
                    L = 150,
                    F = 16,
                    B = 200,
                    R = 1,
                    W = 2,
                    U = "Expected a function",
                    V = "__lodash_placeholder__",
                    N = "[object Arguments]",
                    H = "[object Array]",
                    G = "[object Boolean]",
                    q = "[object Date]",
                    Y = "[object Error]",
                    X = "[object Function]",
                    K = "[object Number]",
                    Z = "[object Object]",
                    J = "[object RegExp]",
                    $ = "[object String]",
                    Q = "[object ArrayBuffer]",
                    te = "[object Float32Array]",
                    ee = "[object Float64Array]",
                    ie = "[object Int8Array]",
                    se = "[object Int16Array]",
                    ne = "[object Int32Array]",
                    re = "[object Uint8Array]",
                    oe = "[object Uint8ClampedArray]",
                    ae = "[object Uint16Array]",
                    he = "[object Uint32Array]",
                    le = /\b__p\+='';/g,
                    ce = /\b(__p\+=)''\+/g,
                    ue = /(__e\(.*?\)|\b__t\))\+'';/g,
                    pe = /&(?:amp|lt|gt|quot|#39|#96);/g,
                    de = /[&<>"'`]/g,
                    fe = RegExp(pe.source),
                    ve = RegExp(de.source),
                    ge = /<%-([\s\S]+?)%>/g,
                    me = /<%([\s\S]+?)%>/g,
                    ye = /<%=([\s\S]+?)%>/g,
                    we = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                    _e = /^\w*$/,
                    xe = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                    be = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
                    Te = RegExp(be.source),
                    ke = /[\u0300-\u036f\ufe20-\ufe23]/g,
                    Ce = /\\(\\)?/g,
                    Se = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                    Pe = /\w*$/,
                    Me = /^0[xX]/,
                    De = /^\[object .+?Constructor\]$/,
                    Ae = /^\d+$/,
                    Ee = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                    Ie = /($^)/,
                    ze = /['\n\r\u2028\u2029\\]/g,
                    Oe = RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+", "g"),
                    je = "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "),
                    Le = {};
                Le[te] = Le[ee] = Le[ie] = Le[se] = Le[ne] = Le[re] = Le[oe] = Le[ae] = Le[he] = !0, Le[N] = Le[H] = Le[Q] = Le[G] = Le[q] = Le[Y] = Le[X] = Le["[object Map]"] = Le[K] = Le[Z] = Le[J] = Le["[object Set]"] = Le[$] = Le["[object WeakMap]"] = !1;
                var Fe = {};
                Fe[N] = Fe[H] = Fe[Q] = Fe[G] = Fe[q] = Fe[te] = Fe[ee] = Fe[ie] = Fe[se] = Fe[ne] = Fe[K] = Fe[Z] = Fe[J] = Fe[$] = Fe[re] = Fe[oe] = Fe[ae] = Fe[he] = !0, Fe[Y] = Fe[X] = Fe["[object Map]"] = Fe["[object Set]"] = Fe["[object WeakMap]"] = !1;
                var Be = {
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ã": "A",
                        "Ä": "A",
                        "Å": "A",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ã": "a",
                        "ä": "a",
                        "å": "a",
                        "Ç": "C",
                        "ç": "c",
                        "Ð": "D",
                        "ð": "d",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ë": "E",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ë": "e",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ï": "I",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ï": "i",
                        "Ñ": "N",
                        "ñ": "n",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Õ": "O",
                        "Ö": "O",
                        "Ø": "O",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "õ": "o",
                        "ö": "o",
                        "ø": "o",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ü": "U",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ü": "u",
                        "Ý": "Y",
                        "ý": "y",
                        "ÿ": "y",
                        "Æ": "Ae",
                        "æ": "ae",
                        "Þ": "Th",
                        "þ": "th",
                        "ß": "ss"
                    },
                    Re = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "`": "&#96;"
                    },
                    We = {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&#39;": "'",
                        "&#96;": "`"
                    },
                    Ue = {
                        "function": !0,
                        object: !0
                    },
                    Ve = {
                        0: "x30",
                        1: "x31",
                        2: "x32",
                        3: "x33",
                        4: "x34",
                        5: "x35",
                        6: "x36",
                        7: "x37",
                        8: "x38",
                        9: "x39",
                        A: "x41",
                        B: "x42",
                        C: "x43",
                        D: "x44",
                        E: "x45",
                        F: "x46",
                        a: "x61",
                        b: "x62",
                        c: "x63",
                        d: "x64",
                        e: "x65",
                        f: "x66",
                        n: "x6e",
                        r: "x72",
                        t: "x74",
                        u: "x75",
                        v: "x76",
                        x: "x78"
                    },
                    Ne = {
                        "\\": "\\",
                        "'": "'",
                        "\n": "n",
                        "\r": "r",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    He = Ue[typeof i] && i && !i.nodeType && i,
                    Ge = Ue[typeof e] && e && !e.nodeType && e,
                    qe = Ue[typeof self] && self && self.Object && self,
                    Ye = Ue[typeof window] && window && window.Object && window,
                    Xe = Ge && Ge.exports === He && He,
                    Ke = He && Ge && "object" == typeof t && t && t.Object && t || Ye !== (this && this.window) && Ye || qe || this,
                    Ze = b();
                "function" == typeof define && "object" == typeof define.amd && define.amd ? (Ke._ = Ze, define(function() {
                    return Ze
                })) : He && Ge ? Xe ? (Ge.exports = Ze)._ = Ze : He._ = Ze : Ke._ = Ze
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    84: [function() {
        ! function() {
            if("undefined" == typeof window.performance && (window.performance = {}), !window.performance.now) {
                var t = Date.now();
                performance.timing && performance.timing.navigationStart && (t = performance.timing.navigationStart), window.performance.now = function() {
                    return Date.now() - t
                }
            }
        }()
    }, {}],
    85: [function(t, e, i) {
        ! function() {
            if("performance" in window == !1 && (window.performance = {}), Date.now = Date.now || function() {
                    return(new Date).getTime()
                }, "now" in window.performance == !1) {
                var t = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now();
                window.performance.now = function() {
                    return Date.now() - t
                }
            }
        }();
        var s = s || function() {
            var t = [];
            return {
                getAll: function() {
                    return t
                },
                removeAll: function() {
                    t = []
                },
                add: function(e) {
                    t.push(e)
                },
                remove: function(e) {
                    var i = t.indexOf(e); - 1 !== i && t.splice(i, 1)
                },
                update: function(e) {
                    if(0 === t.length) return !1;
                    var i = 0;
                    for(e = void 0 !== e ? e : window.performance.now(); i < t.length;) t[i].update(e) ? i++ : t.splice(i, 1);
                    return !0
                }
            }
        }();
        s.Tween = function(t) {
                var e = t,
                    i = {},
                    n = {},
                    r = {},
                    o = 1e3,
                    a = 0,
                    h = !1,
                    l = !1,
                    c = !1,
                    u = 0,
                    p = null,
                    d = s.Easing.Linear.None,
                    f = s.Interpolation.Linear,
                    v = [],
                    g = null,
                    m = !1,
                    y = null,
                    w = null,
                    _ = null;
                for(var x in t) i[x] = parseFloat(t[x], 10);
                this.to = function(t, e) {
                    return void 0 !== e && (o = e), n = t, this
                }, this.start = function(t) {
                    s.add(this), l = !0, m = !1, p = void 0 !== t ? t : window.performance.now(), p += u;
                    for(var o in n) {
                        if(n[o] instanceof Array) {
                            if(0 === n[o].length) continue;
                            n[o] = [e[o]].concat(n[o])
                        }
                        i[o] = e[o], i[o] instanceof Array == !1 && (i[o] *= 1), r[o] = i[o] || 0
                    }
                    return this
                }, this.stop = function() {
                    return l ? (s.remove(this), l = !1, null !== _ && _.call(e), this.stopChainedTweens(), this) : this
                }, this.stopChainedTweens = function() {
                    for(var t = 0, e = v.length; e > t; t++) v[t].stop()
                }, this.delay = function(t) {
                    return u = t, this
                }, this.repeat = function(t) {
                    return a = t, this
                }, this.yoyo = function(t) {
                    return h = t, this
                }, this.easing = function(t) {
                    return d = t, this
                }, this.interpolation = function(t) {
                    return f = t, this
                }, this.chain = function() {
                    return v = arguments, this
                }, this.onStart = function(t) {
                    return g = t, this
                }, this.onUpdate = function(t) {
                    return y = t, this
                }, this.onComplete = function(t) {
                    return w = t, this
                }, this.onStop = function(t) {
                    return _ = t, this
                }, this.update = function(t) {
                    var s, l, _;
                    if(p > t) return !0;
                    m === !1 && (null !== g && g.call(e), m = !0), l = (t - p) / o, l = l > 1 ? 1 : l, _ = d(l);
                    for(s in n) {
                        var x = i[s] || 0,
                            b = n[s];
                        b instanceof Array ? e[s] = f(b, _) : ("string" == typeof b && (b = x + parseFloat(b, 10)), "number" == typeof b && (e[s] = x + (b - x) * _))
                    }
                    if(null !== y && y.call(e, _), 1 === l) {
                        if(a > 0) {
                            isFinite(a) && a--;
                            for(s in r) {
                                if("string" == typeof n[s] && (r[s] = r[s] + parseFloat(n[s], 10)), h) {
                                    var T = r[s];
                                    r[s] = n[s], n[s] = T
                                }
                                i[s] = r[s]
                            }
                            return h && (c = !c), p = t + u, !0
                        }
                        null !== w && w.call(e);
                        for(var k = 0, C = v.length; C > k; k++) v[k].start(p + o);
                        return !1
                    }
                    return !0
                }
            }, s.Easing = {
                Linear: {
                    None: function(t) {
                        return t
                    }
                },
                Quadratic: {
                    In: function(t) {
                        return t * t
                    },
                    Out: function(t) {
                        return t * (2 - t)
                    },
                    InOut: function(t) {
                        return(t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                    }
                },
                Cubic: {
                    In: function(t) {
                        return t * t * t
                    },
                    Out: function(t) {
                        return --t * t * t + 1
                    },
                    InOut: function(t) {
                        return(t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    }
                },
                Quartic: {
                    In: function(t) {
                        return t * t * t * t
                    },
                    Out: function(t) {
                        return 1 - --t * t * t * t
                    },
                    InOut: function(t) {
                        return(t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                    }
                },
                Quintic: {
                    In: function(t) {
                        return t * t * t * t * t
                    },
                    Out: function(t) {
                        return --t * t * t * t * t + 1
                    },
                    InOut: function(t) {
                        return(t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    }
                },
                Sinusoidal: {
                    In: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Out: function(t) {
                        return Math.sin(t * Math.PI / 2)
                    },
                    InOut: function(t) {
                        return .5 * (1 - Math.cos(Math.PI * t))
                    }
                },
                Exponential: {
                    In: function(t) {
                        return 0 === t ? 0 : Math.pow(1024, t - 1)
                    },
                    Out: function(t) {
                        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                    },
                    InOut: function(t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
                    }
                },
                Circular: {
                    In: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Out: function(t) {
                        return Math.sqrt(1 - --t * t)
                    },
                    InOut: function(t) {
                        return(t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    }
                },
                Elastic: {
                    In: function(t) {
                        var e, i = .1,
                            s = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = s / 4) : e = s * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / s)))
                    },
                    Out: function(t) {
                        var e, i = .1,
                            s = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = s / 4) : e = s * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / s) + 1)
                    },
                    InOut: function(t) {
                        var e, i = .1,
                            s = .4;
                        return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = s / 4) : e = s * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / s) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / s) * .5 + 1)
                    }
                },
                Back: {
                    In: function(t) {
                        var e = 1.70158;
                        return t * t * ((e + 1) * t - e)
                    },
                    Out: function(t) {
                        var e = 1.70158;
                        return --t * t * ((e + 1) * t + e) + 1
                    },
                    InOut: function(t) {
                        var e = 2.5949095;
                        return(t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
                    }
                },
                Bounce: {
                    In: function(t) {
                        return 1 - s.Easing.Bounce.Out(1 - t)
                    },
                    Out: function(t) {
                        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    },
                    InOut: function(t) {
                        return .5 > t ? .5 * s.Easing.Bounce.In(2 * t) : .5 * s.Easing.Bounce.Out(2 * t - 1) + .5
                    }
                }
            }, s.Interpolation = {
                Linear: function(t, e) {
                    var i = t.length - 1,
                        n = i * e,
                        r = Math.floor(n),
                        o = s.Interpolation.Utils.Linear;
                    return 0 > e ? o(t[0], t[1], n) : e > 1 ? o(t[i], t[i - 1], i - n) : o(t[r], t[r + 1 > i ? i : r + 1], n - r)
                },
                Bezier: function(t, e) {
                    for(var i = 0, n = t.length - 1, r = Math.pow, o = s.Interpolation.Utils.Bernstein, a = 0; n >= a; a++) i += r(1 - e, n - a) * r(e, a) * t[a] * o(n, a);
                    return i
                },
                CatmullRom: function(t, e) {
                    var i = t.length - 1,
                        n = i * e,
                        r = Math.floor(n),
                        o = s.Interpolation.Utils.CatmullRom;
                    return t[0] === t[i] ? (0 > e && (r = Math.floor(n = i * (1 + e))), o(t[(r - 1 + i) % i], t[r], t[(r + 1) % i], t[(r + 2) % i], n - r)) : 0 > e ? t[0] - (o(t[0], t[0], t[1], t[1], -n) - t[0]) : e > 1 ? t[i] - (o(t[i], t[i], t[i - 1], t[i - 1], n - i) - t[i]) : o(t[r ? r - 1 : 0], t[r], t[r + 1 > i ? i : r + 1], t[r + 2 > i ? i : r + 2], n - r)
                },
                Utils: {
                    Linear: function(t, e, i) {
                        return(e - t) * i + t
                    },
                    Bernstein: function(t, e) {
                        var i = s.Interpolation.Utils.Factorial;
                        return i(t) / i(e) / i(t - e)
                    },
                    Factorial: function() {
                        var t = [1];
                        return function(e) {
                            var i = 1;
                            if(t[e]) return t[e];
                            for(var s = e; s > 1; s--) i *= s;
                            return t[e] = i, i
                        }
                    }(),
                    CatmullRom: function(t, e, i, s, n) {
                        var r = .5 * (i - t),
                            o = .5 * (s - e),
                            a = n * n,
                            h = n * a;
                        return(2 * e - 2 * i + r + o) * h + (-3 * e + 3 * i - 2 * r - o) * a + r * n + e
                    }
                }
            },
            function(t) {
                "function" == typeof define && define.amd ? define([], function() {
                    return s
                }) : "object" == typeof i ? e.exports = s : t.TWEEN = s
            }(this)
    }, {}]
}, {}, [2]);
