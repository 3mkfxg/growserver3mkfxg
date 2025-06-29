"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const growtopia_js_1 = require("growtopia.js");
const ExtendBuffer_1 = require("../utils/ExtendBuffer");
const tiles_1 = require("./tiles");
const Constants_1 = require("../Constants");
class Tile {
    base;
    world;
    block;
    alloc;
    data;
    lockPos;
    flags;
    constructor(base, world, block, alloc = 8) {
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.lockPos =
            this.block.lock && !this.block.lock.isOwner
                ? this.block.lock.ownerX +
                    this.block.lock.ownerY * this.world.data.width
                : 0;
        this.flags = 0x0;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() { }
    async setFlags() { }
    async serializeBlockData(lockPos, flags) {
        this.data.writeU32(this.block.fg | (this.block.bg << 16));
        this.data.writeU16(lockPos);
        this.data.writeU16(flags);
    }
    async init() {
        await this.setFlags();
        await this.serializeBlockData(this.lockPos, this.flags);
        await this.serialize();
        return;
    }
    async parse() {
        return this.data.data;
    }
    static async tileUpdate(base, peer, world, block, type) {
        const data = await (0, tiles_1.tileParse)(type, base, world, block);
        peer.every((p) => {
            if (p.data?.world === peer.data?.world && p.data?.world !== "EXIT") {
                p.send(growtopia_js_1.TankPacket.from({
                    type: Constants_1.TankTypes.SEND_TILE_UPDATE_DATA,
                    xPunch: block.x,
                    yPunch: block.y,
                    data: () => data
                }));
            }
        });
    }
}
exports.Tile = Tile;
