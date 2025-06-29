"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldDB = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const World_1 = require("../schemas/World");
class WorldDB {
    db;
    constructor(db) {
        this.db = db;
    }
    async get(name) {
        const res = await this.db
            .select()
            .from(World_1.worlds)
            .where((0, drizzle_orm_1.eq)(World_1.worlds.name, name))
            .limit(1)
            .execute();
        if (res.length)
            return res[0];
        return undefined;
    }
    async has(name) {
        const res = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(World_1.worlds)
            .where((0, drizzle_orm_1.eq)(World_1.worlds.name, name))
            .limit(1)
            .execute();
        return res[0].count > 0;
    }
    async set(data) {
        if (!data.name && !data.blocks && !data.width && !data.height)
            return 0;
        const res = await this.db.insert(World_1.worlds).values({
            name: data.name,
            ownedBy: data.owner ? data.owner.id : null,
            width: data.width,
            height: data.height,
            blocks: Buffer.from(JSON.stringify(data.blocks)),
            owner: data.owner ? Buffer.from(JSON.stringify(data.owner)) : null,
            dropped: Buffer.from(JSON.stringify(data.dropped)),
            updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
            weather_id: data.weatherId
        });
        if (res && res.lastInsertRowid)
            return res.lastInsertRowid;
        return 0;
    }
    async save(data) {
        if (!data.name && !data.blocks && !data.width && !data.height)
            return false;
        const res = await this.db
            .update(World_1.worlds)
            .set({
            ownedBy: data.owner ? data.owner.id : null,
            width: data.width,
            height: data.height,
            blocks: Buffer.from(JSON.stringify(data.blocks)),
            owner: data.owner ? Buffer.from(JSON.stringify(data.owner)) : null,
            dropped: Buffer.from(JSON.stringify(data.dropped)),
            updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
            weather_id: data.weatherId
        })
            .where((0, drizzle_orm_1.eq)(World_1.worlds.name, data.name))
            .returning({ id: World_1.worlds.id });
        if (res.length)
            return true;
        return false;
    }
}
exports.WorldDB = WorldDB;
