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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buySubscription = exports.getSubscription = exports.getPackage = exports.buyQuota = exports.getQuota = exports.deleteConversation = exports.getConversation = exports.getConversations = void 0;
const index_1 = require("./index");
function getConversations() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get('/conversation/list');
        if (resp.status !== 200 || resp.data.status !== true) {
            throw new Error('Failed to get conversations');
        }
        return resp.data.data;
    });
}
exports.getConversations = getConversations;
function getConversation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get(`/conversation/load?id=${id}`);
        if (resp.status !== 200 || resp.data.status !== true) {
            throw new Error('Failed to get conversation');
        }
        return resp.data.data;
    });
}
exports.getConversation = getConversation;
function deleteConversation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get(`/conversation/delete?id=${id}`);
        if (resp.status !== 200) {
            throw new Error('Failed to delete conversation');
        }
        return resp.data.status === true;
    });
}
exports.deleteConversation = deleteConversation;
function getQuota() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get('/quota');
        if (resp.status !== 200 || resp.data.status !== true) {
            throw new Error('Failed to get quota');
        }
        return resp.data.quota;
    });
}
exports.getQuota = getQuota;
function buyQuota(quota) {
    return __awaiter(this, void 0, void 0, function* () {
        if (quota <= 0 || quota > 99999) {
            throw new Error('Invalid quota');
        }
        else if (quota % 1 !== 0) {
            throw new Error('Quota must be an integer');
        }
        const resp = yield index_1.client.post('/buy', { quota });
        if (resp.status !== 200) {
            throw new Error('Failed to buy quota');
        }
        return resp.data.status === true;
    });
}
exports.buyQuota = buyQuota;
function getPackage() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get('/package');
        if (resp.status !== 200 || resp.data.status !== true) {
            throw new Error('Failed to get package');
        }
        return resp.data.data;
    });
}
exports.getPackage = getPackage;
function getSubscription() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield index_1.client.get('/subscription');
        if (resp.status !== 200 || resp.data.status !== true) {
            throw new Error('Failed to get subscription');
        }
        return resp.data.data;
    });
}
exports.getSubscription = getSubscription;
function buySubscription(level, month) {
    return __awaiter(this, void 0, void 0, function* () {
        if (month <= 0 || month > 999) {
            throw new Error('Invalid month');
        }
        else if (month % 1 !== 0) {
            throw new Error('Month must be an integer');
        }
        const resp = yield index_1.client.post('/subscribe', { month, level });
        if (resp.status !== 200) {
            throw new Error('Failed to subscribe');
        }
        return resp.data.status === true;
    });
}
exports.buySubscription = buySubscription;
