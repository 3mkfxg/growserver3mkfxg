import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class TrashEnd {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        trash_count: string;
        itemID: string;
    }>;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        trash_count: string;
        itemID: string;
    }>);
    execute(): Promise<void>;
}
