"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignEdit = void 0;
const Tile_1 = require("../../world/Tile");
class SignEdit {
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
        this.itemMeta = this.base.items.metadata.items.find((i) => i.id === parseInt(action.itemID));
    }
    async execute() {
        if (this.world.data.owner) {
            if (this.world.data.owner.id !== this.peer.data?.id_user)
                return;
        }
        this.block.sign = {
            label: this.action.label || ""
        };
        Tile_1.Tile.tileUpdate(this.base, this.peer, this.world, this.block, this.itemMeta.type || 0);
    }
}
exports.SignEdit = SignEdit;
