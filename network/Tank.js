"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITankPacket = void 0;
const consola_1 = __importDefault(require("consola"));
const growtopia_js_1 = require("growtopia.js");
const Constants_1 = require("../Constants");
const World_1 = require("../core/World");
const index_1 = require("./tanks/index");
class ITankPacket {
    base;
    peer;
    chunk;
    tank;
    constructor(base, peer, chunk) {
        this.base = base;
        this.peer = peer;
        this.chunk = chunk;
        this.tank = growtopia_js_1.TankPacket.fromBuffer(chunk);
    }
    async execute() {
        const tankType = this.tank.data?.type;
        const world = new World_1.World(this.base, this.peer.data.world);
        consola_1.default.debug(`[DEBUG] Receive tank packet of ${Constants_1.TankTypes[tankType]}:\n`, this.tank);
        try {
            const type = this.tank.data?.type;
            const Class = index_1.TankMap[type];
            if (!Class)
                throw new Error(`No TankPacket class found with type ${Constants_1.TankTypes[type]} (${type})`);
            const tnk = new Class(this.base, this.peer, this.tank, world);
            await tnk.execute();
        }
        catch (e) {
            consola_1.default.warn(e);
        }
    }
}
exports.ITankPacket = ITankPacket;
