"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GazzetteEnd = void 0;
const consola_1 = __importDefault(require("consola"));
class GazzetteEnd {
    base;
    peer;
    action;
    constructor(base, peer, action) {
        this.base = base;
        this.peer = peer;
        this.action = action;
    }
    async execute() {
        consola_1.default.info("GazzetteEnd fired 🔥🔥");
    }
}
exports.GazzetteEnd = GazzetteEnd;
