"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPortInUse = void 0;
exports.fetchJSON = fetchJSON;
exports.downloadItemsDat = downloadItemsDat;
exports.downloadMkcert = downloadMkcert;
exports.setupMkcert = setupMkcert;
exports.downloadWebsite = downloadWebsite;
exports.setupWebsite = setupWebsite;
exports.parseAction = parseAction;
exports.hashItemsDat = hashItemsDat;
exports.manageArray = manageArray;
exports.getWeatherId = getWeatherId;
exports.getCurrentTimeInSeconds = getCurrentTimeInSeconds;
const fs_1 = require("fs");
const path_1 = require("path");
const consola_1 = __importDefault(require("consola"));
const child_process_1 = require("child_process");
const net_1 = __importDefault(require("net"));
const ky_1 = __importDefault(require("ky"));
const decompress_1 = __importDefault(require("decompress"));
const Constants_1 = require("../Constants");
__dirname = process.cwd();
const MKCERT_URL = "https://github.com/FiloSottile/mkcert/releases/download/v1.4.4";
const WEBSITE_BUILD_URL = "https://github.com/StileDevs/growserver-frontend/releases/latest/download/build.zip";
const mkcertObj = {
    "win32-x64": `${MKCERT_URL}/mkcert-v1.4.4-windows-amd64.exe`,
    "win32-arm64": `${MKCERT_URL}/mkcert-v1.4.4-windows-arm64.exe`,
    "linux-x64": `${MKCERT_URL}/mkcert-v1.4.4-linux-amd64`,
    "linux-arm": `${MKCERT_URL}/mkcert-v1.4.4-linux-arm`,
    "linux-arm64": `${MKCERT_URL}/mkcert-v1.4.4-linux-arm64`,
    "darwin-x64": `${MKCERT_URL}/mkcert-v1.4.4-darwin-amd64`,
    "darwin-arm64": `${MKCERT_URL}/mkcert-v1.4.4-darwin-arm64`
};
async function downloadFile(url, filePath) {
    try {
        const response = await ky_1.default.get(url, {
            redirect: "follow"
        });
        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.status}`);
        }
        const fileStream = (0, fs_1.createWriteStream)(filePath);
        for await (const chunk of response.body) {
            fileStream.write(chunk);
        }
        fileStream.end();
        await new Promise((resolve, reject) => {
            fileStream.on("finish", resolve);
            fileStream.on("error", reject);
        });
        consola_1.default.info(`File downloaded successfully to ${filePath}`);
    }
    catch (error) {
        consola_1.default.error("Error downloading file:", error);
    }
}
async function fetchJSON(url) {
    try {
        const response = await ky_1.default.get(url, {
            redirect: "follow"
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        consola_1.default.error("Error fetching JSON:", error);
    }
}
async function downloadItemsDat(itemsDatName) {
    const datDir = (0, path_1.join)(__dirname, ".cache", "growtopia", "dat");
    if (!(0, fs_1.existsSync)(datDir)) {
        (0, fs_1.mkdirSync)(datDir, { recursive: true });
    }
    const currentVersion = itemsDatName.match(/items-v(\d+\.\d+)\.dat/)?.[1];
    if (!currentVersion) {
        consola_1.default.error("Invalid items.dat filename format");
        return;
    }
    const existingFiles = (0, fs_1.readdirSync)(datDir);
    const versionRegex = /items-v(\d+\.\d+)\.dat/;
    for (const file of existingFiles) {
        const match = file.match(versionRegex);
        if (match) {
            const existingVersion = match[1];
            if (parseFloat(currentVersion) > parseFloat(existingVersion)) {
                (0, fs_1.unlinkSync)((0, path_1.join)(datDir, file));
                consola_1.default.info(`Removed older version: ${file}`);
            }
            else if (currentVersion === existingVersion) {
                consola_1.default.info(`items.dat version ${currentVersion} already exists`);
                return;
            }
        }
    }
    consola_1.default.info(`Downloading items.dat version ${currentVersion}`);
    await downloadFile(`${Constants_1.ITEMS_DAT_URL}/${itemsDatName}`, (0, path_1.join)(__dirname, ".cache", "growtopia", "dat", itemsDatName));
}
async function downloadMkcert() {
    const checkPlatform = `${process.platform}-${process.arch}`;
    const name = process.platform === "darwin" || process.platform === "linux"
        ? "mkcert"
        : "mkcert.exe";
    if (!(0, fs_1.existsSync)((0, path_1.join)(__dirname, ".cache", "bin")))
        (0, fs_1.mkdirSync)((0, path_1.join)(__dirname, ".cache", "bin"), { recursive: true });
    else
        return;
    consola_1.default.info("Downloading mkcert");
    await downloadFile(mkcertObj[checkPlatform], (0, path_1.join)(__dirname, ".cache", "bin", name));
}
async function setupMkcert() {
    const name = process.platform === "darwin" || process.platform === "linux"
        ? "mkcert"
        : "mkcert.exe";
    const mkcertExecuteable = (0, path_1.join)(__dirname, ".cache", "bin", name);
    const sslDir = (0, path_1.join)(__dirname, ".cache", "ssl");
    if (!(0, fs_1.existsSync)(sslDir))
        (0, fs_1.mkdirSync)(sslDir, { recursive: true });
    else
        return;
    consola_1.default.info("Setup mkcert certificate");
    try {
        (0, child_process_1.execSync)(`${mkcertExecuteable} -install && cd ${(0, path_1.join)(__dirname, ".cache", "ssl")} && ${mkcertExecuteable} *.growserver.app`, { stdio: "inherit" });
    }
    catch (e) {
        consola_1.default.error("Something wrong when setup mkcert", e);
    }
}
async function downloadWebsite() {
    if (!(0, fs_1.existsSync)((0, path_1.join)(__dirname, ".cache", "compressed")))
        (0, fs_1.mkdirSync)((0, path_1.join)(__dirname, ".cache", "compressed"), { recursive: true });
    else
        return;
    consola_1.default.info("Downloading compiled website assets");
    await downloadFile(WEBSITE_BUILD_URL, (0, path_1.join)(__dirname, ".cache", "compressed", "build.zip"));
}
async function setupWebsite() {
    if (!(0, fs_1.existsSync)((0, path_1.join)(__dirname, ".cache", "website")))
        (0, fs_1.mkdirSync)((0, path_1.join)(__dirname, ".cache", "website"), { recursive: true });
    else
        return;
    consola_1.default.info("Setup website assets");
    try {
        (0, decompress_1.default)((0, path_1.join)(__dirname, ".cache", "compressed", "build.zip"), (0, path_1.join)(__dirname, ".cache"));
    }
    catch (e) {
        consola_1.default.error("Something wrong when setup website", e);
    }
}
function parseAction(chunk) {
    const data = {};
    chunk[chunk.length - 1] = 0;
    const str = chunk.toString("utf-8", 4);
    const lines = str.split("\n");
    lines.forEach((line) => {
        if (line.startsWith("|"))
            line = line.slice(1);
        const info = line.split("|");
        const key = info[0];
        let val = info[1];
        if (key && val) {
            if (val.endsWith("\x00"))
                val = val.slice(0, -1);
            data[key] = val;
        }
    });
    return data;
}
function hashItemsDat(file) {
    let hash = 0x55555555;
    file.forEach((x) => (hash = (hash >>> 27) + (hash << 5) + x));
    return hash;
}
function manageArray(arr, length, newItem) {
    if (arr.length > length) {
        arr.shift();
    }
    const existingIndex = arr.indexOf(newItem);
    if (existingIndex !== -1) {
        arr.splice(existingIndex, 1);
    }
    arr.push(newItem);
    return arr;
}
const checkPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = net_1.default
            .createServer()
            .once("error", () => resolve(true))
            .once("listening", () => {
            server.close();
            resolve(false);
        })
            .listen(port);
    });
};
exports.checkPortInUse = checkPortInUse;
function getWeatherId(blockId) {
    return Constants_1.weatherIdMap[blockId] || 0;
}
// Return the current time in seconds (today)
function getCurrentTimeInSeconds() {
    const now = new Date();
    const today_begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const ms = now.getTime() - today_begin.getTime();
    const sec = Math.floor(ms / 1000);
    return sec;
}
