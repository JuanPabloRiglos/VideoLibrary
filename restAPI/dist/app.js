"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const videos_rutes_1 = __importDefault(require("./routes/videos/videos.rutes"));
const users_rutes_1 = __importDefault(require("./routes/users/users.rutes"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
//setings
app.set('port', process.env.PORT || 3444);
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use('/videos', videos_rutes_1.default);
app.use('/users', users_rutes_1.default);
exports.default = app;
