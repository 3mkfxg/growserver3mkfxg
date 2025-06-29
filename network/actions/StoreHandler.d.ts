import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class StoreHandler {
    base: Base;
    peer: Peer;
    private readonly mainItems;
    constructor(base: Base, peer: Peer);
    private addMainItems;
    execute(_action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
