"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRequest = void 0;
const growtopia_js_1 = require("growtopia.js");
class JoinRequest {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(action) {
        const worldName = action.name || "";
        if (worldName.length <= 0) {
            this.peer.send(growtopia_js_1.Variant.from("OnFailedToEnterWorld", 1), growtopia_js_1.Variant.from("OnConsoleMessage", "That world name is uhh `9empty``"));
            return;
        }
        if (worldName.match(/\W+|_|EXIT/gi)) {
            this.peer.send(growtopia_js_1.Variant.from("OnFailedToEnterWorld", 1), growtopia_js_1.Variant.from("OnConsoleMessage", "That world name is too `9special`` to be entered."));
            return;
        }
        setTimeout(() => {
            this.peer.enterWorld(worldName.toUpperCase());
        }, 200);
    }
}
exports.JoinRequest = JoinRequest;
