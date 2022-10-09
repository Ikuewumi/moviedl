"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require("cors");
const morgan = require("morgan");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('trust-proxy', 1);
app.use(cors());
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json({
    limit: '500kb'
}));
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use("/api", routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/dist'));
    app.get('*/*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
const port = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.DB_URI).then(() => app.listen(port));
