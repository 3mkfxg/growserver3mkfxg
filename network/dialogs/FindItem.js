"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindItem = void 0;
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class FindItem {
    base;
    peer;
    action;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
    }
    async execute() {
        const isSeed = parseInt(this.action.seed_only) ? true : false;
        const dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addQuickExit()
            .addLabelWithIcon("Find the item", "6016", "big")
            .addSpacer("small");
        const items = this.base.items.metadata.items.filter((v) => v.name?.toLowerCase().includes(this.action.find_item_name.toLowerCase()));
        items.forEach((item) => {
            const itemID = item.id || 0;
            const itemName = item.name || "";
            if (isSeed) {
                if (itemID % 2 === 1)
                    dialog.addButtonWithIcon(itemID, itemID, itemName, "staticBlueFrame", item.id);
            }
            else {
                if (itemID % 2 === 0)
                    dialog.addButtonWithIcon(itemID, itemID, itemName, "staticBlueFrame", item.id);
            }
        });
        dialog.endDialog("find_item_end", "Cancel", "");
        this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
    }
}
exports.FindItem = FindItem;
