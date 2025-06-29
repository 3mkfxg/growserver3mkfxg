import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class GazzetteEnd {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<Record<string, string>>;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<Record<string, string>>);
    execute(): Promise<void>;
}
