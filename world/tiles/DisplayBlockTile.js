"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayBlockTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class DisplayBlockTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.DISPLAY_BLOCK;
    constructor(base, world, block, alloc = 13) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeU32(this.block.dblockID || 0);
        return;
    }
    async setFlags() {
        this.flags |= Constants_1.TileFlags.TILEEXTRA;
        return;
    }
}
exports.DisplayBlockTile = DisplayBlockTile;
