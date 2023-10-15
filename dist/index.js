"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackage = exports.buySubscription = exports.getSubscription = exports.buyQuota = exports.getQuota = exports.deleteConversation = exports.getConversation = exports.getConversations = exports.Chat = exports.setEndpoint = exports.setKey = exports.client = void 0;
const axios_1 = require("axios");
exports.client = axios_1.default.create({
    baseURL: 'https://api.chatnio.net',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
function setKey(key) {
    exports.client.defaults.headers['Authorization'] = `Bearer ${key}`;
}
exports.setKey = setKey;
function setEndpoint(url) {
    exports.client.defaults.baseURL = url;
}
exports.setEndpoint = setEndpoint;
var chat_1 = require("./chat");
Object.defineProperty(exports, "Chat", { enumerable: true, get: function () { return chat_1.Chat; } });
var api_1 = require("./api");
Object.defineProperty(exports, "getConversations", { enumerable: true, get: function () { return api_1.getConversations; } });
Object.defineProperty(exports, "getConversation", { enumerable: true, get: function () { return api_1.getConversation; } });
Object.defineProperty(exports, "deleteConversation", { enumerable: true, get: function () { return api_1.deleteConversation; } });
Object.defineProperty(exports, "getQuota", { enumerable: true, get: function () { return api_1.getQuota; } });
Object.defineProperty(exports, "buyQuota", { enumerable: true, get: function () { return api_1.buyQuota; } });
Object.defineProperty(exports, "getSubscription", { enumerable: true, get: function () { return api_1.getSubscription; } });
Object.defineProperty(exports, "buySubscription", { enumerable: true, get: function () { return api_1.buySubscription; } });
Object.defineProperty(exports, "getPackage", { enumerable: true, get: function () { return api_1.getPackage; } });
