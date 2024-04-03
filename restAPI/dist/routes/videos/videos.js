"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    url: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    topyc: { type: String,
        trim: true },
    owners: {
        type: [
            String
        ]
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = (0, mongoose_1.model)('VideoModel', videoSchema);
