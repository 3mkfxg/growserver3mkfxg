"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TankMap = void 0;
const Constants_1 = require("../../Constants");
const TileChangeReq_1 = require("./TileChangeReq");
const Disconnect_1 = require("./Disconnect");
const SetIconState_1 = require("./SetIconState");
const State_1 = require("./State");
const ItemActiveObjectReq_1 = require("./ItemActiveObjectReq");
const TileActiveReq_1 = require("./TileActiveReq");
const ItemActiveReq_1 = require("./ItemActiveReq");
const AppCheckResponsePack_1 = require("./AppCheckResponsePack");
exports.TankMap = {
    [Constants_1.TankTypes.TILE_CHANGE_REQUEST]: TileChangeReq_1.TileChangeReq,
    [Constants_1.TankTypes.DISCONNECT]: Disconnect_1.Disconnect,
    [Constants_1.TankTypes.SET_ICON_STATE]: SetIconState_1.SetIconState,
    [Constants_1.TankTypes.STATE]: State_1.State,
    [Constants_1.TankTypes.ITEM_ACTIVATE_OBJECT_REQUEST]: ItemActiveObjectReq_1.ItemActiveObjectReq,
    [Constants_1.TankTypes.ITEM_ACTIVATE_REQUEST]: ItemActiveReq_1.ItemActiveReq,
    [Constants_1.TankTypes.TILE_ACTIVATE_REQUEST]: TileActiveReq_1.TileActiveReq,
    [Constants_1.TankTypes.APP_CHECK_RESPONSE]: AppCheckResponsePack_1.AppCheckResponsePack
};
