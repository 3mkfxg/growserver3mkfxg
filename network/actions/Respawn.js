"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respawn = void 0;
class Respawn {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(_action) {
        this.peer.respawn();
    }
}
exports.Respawn = Respawn;
