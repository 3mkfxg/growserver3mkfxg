"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
class Find extends Command_1.Command {
    base;
    peer;
    text;
    args;
    constructor(base, peer, text, args) {
        super(base, peer, text, args);
        this.base = base;
        this.peer = peer;
        this.text = text;
        this.args = args;
        this.opt = {
            command: ["find"],
            description: "Find some items",
            cooldown: 5,
            ratelimit: 5,
            category: "`oBasic",
            usage: "/find <item_name?>",
            example: ["/find", "/find dirt"],
            permission: [Constants_1.ROLE.BASIC, Constants_1.ROLE.SUPPORTER, Constants_1.ROLE.DEVELOPER],
        };
    }
    async execute() {
        const dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Find the item", "6016", "big")
            .addCheckbox("seed_only", "Only seed", "not_selected")
            .addInputBox("find_item_name", "", "", 30)
            .addQuickExit()
            .endDialog("find_item", "Cancel", "Find")
            .str();
        if (this.args.length) {
            const findItemName = this.args.join(" ");
            const isSeed = false;
            const dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addQuickExit()
                .addLabelWithIcon("Find the item", "6016", "big")
                .addSpacer("small");
            const items = this.base.items.metadata.items.filter((v) => v.name?.toLowerCase().includes(findItemName.toLowerCase()));
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
            return;
        }
        this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.default = Find;
