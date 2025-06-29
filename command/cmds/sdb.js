"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
class Sdb extends Command_1.Command {
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
            command: ["sdb"],
            description: "Send a global message to everyone via a dialog box",
            cooldown: 5,
            ratelimit: 1,
            category: "`bDev",
            usage: "/sdb <message>",
            example: ["/sdb Hello everyone!"],
            permission: [Constants_1.ROLE.DEVELOPER],
        };
    }
    async execute() {
        if (this.args.length === 0)
            return this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Message are required."));
        const message = this.args.join(" ");
        const senderName = this.peer.name;
        const world = this.peer.currentWorld();
        const jammed = world?.data.jammers?.find((v) => v.type === "signal")?.enabled;
        // Dialog box creation
        const dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Super Duper Broadcast", "2480", "big")
            .addSpacer("small")
            .addSmallText(`\`oMessage from: \`$${senderName}`);
        // If no jammer, show the world name
        if (!jammed) {
            dialog.addSmallText(`\`oWorld: \`o${this.peer.data.world}`);
        }
        else {
            dialog.addSmallText("`4JAMMED`");
        }
        dialog
            .addSpacer("small")
            .addSmallText(`\`5${message}`)
            .addQuickExit()
            .endDialog("ok", "Close", "");
        // Send dialog box and play beep sound to all players
        this.peer.every((player) => {
            player.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()), growtopia_js_1.TextPacket.from(growtopia_js_1.PacketTypes.ACTION, "action|play_sfx", `file|audio/beep.wav`, `delayMS|0`));
        });
        // Confirmation to sender
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `\`2Super Duper Broadcast sent to all players.`));
    }
}
exports.default = Sdb;
