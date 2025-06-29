import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
import { type NonEmptyObject } from "type-fest";
export declare class EnterGame {
    base: Base;
    peer: Peer;
    constructor(base: Base, peer: Peer);
    execute(_action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
