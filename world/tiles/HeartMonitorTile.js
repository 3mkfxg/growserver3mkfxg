"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartMonitorTile = void 0;
const Constants_1 = require("../../Constants");
const ExtendBuffer_1 = require("../../utils/ExtendBuffer");
const Tile_1 = require("../Tile");
const Peer_1 = require("../../core/Peer");
class HeartMonitorTile extends Tile_1.Tile {
    base;
    world;
    block;
    alloc;
    data;
    extraType = Constants_1.TileExtraTypes.HEART_MONITOR;
    name;
    userId;
    constructor(base, world, block, alloc = 15) {
        super(base, world, block, alloc);
        this.base = base;
        this.world = world;
        this.block = block;
        this.alloc = alloc;
        this.name = this.block.heartMonitor?.name || "";
        this.alloc += this.name.length;
        this.userId = this.block.heartMonitor?.userID || 0;
        this.data = new ExtendBuffer_1.ExtendBuffer(this.alloc);
    }
    async serialize() {
        this.data.writeU8(this.extraType);
        this.data.writeU32(this.userId);
        this.data.writeString(this.name);
        return;
    }
    async setFlags() {
        this.flags |= Constants_1.TileFlags.TILEEXTRA;
        if (this.block.rotatedLeft)
            this.flags |= Constants_1.TileFlags.ROTATED_LEFT;
        const targetPeerId = this.base.cache.peers.find((v) => v.id_user === this.userId);
        if (targetPeerId) {
            const targetPeer = new Peer_1.Peer(this.base, targetPeerId.netID);
            if (targetPeer)
                this.flags |= Constants_1.TileFlags.OPEN;
        }
        return;
    }
}
exports.HeartMonitorTile = HeartMonitorTile;
