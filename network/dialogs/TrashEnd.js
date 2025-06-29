"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashEnd = void 0;
class TrashEnd {
    base;
    peer;
    action;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
    }
    async execute() {
        const itemID = parseInt(this.action.itemID);
        const invenItem = this.peer.data.inventory.items.find((item) => item.id === itemID);
        if (!/\d/.test(this.action.trash_count))
            return;
        if (!invenItem)
            return;
        const count = parseInt(this.action.trash_count);
        invenItem.amount = invenItem.amount - count;
        // Check if inventory amount is empty, then delete it.
        if (invenItem.amount <= 0) {
            this.peer.data.inventory.items = this.peer.data.inventory.items.filter((i) => i.amount !== 0);
        }
        this.peer.saveToCache();
        this.peer.inventory();
    }
}
exports.TrashEnd = TrashEnd;
