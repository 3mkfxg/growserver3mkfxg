"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectListener = void 0;
const growtopia_js_1 = require("growtopia.js");
const Peer_1 = require("../core/Peer");
const consola_1 = __importDefault(require("consola"));
class ConnectListener {
    base;
    constructor(base) {
        this.base = base;
        consola_1.default.log('🧷Listening ENet "connect" event');
    }
    run(netID) {
        const peer = new Peer_1.Peer(this.base, netID);
        const peerAddr = peer.enet;
        consola_1.default.log(`➕Peer ${netID} [/${peerAddr.ip}:${peerAddr.port}] connected`);
        this.base.cache.peers.set(netID, peer.data);
        peer.send(growtopia_js_1.TextPacket.from(0x1));
    }
}
exports.ConnectListener = ConnectListener;
