"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
class Ping extends Command_1.Command {
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
            command: ["ping", "pong"],
            description: "Ping pong",
            cooldown: 5,
            ratelimit: 1,
            category: "`oBasic",
            usage: "/ping",
            example: ["/ping"],
            permission: [Constants_1.ROLE.BASIC, Constants_1.ROLE.SUPPORTER, Constants_1.ROLE.DEVELOPER]
        };
    }
    async execute() {
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Pong :>"));
    }
}
exports.default = Ping;
