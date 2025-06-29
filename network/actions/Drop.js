"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drop = void 0;
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class Drop {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(action) {
        const itemID = parseInt(action.itemID);
        // Prevent dropping specific items add to the list if you want to prevent more items
        if (itemID === 18 || itemID === 32) {
            this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "You'd be sorry if you lost that."));
            return;
        }
        const item = this.base.items.metadata.items.find((v) => v.id === itemID);
        const peerItem = this.peer.data.inventory.items.find((v) => v.id === itemID);
        const dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon(`Drop ${item?.name}`, item?.id || 0, "big")
            .addTextBox("How many to drop?")
            .addInputBox("drop_count", "", peerItem?.amount, 5)
            .embed("itemID", itemID)
            .endDialog("drop_end", "Cancel", "OK")
            .str();
        this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.Drop = Drop;
