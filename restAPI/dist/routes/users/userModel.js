"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    lastName: {
        type: String,
        trim: true,
    },
    img: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        require: true
    },
    playlists: [],
    videos: {
        type: [],
    },
    followers: {
        type: [String],
        default: []
    },
    followed: {
        type: [String],
        default: []
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.default = (0, mongoose_1.model)('UserModel', userSchema);
