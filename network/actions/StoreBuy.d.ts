import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
type StoreItem = {
    name: string;
    title: string;
    description: string;
    image?: string;
    imagePos?: {
        x: number;
        y: number;
    };
    cost?: string | number;
    itemId?: number;
};
export declare class StoreBuy {
    base: Base;
    peer: Peer;
    private readonly tabs;
    private readonly storeItems;
    constructor(base: Base, peer: Peer);
    private createTabButtons;
    findStoreItemByName(name: string): StoreItem | undefined;
    private addStoreItems;
    private createStoreDialog;
    execute(action: NonEmptyObject<Record<string, string>>): Promise<void>;
}
export {};
