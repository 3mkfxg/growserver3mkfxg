"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
class SaveServer extends Command_1.Command {
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
            command: ["saveserver", "save"],
            description: "Save the server into database",
            cooldown: 5,
            ratelimit: 1,
            category: "`bDev",
            usage: "/saveserver",
            example: ["/saveserver"],
            permission: [Constants_1.ROLE.DEVELOPER]
        };
    }
    async execute() {
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Saving all worlds & players..."));
        // Use the existing base instance instead of creating a new one
        await this.base.saveAll(false);
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Successfully saved all worlds & players"));
    }
}
exports.default = SaveServer;
