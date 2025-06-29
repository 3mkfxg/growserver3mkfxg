import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { WorldData } from "../../types/world";
export declare class WorldDB {
    private db;
    constructor(db: LibSQLDatabase<Record<string, never>>);
    get(name: string): Promise<{
        id: number;
        name: string;
        ownedBy: number | null;
        owner: Buffer<ArrayBufferLike> | null;
        width: number;
        height: number;
        blocks: Buffer<ArrayBufferLike> | null;
        dropped: Buffer<ArrayBufferLike> | null;
        weather_id: number | null;
        created_at: string | null;
        updated_at: string | null;
    } | undefined>;
    has(name: string): Promise<boolean>;
    set(data: WorldData): Promise<bigint | 0>;
    save(data: WorldData): Promise<boolean>;
}
