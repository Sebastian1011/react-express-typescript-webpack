import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance, AxiosPromise } from 'axios';
let FileSaver = require('file-saver');
// import { jumpTo } from "../history";
// import { readCookie } from "../utils/cookieHelper";

export const readCookie = (name: string) => {
    var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : null;
};

export const writeCookie = (name: string, value: string, days?: number) => {
    if (!days) {
        days = 365 * 20;
    }
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
};

export const removeCookie = (name: string) => {
    writeCookie(name, '', -1);
};

export const stringfyParams = (params: any) => {
    let paramsArr: string[] = [];
    for (let k in params) {
        let v = params[k];
        if (typeof v != 'object') {
            paramsArr.push(`${k}=${v}`);
        } else if (v instanceof Array) {
            v.forEach((m) => {
                paramsArr.push(`${k}=${m}`);
            });
        }
    }
    return paramsArr.join('&');
};

const config: AxiosRequestConfig = {
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    paramsSerializer: function(params) {
        return stringfyParams(params);
    }
};

const handleResponse = (response: AxiosResponse) => {
    if (response.status === 200) return response.data;
    console.error(response);
    if (response.status === 401 || response.status === 403) {
        // jumpTo("/login");
    } else {
        console.error(response);
        // return response.data;
        throw new Error(response.status.toString());
    }
};

const handleError = (error: AxiosError) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // jumpTo("/login");
    }
    if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        // return error.response.data;
    } else {
        console.error(error.message);
        // return error.message;
    }
    throw error;
};

const axiosInstance: AxiosInstance = axios.create(config);
const token = readCookie('token');
token && (axiosInstance.defaults.headers.common['Authorization'] = token);

class AjaxServer {
    instance: AxiosInstance = axiosInstance;
    get(subPath: string, data?: any, options?: any): AxiosPromise<any> {
        return axiosInstance.get(subPath, { params: data || {} }).then(handleResponse, handleError);
    }

    post(subPath: string, data: any, options?: any): AxiosPromise<any> {
        return axiosInstance.post(subPath, data, options || {}).then(handleResponse, handleError);
    }

    export(subPath: string, data: any, options?: any): AxiosPromise<any> {
        return axiosInstance.post(subPath, data, options || {});
    }

    put(subPath: string, data: any, options?: any): AxiosPromise<any> {
        return axiosInstance.put(subPath, data, options || {}).then(handleResponse, handleError);
    }
    delete(subPath: string, data: any): AxiosPromise<any> {
        return axiosInstance
            .request({
                method: 'delete',
                url: subPath,
                data: JSON.stringify(data)
            })
            .then(handleResponse, handleError);
    }
    fetchImage(url: string): Promise<string> {
        return axios
            .get(url, { responseType: 'arraybuffer' })
            .then((response) => new Buffer(response.data, 'binary').toString('base64'));
    }
    download(subPath: string, data: any = {}, options: any = {}) {
        axios({
            method: 'post',
            url: subPath,
            data: data,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            responseType: 'blob',
            ...options
        }).then((res) => {
            let defaultFileName = '';
            if (res.headers['content-disposition'] && /filename=/.test(res.headers['content-disposition'])) {
                defaultFileName = res.headers['content-disposition'].split('filename=')[1];
            } else {
                throw 'content-disposition not defined';
            }
            const filename = decodeURIComponent(defaultFileName);
            FileSaver.saveAs(res.data, filename);
            return res;
        });
    }
}

export default new AjaxServer();

// const defaultParams = {
//     mode: 'none'
// };

// let endpoint = '';

// function setEndpoint(value) {
//     endpoint = value;
// }

// /**
//  * @param {String} url
//  * @param {String} message
//  * @param {Number} statusCode
//  * @constructor
//  */
// function ApiError(url: string, message: string, statusCode: string) {
//     this.url = url;
//     this.message = message;
//     this.statusCode = statusCode || '';
//     this.title = 'API Error';
//     this.stack = new Error().stack;
// }

// /**
//  * @param {String} url
//  * @param {Error} error
//  * @param {Number|undefined} statusCode
//  * @throws {ApiError}
//  */
// function throwApiError(url, error, statusCode) {
//     throw new ApiError(url, error, statusCode);
// }

// /**
//  * @param {Object} params
//  * @returns {Promise.<T>}
//  * @private
//  */
// function _request(params) {
//     let requestUrl;
//     let requestParams;
//     if (typeof params === 'string') {
//         requestUrl = params;
//         requestParams = {};
//     } else {
//         const { url, ...restParams } = params;
//         requestUrl = url;
//         requestParams = restParams;
//     }

//     let rawResponse;
//     return fetch(requestUrl, { ...defaultParams, ...requestParams })
//         .then((response) => {
//             rawResponse = response;
//             return response.json();
//         })
//         .then((json) => {
//             if (json && json.error) {
//                 return throwApiError(requestUrl, json.error, rawResponse.status);
//             }
//             return json;
//         })
//         .catch((error) => throwApiError(requestUrl, error.message));
// }

// // application api

// function getStats() {
//     return _request(`${endpoint}/stats`);
// }

// function addServer(payload) {
//     return _request({
//         url: `${endpoint}/servers`,
//         method: 'POST',
//         headers: new Headers({ 'content-type': 'application/json' }),
//         body: JSON.stringify(payload),
//         ...defaultParams
//     });
// }

// export default {
//     getStats,
//     addServer,
//     setEndpoint
// };
