"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCheckResponsePack = void 0;
class AppCheckResponsePack {
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
        // Client validation
        console.log("Executing AppCheckResponsePack...");
        if (this.tank.data?.type === 24) {
            console.log("Valid APP_CHECK_RESPONSE packet received.");
            if (this.peer.isValid()) {
                console.log("Peer is valid.");
            }
            else {
                console.log("Peer is invalid. Disconnecting...");
                this.peer.disconnect();
            }
        }
        else {
            console.log("Invalid APP_CHECK_RESPONSE packet received.");
        }
    }
}
exports.AppCheckResponsePack = AppCheckResponsePack;
