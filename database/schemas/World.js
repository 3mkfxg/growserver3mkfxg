"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectWorldSchema = exports.insertWorldSchema = exports.worlds = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.worlds = (0, sqlite_core_1.sqliteTable)("worlds", {
    id: (0, sqlite_core_1.integer)("id").primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)("name", { length: 255 }).notNull(),
    ownedBy: (0, sqlite_core_1.integer)("ownedBy"),
    owner: (0, sqlite_core_1.blob)("owner", { mode: "buffer" }),
    width: (0, sqlite_core_1.integer)("width").notNull(),
    height: (0, sqlite_core_1.integer)("height").notNull(),
    blocks: (0, sqlite_core_1.blob)("blocks", { mode: "buffer" }),
    dropped: (0, sqlite_core_1.blob)("dropped", { mode: "buffer" }),
    weather_id: (0, sqlite_core_1.integer)("weather_id").default(41),
    created_at: (0, sqlite_core_1.text)("created_at").default((0, drizzle_orm_1.sql) `(current_timestamp)`),
    updated_at: (0, sqlite_core_1.text)("updated_at").default((0, drizzle_orm_1.sql) `(current_timestamp)`)
});
exports.insertWorldSchema = (0, drizzle_zod_1.createInsertSchema)(exports.worlds);
exports.selectWorldSchema = (0, drizzle_zod_1.createSelectSchema)(exports.worlds);
