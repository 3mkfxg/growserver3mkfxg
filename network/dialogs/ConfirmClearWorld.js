"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmClearWorld = void 0;
const Constants_1 = require("../../Constants");
class ConfirmClearWorld {
    base;
    peer;
    action;
    world;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
        this.world = this.peer.currentWorld();
    }
    async execute() {
        if (this.world.data.owner) {
            if (this.world.data.owner.id !== this.peer.data.id_user)
                return;
            for (let i = 0; i < this.world.data.blocks.length; i++) {
                const b = this.world.data.blocks[i];
                const itemMeta = this.base.items.metadata.items[b.fg || b.bg];
                const mLock = Constants_1.LOCKS.find((l) => l.id === itemMeta.id);
                if (b.fg === 6 ||
                    b.fg === 8 ||
                    (!mLock && itemMeta.type === Constants_1.ActionTypes.LOCK))
                    continue;
                Object.keys(b).forEach((v) => {
                    if (v === "x" || v === "y") {
                        // nothing
                    }
                    else if (v === "fg" || v === "bg") {
                        b[v] = 0;
                    }
                    else {
                        // @ts-expect-error idk this typing
                        b[v] = undefined;
                    }
                });
            }
            this.peer.every((p) => {
                if (p.data.world === this.peer.data.world && p.data.world !== "EXIT") {
                    p.leaveWorld();
                    // p.enterWorld(lastWorld);
                }
            });
        }
    }
}
exports.ConfirmClearWorld = ConfirmClearWorld;
