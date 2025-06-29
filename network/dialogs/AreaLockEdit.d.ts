import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
export declare class AreaLockEdit {
    base: Base;
    peer: Peer;
    action: NonEmptyObject<{
        dialog_name: string;
        tilex: string;
        tiley: string;
        playerNetID: string;
        allow_break_build: string;
        ignore_empty: string;
        build_only: string;
        limit_admin: string;
        lockID: string;
        buttonClicked: string;
    }>;
    private world;
    private pos;
    private block;
    private itemMeta;
    constructor(base: Base, peer: Peer, action: NonEmptyObject<{
        dialog_name: string;
        tilex: string;
        tiley: string;
        playerNetID: string;
        allow_break_build: string;
        ignore_empty: string;
        build_only: string;
        limit_admin: string;
        lockID: string;
        buttonClicked: string;
    }>);
    execute(): Promise<void>;
}
