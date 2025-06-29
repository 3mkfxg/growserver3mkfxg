"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitcheROO = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class SwitcheROO extends Tile_1.Tile {
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
        // nothing to do here
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
exports.SwitcheROO = SwitcheROO;
