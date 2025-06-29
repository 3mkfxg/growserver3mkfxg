"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    base;
    peer;
    text;
    args;
    opt;
    constructor(base, peer, text, args) {
        this.base = base;
        this.peer = peer;
        this.text = text;
        this.args = args;
        this.opt = {
            command: [],
            description: "",
            cooldown: 1,
            ratelimit: 1,
            category: "",
            usage: "",
            example: [],
            permission: []
        };
    }
    async execute() { }
}
exports.Command = Command;
