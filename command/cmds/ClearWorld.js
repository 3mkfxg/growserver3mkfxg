"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
class ClearWorld extends Command_1.Command {
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
            command: ["clearworld"],
            description: "Clear a world",
            cooldown: 60 * 10,
            ratelimit: 1,
            category: "`oBasic",
            usage: "/clearworld",
            example: [],
            permission: [Constants_1.ROLE.BASIC, Constants_1.ROLE.SUPPORTER, Constants_1.ROLE.DEVELOPER]
        };
    }
    async execute() {
        const world = this.peer.currentWorld();
        if (world?.data.owner) {
            if (world?.data.owner.id !== this.peer.data.id_user)
                return;
            const dialog = new DialogBuilder_1.DialogBuilder()
                .addLabelWithIcon("Warning", "1432", "big")
                .addTextBox("This will clear everything on your world, including your building. Are you sure?")
                .endDialog("confirm_clearworld", "Nevermind", "Yes");
            this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
        }
    }
}
exports.default = ClearWorld;
