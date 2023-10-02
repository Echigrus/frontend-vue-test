import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GlobalConstants } from "../constants/global";

class ApiBase {
    _httpClient;

    constructor() {
        this._httpClient = axios.create({
            baseURL: GlobalConstants.BaseUrl,
        });
        this._httpClient.defaults.headers.common['Content-Type'] = 'text/plain';
    }

    /**
     * Отправка GET запроса
     * @param url url запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    async get(url, params) {
        return await this.request('GET', url, null, params);
    }

    /**
     * Отправка POST запроса
     * @param url url запроса
     * @param data Параметры для тела запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    async post(url, data, params) {
        return await this.request('POST', url, data, params);
    }

    /**
     * Отправка DELETE запроса
     * @param url url запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    async delete(url, params) {
        return await this.request('DELETE', url, null, params);
    }

    /**
     * Отправка PATCH запроса
     * @param url url запроса
     * @param data Параметры для тела запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    async patch(url, data, params) {
        return await this.request('PATCH', url, data, params);
    }

    /**
     * Общий метод запросов
     * @param method Метод запроса
     * @param url url запроса
     * @param data Параметры для тела запроса
     * @param params Параметры для строки запроса
     * @returns Результат запроса
     */
    async request(method, url, data, params) {
        return (await this._httpClient.request({ method: method, url: url, data: data, params: params })).data;
    }
};

export { ApiBase };