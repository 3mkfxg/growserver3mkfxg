import { Command } from "../Command";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export default class Sdb extends Command {
    base: Base;
    peer: Peer;
    text: string;
    args: string[];
    constructor(base: Base, peer: Peer, text: string, args: string[]);
    execute(): Promise<void>;
}
