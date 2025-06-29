"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshItemData = void 0;
const growtopia_js_1 = require("growtopia.js");
const Constants_1 = require("../../Constants");
class RefreshItemData {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(_action) {
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "One moment. Updating item data..."), growtopia_js_1.TankPacket.from({
            type: Constants_1.TankTypes.SEND_ITEM_DATABASE_DATA,
            data: () => this.base.items.content
        }));
    }
}
exports.RefreshItemData = RefreshItemData;
