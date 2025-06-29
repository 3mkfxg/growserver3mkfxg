import { Client } from "growtopia.js";
import { type PackageJson } from "type-fest";
import { Cache, CDNContent, ItemsData } from "../types";
import { Database } from "../database/Database";
export declare class Base {
    server: Client;
    items: ItemsData;
    package: PackageJson;
    config: typeof import("../../config.json");
    cdn: CDNContent;
    cache: Cache;
    database: Database;
    constructor();
    start(): Promise<void>;
    private loadEvents;
    private registerCommandAliases;
    private loadItems;
    getLatestCdn(): Promise<CDNContent>;
    saveAll(disconnectAll?: boolean): Promise<boolean>;
    saveWorlds(): Promise<boolean>;
    savePlayers(disconenctAll: boolean): Promise<boolean>;
    shutdown(): Promise<void>;
}
