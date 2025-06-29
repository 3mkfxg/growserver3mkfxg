"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class SignTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.SIGN;
    label;
    constructor(base, world, block, alloc = 15) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.label = this.block.sign?.label || "";
        this.alloc += this.label.length;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeString(this.label);
        this.data.writeI32(-1);
        return;
    }
    async setFlags() {
        this.flags |= Constants_1.TileFlags.TILEEXTRA;
        if (this.block.rotatedLeft)
            this.flags |= Constants_1.TileFlags.ROTATED_LEFT;
        return;
    }
}
exports.SignTile = SignTile;
