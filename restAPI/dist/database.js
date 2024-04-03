"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import config from './config'
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('db en', process.env.DBURI);
const URIMONGO = process.env.DBURI ? process.env.DBURI : 'mongodb://127.0.0.1:27017/mernVideoDB';
mongoose_1.default.connect(URIMONGO); //iria la url de mongoAtlas o en el .env
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Se conecto la db de Mongo de la VideoListApp');
});
