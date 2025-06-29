import { Command } from "../Command";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export default class Help extends Command {
    constructor(base: Base, peer: Peer, text: string, args: string[]);
    private getRoleLevel;
    execute(): Promise<void>;
}
