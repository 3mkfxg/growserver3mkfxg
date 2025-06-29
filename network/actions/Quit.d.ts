import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class Quit {
    base: Base;
    peer: Peer;
    constructor(base: Base, peer: Peer);
    execute(_action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
