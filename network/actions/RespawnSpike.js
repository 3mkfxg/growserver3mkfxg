"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespawnSpike = void 0;
class RespawnSpike {
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
exports.RespawnSpike = RespawnSpike;
