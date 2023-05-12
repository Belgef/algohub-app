//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class ProblemClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:7224";

    }

    getAll(cancelToken?: CancelToken | undefined): Promise<ProblemViewModel[]> {
        let url_ = this.baseUrl + "/Problem";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAll(_response);
        });
    }

    protected processGetAll(response: AxiosResponse): Promise<ProblemViewModel[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<ProblemViewModel[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ProblemViewModel[]>(null as any);
    }

    addProblem(problem: ProblemCreateViewModel, cancelToken?: CancelToken | undefined): Promise<number | null> {
        let url_ = this.baseUrl + "/Problem";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (problem.problemName !== null && problem.problemName !== undefined)
            content_.append("ProblemName", problem.problemName.toString());
        if (problem.problemContent !== null && problem.problemContent !== undefined)
            problem.problemContent.forEach(item_ => content_.append("ProblemContent", item_.toString()));
        if (problem.image !== null && problem.image !== undefined)
            content_.append("Image", problem.image);
        if (problem.timeLimitMs === null || problem.timeLimitMs === undefined)
            throw new Error("The parameter 'timeLimitMs' cannot be null.");
        else
            content_.append("TimeLimitMs", problem.timeLimitMs.toString());
        if (problem.memoryLimitBytes === null || problem.memoryLimitBytes === undefined)
            throw new Error("The parameter 'memoryLimitBytes' cannot be null.");
        else
            content_.append("MemoryLimitBytes", problem.memoryLimitBytes.toString());

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddProblem(_response);
        });
    }

    protected processAddProblem(response: AxiosResponse): Promise<number | null> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<number | null>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<number | null>(null as any);
    }

    get(problemId: number , cancelToken?: CancelToken | undefined): Promise<ProblemViewModel> {
        let url_ = this.baseUrl + "/Problem/{problemId}";
        if (problemId === undefined || problemId === null)
            throw new Error("The parameter 'problemId' must be defined.");
        url_ = url_.replace("{problemId}", encodeURIComponent("" + problemId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: AxiosResponse): Promise<ProblemViewModel> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<ProblemViewModel>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<ProblemViewModel>(null as any);
    }
}

export class UserClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:7224";

    }

    register(user: UserCreateViewModel, cancelToken?: CancelToken | undefined): Promise<string> {
        let url_ = this.baseUrl + "/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (user.userName !== null && user.userName !== undefined)
            content_.append("UserName", user.userName.toString());
        if (user.fullName !== null && user.fullName !== undefined)
            content_.append("FullName", user.fullName.toString());
        if (user.email !== null && user.email !== undefined)
            content_.append("Email", user.email.toString());
        if (user.password !== null && user.password !== undefined)
            content_.append("Password", user.password.toString());
        if (user.icon !== null && user.icon !== undefined)
            content_.append("Icon", user.icon);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: AxiosResponse): Promise<string> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<string>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<string>(null as any);
    }

    login(user: UserLoginViewModel , cancelToken?: CancelToken | undefined): Promise<UserTokenData> {
        let url_ = this.baseUrl + "/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(user);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: AxiosResponse): Promise<UserTokenData> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<UserTokenData>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserTokenData>(null as any);
    }

    refreshToken(tokens: UserRefreshTokenViewModel , cancelToken?: CancelToken | undefined): Promise<UserTokenData> {
        let url_ = this.baseUrl + "/refresh";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(tokens);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRefreshToken(_response);
        });
    }

    protected processRefreshToken(response: AxiosResponse): Promise<UserTokenData> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<UserTokenData>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserTokenData>(null as any);
    }

    getUserById(userId: string | undefined , cancelToken?: CancelToken | undefined): Promise<UserViewModel> {
        let url_ = this.baseUrl + "/User?";
        if (userId === null)
            throw new Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "userId=" + encodeURIComponent("" + userId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetUserById(_response);
        });
    }

    protected processGetUserById(response: AxiosResponse): Promise<UserViewModel> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<UserViewModel>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<UserViewModel>(null as any);
    }

    checkUserName(userName: string | null | undefined , cancelToken?: CancelToken | undefined): Promise<boolean> {
        let url_ = this.baseUrl + "/checkUserName?";
        if (userName !== undefined && userName !== null)
            url_ += "userName=" + encodeURIComponent("" + userName) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCheckUserName(_response);
        });
    }

    protected processCheckUserName(response: AxiosResponse): Promise<boolean> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<boolean>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<boolean>(null as any);
    }

    checkEmail(email: string | null | undefined , cancelToken?: CancelToken | undefined): Promise<boolean> {
        let url_ = this.baseUrl + "/checkEmail?";
        if (email !== undefined && email !== null)
            url_ += "email=" + encodeURIComponent("" + email) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCheckEmail(_response);
        });
    }

    protected processCheckEmail(response: AxiosResponse): Promise<boolean> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = _responseText;
            return Promise.resolve<boolean>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<boolean>(null as any);
    }
}

export interface ProblemViewModel {
    problemId: number;
    problemName: string;
    problemContent: string;
    author?: UserViewModel | undefined;
    imageName?: string | undefined;
    views: number;
    solves: number;
    upvotes: number;
    downvotes: number;
    timeLimitMs: number;
    memoryLimitBytes: number;
    createDate: Date;
}

export interface UserViewModel {
    userId: string;
    userName: string;
    fullName?: string | undefined;
    email: string;
    role?: string | undefined;
    iconName?: string | undefined;
}

export interface ContentElement {
    contentType: ContentType;
    value?: string | undefined;
    image?: any | undefined;
    code: string;
}

export enum ContentType {
    Subtitle = 0,
    Emphasis = 1,
    Paragraph = 2,
    Image = 3,
    Bar = 4,
    Code = 5,
}

export interface UserCreateViewModel {
    userName: string;
    fullName?: string;
    email: string;
    icon?: File;
    password: string;
    confirmPassword: string;
}

export interface UserTokenData {
    token: string;
    refreshToken: string;
}

export interface UserLoginViewModel {
    userName: string;
    password: string;
}

export interface UserRefreshTokenViewModel {
    refreshToken: string;
    oldJwtToken: string;
}

export interface ProblemCreateViewModel {
    problemName: string | null | undefined, 
    problemContent: ContentElement[] | null | undefined, 
    authorId: string | undefined, 
    image: File | null | undefined, 
    timeLimitMs: number | undefined, 
    memoryLimitBytes: number | undefined
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}
