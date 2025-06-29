"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherIdMap = exports.StateFlags = exports.ModsEffects = exports.CharacterState = exports.NameStyles = exports.BlockFlags = exports.TileIgnore = exports.LOCKS = exports.ActionTypes = exports.TileCollisionTypes = exports.TileExtraTypes = exports.TileFlags = exports.TankTypes = exports.CLOTH_MAP = exports.ClothTypes = exports.ROLE = exports.Y_END_DIRT = exports.Y_LAVA_START = exports.Y_START_DIRT = exports.STRING_CIPHER_KEY = exports.WORLD_SIZE = exports.PacketTypes = exports.ITEMS_DAT_FETCH_URL = exports.ITEMS_DAT_URL = void 0;
exports.ITEMS_DAT_URL = "https://raw.githubusercontent.com/StileDevs/itemsdat-archive/refs/heads/main";
exports.ITEMS_DAT_FETCH_URL = "https://raw.githubusercontent.com/StileDevs/itemsdat-archive/refs/heads/main/latest.json";
var PacketTypes;
(function (PacketTypes) {
    PacketTypes[PacketTypes["HELLO"] = 1] = "HELLO";
    PacketTypes[PacketTypes["STR"] = 2] = "STR";
    PacketTypes[PacketTypes["ACTION"] = 3] = "ACTION";
    PacketTypes[PacketTypes["TANK"] = 4] = "TANK";
})(PacketTypes || (exports.PacketTypes = PacketTypes = {}));
exports.WORLD_SIZE = {
    WIDTH: 100,
    HEIGHT: 60
};
exports.STRING_CIPHER_KEY = "PBG892FXX982ABC*";
exports.Y_START_DIRT = 24;
exports.Y_LAVA_START = 50;
exports.Y_END_DIRT = 55;
exports.ROLE = {
    DEVELOPER: "1",
    BASIC: "2",
    SUPPORTER: "3"
};
var ClothTypes;
(function (ClothTypes) {
    ClothTypes[ClothTypes["HAIR"] = 0] = "HAIR";
    ClothTypes[ClothTypes["SHIRT"] = 1] = "SHIRT";
    ClothTypes[ClothTypes["PANTS"] = 2] = "PANTS";
    ClothTypes[ClothTypes["FEET"] = 3] = "FEET";
    ClothTypes[ClothTypes["FACE"] = 4] = "FACE";
    ClothTypes[ClothTypes["HAND"] = 5] = "HAND";
    ClothTypes[ClothTypes["BACK"] = 6] = "BACK";
    ClothTypes[ClothTypes["MASK"] = 7] = "MASK";
    ClothTypes[ClothTypes["NECKLACE"] = 8] = "NECKLACE";
    ClothTypes[ClothTypes["ANCES"] = 9] = "ANCES";
})(ClothTypes || (exports.ClothTypes = ClothTypes = {}));
exports.CLOTH_MAP = {
    [ClothTypes.ANCES]: "ances",
    [ClothTypes.BACK]: "back",
    [ClothTypes.FACE]: "face",
    [ClothTypes.FEET]: "feet",
    [ClothTypes.HAIR]: "hair",
    [ClothTypes.HAND]: "hand",
    [ClothTypes.MASK]: "mask",
    [ClothTypes.NECKLACE]: "necklace",
    [ClothTypes.PANTS]: "pants",
    [ClothTypes.SHIRT]: "shirt"
};
var TankTypes;
(function (TankTypes) {
    TankTypes[TankTypes["STATE"] = 0] = "STATE";
    TankTypes[TankTypes["CALL_FUNCTION"] = 1] = "CALL_FUNCTION";
    TankTypes[TankTypes["UPDATE_STATUS"] = 2] = "UPDATE_STATUS";
    TankTypes[TankTypes["TILE_CHANGE_REQUEST"] = 3] = "TILE_CHANGE_REQUEST";
    TankTypes[TankTypes["SEND_MAP_DATA"] = 4] = "SEND_MAP_DATA";
    TankTypes[TankTypes["SEND_TILE_UPDATE_DATA"] = 5] = "SEND_TILE_UPDATE_DATA";
    TankTypes[TankTypes["SEND_TILE_UPDATE_DATA_MULTIPLE"] = 6] = "SEND_TILE_UPDATE_DATA_MULTIPLE";
    TankTypes[TankTypes["TILE_ACTIVATE_REQUEST"] = 7] = "TILE_ACTIVATE_REQUEST";
    TankTypes[TankTypes["TILE_APPLY_DAMAGE"] = 8] = "TILE_APPLY_DAMAGE";
    TankTypes[TankTypes["SEND_INVENTORY_STATE"] = 9] = "SEND_INVENTORY_STATE";
    TankTypes[TankTypes["ITEM_ACTIVATE_REQUEST"] = 10] = "ITEM_ACTIVATE_REQUEST";
    TankTypes[TankTypes["ITEM_ACTIVATE_OBJECT_REQUEST"] = 11] = "ITEM_ACTIVATE_OBJECT_REQUEST";
    TankTypes[TankTypes["SEND_TILE_TREE_STATE"] = 12] = "SEND_TILE_TREE_STATE";
    TankTypes[TankTypes["MODIFY_ITEM_INVENTORY"] = 13] = "MODIFY_ITEM_INVENTORY";
    TankTypes[TankTypes["ITEM_CHANGE_OBJECT"] = 14] = "ITEM_CHANGE_OBJECT";
    TankTypes[TankTypes["SEND_LOCK"] = 15] = "SEND_LOCK";
    TankTypes[TankTypes["SEND_ITEM_DATABASE_DATA"] = 16] = "SEND_ITEM_DATABASE_DATA";
    TankTypes[TankTypes["SEND_PARTICLE_EFFECT"] = 17] = "SEND_PARTICLE_EFFECT";
    TankTypes[TankTypes["SET_ICON_STATE"] = 18] = "SET_ICON_STATE";
    TankTypes[TankTypes["ITEM_EFFECT"] = 19] = "ITEM_EFFECT";
    TankTypes[TankTypes["SET_CHARACTER_STATE"] = 20] = "SET_CHARACTER_STATE";
    TankTypes[TankTypes["PING_REPLY"] = 21] = "PING_REPLY";
    TankTypes[TankTypes["PING_REQUEST"] = 22] = "PING_REQUEST";
    TankTypes[TankTypes["GOT_PUNCHED"] = 23] = "GOT_PUNCHED";
    TankTypes[TankTypes["APP_CHECK_RESPONSE"] = 24] = "APP_CHECK_RESPONSE";
    TankTypes[TankTypes["APP_INTEGRITY_FAIL"] = 25] = "APP_INTEGRITY_FAIL";
    TankTypes[TankTypes["DISCONNECT"] = 26] = "DISCONNECT";
    TankTypes[TankTypes["BATTLE_JOIN"] = 27] = "BATTLE_JOIN";
    TankTypes[TankTypes["BATTLE_EVEN"] = 28] = "BATTLE_EVEN";
    TankTypes[TankTypes["USE_DOOR"] = 29] = "USE_DOOR";
    TankTypes[TankTypes["SEND_PARENTAL"] = 30] = "SEND_PARENTAL";
    TankTypes[TankTypes["GONE_FISHIN"] = 31] = "GONE_FISHIN";
    TankTypes[TankTypes["STEAM"] = 32] = "STEAM";
    TankTypes[TankTypes["PET_BATTLE"] = 33] = "PET_BATTLE";
    TankTypes[TankTypes["NPC"] = 34] = "NPC";
    TankTypes[TankTypes["SPECIAL"] = 35] = "SPECIAL";
    TankTypes[TankTypes["SEND_PARTICLE_EFFECT_V2"] = 36] = "SEND_PARTICLE_EFFECT_V2";
    TankTypes[TankTypes["ACTIVE_ARROW_TO_ITEM"] = 37] = "ACTIVE_ARROW_TO_ITEM";
    TankTypes[TankTypes["SELECT_TILE_INDEX"] = 38] = "SELECT_TILE_INDEX";
    TankTypes[TankTypes["SEND_PLAYER_TRIBUTE_DATA"] = 39] = "SEND_PLAYER_TRIBUTE_DATA";
})(TankTypes || (exports.TankTypes = TankTypes = {}));
var TileFlags;
(function (TileFlags) {
    TileFlags[TileFlags["TILEEXTRA"] = 1] = "TILEEXTRA";
    TileFlags[TileFlags["LOCKED"] = 2] = "LOCKED";
    TileFlags[TileFlags["SEED"] = 16] = "SEED";
    TileFlags[TileFlags["TREE"] = 25] = "TREE";
    TileFlags[TileFlags["FLIPPED"] = 32] = "FLIPPED";
    TileFlags[TileFlags["ROTATED_LEFT"] = 48] = "ROTATED_LEFT";
    TileFlags[TileFlags["OPEN"] = 64] = "OPEN";
    TileFlags[TileFlags["PUBLIC"] = 128] = "PUBLIC";
    TileFlags[TileFlags["SILENCED"] = 512] = "SILENCED";
    TileFlags[TileFlags["WATER"] = 1024] = "WATER";
    TileFlags[TileFlags["FIRE"] = 4096] = "FIRE";
    TileFlags[TileFlags["RED"] = 8192] = "RED";
    TileFlags[TileFlags["BLUE"] = 32768] = "BLUE";
    TileFlags[TileFlags["GREEN"] = 16384] = "GREEN";
    TileFlags[TileFlags["YELLOW"] = 24576] = "YELLOW";
    TileFlags[TileFlags["PURPLE"] = 40960] = "PURPLE";
})(TileFlags || (exports.TileFlags = TileFlags = {}));
var TileExtraTypes;
(function (TileExtraTypes) {
    TileExtraTypes[TileExtraTypes["NONE"] = 0] = "NONE";
    TileExtraTypes[TileExtraTypes["DOOR"] = 1] = "DOOR";
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    TileExtraTypes[TileExtraTypes["MAIN_DOOR"] = 1] = "MAIN_DOOR";
    TileExtraTypes[TileExtraTypes["SIGN"] = 2] = "SIGN";
    TileExtraTypes[TileExtraTypes["LOCK"] = 3] = "LOCK";
    TileExtraTypes[TileExtraTypes["SEED"] = 4] = "SEED";
    TileExtraTypes[TileExtraTypes["MAILBOX"] = 6] = "MAILBOX";
    TileExtraTypes[TileExtraTypes["BULLETIN"] = 7] = "BULLETIN";
    TileExtraTypes[TileExtraTypes["DICE"] = 8] = "DICE";
    TileExtraTypes[TileExtraTypes["PROVIDER"] = 9] = "PROVIDER";
    TileExtraTypes[TileExtraTypes["ACHIEVEMENT"] = 10] = "ACHIEVEMENT";
    TileExtraTypes[TileExtraTypes["HEART_MONITOR"] = 11] = "HEART_MONITOR";
    TileExtraTypes[TileExtraTypes["DONATION_BLOCK"] = 12] = "DONATION_BLOCK";
    TileExtraTypes[TileExtraTypes["TOYBOX"] = 13] = "TOYBOX";
    TileExtraTypes[TileExtraTypes["MANNEQUIN"] = 14] = "MANNEQUIN";
    TileExtraTypes[TileExtraTypes["MAGIC_EGG"] = 15] = "MAGIC_EGG";
    TileExtraTypes[TileExtraTypes["GAME_RESOURCES"] = 16] = "GAME_RESOURCES";
    TileExtraTypes[TileExtraTypes["GAME_GENERATOR"] = 17] = "GAME_GENERATOR";
    TileExtraTypes[TileExtraTypes["XENONITE"] = 18] = "XENONITE";
    TileExtraTypes[TileExtraTypes["DESSUP"] = 19] = "DESSUP";
    TileExtraTypes[TileExtraTypes["CRYSTAL"] = 20] = "CRYSTAL";
    TileExtraTypes[TileExtraTypes["BURGLAR"] = 21] = "BURGLAR";
    TileExtraTypes[TileExtraTypes["SPOTLIGHT"] = 22] = "SPOTLIGHT";
    TileExtraTypes[TileExtraTypes["DISPLAY_BLOCK"] = 23] = "DISPLAY_BLOCK";
    TileExtraTypes[TileExtraTypes["VENDING_MACHINE"] = 24] = "VENDING_MACHINE";
    TileExtraTypes[TileExtraTypes["FISHTANK"] = 25] = "FISHTANK";
    TileExtraTypes[TileExtraTypes["SOLAR"] = 26] = "SOLAR";
    TileExtraTypes[TileExtraTypes["FORGE"] = 27] = "FORGE";
    TileExtraTypes[TileExtraTypes["GIVING_TREE"] = 28] = "GIVING_TREE";
    TileExtraTypes[TileExtraTypes["GIVING_TREE_STUMP"] = 29] = "GIVING_TREE_STUMP";
    TileExtraTypes[TileExtraTypes["STEAM_ORGAN"] = 30] = "STEAM_ORGAN";
    TileExtraTypes[TileExtraTypes["TAMAGOTCHI"] = 31] = "TAMAGOTCHI";
    TileExtraTypes[TileExtraTypes["SWING"] = 32] = "SWING";
    TileExtraTypes[TileExtraTypes["FLAG"] = 33] = "FLAG";
    TileExtraTypes[TileExtraTypes["LOBSTER_TRAP"] = 34] = "LOBSTER_TRAP";
    TileExtraTypes[TileExtraTypes["ART_CANVAS"] = 35] = "ART_CANVAS";
    TileExtraTypes[TileExtraTypes["BATTLE_CAGE"] = 36] = "BATTLE_CAGE";
    TileExtraTypes[TileExtraTypes["PET_TRAINER"] = 37] = "PET_TRAINER";
    TileExtraTypes[TileExtraTypes["STEAM_ENGINE"] = 38] = "STEAM_ENGINE";
    TileExtraTypes[TileExtraTypes["LOCKBOT"] = 39] = "LOCKBOT";
    TileExtraTypes[TileExtraTypes["WEATHER_SPECIAL"] = 40] = "WEATHER_SPECIAL";
    TileExtraTypes[TileExtraTypes["SPIRIT_STORAGE"] = 41] = "SPIRIT_STORAGE";
    TileExtraTypes[TileExtraTypes["UNKNOWN_1"] = 42] = "UNKNOWN_1";
    TileExtraTypes[TileExtraTypes["DISPLAY_SHELF"] = 43] = "DISPLAY_SHELF";
    TileExtraTypes[TileExtraTypes["VIP_ENTRANCE"] = 44] = "VIP_ENTRANCE";
    TileExtraTypes[TileExtraTypes["CHALLENGE_TIMER"] = 45] = "CHALLENGE_TIMER";
    TileExtraTypes[TileExtraTypes["CHALLENGE_FLAG"] = 46] = "CHALLENGE_FLAG";
    TileExtraTypes[TileExtraTypes["FISH_MOUNT"] = 47] = "FISH_MOUNT";
    TileExtraTypes[TileExtraTypes["PORTRAIT"] = 48] = "PORTRAIT";
    TileExtraTypes[TileExtraTypes["WEATHER_SPECIAL2"] = 49] = "WEATHER_SPECIAL2";
    TileExtraTypes[TileExtraTypes["FOSSIL_PREP"] = 50] = "FOSSIL_PREP";
    TileExtraTypes[TileExtraTypes["DNA_MACHINE"] = 51] = "DNA_MACHINE";
    TileExtraTypes[TileExtraTypes["MAGPLANT"] = 62] = "MAGPLANT";
    TileExtraTypes[TileExtraTypes["GROWSCAN"] = 66] = "GROWSCAN";
    TileExtraTypes[TileExtraTypes["TESSERACT_MANIPULATOR"] = 69] = "TESSERACT_MANIPULATOR";
    TileExtraTypes[TileExtraTypes["GAIA_HEART"] = 70] = "GAIA_HEART";
    TileExtraTypes[TileExtraTypes["TECHNO_ORGANIC_ENGINE"] = 71] = "TECHNO_ORGANIC_ENGINE";
    TileExtraTypes[TileExtraTypes["KRANKEN_GALACTIC"] = 80] = "KRANKEN_GALACTIC";
    TileExtraTypes[TileExtraTypes["WEATHER_INFINITY"] = 77] = "WEATHER_INFINITY";
})(TileExtraTypes || (exports.TileExtraTypes = TileExtraTypes = {}));
var TileCollisionTypes;
(function (TileCollisionTypes) {
    TileCollisionTypes[TileCollisionTypes["NONE"] = 0] = "NONE";
    TileCollisionTypes[TileCollisionTypes["NORMAL"] = 1] = "NORMAL";
    TileCollisionTypes[TileCollisionTypes["JUMP_THROUGH"] = 2] = "JUMP_THROUGH";
    TileCollisionTypes[TileCollisionTypes["GATEWAY"] = 3] = "GATEWAY";
    TileCollisionTypes[TileCollisionTypes["IF_OFF"] = 4] = "IF_OFF";
    TileCollisionTypes[TileCollisionTypes["ONE_WAY"] = 5] = "ONE_WAY";
    TileCollisionTypes[TileCollisionTypes["VIP"] = 6] = "VIP";
    TileCollisionTypes[TileCollisionTypes["WATERFALL"] = 7] = "WATERFALL";
    TileCollisionTypes[TileCollisionTypes["ADVENTURE"] = 8] = "ADVENTURE";
    TileCollisionTypes[TileCollisionTypes["IF_ON"] = 9] = "IF_ON";
    TileCollisionTypes[TileCollisionTypes["TEAM_ENTRANCE"] = 10] = "TEAM_ENTRANCE";
    TileCollisionTypes[TileCollisionTypes["GUILD"] = 11] = "GUILD";
    TileCollisionTypes[TileCollisionTypes["CLOUD"] = 12] = "CLOUD";
    TileCollisionTypes[TileCollisionTypes["FRIEND_ENTRANCE"] = 13] = "FRIEND_ENTRANCE";
})(TileCollisionTypes || (exports.TileCollisionTypes = TileCollisionTypes = {}));
var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["FIST"] = 0] = "FIST";
    ActionTypes[ActionTypes["WRENCH"] = 1] = "WRENCH";
    ActionTypes[ActionTypes["DOOR"] = 2] = "DOOR";
    ActionTypes[ActionTypes["LOCK"] = 3] = "LOCK";
    ActionTypes[ActionTypes["GEMS"] = 4] = "GEMS";
    ActionTypes[ActionTypes["TREASURE"] = 5] = "TREASURE";
    ActionTypes[ActionTypes["DEADLY_BLOCK"] = 6] = "DEADLY_BLOCK";
    ActionTypes[ActionTypes["TRAMPOLINE"] = 7] = "TRAMPOLINE";
    ActionTypes[ActionTypes["CONSUMABLE"] = 8] = "CONSUMABLE";
    ActionTypes[ActionTypes["GATEWAY"] = 9] = "GATEWAY";
    ActionTypes[ActionTypes["SIGN"] = 10] = "SIGN";
    ActionTypes[ActionTypes["SFX_WITH_EXTRA_FRAME"] = 11] = "SFX_WITH_EXTRA_FRAME";
    ActionTypes[ActionTypes["BOOMBOX"] = 12] = "BOOMBOX";
    ActionTypes[ActionTypes["MAIN_DOOR"] = 13] = "MAIN_DOOR";
    ActionTypes[ActionTypes["PLATFORM"] = 14] = "PLATFORM";
    ActionTypes[ActionTypes["BEDROCK"] = 15] = "BEDROCK";
    ActionTypes[ActionTypes["LAVA"] = 16] = "LAVA";
    ActionTypes[ActionTypes["FOREGROUND"] = 17] = "FOREGROUND";
    ActionTypes[ActionTypes["BACKGROUND"] = 18] = "BACKGROUND";
    ActionTypes[ActionTypes["SEED"] = 19] = "SEED";
    ActionTypes[ActionTypes["CLOTHES"] = 20] = "CLOTHES";
    ActionTypes[ActionTypes["FOREGROUND_WITH_EXTRA_FRAME"] = 21] = "FOREGROUND_WITH_EXTRA_FRAME";
    ActionTypes[ActionTypes["BACKGD_SFX_EXTRA_FRAME"] = 22] = "BACKGD_SFX_EXTRA_FRAME";
    ActionTypes[ActionTypes["BACK_BOOMBOX"] = 23] = "BACK_BOOMBOX";
    ActionTypes[ActionTypes["BOUNCY"] = 24] = "BOUNCY";
    ActionTypes[ActionTypes["POINTY"] = 25] = "POINTY";
    ActionTypes[ActionTypes["PORTAL"] = 26] = "PORTAL";
    ActionTypes[ActionTypes["CHECKPOINT"] = 27] = "CHECKPOINT";
    ActionTypes[ActionTypes["SHEET_MUSIC"] = 28] = "SHEET_MUSIC";
    ActionTypes[ActionTypes["ICE"] = 29] = "ICE";
    ActionTypes[ActionTypes["SWITCHEROO"] = 31] = "SWITCHEROO";
    ActionTypes[ActionTypes["CHEST"] = 32] = "CHEST";
    ActionTypes[ActionTypes["MAILBOX"] = 33] = "MAILBOX";
    ActionTypes[ActionTypes["BULLETIN"] = 34] = "BULLETIN";
    ActionTypes[ActionTypes["PINATA"] = 35] = "PINATA";
    ActionTypes[ActionTypes["DICE"] = 36] = "DICE";
    ActionTypes[ActionTypes["CHEMICAL"] = 37] = "CHEMICAL";
    ActionTypes[ActionTypes["PROVIDER"] = 38] = "PROVIDER";
    ActionTypes[ActionTypes["LAB"] = 39] = "LAB";
    ActionTypes[ActionTypes["ACHIEVEMENT"] = 40] = "ACHIEVEMENT";
    ActionTypes[ActionTypes["WEATHER_MACHINE"] = 41] = "WEATHER_MACHINE";
    ActionTypes[ActionTypes["SCORE_BOARD"] = 42] = "SCORE_BOARD";
    ActionTypes[ActionTypes["SUNGATE"] = 43] = "SUNGATE";
    ActionTypes[ActionTypes["PROFILE"] = 44] = "PROFILE";
    ActionTypes[ActionTypes["DEADLY_IF_ON"] = 45] = "DEADLY_IF_ON";
    ActionTypes[ActionTypes["HEART_MONITOR"] = 46] = "HEART_MONITOR";
    ActionTypes[ActionTypes["DONATION_BOX"] = 47] = "DONATION_BOX";
    ActionTypes[ActionTypes["TOYBOX"] = 48] = "TOYBOX";
    ActionTypes[ActionTypes["MANNEQUIN"] = 49] = "MANNEQUIN";
    ActionTypes[ActionTypes["SECURITY_CAMERA"] = 50] = "SECURITY_CAMERA";
    ActionTypes[ActionTypes["MAGIC_EGG"] = 51] = "MAGIC_EGG";
    ActionTypes[ActionTypes["GAME_RESOURCES"] = 52] = "GAME_RESOURCES";
    ActionTypes[ActionTypes["GAME_GENERATOR"] = 53] = "GAME_GENERATOR";
    ActionTypes[ActionTypes["XENONITE"] = 54] = "XENONITE";
    ActionTypes[ActionTypes["DRESSUP"] = 55] = "DRESSUP";
    ActionTypes[ActionTypes["CRYSTAL"] = 56] = "CRYSTAL";
    ActionTypes[ActionTypes["BURGLAR"] = 57] = "BURGLAR";
    ActionTypes[ActionTypes["COMPACTOR"] = 58] = "COMPACTOR";
    ActionTypes[ActionTypes["SPOTLIGHT"] = 59] = "SPOTLIGHT";
    ActionTypes[ActionTypes["WIND"] = 60] = "WIND";
    ActionTypes[ActionTypes["DISPLAY_BLOCK"] = 61] = "DISPLAY_BLOCK";
    ActionTypes[ActionTypes["VENDING_MACHINE"] = 62] = "VENDING_MACHINE";
    ActionTypes[ActionTypes["FISHTANK"] = 63] = "FISHTANK";
    ActionTypes[ActionTypes["PETFISH"] = 64] = "PETFISH";
    ActionTypes[ActionTypes["SOLAR"] = 65] = "SOLAR";
    ActionTypes[ActionTypes["FORGE"] = 66] = "FORGE";
    ActionTypes[ActionTypes["GIVING_TREE"] = 67] = "GIVING_TREE";
    ActionTypes[ActionTypes["GIVING_TREE_STUMP"] = 68] = "GIVING_TREE_STUMP";
    ActionTypes[ActionTypes["STEAMPUNK"] = 69] = "STEAMPUNK";
    ActionTypes[ActionTypes["STEAM_LAVA_IF_ON"] = 70] = "STEAM_LAVA_IF_ON";
    ActionTypes[ActionTypes["STEAM_ORGAN"] = 71] = "STEAM_ORGAN";
    ActionTypes[ActionTypes["TAMAGOTCHI"] = 72] = "TAMAGOTCHI";
    ActionTypes[ActionTypes["SWING"] = 73] = "SWING";
    ActionTypes[ActionTypes["FLAG"] = 74] = "FLAG";
    ActionTypes[ActionTypes["LOBSTER_TRAP"] = 75] = "LOBSTER_TRAP";
    ActionTypes[ActionTypes["ART_CANVAS"] = 76] = "ART_CANVAS";
    ActionTypes[ActionTypes["BATTLE_CAGE"] = 77] = "BATTLE_CAGE";
    ActionTypes[ActionTypes["PET_TRAINER"] = 78] = "PET_TRAINER";
    ActionTypes[ActionTypes["STEAM_ENGINE"] = 79] = "STEAM_ENGINE";
    ActionTypes[ActionTypes["LOCKBOT"] = 80] = "LOCKBOT";
    ActionTypes[ActionTypes["WEATHER_SPECIAL"] = 81] = "WEATHER_SPECIAL";
    ActionTypes[ActionTypes["SPIRIT_STORAGE"] = 82] = "SPIRIT_STORAGE";
    ActionTypes[ActionTypes["DISPLAY_SHELF"] = 83] = "DISPLAY_SHELF";
    ActionTypes[ActionTypes["VIP_ENTRANCE"] = 84] = "VIP_ENTRANCE";
    ActionTypes[ActionTypes["CHALLENGE_TIMER"] = 85] = "CHALLENGE_TIMER";
    ActionTypes[ActionTypes["CHALLENGE_FLAG"] = 86] = "CHALLENGE_FLAG";
    ActionTypes[ActionTypes["FISH_MOUNT"] = 87] = "FISH_MOUNT";
    ActionTypes[ActionTypes["PORTRAIT"] = 88] = "PORTRAIT";
    ActionTypes[ActionTypes["WEATHER_SPECIAL2"] = 89] = "WEATHER_SPECIAL2";
    ActionTypes[ActionTypes["FOSSIL"] = 90] = "FOSSIL";
    ActionTypes[ActionTypes["FOSSIL_PREP"] = 91] = "FOSSIL_PREP";
    ActionTypes[ActionTypes["DNA_MACHINE"] = 92] = "DNA_MACHINE";
    ActionTypes[ActionTypes["BLASTER"] = 93] = "BLASTER";
    ActionTypes[ActionTypes["VALHOWLA"] = 94] = "VALHOWLA";
    ActionTypes[ActionTypes["CHEMSYNTH"] = 95] = "CHEMSYNTH";
    ActionTypes[ActionTypes["CHEMTANK"] = 96] = "CHEMTANK";
    ActionTypes[ActionTypes["STORAGE"] = 97] = "STORAGE";
    ActionTypes[ActionTypes["OVEN"] = 98] = "OVEN";
    ActionTypes[ActionTypes["SUPER_MUSIC"] = 99] = "SUPER_MUSIC";
    ActionTypes[ActionTypes["GEIGER_CHARGER"] = 100] = "GEIGER_CHARGER";
    ActionTypes[ActionTypes["ADVENTURE_RESET"] = 101] = "ADVENTURE_RESET";
    ActionTypes[ActionTypes["TOMB_ROBBER"] = 102] = "TOMB_ROBBER";
    ActionTypes[ActionTypes["FACTION"] = 103] = "FACTION";
    ActionTypes[ActionTypes["RED_FACTION"] = 104] = "RED_FACTION";
    ActionTypes[ActionTypes["GREEN_FACTION"] = 105] = "GREEN_FACTION";
    ActionTypes[ActionTypes["BLUE_FACTION"] = 106] = "BLUE_FACTION";
    ActionTypes[ActionTypes["ANCES"] = 107] = "ANCES";
    ActionTypes[ActionTypes["FISHGOTCHI_TANK"] = 109] = "FISHGOTCHI_TANK";
    ActionTypes[ActionTypes["FISHING_BLOCK"] = 110] = "FISHING_BLOCK";
    ActionTypes[ActionTypes["ITEM_SUCKER"] = 111] = "ITEM_SUCKER";
    ActionTypes[ActionTypes["ITEM_PLANTER"] = 112] = "ITEM_PLANTER";
    ActionTypes[ActionTypes["ROBOT"] = 113] = "ROBOT";
    ActionTypes[ActionTypes["COMMAND"] = 114] = "COMMAND";
    ActionTypes[ActionTypes["TICKET"] = 115] = "TICKET";
    ActionTypes[ActionTypes["STATS_BLOCK"] = 116] = "STATS_BLOCK";
    ActionTypes[ActionTypes["FIELD_NODE"] = 117] = "FIELD_NODE";
    ActionTypes[ActionTypes["OUIJA_BOARD"] = 118] = "OUIJA_BOARD";
    ActionTypes[ActionTypes["ARCHITECT_MACHINE"] = 119] = "ARCHITECT_MACHINE";
    ActionTypes[ActionTypes["STARSHIP"] = 120] = "STARSHIP";
    ActionTypes[ActionTypes["AUTODELETE"] = 121] = "AUTODELETE";
    ActionTypes[ActionTypes["GREEN_FOUNTAIN"] = 122] = "GREEN_FOUNTAIN";
    ActionTypes[ActionTypes["AUTO_ACTION_BREAK"] = 123] = "AUTO_ACTION_BREAK";
    ActionTypes[ActionTypes["AUTO_ACTION_HARVEST"] = 124] = "AUTO_ACTION_HARVEST";
    ActionTypes[ActionTypes["AUTO_ACTION_HARVEST_SUCK"] = 125] = "AUTO_ACTION_HARVEST_SUCK";
    ActionTypes[ActionTypes["LIGHTNING_IF_ON"] = 126] = "LIGHTNING_IF_ON";
    ActionTypes[ActionTypes["PHASED_BLOCK"] = 127] = "PHASED_BLOCK";
    ActionTypes[ActionTypes["MUD"] = 128] = "MUD";
    ActionTypes[ActionTypes["ROOT_CUTTING"] = 129] = "ROOT_CUTTING";
    ActionTypes[ActionTypes["PASSWORD_STORAGE"] = 130] = "PASSWORD_STORAGE";
    ActionTypes[ActionTypes["PHASED_BLOCK_2"] = 131] = "PHASED_BLOCK_2";
    ActionTypes[ActionTypes["BOMB"] = 132] = "BOMB";
    ActionTypes[ActionTypes["WEATHER_INFINITY"] = 134] = "WEATHER_INFINITY";
    ActionTypes[ActionTypes["SLIME"] = 135] = "SLIME";
    ActionTypes[ActionTypes["UNK1"] = 136] = "UNK1";
    ActionTypes[ActionTypes["COMPLETIONIST"] = 137] = "COMPLETIONIST";
    ActionTypes[ActionTypes["UNK3"] = 138] = "UNK3";
    ActionTypes[ActionTypes["FEEDING_BLOCK"] = 140] = "FEEDING_BLOCK";
    ActionTypes[ActionTypes["KRANKENS_BLOCK"] = 141] = "KRANKENS_BLOCK";
    ActionTypes[ActionTypes["FRIENDS_ENTRANCE"] = 142] = "FRIENDS_ENTRANCE";
})(ActionTypes || (exports.ActionTypes = ActionTypes = {}));
exports.LOCKS = [
    {
        id: 202, // Small Lock
        maxTiles: 10
    },
    {
        id: 204, // Big Lock
        maxTiles: 48
    },
    {
        id: 206, // Huge Lock
        maxTiles: 200
    },
    {
        id: 4994, // Builder's Lock
        maxTiles: 200
    }
];
exports.TileIgnore = {
    blockIDsToIgnoreByLock: [6, 8],
    blockActionTypesToIgnore: [ActionTypes.LOCK, ActionTypes.MAIN_DOOR]
};
var BlockFlags;
(function (BlockFlags) {
    BlockFlags[BlockFlags["MULTI_FACING"] = 1] = "MULTI_FACING";
    BlockFlags[BlockFlags["WRENCHABLE"] = 2] = "WRENCHABLE";
    BlockFlags[BlockFlags["SEEDLESS"] = 4] = "SEEDLESS";
    BlockFlags[BlockFlags["PERMANENT"] = 8] = "PERMANENT";
    BlockFlags[BlockFlags["DROPLESS"] = 16] = "DROPLESS";
    BlockFlags[BlockFlags["NO_SELF"] = 32] = "NO_SELF";
    BlockFlags[BlockFlags["NO_SHADOW"] = 64] = "NO_SHADOW";
    BlockFlags[BlockFlags["WORLD_LOCKED"] = 128] = "WORLD_LOCKED";
    BlockFlags[BlockFlags["BETA"] = 256] = "BETA";
    BlockFlags[BlockFlags["AUTO_PICKUP"] = 512] = "AUTO_PICKUP";
    BlockFlags[BlockFlags["MOD"] = 1024] = "MOD";
    BlockFlags[BlockFlags["RANDOM_GROW"] = 2048] = "RANDOM_GROW";
    BlockFlags[BlockFlags["PUBLIC"] = 4096] = "PUBLIC";
    BlockFlags[BlockFlags["FOREGROUND"] = 8192] = "FOREGROUND";
    BlockFlags[BlockFlags["HOLIDAY"] = 16384] = "HOLIDAY";
    BlockFlags[BlockFlags["UNTRADEABLE"] = 32768] = "UNTRADEABLE";
})(BlockFlags || (exports.BlockFlags = BlockFlags = {}));
var NameStyles;
(function (NameStyles) {
    // Titles
    NameStyles["MAX_LEVEL"] = "maxLevel";
    NameStyles["DOCTOR"] = "doctor";
    NameStyles["MENTOR"] = "3";
    NameStyles["GROW4GOOD"] = "grow4good";
    NameStyles["THANKSGIVING"] = "thanksgiving";
    NameStyles["YOUTUBE"] = "youtube";
    NameStyles["TIKTOK"] = "tiktok";
    NameStyles["MASTER"] = "master";
    NameStyles["DONOR"] = "donor";
    NameStyles["EUPHORIA"] = "euphoria";
    NameStyles["SHOW_GUILD"] = "showGuild";
    // Special assignment method
    NameStyles["LEGENDARY"] = " of Legend``";
    // Colors!
    NameStyles["DEVELOPER"] = "`b";
    NameStyles["MOD"] = "`5";
    NameStyles["OWNER"] = "`2";
    NameStyles["ACCESS"] = "`^";
    NameStyles["GAME"] = "`a";
})(NameStyles || (exports.NameStyles = NameStyles = {}));
var CharacterState;
(function (CharacterState) {
    CharacterState[CharacterState["WALK_IN_BLOCKS"] = 1] = "WALK_IN_BLOCKS";
    CharacterState[CharacterState["DOUBLE_JUMP"] = 2] = "DOUBLE_JUMP";
    CharacterState[CharacterState["IS_INVISIBLE"] = 4] = "IS_INVISIBLE";
    CharacterState[CharacterState["NO_HANDS"] = 8] = "NO_HANDS";
    CharacterState[CharacterState["NO_EYES"] = 16] = "NO_EYES";
    CharacterState[CharacterState["NO_BODY"] = 32] = "NO_BODY";
    CharacterState[CharacterState["DEVIL_HORNS"] = 64] = "DEVIL_HORNS";
    CharacterState[CharacterState["GOLDEN_HALO"] = 128] = "GOLDEN_HALO";
    CharacterState[CharacterState["IS_FROZEN"] = 2048] = "IS_FROZEN";
    CharacterState[CharacterState["IS_CURSED"] = 4096] = "IS_CURSED";
    CharacterState[CharacterState["IS_DUCTAPED"] = 8192] = "IS_DUCTAPED";
    CharacterState[CharacterState["HAVE_CIGAR"] = 16384] = "HAVE_CIGAR";
    CharacterState[CharacterState["IS_SHINING"] = 32768] = "IS_SHINING";
    CharacterState[CharacterState["IS_ZOMBIE"] = 65536] = "IS_ZOMBIE";
    CharacterState[CharacterState["IS_HIT_BY_LAVA"] = 131072] = "IS_HIT_BY_LAVA";
    CharacterState[CharacterState["HAVE_HAUNTED_SHADOWS"] = 262144] = "HAVE_HAUNTED_SHADOWS";
    CharacterState[CharacterState["HAVE_GEIGER_RADIATION"] = 524288] = "HAVE_GEIGER_RADIATION";
    CharacterState[CharacterState["HAVE_REFLECTOR"] = 1048576] = "HAVE_REFLECTOR";
    CharacterState[CharacterState["IS_EGGED"] = 2097152] = "IS_EGGED";
    CharacterState[CharacterState["HAVE_PINEAPPLE_FLOAT"] = 4194304] = "HAVE_PINEAPPLE_FLOAT";
    CharacterState[CharacterState["HAVE_FLYING_PINEAPPLE"] = 8388608] = "HAVE_FLYING_PINEAPPLE";
    CharacterState[CharacterState["HAVE_SUPER_SUPPORTER_NAME"] = 16777216] = "HAVE_SUPER_SUPPORTER_NAME";
    CharacterState[CharacterState["HAVE_SUPER_PINEAPPLE"] = 33554432] = "HAVE_SUPER_PINEAPPLE";
})(CharacterState || (exports.CharacterState = CharacterState = {}));
var ModsEffects;
(function (ModsEffects) {
    ModsEffects[ModsEffects["HARVESTER"] = 1] = "HARVESTER";
    ModsEffects[ModsEffects["PUNCH_DAMAGE"] = 2] = "PUNCH_DAMAGE";
})(ModsEffects || (exports.ModsEffects = ModsEffects = {}));
var StateFlags;
(function (StateFlags) {
    StateFlags[StateFlags["NONE"] = 0] = "NONE";
    StateFlags[StateFlags["UNK"] = 2] = "UNK";
    StateFlags[StateFlags["RESET_VISUAL_STATE"] = 4] = "RESET_VISUAL_STATE";
    StateFlags[StateFlags["EXTENDED"] = 8] = "EXTENDED";
    StateFlags[StateFlags["ROTATE_LEFT"] = 16] = "ROTATE_LEFT";
    StateFlags[StateFlags["ON_SOLID"] = 32] = "ON_SOLID";
    StateFlags[StateFlags["ON_FIRE_DAMAGE"] = 64] = "ON_FIRE_DAMAGE";
    StateFlags[StateFlags["ON_JUMP"] = 128] = "ON_JUMP";
    StateFlags[StateFlags["ON_KILLED"] = 256] = "ON_KILLED";
    StateFlags[StateFlags["ON_PUNCHED"] = 512] = "ON_PUNCHED";
    StateFlags[StateFlags["ON_PLACED"] = 1024] = "ON_PLACED";
    StateFlags[StateFlags["ON_TILE_ACTION"] = 2048] = "ON_TILE_ACTION";
    StateFlags[StateFlags["ON_GOT_PUNCHED"] = 4096] = "ON_GOT_PUNCHED";
    StateFlags[StateFlags["ON_RESPAWNED"] = 8192] = "ON_RESPAWNED";
    StateFlags[StateFlags["ON_COLLECT_OBJECT"] = 16384] = "ON_COLLECT_OBJECT";
    StateFlags[StateFlags["ON_TRAMPOLINE"] = 32768] = "ON_TRAMPOLINE";
    StateFlags[StateFlags["ON_DAMAGE"] = 65536] = "ON_DAMAGE";
    StateFlags[StateFlags["ON_SLIDE"] = 131072] = "ON_SLIDE";
    StateFlags[StateFlags["ON_WALL_HANG"] = 2097152] = "ON_WALL_HANG";
    StateFlags[StateFlags["ON_ACID_DAMAGE"] = 67108864] = "ON_ACID_DAMAGE";
    // MAX = 31
})(StateFlags || (exports.StateFlags = StateFlags = {}));
exports.weatherIdMap = {
    3694: 28,
    3832: 29,
    5000: 34,
    1490: 10,
    934: 2,
    946: 3,
    932: 4,
    984: 5,
    1210: 8,
    1364: 11,
    1750: 15,
    2046: 17,
    2284: 18,
    2744: 19,
    3252: 20,
    3446: 21,
    3534: 22,
    4242: 30,
    4486: 31,
    4776: 32,
    4892: 33,
    5112: 35,
    5654: 36,
    5716: 37,
    5958: 38,
    6854: 42,
    7644: 44,
    12054: 60,
    12056: 61,
    8896: 47,
    8836: 48,
    10286: 51,
    11880: 59,
    12408: 62,
    12844: 64,
    13004: 65,
    13070: 66
};
