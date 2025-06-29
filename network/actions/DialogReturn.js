"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogReturn = void 0;
const index_1 = require("../dialogs/index");
const consola_1 = __importDefault(require("consola"));
class DialogReturn {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(action) {
        try {
            const Class = index_1.DialogMap[action.dialog_name];
            if (!Class)
                throw new Error(`No Dialog class found with dialog name ${action.dialog_name}`);
            const dialog = new Class(this.base, this.peer, action);
            await dialog.execute();
        }
        catch (e) {
            consola_1.default.warn(e);
        }
    }
}
exports.DialogReturn = DialogReturn;
