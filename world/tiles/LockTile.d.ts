import { TileExtraTypes } from "../../Constants";
import type { Base } from "../../core/Base";
import type { World } from "../../core/World";
import type { Block } from "../../types";
import { ExtendBuffer } from "../../utils/ExtendBuffer";
import { Tile } from "../Tile";
export declare class LockTile extends Tile {
    base: Base;
    world: World;
    block: Block;
    alloc: number;
    data: ExtendBuffer;
    extraType: TileExtraTypes;
    adminCount: number;
    ownerID: number;
    constructor(base: Base, world: World, block: Block, alloc?: number);
    serialize(): Promise<void>;
    setFlags(): Promise<void>;
}
