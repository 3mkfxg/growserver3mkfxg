import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class FindItem {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        find_item_name: string;
        seed_only: string;
    }>;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        find_item_name: string;
        seed_only: string;
    }>);
    execute(): Promise<void>;
}
