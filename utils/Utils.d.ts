export declare function fetchJSON(url: string): Promise<unknown>;
export declare function downloadItemsDat(itemsDatName: string): Promise<void>;
export declare function downloadMkcert(): Promise<void>;
export declare function setupMkcert(): Promise<void>;
export declare function downloadWebsite(): Promise<void>;
export declare function setupWebsite(): Promise<void>;
export declare function parseAction(chunk: Buffer): Record<string, string>;
export declare function hashItemsDat(file: Buffer): number;
export declare function manageArray(arr: string[], length: number, newItem: string): string[];
export declare const checkPortInUse: (port: number) => Promise<boolean>;
export declare function getWeatherId(blockId: number): number;
export declare function getCurrentTimeInSeconds(): number;
