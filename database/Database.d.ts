import { WorldDB } from "./handlers/World";
import { PlayerDB } from "./handlers/Player";
export declare class Database {
    db: import("drizzle-orm/libsql").LibSQLDatabase<Record<string, never>> & {
        $client: import("@libsql/client/.").Client;
    };
    players: PlayerDB;
    worlds: WorldDB;
    constructor();
}
