import type { Block } from "../types";
import { Base } from "../core/Base";
import { World } from "../core/World";
import { Peer } from "../core/Peer";
interface Node {
    x: number;
    y: number;
}
interface FloodFillData {
    s_node: Node;
    max: number;
    width: number;
    height: number;
    blocks: Block[];
    s_block: Block;
    base: Base;
    noEmptyAir: boolean;
}
export declare class Floodfill {
    data: FloodFillData;
    totalNodes: Node[];
    count: number;
    constructor(data: FloodFillData);
    exec(): Promise<void>;
    private neighbours;
    isConnectedToFaces(node: Node): boolean;
    apply(world: World, owner: Peer): Promise<void>;
}
export {};
