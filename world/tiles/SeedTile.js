"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class SeedTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.SEED;
    constructor(base, world, block, alloc = 14) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeU32(Math.floor((Date.now() - this.block.tree?.plantedAt) / 1000));
        this.data.writeU8(this.block.tree?.fruitCount > 4
            ? 4
            : this.block.tree?.fruitCount);
        return;
    }
    async setFlags() {
        if (this.block.toggleable?.open)
            this.flags |= Constants_1.TileFlags.OPEN;
        if (this.block.toggleable?.public)
            this.flags |= Constants_1.TileFlags.PUBLIC;
        this.flags |= Constants_1.TileFlags.SEED;
        return;
    }
}
exports.SeedTile = SeedTile;
