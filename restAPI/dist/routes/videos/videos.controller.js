"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVideo = exports.updateVideo = exports.createVideo = exports.getOneVideo = exports.getVideos = void 0;
const videos_1 = __importDefault(require("./videos"));
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield videos_1.default.find();
        return res.json(videos);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});
exports.getVideos = getVideos;
const getOneVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const founded = yield videos_1.default.findById(id);
    if (!founded) {
        return res.status(204).json({ message: 'video not founded' });
    }
    else {
        return res.json(founded);
        console.log(founded);
    }
});
exports.getOneVideo = getOneVideo;
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isInDb = yield videos_1.default.findOne({ url: req.body.url });
    if (isInDb) {
        return res.status(301).json({ message: 'te URL alredy exist in DB' });
    }
    const video = new videos_1.default(req.body);
    const saveVideo = yield video.save();
    res.status(200).json(saveVideo);
    return (video);
});
exports.createVideo = createVideo;
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoUpdated = yield videos_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!videoUpdated) {
        return res.status(204).json({ message: 'video not founded' });
    }
    return res.json(videoUpdated);
});
exports.updateVideo = updateVideo;
const DeleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const founded = yield videos_1.default.findByIdAndDelete(id);
    if (!founded) {
        return res.status(204).json({ message: 'video not founded' });
    }
    else {
        return res.json(founded);
        console.log(founded);
    }
});
exports.DeleteVideo = DeleteVideo;
