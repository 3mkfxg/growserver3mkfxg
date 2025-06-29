"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disconnect = void 0;
class Disconnect {
    base;
    peer;
    tank;
    world;
    constructor(base, peer, tank, world) {
        this.base = base;
        this.peer = peer;
        this.tank = tank;
        this.world = world;
    }
    async execute() {
        this.peer.disconnect();
    }
}
exports.Disconnect = Disconnect;
