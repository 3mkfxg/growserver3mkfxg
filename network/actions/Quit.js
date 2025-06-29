"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quit = void 0;
class Quit {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(_action) {
        this.peer.disconnect();
    }
}
exports.Quit = Quit;
