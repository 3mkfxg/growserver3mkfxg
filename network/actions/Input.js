"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const consola_1 = __importDefault(require("consola"));
const index_1 = require("../../command/cmds/index");
const growtopia_js_1 = require("growtopia.js");
class Input {
    base;
    peer;
    constructor(base, peer) {
        this.base = base;
        this.peer = peer;
    }
    async execute(action) {
        try {
            const text = action.text.trim();
            if (!text || text.replace(/`.|`/g, "").length < 1)
                return;
            if (text.startsWith("/")) {
                const args = text.slice("/".length).split(" ");
                const commandName = args.shift()?.toLowerCase() || "";
                // Try to find the command directly by name or by its alias
                let Class = index_1.CommandMap[commandName];
                let originalCmd = commandName;
                // If no direct command found, check if it's registered as an alias
                if (!Class && index_1.CommandsAliasMap[commandName]) {
                    originalCmd = index_1.CommandsAliasMap[commandName];
                    Class = index_1.CommandMap[originalCmd];
                }
                // If we still can't find the command, notify the user
                if (!Class) {
                    this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`4Unknown command.`` Enter `$/help`` for a list of valid commands"));
                    return;
                }
                // Create the command instance
                const cmd = new Class(this.base, this.peer, text, args);
                // Double-check that aliases are registered
                // This ensures any missing aliases are registered even if registerAliases failed
                if (cmd.opt && cmd.opt.command) {
                    for (const alias of cmd.opt.command) {
                        const aliasLower = alias.toLowerCase();
                        if (aliasLower !== originalCmd && !index_1.CommandsAliasMap[aliasLower]) {
                            index_1.CommandsAliasMap[aliasLower] = originalCmd;
                            consola_1.default.debug(`Late-registered alias: ${aliasLower} → ${originalCmd}`);
                        }
                    }
                }
                // Check permissions first - if no permission, don't apply cooldown
                if (!cmd.opt.permission.some((perm) => perm === this.peer.data?.role)) {
                    this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "You dont have permission to use this command."));
                    return;
                }
                // Special check for Sb command - don't apply cooldown if no args
                if ((originalCmd === "sb" || originalCmd === "sdb") &&
                    args.length === 0) {
                    await cmd.execute();
                    return;
                }
                // Get cooldown info from command options
                const cooldownSeconds = cmd.opt.cooldown || 1;
                const maxUses = cmd.opt.ratelimit || 1;
                const cooldownKey = `${originalCmd}-netID-${this.peer.data?.netID}`;
                // Check if command is on cooldown
                const cooldownInfo = this.base.cache.cooldown.get(cooldownKey);
                const now = Date.now();
                if (!cooldownInfo) {
                    // First use of the command - set initial usage data
                    this.base.cache.cooldown.set(cooldownKey, {
                        limit: 1, // Starting with 1 because this is the first use
                        time: now,
                    });
                    // Set up the cooldown timer
                    setTimeout(() => {
                        this.base.cache.cooldown.delete(cooldownKey);
                    }, cooldownSeconds * 1000);
                }
                else {
                    // Command has been used before - check if it's hit the rate limit
                    if (cooldownInfo.limit >= maxUses) {
                        // Calculate time remaining until cooldown expires
                        const expiresAt = cooldownInfo.time + cooldownSeconds * 1000;
                        const timeLeftMs = Math.max(0, expiresAt - now);
                        const timeLeftSec = (timeLeftMs / 1000).toFixed(1);
                        // Send cooldown message to the user
                        return this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `\`6${this.peer.data?.tankIDName}\`0 you're being ratelimited, please wait \`9${timeLeftSec}s\`0`));
                    }
                    // Increment the usage counter
                    cooldownInfo.limit += 1;
                }
                // Execute the command
                await cmd.execute();
                return;
            }
            this.peer.every((p) => {
                if (p.data?.world === this.peer.data?.world &&
                    this.peer.data?.world !== "EXIT") {
                    p.send(growtopia_js_1.Variant.from("OnTalkBubble", this.peer.data?.netID || 0, action.text, 0), growtopia_js_1.Variant.from("OnConsoleMessage", `CP:0_PL:0_OID:_CT:[W]_ <\`w${this.peer.data?.tankIDName}\`\`> ${action.text}`));
                }
            });
        }
        catch (e) {
            consola_1.default.warn(e);
            this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`4Unknown command.`` Enter `$/help`` for a list of valid commands"));
        }
    }
}
exports.Input = Input;
