import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class DropEnd {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        drop_count: string;
        itemID: string;
    }>;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        drop_count: string;
        itemID: string;
    }>);
    execute(): Promise<void>;
}
