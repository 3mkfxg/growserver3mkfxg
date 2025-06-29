import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
import { type NonEmptyObject } from "type-fest";
export declare class JoinRequest {
    base: Base;
    peer: Peer;
    constructor(base: Base, peer: Peer);
    execute(action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
