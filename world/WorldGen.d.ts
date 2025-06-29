import { WorldData } from "../types";
export declare abstract class WorldGen {
    name: string;
    abstract data: WorldData;
    abstract width: number;
    abstract height: number;
    constructor(name: string);
    abstract generate(): Promise<void>;
}
