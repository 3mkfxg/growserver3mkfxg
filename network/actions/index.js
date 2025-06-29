"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMap = void 0;
const RefreshItemData_1 = require("./RefreshItemData");
const EnterGame_1 = require("./EnterGame");
const QuitToExit_1 = require("./QuitToExit");
const Quit_1 = require("./Quit");
const JoinRequest_1 = require("./JoinRequest");
const DialogReturn_1 = require("./DialogReturn");
const Input_1 = require("./Input");
const Respawn_1 = require("./Respawn");
const RespawnSpike_1 = require("./RespawnSpike");
const Drop_1 = require("./Drop");
const Wrench_1 = require("./Wrench");
const StoreBuy_1 = require("./StoreBuy");
const StoreHandler_1 = require("./StoreHandler");
exports.ActionMap = {
    ["refresh_item_data"]: RefreshItemData_1.RefreshItemData,
    ["enter_game"]: EnterGame_1.EnterGame,
    ["quit_to_exit"]: QuitToExit_1.QuitToExit,
    ["quit"]: Quit_1.Quit,
    ["join_request"]: JoinRequest_1.JoinRequest,
    ["dialog_return"]: DialogReturn_1.DialogReturn,
    ["input"]: Input_1.Input,
    ["respawn"]: Respawn_1.Respawn,
    ["respawn_spike"]: RespawnSpike_1.RespawnSpike,
    ["drop"]: Drop_1.Drop,
    ["wrench"]: Wrench_1.Wrench,
    ["buy"]: StoreBuy_1.StoreBuy,
    ["store"]: StoreHandler_1.StoreHandler
};
