"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalTile = void 0;
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class NormalTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    constructor(base, world, block, alloc = 8) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        // nothing todo here :>
        return;
    }
    async setFlags() {
        // nothing todo here too :>
        return;
    }
}
exports.NormalTile = NormalTile;
