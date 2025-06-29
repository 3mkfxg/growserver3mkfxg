"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const Constants_1 = require("../../Constants");
const growtopia_js_1 = require("growtopia.js");
const _1 = require(".");
const DialogBuilder_1 = require("../../utils/builders/DialogBuilder");
class Help extends Command_1.Command {
    constructor(base, peer, text, args) {
        super(base, peer, text, args);
        this.opt = {
            command: ["help", "?"],
            description: "Shows available commands",
            cooldown: 5,
            ratelimit: 1,
            category: "`oBasic",
            usage: "/help",
            example: ["/help"],
            permission: [Constants_1.ROLE.BASIC, Constants_1.ROLE.SUPPORTER, Constants_1.ROLE.DEVELOPER]
        };
    }
    getRoleLevel(role) {
        const roleLevels = {
            [Constants_1.ROLE.BASIC]: 1,
            [Constants_1.ROLE.SUPPORTER]: 2,
            [Constants_1.ROLE.DEVELOPER]: 3
        };
        return roleLevels[role] || 0;
    }
    async execute() {
        if (this.args.length > 0) {
            const Class = _1.CommandMap[this.args[0]];
            if (!_1.CommandMap[this.args[0]])
                return this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "It seems that commands doesn't exist."));
            const cmd = new Class(this.base, this.peer, this.text, this.args);
            const dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addLabelWithIcon(this.args[0] || "", "32", "small")
                .addSpacer("small")
                .addSmallText(`Description: ${cmd?.opt.description}`)
                .addSmallText(`Cooldown: ${cmd?.opt.cooldown}`)
                .addSmallText(`Ratelimit: ${cmd?.opt.ratelimit}`)
                .addSmallText(`Permissions: ${cmd?.opt.permission.length ? cmd.opt.permission : "None"}`)
                .addSmallText(`Usage: ${cmd?.opt.usage}`)
                .addSmallText(`Example: ${cmd?.opt.example.join(", ")}`)
                .endDialog("help_end", "", "Ok")
                .addQuickExit();
            return this.peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
        }
        const userRoleLevel = this.getRoleLevel(this.peer.data.role);
        // Filter and organize commands
        const commandsByCategory = {};
        Object.values(_1.CommandMap).forEach((CommandClass) => {
            const cmd = new CommandClass(null, null, "", []);
            // Check if user has permission based on role hierarchy
            const hasPermission = cmd.opt.permission.some((role) => this.getRoleLevel(role) <= userRoleLevel);
            if (hasPermission) {
                const category = cmd.opt.category || "Uncategorized";
                if (!commandsByCategory[category]) {
                    commandsByCategory[category] = [];
                }
                const commandString = `/${cmd.opt.command.join(", /")}`;
                // prevent any duplicates on commands
                if (!commandsByCategory[category].includes(commandString)) {
                    commandsByCategory[category].push(commandString);
                }
            }
        });
        // Build output message
        let message = "Available Commands: ";
        Object.entries(commandsByCategory).forEach(([category, commands]) => {
            message += `${category}: ${commands.join(", ")} `;
        });
        this.peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", message));
    }
}
exports.default = Help;
