import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class DoorEdit {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        tilex: string;
        tiley: string;
        itemID: string;
        label?: string;
        target?: string;
        id?: string;
    }>;
    private world;
    private pos;
    private block;
    private itemMeta;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        tilex: string;
        tiley: string;
        itemID: string;
        label?: string;
        target?: string;
        id?: string;
    }>);
    execute(): Promise<void>;
}
