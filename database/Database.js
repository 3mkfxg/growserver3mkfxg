"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const libsql_1 = require("drizzle-orm/libsql");
const client_1 = require("@libsql/client");
const World_1 = require("./handlers/World");
const Player_1 = require("./handlers/Player");
class Database {
    db;
    players;
    worlds;
    constructor() {
        const sqlite = (0, client_1.createClient)({
            url: `file:data/data.db`
        });
        this.db = (0, libsql_1.drizzle)(sqlite, { logger: false });
        this.players = new Player_1.PlayerDB(this.db);
        this.worlds = new World_1.WorldDB(this.db);
    }
}
exports.Database = Database;
