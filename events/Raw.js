"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawListener = void 0;
const Constants_1 = require("../Constants");
const Peer_1 = require("../core/Peer");
const consola_1 = __importDefault(require("consola"));
const Action_1 = require("../network/Action");
const Text_1 = require("../network/Text");
const Tank_1 = require("../network/Tank");
const growtopia_js_1 = require("growtopia.js");
class RawListener {
    base;
    constructor(base) {
        this.base = base;
        consola_1.default.log('🧷Listening ENet "raw" event');
    }
    run(netID, _channelID, chunk) {
        const peer = new Peer_1.Peer(this.base, netID);
        const type = chunk.readInt32LE();
        switch (type) {
            case Constants_1.PacketTypes.STR:
            case Constants_1.PacketTypes.ACTION: {
                new Text_1.ITextPacket(this.base, peer, chunk).execute();
                new Action_1.IActionPacket(this.base, peer, chunk).execute();
                break;
            }
            case Constants_1.PacketTypes.TANK: {
                if (chunk.length < 60) {
                    peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Received invalid tank packet."));
                    return peer.disconnect();
                }
                new Tank_1.ITankPacket(this.base, peer, chunk).execute();
                break;
            }
            default: {
                consola_1.default.debug(`Unknown PacketType of ${type}`, chunk);
                break;
            }
        }
    }
}
exports.RawListener = RawListener;
