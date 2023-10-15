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
exports.Chat = void 0;
const index_1 = require("./index");
function getPath() {
    const endpoint = index_1.client.defaults.baseURL || '';
    return endpoint.replace(/^https?/, 'wss') + '/chat';
}
function getToken() {
    const token = index_1.client.defaults.headers['Authorization'] || '';
    if (token.length > 0) {
        return token.replace(/^Bearer\s/, '').trim();
    }
    return 'anonymous';
}
class Chat {
    constructor(id = -1) {
        this.state = false;
        this.id = id;
        this.init();
    }
    init() {
        this.connection = new WebSocket(getPath());
        this.state = false;
        this.connection.onopen = () => {
            this.state = true;
            this.send({
                token: getToken(),
                id: this.id,
            });
        };
        this.connection.onclose = () => {
            this.state = false;
            setTimeout(() => {
                this.init();
            }, 3000);
        };
        this.connection.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.callback && this.callback(message);
        };
    }
    send(data) {
        if (!this.state || !this.connection) {
            return false;
        }
        this.connection.send(JSON.stringify(data));
        return true;
    }
    sendWithRetry(data) {
        if (!this.send(data)) {
            setTimeout(() => {
                this.sendWithRetry(data);
            }, 500);
        }
    }
    sendRequest(data) {
        this.sendWithRetry({
            message: data.message,
            model: data.model || 'gpt-3.5-turbo',
            web: data.web || false,
        });
    }
    askStream(data, callback) {
        this.callback = callback;
        this.sendRequest(data);
    }
    ask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const response = { message: '', keyword: '', quota: 0 };
                this.askStream(data, (data) => {
                    response.message += data.message;
                    response.quota = data.quota;
                    if (data.keyword.length > 0)
                        response.keyword = data.keyword;
                    if (data.end)
                        resolve(response);
                });
            });
        });
    }
    close() {
        if (!this.connection)
            return;
        this.connection.close();
    }
}
exports.Chat = Chat;
