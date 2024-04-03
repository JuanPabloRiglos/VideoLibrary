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
exports.DeleteUser = exports.updateUser = exports.createUser = exports.getOneUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        return res.json(users);
    }
    catch (err) {
        res.send(err);
    }
});
exports.getUsers = getUsers;
// Encuentra mediante Email, lo debo pasar en el Body, no como param
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    // const passwordParams =  req.params.password
    const founded = yield userModel_1.default.findOne({ email });
    if (!founded) {
        return res.status(204).json({ message: 'User not founded' });
    }
    //     else if(founded.password !== passwordParams){return res.status(401).json({message:'Las contraseñas no coinciden'})
    // } 
    else {
        return res.json(founded);
    }
});
exports.getOneUser = getOneUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isInDb = yield userModel_1.default.findOne({ email: req.body.email });
    if (isInDb) {
        return res.status(301).json({ message: 'The email alredy exist in DB' });
    }
    const user = new userModel_1.default(req.body);
    const saveUser = yield user.save();
    res.status(200).json(saveUser);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdated = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userUpdated) {
        return res.status(204).json({ message: 'User not founded' });
    }
    return res.json(userUpdated);
});
exports.updateUser = updateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const founded = yield userModel_1.default.findByIdAndDelete(id);
    if (!founded) {
        return res.status(204).json({ message: 'User not founded' });
    }
    else {
        return res.json(founded);
    }
});
exports.DeleteUser = DeleteUser;
