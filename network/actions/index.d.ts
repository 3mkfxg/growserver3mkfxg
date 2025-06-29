import { type NonEmptyObject, type Class } from "type-fest";
export declare const ActionMap: Record<string, Class<{
    execute: (action: NonEmptyObject<Record<string, string>>) => Promise<void>;
}>>;
