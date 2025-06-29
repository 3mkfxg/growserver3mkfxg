import type { Peer } from "../core/Peer";
import type { World } from "../core/World";
import type { Block } from "../types";
import type { Base } from "../core/Base";
import { ExtendBuffer } from "../utils/ExtendBuffer";
export declare class Tile {
    base: Base;
    world: World;
    block: Block;
    alloc: number;
    data: ExtendBuffer;
    lockPos: number;
    flags: number;
    constructor(base: Base, world: World, block: Block, alloc?: number);
    serialize(): Promise<void>;
    setFlags(): Promise<void>;
    private serializeBlockData;
    init(): Promise<void>;
    parse(): Promise<Buffer<ArrayBufferLike>>;
    static tileUpdate(base: Base, peer: Peer, world: World, block: Block, type: number): Promise<void>;
}
