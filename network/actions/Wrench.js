"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrench = void 0;
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class Wrench {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    InfoDialog() {
        // for now will put basic info
        return new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon(`${this.peer.name}\`w's Information (uid: ${this.peer.data.id_user})`, 32, "big")
            .addTextBox(`Player Infomation`)
            .addSmallText(`Level: ${this.peer.data.level || 1} (${this.peer.data.exp}/${this.peer.calculateRequiredLevelXp(this.peer.data.level)})`)
            .addSmallText(`Gems: ${this.peer.data.gems || 0}`)
            .addSmallText(`NetID: ${this.peer.data.netID}`);
    }
    async execute(_action) {
        const dialog = this.InfoDialog()
            .endDialog("wrench_end", "Cancel", "OK")
            .addQuickExit()
            .str();
        this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.Wrench = Wrench;
