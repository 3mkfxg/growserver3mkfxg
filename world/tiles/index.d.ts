import type { Class } from "type-fest";
import { Tile } from "../Tile";
import type { World } from "../../core/World";
import type { Block } from "../../types";
import type { Base } from "../../core/Base";
declare const TileMap: Record<number, Class<Tile>>;
declare const tileParse: (actionType: number, base: Base, world: World, block: Block) => Promise<Buffer<ArrayBufferLike>>;
export { TileMap, tileParse };
