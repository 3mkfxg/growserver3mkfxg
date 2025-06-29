"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogMap = void 0;
const GazetteEnd_1 = require("./GazetteEnd");
const FindItem_1 = require("./FindItem");
const FindItemEnd_1 = require("./FindItemEnd");
const AreaLockEdit_1 = require("./AreaLockEdit");
const ConfirmClearWorld_1 = require("./ConfirmClearWorld");
const DoorEdit_1 = require("./DoorEdit");
const DropEnd_1 = require("./DropEnd");
const SignEdit_1 = require("./SignEdit");
const TrashEnd_1 = require("./TrashEnd");
exports.DialogMap = {
    ["gazzette_end"]: GazetteEnd_1.GazzetteEnd,
    ["find_item"]: FindItem_1.FindItem,
    ["find_item_end"]: FindItemEnd_1.FindItemEnd,
    ["area_lock_edit"]: AreaLockEdit_1.AreaLockEdit,
    ["confirm_clearworld"]: ConfirmClearWorld_1.ConfirmClearWorld,
    ["door_edit"]: DoorEdit_1.DoorEdit,
    ["drop_end"]: DropEnd_1.DropEnd,
    ["sign_edit"]: SignEdit_1.SignEdit,
    ["trash_end"]: TrashEnd_1.TrashEnd
};
