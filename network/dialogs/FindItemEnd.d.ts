import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class FindItemEnd {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        find_item_name: string;
        buttonClicked: string;
    }>;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        find_item_name: string;
        buttonClicked: string;
    }>);
    execute(): Promise<void>;
}
