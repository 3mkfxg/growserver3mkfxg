import { Block, WorldData } from "../types";
import { Base } from "./Base";
import { Peer } from "./Peer";
export declare class World {
    private base;
    data: WorldData;
    worldName: string;
    constructor(base: Base, worldName: string);
    saveToCache(): Promise<boolean>;
    saveToDatabase(): Promise<bigint | boolean | 0>;
    leave(peer: Peer, sendMenu?: boolean): void;
    getData(): Promise<void>;
    place(peer: Peer, x: number, y: number, id: number, isBg: boolean, { fruitCount, dontSendTileChange }?: {
        fruitCount?: number;
        dontSendTileChange?: boolean;
    }): Promise<void>;
    enter(peer: Peer, x: number, y: number): Promise<void>;
    generate(cache?: boolean): Promise<void>;
    drop(peer: Peer, x: number, y: number, id: number, amount: number, { tree, noSimilar }?: {
        tree?: boolean;
        noSimilar?: boolean;
    }): void;
    collect(peer: Peer, uid: number): void;
    harvest(peer: Peer, block: Block): boolean;
}
