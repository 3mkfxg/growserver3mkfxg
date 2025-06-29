"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaLockEdit = void 0;
const Constants_1 = require("../../Constants");
const FloodFill_1 = require("../../utils/FloodFill");
const Tile_1 = require("../../world/Tile");
class AreaLockEdit {
    base;
    peer;
    action;
    world;
    pos;
    block;
    itemMeta;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
        this.world = this.peer.currentWorld();
        this.pos =
            parseInt(this.action.tilex) +
                parseInt(this.action.tiley) * this.world?.data.width;
        this.block = this.world?.data.blocks[this.pos];
        this.itemMeta = this.base.items.metadata.items.find((i) => i.id === parseInt(this.action.lockID));
    }
    async execute() {
        const mLock = Constants_1.LOCKS.find((l) => l.id === parseInt(this.action.lockID));
        if (this.block.lock?.ownerUserID !== this.peer.data?.id_user)
            return;
        const openToPublic = this.action.allow_break_build === "1" ? true : false;
        const ignoreEmpty = this.action.ignore_empty === "1" ? true : false;
        const allowBuildOnly = this.action.build_only === "1" ? true : false;
        const adminLimitedAccess = this.action.limit_admin === "1" ? true : false;
        this.block.lock.openToPublic = openToPublic;
        this.block.lock.ignoreEmptyAir = ignoreEmpty;
        this.block.lock.onlyAllowBuild = allowBuildOnly;
        this.block.lock.adminLimited = adminLimitedAccess;
        if (this.action.buttonClicked === "reapply_lock") {
            this.world.data.blocks?.forEach((b) => {
                if (b.lock &&
                    b.lock.ownerX === this.block.x &&
                    b.lock.ownerY === this.block.y)
                    b.lock = undefined;
            });
            const algo = new FloodFill_1.Floodfill({
                s_node: {
                    x: parseInt(this.action.tilex),
                    y: parseInt(this.action.tiley)
                },
                max: mLock.maxTiles || 0,
                width: this.world.data.width || 100,
                height: this.world.data.height || 60,
                blocks: this.world.data.blocks,
                s_block: this.block,
                base: this.base,
                noEmptyAir: ignoreEmpty
            });
            algo.exec();
            algo.apply(this.world, this.peer);
        }
        Tile_1.Tile.tileUpdate(this.base, this.peer, this.world, this.block, this.itemMeta.type);
    }
}
exports.AreaLockEdit = AreaLockEdit;
