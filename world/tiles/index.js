"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileParse = exports.TileMap = void 0;
const Constants_1 = require("../../Constants");
const DoorTile_1 = require("./DoorTile");
const NormalTile_1 = require("./NormalTile");
const SignTile_1 = require("./SignTile");
const consola_1 = __importDefault(require("consola"));
const LockTile_1 = require("./LockTile");
const HeartMonitorTile_1 = require("./HeartMonitorTile");
const DisplayBlockTile_1 = require("./DisplayBlockTile");
const SwitcheROO_1 = require("./SwitcheROO");
const WeatherTile_1 = require("./WeatherTile");
const DiceTile_1 = require("./DiceTile");
const SeedTile_1 = require("./SeedTile");
const TileMap = {
    [Constants_1.ActionTypes.DOOR]: DoorTile_1.DoorTile,
    [Constants_1.ActionTypes.MAIN_DOOR]: DoorTile_1.DoorTile,
    [Constants_1.ActionTypes.PORTAL]: DoorTile_1.DoorTile,
    [Constants_1.ActionTypes.SIGN]: SignTile_1.SignTile,
    [Constants_1.ActionTypes.LOCK]: LockTile_1.LockTile,
    [Constants_1.ActionTypes.HEART_MONITOR]: HeartMonitorTile_1.HeartMonitorTile,
    [Constants_1.ActionTypes.DISPLAY_BLOCK]: DisplayBlockTile_1.DisplayBlockTile,
    [Constants_1.ActionTypes.SWITCHEROO]: SwitcheROO_1.SwitcheROO,
    [Constants_1.ActionTypes.WEATHER_MACHINE]: WeatherTile_1.WeatherTile,
    [Constants_1.ActionTypes.DICE]: DiceTile_1.DiceTile,
    [Constants_1.ActionTypes.SEED]: SeedTile_1.SeedTile
};
exports.TileMap = TileMap;
const tileParse = async (actionType, base, world, block) => {
    try {
        let Class = TileMap[actionType];
        if (!Class)
            Class = NormalTile_1.NormalTile;
        const tile = new Class(base, world, block);
        await tile.init();
        const val = await tile.parse();
        return val;
    }
    catch (e) {
        consola_1.default.warn(e);
        const Class = NormalTile_1.NormalTile;
        const tile = new Class(base, world, block);
        await tile.init();
        const val = await tile.parse();
        return val;
    }
};
exports.tileParse = tileParse;
