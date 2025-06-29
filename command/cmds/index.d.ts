import type { Class } from "type-fest";
import type { CommandOptions } from "../../types/commands";
export declare const CommandMap: Record<string, Class<{
    execute: () => Promise<void>;
    opt: CommandOptions;
}>>;
export declare const CommandsAliasMap: Record<string, string>;
export declare const registerAliases: () => Promise<void>;
