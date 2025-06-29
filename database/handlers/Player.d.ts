import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { PeerData } from "../../types/peer";
export declare class PlayerDB {
    private db;
    constructor(db: LibSQLDatabase<Record<string, never>>);
    get(name: string): Promise<{
        id: number;
        name: string;
        display_name: string;
        password: string;
        role: string;
        gems: number | null;
        level: number | null;
        exp: number | null;
        clothing: Buffer<ArrayBufferLike> | null;
        inventory: Buffer<ArrayBufferLike> | null;
        last_visited_worlds: Buffer<ArrayBufferLike> | null;
        created_at: string | null;
        updated_at: string | null;
    } | undefined>;
    has(name: string): Promise<boolean>;
    set(name: string, password: string): Promise<bigint | 0>;
    save(data: PeerData): Promise<boolean>;
}
