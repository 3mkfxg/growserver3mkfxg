"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterGame = void 0;
const growtopia_js_1 = require("growtopia.js");
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
class EnterGame {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(_action) {
        const tes = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("`wThe GrowServer Gazette``", "5016", "big")
            .addSpacer("small")
            .raw("add_image_button||interface/banner-transparent.rttex|bannerlayout|||\n")
            .addTextBox("Welcome to GrowServer")
            .addQuickExit()
            .endDialog("gazzette_end", "Cancel", "Ok")
            .str();
        this.peer.send(growtopia_js_1.Variant.from("OnRequestWorldSelectMenu", `
add_heading|Top Worlds|
add_floater|START|0|0.5|3529161471
add_floater|START1|0|0.5|3529161471
add_floater|START2|0|0.5|3529161471
${Array.from(this.base.cache.worlds.values())
            .sort((a, b) => (b.playerCount || 0) - (a.playerCount || 0))
            .slice(0, 6)
            .map((v) => {
            if (v.playerCount)
                return `add_floater|${v.name}${v.playerCount ? ` (${v.playerCount})` : ""}|0|0.5|3529161471\n`;
            else
                return "";
        })
            .join("\n")}
add_heading|Recently Visited Worlds<CR>|
${this.peer.data.lastVisitedWorlds
            ?.reverse()
            .map((v) => {
            const count = this.base.cache.worlds.get(v)?.playerCount || 0;
            return `add_floater|${v}${count ? ` (${count})` : ""}|0|0.5|3417414143\n`;
        })
            .join("\n")}
`), growtopia_js_1.Variant.from("OnConsoleMessage", `Welcome ${this.peer.name} Where would you like to go?`), growtopia_js_1.Variant.from({ delay: 100 }, "OnDialogRequest", tes));
    }
}
exports.EnterGame = EnterGame;
