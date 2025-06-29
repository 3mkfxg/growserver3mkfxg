"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IActionPacket = void 0;
const consola_1 = __importDefault(require("consola"));
const Utils_1 = require("../utils/Utils");
const index_1 = require("./actions/index");
class IActionPacket {
    base;
    peer;
    chunk;
    obj;
    constructor(base, peer, chunk) {
        this.base = base;
        this.peer = peer;
        this.chunk = chunk;
        this.obj = (0, Utils_1.parseAction)(chunk);
    }
    async execute() {
        if (!this.obj.action)
            return;
        consola_1.default.debug("[DEBUG] Receive action packet:\n", this.obj);
        const actionType = this.obj.action;
        try {
            const Class = index_1.ActionMap[actionType];
            if (!Class)
                throw new Error(`No Action class found with action name ${actionType}`);
            const action = new Class(this.base, this.peer);
            await action.execute(this.obj);
        }
        catch (e) {
            consola_1.default.warn(e);
        }
    }
}
exports.IActionPacket = IActionPacket;
