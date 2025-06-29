"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreHandler = void 0;
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
// Add items here
class StoreHandler {
    base;
    peer;
    mainItems = [
        {
            name: "test",
            title: "Handler Test",
            description: "hmmmmmm",
            image: "interface/large/store_buttons/store_buttons.rttex",
            imagePos: { x: 0, y: 0 },
            cost: 20000
        },
        {
            name: "test",
            title: "Handler Test",
            description: "hmmmmmmmmmmmm",
            image: "interface/large/store_buttons/store_buttons.rttex",
            imagePos: { x: 1, y: 0 },
            cost: 15000
        }
    ];
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    addMainItems(dialog) {
        this.mainItems.forEach((item) => {
            dialog.addStoreButton(item.name, item.title, item.description, item.image || "", item.imagePos || { x: 0, y: 0 }, item.cost || "");
        });
        return dialog;
    }
    async execute(_action) {
        const dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .raw("enable_tabs|1")
            .addSpacer("small")
            // Tabs
            .raw("add_tab_button|main_menu|main|interface/large/btn_shop2.rttex||1|0|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_tab_button|player_menu|player|interface/large/btn_shop2.rttex||0|1|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_tab_button|locks_menu|packs|interface/large/btn_shop2.rttex||0|3|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_tab_button|itempacks_menu|bigitems|interface/large/btn_shop2.rttex||0|4|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_tab_button|creativity_menu|weather|interface/large/btn_shop2.rttex||0|5|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_tab_button|token_menu|growtoken|interface/large/btn_shop2.rttex||0|2|0|0||||-1|-1|||0|0|")
            .addSpacer("small")
            .raw("add_banner|interface/large/gui_shop_featured_header.rttex|0|1|")
            .addSpacer("small");
        // Items
        this.addMainItems(dialog);
        const finalDialog = dialog
            .endDialog("store_end", "Cancel", "OK")
            .addQuickExit()
            .str();
        this.peer.send(growtopia_js_1.Variant.from("OnSetVouchers", 0), growtopia_js_1.Variant.from("OnStoreRequest", finalDialog));
    }
}
exports.StoreHandler = StoreHandler;
