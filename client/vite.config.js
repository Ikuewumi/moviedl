"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)({
            reactivityTransform: true
        })],
    resolve: {
        alias: {
            '@': (0, url_1.fileURLToPath)(new url_1.URL('./src', import.meta.url))
        }
    }
});
