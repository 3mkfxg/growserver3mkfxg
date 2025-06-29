"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindItemEnd = void 0;
const growtopia_js_1 = require("growtopia.js");
class FindItemEnd {
    base;
    peer;
    action;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
    }
    async execute() {
        const itemID = parseInt(this.action.buttonClicked);
        this.peer.data?.inventory?.items.push({ id: itemID, amount: 200 });
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Added \`6${this.base.items.metadata.items.find((v) => v.id === itemID)?.name}\`\` to your inventory.`));
        this.peer.inventory();
        this.peer.saveToCache();
    }
}
exports.FindItemEnd = FindItemEnd;
