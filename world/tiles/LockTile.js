"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
class LockTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.LOCK;
    adminCount;
    ownerID;
    constructor(base, world, block, alloc = 26) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.ownerID = (this.block.lock ? this.block.lock.ownerUserID : this.world.data.owner?.id);
        this.adminCount = 0;
        this.alloc += 4 * this.adminCount;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU16(this.extraType | (0 << 8));
        this.data.writeU32(this.ownerID);
        this.data.writeU32(this.adminCount);
        this.data.writeI32(-100);
        return;
    }
    async setFlags() {
        this.flags |= Constants_1.TileFlags.TILEEXTRA;
        return;
    }
}
exports.LockTile = LockTile;
