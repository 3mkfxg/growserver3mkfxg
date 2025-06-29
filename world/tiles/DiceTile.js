"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class DiceTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.DICE;
    constructor(base, world, block, alloc = 10) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeU8(this.block.dice || 0);
        return;
    }
    async setFlags() {
        if (this.block.toggleable?.open)
            this.flags |= Constants_1.TileFlags.OPEN;
        if (this.block.toggleable?.public)
            this.flags |= Constants_1.TileFlags.PUBLIC;
        return;
    }
}
exports.DiceTile = DiceTile;
