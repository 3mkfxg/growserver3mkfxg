"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class DoorTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.DOOR;
    label;
    constructor(base, world, block, alloc = 12) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.label = this.block.door?.label || "";
        this.alloc += this.label.length;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeString(this.label);
        // first param send red text bubble locked/not (0x8/0x0)
        this.data.writeU8(0x0);
        return;
    }
    async setFlags() {
        this.flags |= Constants_1.TileFlags.TILEEXTRA;
        return;
    }
}
exports.DoorTile = DoorTile;
