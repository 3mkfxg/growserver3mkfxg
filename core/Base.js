"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const growtopia_js_1 = require("growtopia.js");
const Web_1 = require("./Web");
const Utils_1 = require("../utils/Utils");
const path_1 = require("path");
const Connect_1 = require("../events/Connect");
const Disconnect_1 = require("../events/Disconnect");
const Raw_1 = require("../events/Raw");
const consola_1 = __importDefault(require("consola"));
const fs_1 = require("fs");
const Collection_1 = require("../utils/Collection");
const Database_1 = require("../database/Database");
const Peer_1 = require("./Peer");
const World_1 = require("./World");
const RTTEX_1 = require("../utils/RTTEX");
const promises_1 = require("fs/promises");
const chokidar_1 = __importDefault(require("chokidar"));
const Constants_1 = require("../Constants");
__dirname = process.cwd();
class Base {
    server;
    items;
    package;
    config;
    cdn;
    cache;
    database;
    constructor() {
        this.server = new growtopia_js_1.Client({
            enet: {
                ip: "0.0.0.0",
                useNewServerPacket: true
            },
        });
        this.package = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "package.json"), "utf-8"));
        this.config = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "config.json"), "utf-8"));
        this.cdn = { version: "", uri: "0000/0000", itemsDatName: "" };
        this.items = {
            content: Buffer.alloc(0),
            hash: "",
            metadata: {},
            wiki: [],
        };
        this.cache = {
            peers: new Collection_1.Collection(),
            worlds: new Collection_1.Collection(),
            cooldown: new Collection_1.Collection(),
        };
        this.database = new Database_1.Database();
        consola_1.default.level = 4;
    }
    async start() {
        try {
            consola_1.default.box(`GrowServer\nVersion: ${this.package.version}\n© JadlionHD 2022-${new Date().getFullYear()}`);
            // Check if port is available
            const port = this.server.config.enet?.port || 17091;
            const portInUse = await (0, Utils_1.checkPortInUse)(port);
            if (portInUse) {
                throw new Error(`Port ${port} is already in use. Please choose a different port.`);
            }
            await (0, Utils_1.downloadMkcert)();
            await (0, Utils_1.setupMkcert)();
            await (0, Utils_1.downloadWebsite)();
            await (0, Utils_1.setupWebsite)();
            this.cdn = await this.getLatestCdn();
            await (0, Utils_1.downloadItemsDat)(this.cdn.itemsDatName);
            consola_1.default.info(`Parsing ${this.cdn.itemsDatName}`);
            const datDir = (0, path_1.join)(__dirname, ".cache", "growtopia", "dat");
            const datName = (0, path_1.join)(datDir, this.cdn.itemsDatName);
            const itemsDat = (0, fs_1.readFileSync)(datName);
            this.items = {
                hash: `${(0, Utils_1.hashItemsDat)(itemsDat)}`,
                content: itemsDat,
                metadata: {},
                wiki: [],
            };
            await (0, Web_1.Web)(this);
            consola_1.default.log(`🔔Starting ENet server on port ${port}`);
            // Add error handling for server start
            await new Promise((resolve, reject) => {
                try {
                    this.server.listen();
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            });
            await this.loadItems();
            await this.loadEvents();
        }
        catch (err) {
            consola_1.default.error(`Failed to start server: ${err}`);
            process.exit(1);
        }
    }
    async loadEvents() {
        const connect = new Connect_1.ConnectListener(this);
        const disconnect = new Disconnect_1.DisconnectListener(this);
        const raw = new Raw_1.RawListener(this);
        this.server.on("connect", (netID) => connect.run(netID));
        this.server.on("disconnect", (netID) => disconnect.run(netID));
        this.server.on("raw", (netID, channelID, data) => raw.run(netID, channelID, data));
        // Register command aliases after server has started
        this.registerCommandAliases();
        // Check items-config.json file changes
        chokidar_1.default
            .watch((0, path_1.join)(__dirname, "assets", "custom-items"), { persistent: true })
            .on("change", async (path) => {
            const pathArr = path.split("\\");
            const fileName = pathArr[pathArr.length - 1];
            consola_1.default.info(`Detected custom-items directory changes | ${fileName}`);
            consola_1.default.info(`Refreshing items data`);
            await this.loadItems();
        });
    }
    // Register command aliases after server initialization
    async registerCommandAliases() {
        try {
            const { registerAliases } = await Promise.resolve().then(() => __importStar(require("../command/cmds/index")));
            await registerAliases();
            consola_1.default.success("Command aliases registered successfully");
        }
        catch (error) {
            consola_1.default.error("Failed to register command aliases:", error);
        }
    }
    async loadItems() {
        const itemsDat = new growtopia_js_1.ItemsDat(await (0, promises_1.readFile)((0, path_1.join)(__dirname, ".cache", "growtopia", "dat", this.cdn.itemsDatName)));
        await itemsDat.decode();
        consola_1.default.start("Loading custom items...");
        try {
            const itemsConf = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(__dirname, "assets", "custom-items", "items-config.json"), "utf-8"));
            for (const asset of itemsConf.assets) {
                if (!asset.id)
                    throw "Item ID are required to replace specific item";
                const item = itemsDat.meta.items[asset.id];
                consola_1.default.start(`Modifying item ID: ${item.id} | ${item.name}`);
                Object.assign(item, {
                    ...asset.item,
                });
                if (asset.item.extraFile) {
                    const image = await (0, promises_1.readFile)((0, path_1.join)(__dirname, "assets", "custom-items", asset.item.extraFile.pathAsset));
                    const rttex = await RTTEX_1.RTTEX.encode(image);
                    item.extraFile = asset.item.extraFile.pathResult;
                    item.extraFileHash = (0, Utils_1.hashItemsDat)(rttex);
                    await (0, promises_1.mkdir)((0, path_1.join)(__dirname, ".cache", "growtopia", "cache", asset.storePath), {
                        recursive: true,
                    });
                    await (0, promises_1.writeFile)((0, path_1.join)(__dirname, ".cache", "growtopia", "cache", asset.storePath, asset.item.extraFile.fileName), rttex, {
                        flush: true,
                    });
                }
                if (asset.item.texture) {
                    const image = await (0, promises_1.readFile)((0, path_1.join)(__dirname, "assets", "custom-items", asset.item.texture.pathAsset));
                    const rttex = await RTTEX_1.RTTEX.encode(image);
                    item.texture = asset.item.texture.pathResult;
                    item.textureHash = (0, Utils_1.hashItemsDat)(rttex);
                    await (0, promises_1.mkdir)((0, path_1.join)(__dirname, ".cache", "growtopia", "cache", asset.storePath), {
                        recursive: true,
                    });
                    await (0, promises_1.writeFile)((0, path_1.join)(__dirname, ".cache", "growtopia", "cache", asset.storePath, asset.item.texture.fileName), rttex, {
                        flush: true,
                    });
                }
                consola_1.default.success(`Successfully modifying item ID: ${item.id} | ${item.name}`);
            }
        }
        catch (e) {
            consola_1.default.error("Failed to load custom items: " + e);
        }
        await itemsDat.encode();
        const hash = (0, Utils_1.hashItemsDat)(itemsDat.data);
        this.items.content = itemsDat.data;
        this.items.hash = `${hash}`;
        this.items.metadata = itemsDat.meta;
        this.items.wiki = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(__dirname, "assets", "items_info_new.json"), "utf-8"));
        consola_1.default.info(`Items data hash: ${hash}`);
        consola_1.default.success("Successfully parsing items data");
    }
    async getLatestCdn() {
        try {
            const cdnData = (await (0, Utils_1.fetchJSON)("https://mari-project.jad.li/api/v1/growtopia/cache/latest"));
            const itemsDat = (await (0, Utils_1.fetchJSON)(Constants_1.ITEMS_DAT_FETCH_URL));
            const data = {
                version: cdnData.version,
                uri: cdnData.uri,
                itemsDatName: itemsDat.content,
            };
            return data;
        }
        catch (e) {
            consola_1.default.error(`Failed to get latest CDN: ${e}`);
            return { version: "", uri: "", itemsDatName: "" };
        }
    }
    async saveAll(disconnectAll = false) {
        consola_1.default.info(`Saving ${this.cache.peers.size} peers & ${this.cache.worlds.size} worlds`);
        const worldsSaved = await this.saveWorlds();
        const playersSaved = await this.savePlayers(disconnectAll);
        return worldsSaved && playersSaved;
    }
    async saveWorlds() {
        try {
            let savedCount = 0;
            for (const [, world] of this.cache.worlds) {
                const wrld = new World_1.World(this, world.name);
                if (typeof wrld.worldName === "string")
                    await wrld.saveToDatabase().catch((e) => consola_1.default.error(e));
                else
                    consola_1.default.warn(`Oh no there's undefined (${savedCount}) world, skipping..`);
                savedCount++;
            }
            consola_1.default.success(`Saved ${savedCount} worlds`);
            return true;
        }
        catch (err) {
            consola_1.default.error(`Failed to save worlds: ${err}`);
            return false;
        }
    }
    async savePlayers(disconenctAll) {
        try {
            let savedCount = 0;
            for (const [, peer] of this.cache.peers) {
                const player = new Peer_1.Peer(this, peer.netID);
                await player.saveToDatabase();
                if (disconenctAll) {
                    player.disconnect("now");
                }
                savedCount++;
            }
            consola_1.default.success(`Saved ${savedCount} players`);
            return true;
        }
        catch (err) {
            consola_1.default.error(`Failed to save players: ${err}`);
            return false;
        }
    }
    async shutdown() {
        consola_1.default.info("Shutting down server...");
        await this.saveAll(true);
        process.exit(0);
    }
}
exports.Base = Base;
