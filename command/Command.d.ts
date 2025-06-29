import { Base } from "../core/Base";
import { Peer } from "../core/Peer";
import type { CommandOptions } from "../types/commands";
export declare class Command {
    base: Base;
    peer: Peer;
    text: string;
    args: string[];
    opt: CommandOptions;
    constructor(base: Base, peer: Peer, text: string, args: string[]);
    execute(): Promise<void>;
}
