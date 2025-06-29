"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./core/Base");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new Base_1.Base();
server.start();
process.on("SIGINT", () => server.shutdown());
process.on("SIGQUIT", () => server.shutdown());
process.on("SIGTERM", () => server.shutdown());
