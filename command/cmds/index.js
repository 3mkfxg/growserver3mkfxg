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
exports.registerAliases = exports.CommandsAliasMap = exports.CommandMap = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const consola_1 = __importDefault(require("consola"));
exports.CommandMap = {};
// Map to track which command aliases belong to which original command
exports.CommandsAliasMap = {};
const loadCommands = async () => {
    // Get list of command files, filtering out the index file
    const commandFiles = (0, fs_1.readdirSync)(__dirname).filter((file) => (file.endsWith(".ts") || file.endsWith(".js")) &&
        !file.endsWith(".d.ts") &&
        file !== "index.ts" &&
        file !== "index.js");
    consola_1.default.info(`Found ${commandFiles.length} command files`);
    for (const file of commandFiles) {
        try {
            const commandName = file.split(".")[0].toLowerCase();
            const fileExt = file.split(".").pop();
            // Log which command is being loaded
            consola_1.default.debug(`Loading command: ${commandName} from ${file}`);
            // Use dynamic import with proper path construction
            let CommandClass;
            try {
                // In production, handle JS files
                if (fileExt === "js") {
                    const module = await Promise.resolve(`${(0, path_1.join)(__dirname, file)}`).then(s => __importStar(require(s)));
                    CommandClass = module.default;
                }
                else {
                    // In development, handle TS files
                    const module = await Promise.resolve(`${`./${commandName}`}`).then(s => __importStar(require(s)));
                    CommandClass = module.default;
                }
                if (CommandClass) {
                    exports.CommandMap[commandName] = CommandClass;
                    consola_1.default.success(`Loaded command: ${commandName}`);
                }
                else {
                    consola_1.default.warn(`Command class not found in ${file}`);
                }
            }
            catch (importError) {
                consola_1.default.error(`Failed to import command ${file}:`, importError);
            }
        }
        catch (error) {
            consola_1.default.error(`Error processing command file:`, error);
        }
    }
    consola_1.default.info(`Loaded ${Object.keys(exports.CommandMap).length} commands`);
};
// This function registers all command aliases after server is fully initialized
const registerAliases = async () => {
    let aliasCount = 0;
    // Iterate through each command
    for (const [commandName, CommandClass] of Object.entries(exports.CommandMap)) {
        try {
            // Create a temporary instance to access the command options
            // Use empty parameters or dummy objects that won't cause errors
            const dummyBase = { cache: { cooldown: new Map() } };
            const dummyPeer = {};
            // Create instance with minimal required properties
            const tempCmd = new CommandClass(dummyBase, dummyPeer, "", []);
            // Register all aliases for this command
            if (tempCmd.opt && Array.isArray(tempCmd.opt.command)) {
                for (const alias of tempCmd.opt.command) {
                    const aliasLower = alias.toLowerCase();
                    // Don't register the main command name as an alias of itself
                    if (aliasLower !== commandName) {
                        exports.CommandsAliasMap[aliasLower] = commandName;
                        aliasCount++;
                        consola_1.default.debug(`Registered alias: ${aliasLower} → ${commandName}`);
                    }
                }
            }
        }
        catch (error) {
            // If we can't create an instance, log the error but continue with other commands
            consola_1.default.warn(`Could not register aliases for ${commandName}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    consola_1.default.success(`Command system ready (${aliasCount} aliases registered)`);
};
exports.registerAliases = registerAliases;
loadCommands().catch((err) => consola_1.default.error("Failed to load commands:", err));
