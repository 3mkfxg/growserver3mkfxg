import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class ConfirmClearWorld {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
    }>;
    private world;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
    }>);
    execute(): Promise<void>;
}
