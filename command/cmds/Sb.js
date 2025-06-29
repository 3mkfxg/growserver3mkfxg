"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
class Sb extends Command_1.Command {
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
            command: ["sb"],
            description: "Broadcast a message to everyone",
            cooldown: 5,
            ratelimit: 1,
            category: "`oBasic",
            usage: "/sb <message>",
            example: ["/sb hello"],
            permission: [Constants_1.ROLE.BASIC, Constants_1.ROLE.SUPPORTER, Constants_1.ROLE.DEVELOPER],
        };
    }
    async execute() {
        if (this.args.length === 0)
            return this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Message are required."));
        const world = this.peer.currentWorld();
        const msg = this.args.join(" ");
        const jammed = world?.data.jammers?.find((v) => v.type === "signal")?.enabled;
        this.peer.every((p) => {
            // Send message
            p.send(growtopia_js_1.Variant.from("OnConsoleMessage", `CP:0_PL:4_OID:_CT:[SB]_ \`5**\`\` from \`$\`2${this.peer.name} \`\`\`\`(in \`$${jammed ? "`4JAMMED``" : this.peer.data.world}\`\`) ** :\`\` \`#${msg}`), growtopia_js_1.TextPacket.from(growtopia_js_1.PacketTypes.ACTION, "action|play_sfx", `file|audio/beep.wav`, `delayMS|0`));
        });
    }
}
exports.default = Sb;
