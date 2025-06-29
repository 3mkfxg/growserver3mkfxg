import { WorldData } from "../../types";
import { WorldGen } from "../WorldGen";
export declare class Default extends WorldGen {
    name: string;
    data: WorldData;
    width: number;
    height: number;
    blockCount: number;
    constructor(name: string);
    generate(): Promise<void>;
}
