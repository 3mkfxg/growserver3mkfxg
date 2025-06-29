import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
import { NonEmptyObject } from "type-fest";
export declare class RefreshItemData {
    base: Base;
    peer: Peer;
    constructor(base: Base, peer: Peer);
    execute(_action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
