"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisconnectListener = void 0;
const consola_1 = __importDefault(require("consola"));
class DisconnectListener {
    base;
    constructor(base) {
        this.base = base;
        consola_1.default.log('🧷Listening ENet "disconnect" event');
    }
    run(netID) {
        consola_1.default.log(`➖Peer ${netID} disconnected`);
        this.base.cache.peers.delete(netID);
    }
}
exports.DisconnectListener = DisconnectListener;
