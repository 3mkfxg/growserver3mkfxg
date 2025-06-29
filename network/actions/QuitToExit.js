"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuitToExit = void 0;
class QuitToExit {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(_action) {
        this.peer.leaveWorld();
    }
}
exports.QuitToExit = QuitToExit;
